# Kyler Chavez — QA Testing Playground

A full-stack Next.js portfolio demonstrating manual and automated QA skills across three industry-standard test frameworks: **Playwright**, **Cypress**, and **WebdriverIO**. The app itself — store, blog, authentication, and contact flows — serves as the live test target.

**[Live Demo →](https://your-deployment-url.vercel.app)**

---

## Test Coverage

| Feature Area       | Playwright | Cypress | WebdriverIO |
|--------------------|:----------:|:-------:|:-----------:|
| Site Navigation    | 9 tests    | 9 tests | 7 scenarios |
| Authentication     | 5 tests    | 6 tests | 4 scenarios |
| Blog               | 5 tests    | 6 tests | 4 scenarios |
| Store & Products   | 6 tests    | 5 tests | 4 scenarios |
| Checkout Process   | 5 tests    | 7 tests | 4 scenarios |
| Contact Form       | 5 tests    | 8 tests | 4 scenarios |
| **Total**          | **35**     | **41**  | **27**      |

---

## Test Frameworks

| Framework   | Location            | Language   | Style                    |
|-------------|---------------------|------------|--------------------------|
| Playwright  | `tests/playwright/` | TypeScript | Functional / Page Object |
| Cypress     | `tests/cypress/`    | TypeScript | Behavior-driven          |
| WebdriverIO | `tests/wdio/`       | TypeScript | Gherkin / BDD (Cucumber) |

---

## Running the Tests

Each suite has its own directory and dependency set.

### Playwright
```bash
cd tests/playwright
npm install
npx playwright install chromium  # first-time browser install
npx playwright test --reporter=list
```

### Cypress
```bash
cd tests/cypress
npm install
npx cypress run --headless       # CI / headless mode
npx cypress open                 # interactive runner
```

### WebdriverIO
```bash
cd tests/wdio
npm install
npm test
```

---

## Tech Stack

**Application**
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + ShadCN UI (Radix)
- **AI Integration:** Genkit + Google Gemini — powers a portfolio chatbot, product image generation, and a test coverage analyzer
- **Deployment:** Vercel

---

## Running the App Locally

```bash
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002).

> The dev server runs on port **9002** to avoid conflicts with common local services.

### AI Features (optional)

The Genkit chatbot and test analyzer require a Google AI API key. Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

All other app features work without it.

---

## Project Structure

```
├── src/
│   ├── app/              # Pages: store, blog, auth, checkout, contact
│   ├── ai/flows/         # Genkit AI flows (chatbot, image gen, test analysis)
│   └── lib/              # Shared utilities and pre-recorded test output
├── tests/
│   ├── playwright/       # Playwright test suite
│   ├── cypress/          # Cypress test suite
│   └── wdio/             # WebdriverIO + Cucumber BDD suite
```

---

## Interactive Test Runner

The Projects page includes an in-browser terminal that streams recorded test output for all three frameworks — so the full suite is visible without a local setup. A **Reset** button restores the snapshot; **Run Tests** replays the stream with realistic per-line timing.
