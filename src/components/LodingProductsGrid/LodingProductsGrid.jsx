import "../ProductsGrid/ProductsGrid.scss";

export default function LodingProductsGrid({ limit }) {
  return (
    <div className="products-grid">
      {Array(limit)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="product-card-skeleton" />
        ))}
    </div>
  );
}
