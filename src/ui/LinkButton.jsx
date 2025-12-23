import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({ children, ...props }) {
  const navigate = useNavigate();

  if (props.to === "-1")
    return (
      <button onClick={() => navigate(-1)} {...props}>
        {children}
      </button>
    );

  return (
    <Link {...props} className="text-sm text-blue-500 hover:text-blue-600">
      {children}
    </Link>
  );
}
