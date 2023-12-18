import { getGDriveImage } from "@/app/utils/urlUtils";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function MiniGallery({
  images,
}: {
  images: string[];
}): JSX.Element {
  const [index, setIndex] = useState(-1);

  images = images.map(getGDriveImage);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: any) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div>
      <Gallery
        images={images.map((url) => ({ src: url, thumbnail: url }))}
        onClick={handleClick}
        enableImageSelection={false}
      />
      {!!currentImage && (
        /* @ts-ignore */
        <Lightbox
          mainSrc={currentImage}
          //imageTitle={currentImage.caption}
          mainSrcThumbnail={currentImage}
          nextSrc={nextImage}
          nextSrcThumbnail={nextImage}
          prevSrc={prevImage}
          prevSrcThumbnail={prevImage}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
}
