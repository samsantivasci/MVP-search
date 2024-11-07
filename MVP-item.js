import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
 
/**
* `mvp-search`
*
* @demo index.html
* @element mvp-search
*/
export class mvpItem extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "mvp-item";
  }
 
  constructor() {
    super();
    this.title = "";
 
    this.lastUpdated = "";
    this.description = "";
    this.image = "";
    this.slug = "";
    this.path = "";
    this.additional = "";
  }
 
  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      lastUpdated: { type: String },
      description: { type: String },
      image: { type: String },
      slug: { type: String },
      path: { type: String },
      additional: { type: String },
    };
  }
 
  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h3 span {
          font-size: var(--mvp-search-label-font-size, var(--ddd-font-size-s));
        }
      `,
    ];
  }
 
  // Lit render the HTML
  render() {
    return html`
      
      <img alt="Page Image" />
      <h3>${this.title}</h3>
      <p><strong>Last Updated:</strong>${this.lastUpdated}</p>
      <p>${this.description}</p>
      <button>${this.slug}</button>
      <button>${this.path}</button>
      <p>${this.additional}</p>
    `;
  }
 
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}
 
globalThis.customElements.define(mvpItem.tag, mvpItem);