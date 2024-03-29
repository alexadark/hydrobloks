import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {storyblokInit, apiPlugin} from '@storyblok/react';
import Hero from './components/bloks/Hero';
import Text from './components/bloks/Text';
import Page from './components/bloks/Page';
import Banner from './components/bloks/Banner';
import PersonalizedBanners from './components/bloks/PersonalizedBanners';
import {
  ProductsGrid,
  CategoryGrid,
  SingleProduct,
} from '~/components/bloks/shopify';
import tailwind from './styles/tailwind-build.css';
import favicon from '../public/favicon.svg';
import {Layout} from './components/Layout';
import {Seo} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {getCart} from '~/utils/getCart';

export async function loader({context}) {
  const cartId = await context.session.get('cartId');
  const layout = await context.storefront.query(LAYOUT_QUERY);
  return defer({
    layout,
    cart: cartId ? getCart(context, cartId) : undefined,
  });
}

export const links = () => {
  return [
    {rel: 'stylesheet', href: tailwind},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});

const components = {
  hero: Hero,
  text: Text,
  page: Page,
  banner: Banner,
  'single-product': SingleProduct,
  'category-grid': CategoryGrid,
  'products-grid': ProductsGrid,
  'personalized-banners': PersonalizedBanners,
};
storyblokInit({
  accessToken: 'aVPSgag6Rrp47qg0HOHIbgtt',
  use: [apiPlugin],
  components,
});

export default function App() {
  const data = useLoaderData();

  const {name} = data.layout.shop;

  return (
    <html lang="en">
      <head>
        <Seo />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout title={name}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
