// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

// next.config.js
const path = require('path')
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

// next.js configuration
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  // distDir: 'build',
  serverless: true,
  // webpack5
  webpack5: true,

  // images
  images: {
    domains: ['localhost'],
  },
  
  // sass
  sassOptions: {
    cssModules: true,
    includePaths: [path.join(__dirname, 'styles')],
  },

  // webpack config
  webpack: (config, options) => {

    const { isServer } = options;
    // config.module.rules.push({
    //   test: /\.(ogg|mp3|wav|mpe?g)$/i,
    //   exclude: config.exclude,
    //   use: [
    //     {
    //       loader: require.resolve('url-loader'),
    //       options: {
    //         limit: config.inlineImageLimit,
    //         fallback: require.resolve('file-loader'),
    //         publicPath: `${config.assetPrefix}/_next/static/img/`,
    //         outputPath: `${isServer ? '../' : ''}static/img/`,
    //         name: '[name]-[hash].[ext]',
    //         esModule: config.esModule || false,
    //       },
    //     },
    //   ],
    // },
    // {
    //   test: /\.(png|jpg|gif)$/i,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 8192,
    //       },
    //     },
    //   ],
    // },
    // );


    return config;
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
};

module.exports = withPlugins([

  // add a plugin without a configuration
  withImages,

  // another plugin with a configuration
  // [typescript, {
  //   typescriptLoaderOptions: {
  //     transpileOnly: false,
  //   },
  // }],

], nextConfig);

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true },
);
