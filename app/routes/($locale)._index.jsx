import {Await, useLoaderData, Link} from 'react-router';
import {Suspense, useState, useEffect} from 'react';
import {ProductItem} from '~/components/ProductItem';
import {MockShopNotice} from '~/components/MockShopNotice';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Ujwal Jewellers | Gold, Diamond & Royal Jewellery - Flipkart'}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

// Custom Jewellery Products dataset with local high-resolution generated images
const JEWELLERY_PRODUCTS = [
  {
    id: 'jewel-1',
    title: 'Royal 22K Hallmarked Gold Necklace Set',
    handle: 'royal-gold-necklace',
    priceRange: {
      minVariantPrice: {amount: '84999.0', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '120000.0', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-1',
      url: '/images/gold_necklace.jpg',
      altText: 'Royal 22K Hallmarked Gold Necklace Set',
      width: 600,
      height: 600,
    },
  },
  {
    id: 'jewel-2',
    title: 'Solitaire Diamond Engagement Ring in 18K White Gold',
    handle: 'solitaire-diamond-ring',
    priceRange: {
      minVariantPrice: {amount: '45999.0', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '65000.0', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-2',
      url: '/images/diamond_ring.jpg',
      altText: 'Solitaire Diamond Engagement Ring',
      width: 600,
      height: 600,
    },
  },
  {
    id: 'jewel-3',
    title: 'Traditional Royal Kundan Pearl Jhumka Earrings',
    handle: 'kundan-jhumka-earrings',
    priceRange: {
      minVariantPrice: {amount: '24999.0', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '35000.0', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-3',
      url: '/images/kundan_earrings.jpg',
      altText: 'Traditional Royal Kundan Pearl Jhumka Earrings',
      width: 600,
      height: 600,
    },
  },
  {
    id: 'jewel-4',
    title: '22K Gold Carved Royal Bridal Bangles (Pair)',
    handle: 'gold-carved-bangles',
    priceRange: {
      minVariantPrice: {amount: '68999.0', currencyCode: 'INR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '95000.0', currencyCode: 'INR'},
    },
    featuredImage: {
      id: 'img-4',
      url: '/images/gold_bangles.jpg',
      altText: '22K Gold Carved Royal Bridal Bangles',
      width: 600,
      height: 600,
    },
  },
];

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {data.isShopLinked ? null : <MockShopNotice />}
      
      {/* Luxury Jewellery 4-Slide Interactive Hero Carousel */}
      <JewelleryHeroSlider collection={data.featuredCollection} />

      {/* Jewellery Categories Grid */}
      <JewelleryCategoryGrid />

      {/* Recommended Jewellery Products Grid */}
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function JewelleryHeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const subCategories = [
    {name: 'Ring', url: '/collections/all?cat=rings'},
    {name: 'Necklace', url: '/collections/all?cat=necklaces'},
    {name: 'Earrings', url: '/collections/all?cat=earrings'},
    {name: 'Bracelet', url: '/collections/all?cat=bracelets'},
    {name: 'Anklet', url: '/collections/all?cat=anklets'},
    {name: 'Brooch', url: '/collections/all?cat=brooch'},
    {name: 'Crown', url: '/collections/all?cat=bridal'},
  ];

  const slides = [
    {
      id: 'slide-1',
      badge: 'BEST JEWELRY BRAND 2026',
      titleLine1: 'Crafted with Purpose',
      titleLine2: 'Shine in Every Moment',
      description:
        'Each piece is designed to elevate your look and celebrate your essence.',
      primaryBtnText: 'Discover Now',
      primaryBtnUrl: '/collections/all?cat=gold',
      secondaryBtnText: 'View Collections',
      secondaryBtnUrl: '/collections/all',
      bgImage: '/images/hero_gold.jpg',
      alt: 'Royal 22K Gold Necklace & Bangles',
    },
    {
      id: 'slide-2',
      badge: 'THE DIAMOND EDIT',
      titleLine1: 'Brilliant by Design',
      titleLine2: 'Unmatched Solitaire Sparkle',
      description:
        'VVS certified diamond solitaires crafted to make every celebration unforgettable.',
      primaryBtnText: 'Explore Diamonds',
      primaryBtnUrl: '/collections/all?cat=diamond',
      secondaryBtnText: 'View Solitaires',
      secondaryBtnUrl: '/collections/all?cat=diamond',
      bgImage: '/images/hero_diamond.jpg',
      alt: 'Solitaire Engagement Ring & Diamond Jewellery',
    },
    {
      id: 'slide-3',
      badge: 'ROYAL BRIDAL 2026',
      titleLine1: 'Your Forever Begins',
      titleLine2: 'With Timeless Craftsmanship',
      description:
        'Handcrafted 22K Kundan & Polki bridal sets created for your most special day.',
      primaryBtnText: 'Shop Bridal',
      primaryBtnUrl: '/collections/all?cat=bridal',
      secondaryBtnText: 'Bridal Trousseau',
      secondaryBtnUrl: '/collections/all?cat=bridal',
      bgImage: '/images/hero_bridal.jpg',
      alt: 'Royal Kundan Indian Bridal Jewellery',
    },
  ];

  // Auto-slide carousel every 6 seconds (paused when user hovers)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const current = slides[activeSlide];

  return (
    <section
      className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl h-[560px] sm:h-[640px] lg:h-[680px] text-white group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. FULL-BLEED PHOTOGRAPHIC BACKGROUND IMAGE */}
      {slides.map((s, idx) => (
        <img
          key={s.id}
          src={s.bgImage}
          alt={s.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeSlide === idx ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        />
      ))}

      {/* Dark Atmospheric Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20 z-10 pointer-events-none"></div>

      {/* 2. FLOATING SUB-CATEGORY PILLS BAR (Top Center - Exact match to Image 2) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-6 bg-slate-950/40 border border-white/20 backdrop-blur-md px-6 py-2 rounded-full shadow-lg text-xs font-medium tracking-wide">
        {subCategories.map((sub) => (
          <Link
            key={sub.name}
            to={sub.url}
            className="text-white/80 hover:text-amber-300 transition-colors no-underline"
          >
            {sub.name}
          </Link>
        ))}
      </div>

      {/* 3. BOTTOM-LEFT OVERLAY CONTENT (Exact match to Image 2) */}
      <div className="absolute bottom-10 left-8 sm:left-14 z-20 max-w-xl space-y-4">
        {/* Glassmorphic Badge */}
        <span className="bg-white/10 border border-white/20 text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full inline-block backdrop-blur-md">
          {current.badge}
        </span>

        {/* Title Lines */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold leading-tight text-white tracking-tight">
          <span className="block">{current.titleLine1}</span>
          <span className="italic font-serif font-normal text-white/90 block mt-1">
            {current.titleLine2}
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans max-w-md">
          {current.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-5 pt-3">
          <Link
            to={current.primaryBtnUrl}
            className="bg-slate-950/80 hover:bg-slate-900 text-white font-bold px-7 py-3 rounded-full text-xs border border-white/30 shadow-lg backdrop-blur-md transition-all no-underline"
          >
            {current.primaryBtnText}
          </Link>
          <Link
            to={current.secondaryBtnUrl}
            className="text-white/90 hover:text-white font-semibold text-xs no-underline hover:underline underline-offset-4 transition-all"
          >
            {current.secondaryBtnText}
          </Link>
        </div>
      </div>

      {/* 4. RIGHT STACKED THUMBNAIL SELECTOR CARDS (Exact match to Image 2) */}
      <div className="absolute bottom-10 right-8 z-20 hidden lg:flex flex-col gap-3">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={`w-40 h-20 rounded-xl overflow-hidden border transition-all duration-300 relative text-left cursor-pointer group ${
              activeSlide === idx
                ? 'border-white shadow-2xl scale-105'
                : 'border-white/30 opacity-70 hover:opacity-100 hover:border-white/70'
            }`}
          >
            <img src={s.bgImage} alt={s.badge} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-slate-950/50 p-2 flex flex-col justify-end">
              <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider block">{s.badge}</span>
              <span className="text-[10px] font-semibold text-white line-clamp-1">{s.titleLine1}</span>
            </div>
            {/* Active Progress Overlay */}
            {activeSlide === idx && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"></div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

function JewelleryCategoryGrid() {
  const categories = [
    {
      title: 'NECKLACES',
      linkText: 'Explore Now →',
      image: '/images/gold_necklace.jpg',
      url: '/collections/all?cat=necklaces',
    },
    {
      title: 'BANGLES',
      linkText: 'Explore Now →',
      image: '/images/gold_bangles.jpg',
      url: '/collections/all?cat=bangles',
    },
    {
      title: 'RINGS',
      linkText: 'Explore Now →',
      image: '/images/diamond_ring.jpg',
      url: '/collections/all?cat=rings',
    },
    {
      title: 'EARRINGS',
      linkText: 'Explore Now →',
      image: '/images/kundan_earrings.jpg',
      url: '/collections/all?cat=earrings',
    },
    {
      title: 'PENDANTS',
      linkText: 'Explore Now →',
      image: '/images/gold_pendant.jpg',
      url: '/collections/all?cat=pendants',
    },
    {
      title: 'KUNDAN',
      linkText: 'Explore Now →',
      image: '/images/kundan_earrings.jpg',
      url: '/collections/all?cat=kundan',
    },
  ];

  return (
    <section className="bg-[#FAF8F5] border border-amber-900/10 rounded-3xl p-6 sm:p-10 shadow-sm">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-amber-900/10 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-amber-700 uppercase mb-1">
            <span>—</span>
            <span>EXPLORE OUR COLLECTIONS</span>
            <span>—</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-950">
            Shop by Category
          </h2>
        </div>
        
        <Link to="/collections/all" className="text-amber-800 hover:text-amber-950 text-xs font-bold tracking-widest uppercase no-underline flex items-center gap-1">
          VIEW ALL CATEGORIES &rarr;
        </Link>
      </div>

      {/* 6 CATEGORY CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.url}
            className="bg-white border border-amber-900/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all group flex flex-col no-underline p-3.5"
          >
            {/* Image Container */}
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#FAF8F5] flex items-center justify-center p-3 mb-3 border border-amber-900/5">
              <img
                src={cat.image}
                alt={cat.title}
                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Category Title & Link */}
            <div className="text-left px-1">
              <h4 className="font-serif font-bold text-amber-950 text-sm tracking-wider uppercase mb-1">
                {cat.title}
              </h4>
              <span className="text-[11px] font-semibold text-amber-700 group-hover:text-amber-950 transition-colors block">
                {cat.linkText}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendedProducts({products}) {
  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm" aria-labelledby="recommended-products">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <div>
          <h2 id="recommended-products" className="text-2xl font-bold text-slate-900 font-serif">
            Deals of the Day | Ujwal Jewellers Specials
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">Top-rated 22K gold, solitaire diamond & Kundan ornaments</p>
        </div>
        <Link to="/collections/all" className="bg-slate-950 hover:bg-amber-600 text-white text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-colors shadow-sm">
          VIEW ALL DEALS
        </Link>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading jewellery items...</div>}>
        <Await resolve={products}>
          {() => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {JEWELLERY_PRODUCTS.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
