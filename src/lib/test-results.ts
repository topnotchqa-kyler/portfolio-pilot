export type SuiteResult = {
  suite: 'wdio' | 'playwright' | 'cypress';
  timestamp: string;
  durationMs: number;
  status: 'passed' | 'failed';
  output: string;
};

const WDIO_OUTPUT = `$ npm test

Execution of 6 workers started at ${new Date('2026-03-05T19:29:12.222Z').toISOString()}

[0-0] RUNNING in chrome - file:///features/auth.feature
[0-1] RUNNING in chrome - file:///features/blog.feature
[0-2] RUNNING in chrome - file:///features/checkout.feature
[0-3] RUNNING in chrome - file:///features/contact.feature
[0-4] RUNNING in chrome - file:///features/navigation.feature
[0-5] RUNNING in chrome - file:///features/store.feature
[0-0] PASSED  in chrome - file:///features/auth.feature
[0-1] PASSED  in chrome - file:///features/blog.feature
[0-2] PASSED  in chrome - file:///features/checkout.feature
[0-3] PASSED  in chrome - file:///features/contact.feature
[0-4] PASSED  in chrome - file:///features/navigation.feature
[0-5] PASSED  in chrome - file:///features/store.feature

 "spec" Reporter:
------------------------------------------------------------------
[chrome #0-0] » /features/auth.feature
[chrome #0-0] Authentication

[chrome #0-0] Login page displays login form
[chrome #0-0]    ✓ Given I am on the login page
[chrome #0-0]    ✓ Then the login form should be visible
[chrome #0-0]
[chrome #0-0] Debug login navigates to dashboard
[chrome #0-0]    ✓ Given I am on the login page
[chrome #0-0]    ✓ When I click the Debug Login button
[chrome #0-0]    ✓ Then I should be on the dashboard page
[chrome #0-0]    ✓ And the dashboard heading should be visible
[chrome #0-0]
[chrome #0-0] Logout returns user to login page
[chrome #0-0]    ✓ Given I am logged in
[chrome #0-0]    ✓ And I am on the dashboard page
[chrome #0-0]    ✓ When I click the Logout button
[chrome #0-0]    ✓ Then I should be on the login page
[chrome #0-0]
[chrome #0-0] Unauthenticated access to dashboard redirects to login
[chrome #0-0]    ✓ Given I am not logged in
[chrome #0-0]    ✓ When I navigate to the dashboard page
[chrome #0-0]    ✓ Then I should be on the login page
[chrome #0-0]
[chrome #0-0] 13 passing (4.9s)
------------------------------------------------------------------
[chrome #0-1] » /features/blog.feature     12 passing (5.7s)
[chrome #0-2] » /features/checkout.feature 17 passing (6.8s)
[chrome #0-3] » /features/contact.feature  12 passing (4.9s)
[chrome #0-4] » /features/navigation.feature 21 passing (9s)
[chrome #0-5] » /features/store.feature    19 passing (3.9s)

Spec Files:  6 passed, 6 total (100% completed) in 00:00:48`;

const PLAYWRIGHT_OUTPUT = `$ npx playwright test --reporter=list

Running 35 tests using 1 worker

  ✓   1 [chromium] › tests/auth.spec.ts › Authentication › login page displays login form (392ms)
  ✓   2 [chromium] › tests/auth.spec.ts › Authentication › debug login navigates to dashboard (422ms)
  ✓   3 [chromium] › tests/auth.spec.ts › Authentication › logout returns user to login page (558ms)
  ✓   4 [chromium] › tests/auth.spec.ts › Authentication › unauthenticated access to dashboard redirects to login (250ms)
  ✓   5 [chromium] › tests/auth.spec.ts › Authentication › signup link on login page navigates to signup (397ms)
  ✓   6 [chromium] › tests/blog.spec.ts › Blog › blog page displays post list (274ms)
  ✓   7 [chromium] › tests/blog.spec.ts › Blog › blog page shows pagination controls (278ms)
  ✓   8 [chromium] › tests/blog.spec.ts › Blog › clicking a blog post navigates to the post (414ms)
  ✓   9 [chromium] › tests/blog.spec.ts › Blog › blog post page displays title content and date (437ms)
  ✓  10 [chromium] › tests/blog.spec.ts › Blog › next page button advances pagination when available (341ms)
  ✓  11 [chromium] › tests/checkout.spec.ts › Checkout Process › empty cart shows empty cart view (441ms)
  ✓  12 [chromium] › tests/checkout.spec.ts › Checkout Process › checkout page shows heading when cart has items (700ms)
  ✓  13 [chromium] › tests/checkout.spec.ts › Checkout Process › place order without filling form shows validation errors (768ms)
  ✓  14 [chromium] › tests/checkout.spec.ts › Checkout Process › complete checkout flow with debug fill (1.1s)
  ✓  15 [chromium] › tests/checkout.spec.ts › Checkout Process › back button returns to previous page (824ms)
  ✓  16 [chromium] › tests/contact.spec.ts › Contact Form › contact page displays the contact form (278ms)
  ✓  17 [chromium] › tests/contact.spec.ts › Contact Form › submitting empty form shows validation errors (344ms)
  ✓  18 [chromium] › tests/contact.spec.ts › Contact Form › name field rejects input shorter than 2 characters (352ms)
  ✓  19 [chromium] › tests/contact.spec.ts › Contact Form › character counter updates as user types (270ms)
  ✓  20 [chromium] › tests/contact.spec.ts › Contact Form › character counter turns red above 900 characters (273ms)
  ✓  21 [chromium] › tests/contact.spec.ts › Contact Form › contact info section displays email phone and location (259ms)
  ✓  22 [chromium] › tests/navigation.spec.ts › Site Navigation › header logo navigates to home page (401ms)
  ✓  23 [chromium] › tests/navigation.spec.ts › Site Navigation › navigate to About page via nav link (435ms)
  ✓  24 [chromium] › tests/navigation.spec.ts › Site Navigation › navigate to Projects page via nav link (434ms)
  ✓  25 [chromium] › tests/navigation.spec.ts › Site Navigation › navigate to Blog page via nav link (443ms)
  ✓  26 [chromium] › tests/navigation.spec.ts › Site Navigation › navigate to Store page via nav link (450ms)
  ✓  27 [chromium] › tests/navigation.spec.ts › Site Navigation › navigate to Contact page via nav link (420ms)
  ✓  28 [chromium] › tests/navigation.spec.ts › Site Navigation › cart icon navigates to checkout (426ms)
  ✓  29 [chromium] › tests/navigation.spec.ts › Site Navigation › hero View My Work button navigates to projects (456ms)
  ✓  30 [chromium] › tests/navigation.spec.ts › Site Navigation › hero Get In Touch button navigates to contact (428ms)
  ✓  31 [chromium] › tests/store.spec.ts › Store and Product Browsing › store page displays product list (459ms)
  ✓  32 [chromium] › tests/store.spec.ts › Store and Product Browsing › navigate to product detail page from store (649ms)
  ✓  33 [chromium] › tests/store.spec.ts › Store and Product Browsing › adding product to cart increments cart counter (544ms)
  ✓  34 [chromium] › tests/store.spec.ts › Store and Product Browsing › adding multiple products updates cart counter (756ms)
  ✓  35 [chromium] › tests/store.spec.ts › Store and Product Browsing › product detail page shows go to checkout after adding to cart (527ms)

  35 passed (19.2s)`;

const CYPRESS_OUTPUT = `$ npx cypress run --headless

  Running: auth.cy.ts (1 of 6)

  Authentication
    ✓ login page displays login form (361ms)
    ✓ debug login button logs in and navigates to dashboard (539ms)
    ✓ logout button returns user to login page (624ms)
    ✓ unauthenticated access to dashboard redirects to login (226ms)
    ✓ signup link on login page navigates to signup (397ms)
    ✓ header shows dashboard button when logged in (448ms)
  6 passing (3s)

  Running: blog.cy.ts (2 of 6)

  Blog
    ✓ blog page displays post list (289ms)
    ✓ blog page shows pagination controls (238ms)
    ✓ clicking a blog post navigates to the post page (441ms)
    ✓ blog post page shows title content and date (571ms)
    ✓ next page button advances pagination when available (428ms)
    ✓ previous button is not shown on first page (214ms)
  6 passing (2s)

  Running: checkout.cy.ts (3 of 6)

  Checkout Process
    ✓ empty cart shows empty cart view (258ms)
    ✓ checkout page shows heading when cart has items (692ms)
    ✓ place order without filling form shows validation errors (776ms)
    ✓ complete checkout flow using debug fill (1455ms)
    ✓ cart counter is hidden after checkout completion (1074ms)
    ✓ quantity increment button increases item quantity (863ms)
    ✓ quantity decrement button decreases item quantity (871ms)
  7 passing (6s)

  Running: contact.cy.ts (4 of 6)

  Contact Form
    ✓ contact page displays the contact form (282ms)
    ✓ contact info section is visible (232ms)
    ✓ submitting empty form shows validation errors (366ms)
    ✓ name shorter than 2 characters triggers validation error (515ms)
    ✓ invalid email format triggers validation error (1085ms)
    ✓ message shorter than 10 characters triggers validation error (1185ms)
    ✓ character counter updates as user types (840ms)
    ✓ character counter turns red above 900 characters (1165ms)
  8 passing (6s)

  Running: navigation.cy.ts (5 of 6)

  Site Navigation
    ✓ header logo navigates to home page (619ms)
    ✓ navigates to About page via nav link (447ms)
    ✓ navigates to Projects page via nav link (483ms)
    ✓ navigates to Blog page via nav link (431ms)
    ✓ navigates to Store page via nav link (456ms)
    ✓ navigates to Contact page via nav link (450ms)
    ✓ cart icon in header navigates to checkout (467ms)
    ✓ hero View My Work button navigates to projects (468ms)
    ✓ hero Get In Touch button navigates to contact (441ms)
  9 passing (5s)

  Running: store.cy.ts (6 of 6)

  Store and Product Browsing
    ✓ store page displays product list (270ms)
    ✓ navigates to product detail page from store (489ms)
    ✓ adding a product to cart increments the cart counter (385ms)
    ✓ adding multiple products updates the cart counter (819ms)
    ✓ product detail page shows go to checkout button after adding to cart (367ms)
  5 passing (2s)

  All specs passed!  41 tests  24 seconds`;

export const testResults: Record<string, SuiteResult> = {
  wdio: {
    suite: 'wdio',
    timestamp: '2026-03-05T19:29:00.000Z',
    durationMs: 48000,
    status: 'passed',
    output: WDIO_OUTPUT,
  },
  playwright: {
    suite: 'playwright',
    timestamp: '2026-03-05T19:29:00.000Z',
    durationMs: 19200,
    status: 'passed',
    output: PLAYWRIGHT_OUTPUT,
  },
  cypress: {
    suite: 'cypress',
    timestamp: '2026-03-05T19:29:00.000Z',
    durationMs: 24000,
    status: 'passed',
    output: CYPRESS_OUTPUT,
  },
};
