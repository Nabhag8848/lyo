interface ActionButtonsProps {
  buttonType: 'add_to_bag' | 'go_to_bag' | 'go_to_page';
  isDisabled: boolean;
  price: string;
  onAddToBag: () => void;
}

export function ActionButtons({
  buttonType,
  isDisabled,
  price,
  onAddToBag,
}: ActionButtonsProps) {
  const buttonText =
    buttonType === 'go_to_bag'
      ? 'Go to Bag'
      : buttonType === 'go_to_page'
      ? 'Go to Page'
      : 'Add to Bag';

  return (
    <div className="p-3 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-2">
      <button
        onClick={onAddToBag}
        disabled={isDisabled}
        className={`w-full py-2.5 text-[0.625rem] font-bold tracking-[0.25em] uppercase transition-all flex justify-between px-4 rounded ${
          isDisabled
            ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
            : 'bg-brand-pink text-white hover:bg-rose-600 shadow-lg hover:shadow-rose-200'
        }`}
      >
        <span className="flex items-center gap-1.5">
          {buttonType === 'add_to_bag' && (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          )}
          {buttonText}
        </span>
        {buttonType === 'add_to_bag' && !isDisabled && (
          <span className="text-[0.625rem]">{price}</span>
        )}
        {(buttonType === 'go_to_bag' || buttonType === 'go_to_page') && (
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
