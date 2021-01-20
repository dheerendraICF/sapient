import React from 'react';
import { render } from '@testing-library/react';
import Image from './Image';

test('renders learn react link', () => {
  const { getByText } = render(<Image links={{"links":{
    "mission_patch":"https://images2.imgbox.com/40/e3/GypSkayF_o.png",
    "mission_patch_small":"https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
    "reddit_campaign":null,
    "reddit_launch":null,
    "reddit_recovery":null,
    "reddit_media":null,
    "presskit":null,
    "article_link":"https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
    "wikipedia":"https://en.wikipedia.org/wiki/DemoSat",
    "video_link":"https://www.youtube.com/watch?v=0a_00nJ_Y88",
    "youtube_id":"0a_00nJ_Y88",
    "flickr_images":[
       
    ]
 }}} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
