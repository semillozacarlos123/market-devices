// "use client";

import React from "react";

// export const dynamic = "force-dynamic";

// import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
// import {gql} from "@apollo/client"

// const query = gql`
//   query {
//     repository(owner: "FedericoSebas", name: "iot-market") {
//       object(expression: "main:public/images") {
//         ... on Tree {
//           entries {
//             path
//             type
//           }
//         }
//       }
//     }
//   }
// `;


import ProductList from "../components/product-list";

async function fetchProducts() { 
  return fetch("https://super-duper-goldfish-g4qvwrpr657jf9j5x-3000.app.github.dev/api/products",{
    headers:{
      'Accept': 'application/json'
    }
  })
  .then((response)=> response.json())

}


async function HomePage() {
  
  // const products = useSuspenseQuery(query);
  const products = await fetchProducts();
  return (
    <div>
      <ProductList items={products}/>
    </div>
  );
}

export default HomePage;
