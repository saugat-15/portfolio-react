import dynamic from 'next/dynamic';
import { createElement, type FunctionComponent } from 'react';
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
  if (reduceMotion) {
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
