## Playwright CLI Commands Reference

### Run Tests
- **Run all tests:**  
  ```sh
  npx playwright test
  ```
- **Run tests for the Chromium project:**  
  ```sh
  npx playwright test --project=chromium
  ```
- **Run tests for the Chromium project in headed mode:**  
  ```sh
  npx playwright test --project=chromium --headed
  ```
- **Run a specific test file:**  
  ```sh
  npx playwright test example.spec.ts --project=chromium
  ```
- **Run tests matching a specific pattern:**  
  ```sh
  npx playwright test -g "has title" --project=chromium
  ```

### Debugging and Reporting
- **Show test report:**  
  ```sh
  npx playwright show-report
  ```
- **Run tests in UI mode:**  
  ```sh
  npx playwright test --ui
  ```
- **Run tests with tracing enabled:**  
  ```sh
  npx playwright test --project=chromium --trace on
  ```
- **Run tests in debug mode:**  
  ```sh
  npx playwright test --project=chromium --debug
  ```

### Set Up Project
- **Initialize a new Playwright project:**  
  ```sh
  npm init playwright@latest
  ```

### Example: Run a Test with Environment Variables
- **Run a test file using environment variables:**  
  ```sh
  URL=https://www.npmjs.com/package/dotenv npx playwright test autoWaitingUsingENV.spec.ts --project=chromium --headed
  ```