#!/usr/bin/env node
var program = require('commander')

program
  .description('')
  .command('init', '')
  .command('get [options] <name>', '')
  .command('build [options]', '')
  .command('rebuild [options] <name>', '')
  .command('publish [options]', '')
  .command('search <query>', 'search for dataset')
  .command('install [options] <name>', 'install a new dataset')
  .command('install-tool [options] <name>', 'install a new tool')
  .command('link <path>', 'symlink a local dataset for development')
  .command('login <token>', 'login to github using an access token')
  .command('logout', 'delete the access token')
  .parse(process.argv)
