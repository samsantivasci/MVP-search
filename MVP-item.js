import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
 
/**
* `mvp-item`
*
* @demo index.html
* @element mvp-item
*/
export class mvpItem extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "mvp-item";
  }
 
 
  constructor() {
    super();
    this.title = "";
    this.lastUpdated = "";
    this.created = "";
    this.description = "";
    this.image = "";
    this.slug = "";
    this.path = "";
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
          max-width: 600px;
          margin: 20px auto;
          padding: var(--ddd-spacing-4);
          border: var(--ddd-border-md);
          background-color: var(--ddd-theme-accent);
          color: var(--ddd-theme-primary);
          font-family: var(--ddd-font-navigation);
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
 
        /* Wrapper for internal padding */
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
          background-color: #fff;
          border-radius: 6px;
        }
 
        /* Title styling */
        h3 {
          font-size: var(--mvp-search-title-font-size, 1.5rem);
          font-weight: bold;
          color: var(--ddd-theme-primary);
          margin: 0 0 10px 0;
        }
 
        h3 span {
          font-size: var(--mvp-search-label-font-size, var(--ddd-font-size-s));
          color: var(--ddd-theme-secondary);
        }
 
        /* Image styling */
        img {
          width: 100%;
          height: auto;
          border-radius: 6px;
          margin-bottom: 16px;
        }
 
        /* Text block styling */
        p {
          font-size: var(--mvp-search-text-font-size, 1rem);
          line-height: 2;
          margin: 8px 0;
        }
 
        p strong {
          font-weight: bold;
        }
 
        /* Button styling */
        button {
          background-color: var(--ddd-theme-primary);
          color: #fff;
          padding: 8px 16px;
          margin: 8px 4px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
 
        button:hover {
          background-color: var(--ddd-theme-secondary);
        }
 
        /* Ensure proper spacing */
        .wrapper > * {
          margin-bottom: 12px;
        }
 
        /* Responsive design */
        @media (max-width: 600px) {
          :host {
            padding: var(--ddd-spacing-2);
          }
 
          .wrapper {
            padding: var(--ddd-spacing-2);
          }
 
          h3 {
            font-size: 1.25rem;
          }
 
          p {
            
          }
        }
      `,
    ];
  }
 
  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        ${this.image ? html` <img src="https://haxtheweb.org/${this.image}" alt="Page Image" />`
          : ""}
        <h3>${this.title}</h3>
        <p><strong>Last Updated:</strong> ${this.lastUpdated}</p>
        <p>${this.description}</p>
        <a href="https://haxtheweb.org/${this.slug}">link to source</a>
        <a href="https://haxtheweb.org/$${this.path}">link to path</a>
      </div>
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
 
