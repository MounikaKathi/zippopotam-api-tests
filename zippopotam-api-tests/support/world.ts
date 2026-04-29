import type { APIRequestContext, APIResponse } from '@playwright/test';

export interface ZippopotamPlace {
  'place name': string;
  longitude: string;
  state: string;
  'state abbreviation': string;
  latitude: string;
}

export interface ZippopotamResponseBody {
  'post code': string;
  country: string;
  'country abbreviation': string;
  places: ZippopotamPlace[];
}

export interface ZippopotamWorld {
  countryCode?: string;
  postalCode?: string;
  response?: APIResponse;
  responseBody?: ZippopotamResponseBody;
  responseTime?: number;
  apiContext?: APIRequestContext;
}
