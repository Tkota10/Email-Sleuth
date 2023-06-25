import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const rapidApiKey = import.meta.env.VITE_RAPID_API_EMAIL_KEY;

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://email-scraper.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set('X-RapidAPI-Host', 'email-scraper.p.rapidapi.com');

      return headers;
    },
    prepareRequest: (request) => {
      request.credentials = 'include'; // Include credentials (cookies) in the request
      request.headers.set('Cookie', 'cross-site-cookie=whatever; SameSite=None; Secure'); // Set the SameSite attribute in the cookie header
      return request;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `email-extractor?url=${encodeURIComponent(params.articleUrl)}`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
