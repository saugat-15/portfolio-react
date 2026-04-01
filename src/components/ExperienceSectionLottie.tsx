import dynamic from 'next/dynamic';
import { createElement, useEffect, useState, type FunctionComponent } from 'react';
import type { DotLottieReactProps } from '@lottiefiles/dotlottie-react';
import { EXPERIENCE_LOTTIE_SRC } from '@/config/experience-lottie-src';

const DOTLOTTIE_RENDER_CONFIG = { autoResize: true } as const;

const DotLottieReact = dynamic(
  () =>
    import('@lottiefiles/dotlottie-react').then((mod) => {
      const Dot = mod.DotLottieReact as FunctionComponent<DotLottieReactProps>;
      function DotLottieDynamic(props: DotLottieReactProps) {
        return createElement(Dot, props);
      }
      return DotLottieDynamic;
    }),
  {
    ssr: false,
    loading: () => (
      <div className="pf-exp-lottie-bg__skeleton" aria-hidden>
        <span className="pf-exp-lottie-bg__skeleton-dot" />
      </div>
    ),
  }
);

type ExperienceSectionLottieProps = {
  reduceMotion: boolean;
};

export function ExperienceSectionLottie({
  reduceMotion,
}: ExperienceSectionLottieProps) {
  const [hydrated, setHydrated] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const mq = window.matchMedia('(max-width: 839px)');
    const update = () => setIsMobileViewport(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!hydrated) {
    return null;
  }

  if (reduceMotion || isMobileViewport) {
    return null;
  }

  return (
    <div className="pf-exp-lottie-bg" aria-hidden>
      <div className="pf-exp-lottie-bg__inner">
        <DotLottieReact
          src={EXPERIENCE_LOTTIE_SRC}
          loop
          autoplay
          className="pf-exp-lottie-bg__canvas"
          renderConfig={DOTLOTTIE_RENDER_CONFIG}
        />
      </div>
    </div>
  );
}
