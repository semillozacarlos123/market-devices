import ProductItem from "./product-item";
import styles from "./product-list.module.css";

export default function ProductList({ items }) {
  const products = [];

  for (const key in items) {
    products.push(items[key]);
  }
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <ProductItem key={product.id} item={product} />
      ))}
    </ul>
  );
}
