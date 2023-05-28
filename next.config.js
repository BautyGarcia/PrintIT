const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})

module.exports = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["storage.googleapis.com", "storage.cloud.google.com"]
  },
})