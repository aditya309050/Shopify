import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t-2 border-amber-500/40 pt-14 pb-8 mt-16">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        
        {/* Top 4 Pillars of Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800 text-center sm:text-left">
          <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-400 shrink-0">
              👑
            </div>
            <div>
              <h5 className="font-bold text-white text-sm font-serif">22K BIS Hallmarked</h5>
              <p className="text-slate-400 text-xs mt-0.5">100% Purity Certified with HUID Stamp</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-400 shrink-0">
              💎
            </div>
            <div>
              <h5 className="font-bold text-white text-sm font-serif">VVS Diamond Guarantee</h5>
              <p className="text-slate-400 text-xs mt-0.5">Internationally Certified by GIA & IGI</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-400 shrink-0">
              🔄
            </div>
            <div>
              <h5 className="font-bold text-white text-sm font-serif">15-Day Free Return</h5>
              <p className="text-slate-400 text-xs mt-0.5">100% Refund & Lifetime Buyback</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-400 shrink-0">
              🚚
            </div>
            <div>
              <h5 className="font-bold text-white text-sm font-serif">Insured Express Shipping</h5>
              <p className="text-slate-400 text-xs mt-0.5">Free tamper-evident delivery across India</p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Heritage & Contact */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-bold font-serif bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 -webkit-background-clip-text text-transparent">
                Ujwal Jewellers
              </span>
              <span className="text-xs text-amber-500/90 font-semibold tracking-widest uppercase mt-0.5">
                Luxury Fine Jewellery ✦
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Master artisans crafting timeless 22K gold, solitaire diamonds, and Kundan polki ornaments since 1988.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">📍 Flagship Store:</span>
                <span>Johari Bazar, Jaipur 302003</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">📞 VIP Hotline:</span>
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✉️ Support:</span>
                <span>care@ujwaljewellers.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Fine Collections */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-serif border-b border-amber-500/30 pb-2 inline-block">
              Fine Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <NavLink to="/collections/all?cat=gold" className="hover:text-amber-400 transition-colors no-underline">
                  ✨ 22K Hallmarked Gold Necklaces
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/all?cat=diamond" className="hover:text-amber-400 transition-colors no-underline">
                  💎 Solitaire Engagement Rings
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/all?cat=earrings" className="hover:text-amber-400 transition-colors no-underline">
                  ✨ Kundan & Chandbali Jhumkas
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/all?cat=bridal" className="hover:text-amber-400 transition-colors no-underline">
                  👑 Royal Bridal Trousseau Sets
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/all?cat=silver" className="hover:text-amber-400 transition-colors no-underline">
                  🪙 Certified Silver Coins & Gifts
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-serif border-b border-amber-500/30 pb-2 inline-block">
              Customer Services
            </h4>
            <Suspense fallback={<div className="text-xs text-slate-500">Loading menu...</div>}>
              <Await resolve={footerPromise}>
                {(footer) => (
                  <FooterMenu
                    menu={footer?.menu}
                    primaryDomainUrl={header?.shop?.primaryDomain?.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
              </Await>
            </Suspense>
          </div>

          {/* Column 4: Privilege Club & Security */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-serif border-b border-amber-500/30 pb-2 inline-block">
              Privilege Club
            </h4>
            <p className="text-slate-400 text-sm mb-3">
              Join the Ujwal VIP Privilege Club for private previews of new festive arrivals & gold rate alerts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 mb-4">
              <input
                type="email"
                placeholder="Enter email for VIP benefits..."
                className="bg-slate-900 border border-slate-700 text-white placeholder-slate-500 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm py-2.5 px-4 rounded-lg uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Join Privilege Club
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Ujwal Jewellers Limited. All rights reserved. 22K BIS Hallmarked & GIA Certified Fine Jewellery.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-amber-400 cursor-pointer no-underline">Privacy Policy</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-amber-400 cursor-pointer no-underline">Terms of Use</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-amber-400 cursor-pointer no-underline">Lifetime Exchange Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
  return (
    <ul className="space-y-2.5 text-sm text-slate-300">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return (
          <li key={item.id}>
            {isExternal ? (
              <a href={url} rel="noopener noreferrer" target="_blank" className="hover:text-amber-400 transition-colors no-underline">
                {item.title}
              </a>
            ) : (
              <NavLink end prefetch="intent" to={url} className="hover:text-amber-400 transition-colors no-underline">
                {item.title}
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
