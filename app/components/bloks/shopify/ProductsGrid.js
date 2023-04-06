import {Link, useLoaderData} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import {storyblokEditable} from '@storyblok/react';
import {AddToCartButton} from '~/components/cart';

export const ProductsGrid = ({blok}) => {
  const {headline, products} = blok;

  const {allProducts} = useLoaderData();

  return (
    <div
      key={blok._uid}
      {...storyblokEditable(blok)}
      className="container mx-auto"
    >
      <h1 className="mb-5 text-5xl font-bold text-center">{headline}</h1>
      <div className="grid gap-5 mb-10 md:grid-cols-3">
        {products.items?.map((sbProduct) => {
          const {name, image, id} = sbProduct;
          const product = allProducts.find((p) => p.title === name);
          const {handle, variants} = product;
          const selectedVariant = variants.nodes[0];

          return (
            <div className="border product-card" key={handle}>
              <Link to={`/${handle}`} key={id}>
                <div className="product-card__image">
                  <img src={image} />
                </div>
                <div className="p-4 text-center lowercase product-card__info ">
                  <h3 className="font-bold">{name}</h3>
                  <Money
                    withoutTrailingZeros
                    data={selectedVariant.price}
                    className="mb-2 text-xl font-semibold"
                  />
                </div>
              </Link>
              <div className="flex justify-center mb-5">
                <AddToCartButton variantId={selectedVariant.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
