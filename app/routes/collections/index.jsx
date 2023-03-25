import {useLoaderData} from '@remix-run/react';
import CollectionCard from '~/components/CollectionCard';

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

const Collections = () => {
  let {collections} = useLoaderData();

  return (
    <div className="mt-16 center-container">
      <h1 className="mb-10 text-3xl text-center uppercase">
        Browse our collections
      </h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2">
        {collections?.nodes?.map((c) => (
          <CollectionCard collection={c} key={c.id} />
        ))}
      </div>
    </div>
  );
};

export default Collections;

const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 100) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
