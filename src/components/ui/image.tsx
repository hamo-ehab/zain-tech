import { forwardRef, type ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

// Removed all Wix imports (@wix/image-kit, sdk)

// A generic fallback image URL (you can replace this with your own static image)
const FALLBACK_IMAGE_URL = "/placeholder-error.png"; 

// A simple utility to check if the URL is a local or external path
const isExternalUrl = (url: string) => url.startsWith('http') || url.startsWith('https');

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  // Removed Wix-specific props like fittingType, originWidth, etc.
  // Keeping only standard HTML image attributes
};

/**
 * Custom Image component that handles loading, fallback, and error states.
 * Replaces the Wix-dependent component entirely with a standard React/HTML implementation.
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, ...props }, ref) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If src prop changes, update the imgSrc state
    if (imgSrc !== src) {
      setImgSrc(src);
    }
  }, [src]);

  // Handle image load error: switches to the fallback image
  const handleError = () => {
    // Prevent infinite loop if fallback fails
    if (imgSrc !== FALLBACK_IMAGE_URL) {
      setImgSrc(FALLBACK_IMAGE_URL);
    }
    // Call original onError if provided
    if (props.onError) {
      props.onError(null); 
    }
  };

  if (!imgSrc) {
    // Render an empty placeholder div if no source is provided
    return <div data-empty-image ref={ref as React.Ref<HTMLDivElement>} {...props} />;
  }

  // Render the standard <img> tag
  return (
    <img
      ref={ref}
      src={imgSrc}
      onError={handleError}
      {...props}
      // Removed Wix-specific attributes like width/height for responsive images
    />
  );
});

Image.displayName = 'Image';
