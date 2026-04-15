import { useEffect, useState } from "react";
import "./BrowseCategory.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categoryIcons = {
  beauty: "💄",
  fragrances: "🌸",
  furniture: "🛋️",
  groceries: "🛒",
  "home-decoration": "🏠",
  "kitchen-accessories": "🍳",
  laptops: "💻",
  "mens-shirts": "👔",
  "mens-shoes": "👟",
  "mens-watches": "⌚",
  "mobile-accessories": "📱",
  motorcycle: "🏍️",
  "skin-care": "🧴",
  smartphones: "📲",
  "sports-accessories": "⚽",
  sunglasses: "🕶️",
  tablets: "📟",
  tops: "👕",
  vehicle: "🚗",
  "womens-bags": "👜",
  "womens-dresses": "👗",
  "womens-jewellery": "💍",
  "womens-shoes": "👠",
  "womens-watches": "⌚",
};

const formatCategory = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function BrowseCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category-list")
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="browse-category">
      <div className="header">
        <span></span>
        <h5>Categories</h5>
      </div>
      <h3>Browse By Category</h3>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            onClick={() => navigate(`/categories/${category}`)}
            className="category-item"
            key={category}
          >
            <div className="icon">{categoryIcons[category]}</div>
            <p>{formatCategory(category)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
