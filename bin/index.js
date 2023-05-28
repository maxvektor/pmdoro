#!/usr/bin/env node

const readline = require('readline');
const colors = require('ansi-colors');
const {runBar} = require('./progressline.js');


const DEFAULT_TIMER = 25 * 60 * 1000;
let elapsed = 0;


let stopBar = runBar({timer:DEFAULT_TIMER, elapsed});

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (ch, key) => {
    if (key && key.name == 'p') {
        elapsed = stopBar();
        console.log(colors.green('Timer pused!'));
    }

    if (key && key.name == 'r') {
        runBar({timer:DEFAULT_TIMER, elapsed});
    }

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }

    if (key && key.name == 'q') {
        process.exit(0);
    }
  });
