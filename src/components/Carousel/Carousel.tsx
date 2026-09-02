import { Children, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react';
import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import { IconButton } from '../IconButton/IconButton';
import './Carousel.css';

export type CarouselItemsPerView = 1 | 2 | 3;

export type CarouselProps = {
  /** Slots visibles por página (Figma: `# slots * block` / `configuration`). Default `1`. */
  itemsPerView?: CarouselItemsPerView;
  /** Dots indicadores de paginación (no interactivos). Default `true`. */
  pagination?: boolean;
  /** Flechas prev/next (afordancia de desktop; en touch/mouse se usa swipe). Default `false`. */
  controls?: boolean;
  /** Nombre de la región para lectores de pantalla. Requerido. */
  'aria-label': string;
  /** Se llama al cambiar de página (0-based). */
  onPageChange?: (page: number) => void;
  /** Los slides — cada hijo es un slot con cualquier composición del DS. */
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onScroll'>;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const DRAG_THRESHOLD = 5;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Carousel — contenido secuencial desplazable horizontalmente. Figma:
 * `components_carousel`. Encapsula el layout y controla la página activa.
 *
 * Navegación: **swipe** táctil (scroll-snap nativo), **arrastre con mouse**
 * (se simula el swipe), teclado **←/→** con el viewport enfocado, y las
 * **flechas** opcionales (`controls`). Los dots **solo indican**, no navegan.
 *
 * Los slots son `children` (páginas derivadas por `itemsPerView`); no replica
 * los building blocks de Figma, que son andamiaje de diseño.
 *
 * No usar con un solo ítem ni cuando se necesita comparación simultánea.
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { itemsPerView = 1, pagination = true, controls = false, onPageChange, children, className, ...props },
  ref,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const pages = chunk(Children.toArray(children), itemsPerView);
  const pageCount = pages.length;
  const multi = pageCount > 1;

  const setPage = useCallback(
    (next: number) => {
      setActive((prev) => (prev === next ? prev : (onPageChange?.(next), next)));
    },
    [onPageChange],
  );

  const nearestPage = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return 0;
    let best = 0;
    let min = Infinity;
    pageRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(el.offsetLeft - vp.scrollLeft);
      if (d < min) {
        min = d;
        best = i;
      }
    });
    return best;
  }, []);

  const goTo = useCallback((i: number) => {
    const vp = viewportRef.current;
    const el = pageRefs.current[i];
    if (!vp || !el) return;
    vp.scrollTo({ left: el.offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  // página activa a partir del scroll (la más cercana al borde izquierdo del viewport)
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPage(nearestPage()));
    };
    vp.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      vp.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [setPage, nearestPage, pageCount]);

  // ── arrastre con mouse (simula el swipe; el táctil usa el scroll nativo) ──
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const vp = viewportRef.current;
    if (!vp) return;
    drag.current = { active: true, startX: e.clientX, startScroll: vp.scrollLeft, moved: false };
    vp.setPointerCapture(e.pointerId);
    vp.style.scrollSnapType = 'none';
    vp.style.scrollBehavior = 'auto';
    vp.style.cursor = 'grabbing';
    vp.style.userSelect = 'none';
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
    viewportRef.current!.scrollLeft = d.startScroll - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const vp = viewportRef.current!;
    try {
      vp.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    vp.style.scrollSnapType = '';
    vp.style.scrollBehavior = '';
    vp.style.cursor = '';
    vp.style.userSelect = '';
    if (d.moved) goTo(nearestPage());
  };

  // si hubo arrastre, anula el click que dispararían los interactivos del slot
  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' && active < pageCount - 1) {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === 'ArrowLeft' && active > 0) {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <div
      {...props}
      ref={ref}
      className={['carousel', className].filter(Boolean).join(' ')}
      data-controls={controls && multi ? '' : undefined}
    >
      <div
        ref={viewportRef}
        className="carousel__viewport"
        role="group"
        aria-roledescription="carrusel"
        aria-label={props['aria-label']}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStartCapture={(e) => {
          if (drag.current.active) e.preventDefault();
        }}
      >
        <div className="carousel__track">
          {pages.map((items, i) => (
            <div
              key={i}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              className="carousel__page"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${pageCount}`}
              aria-hidden={i !== active || undefined}
            >
              {items.map((item, j) => (
                <div key={j} className="carousel__slot">
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {multi && (
        <span className="carousel__status" aria-live="polite">
          Página {active + 1} de {pageCount}
        </span>
      )}

      {controls && multi && (
        <>
          <IconButton
            className="carousel__arrow carousel__arrow--prev"
            emphasis="ghost"
            size="sm"
            icon={<ChevronLeft size={16} />}
            aria-label="Anterior"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          />
          <IconButton
            className="carousel__arrow carousel__arrow--next"
            emphasis="ghost"
            size="sm"
            icon={<ChevronRight size={16} />}
            aria-label="Siguiente"
            disabled={active === pageCount - 1}
            onClick={() => goTo(active + 1)}
          />
        </>
      )}

      {pagination && multi && (
        <div className="carousel__dots" aria-hidden="true">
          {pages.map((_, i) => (
            <span key={i} className="carousel__dot" data-active={i === active || undefined} />
          ))}
        </div>
      )}
    </div>
  );
});
