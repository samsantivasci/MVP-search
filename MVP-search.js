import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./MVP-item";
 
/**
* `mvp-search`
*
* @demo index.html
* @element mvp-search
*/
export class mvpSearch extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "mvp-search";
  }
 
  constructor() {
    super();
    this.items = [];
    this.title = "";
    this.value = "";
    this.overview = {};
    this.name = "";
    this.description = "";
    this.logo = "";
    this.theme = "";
    this.created = "";
    this.lastUpdated = "";
    this.hexCode = "";
  }
 
  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      value: { type: String },
      items: { type: Array },
      overview: { type: Object },
      name: { type: String },
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      hexCode: { type: String },
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
        h2 {
          font-size: var(--mvp-search-label-font-size, var(--ddd-font-size-xs));
          margin: 0;
        }
 
        .overview-card {
          display: flex;
 
          background-color: var(--site-hex-code);
          border: 1px;
          padding: 15px;
          flex: 1 1 calc(25% - 20px);
          box-sizing: border-box;
          cursor: pointer;
          border: 1px solid #ddd;
        }
        #logo {
          height: 200px;
          width: 200px;
        }
      `,
    ];
  }
 
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has("value") && this.value) {
      this.updateResults(this.value);
    } else if (changedProperties.has("value") && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has("items") && this.items.length > 0) {
      console.log(this.items);
    }
  }
 
  updateResults() {
    this.value = this.shadowRoot.querySelector("#site-url").value;
    this.loading = true;
    console.log(this.value);
    fetch(`${this.value}`)
      .then((d) => (d.ok ? d.json() : {}))
      .then((data) => {
        if (data) {
          this.name = data.metadata.site.name;
          this.description = data.description;
          this.logo = data.metadata.site.logo;
          this.theme = data.metadata.theme.name;
          this.created = data.metadata.site.created;
          this.lastUpdated = data.metadata.site.updated;
          this.hexCode = data.metadata.theme.variables.hexCode;
          this.items = data.items;
          this.loading = false;
        } else {
          this.items = [];
        }
      });
  }
  dateToString(timeStamp) {
    const date = new Date(timeStamp * 1000);
    return date.toUTCString();
  }
  // Lit render the HTML
  render() {
    return html`
      <div class="container">
        <h1>Site Analyzer</h1>
        <div>
          <label for="site-url">HAX Site URL:</label>
          <input
            type="text"
            id="site-url"
            placeholder="https://hax.theweb.org/site.json"
          />
          <button @click="${this.updateResults}">Analyze</button>
        </div>
        <div class="overview-card" id="overview-card" style="--site-hex-code: ${
          this.hexCode
        };">
        <h2 class="logo"></h2>
          ${this.logo ? html`<img id="logo" src="https://haxtheweb.org/${this.logo}" />`
              : ""
          }
        <div class="text-wrap">
          <h2 id="name">Name:</h2> ${this.name ? html`<div>${this.name}</div>` : ""}
          <h2 id="description">Description:</h2> ${this.description ? html`<div>${this.description}</div>` : ""}
          <h2 id="theme">Theme: <span id="theme"></h2> ${this.theme ? html`<div>${this.theme}</div>` : ""}
          <h2 class="created">Created: <span id="created"></span></h2> ${this.created ? html`<div>${this.dateToString(this.created)}</div>` : ""}
          <h2 class="last-updated"> Last Updated: <span id="lastupdated"></span></h2>${this.lastupdated ? html`<div>${this.dateToString(this.lastUpdated)}</div>`: ""}
          <h2 class="hex-code">Hex Code: <span id="hexcode"></span></h2> ${this.hexCode ? html`<div>${this.hexCode}</div>` : ""}
        </div>
        </div>
        <div id="cards" class="cards">
          ${this.items.map(
            (item) => html`
              <mvp-item
                title=${item.title}
                lastUpdated=${this.dateToString(item.metadata.updated)}
                description=${item.description}
                image=${item.metadata.images[0]}
                slug=https://haxtheweb.org/${item.slug}
                path=https://haxtheweb.org/${item.location}
                addtional=${item.metadata.published}
              ></mvp-item>
            `
          )}
        </div>
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
 
globalThis.customElements.define(mvpSearch.tag, mvpSearch);