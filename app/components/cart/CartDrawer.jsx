import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {CartContent, CartEmpty} from '~/components/cart';

export const CartDrawer = ({cart, close}) => {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <>
            {data?.totalQuantity > 0 ? (
              <CartContent cart={data} />
            ) : (
              <CartEmpty />
            )}
            <button
              onClick={close}
              className="inline-block w-full max-w-xl px-6 py-3 font-medium leading-none text-center text-white bg-black rounded-sm"
            ></button>
          </>
        )}
      </Await>
    </Suspense>
  );
};
