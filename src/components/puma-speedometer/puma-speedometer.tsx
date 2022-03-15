import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'puma-speedometer',
  styleUrl: 'puma-speedometer.scss',
  shadow: true,
})
export class PumaSpeedometer {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
