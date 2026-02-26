# GitHub Actions CI – Step-by-step guide

This project is set up to run Playwright tests automatically on GitHub when you push or open a pull request.

---

## What was added

1. **`.github/workflows/playwright.yml`** – workflow that:
   - Runs on every **push** and **pull request** to `main` or `master`
   - Installs Node 20, dependencies, and Chromium
   - Runs **JavaScript tests** (`npm run test:js`) in **headless** mode
   - Uploads **Playwright HTML report** and **Allure report** as artifacts (you can download them from the run)

2. **`playwright.config.js`** – updated so:
   - **Locally**: browser runs in **headed** mode (you see the window)
   - **On GitHub (CI)**: browser runs in **headless** mode (no window; `CI` env is set by GitHub)

---

## Step 1: Put your project under Git (if not already)

Open a terminal in the project folder (`d:\TEST AI`) and run:

```bash
git init
git add .
git commit -m "Add Playwright tests and GitHub Actions workflow"
```

*(If you already have a repo and have committed before, you can skip `git init` and just add/commit the new files.)*

---

## Step 2: Create a repository on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click **“New repository”** (or **“+” → “New repository”**).
3. Choose a name (e.g. `test-ai` or `playwright-login-tests`).
4. Leave it **empty** (no README, no .gitignore).
5. Click **“Create repository”**.

---

## Step 3: Push your project to GitHub

GitHub will show you commands. Use these (replace `YOUR_USERNAME` and `YOUR_REPO` with your actual repo URL or name):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

If your default branch is `master` instead of `main`:

```bash
git push -u origin master
```

The workflow runs on **push** to `main` or `master`, so right after this push the **“Playwright Tests (JS)”** workflow will start.

---

## Step 4: See the results

1. Open your repository on GitHub.
2. Click the **“Actions”** tab.
3. You should see a run for your latest push (e.g. **“Playwright Tests (JS)”**).
4. Click the run to see:
   - **Jobs** → **Run Playwright tests** → each **step** (checkout, install, run tests, upload artifacts).
   - **Green check** = all steps passed; **red X** = something failed (e.g. a test failed).

---

## Step 5: Download the reports

1. In the same run page, scroll to **Artifacts** at the bottom.
2. You’ll see:
   - **playwright-report** – Playwright’s HTML report (screenshots, traces, etc.).
   - **allure-report** – Allure HTML report (if Allure step ran).
3. Click an artifact to **download** it (ZIP). Unzip and open `index.html` in a browser to view the report.

---

## Summary

| Step | What you do |
|------|----------------|
| 1 | `git init` (if needed), `git add .`, `git commit` |
| 2 | Create a new empty repo on GitHub |
| 3 | `git remote add origin ...`, `git push -u origin main` (or `master`) |
| 4 | Open repo → **Actions** → click the run to see logs |
| 5 | In the run → **Artifacts** → download **playwright-report** and **allure-report** |

From now on, every push/PR to `main` (or `master`) will run your JavaScript Playwright tests and produce these reports.

---

## If a run fails

- Click the failed run → **Run Playwright tests** → open the failed **step** (usually “Run Playwright tests (JavaScript)”).
- Read the log: it will show which test failed and the error (e.g. timeout, wrong locator, or “Invalid username or password” if the app is down or credentials are wrong).
- Fix the test or the app, commit, and push again; the workflow will run again automatically.

---

## Optional: run only on certain branches or paths

In `.github/workflows/playwright.yml` you can change:

- **Branches**: under `on.push.branches` and `on.pull_request.branches` (e.g. add `develop`).
- **Paths** (run only when some files change):
  ```yaml
  on:
    push:
      paths:
        - 'tests/**'
        - 'pages/**'
        - 'package.json'
        - '.github/workflows/playwright.yml'
  ```

You can come back to this file anytime and add more steps (e.g. Slack/Teams notification, or deploy only if tests pass) when you’re ready.
