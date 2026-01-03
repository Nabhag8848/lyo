interface CurrentProductDetailsProps {
  brand: string;
  name: string;
  price: string;
  mrp: string;
  discount: string;
}

export function CurrentProductDetails({
  brand,
  name,
  price,
  mrp,
  discount,
}: CurrentProductDetailsProps) {
  return (
    <div className="space-y-1.5 min-h-14">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-stone-900 text-base tracking-wide uppercase line-clamp-1">
            {brand}
          </h4>
          <p className="text-stone-500 text-[0.5rem] font-bold uppercase tracking-[0.2em] mt-0.5 line-clamp-2 min-h-[2.4em]">
            {name || '\u00A0'}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-display text-base text-stone-900 block">
            {price}
          </span>
          {mrp && (
            <span className="text-stone-400 text-[0.625rem] line-through">
              {mrp}
            </span>
          )}
          {discount && (
            <span className="text-green-600 text-[0.625rem] font-bold ml-1">
              {discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
