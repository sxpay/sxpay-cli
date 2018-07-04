module.exports = async function getVersions() {
  const current = require(`../package.json`).version
  let latest
  if (process.env.VUE_CLI_LATEST_VERSION) {
    // cached value
    latest = process.env.VUE_CLI_LATEST_VERSION
  } else if (process.env.VUE_CLI_TEST || process.env.VUE_CLI_DEBUG) {
    // test/debug, use local version
    latest = process.env.VUE_CLI_LATEST_VERSION = current
  } else {
    const request = require("./request")
    // const options = require("../options").loadOptions()
    // const registry = options.useTaobaoRegistry
    //   ? `https://registry.npm.taobao.org`
    //   : `https://registry.npmjs.org`
    const registry = "https://registry.npmjs.org"
    const res = await request.get(`${registry}/sxpay-cli`)
    if (res.statusCode === 200) {
      latest = res.body['dist-tags'].latest
    } else {
      latest = current
    }
  }
  return {
    current,
    latest
  }
}
