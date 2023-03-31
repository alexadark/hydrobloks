import {useLoaderData} from '@remix-run/react';
import {json} from 'react-router';
import ProductOptions from '~/components/ProductOptions';
import {Image, Money, ShopPayButton} from '@shopify/hydrogen-react';
import {AddToCartButton} from '~/components/cart';

export const loader = async ({params, context, request}) => {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // optionally set a default variant so you always have an "orderable" product selected
  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];
  const storeDomain = context.storefront.getShopifyDomain();

  return json({
    product,
    selectedVariant,
    storeDomain,
  });
};

export default function ProductHandle() {
  const {product, selectedVariant, storeDomain} = useLoaderData();
  const orderable = selectedVariant?.availableForSale || false;
  const productImage = selectedVariant.image
    ? selectedVariant.image
    : product.featuredImage;

  return (
    <section className="grid w-full gap-4 px-6 md:gap-8 md:px-8 lg:px-12">
      <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid md:grid-flow-row md:p-0 md:overflow-x-hidden md:grid-cols-2 md:w-full lg:col-span-2">
          <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw] shadow rounded">
            {productImage && <Image data={productImage} />}
          </div>
        </div>
        <div className="md:sticky md:mx-auto max-w-xl md:max-w-[24rem] grid gap-8 p-0 md:p-6 md:px-0 top-[6rem] lg:top-[8rem] xl:top-[10rem]">
          <div className="grid gap-2">
            <h1 className="text-4xl font-bold leading-10 whitespace-normal">
              {product.title}
            </h1>
            <span className="font-medium whitespace-pre-wrap opacity-50 max-w-prose inherit text-copy">
              {product.vendor}
            </span>
          </div>
          <ProductOptions
            options={product.options}
            selectedVariant={selectedVariant}
          />
          <Money
            withoutTrailingZeros
            data={selectedVariant.price}
            className="mb-2 text-xl font-semibold"
          />
          {orderable && (
            <div className="space-y-2">
              <ShopPayButton
                variantIds={[selectedVariant?.id]}
                storeDomain={storeDomain}
                width={'400px'}
              />
              <AddToCartButton variantId={selectedVariant?.id} />
            </div>
          )}

          <div
            className="pt-6 prose text-black border-t border-gray-200 text-md"
            dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
          />
        </div>
      </div>
    </section>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      featuredImage{
        id
        url
        altText
        height
        width
      }

      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
