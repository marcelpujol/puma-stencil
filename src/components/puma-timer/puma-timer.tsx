import { Component, Method, h, State, getAssetPath } from '@stencil/core';
import { TimerButtonType, TimerStatus } from './puma-timer-enums';

@Component({
  tag: 'puma-timer',
  styleUrl: 'puma-timer.scss',
  assetsDirs: ['assets']
})
export class PumaTimer { 
  @State() private interval: any;
  @State() private time: number = 0;
  @State() private hours: number = 0;
  @State() private minutes: number = 0;
  @State() private seconds: number = 0;
  @State() currentStatus: TimerStatus = TimerStatus.Initialized;

  @Method()
  async start() {
    this.currentStatus = TimerStatus.Started;
    this.interval = setInterval(() => {
      this.time++;
      this.handleTime();
    }, 1000);
  }

  @Method()
  async pause() {
    this.currentStatus = TimerStatus.Paused;
    clearInterval(this.interval);
  }

  @Method()
  async restart() {
    this.currentStatus = TimerStatus.Restarted;
    clearInterval(this.interval);
    this.initTimer();
  }

  componentWillLoad() {
   this.initTimer();
  }

  render() {
    return (
      <div class="timer-container">
        <div class="time-container">
          <div class="hour-container">
            <span>{ this.formattedNumber(this.hours) }</span>
            <span class="sub">hour</span>
          </div>
          <span>:</span>
          <div class="min-container">
            <span>{ this.formattedNumber(this.minutes) }</span>
            <span class="sub">min</span>
          </div>
          <span>:</span>
          <div class="sec-container">
            <span>{ this.formattedNumber(this.seconds) }</span>
            <span class="sub">sec</span>
          </div>
        </div>

        <div class="timer-actions">
          <button id="start-button" 
                  class="start-button" 
                  onClick={ () => this.start() }
                  disabled={ this.isDisabledButton(TimerButtonType.Start) }>
            <img src={ this.getImagePath('play') }></img>
          </button>
          <button id="pause-button" 
                  class="pause-button" 
                  onClick={ () => this.pause() }
                  disabled={ this.isDisabledButton(TimerButtonType.Pause) }>
            <img src={ this.getImagePath('pause') }></img>
          </button>
          <button id="restart-button" 
                  class="restart-button" 
                  onClick={ () => this.restart() }
                  disabled={ this.isDisabledButton(TimerButtonType.Restart) }>
            <img src={ this.getImagePath('restart') }></img>
          </button>
        </div>
      </div>
    );
  }

  private initTimer(): void {
    this.time = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  } 

  private getImagePath(imageName: string): string {
    return getAssetPath(`./assets/${imageName}.svg`);    
  }

  private handleTime(): void {
    this.hours = Math.floor(this.time / 3600);
    this.minutes = Math.floor(this.time % 3600 / 60);
    this.seconds = Math.floor(this.time % 3600 % 60);
  }

  private formattedNumber(num: Number): string {
    return num.toLocaleString('en-US', { minimumIntegerDigits: 2 });
  }

  private isDisabledButton(buttonType: TimerButtonType): boolean {
    switch (buttonType) {
      case TimerButtonType.Start:
        return this.currentStatus === TimerStatus.Started;
      case TimerButtonType.Pause:
        return this.currentStatus === TimerStatus.Paused || this.currentStatus === TimerStatus.Initialized;
      case TimerButtonType.Restart:
        return this.hasInitialValue();
    }
  }

  private hasInitialValue(): boolean {
    return this.hours === 0 && this.minutes === 0 && this.seconds === 0;
  }
}
