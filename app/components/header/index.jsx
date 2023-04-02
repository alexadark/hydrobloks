import {CartIcon} from '../cart/CartIcon';
import Menu from './Menu';

const Header = () => {
  return (
    <header
      role="banner"
      className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm`}
    >
      <div className="flex justify-between gap-12">
        <h1>Hydrobloks</h1>
        <Menu />
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
