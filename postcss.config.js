/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const postcssNormalize = require('postcss-normalize')

/* eslint-disable no-undef */
module.exports = {
  plugins: [require('autoprefixer'), postcssNormalize()]
}
