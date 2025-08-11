import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link to="/"> Home</Link> |<Link to="/products"> Products</Link> |
      <Link to="/add-product"> Add Product</Link> |
      <Link to="/contact"> Contact</Link> |<Link to="/users"> Users</Link>
    </div>
  );
}
