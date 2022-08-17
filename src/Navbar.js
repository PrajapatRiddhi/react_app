import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {
  CustomersMajor
} from '@shopify/polaris-icons';
import { Icon } from "@shopify/polaris";

export default function Navbar() {
  return (
    <nav className="nav" style={{backgroundColor:"white",height:"70px"}}>
      <Link to="/" className="site-title">
        mageworx
      </Link>
      {/* <ul>
        <CustomLink to="/customers" className="tab">Customers</CustomLink>
        <CustomLink to="/products" className="tab">Products</CustomLink>
      </ul> */}

      <div>
        <h5>Mukesh Purohit</h5>
        <small>Polaris techtic demo</small>
      </div>
    </nav>
  )
} 

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
