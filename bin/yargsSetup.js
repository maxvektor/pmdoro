const argv = require('yargs')
  .usage('$0 <cmd> [args]')
  .command('start [name]', 'start the task with [name]', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Work time',
      describe: 'The task name'
    })
  })
  .option('work', {
    alias: 'w',
    type: 'boolean',
    description: 'Start the work timer',
    default: true
  })
  .option('timer', {
    alias: 't',
    type: 'number',
    description: 'Start timer for [number] minutes',
    default: 25
  })
  .help()
  .argv

  module.exports = argv;