import { test, expect, request } from "@playwright/test";
import { loginCredentials } from "../../utils/data/login";
let webBaseURL: string;
let loginUrl = "api/auth/login";

test.describe("Login API", () => {
  test.beforeEach(async ({}, testInfo) => {
    webBaseURL = testInfo.project.use.baseURL
      ? testInfo.project.use.baseURL
      : process.env.WEB_BASEURL
      ? process.env.WEB_BASEURL
      : "";
    testInfo.setTimeout(testInfo.timeout + 120000);
  });

  test("should login successfully with valid credentials", async ({}) => {
    const apiContext = await request.newContext();
    const loginPayload = {
      email: loginCredentials.customerEmail,
      password: loginCredentials.customerPassword,
    };
    const response = await apiContext.post(`${webBaseURL}${loginUrl}`, {
      data: loginPayload,
    });
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData).toHaveProperty("auth_token");
    expect(responseData.token).not.toBeNull();
  });

  test("should fail login with invalid credentials", async ({}) => {
    const apiContext = await request.newContext();
    const loginPayload = {
      email: "invalid@example.com",
      password: "invalidpassword",
    };
    const response = await apiContext.post(`${webBaseURL}${loginUrl}`, {
      data: loginPayload,
    });
    expect(response.status()).toBe(404);
    const responseData = await response.json();
    expect(responseData).toHaveProperty("message");
    expect(responseData.message).toBe("Invalid Credentials");
  });
});
