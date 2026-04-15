import { useSelector } from "react-redux";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import BrowseCategory from "../../components/BrowseCategory/BrowseCategory";

export default function FavoriteItems() {
  const products = useSelector((state) => state.favorites.items);

  const isEmpty = !products || products.length === 0;

  return (
    <div className="mt-8">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-75 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No favorite products yet
          </h2>
          <p className="text-gray-500 mt-2">
            Start adding products to your favorites and they will appear here.
          </p>
        </div>
      ) : (
        <ProductsGrid products={products} />
      )}

      <div className="container">
        <BrowseCategory />
      </div>
    </div>
  );
}
