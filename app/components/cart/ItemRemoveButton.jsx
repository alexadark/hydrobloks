import {useFetcher} from '@remix-run/react';
import {BsTrash3 as IconRemove} from 'react-icons/bs';

const ItemRemoveButton = ({lineIds}) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value="REMOVE_FROM_CART" />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button
        className="flex items-center justify-center w-10 h-10 max-w-xl my-2 leading-none text-center text-black bg-white border border-black rounded-md hover:text-white hover:bg-black font-small"
        type="submit"
      >
        <IconRemove />
      </button>
    </fetcher.Form>
  );
};

export default ItemRemoveButton;
