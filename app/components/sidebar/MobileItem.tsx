import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      className={clsx(
        `
    group
    p-4
    text-gray-500
    hover:text-black
    hover:bg-gray-100
    text-sm
    leading-6
  w-full
  flex
  justify-center
    font-semibold
    `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
};

export default MobileItem;
