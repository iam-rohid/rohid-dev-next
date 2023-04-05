import clsx from "clsx";

const HeaderVerticalSeparatorLine = ({
  className: className,
}: {
  className?: string;
}) => (
  <div
    className={clsx("h-5 w-px bg-gray-900/10 dark:bg-gray-100/10", className)}
  />
);

export default HeaderVerticalSeparatorLine;
