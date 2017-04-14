#!/usr/bin/env node
var program = require('commander')
var chalk = require('chalk')
var registry = require('dsm-client')
var config = require('./utils/config').get()

program
  .description('Search for existing dataset')
  .usage('[options] <query>')
  .arguments('<query>')
  .action(function (query) {
    program.query = query
  })
  .parse(process.argv)

if (!program.query) {
  program.help()
}

registry.search(program.query, {registryURL: config.registryURL})
.then(function (datasets) {
  if (!datasets || !datasets.length) {
    console.log(chalk.red('error') + ' No datasets found for "' + program.query + '"')
    return process.exit(0)
  }
  datasets.forEach(function (plugin, i) {
    console.log(chalk.blue.bold(plugin.name) + ' - ' + chalk.dim.italic(plugin.lastVersion))
    console.log(plugin.description)
    if (i !== datasets.length - 1) {
      console.log()
    }
  })
  process.exit(0)
})
.catch(function (err) {
  console.log(chalk.red('error') + ' Error while searching for datasets')
  console.log((err || {}).body || err)
  process.exit(1)
})
