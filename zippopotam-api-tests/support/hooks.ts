import { Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import type { ZippopotamWorld } from './world';

const BASE_URL = process.env.BASE_URL || 'https://api.zippopotam.us';

Before(async function (this: ZippopotamWorld) {
  this.apiContext = await request.newContext({
    baseURL: BASE_URL,
  });
});

After(async function (this: ZippopotamWorld) {
  if (this.apiContext) {
    await this.apiContext.dispose();
  }
});
