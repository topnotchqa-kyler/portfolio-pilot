import BasePage from './BasePage.js';

class HomePage extends BasePage {
  get homePage() { return $('[data-testid="home-page"]'); }
  get heroSection() { return $('[data-testid="hero-section"]'); }
  get viewWorkButton() { return $('[data-testid="hero-view-work-button"]'); }
  get getInTouchButton() { return $('[data-testid="hero-get-in-touch-button"]'); }
  get seeAllProjectsButton() { return $('[data-testid="see-all-projects-button"]'); }
  get seeAllPostsButton() { return $('[data-testid="see-all-posts-button"]'); }

  open() {
    return super.open('/');
  }
}

export default new HomePage();
