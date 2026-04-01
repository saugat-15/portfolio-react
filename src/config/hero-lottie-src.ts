/**
 * Lottie source URL or path (e.g. `/lottie/hero.lottie` under `public/`).
 * Set `NEXT_PUBLIC_HERO_LOTTIE_SRC` in `.env.local` or Vercel to override.
 */
export const HERO_LOTTIE_SRC =
  typeof process.env.NEXT_PUBLIC_HERO_LOTTIE_SRC === 'string' &&
  process.env.NEXT_PUBLIC_HERO_LOTTIE_SRC.trim().length > 0
    ? process.env.NEXT_PUBLIC_HERO_LOTTIE_SRC.trim()
    : 'https://lottie.host/1a4054a9-c73e-473c-8328-4fe9bec47453/q3JsbHLZek.lottie';
