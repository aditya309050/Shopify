import {useLoaderData, data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {CartMain} from '~/components/CartMain';

const JEWELLERY_DATASET = {
  'royal-gold-necklace': {
    title: 'Royal 22K Hallmarked Gold Necklace Set',
    price: {amount: '84999.00', currencyCode: 'INR'},
    image: '/images/gold_necklace.jpg',
  },
  'solitaire-diamond-ring': {
    title: 'Solitaire Diamond Engagement Ring in 18K White Gold',
    price: {amount: '45999.00', currencyCode: 'INR'},
    image: '/images/diamond_ring.jpg',
  },
  'kundan-jhumka-earrings': {
    title: 'Combo of 2 Designer Jhumkas | Kundan Earrings',
    price: {amount: '24999.00', currencyCode: 'INR'},
    image: '/images/kundan_earrings.jpg',
  },
  'gold-carved-bangles': {
    title: '22K Gold Carved Royal Bridal Bangles (Pair)',
    price: {amount: '68999.00', currencyCode: 'INR'},
    image: '/images/gold_bangles.jpg',
  },
  'gold-pendant-necklace': {
    title: 'Royal 22K Gold & Ruby Temple Pendant with Chain',
    price: {amount: '32999.00', currencyCode: 'INR'},
    image: '/images/gold_pendant.jpg',
  },
  'polki-choker-set': {
    title: 'Uncut Diamond & Emerald Heritage Polki Choker Set',
    price: {amount: '115000.00', currencyCode: 'INR'},
    image: '/images/polki_choker.jpg',
  },
  'gold-kasu-haaram': {
    title: 'Traditional 22K South Indian Kasu Haaram Gold Coin Long Necklace',
    price: {amount: '145000.00', currencyCode: 'INR'},
    image: '/images/kasu_haaram.jpg',
  },
  'diamond-drop-earrings': {
    title: 'VVS Diamond & South Sea Pearl Chandelier Drop Earrings',
    price: {amount: '52000.00', currencyCode: 'INR'},
    image: '/images/diamond_earrings.jpg',
  },
  'temple-choker-necklace': {
    title: 'Heritage Antique 22K Gold Temple Choker Necklace',
    price: {amount: '98000.00', currencyCode: 'INR'},
    image: '/images/temple_choker.jpg',
  },
  'ruby-gold-bangles': {
    title: 'Royal Ruby Studded 22K Gold Kadas (Pair)',
    price: {amount: '88000.00', currencyCode: 'INR'},
    image: '/images/ruby_bangles.jpg',
  },
  'solitaire-drop-pendant': {
    title: '18K White Gold Solitaire Diamond Drop Pendant with Chain',
    price: {amount: '38500.00', currencyCode: 'INR'},
    image: '/images/solitaire_pendant.jpg',
  },
  'bridal-mangalsutra': {
    title: 'Traditional 22K Gold & Black Bead Bridal Mangalsutra',
    price: {amount: '42000.00', currencyCode: 'INR'},
    image: '/images/mangalsutra.jpg',
  },
  'emerald-halo-ring': {
    title: 'Zambian Emerald & VVS Diamond Halo Cocktail Ring',
    price: {amount: '64000.00', currencyCode: 'INR'},
    image: '/images/emerald_ring.jpg',
  },
  'pearl-statement-necklace': {
    title: 'Freshwater Pearl & 22K Gold Multi-Strand Statement Necklace',
    price: {amount: '56000.00', currencyCode: 'INR'},
    image: '/images/pearl_necklace.jpg',
  },
  'gold-filigree-jhumkas': {
    title: '22K Gold Filigree Traditional Drop Jhumkas',
    price: {amount: '29500.00', currencyCode: 'INR'},
    image: '/images/gold_earrings.jpg',
  },
};

export function mergeCartWithSession(apiCart, customLines = []) {
  const base = apiCart ? JSON.parse(JSON.stringify(apiCart)) : {id: 'cart-session', totalQuantity: 0, lines: {nodes: []}};
  if (!base.lines) base.lines = {nodes: []};
  if (!base.lines.nodes) base.lines.nodes = [];

  let extraQty = 0;
  let extraAmt = 0;

  for (const item of customLines) {
    extraQty += item.quantity;
    const itemTotal = parseFloat(item.price?.amount || '0') * item.quantity;
    extraAmt += itemTotal;

    base.lines.nodes.push({
      id: item.id,
      quantity: item.quantity,
      cost: {
        totalAmount: {
          amount: itemTotal.toFixed(2),
          currencyCode: item.price?.currencyCode || 'INR',
        },
      },
      merchandise: {
        id: item.merchandiseId,
        title: item.title,
        product: {
          id: `gid://shopify/Product/${item.handle}`,
          handle: item.handle,
          title: item.title,
        },
        image: {
          url: item.image,
          altText: item.title,
        },
        selectedOptions: [],
        price: item.price,
      },
    });
  }

  const baseQty = base.totalQuantity || 0;
  const baseAmt = parseFloat(base.cost?.totalAmount?.amount || '0');
  const finalAmt = (baseAmt + extraAmt).toFixed(2);

  return {
    ...base,
    totalQuantity: baseQty + extraQty,
    cost: {
      subtotalAmount: {amount: finalAmt, currencyCode: 'INR'},
      totalAmount: {amount: finalAmt, currencyCode: 'INR'},
    },
  };
}

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: `Your Shopping Cart - Ujwal Jewellers`}];
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({actionHeaders}) => actionHeaders;

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  const {cart, session} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;
  let customLines = session.get('custom_cart_lines') || [];

  switch (action) {
    case CartForm.ACTIONS.LinesAdd: {
      let apiSuccess = false;
      try {
        result = await cart.addLines(inputs.lines);
        if (result?.cart?.id && (!result.errors || result.errors.length === 0)) {
          apiSuccess = true;
        }
      } catch (err) {
        console.warn('Storefront API addLines unavailable, using session cart fallback.');
      }

      if (!apiSuccess) {
        // Process line items into custom session cart
        for (const line of inputs.lines) {
          const rawId = line.merchandiseId || '';
          const handle = rawId.replace('gid://shopify/ProductVariant/', '');
          const info = JEWELLERY_DATASET[handle] || {
            title: line.title || 'Luxury 22K Gold Jewellery Item',
            price: line.price || {amount: '24999.00', currencyCode: 'INR'},
            image: line.image || '/images/kundan_earrings.jpg',
          };

          const existingIndex = customLines.findIndex((c) => c.merchandiseId === rawId || c.handle === handle);
          if (existingIndex > -1) {
            customLines[existingIndex].quantity += (line.quantity || 1);
          } else {
            customLines.push({
              id: `custom-line-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              merchandiseId: rawId,
              handle: handle || 'kundan-jhumka-earrings',
              quantity: line.quantity || 1,
              title: info.title,
              price: info.price,
              image: info.image,
            });
          }
        }

        session.set('custom_cart_lines', customLines);
        result = {
          cart: mergeCartWithSession(null, customLines),
          errors: null,
          warnings: null,
        };
      }
      break;
    }

    case CartForm.ACTIONS.LinesUpdate: {
      let apiSuccess = false;
      try {
        result = await cart.updateLines(inputs.lines);
        if (result?.cart?.id && (!result.errors || result.errors.length === 0)) {
          apiSuccess = true;
        }
      } catch (err) {
        console.warn('Storefront API updateLines fallback.');
      }

      if (!apiSuccess) {
        for (const line of inputs.lines) {
          const index = customLines.findIndex((c) => c.id === line.id || c.merchandiseId === line.id);
          if (index > -1) {
            if (line.quantity <= 0) {
              customLines.splice(index, 1);
            } else {
              customLines[index].quantity = line.quantity;
            }
          }
        }
        session.set('custom_cart_lines', customLines);
        result = {
          cart: mergeCartWithSession(null, customLines),
          errors: null,
          warnings: null,
        };
      }
      break;
    }

    case CartForm.ACTIONS.LinesRemove: {
      let apiSuccess = false;
      try {
        result = await cart.removeLines(inputs.lineIds);
        if (result?.cart?.id && (!result.errors || result.errors.length === 0)) {
          apiSuccess = true;
        }
      } catch (err) {
        console.warn('Storefront API removeLines fallback.');
      }

      if (!apiSuccess) {
        customLines = customLines.filter((c) => !inputs.lineIds.includes(c.id) && !inputs.lineIds.includes(c.merchandiseId));
        session.set('custom_cart_lines', customLines);
        result = {
          cart: mergeCartWithSession(null, customLines),
          errors: null,
          warnings: null,
        };
      }
      break;
    }

    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];
      discountCodes.push(...(inputs.discountCodes || []));
      try {
        result = await cart.updateDiscountCodes(discountCodes);
      } catch (e) {
        result = {cart: mergeCartWithSession(null, customLines)};
      }
      break;
    }

    default:
      try {
        result = await cart.get();
      } catch (e) {
        result = {cart: mergeCartWithSession(null, customLines)};
      }
  }

  const cartId = result?.cart?.id;
  const headers = new Headers();
  if (session.isPending) {
    headers.append('Set-Cookie', await session.commit());
  }

  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: mergeCartWithSession(cartResult, customLines),
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const {cart, session} = context;
  let apiCart = null;
  try {
    apiCart = await cart.get();
  } catch (err) {
    // Storefront API offline or non-responsive
  }

  const customLines = session.get('custom_cart_lines') || [];
  return mergeCartWithSession(apiCart, customLines);
}

export default function Cart() {
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

  return (
    <div className="cart max-w-[1200px] mx-auto px-6 py-10">
      <h1 className="text-2xl font-serif font-bold text-slate-900 mb-6">Shopping Cart</h1>
      <CartMain layout="page" cart={cart} />
    </div>
  );
}

/** @typedef {import('react-router').HeadersFunction} HeadersFunction */
/** @typedef {import('./+types/cart').Route} Route */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
/** @typedef {ReturnType<typeof useActionData<typeof action>>} ActionReturnData */
