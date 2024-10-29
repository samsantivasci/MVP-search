import { html, fixture, expect } from '@open-wc/testing';
import "../MVP-search.js";

describe("MVPSearch test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <MVP-search
        title="title"
      ></MVP-search>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
