// next.config.js
const path = require('path')
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
// const typescript = require('@zeit/next-typescript');

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
