import { test, expect } from "@playwright/test";
import { loginAsCustomer, loginAsSalonOwner } from "../../helpers/ui/login";
let webBaseURL: string;

test.describe("login test cases", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    webBaseURL = testInfo.project.use.baseURL
      ? testInfo.project.use.baseURL
      : process.env.WEB_BASEURL
      ? process.env.WEB_BASEURL
      : "";
    testInfo.setTimeout(testInfo.timeout + 120000);
    await page.goto(webBaseURL);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");
  });
  test("it should verify that the customer can login successfully", async ({
    page,
  }) => {
    await loginAsCustomer(page);
  });

  test("it should verify that the salon owners can login successfully", async ({
    page,
  }) => {
    await loginAsSalonOwner(page);
  });
});
