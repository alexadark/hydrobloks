export const CheckoutButton = ({checkoutUrl}) => {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-2">
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-6 py-3 font-medium text-center text-white bg-black rounded-md"
      >
        Continue to Checkout
      </a>
    </div>
  );
};
