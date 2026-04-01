/**
 * Background animation for the Experience section.
 * Override with `NEXT_PUBLIC_EXPERIENCE_LOTTIE_SRC` (.env.local / Vercel).
 */
export const EXPERIENCE_LOTTIE_SRC =
  typeof process.env.NEXT_PUBLIC_EXPERIENCE_LOTTIE_SRC === 'string' &&
  process.env.NEXT_PUBLIC_EXPERIENCE_LOTTIE_SRC.trim().length > 0
    ? process.env.NEXT_PUBLIC_EXPERIENCE_LOTTIE_SRC.trim()
    : 'https://lottie.host/8137e466-1463-4865-93f5-2562ff2c864c/mD2qIkeTfd.lottie';
