import { Link } from "react-router-dom";

export default function Button({ type, children, ...props }) {
  const classes =
    "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block px-4 py-3 tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 hover:cursor-pointer disabled:cursor-not-allowed";

  const base =
    "text-sm uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 hover:cursor-pointer disabled:cursor-not-allowed";

  const styles = {
    small: base + " p-2 md:px-3 md:py-2 text-sm bg-yellow-400 hover:bg-yellow-300",
    primary: base + " px-4 py-3 md:px-6 md: py-4 bg-yellow-400 hover:bg-yellow-300",
    secondary: base + " px-4 py-3 md:px-6 md: py-4 bg-stone-200 md:bg-stone-200 hover:bg-stone-300",
  };

  if (props.to)
    return (
      <Link className={styles[type]} {...props}>
        {children}
      </Link>
    );

  return (
    <button {...props} className={styles[type]}>
      {children}
    </button>
  );
}
