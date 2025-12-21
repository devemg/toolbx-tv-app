import { Link } from "react-router"

export const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/user">User</Link>
    </div>
  )
}
