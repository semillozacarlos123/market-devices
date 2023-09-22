import { Inter } from "next/font/google";

import "./globals.css";
import MainHeader from "../components/header/main-header";
// import { ApolloWrapper } from "@/lib/apollo-wrapper";
// import ApolloClientProvider from "../components/graphql/apollo-client-provider";

export const metadata = {
  title: "viewport",
  description: "initial-scale=1.0, width=device-width",
};

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <title>IoT Market</title>
      </head>
      <body className={inter.className}>
        <MainHeader />
        {children}
        {/* <ApolloWrapper>{children}</ApolloWrapper> */}
      </body>
    </html>
  );
}
