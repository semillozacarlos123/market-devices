// import ProductList from "../../../../components/product-list";
// async function fetchProducts() {
//   return fetch("https://vigilant-succotash-v6v74vqr5g47cxxv6-3000.app.github.dev/api/product-deail").then((response) =>
//     response.json()
//   );
// }

export default async function DetailProduct({ params }) {
  // const {filesData} = await fetchProducts();
  return (
    <>
        {/* <p>{filesData}</p> */}
        <h1>HI</h1>
    </>
  );
}

// export async function generateStaticParams() {
//   const posts = await fetch("https://vigilant-succotash-v6v74vqr5g47cxxv6-3000.app.github.dev/api/products").then(
//     (res) => res.json()
//   );

//   return Object.keys(posts).map((key) => ({
//     slug: posts[key].slug,
//   }));
// }
