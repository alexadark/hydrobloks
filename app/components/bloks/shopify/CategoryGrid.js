import {Link, useLoaderData} from '@remix-run/react';
import {storyblokEditable} from '@storyblok/react';

export const CategoryGrid = ({blok}) => {
  const {headline, categories} = blok;
  const {allCollections} = useLoaderData();

  return (
    <div
      className="container py-20 mx-auto "
      key={blok._uid}
      {...storyblokEditable(blok)}
    >
      <h2 className="mb-5 text-5xl font-bold text-center">{headline}</h2>
      <div className="justify-center gap-5 mx-auto md:flex">
        {categories.items?.map((sbCategory) => {
          const {name, id, image} = sbCategory;
          const collection = allCollections.find((c) => c.title === name);
          const {handle} = collection;

          return (
            <Link key={id} to={`/collections/${handle}`} className="flex-1">
              <div className="relative">
                {image && (
                  <img
                    src={`${image}/m/`}
                    className="aspect-square max-h-[600px]"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                  <h3 className="text-5xl font-bold text-white ">{name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
