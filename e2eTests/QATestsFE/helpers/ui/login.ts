import { expect, Page } from "@playwright/test";
import { loginPageControllers } from "../../utils/pageObject/login";
import { loginCredentials } from "../../utils/data/login";
import { loginToastSucess } from "../../utils/toastMessagesText/login";

export async function loginAsCustomer(page: Page) {
  await page.waitForSelector(loginPageControllers.loginButton);
  await page.locator(loginPageControllers.loginButton).click();
  await page.waitForSelector(loginPageControllers.emailInput);
  await page.waitForSelector(loginPageControllers.passwordInput);
  await page.waitForSelector(loginPageControllers.submitButton);

  await page
    .locator(loginPageControllers.emailInput)
    .fill(loginCredentials.customerEmail);
  await page
    .locator(loginPageControllers.passwordInput)
    .fill(loginCredentials.customerPassword);

  await page.locator(loginPageControllers.submitButton).click();
  await page.waitForLoadState("networkidle");
  const alertMessage = await page
    .locator(loginPageControllers.alertMessage)
    .textContent();
  expect(alertMessage).toBe(loginToastSucess);
}
export async function loginAsSalonOwner(page: Page) {
  await page.waitForSelector(loginPageControllers.loginButton);
  await page.locator(loginPageControllers.loginButton).click();
  await page.waitForSelector(loginPageControllers.emailInput);
  await page.waitForSelector(loginPageControllers.passwordInput);
  await page.waitForSelector(loginPageControllers.submitButton);

  await page
    .locator(loginPageControllers.emailInput)
    .fill(loginCredentials.salonEmail);
  await page
    .locator(loginPageControllers.passwordInput)
    .fill(loginCredentials.salonPassword);

  await page.locator(loginPageControllers.submitButton).click();
  await page.waitForLoadState("networkidle");
  const alertMessage = await page
    .locator(loginPageControllers.alertMessage)
    .textContent();
  expect(alertMessage).toBe(loginToastSucess);
}
