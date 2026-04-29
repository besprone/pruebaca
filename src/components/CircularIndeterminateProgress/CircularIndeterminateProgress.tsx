import './CircularIndeterminateProgress.css';

export type CircularIndeterminateProgressSize = 'xs' | 'sm' | 'md';

export type CircularIndeterminateProgressProps = {
  size?: CircularIndeterminateProgressSize;
  'aria-label'?: string;
};

export function CircularIndeterminateProgress({
  size = 'sm',
  'aria-label': ariaLabel = 'Cargando',
}: CircularIndeterminateProgressProps) {
  return (
    <svg
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      data-size={size}
      viewBox="0 0 24 24"
      fill="none"
      className="circular-progress"
    >
      <circle className="circular-progress__track" cx="12" cy="12" r="10.5" />
      <circle className="circular-progress__arc"   cx="12" cy="12" r="10.5" />
    </svg>
  );
}
