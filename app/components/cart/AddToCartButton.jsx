import {useFetcher} from '@remix-run/react';

export const AddToCartButton = ({variantId}) => {
  const fetcher = useFetcher();

  const lines = [{merchandiseId: variantId, quantity: 1}];

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <button className="bg-black text-white px-6 py-3 w-full rounded-md text-center font-medium max-w-[400px]">
        Add to Cart
      </button>
    </fetcher.Form>
  );
};
