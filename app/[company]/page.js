import ProductList from "../../components/product-list";

async function fetchProducts() {
  return fetch("https://super-duper-goldfish-g4qvwrpr657jf9j5x-3000.app.github.dev/api/product-detail", {
    cache: "no-store",
    headers:{
      'Accept': 'application/json'
    }
  }).then((response) => response.json());
}

export default async function CompanyDetails({ params }) {
  const products = await fetchProducts();
  const filterProducts = Object.keys(products.data)
    .filter((key) => products.data[key].company === params.company)
    .map((key) => products.data[key]);
  // return <ProductList items={filterProducts} />;
  return <h1>HI</h1>;
}

export async function generateStaticParams() {
  const posts = await fetch("https://super-duper-goldfish-g4qvwrpr657jf9j5x-3000.app.github.dev/api/products").then(
    (res) => res.json()
  );

  return Object.keys(posts.data).map((key) => ({
    slug: posts.data[key].company,
  }));
}
