import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <h1>COntent</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
