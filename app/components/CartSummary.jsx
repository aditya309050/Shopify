import {Money} from '@shopify/hydrogen';
import {useId} from 'react';

/**
 * @param {CartSummaryProps}
 */
export function CartSummary({cart}) {
  const summaryId = useId();

  const totalQuantity = cart?.totalQuantity || 0;
  const subtotalAmount = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || 'USD';

  // Calculate simulated Flipkart savings (e.g. 30% savings)
  const savingsAmount = (subtotalAmount * 0.3).toFixed(2);
  const originalTotal = (subtotalAmount * 1.3).toFixed(2);

  return (
    <div aria-labelledby={summaryId} className="fk-cart-summary-box">
      <div className="fk-price-details-title">Price Details</div>

      {/* Item Price Subtotal */}
      <div className="fk-cart-row">
        <span>Price ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})</span>
        <span>${originalTotal} {currencyCode}</span>
      </div>

      {/* Discount Row */}
      <div className="fk-cart-row">
        <span>Discount</span>
        <span className="text-emerald-700 font-bold">-${savingsAmount} {currencyCode}</span>
      </div>

      {/* Delivery Charges */}
      <div className="fk-cart-row">
        <span>Delivery Charges</span>
        <span>
          <span className="line-through text-slate-400 mr-1">$40</span>
          <span className="text-emerald-700 font-bold">FREE</span>
        </span>
      </div>

      {/* Total Amount */}
      <div className="fk-cart-total-row">
        <span>Total Amount</span>
        <span>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '$0'
          )}
        </span>
      </div>

      {/* Savings Highlight */}
      <div className="fk-savings-banner border-t border-b border-emerald-100 bg-emerald-50/50 p-2 my-2 rounded text-center">
        You will save ${savingsAmount} {currencyCode} on this order
      </div>

      {/* Flipkart PLACE ORDER Action */}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="mt-4">
      <a href={checkoutUrl} target="_self" className="btn-fk-place-order">
        PLACE ORDER
      </a>
    </div>
  );
}

/**
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */
