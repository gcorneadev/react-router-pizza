import { Link } from "react-router-dom";

export default function Button({ children, ...props }) {
  const classes =
    "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block px-4 py-3 tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 hover:cursor-pointer disabled:cursor-not-allowed";

  if (props.to)
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
