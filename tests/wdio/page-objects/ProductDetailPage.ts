import BasePage from './BasePage.js';

class ProductDetailPage extends BasePage {
  get productName() { return $('[data-testid="product-name"]'); }
  get productPrice() { return $('[data-testid="product-price"]'); }
  get productDescription() { return $('[data-testid="product-description"]'); }
  get addToCartButton() { return $('[data-testid="add-to-cart-button"]'); }
  get goToCheckoutButton() { return $('[data-testid="go-to-checkout-button"]'); }

  open(id: string) {
    return super.open(`/store/${id}`);
  }
}

export default new ProductDetailPage();
