/** @type {import('next').NextConfig} */
const path = require('path')

// eslint-disable-next-line
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

const apiURL = new URL(process.env.NEXT_PUBLIC_API)
const allowedImageDomains = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS
  ? process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(",")
  : []
const imageConversionFormats = process.env.NEXT_PUBLIC_IMAGE_CONVERSION_FORMATS
  ? process.env.NEXT_PUBLIC_IMAGE_CONVERSION_FORMATS.split(",")
  : []

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [apiURL.hostname, ...allowedImageDomains],
    formats: imageConversionFormats,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false
      }
    }

    return config
  },

  // redirects
  // async redirects() {
  //   const redirectsRules = [];
  //
  //   console.log({
  //     'redirect all pages status': /^true$/i.test(process.env.NEXT_PUBLIC_WEBSITE_NOT_AVAILABLE)
  //   })
  //   // is NEXT_PUBLIC_WEBSITE_NOT_AVAILABLE true? - shot down website, and show warning page
  //   if (/^true$/i.test(process.env.NEXT_PUBLIC_WEBSITE_NOT_AVAILABLE)) {
  //     redirectsRules.push({
  //       source: '/:path((?!another-page$).*)',
  //       missing: [
  //         {
  //           type: 'header',
  //           key: 'x-do-not-redirect',
  //         },
  //       ],
  //       permanent: false,
  //       destination: '/site_is_down',
  //     });
  //   }
  //
  //   return redirectsRules;
  // }
}

const sentryWebpackPluginOptions = {
  ignore: ['node_modules'],
  include: '.next',
  silent: true,
  configFile: 'sentry.properties',
  dryRun: !process.env.NEXT_PUBLIC_SENTRY_DSN
}

module.exports = withBundleAnalyzer(
  process.env.NEXT_PUBLIC_SENTRY_DSN
    ? withSentryConfig(
        {
          ...nextConfig,
          sentry: {
            hideSourceMaps: true,
            widenClientFileUpload: true,
          },
        },
        sentryWebpackPluginOptions
      )
    : nextConfig
)
