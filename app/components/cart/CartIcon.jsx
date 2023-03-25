import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {BsCart2 as IconCart} from 'react-icons/bs';

export const CartIcon = ({cart, openDrawer}) => {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
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
        )}
      </Await>
    </Suspense>
  );
};
