import {useLoaderData} from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  Money,
} from '@shopify/hydrogen';
import {useState} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

// Fallback Jewellery dataset for handles
const JEWELLERY_DATASET = {
  'royal-gold-necklace': {
    title: 'Royal 22K Hallmarked Gold Necklace Set | Intricate Floral Design',
    brand: 'Ujwal Jewellers Royal Collection',
    price: {amount: '84999.00', currencyCode: 'INR'},
    compareAtPrice: {amount: '120000.00', currencyCode: 'INR'},
    discount: '-29%',
    image: '/images/gold_necklace.jpg',
    material: '22K Solid Gold (BIS Hallmarked)',
    occasion: 'Bridal, Wedding, Grand Festive',
    itemType: 'Gold Necklace Set',
  },
  'solitaire-diamond-ring': {
    title: 'Solitaire Diamond Engagement Ring in 18K White Gold Setting',
    brand: 'Ujwal Jewellers Diamond Craft',
    price: {amount: '45999.00', currencyCode: 'INR'},
    compareAtPrice: {amount: '65000.00', currencyCode: 'INR'},
    discount: '-29%',
    image: '/images/diamond_ring.jpg',
    material: '18K White Gold & VVS Solitaire Diamond',
    occasion: 'Engagement, Anniversary, Gift',
    itemType: 'Solitaire Ring',
  },
  'kundan-jhumka-earrings': {
    title: 'Combo of 2 Designer Jhumkas | Traditional Pearl & Kundan Gold Earrings for Women',
    brand: 'Ujwal Jewellers Heritage Edition',
    price: {amount: '24999.00', currencyCode: 'INR'},
    compareAtPrice: {amount: '99999.00', currencyCode: 'INR'},
    discount: '-75%',
    image: '/images/kundan_earrings.jpg',
    material: '22K Gold Plated Brass & Fresh Water Pearls',
    occasion: 'Casual, Special Occasion, Festive',
    itemType: 'Jhumka Earrings',
  },
  'gold-carved-bangles': {
    title: '22K Gold Carved Royal Bridal Bangles (Pair) with Traditional Details',
    brand: 'Ujwal Jewellers Royal Collection',
    price: {amount: '68999.00', currencyCode: 'INR'},
    compareAtPrice: {amount: '95000.00', currencyCode: 'INR'},
    discount: '-27%',
    image: '/images/gold_bangles.jpg',
    material: '22K Solid Gold (BIS Hallmarked)',
    occasion: 'Wedding, Festive, Traditional',
    itemType: 'Gold Bangles Pair',
  },
};

export const meta = ({data}) => {
  return [
    {title: `${data?.product?.title ?? 'Jewellery'} - Ujwal Jewellers`},
    {
      rel: 'canonical',
      href: `/products/${data?.product?.handle}`,
    },
  ];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  try {
    const [{product}] = await Promise.all([
      storefront.query(PRODUCT_QUERY, {
        variables: {handle, selectedOptions: getSelectedProductOptions(request)},
      }),
    ]);

    if (product?.id) {
      redirectIfHandleIsLocalized(request, {handle, data: product});
      return {product};
    }
  } catch (e) {
    console.warn('Storefront API query fallback used:', e);
  }

  // Fallback product structure
  const customInfo = JEWELLERY_DATASET[handle] || JEWELLERY_DATASET['kundan-jhumka-earrings'];
  return {
    product: {
      id: `gid://shopify/Product/${handle}`,
      handle,
      title: customInfo.title,
      vendor: customInfo.brand,
      descriptionHtml: '<p>Handcrafted luxury jewellery item featuring 100% certified metals and stones. Designed with attention to detail to ensure reliable performance and long-lasting elegance.</p>',
      selectedOrFirstAvailableVariant: {
        id: `gid://shopify/ProductVariant/${handle}`,
        availableForSale: true,
        price: customInfo.price,
        compareAtPrice: customInfo.compareAtPrice,
        image: {url: customInfo.image, altText: customInfo.title},
        selectedOptions: [],
      },
    },
  };
}

function loadDeferredData() {
  return {};
}

export default function Product() {
  const {product} = useLoaderData();
  const {open} = useAside();
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  const handle = product?.handle || 'kundan-jhumka-earrings';
  const customInfo = JEWELLERY_DATASET[handle] || JEWELLERY_DATASET['kundan-jhumka-earrings'];

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant || {
      id: `gid://shopify/ProductVariant/${handle}`,
      availableForSale: true,
      price: customInfo.price,
      compareAtPrice: customInfo.compareAtPrice,
      image: {url: customInfo.image, altText: customInfo.title},
      selectedOptions: [],
    },
    getAdjacentAndFirstAvailableVariants(product),
  );

  const mainImageUrl = activeImage || selectedVariant?.image?.url || customInfo.image;
  const title = product.title || customInfo.title;
  const brand = product.vendor || customInfo.brand;

  const price = selectedVariant?.price || customInfo.price;
  const compareAtPrice = selectedVariant?.compareAtPrice || customInfo.compareAtPrice;

  const lineItems = [
    {
      merchandiseId: selectedVariant?.id || `gid://shopify/ProductVariant/${handle}`,
      quantity: selectedQty,
    },
  ];

  return (
    <div className="j-pdp-container">
      {/* 1. LEFT COLUMN: Vertical Thumbnails & Main Featured Image */}
      <div className="j-pdp-gallery">
        <div className="j-pdp-thumbnails">
          <button
            type="button"
            className="p-0 border-0 bg-transparent cursor-pointer"
            onClick={() => setActiveImage(customInfo.image)}
          >
            <img
              src={customInfo.image}
              alt="Thumb 1"
              className={`j-thumb-item ${mainImageUrl === customInfo.image ? 'active' : ''}`}
            />
          </button>
          <button
            type="button"
            className="p-0 border-0 bg-transparent cursor-pointer"
            onClick={() => setActiveImage('/images/gold_necklace.jpg')}
          >
            <img
              src="/images/gold_necklace.jpg"
              alt="Thumb 2"
              className={`j-thumb-item ${mainImageUrl === '/images/gold_necklace.jpg' ? 'active' : ''}`}
            />
          </button>
          <button
            type="button"
            className="p-0 border-0 bg-transparent cursor-pointer"
            onClick={() => setActiveImage('/images/diamond_ring.jpg')}
          >
            <img
              src="/images/diamond_ring.jpg"
              alt="Thumb 3"
              className={`j-thumb-item ${mainImageUrl === '/images/diamond_ring.jpg' ? 'active' : ''}`}
            />
          </button>
          <button
            type="button"
            className="p-0 border-0 bg-transparent cursor-pointer"
            onClick={() => setActiveImage('/images/kundan_earrings.jpg')}
          >
            <img
              src="/images/kundan_earrings.jpg"
              alt="Thumb 4"
              className={`j-thumb-item ${mainImageUrl === '/images/kundan_earrings.jpg' ? 'active' : ''}`}
            />
          </button>
        </div>

        <div className="j-pdp-main-image">
          <button
            type="button"
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-white p-1.5 rounded-full border border-slate-200 cursor-pointer"
            aria-label="Share"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
            </svg>
          </button>
          <img src={mainImageUrl} alt={title} />
        </div>
      </div>

      {/* 2. MIDDLE COLUMN: Product Details, Offers, Specs */}
      <div className="j-pdp-middle">
        {/* Brand Link */}
        <span className="j-brand-link">Brand: {brand}</span>

        {/* Title */}
        <h1 className="j-pdp-title">{title}</h1>

        {/* Rating Stars */}
        <div className="j-rating-stars">
          <span className="text-amber-500 font-bold">5.0</span>
          <span className="text-amber-400">★★★★★</span>
          <span className="text-slate-500 text-xs">(1,420 ratings & 342 reviews)</span>
        </div>

        {/* Lowest Price Callout */}
        <div className="text-xs text-rose-700 font-semibold bg-rose-50 border border-rose-200 p-2 rounded w-fit">
          Lowest price in 30 days
        </div>

        {/* Price & Discount Section */}
        <div className="j-price-row">
          <span className="j-price-discount">{customInfo.discount}</span>
          <span className="j-price-main">
            <Money data={price} />
          </span>
          {compareAtPrice && (
            <span className="j-price-strike">
              M.R.P.: <Money data={compareAtPrice} />
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 font-medium">Inclusive of all taxes</p>

        {/* Offers Grid */}
        <div className="my-2">
          <div className="font-bold text-xs text-slate-800 mb-2 flex items-center gap-1">
            <span>🏷️</span> <span>Offers</span>
          </div>
          <div className="j-offers-grid">
            <div className="j-offer-card">
              <span className="j-offer-card-title">Cashback</span>
              <span className="j-offer-card-text">Upto ₹2,000 cashback on Ujwal Pay Balance when you order.</span>
              <span className="j-offer-card-link">1 offer &gt;</span>
            </div>
            <div className="j-offer-card">
              <span className="j-offer-card-title">Bank Offer</span>
              <span className="j-offer-card-text">Upto ₹5,000.00 discount on select Credit Cards</span>
              <span className="j-offer-card-link">25 offers &gt;</span>
            </div>
            <div className="j-offer-card">
              <span className="j-offer-card-title">Partner Offers</span>
              <span className="j-offer-card-text">Free 1-Year Jewellery Maintenance & Polish Insurance</span>
              <span className="j-offer-card-link">1 offer &gt;</span>
            </div>
          </div>
        </div>

        {/* Trust Icons Row */}
        <div className="j-trust-row">
          <div className="j-trust-item">
            <div className="j-trust-icon">🚚</div>
            <span className="j-trust-label">Free Delivery</span>
          </div>
          <div className="j-trust-item">
            <div className="j-trust-icon">🔄</div>
            <span className="j-trust-label">10 days Returnable</span>
          </div>
          <div className="j-trust-item">
            <div className="j-trust-icon">🏆</div>
            <span className="j-trust-label">22K BIS Hallmarked</span>
          </div>
          <div className="j-trust-item">
            <div className="j-trust-icon">🔒</div>
            <span className="j-trust-label">Secure transaction</span>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-2">
          <h3 className="font-bold text-base text-slate-900 mb-2">Product details</h3>
          <table className="j-specs-table">
            <tbody>
              <tr>
                <td>Material type</td>
                <td>{customInfo.material}</td>
              </tr>
              <tr>
                <td>Occasion type</td>
                <td>{customInfo.occasion}</td>
              </tr>
              <tr>
                <td>Item type name</td>
                <td>{customInfo.itemType}</td>
              </tr>
              <tr>
                <td>Country of Origin</td>
                <td>India</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. RIGHT COLUMN: Buy Box */}
      <div className="j-buybox">
        <div className="j-buybox-price">
          <Money data={price} />
        </div>

        <div className="j-delivery-info">
          <strong>FREE delivery Monday, 24 August.</strong> Details
        </div>

        <div className="text-xs text-blue-700 font-semibold cursor-pointer">
          📍 Delivering to Jaipur 302022 - Update location
        </div>

        <div className="j-stock-status">In stock</div>

        {/* Quantity Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="pdp-qty" className="text-xs font-semibold text-slate-700">Quantity:</label>
          <select
            id="pdp-qty"
            value={selectedQty}
            onChange={(e) => setSelectedQty(Number(e.target.value))}
            className="j-qty-select"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* ADD TO CART & BUY NOW Buttons */}
        <div className="flex flex-col gap-2 mt-2">
          <CartForm
            route="/cart"
            inputs={{lines: lineItems}}
            action={CartForm.ACTIONS.LinesAdd}
          >
            {(fetcher) => (
              <button
                type="submit"
                className="btn-j-add-cart"
                disabled={fetcher.state !== 'idle'}
                onClick={() => open('cart')}
              >
                Add to cart
              </button>
            )}
          </CartForm>

          <CartForm
            route="/cart"
            inputs={{lines: lineItems}}
            action={CartForm.ACTIONS.LinesAdd}
          >
            {(fetcher) => (
              <button
                type="submit"
                className="btn-j-buy-now"
                disabled={fetcher.state !== 'idle'}
                onClick={() => open('cart')}
              >
                Buy Now
              </button>
            )}
          </CartForm>
        </div>

        <div className="text-xs text-slate-500 mt-2 space-y-1">
          <div><span className="text-slate-400">Delivered by:</span> <strong className="text-slate-800">Ujwal Jewellers</strong></div>
          <div><span className="text-slate-400">Payment:</span> <span className="text-blue-700 font-medium">Secure transaction</span></div>
        </div>

        <button type="button" className="btn-j-wishlist mt-2">
          Add to Wish List
        </button>
      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title,
              price: price.amount || '0',
              vendor: brand,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: selectedQty,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;
