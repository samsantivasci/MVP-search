import { LitElement, html, css } from 'lit';

class SiteAnalyzer extends LitElement {
  static properties = {
    siteUrl: { type: String },
    metadata: { type: Object },
    items: { type: Array },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.siteUrl = '';
    this.metadata = null;
    this.items = [];
    this.errorMessage = '';
  }

  static styles = css`
    .container { max-width: 800px; margin: auto; padding: 20px; }
    .overview, .cards { margin: 20px 0; }
    .card { border: 1px solid #ddd; padding: 10px; margin: 10px; cursor: pointer; }
    .card img { max-width: 100%; height: auto; }
    button { margin-top: 10px; }
  `;

  async fetchData() {
    if (!this.siteUrl) return (this.errorMessage = 'Please enter a URL');
    const url = this.siteUrl.endsWith('site.json') ? this.siteUrl : `${this.siteUrl}/site.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Invalid URL or file not found');
      const data = await response.json();
      if (!data.items || !data.metadata) throw new Error('Invalid JSON schema');

      this.metadata = data.metadata;
      this.items = data.items;
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = `Error: ${error.message}`;
      this.metadata = null;
      this.items = [];
    }
  }

  render() {
    return html`
      <div class="container">
        <h1>Site Analyzer</h1>
        <input type="text" .value=${this.siteUrl} @input=${e => (this.siteUrl = e.target.value)} placeholder="https://hax.theweb.org/site.json" />
        <button @click=${this.fetchData}>Analyze</button>
        ${this.errorMessage ? html`<p style="color: red;">${this.errorMessage}</p>` : ''}

        ${this.metadata ? html`
          <div class="overview">
            <h2>${this.metadata.name || 'N/A'}</h2>
            <p><strong>Description:</strong> ${this.metadata.description || 'N/A'}</p>
            <p><strong>Created:</strong> ${this.metadata.created || 'N/A'}</p>
            <p><strong>Last Updated:</strong> ${this.metadata.lastUpdated || 'N/A'}</p>
            ${this.metadata.logo ? html`<img src="${this.metadata.logo}" alt="Site Logo" style="max-width: 100px;">` : ''}
          </div>
        ` : ''}

        <div class="cards">
          ${this.items.map(
            item => html`
              <div class="card" @click=${() => window.open(item.link, '_blank')}>
                ${item.image ? html`<img src="${item.image}" alt="Page Image">` : ''}
                <h3>${item.title || 'Untitled'}</h3>
                <p><strong>Last Updated:</strong> ${item.lastUpdated || 'N/A'}</p>
                <p>${item.description || 'No description available'}</p>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('site-analyzer', SiteAnalyzer);