import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'off',
            time: null,
            timer: null
        };
    }


    formatTime(time) {
        let minutes = Math.floor(time/60);
        let seconds = time%60;

        return [minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":")
    }

    startTimer = () => {
        this.setState({
            time: 1200,
        });
        this.setState({
            status: 'work',
        });
        this.setState({
            timer: setInterval(this.step, 1000),
        });
    };

    playBell = () => {
        const audioElement = new Audio('./sounds/bell.wav');
        audioElement.play();
    }

    step = () => {
        const currentTime = this.state.time - 1;
        const currentStatus = this.state.status;

        if (currentTime === 0 && currentStatus === 'work') {
            this.setState({
                status: 'rest',
            });
            this.setState({
                time: 20,
            });
            this.playBell();
        }

        if (currentTime === 0 && currentStatus === 'rest') {
            this.setState({
                status: 'work',
            });
            this.setState({
                time: 1200,
            });
            this.playBell();
        }

        this.setState({
            time: currentTime,
        });
    };

    stopTimer = () => {
        clearInterval(this.state.timer)
        this.setState({
            status: 'off',
        });
        this.setState({
            time: null,
        });
    };

    closeApp = () => {
        window.close();
    };


  render() {
      const { status, time } = this.state;
    return (
        <div>
            <h1>Protect your eyes</h1>
            {(status === 'off') &&
                  <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.<br/>
                  This app will help you track your time and inform you when it's time to rest.</p>
            }
            {(status === 'work') && <img src="./images/Work.png" />}
            {(status === 'rest') && <img src="./images/Rest.png" />}
            {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
            {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
            {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
            <button className="btn btn-close" onClick={this.closeApp}>X</button>
        </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
