import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly homePage;
  readonly heroSection;
  readonly viewWorkButton;
  readonly getInTouchButton;
  readonly seeAllProjectsButton;

  constructor(page: Page) {
    super(page);
    this.homePage = page.getByTestId('home-page');
    this.heroSection = page.getByTestId('hero-section');
    this.viewWorkButton = page.getByTestId('hero-view-work-button');
    this.getInTouchButton = page.getByTestId('hero-get-in-touch-button');
    this.seeAllProjectsButton = page.getByTestId('see-all-projects-button');
  }

  async goto() {
    await this.navigate('/');
    await this.homePage.waitFor();
  }
}
