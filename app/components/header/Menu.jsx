import {Link} from '@remix-run/react';

Link;
const Menu = () => {
  return (
    <nav>
      <ul className="flex">
        <li className="mr-4">
          <Link to="/">Home</Link>
        </li>
        <li className="mr-4">
          <Link to="/collections">Collections</Link>
        </li>
        <li className="mr-4">
          <Link to="/about">About</Link>
        </li>
        <li className="mr-4">
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
