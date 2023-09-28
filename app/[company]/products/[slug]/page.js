import ProductList from "../../../../components/product-list";
async function fetchProducts() {
  return fetch("https://super-duper-goldfish-g4qvwrpr657jf9j5x-3000.app.github.dev/api/product-detail",{
    headers:{
      'Accept': 'application/json',
      'Authoritation': 'bearer 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'
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
