import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen-react';
import RemoveFromCartButton from './RemoveFromCartButton';

const LineItem = ({lineItem}) => {
  const {merchandise, quantity} = lineItem;

  return (
    <div className="flex gap-4">
      <Link
        to={`/products/${merchandise.product.handle}`}
        className="flex-shrink-0"
      >
        <Image data={merchandise.image} width={110} height={110} />
      </Link>
      <div className="flex-1">
        <Link
          to={`/products/${merchandise.product.handle}`}
          className="no-underline hover:underline"
        >
          {merchandise.product.title}
        </Link>
        <div className="text-sm text-gray-800">{merchandise.title}</div>
        <div className="text-sm text-gray-800">Qty: {quantity}</div>
        <RemoveFromCartButton lineIds={[lineItem.id]} />
      </div>
      <Money data={lineItem.cost.totalAmount} />
    </div>
  );
};

export default LineItem;
