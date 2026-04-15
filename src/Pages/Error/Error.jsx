import { Link } from "react-router-dom";
import "./Error.scss";

export default function Error() {
  return (
    <div className="error">
      <h3>404 Not Found</h3>
      <p>Your visited page not found. You may go home page.</p>
      <Link to="/">Back to home page</Link>
    </div>
  );
}
