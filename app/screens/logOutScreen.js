import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, resetUser } from "../components/redux/userSlice";

export default function LogOut() {
  console.log("LogOut component");

  const dispatch = useDispatch();
  dispatch(removeUser());
}
