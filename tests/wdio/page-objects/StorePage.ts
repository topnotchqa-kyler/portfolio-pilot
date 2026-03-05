import BasePage from './BasePage.js';

class StorePage extends BasePage {
  get storePage() { return $('[data-testid="store-page"]'); }
  get productList() { return $('[data-testid="product-list"]'); }

  async getFirstProductCardLink() {
    return $('[data-testid^="product-card-link-"]');
  }

  open() {
    return super.open('/store');
  }
}

export default new StorePage();
