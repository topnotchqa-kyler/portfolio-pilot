import BasePage from './BasePage.js';

class DashboardPage extends BasePage {
  get dashboardPage() { return $('[data-testid="dashboard-page"]'); }
  get dashboardHeading() { return $('[data-testid="dashboard-heading"]'); }
  get logoutButton() { return $('[data-testid="logout-button"]'); }

  open() {
    return super.open('/dashboard');
  }
}

export default new DashboardPage();
