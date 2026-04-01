import Head from 'next/head';
import { useTheme } from '@/context/ThemeContext';

/**
 * Keeps theme-color in <Head> in sync without re-rendering the full page.
 */
export function ThemeColorMeta() {
  const { theme } = useTheme();

  return (
    <Head>
      <meta
        key="theme-color"
        name="theme-color"
        content={theme === 'dark' ? '#0a090e' : '#f3f0fa'}
      />
    </Head>
  );
}
