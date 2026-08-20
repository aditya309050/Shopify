import {Link, useNavigate} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {useAside} from './Aside';

/**
 * @param {{
 *   productOptions: MappedProductOptions[];
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 * }}
 */
export function ProductForm({productOptions, selectedVariant}) {
  const navigate = useNavigate();
  const {open} = useAside();

  const isAvailable = selectedVariant?.availableForSale;
  const lineItems = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: 1,
          selectedVariant,
        },
      ]
    : [];

  return (
    <div className="product-form flex flex-col gap-4">
      {/* Variant Selector Pills */}
      {productOptions.map((option) => {
        if (option.optionValues.length === 1) return null;

        return (
          <div className="fk-variant-section" key={option.name}>
            <span className="fk-variant-label">{option.name}</span>
            <div className="fk-variant-pills">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  return (
                    <Link
                      className={`fk-variant-btn ${selected ? 'active' : ''}`}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{opacity: available ? 1 : 0.4}}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      className={`fk-variant-btn ${selected ? 'active' : ''}`}
                      key={option.name + name}
                      style={{opacity: available ? 1 : 0.4}}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          void navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}

      {/* Flipkart Dual Action Buttons: ADD TO CART & BUY NOW */}
      <div className="fk-action-buttons mt-4">
        {/* ADD TO CART BUTTON (Yellow #ff9f00) */}
        <CartForm
          route="/cart"
          inputs={{lines: lineItems}}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher) => (
            <button
              type="submit"
              className="btn-fk-add-cart"
              disabled={!isAvailable || fetcher.state !== 'idle'}
              onClick={() => open('cart')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span>{isAvailable ? 'ADD TO CART' : 'OUT OF STOCK'}</span>
            </button>
          )}
        </CartForm>

        {/* BUY NOW BUTTON (Orange #fb641b) */}
        <CartForm
          route="/cart"
          inputs={{lines: lineItems}}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher) => (
            <button
              type="submit"
              className="btn-fk-buy-now"
              disabled={!isAvailable || fetcher.state !== 'idle'}
              onClick={() => {
                open('cart');
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
              </svg>
              <span>{isAvailable ? 'BUY NOW' : 'OUT OF STOCK'}</span>
            </button>
          )}
        </CartForm>
      </div>
    </div>
  );
}

function ProductOptionSwatch({swatch, name}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
      style={{backgroundColor: color || 'transparent'}}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}
