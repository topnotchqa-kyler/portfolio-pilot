export default class BasePage {
  open(path: string) {
    return browser.url(path);
  }

  async clearCart() {
    await browser.execute(() => localStorage.removeItem('shopping-cart'));
  }
}
