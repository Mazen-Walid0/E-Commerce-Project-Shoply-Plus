import BrowseCategory from "../../components/BrowseCategory/BrowseCategory";
import RandomProduct from "../../components/RandomProduct/RandomProduct";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <RandomProduct />
        <BrowseCategory />
      </div>
    </div>
  );
}
