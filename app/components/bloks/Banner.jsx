import {Link} from '@remix-run/react';
import {storyblokEditable} from '@storyblok/react';

const Banner = ({blok}) => {
  const {user_type, _uid, title, image} = blok;
  return (
    <Link
      to={`/collections/${user_type}`}
      key={_uid}
      {...storyblokEditable(blok)}
      className="container flex"
    >
      <h3>{title}</h3>
      <img src={`${image.filename}/m/400x200`} alt={image.altText} />
    </Link>
  );
};

export default Banner;
