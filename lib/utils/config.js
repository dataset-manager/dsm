var fs = require('fs')
var path = require('path')
var yaml = require('js-yaml')
var objectAssign = require('object-assign')
var CONFIG_PATH = path.join(require('os').homedir(), '.dsmrc')
var DEFAULT_CONFIG = {
  registryURL: 'https://h0dh0qrgeb.execute-api.eu-west-1.amazonaws.com/dev/registry/'
}

module.exports = {
  get: function () {
    if (!fs.existsSync(CONFIG_PATH)) {
      return DEFAULT_CONFIG
    }
    return objectAssign({}, DEFAULT_CONFIG, yaml.safeLoad(fs.readFileSync(CONFIG_PATH, 'utf8')))
  },

  save: function (config) {
    fs.writeFileSync(CONFIG_PATH, yaml.safeDump(config), 'utf8')
  },

  delete: function () {
    fs.unlinkSync(CONFIG_PATH)
  }
}
