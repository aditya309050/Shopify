import {Image} from '@shopify/hydrogen';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 * }}
 */
export function ProductImage({image}) {
  if (!image) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-slate-50 text-slate-400 font-semibold">
        No Image Available
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 400px, 100vw"
        className="max-h-[380px] w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
