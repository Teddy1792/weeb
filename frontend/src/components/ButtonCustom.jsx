import { Link } from "react-router-dom";

export default function Button({ text, type = "button", to, ...props }) {
  const baseClasses =
    "flex w-[120px] justify-center bg-secondaryFlashy text-xs font-bold text-white rounded-sm py-2 px-4 hover:scale-110 transition ease-in-out duration-300 cursor-pointer";

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} {...props}>
      {text}
    </button>
  );
}
