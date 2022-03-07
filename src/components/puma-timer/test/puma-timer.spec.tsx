import { newSpecPage } from '@stencil/core/testing';
import { PumaTimer } from '../puma-timer';

describe('puma-timer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PumaTimer],
      html: `<puma-timer></puma-timer>`,
    });
    expect(page.root).toEqualHtml(`
      <puma-timer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </puma-timer>
    `);
  });
});
