import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { ZippopotamWorld, ZippopotamResponseBody } from "../support/world";

const requiredRootFields = [
  "post code",
  "country",
  "country abbreviation",
  "places",
];

const requiredPlaceFields = [
  "place name",
  "longitude",
  "state",
  "state abbreviation",
  "latitude",
];

async function getResponseBody(
  world: ZippopotamWorld,
): Promise<ZippopotamResponseBody> {
  if (!world.response) {
    throw new Error(
      "Response is not available. Make sure the When step has run.",
    );
  }

  if (!world.responseBody) {
    world.responseBody =
      (await world.response.json()) as ZippopotamResponseBody;
  }

  return world.responseBody;
}

Given(
  "I have a country code {string} and postal code {string}",
  function (this: ZippopotamWorld, countryCode: string, postalCode: string) {
    this.countryCode = countryCode;
    this.postalCode = postalCode;
  },
);

When(
  /^I request postcode information from the Zippopotam API$/,
  async function (this: ZippopotamWorld) {
    if (!this.apiContext) {
      throw new Error("API context is not initialised.");
    }

    const endpoint = [this.countryCode ?? "", this.postalCode ?? ""].join("/");

    const startTime = Date.now();
    this.response = await this.apiContext.get(endpoint);
    this.responseTime = Date.now() - startTime;

    this.responseBody = undefined;
  },
);

Then(
  "the API response status code should be {int}",
  function (this: ZippopotamWorld, expectedStatusCode: number) {
    if (!this.response) {
      throw new Error("Response is not available.");
    }

    expect(this.response.status()).toBe(expectedStatusCode);
  },
);

Then(
  "the API response content type should be {string}",
  function (this: ZippopotamWorld, expectedContentType: string) {
    if (!this.response) {
      throw new Error("Response is not available.");
    }

    const actualContentType = this.response.headers()["content-type"] ?? "";

    expect(actualContentType).toContain(expectedContentType);
  },
);

Then(
  "the API response should contain postcode {string}",
  async function (this: ZippopotamWorld, expectedPostCode: string) {
    const responseBody = await getResponseBody(this);

    expect(responseBody).toHaveProperty("post code");
    expect(responseBody["post code"]).toBe(expectedPostCode.toUpperCase());
  },
);

Then(
  "the API response should contain country {string} and country abbreviation {string}",
  async function (
    this: ZippopotamWorld,
    expectedCountry: string,
    expectedCountryAbbreviation: string,
  ) {
    const responseBody = await getResponseBody(this);

    expect(responseBody).toHaveProperty("country");
    expect(responseBody).toHaveProperty("country abbreviation");

    expect(responseBody.country).toBe(expectedCountry);
    expect(responseBody["country abbreviation"]).toBe(
      expectedCountryAbbreviation,
    );
  },
);

Then(
  "the API response should contain at least one place",
  async function (this: ZippopotamWorld) {
    const responseBody = await getResponseBody(this);

    for (const field of requiredRootFields) {
      expect(responseBody).toHaveProperty(field);
    }

    expect(Array.isArray(responseBody.places)).toBeTruthy();
    expect(responseBody.places.length).toBeGreaterThan(0);
  },
);

Then(
  "each place should contain the required location fields",
  async function (this: ZippopotamWorld) {
    const responseBody = await getResponseBody(this);

    for (const place of responseBody.places) {
      for (const field of requiredPlaceFields) {
        expect(place).toHaveProperty(field);
      }
    }
  },
);
