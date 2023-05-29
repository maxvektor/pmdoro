#!/usr/bin/env node

const readline = require('readline');
const colors = require('ansi-colors');
const {runBar} = require('./progressline.js');
const argv = require('./yargsSetup');

let elapsed = 0;

const timer = argv.timer * 60 * 1000;
const taskName = argv.name;


let stopBar = runBar({timer, elapsed, taskName});

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (ch, key) => {
    if (key && key.name == 'p') {
        elapsed = stopBar();
        console.log(colors.green('Timer pused!'));
    }

    if (key && key.name == 'r') {
        runBar({timer, elapsed,taskName});
    }

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }

    if (key && key.name == 'q') {
        process.exit(0);
    }
  });
