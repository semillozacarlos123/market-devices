// "use client";

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


// import ProductList from "../components/product-list";

// async function fetchProducts() {
//   return fetch("https://potential-memory-9r6p7grq4pvc7qx5-3000.app.github.dev/api/products", {
//     cache: "no-store",
//   }).then((response) => response.json())
//   // .then((data)=> console.log(data))
//   .then((data)=> data)
// }

async function HomePage() {
  
  // const { data } = useSuspenseQuery(query);
  // const products = await fetchProducts();
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <h1>Hi</h1>
    </>
  );
}

export default HomePage;
