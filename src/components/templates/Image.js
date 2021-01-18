import React  from 'react';

function Image(image) {
    console.log(image)
    return (
        <picture>
            <source media="(max-width:575px)" srcset={image.links.mission_patch_small} data-srcset={image.links.mission_patch_small} />
            <source media="(max-width:1024px)" srcset={image.links.mission_patch} data-srcset={image.links.mission_patch}/>
            <img className="space-mission--image" src={image.links.mission_patch} alt="Nature"/>
        </picture>
    );
}

export default Image;

