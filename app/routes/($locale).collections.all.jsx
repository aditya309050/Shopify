import {useLoaderData, useSearchParams, Link} from 'react-router';
import {ProductItem} from '~/components/ProductItem';
import {useState, useMemo} from 'react';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    {title: 'All Fine Jewellery Collections | Ujwal Jewellers'},
    {description: 'Explore 100% BIS Hallmarked 22K Gold, VVS Solitaire Diamonds, Kundan & Polki Fine Jewellery Collection.'},
  ];
};

// Curated 100% Fine Jewellery Dataset for Ujwal Jewellers
const LUXURY_JEWELLERY_COLLECTION = [
  {
    id: 'jewel-1',
    title: 'Royal 22K Hallmarked Gold Necklace Set | Intricate Floral Design',
    handle: 'royal-gold-necklace',
    category: 'necklaces',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '84999.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '120000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-1',
      url: '/images/gold_necklace.jpg',
      altText: 'Royal 22K Hallmarked Gold Necklace Set',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-2',
    title: 'Solitaire Diamond Engagement Ring in 18K White Gold Setting',
    handle: 'solitaire-diamond-ring',
    category: 'rings',
    metal: 'diamond',
    priceRange: {
      minVariantPrice: {amount: '45999.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '65000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-2',
      url: '/images/diamond_ring.jpg',
      altText: 'Solitaire Diamond Engagement Ring',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-3',
    title: 'Combo of 2 Designer Jhumkas | Traditional Pearl & Kundan Gold Earrings',
    handle: 'kundan-jhumka-earrings',
    category: 'earrings',
    metal: 'kundan',
    priceRange: {
      minVariantPrice: {amount: '24999.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '99999.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-3',
      url: '/images/kundan_earrings.jpg',
      altText: 'Traditional Pearl & Kundan Gold Earrings',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-4',
    title: '22K Gold Carved Royal Bridal Bangles (Pair) with Traditional Details',
    handle: 'gold-carved-bangles',
    category: 'bangles',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '68999.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '95000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-4',
      url: '/images/gold_bangles.jpg',
      altText: '22K Gold Carved Royal Bridal Bangles',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-5',
    title: 'Royal 22K Gold & Ruby Temple Pendant with Chain',
    handle: 'gold-pendant-necklace',
    category: 'pendants',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '32999.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '48000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-5',
      url: '/images/gold_pendant.jpg',
      altText: 'Royal 22K Gold & Ruby Temple Pendant',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-6',
    title: 'Uncut Diamond & Emerald Heritage Polki Choker Set',
    handle: 'polki-choker-set',
    category: 'necklaces',
    metal: 'kundan',
    priceRange: {
      minVariantPrice: {amount: '115000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '150000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-6',
      url: '/images/polki_choker.jpg',
      altText: 'Uncut Diamond & Emerald Heritage Polki Choker Set',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-7',
    title: 'Traditional 22K South Indian Kasu Haaram Gold Coin Long Necklace',
    handle: 'gold-kasu-haaram',
    category: 'necklaces',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '145000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '190000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-7',
      url: '/images/kasu_haaram.jpg',
      altText: 'Traditional 22K South Indian Kasu Haaram Gold Coin Long Necklace',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-8',
    title: 'VVS Diamond & South Sea Pearl Chandelier Drop Earrings',
    handle: 'diamond-drop-earrings',
    category: 'earrings',
    metal: 'diamond',
    priceRange: {
      minVariantPrice: {amount: '52000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '75000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-8',
      url: '/images/diamond_earrings.jpg',
      altText: 'VVS Diamond & South Sea Pearl Chandelier Drop Earrings',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-9',
    title: 'Heritage Antique 22K Gold Temple Choker Necklace',
    handle: 'temple-choker-necklace',
    category: 'necklaces',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '98000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '135000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-9',
      url: '/images/temple_choker.jpg',
      altText: 'Heritage Antique 22K Gold Temple Choker Necklace',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-10',
    title: 'Royal Ruby Studded 22K Gold Kadas (Pair)',
    handle: 'ruby-gold-bangles',
    category: 'bangles',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '88000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '115000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-10',
      url: '/images/ruby_bangles.jpg',
      altText: 'Royal Ruby Studded 22K Gold Kadas',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-11',
    title: '18K White Gold Solitaire Diamond Drop Pendant with Chain',
    handle: 'solitaire-drop-pendant',
    category: 'pendants',
    metal: 'diamond',
    priceRange: {
      minVariantPrice: {amount: '38500.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '52000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-11',
      url: '/images/solitaire_pendant.jpg',
      altText: '18K White Gold Solitaire Diamond Drop Pendant',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-12',
    title: 'Traditional 22K Gold & Black Bead Bridal Mangalsutra',
    handle: 'bridal-mangalsutra',
    category: 'necklaces',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '42000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '58000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-12',
      url: '/images/mangalsutra.jpg',
      altText: 'Traditional 22K Gold & Black Bead Bridal Mangalsutra',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-13',
    title: 'Zambian Emerald & VVS Diamond Halo Cocktail Ring',
    handle: 'emerald-halo-ring',
    category: 'rings',
    metal: 'diamond',
    priceRange: {
      minVariantPrice: {amount: '64000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '85000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-13',
      url: '/images/emerald_ring.jpg',
      altText: 'Zambian Emerald & VVS Diamond Halo Cocktail Ring',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-14',
    title: 'Freshwater Pearl & 22K Gold Multi-Strand Statement Necklace',
    handle: 'pearl-statement-necklace',
    category: 'necklaces',
    metal: 'kundan',
    priceRange: {
      minVariantPrice: {amount: '56000.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '75000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-14',
      url: '/images/pearl_necklace.jpg',
      altText: 'Freshwater Pearl & 22K Gold Multi-Strand Statement Necklace',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'jewel-15',
    title: '22K Gold Filigree Traditional Drop Jhumkas',
    handle: 'gold-filigree-jhumkas',
    category: 'earrings',
    metal: 'gold',
    priceRange: {
      minVariantPrice: {amount: '29500.00', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '42000.00', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-15',
      url: '/images/gold_earrings.jpg',
      altText: '22K Gold Filigree Traditional Drop Jhumkas',
      width: 800,
      height: 800,
    },
  },
];

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {storefront} = context;
  let apiJewellery = [];

  try {
    const data = await storefront.query(CATALOG_QUERY, {
      variables: {first: 24},
    });

    if (data?.products?.nodes) {
      // ONLY allow products that are explicitly fine jewellery items
      const jewelleryKeywords = ['gold', 'diamond', 'kundan', 'jhumka', 'necklace', 'ring', 'bangle', 'pendant', 'earring', 'polki', 'jewel', 'ruby', 'emerald', 'sapphire', 'pearl', 'ornament'];
      apiJewellery = data.products.nodes.filter((node) => {
        const titleLower = (node.title || '').toLowerCase();
        return jewelleryKeywords.some((keyword) => titleLower.includes(keyword));
      });
    }
  } catch (err) {
    console.warn('Storefront API collection query error, serving luxury jewellery dataset:', err);
  }

  // If Storefront API returns no valid jewellery items (e.g. mock shop has apparel), serve curated fine jewellery catalog
  const products = apiJewellery.length > 0 ? apiJewellery : LUXURY_JEWELLERY_COLLECTION;

  return {products};
}

export default function Collection() {
  const {products} = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('cat') || 'all';
  const [sortBy, setSortBy] = useState('featured');

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      const target = activeCategory.toLowerCase();
      list = list.filter((p) => {
        const cat = p.category || '';
        const metal = p.metal || '';
        const title = (p.title || '').toLowerCase();
        return (
          cat === target ||
          metal === target ||
          title.includes(target) ||
          (target === 'bridal' && (title.includes('bridal') || title.includes('kundan') || title.includes('royal')))
        );
      });
    }

    if (sortBy === 'price-low') {
      list.sort(
        (a, b) =>
          parseFloat(a.priceRange?.minVariantPrice?.amount || 0) -
          parseFloat(b.priceRange?.minVariantPrice?.amount || 0),
      );
    } else if (sortBy === 'price-high') {
      list.sort(
        (a, b) =>
          parseFloat(b.priceRange?.minVariantPrice?.amount || 0) -
          parseFloat(a.priceRange?.minVariantPrice?.amount || 0),
      );
    }

    return list;
  }, [products, activeCategory, sortBy]);

  const categories = [
    {id: 'all', label: 'All Jewellery'},
    {id: 'gold', label: '22K Gold'},
    {id: 'diamond', label: 'Diamonds'},
    {id: 'kundan', label: 'Kundan & Polki'},
    {id: 'necklaces', label: 'Necklaces'},
    {id: 'earrings', label: 'Earrings'},
    {id: 'bangles', label: 'Bangles'},
    {id: 'rings', label: 'Rings'},
    {id: 'pendants', label: 'Pendants'},
  ];

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pb-20">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#111622] via-[#1a202c] to-[#0f1319] text-white py-12 px-6 sm:px-12 lg:px-16 border-b border-amber-500/20 shadow-md">
        <div className="max-w-[1800px] mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-xs text-amber-300/80 mb-3 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Collections</span>
            <span>/</span>
            <span className="text-amber-400 font-semibold capitalize">{activeCategory} Jewellery</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold tracking-[0.25em] text-amber-400 uppercase block mb-1">
                UJWAL JEWELLERS HERITAGE COLLECTION
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Luxury Fine Jewellery
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                Discover 100% BIS Hallmarked 22K Solid Gold, VVS Solitaire Diamonds, and Artisanal Kundan & Polki Masterpieces.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full w-fit">
              <span className="text-amber-400 font-bold text-sm">✨ 100% Certified</span>
              <span className="text-white/60">|</span>
              <span className="text-slate-200 text-xs font-medium">Insured Express Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR & SORTING CONTROLS */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-xs">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSearchParams(cat.id === 'all' ? {} : {cat: cat.id})}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Product Count & Sort Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <span className="text-xs font-semibold text-slate-600">
              Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-xs font-semibold text-slate-500">Sort by:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="featured">Featured & Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 pt-8">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <ProductItem
                key={product.id || index}
                product={product}
                loading={index < 8 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto my-12 p-8">
            <div className="text-4xl mb-3">💎</div>
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-1">No Jewellery Found</h3>
            <p className="text-xs text-slate-500 mb-6">No ornaments match your selected category filter.</p>
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-6 py-2.5 rounded-full cursor-pointer transition-colors"
            >
              View All Fine Jewellery
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
`;

const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
`;
