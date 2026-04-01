import { Html, Head, Main, NextScript } from 'next/document'

/** Default theme is dark; only `light` or `dark` in localStorage overrides. */
const THEME_STORAGE_SCRIPT = `(function(){try{var k='portfolio-theme';var t=localStorage.getItem(k);if(t==='light'){document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: THEME_STORAGE_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
