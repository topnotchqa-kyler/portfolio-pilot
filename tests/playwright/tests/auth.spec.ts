import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Authentication', () => {
  test('login page displays login form', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await expect(login.loginForm).toBeVisible();
  });

  test('debug login navigates to dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    await login.debugLogin();
    await expect(page).toHaveURL(/\/dashboard/);
    const dashboard = new DashboardPage(page);
    await expect(dashboard.dashboardHeading).toBeVisible();
  });

  test('logout returns user to login page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.debugLogin();
    const dashboard = new DashboardPage(page);
    await dashboard.logoutButton.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('unauthenticated access to dashboard redirects to login', async ({ page }) => {
    await page.context().clearCookies();
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await expect(page).toHaveURL(/\/login/);
  });

  test('signup link on login page navigates to signup', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.signupLink.click();
    await expect(page).toHaveURL(/\/signup/);
    await expect(page.getByTestId('signup-form')).toBeVisible();
  });
});
