import {CartLineItems, CartSummary, CheckoutButton} from '~/components/cart';

export const CartContent = ({cart, location}) => {
  return (
    <div
      className={`${
        location === 'page' && 'grid'
      } flex-wrap justify-between w-full max-w-6xl gap-8 pb-12 mx-auto md:grid-cols-2 md:items-start md:gap-8 lg:gap-12`}
    >
      <div className="">
        <CartLineItems linesObj={cart.lines} />
      </div>
      <div className="p-4 space-y-6 bg-gray-100 rounded-md md:px-6">
        <CartSummary cost={cart.cost} />
        <CheckoutButton checkoutUrl={cart.checkoutUrl} />
      </div>
    </div>
  );
};
