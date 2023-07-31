import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const rapidApiKey = import.meta.env.VITE_RAPID_API_EMAIL_KEY;

//Creating the API infrastructure that can be used to acces email
export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://email-scraper.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set('X-RapidAPI-Host', 'email-scraper.p.rapidapi.com');

      return headers;
    },
    //Building the privacy settings on how we want our data to be transported
    prepareRequest: (request) => {
      request.credentials = 'include'; // Include credentials (cookies) in the request
      request.headers.set('Cookie', 'cross-site-cookie=whatever; SameSite=None; Secure'); // Set the SameSite attribute in the cookie header
      return request;
    },
  }),

  //Custon endpoint being built to access the API needed to scrape the emails.
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `email-extractor?url=${encodeURIComponent(params.articleUrl)}`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
