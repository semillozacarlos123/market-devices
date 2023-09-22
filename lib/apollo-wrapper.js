"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient
} from "@apollo/experimental-nextjs-app-support/ssr";


function makeClient() {
  const httpLink = new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: "https://api.github.com/graphql",
      headers: {
        authorization: "Bearer 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"
      }
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}