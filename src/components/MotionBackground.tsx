/**
 * Hero ambient background — motion is CSS-driven so it always runs after paint
 * (no dependency on Framer hydration). Respects prefers-reduced-motion in CSS.
 */
export function MotionBackground() {
  return (
    <div className="pf-hero-motion" aria-hidden>
      <div className="pf-hero-motion__mesh" />
      <div className="pf-hero-motion__grid" />
      <div className="pf-hero-motion__aurora-wrap">
        <div className="pf-hero-motion__aurora" />
      </div>
      <div className="pf-hero-motion__orb pf-hero-motion__orb--1" />
      <div className="pf-hero-motion__orb pf-hero-motion__orb--2" />
      <div className="pf-hero-motion__orb pf-hero-motion__orb--3" />
      <div className="pf-hero-motion__vignette" />
    </div>
  );
}
