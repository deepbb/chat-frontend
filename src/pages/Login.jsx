import "./Login.css"
import { AuthContext } from "../Context/AuthContext"
import { LoginCall } from "../LoginCall";
import {  useRef ,useContext} from "react"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";



export default function Login() { 
  const username = useRef(); 
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);  
  const navigate = useNavigate()

  const clickHandler = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    await LoginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );

    navigate("/")

    
    
  };


    


    return (
        <div className="login-container">
        <div className="login">
        <div className="loginText">
            <h1 className="loginTitle">SnapTalk</h1>
            <h2>Lets connect to the world with SnapTalk</h2>
        </div>
        <div className="loginForm">
        <form className="loginInputs" onSubmit={clickHandler}>
            <input className="loginEmail" type="text" ref={username} placeholder="Enter Your Email" required />
            <input className="loginPassword" ref={password} type="password" placeholder="Enter Your Password" required />
            {/* <div className="login-btn-container"> */}
            <button type="submit" className="login-btn">{isFetching ? "Loading" : "Log In"}</button>
            <span className="loginForgot">Forgot password?</span>
            </form>
            <Link to ={"/signup"} >
            <button className="login-btn">Create a New Account</button>
            </Link>
            
        </div>
        </div>
        </div>
    )
}


//style={{textDecoration:"none", color:"white"}}
// const {user, dispatch } = useContext(AuthContext);
  
//     const clickHandler = async (e) => {
//       e.preventDefault();
//       dispatch(LoginStart());
//   try {
//     const res = await axios.post("/auth/login", {
//       email:email.current.value,
//       password:password.current.value

//     });
//     console.log(res);
//     dispatch(LoginSuccess(res.data));
//   } catch (err) {
//     dispatch(LoginFailure(err))
//   }
// };
// console.log(user);
    

