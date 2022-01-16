const aliases = (prefix = `src`) => ({
  "@assets": `${prefix}/assets`,
  '@atoms': `${prefix}/components/atoms`,
  '@molecules': `${prefix}/components/molecules`,
  '@organisms': `${prefix}/components/organisms`,
  '@templates': `${prefix}/components/templates`,
  '@components': `${prefix}/components`,
  '@config': `${prefix}/config`,
  '@enums': `${prefix}/enums`,
  '@hooks': `${prefix}/hooks`,
  '@icons': `${prefix}/components/atoms/Icons`,
  '@styles': `${prefix}/styles`,
  '@utils': `${prefix}/utils`,
  '@state': `${prefix}/state`,
  '@types': `${prefix}/types`,
  '@storybookHelpers': `../.storybook/helpers`,
});

module.exports = aliases;