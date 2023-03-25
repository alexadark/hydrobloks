import {CartIcon} from '../cart/CartIcon';
import Menu from './Menu';
import {useFetchers} from '@remix-run/react';
import {useEffect} from 'react';

const Header = ({cart, openDrawer, isOpen}) => {
  const fetchers = useFetchers();
  // Grab all the fetchers that are adding to cart
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    if (fetcher?.submission?.formData?.get('cartAction') === 'ADD_TO_CART') {
      addToCartFetchers.push(fetcher);
    }
  }
  // When the fetchers array changes, open the drawer if there is an add to cart action
  useEffect(() => {
    if (isOpen || addToCartFetchers.length === 0) return;
    openDrawer();
  }, [addToCartFetchers, isOpen, openDrawer]);
  return (
    <header
      role="banner"
      className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm`}
    >
      <div className="flex justify-between gap-12">
        <h1>Hydrobloks</h1>
        <Menu />
        <CartIcon cart={cart} openDrawer={openDrawer} />
      </div>
    </header>
  );
};

export default Header;
