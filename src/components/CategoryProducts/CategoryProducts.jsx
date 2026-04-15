import "./CategoryProducts.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import BrowseCategory from "../../components/BrowseCategory/BrowseCategory";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import "../ProductsGrid/ProductsGrid.scss";
import LodingProductsGrid from "../LodingProductsGrid/LodingProductsGrid";

export default function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const skip = (currentPage - 1) * limit;
    axios
      .get(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`,
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
        setLoading(false);
      });
  }, [category, currentPage]);

  const totalPages = Math.ceil(total / limit);
  const currentPageCount = Math.min(limit, total - (currentPage - 1) * limit);

  return (
    <>
      <div className="categories">
        <h2 className="category-title">{category.replace("-", " ")}</h2>
        {loading ? (
          <LodingProductsGrid limit={limit} />
        ) : (
          <ProductsGrid
            products={products}
            loading={loading}
            currentPageCount={currentPageCount}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="container">
        <BrowseCategory />
      </div>
    </>
  );
}
