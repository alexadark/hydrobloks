import {render} from 'storyblok-rich-text-react-renderer';
import {storyblokEditable} from '@storyblok/react';

const Text = ({blok}) => {
  return (
    <div
      key={blok._uid}
      {...storyblokEditable(blok)}
      className="container px-3 py-10 mx-auto text-center"
    >
      {render(blok.long_text)}
    </div>
  );
};

export default Text;
