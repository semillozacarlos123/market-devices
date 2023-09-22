import ProductList from "../components/product-list";

async function fetchProducts() {
  return fetch("https://vigilant-succotash-v6v74vqr5g47cxxv6-3000.app.github.dev/api/products5-36013.app.github.dev/api/products", {
    cache: "no-store",
  }).then((response) => response.json());
}

export default async function CompanyDetails({ params }) {
  // const products = await fetchProducts();
  // const filterProducts = Object.keys(products.data)
  //   .filter((key) => products.data[key].company === params.company)
  //   .map((key) => products.data[key]);
  // return <ProductList items={filterProducts} />;
  return <h1>HI</h1>;
}

// export async function generateStaticParams() {
//   const posts = await fetch("https://vigilant-succotash-v6v74vqr5g47cxxv6-3000.app.github.dev/api/products").then(
//     (res) => res.json()
//   );

//   return Object.keys(posts.data).map((key) => ({
//     slug: posts.data[key].company,
//   }));
// }
