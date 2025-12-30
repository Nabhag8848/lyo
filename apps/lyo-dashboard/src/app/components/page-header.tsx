interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <>
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.1] text-black mb-2 uppercase tracking-wide shrink-0">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-stone-600 mb-4 sm:mb-6 lg:mb-8 font-light shrink-0">
        {description}
      </p>
    </>
  );
};
