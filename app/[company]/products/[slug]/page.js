import ProductList from "../../../../components/product-list";
async function fetchProducts() {
  return fetch("https://super-duper-goldfish-g4qvwrpr657jf9j5x-3000.app.github.dev/api/product-detail",{
    headers:{
      'Accept': 'application/json',
      'Authoritation': 'Bearer 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'
    }
  }).then((response) =>
    response.json()
  );
}

export default async function DetailProduct({ params }) {
  const {filesData} = await fetchProducts();
  return (
    <>
        <p>{filesData}</p>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await fetch("https://super-duper-goldfish-g4qvwrpr657jf9j5x-3000.app.github.dev/api/products").then(
    (res) => res.json()
  );

  return Object.keys(posts).map((key) => ({
    slug: posts[key].slug,
  }));
}
