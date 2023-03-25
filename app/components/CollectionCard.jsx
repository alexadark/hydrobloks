import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

const CollectionCard = ({collection}) => {
  const {title, handle, image} = collection;
  if (image === null) return null;
  return (
    <div className="relative max-w-[700px] group">
      <div className="absolute inset-0 w-full h-full transition duration-500 bg-teal-900 rounded-lg opacity-50 overlay group-hover:opacity-10"></div>
      <Link
        to={handle}
        className="block overflow-hidden rounded-lg shadow-md hover:shadow-lg"
      >
        <Image data={image} className="object-cover aspect-square" />
        <h3 className="absolute inset-0 flex items-center justify-center w-full h-full text-3xl font-bold text-center text-white uppercase">
          {title}
        </h3>
      </Link>
    </div>
  );
};

export default CollectionCard;
