import {Suspense, useState} from 'react';
import {Await, Link, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  const {open} = useAside();
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <>
      {/* MAIN HEADER (Warm Off-White / Champagne Background #FAF8F5 - Full-bleed width) */}
      <header className="bg-[#FAF8F5] border-b border-amber-900/10 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-6 sm:px-12 lg:px-16 py-3 flex items-center justify-between relative">
          
          {/* LEFT: Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-800">
            <button
              type="button"
              className="lg:hidden text-amber-900 p-1"
              onClick={() => open('mobile')}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="hidden lg:flex items-center gap-7">
              <NavLink to="/" end className="text-amber-700 border-b-2 border-amber-600 pb-0.5 no-underline font-extrabold">
                HOME
              </NavLink>

              {/* 1. COLLECTIONS MEGA DROPDOWN */}
              <div
                className="relative py-3 group cursor-pointer"
                onMouseEnter={() => setActiveDropdown('collections')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink to="/collections/all" className="hover:text-amber-700 transition-colors no-underline flex items-center gap-1 font-bold">
                  COLLECTIONS <span className="text-[10px]">▾</span>
                </NavLink>
                
                {/* Hover Dropdown Panel */}
                <div className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                  activeDropdown === 'collections'
                    ? 'opacity-100 visible pointer-events-auto translate-y-0'
                    : 'opacity-0 invisible pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0'
                }`}>
                  <div className="w-[640px] bg-white border border-amber-900/10 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-serif font-bold text-amber-950 text-xs tracking-widest uppercase mb-3 border-b border-amber-900/10 pb-1.5">
                        By Style
                      </h5>
                      <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                        <li><Link to="/collections/all?cat=kundan" className="hover:text-amber-700 transition-colors no-underline block">Royal Kundan & Polki</Link></li>
                        <li><Link to="/collections/all?cat=gold" className="hover:text-amber-700 transition-colors no-underline block">Antique 22K Gold</Link></li>
                        <li><Link to="/collections/all?cat=diamond" className="hover:text-amber-700 transition-colors no-underline block">Solitaire Diamond Edit</Link></li>
                        <li><Link to="/collections/all?cat=everyday" className="hover:text-amber-700 transition-colors no-underline block">Minimalist Everyday</Link></li>
                        <li><Link to="/collections/all?cat=temple" className="hover:text-amber-700 transition-colors no-underline block">Heritage Temple Gold</Link></li>
                        <li><Link to="/collections/all?cat=cocktail" className="hover:text-amber-700 transition-colors no-underline block">Modern Cocktail Sets</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-serif font-bold text-amber-950 text-xs tracking-widest uppercase mb-3 border-b border-amber-900/10 pb-1.5">
                        By Occasion
                      </h5>
                      <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                        <li><Link to="/collections/all?cat=festive" className="hover:text-amber-700 transition-colors no-underline block">Festive Grandeur 2026</Link></li>
                        <li><Link to="/collections/all?cat=bridal" className="hover:text-amber-700 transition-colors no-underline block">Bridal Trousseau</Link></li>
                        <li><Link to="/collections/all?cat=daily" className="hover:text-amber-700 transition-colors no-underline block">Daily Wear Grace</Link></li>
                        <li><Link to="/collections/all?cat=anniversary" className="hover:text-amber-700 transition-colors no-underline block">Anniversary Specials</Link></li>
                        <li><Link to="/collections/all?cat=office" className="hover:text-amber-700 transition-colors no-underline block">Office & Formal Chic</Link></li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block">FEATURED</span>
                        <h6 className="font-serif font-bold text-slate-900 text-sm mt-0.5">Heritage Gold Edition</h6>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">Handcrafted 22K hallmarked masterpieces.</p>
                      </div>
                      <Link to="/collections/all?cat=gold" className="text-amber-800 font-bold text-[11px] hover:text-amber-950 no-underline mt-3 block">
                        Shop Collection &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GOLD MEGA DROPDOWN */}
              <div
                className="relative py-3 group cursor-pointer"
                onMouseEnter={() => setActiveDropdown('gold')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink to="/collections/all?cat=gold" className="hover:text-amber-700 transition-colors no-underline flex items-center gap-1 font-bold">
                  GOLD <span className="text-[10px]">▾</span>
                </NavLink>

                {/* Hover Dropdown Panel */}
                <div className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                  activeDropdown === 'gold'
                    ? 'opacity-100 visible pointer-events-auto translate-y-0'
                    : 'opacity-0 invisible pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0'
                }`}>
                  <div className="w-[600px] bg-white border border-amber-900/10 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-serif font-bold text-amber-950 text-xs tracking-widest uppercase mb-3 border-b border-amber-900/10 pb-1.5">
                        Gold Jewellery
                      </h5>
                      <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                        <li><Link to="/collections/all?cat=necklaces" className="hover:text-amber-700 transition-colors no-underline block">22K Gold Necklaces</Link></li>
                        <li><Link to="/collections/all?cat=bangles" className="hover:text-amber-700 transition-colors no-underline block">Royal Bangles & Kadas</Link></li>
                        <li><Link to="/collections/all?cat=chains" className="hover:text-amber-700 transition-colors no-underline block">Chains & Mangalsutra</Link></li>
                        <li><Link to="/collections/all?cat=earrings" className="hover:text-amber-700 transition-colors no-underline block">Gold Jhumkas & Studs</Link></li>
                        <li><Link to="/collections/all?cat=coins" className="hover:text-amber-700 transition-colors no-underline block">24K Gold Coins (1g - 50g)</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-serif font-bold text-amber-950 text-xs tracking-widest uppercase mb-3 border-b border-amber-900/10 pb-1.5">
                        Purity & Metals
                      </h5>
                      <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                        <li><Link to="/collections/all?cat=22k" className="hover:text-amber-700 transition-colors no-underline block">22K BIS Hallmarked</Link></li>
                        <li><Link to="/collections/all?cat=18k" className="hover:text-amber-700 transition-colors no-underline block">18K Rose & White Gold</Link></li>
                        <li><Link to="/collections/all?cat=temple" className="hover:text-amber-700 transition-colors no-underline block">Antique Temple Gold</Link></li>
                        <li><Link to="/collections/all?cat=yellow" className="hover:text-amber-700 transition-colors no-underline block">Classic Yellow Gold</Link></li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block">GOLD RATE TODAY</span>
                        <h6 className="font-serif font-extrabold text-amber-950 text-sm mt-1">₹7,280 / gram (22K)</h6>
                        <p className="text-[11px] text-slate-600 mt-1">100% Certified with HUID Stamp.</p>
                      </div>
                      <Link to="/collections/all?cat=gold" className="text-amber-900 font-bold text-[11px] hover:text-amber-950 no-underline mt-3 block">
                        View Rate Calculator &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. DIAMONDS MEGA DROPDOWN */}
              <div
                className="relative py-3 group cursor-pointer"
                onMouseEnter={() => setActiveDropdown('diamonds')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink to="/collections/all?cat=diamond" className="hover:text-amber-700 transition-colors no-underline flex items-center gap-1 font-bold">
                  DIAMONDS <span className="text-[10px]">▾</span>
                </NavLink>

                {/* Hover Dropdown Panel */}
                <div className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                  activeDropdown === 'diamonds'
                    ? 'opacity-100 visible pointer-events-auto translate-y-0'
                    : 'opacity-0 invisible pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0'
                }`}>
                  <div className="w-[600px] bg-white border border-amber-900/10 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-serif font-bold text-amber-950 text-xs tracking-widest uppercase mb-3 border-b border-amber-900/10 pb-1.5">
                        Diamond Jewellery
                      </h5>
                      <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                        <li><Link to="/collections/all?cat=rings" className="hover:text-amber-700 transition-colors no-underline block">Solitaire Engagement Rings</Link></li>
                        <li><Link to="/collections/all?cat=earrings" className="hover:text-amber-700 transition-colors no-underline block">Diamond Studs & Tops</Link></li>
                        <li><Link to="/collections/all?cat=bracelets" className="hover:text-amber-700 transition-colors no-underline block">Diamond Tennis Bracelets</Link></li>
                        <li><Link to="/collections/all?cat=pendants" className="hover:text-amber-700 transition-colors no-underline block">Solitaire Pendants</Link></li>
                        <li><Link to="/collections/all?cat=nosepins" className="hover:text-amber-700 transition-colors no-underline block">Diamond Nose Pins</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-serif font-bold text-amber-950 text-xs tracking-widest uppercase mb-3 border-b border-amber-900/10 pb-1.5">
                        By Solitaire Shape
                      </h5>
                      <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                        <li><Link to="/collections/all?cat=round" className="hover:text-amber-700 transition-colors no-underline block">Round Brilliant Cut</Link></li>
                        <li><Link to="/collections/all?cat=princess" className="hover:text-amber-700 transition-colors no-underline block">Princess & Emerald Cut</Link></li>
                        <li><Link to="/collections/all?cat=oval" className="hover:text-amber-700 transition-colors no-underline block">Oval & Cushion Shapes</Link></li>
                        <li><Link to="/collections/all?cat=heart" className="hover:text-amber-700 transition-colors no-underline block">Heart Shape Solitaires</Link></li>
                      </ul>
                    </div>

                    <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between border border-slate-800">
                      <div>
                        <span className="text-[10px] font-bold text-cyan-300 tracking-wider uppercase block">CERTIFIED SOLITAIRES</span>
                        <h6 className="font-serif font-bold text-white text-sm mt-1">GIA & IGI International</h6>
                        <p className="text-[11px] text-slate-400 mt-1">VVS Clarity & EF Color Grade.</p>
                      </div>
                      <Link to="/collections/all?cat=diamond" className="text-amber-400 font-bold text-[11px] hover:text-amber-300 no-underline mt-3 block">
                        Explore Diamonds &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <NavLink to="/collections/all?cat=kundan" className="hover:text-amber-700 transition-colors no-underline font-bold">
                KUNDAN
              </NavLink>
              <NavLink to="/collections/all?cat=offers" className="hover:text-amber-700 transition-colors no-underline font-bold">
                OFFERS
              </NavLink>
            </div>
          </div>

          {/* ABSOLUTE CENTER: Ujwal Jewellers Emblem Logo (Restored comfortable height) */}
          <NavLink to="/" prefetch="intent" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center text-center no-underline py-1 group z-10">
            {/* Gold Circular Ring Emblem with U Monogram */}
            <div className="w-10 h-10 rounded-full border-2 border-amber-600/80 bg-amber-50 flex items-center justify-center mb-1 shadow-xs group-hover:border-amber-600 group-hover:scale-105 transition-transform">
              <span className="font-serif font-extrabold text-amber-800 text-lg leading-none">U</span>
            </div>
            
            {/* Brand Serif Title */}
            <span className="font-serif font-black text-amber-950 text-xl tracking-[0.25em] leading-none uppercase">
              U J W A L
            </span>
            <span className="text-[9px] font-bold text-amber-800 tracking-[0.3em] uppercase mt-1 leading-none">
              J E W E L L E R S
            </span>
            <span className="text-[8px] font-semibold text-amber-700/80 tracking-widest mt-1">
              — SINCE 1998 —
            </span>
          </NavLink>

          {/* RIGHT: Search, Wishlist, Account, Cart Icons */}
          <div className="flex items-center gap-5 text-slate-800">
            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => open('search')}
              className="p-1 hover:text-amber-700 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* Wishlist Heart Icon */}
            <Link to="/collections/all" className="p-1 hover:text-amber-700 transition-colors relative no-underline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </Link>

            {/* Account Profile Icon */}
            <NavLink to="/account" className="p-1 hover:text-amber-700 transition-colors no-underline">
              <Suspense fallback={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              }>
                <Await resolve={isLoggedIn} errorElement={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                }>
                  {() => (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                </Await>
              </Suspense>
            </NavLink>

            {/* Cart Button with Count Badge */}
            <CartToggle cart={cart} />
          </div>
        </div>
      </header>
    </>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const {close} = useAside();

  return (
    <nav className={`header-menu-${viewport}`} role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="text-white hover:text-amber-300 font-semibold text-sm transition-colors no-underline"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="p-1 hover:text-amber-700 transition-colors relative cursor-pointer flex items-center justify-center"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      aria-label="Cart"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <span className="absolute -top-1.5 -right-2 bg-slate-950 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-amber-400 shadow-xs">
        {count}
      </span>
    </button>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
  ],
};
