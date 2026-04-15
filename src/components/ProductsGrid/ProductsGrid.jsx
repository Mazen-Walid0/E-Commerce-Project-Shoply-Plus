import "./ProductsGrid.scss";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
