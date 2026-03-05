import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly dashboardPage;
  readonly dashboardHeading;
  readonly logoutButton;

  constructor(page: Page) {
    super(page);
    this.dashboardPage = page.getByTestId('dashboard-page');
    this.dashboardHeading = page.getByTestId('dashboard-heading');
    this.logoutButton = page.getByTestId('logout-button');
  }

  async goto() {
    await this.navigate('/dashboard');
  }
}
