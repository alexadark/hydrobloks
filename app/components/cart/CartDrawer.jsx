import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {BsCart2 as IconCart} from 'react-icons/bs';
import {Drawer, useDrawer} from '~/components/Drawer';
import {useFetchers} from '@remix-run/react';
import {useEffect} from 'react';
import {CartContent, CartEmpty} from '~/components/cart';
import {useLoaderData} from '@remix-run/react';

export const CartDrawer = () => {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const {cart} = useLoaderData();

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
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <>
            <button
              className="relative flex items-center justify-center w-8 h-8 ml-auto"
              onClick={openDrawer}
            >
              <IconCart />
              {data?.totalQuantity > 0 && (
                <div className="text-contrast bg-red-500 text-white absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px">
                  <span>{data?.totalQuantity}</span>
                </div>
              )}
            </button>
            <Drawer open={isOpen} onClose={closeDrawer}>
              <>
                {data?.totalQuantity > 0 ? (
                  <CartContent cart={data} />
                ) : (
                  <CartEmpty />
                )}
                <button
                  onClick={closeDrawer}
                  className="inline-block w-full max-w-xl px-6 py-3 font-medium leading-none text-center text-white bg-black rounded-sm"
                ></button>
              </>
            </Drawer>
          </>
        )}
      </Await>
    </Suspense>
  );
};
