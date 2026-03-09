export type ManualStep = {
  action: string;
  expected: string;
};

export type ManualTestCase = {
  id: string;
  category: string;
  subCategory: string;
  steps: ManualStep[];
};

export const MANUAL_CATEGORIES = [
  'Navigation',
  'Store & Cart',
  'Checkout',
  'Authentication',
  'Contact Form',
  'Blog',
] as const;

export type ManualCategory = (typeof MANUAL_CATEGORIES)[number];

export const manualTestCases: ManualTestCase[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'NAV-001',
    category: 'Navigation',
    subCategory: 'Header Logo Navigates to Home',
    steps: [
      { action: 'Navigate to a non-home page (e.g., /about).', expected: 'About page is displayed.' },
      { action: 'Locate the site logo or brand name in the top-left of the header.', expected: 'Logo/brand is visible in the header.' },
      { action: 'Click the logo or brand name.', expected: 'Browser navigates to the home page (/).' },
      { action: 'Verify the home page hero section is visible.', expected: 'Hero heading and CTA buttons are displayed.' },
    ],
  },
  {
    id: 'NAV-002',
    category: 'Navigation',
    subCategory: 'Navigate to About Page',
    steps: [
      { action: 'Load the application from the home page (/).', expected: 'Home page is displayed.' },
      { action: 'Locate the "About" link in the main navigation bar.', expected: '"About" link is visible in the header.' },
      { action: 'Click the "About" link.', expected: 'Browser navigates to /about.' },
      { action: 'Verify the About page content is displayed.', expected: 'About page heading and content are visible.' },
    ],
  },
  {
    id: 'NAV-003',
    category: 'Navigation',
    subCategory: 'Navigate to Projects Page',
    steps: [
      { action: 'From any page, locate the "Projects" link in the main navigation bar.', expected: '"Projects" link is visible in the header.' },
      { action: 'Click the "Projects" link.', expected: 'Browser navigates to /projects.' },
      { action: 'Verify the Projects page is displayed.', expected: 'Projects heading and project cards are visible.' },
    ],
  },
  {
    id: 'NAV-004',
    category: 'Navigation',
    subCategory: 'Navigate to Blog Page',
    steps: [
      { action: 'From any page, locate the "Blog" link in the main navigation bar.', expected: '"Blog" link is visible in the header.' },
      { action: 'Click the "Blog" link.', expected: 'Browser navigates to /blog.' },
      { action: 'Verify the Blog page is displayed.', expected: 'Blog heading and post list are visible.' },
    ],
  },
  {
    id: 'NAV-005',
    category: 'Navigation',
    subCategory: 'Navigate to Store Page',
    steps: [
      { action: 'From any page, locate the "Store" link in the main navigation bar.', expected: '"Store" link is visible in the header.' },
      { action: 'Click the "Store" link.', expected: 'Browser navigates to /store.' },
      { action: 'Verify the Store page is displayed.', expected: 'Store heading and product grid are visible.' },
    ],
  },
  {
    id: 'NAV-006',
    category: 'Navigation',
    subCategory: 'Navigate to Contact Page',
    steps: [
      { action: 'From any page, locate the "Contact" link in the main navigation bar.', expected: '"Contact" link is visible in the header.' },
      { action: 'Click the "Contact" link.', expected: 'Browser navigates to /contact.' },
      { action: 'Verify the Contact page is displayed.', expected: 'Contact form and contact info section are visible.' },
    ],
  },
  {
    id: 'NAV-007',
    category: 'Navigation',
    subCategory: 'Cart Icon Navigates to Checkout',
    steps: [
      { action: 'From any page, locate the cart/shopping bag icon in the site header.', expected: 'Cart icon is visible in the header.' },
      { action: 'Click the cart icon.', expected: 'Browser navigates to the checkout page (/checkout).' },
      { action: 'Verify the checkout page is loaded.', expected: 'Cart content or empty cart message is displayed.' },
    ],
  },
  {
    id: 'NAV-008',
    category: 'Navigation',
    subCategory: 'Hero "View My Work" Button Navigates to Projects',
    steps: [
      { action: 'Navigate to the home page (/).', expected: 'Home page hero section is displayed.' },
      { action: 'Locate the "View My Work" call-to-action button in the hero.', expected: '"View My Work" button is visible.' },
      { action: 'Click the "View My Work" button.', expected: 'Browser navigates to /projects.' },
      { action: 'Verify the Projects page is displayed.', expected: 'Projects heading and project cards are visible.' },
    ],
  },
  {
    id: 'NAV-009',
    category: 'Navigation',
    subCategory: 'Hero "Get In Touch" Button Navigates to Contact',
    steps: [
      { action: 'Navigate to the home page (/).', expected: 'Home page hero section is displayed.' },
      { action: 'Locate the "Get In Touch" call-to-action button in the hero.', expected: '"Get In Touch" button is visible.' },
      { action: 'Click the "Get In Touch" button.', expected: 'Browser navigates to /contact.' },
      { action: 'Verify the Contact page is displayed.', expected: 'Contact form is visible.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STORE & CART
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'STORE-001',
    category: 'Store & Cart',
    subCategory: 'Store Page Displays Product List',
    steps: [
      { action: 'Navigate to the store page (/store).', expected: 'Store page loads successfully.' },
      { action: 'Observe the main content area.', expected: 'A grid of product cards is displayed.' },
      { action: 'Verify each product card shows a product name.', expected: 'Product names are visible on all cards.' },
      { action: 'Verify each product card shows a price.', expected: 'Product prices are shown on each card.' },
      { action: 'Verify each product card shows an image.', expected: 'Product images are rendered (not broken).' },
    ],
  },
  {
    id: 'STORE-002',
    category: 'Store & Cart',
    subCategory: 'Navigate to Product Detail Page',
    steps: [
      { action: 'Navigate to the store page (/store).', expected: 'Store page with product grid is displayed.' },
      { action: 'Click on any product card or product name.', expected: 'Browser navigates to the product detail page.' },
      { action: 'Verify the product name is displayed as a heading.', expected: 'Product name is shown prominently.' },
      { action: 'Verify the product description is displayed.', expected: 'Product description text is visible.' },
      { action: 'Verify the product price is displayed.', expected: 'Price is shown on the detail page.' },
      { action: 'Verify an "Add to Cart" button is present.', expected: '"Add to Cart" button is visible and enabled.' },
    ],
  },
  {
    id: 'STORE-003',
    category: 'Store & Cart',
    subCategory: 'Adding Product to Cart Increments Counter',
    steps: [
      { action: 'Note the current cart counter in the header (should be 0 or hidden).', expected: 'Cart counter starts at 0 or no badge is shown.' },
      { action: 'Navigate to any product detail page.', expected: 'Product detail page is displayed.' },
      { action: 'Click the "Add to Cart" button.', expected: 'Cart counter in the header increments to 1.' },
      { action: 'Verify a "Go to Checkout" button or link appears on the page.', expected: '"Go to Checkout" button becomes visible after adding.' },
    ],
  },
  {
    id: 'STORE-004',
    category: 'Store & Cart',
    subCategory: 'Adding Multiple Products Updates Cart Counter',
    steps: [
      { action: 'Navigate to the store and open the first product. Click "Add to Cart".', expected: 'Cart counter shows 1.' },
      { action: 'Navigate back to /store.', expected: 'Store product grid is displayed.' },
      { action: 'Open a second (different) product. Click "Add to Cart".', expected: 'Cart counter shows 2.' },
      { action: 'Navigate back to /store.', expected: 'Store product grid is displayed.' },
      { action: 'Open a third product. Click "Add to Cart".', expected: 'Cart counter shows 3.' },
      { action: 'Verify the cart badge in the header reads 3.', expected: 'Cart badge displays the number 3.' },
    ],
  },
  {
    id: 'STORE-005',
    category: 'Store & Cart',
    subCategory: 'Product Detail Page Shows "Go to Checkout" After Adding to Cart',
    steps: [
      { action: 'Navigate to any product detail page.', expected: 'Product detail page is displayed.' },
      { action: 'Verify no "Go to Checkout" button is visible before adding.', expected: '"Go to Checkout" is not yet shown.' },
      { action: 'Click "Add to Cart".', expected: 'Cart counter increments.' },
      { action: 'Verify the "Go to Checkout" button now appears.', expected: '"Go to Checkout" button is visible on the page.' },
      { action: 'Click "Go to Checkout".', expected: 'Browser navigates to /checkout.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CHECKOUT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'CHK-001',
    category: 'Checkout',
    subCategory: 'Empty Cart Shows Empty Cart View',
    steps: [
      { action: 'Ensure no items are in the cart (open a fresh session or clear the cart).', expected: 'Cart is empty.' },
      { action: 'Navigate to the checkout page (/checkout).', expected: 'Checkout page loads successfully.' },
      { action: 'Observe the checkout page content area.', expected: 'An empty cart message or illustration is displayed — no order form or item list.' },
    ],
  },
  {
    id: 'CHK-002',
    category: 'Checkout',
    subCategory: 'Checkout Page Shows Heading When Cart Has Items',
    steps: [
      { action: 'Navigate to any product detail page and click "Add to Cart".', expected: 'Cart counter increments to at least 1.' },
      { action: 'Navigate to the checkout page (/checkout).', expected: 'Checkout page loads.' },
      { action: 'Verify a checkout heading is visible.', expected: 'Checkout or Cart heading is displayed.' },
      { action: 'Verify the added product is listed with its name and price.', expected: 'Cart items section shows the product details.' },
    ],
  },
  {
    id: 'CHK-003',
    category: 'Checkout',
    subCategory: 'Place Order Without Filling Form Shows Validation Errors',
    steps: [
      { action: 'Add at least one item to the cart and navigate to /checkout.', expected: 'Checkout page with cart item is displayed.' },
      { action: 'Leave all order form fields blank.', expected: 'All form fields remain empty.' },
      { action: 'Click the "Place Order" button.', expected: 'Form submission is attempted.' },
      { action: 'Observe the form fields after submission.', expected: 'Validation error messages appear below the required fields.' },
      { action: 'Verify the page has not navigated away.', expected: 'User remains on the checkout page.' },
    ],
  },
  {
    id: 'CHK-004',
    category: 'Checkout',
    subCategory: 'Complete Checkout Flow',
    steps: [
      { action: 'Add an item to the cart and navigate to /checkout.', expected: 'Checkout page with item is displayed.' },
      { action: 'Fill in all required order form fields with valid data (name, address, etc.).', expected: 'All required fields are filled.' },
      { action: 'Click the "Place Order" button.', expected: 'Order is submitted.' },
      { action: 'Verify a success state or confirmation message is shown.', expected: 'Order confirmation screen or success message is displayed.' },
      { action: 'Verify the cart counter is cleared or hidden.', expected: 'Cart badge is no longer shown (or shows 0) in the header.' },
    ],
  },
  {
    id: 'CHK-005',
    category: 'Checkout',
    subCategory: 'Cart Counter Is Hidden After Checkout Completion',
    steps: [
      { action: 'Complete a full checkout flow (add item → fill form → place order).', expected: 'Order placed successfully; success state shown.' },
      { action: 'Observe the header cart icon immediately after checkout.', expected: 'Cart badge/counter is no longer visible.' },
      { action: 'Navigate to another page (e.g., home).', expected: 'Cart counter remains cleared across pages.' },
    ],
  },
  {
    id: 'CHK-006',
    category: 'Checkout',
    subCategory: 'Quantity Increment Button Increases Item Quantity',
    steps: [
      { action: 'Add one product to the cart and navigate to /checkout.', expected: 'Checkout page shows the item with quantity 1.' },
      { action: 'Locate the "+" (increment) button next to the cart item.', expected: 'Increment button is visible and enabled.' },
      { action: 'Click the increment button once.', expected: 'Item quantity increases to 2.' },
      { action: 'Verify the quantity display next to the item shows 2.', expected: 'Quantity shown is 2.' },
    ],
  },
  {
    id: 'CHK-007',
    category: 'Checkout',
    subCategory: 'Quantity Decrement Button Decreases Item Quantity',
    steps: [
      { action: 'Add one product to the cart, navigate to /checkout, and increment quantity to 2 (see CHK-006).', expected: 'Checkout page shows the item with quantity 2.' },
      { action: 'Locate the "−" (decrement) button next to the cart item.', expected: 'Decrement button is visible and enabled.' },
      { action: 'Click the decrement button once.', expected: 'Item quantity decreases from 2 to 1.' },
      { action: 'Verify the quantity display next to the item shows 1.', expected: 'Quantity shown is 1.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTHENTICATION
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'AUTH-001',
    category: 'Authentication',
    subCategory: 'Login Page Displays Login Form',
    steps: [
      { action: 'Navigate to the login page (/login).', expected: 'Login page loads successfully.' },
      { action: 'Verify a username or email input field is present.', expected: 'Username/email field is visible and interactive.' },
      { action: 'Verify a password input field is present.', expected: 'Password field is visible; input is masked.' },
      { action: 'Verify a Login (or Sign In) button is present.', expected: 'Login button is visible and enabled.' },
      { action: 'Verify a "Debug Login" shortcut button is present (portfolio demo feature).', expected: '"Debug Login" button is visible.' },
    ],
  },
  {
    id: 'AUTH-002',
    category: 'Authentication',
    subCategory: 'Debug Login Navigates to Dashboard',
    steps: [
      { action: 'Navigate to the login page (/login).', expected: 'Login page is displayed.' },
      { action: 'Locate and click the "Debug Login" button.', expected: 'Browser navigates away from the login page.' },
      { action: 'Verify the current URL is /dashboard.', expected: 'URL bar shows /dashboard.' },
      { action: 'Verify the dashboard heading is displayed on the page.', expected: 'Dashboard heading is visible.' },
    ],
  },
  {
    id: 'AUTH-003',
    category: 'Authentication',
    subCategory: 'Logout Returns User to Login Page',
    steps: [
      { action: 'Log in using the Debug Login button (see AUTH-002). Confirm you are on the dashboard.', expected: 'User is on the dashboard page (/dashboard).' },
      { action: 'Locate the "Logout" button in the header or dashboard navigation.', expected: 'Logout button is visible.' },
      { action: 'Click the "Logout" button.', expected: 'Browser navigates away from the dashboard.' },
      { action: 'Verify the current URL is /login.', expected: 'URL bar shows /login.' },
      { action: 'Verify the login form is displayed.', expected: 'Username, password fields, and Login button are visible.' },
    ],
  },
  {
    id: 'AUTH-004',
    category: 'Authentication',
    subCategory: 'Unauthenticated Access to Dashboard Redirects to Login',
    steps: [
      { action: 'Ensure the user is not logged in (start a fresh session or log out first).', expected: 'User is not authenticated.' },
      { action: 'Type /dashboard in the browser address bar and press Enter.', expected: 'Navigation to /dashboard is attempted.' },
      { action: 'Observe the resulting page.', expected: 'Browser is redirected to /login.' },
      { action: 'Verify the login form is displayed — not the dashboard.', expected: 'Login page content is shown instead of the dashboard.' },
    ],
  },
  {
    id: 'AUTH-005',
    category: 'Authentication',
    subCategory: 'Signup Link on Login Page Navigates to Signup',
    steps: [
      { action: 'Navigate to the login page (/login).', expected: 'Login page is displayed.' },
      { action: 'Locate a "Sign Up", "Register", or "Create Account" link on the page.', expected: 'Signup link is visible.' },
      { action: 'Click the signup link.', expected: 'Browser navigates to /signup.' },
      { action: 'Verify the signup form is displayed.', expected: 'Signup page with registration fields is shown.' },
    ],
  },
  {
    id: 'AUTH-006',
    category: 'Authentication',
    subCategory: 'Header Shows Dashboard Button When Logged In',
    steps: [
      { action: 'Log in via the Debug Login button (see AUTH-002).', expected: 'User is on the dashboard.' },
      { action: 'Look at the main site header navigation.', expected: 'Header is visible.' },
      { action: 'Verify a "Dashboard" link or button appears in the header.', expected: 'Dashboard navigation link is shown.' },
      { action: 'Navigate to the home page (/).', expected: 'Home page is displayed.' },
      { action: 'Verify the Dashboard link is still present in the header.', expected: 'Dashboard link persists across pages while logged in.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CONTACT FORM
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'CONT-001',
    category: 'Contact Form',
    subCategory: 'Contact Page Displays the Contact Form',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact page loads successfully.' },
      { action: 'Verify a "Name" input field is visible.', expected: 'Name field is present and interactive.' },
      { action: 'Verify an "Email" input field is visible.', expected: 'Email field is present and interactive.' },
      { action: 'Verify a "Message" textarea is visible.', expected: 'Message textarea is present.' },
      { action: 'Verify a Submit (or Send) button is visible.', expected: 'Submit button is present and enabled.' },
    ],
  },
  {
    id: 'CONT-002',
    category: 'Contact Form',
    subCategory: 'Contact Info Section Is Visible',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact page is loaded.' },
      { action: 'Locate the contact information section on the page.', expected: 'Contact info section is present.' },
      { action: 'Verify an email address is displayed.', expected: 'Email contact info is visible.' },
      { action: 'Verify a phone number is displayed.', expected: 'Phone number is visible.' },
      { action: 'Verify a location or address is displayed.', expected: 'Location information is visible.' },
    ],
  },
  {
    id: 'CONT-003',
    category: 'Contact Form',
    subCategory: 'Submitting Empty Form Shows Validation Errors',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact form is displayed.' },
      { action: 'Leave the Name, Email, and Message fields completely blank.', expected: 'All fields are empty.' },
      { action: 'Click the Submit button.', expected: 'Form submission is attempted.' },
      { action: 'Verify an error message appears below the Name field.', expected: 'Name validation error is shown.' },
      { action: 'Verify an error message appears below the Email field.', expected: 'Email validation error is shown.' },
      { action: 'Verify an error message appears below the Message field.', expected: 'Message validation error is shown.' },
      { action: 'Verify the page has not navigated away.', expected: 'User remains on the contact page.' },
    ],
  },
  {
    id: 'CONT-004',
    category: 'Contact Form',
    subCategory: 'Name Field Rejects Input Shorter Than 2 Characters',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact form is displayed.' },
      { action: 'Enter a single character (e.g., "A") in the Name field.', expected: 'Single character appears in the Name field.' },
      { action: 'Fill in a valid email and a valid message (10+ characters).', expected: 'Email and Message fields have valid data.' },
      { action: 'Click Submit.', expected: 'Form submission is attempted.' },
      { action: 'Verify a validation error appears for the Name field.', expected: 'Error message states the name must be at least 2 characters.' },
    ],
  },
  {
    id: 'CONT-005',
    category: 'Contact Form',
    subCategory: 'Invalid Email Format Triggers Validation Error',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact form is displayed.' },
      { action: 'Enter a valid name (2+ characters) in the Name field.', expected: 'Name field has valid data.' },
      { action: 'Enter an invalid email address (e.g., "notanemail") in the Email field.', expected: 'Invalid email text is entered.' },
      { action: 'Enter a valid message (10+ characters) in the Message field.', expected: 'Message field has valid data.' },
      { action: 'Click Submit.', expected: 'Form submission is attempted.' },
      { action: 'Verify a validation error appears for the Email field.', expected: 'Error message indicates an invalid email format.' },
    ],
  },
  {
    id: 'CONT-006',
    category: 'Contact Form',
    subCategory: 'Message Shorter Than 10 Characters Triggers Validation Error',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact form is displayed.' },
      { action: 'Enter valid data in the Name field (2+ characters).', expected: 'Name field has valid data.' },
      { action: 'Enter a valid email address in the Email field.', expected: 'Email field has valid data.' },
      { action: 'Enter fewer than 10 characters in the Message field (e.g., "Hi there").', expected: 'Short message is entered.' },
      { action: 'Click Submit.', expected: 'Form submission is attempted.' },
      { action: 'Verify a validation error appears for the Message field.', expected: 'Error message indicates the message must be at least 10 characters.' },
    ],
  },
  {
    id: 'CONT-007',
    category: 'Contact Form',
    subCategory: 'Character Counter Updates as User Types',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact form is displayed.' },
      { action: 'Locate the character counter near the Message textarea.', expected: 'Counter is visible (e.g., "0 / 1000").' },
      { action: 'Type 10 characters into the Message field.', expected: 'Counter updates to reflect 10 characters.' },
      { action: 'Type 50 more characters (total: 60).', expected: 'Counter updates to 60 characters.' },
      { action: 'Delete some characters and observe the counter.', expected: 'Counter decrements to match the remaining character count.' },
    ],
  },
  {
    id: 'CONT-008',
    category: 'Contact Form',
    subCategory: 'Character Counter Turns Red Above 900 Characters',
    steps: [
      { action: 'Navigate to the contact page (/contact).', expected: 'Contact form is displayed.' },
      { action: 'Observe the default color of the character counter.', expected: 'Counter is in its normal (non-warning) color.' },
      { action: 'Type exactly 900 characters into the Message field.', expected: '900 characters are in the message field.' },
      { action: 'Verify the counter has not yet turned red at exactly 900.', expected: 'Counter remains in normal color at 900 characters.' },
      { action: 'Type one more character (total: 901).', expected: '901 characters are in the field.' },
      { action: 'Verify the character counter color changes to a red/warning state.', expected: 'Counter turns red to indicate the message is approaching the limit.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BLOG
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'BLOG-001',
    category: 'Blog',
    subCategory: 'Blog Page Displays Post List',
    steps: [
      { action: 'Navigate to the blog page (/blog).', expected: 'Blog page loads successfully.' },
      { action: 'Verify a list of blog post previews is displayed.', expected: 'Multiple post cards or entries are visible.' },
      { action: 'Verify each post shows a title.', expected: 'Post titles are visible on the list.' },
      { action: 'Verify the post list is readable and well-formatted.', expected: 'Post list is organized and legible.' },
    ],
  },
  {
    id: 'BLOG-002',
    category: 'Blog',
    subCategory: 'Blog Page Shows Pagination Controls',
    steps: [
      { action: 'Navigate to the blog page (/blog).', expected: 'Blog page is displayed with post list.' },
      { action: 'Scroll to the bottom of the post list.', expected: 'Bottom of the content area is visible.' },
      { action: 'Verify pagination controls are present.', expected: 'Pagination bar with at least a "Next" button is shown.' },
      { action: 'Verify a current page indicator is present (e.g., "Page 1 of N").', expected: 'Current page context is clearly indicated.' },
    ],
  },
  {
    id: 'BLOG-003',
    category: 'Blog',
    subCategory: 'Clicking a Blog Post Navigates to the Post Page',
    steps: [
      { action: 'Navigate to the blog page (/blog).', expected: 'Blog page with post list is displayed.' },
      { action: 'Click on any blog post title or card.', expected: 'Browser navigates away from the post list.' },
      { action: 'Verify the URL has changed to a post-specific URL (e.g., /blog/post-slug).', expected: 'URL reflects the blog post slug.' },
      { action: 'Verify the blog post detail page is displayed.', expected: 'Post detail content is shown.' },
    ],
  },
  {
    id: 'BLOG-004',
    category: 'Blog',
    subCategory: 'Blog Post Page Displays Title, Content, and Date',
    steps: [
      { action: 'Navigate to any blog post detail page (via /blog or direct URL).', expected: 'Blog post detail page is displayed.' },
      { action: 'Verify the post title is prominently displayed as a heading.', expected: 'Post title is visible as a heading element.' },
      { action: 'Verify the post body/content is displayed below the title.', expected: 'Post article content is readable.' },
      { action: 'Verify a publication date is shown on the page.', expected: 'Date is displayed (e.g., formatted as Month DD, YYYY).' },
    ],
  },
  {
    id: 'BLOG-005',
    category: 'Blog',
    subCategory: 'Next Page Button Advances Pagination',
    steps: [
      { action: 'Navigate to the blog page (/blog). Confirm you are on page 1.', expected: 'Page 1 of blog posts is displayed.' },
      { action: 'Note the titles of the posts currently shown.', expected: 'Current page 1 post list is visible.' },
      { action: 'Locate and click the "Next" pagination button.', expected: 'Browser loads page 2 of the blog.' },
      { action: 'Verify the page indicator now reflects page 2.', expected: 'Pagination shows page 2 as the current page.' },
      { action: 'Verify the posts shown are different from page 1.', expected: 'A new set of posts is displayed — not the same as page 1.' },
    ],
  },
  {
    id: 'BLOG-006',
    category: 'Blog',
    subCategory: 'Previous Button Is Not Shown on First Page',
    steps: [
      { action: 'Navigate to the blog page (/blog). Confirm you are on page 1.', expected: 'Page 1 of the blog is displayed.' },
      { action: 'Look for a "Previous" or "Back" pagination button.', expected: 'No "Previous" button is rendered or the button is hidden/disabled.' },
      { action: 'Verify there is no way to navigate to a page 0 or previous page from here.', expected: 'No back-pagination control is active on page 1.' },
    ],
  },
  {
    id: 'BLOG-007',
    category: 'Blog',
    subCategory: 'Previous Button Appears After Navigating to Page 2',
    steps: [
      { action: 'Navigate to the blog page (/blog) on page 1. Confirm no "Previous" button is shown.', expected: 'Page 1 displayed; no Previous button.' },
      { action: 'Click the "Next" pagination button.', expected: 'Page 2 is loaded.' },
      { action: 'Verify the "Previous" button now appears in the pagination controls.', expected: 'Previous button is visible on page 2.' },
      { action: 'Click the "Previous" button.', expected: 'Browser navigates back to page 1.' },
      { action: 'Verify page 1 content is displayed again.', expected: 'Original page 1 posts are shown.' },
      { action: 'Verify the "Previous" button is no longer visible.', expected: 'Previous button disappears when back on page 1.' },
    ],
  },
  {
    id: 'CHAT-001',
    category: 'AI Chatbot',
    subCategory: 'Chatbot Button Visible on Homepage',
    steps: [
      { action: 'Navigate to the homepage (/).', expected: 'The homepage loads successfully.' },
      { action: 'Scan the bottom-right corner of the viewport.', expected: 'A circular chat icon button is visible in the bottom-right corner.' },
      { action: 'Verify the button is accessible and not obscured by other elements.', expected: 'The chatbot open button is fully visible and clickable.' },
    ],
  },
  {
    id: 'CHAT-002',
    category: 'AI Chatbot',
    subCategory: 'Opening the Chatbot Displays the Chat Interface',
    steps: [
      { action: 'Navigate to the homepage (/).', expected: 'The homepage loads successfully.' },
      { action: 'Click the chatbot icon button in the bottom-right corner.', expected: 'A chat panel slides open from the right side of the screen.' },
      { action: 'Verify the panel header reads "Chat with Kyra".', expected: 'The title "Chat with Kyra" is displayed at the top of the chat panel.' },
      { action: 'Verify a text input field is visible at the bottom of the panel.', expected: 'An input field with placeholder text is present.' },
      { action: 'Verify a send button is present next to the input field.', expected: 'A send/submit button is visible and appears enabled.' },
    ],
  },
  {
    id: 'CHAT-003',
    category: 'AI Chatbot',
    subCategory: 'Input Field and Send Button Are Enabled',
    steps: [
      { action: 'Open the chatbot by clicking the chat icon button.', expected: 'The chat panel opens.' },
      { action: 'Click inside the text input field.', expected: 'The input field receives focus.' },
      { action: 'Type a short message (e.g., "Hello").', expected: 'The typed text appears in the input field.' },
      { action: 'Verify the send button is active/enabled.', expected: 'The send button is clickable.' },
      { action: 'Clear the input field and verify the send button state.', expected: 'The send button may be disabled when the input is empty.' },
    ],
  },
  {
    id: 'CHAT-004',
    category: 'AI Chatbot',
    subCategory: 'Sending a Message Displays It in the Chat History',
    steps: [
      { action: 'Open the chatbot by clicking the chat icon button.', expected: 'The chat panel opens.' },
      { action: 'Type a message in the input field (e.g., "What projects has Kyler worked on?").', expected: 'The message text appears in the input field.' },
      { action: 'Click the send button or press Enter to submit.', expected: 'The input field clears and the user\'s message appears in the chat history.' },
      { action: 'Verify the user\'s message bubble is displayed with the correct text.', expected: 'The sent message is visible in the chat with a user avatar or styling.' },
      { action: 'Verify a loading indicator appears while waiting for a response.', expected: 'A spinner or typing indicator is shown while Kyra processes the message.' },
    ],
  },
  {
    id: 'CHAT-005',
    category: 'AI Chatbot',
    subCategory: 'Kyra Responds to a Portfolio-Related Question',
    steps: [
      { action: 'Open the chatbot and type a portfolio-related question (e.g., "What test frameworks does Kyler work with?").', expected: 'The message is submitted and appears in the chat.' },
      { action: 'Wait for Kyra\'s response to appear (allow up to 30 seconds).', expected: 'A response message from Kyra appears in the chat below the user\'s message.' },
      { action: 'Verify the response is relevant and mentions testing-related information.', expected: 'Kyra\'s reply references relevant details such as WebdriverIO, Playwright, Cypress, or similar.' },
      { action: 'Verify the response is displayed with a Kyra avatar or assistant styling.', expected: 'The response is visually distinct from the user\'s message.' },
    ],
  },
  {
    id: 'CHAT-006',
    category: 'AI Chatbot',
    subCategory: 'Kyra Declines Off-Topic Questions',
    steps: [
      { action: 'Open the chatbot and type a question unrelated to Kyler or QA (e.g., "What is the capital of France?").', expected: 'The message is submitted and appears in the chat.' },
      { action: 'Wait for Kyra\'s response to appear (allow up to 30 seconds).', expected: 'A response from Kyra appears in the chat.' },
      { action: 'Verify that Kyra declines to answer or redirects to Kyler\'s professional information.', expected: 'Kyra\'s reply indicates she can only assist with questions about Kyler or his work, without answering the off-topic question.' },
    ],
  },
];
