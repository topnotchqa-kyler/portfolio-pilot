# Kyler's Testing Playground

This is a NextJS portfolio and testing sandbox built for demonstrating software quality assurance skills, including manual and automated testing.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS & ShadCN UI
- **AI Integration:** Genkit for chatbot and test analysis
- **Icons:** Lucide React

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Migration to GitHub

If you are migrating this project to a new GitHub repository:

1. **Initialize Git:** `git init`
2. **Stage and Commit:**
   ```bash
   git add .
   git commit -m "Initial commit"
   ```
3. **Set the Remote URL:**
   If you get the error `remote origin already exists`, use:
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
   Otherwise, use:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
4. **Push to Main:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Testing Sandbox
The site includes a functional store and blog, which are intended targets for automated testing suites (WebdriverIO, Playwright, and Cypress). These tests can be found in their respective repositories linked in the Projects section.
