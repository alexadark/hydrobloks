import {getCookie} from 'react-use-cookie';
import {storyblokEditable, StoryblokComponent} from '@storyblok/react';

const PersonalizedBanners = ({blok}) => {
  const user_type = getCookie('user_type').toLowerCase() || '';
  const variant = blok.variants.filter((v) => v.user_type === user_type);

  return (
    <div
      key={blok._uid}
      {...storyblokEditable(blok)}
      className="container px-3 py-10 mx-auto text-center"
    >
      {variant?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default PersonalizedBanners;
