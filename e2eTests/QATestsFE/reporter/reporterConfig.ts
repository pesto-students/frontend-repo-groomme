import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

class CustomReporter implements Reporter {
  private totalTests = 0;
  private passedTests = 0;

  onTestEnd(test: TestCase, result: TestResult) {
    this.totalTests++;
    if (result.status === "passed") {
      this.passedTests++;
    }
  }

  onEnd() {
    const passingPercentage = (this.passedTests / this.totalTests) * 100;
    console.log(`Passing Test Percentage: ${passingPercentage.toFixed(2)}%`);

    const minimumPassingPercentage = 80;
    if (passingPercentage < minimumPassingPercentage) {
      throw new Error(
        `Passing test percentage is below the threshold of ${minimumPassingPercentage}%`
      );
    }
  }
}

export default CustomReporter;
