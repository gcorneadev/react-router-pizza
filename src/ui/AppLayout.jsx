import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  // provide the state of loader (fetcher) function
  // state.loading, state.idle, state.error
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  //   console.log(navigation);

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <h1>COntent</h1>
        {<Outlet />}
      </main>
      <CartOverview />
    </div>
  );
}
