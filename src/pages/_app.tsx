import '@/styles/globals.css'
import '@/styles/portfolio.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/context/ThemeContext'
import { ThemeColorMeta } from '@/components/ThemeColorMeta'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ThemeColorMeta />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
