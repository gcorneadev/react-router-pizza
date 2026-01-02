import { use } from "react";
import { useSelector } from "react-redux";

export default function Username() {

  const username = useSelector((state) => state.user.name);

  return <div className="text-sm font-semibold hidden md:block">{username}</div>;
}
