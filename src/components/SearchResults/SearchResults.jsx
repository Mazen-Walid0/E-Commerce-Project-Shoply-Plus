import "./SearchResults.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import BrowseCategory from "../BrowseCategory/BrowseCategory";
import LodingProductsGrid from "../LodingProductsGrid/LodingProductsGrid";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const skip = (currentPage - 1) * limit;
    axios
      .get(
        `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`,
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
        setLoading(false);
      });
  }, [query, currentPage]);

  const totalPages = Math.ceil(total / limit);
  const currentPageCount = Math.min(limit, total - (currentPage - 1) * limit);

  return (
    <>
      <div className="search-results-page">
        <h2 className="search-title">
          {!loading && total === 0
            ? `No results found for "${query}"`
            : `Results for "${query}"`}
        </h2>
        {loading ? (
          <LodingProductsGrid limit={limit} />
        ) : (
          <ProductsGrid
            products={products}
            loading={loading}
            currentPageCount={currentPageCount}
          />
        )}
        {totalPages != 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      <div className="container">
        <BrowseCategory />
      </div>
    </>
  );
}
