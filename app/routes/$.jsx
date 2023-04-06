import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react';

export const meta = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen',
  };
};

const PageRoute = () => {
  let {story} = useLoaderData();
  story = useStoryblokState(story);

  return (
    <>
      <StoryblokComponent blok={story.content} />
    </>
  );
};

export default PageRoute;

export const loader = async ({params, context}) => {
  let slug = params['*'] ?? 'home';

  let sbParams = {
    version: 'draft',
  };
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);

  let {data} = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
  return json({
    story: data?.story,
    allCollections: collections,
  });
};

const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 100) {
      nodes {
        handle
        title
      }
    }
  }
`;
