import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Home() {

  const username = useSelector((state) => state.user.name);
  const navigate = useNavigate();

  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? <Button type="primary" onClick={() => navigate("/menu")}>Go to menu</Button> : <CreateUser />}
    </div>
  );
}

export default Home;
