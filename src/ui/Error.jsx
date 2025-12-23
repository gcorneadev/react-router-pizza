import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  // const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        {error.status}: {error.data || error.message}
      </p>

      <LinkButton className="cursor-pointer text-blue-500" to="-1">
        &larr; Go back
      </LinkButton>

      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
}

export default Error;
