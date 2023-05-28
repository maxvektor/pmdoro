const cliProgress = require('cli-progress');
const colors = require('ansi-colors');

let interval;

const runBar = (timer, elapsed = 0) => {
    const bar1 = new cliProgress.SingleBar({
        format: 'Current session |' + colors.cyan('{bar}') + '| {percentage}% | {remainingTime}',
    }, cliProgress.Presets.shades_classic);

    const startingPersentage = Math.floor((elapsed) / timer * 100);

    bar1.start(100, startingPersentage, {remainingTime: convertToMinutes(timer - elapsed)});
    const startingTime = Date.now();

    if(interval){
        clearInterval(interval);
        interval = null;
    }
    
    let elapsedTime;

    
    interval = setInterval(() => {
        const currentTime = Date.now();
        elapsedTime = currentTime - startingTime + (elapsed ?? 0);
        const remainingTime = timer - elapsedTime;
        
        if(remainingTime <= 0) {
            clearInterval(interval);
            bar1.stop();
            console.log(colors.green('Time is up!'));
            process.exit(0);
        }
    
        const persentage = Math.floor((elapsedTime / timer) * 100);
    
        bar1.update(persentage, {remainingTime: convertToMinutes(remainingTime)});
    }, 500);


    const stopBar = () => {
        clearInterval(interval);
        bar1.stop();
        return elapsedTime;
    }


    return stopBar;
}

function convertToMinutes(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
    
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }


  module.exports = {runBar}