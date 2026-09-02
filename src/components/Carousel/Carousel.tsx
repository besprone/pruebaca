import { Children, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import { IconButton } from '../IconButton/IconButton';
import './Carousel.css';

export type CarouselItemsPerView = 1 | 2 | 3;

export type CarouselProps = {
  /** Slots visibles por página (Figma: `# slots * block` / `configuration`). Default `1`. */
  itemsPerView?: CarouselItemsPerView;
  /** Dots de paginación. Default `true`. */
  pagination?: boolean;
  /** Flechas prev/next (afordancia de desktop; en touch se usa swipe). Default `false`. */
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

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Carousel — contenido secuencial desplazable horizontalmente. Figma:
 * `components_carousel`. Encapsula el layout y controla la página activa.
 *
 * Los slots son `children` (páginas derivadas por `itemsPerView`); no replica
 * los building blocks de Figma (`blocks` / `# slots * block` / `pagination_dot`),
 * que son andamiaje de diseño. El desplazamiento usa scroll-snap nativo (swipe
 * + momentum físico); las flechas y los dots hacen `scrollTo` suave.
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
      raf = requestAnimationFrame(() => {
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
        setPage(best);
      });
    };
    vp.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      vp.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [setPage, pageCount]);

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
        <div className="carousel__dots" role="group" aria-label="Páginas">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className="carousel__dot"
              aria-label={`Ir a la página ${i + 1} de ${pageCount}`}
              aria-current={i === active ? 'true' : undefined}
              data-active={i === active || undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
