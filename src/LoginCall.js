import axios from "axios";
import { LoginStart, LoginSuccess , LoginFailure } from "./Context/AuthAction";

export const LoginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("/auth/login",userCredential);
    console.log(res);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    dispatch(LoginFailure(err))
  }
};



















//   dispatch({ type: "LOGIN_START" });
//   try {
//     const res = await axios.post("/auth/login", userCredential);
//     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//   } catch (err) {
//     dispatch({ type: "LOGIN_FAILURE", payload: err });
//   }
// };
  























//   dispatch(LoginStart());
//   try {
//     const res = await axios.post("/auth/login",userCredential);
//     console.log(res);
//     dispatch(LoginSuccess(res.data));
//   } catch (err) {
//     dispatch(LoginFailure(err))
//   }
// };   