import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useState} from 'react';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({product, loading}) {
  const productUrl = `/products/${product.handle}`;
  const image = product.featuredImage;
  const [isWishlisted, setIsWishlisted] = useState(false);

  const minPrice = product.priceRange?.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  
  let discountPercent = 30;
  if (compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(minPrice?.amount || '0')) {
    const original = parseFloat(compareAtPrice.amount);
    const discounted = parseFloat(minPrice.amount);
    discountPercent = Math.round(((original - discounted) / original) * 100);
  }

  const isLocalImage = image?.url?.startsWith('/images/');

  return (
    <div className="j-card group">
      {/* Wishlist Heart Icon Button */}
      <button
        type="button"
        className="absolute top-3 right-3 text-slate-300 hover:text-rose-600 bg-white p-1 rounded-full border border-slate-200 z-10 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        aria-label="Add to Wishlist"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isWishlisted ? '#ff4343' : 'none'}
          stroke={isWishlisted ? '#ff4343' : 'currentColor'}
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <Link prefetch="intent" to={productUrl} className="block flex-1 flex flex-col justify-between">
        {/* Product Image Box */}
        <div className="j-card-img-box">
          {isLocalImage ? (
            <img
              src={image.url}
              alt={image.altText || product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : image ? (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 300px, 100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-medium text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h4 className="font-semibold text-slate-900 text-sm line-clamp-2 hover:text-amber-700 transition-colors mb-1">
            {product.title}
          </h4>

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 my-1">
            <span className="bg-emerald-700 text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              5.0 ★
            </span>
            <span className="text-[11px] text-slate-500 font-medium">(1,420)</span>
            <span className="text-[10px] text-amber-700 font-extrabold italic border border-amber-600 px-1 rounded ml-auto">
              Certified
            </span>
          </div>

          {/* Pricing & Discount */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-extrabold text-base text-slate-900">
              {minPrice && <Money data={minPrice} />}
            </span>
            {compareAtPrice ? (
              <span className="text-xs text-slate-400 line-through">
                <Money data={compareAtPrice} />
              </span>
            ) : null}
            <span className="text-xs font-bold text-rose-700">-{discountPercent}%</span>
          </div>

          {/* Free Delivery */}
          <div className="text-xs font-semibold text-emerald-700 mt-1">
            Free Insured Delivery
          </div>
        </div>
      </Link>
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
