const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudybarz.com', 'i.ytimg.com', 'images.unsplash.com'],
  },
  webpack: (config, { dev, isServer }) => {
    // @lottiefiles/dotlottie-react's `browser` bundle minifies `useCallback` and a
    // class as the same symbol, causing: useCallback._initializeObserver is not a function.
    // Force the main dist entry (same API, safe minification).
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@lottiefiles/dotlottie-react': path.resolve(
          __dirname,
          'node_modules/@lottiefiles/dotlottie-react/dist/index.js'
        ),
      }
    }

    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
        ignored: ['**/.git/**', '**/node_modules/**', '**/.next/**'],
      }
    }
    return config
  },
}

module.exports = nextConfig
