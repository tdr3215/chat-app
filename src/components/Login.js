import { useState, useEffect } from "react";
import {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logout,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="container justify-content-center">
      <div className="row justify-content-center">
        <div className="col-auto">
          <form className="mt-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                value={password}
                type="password"
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            {/* 
            <button
              onClick={() => logInWithEmailAndPassword(email, password)}
              className="btn btn-primary"
            >
              Login with Email
            </button> */}
            <div className="justify-content-between">
              <Link
                to={"/dashboard"}
                className="btn btn-primary border-white"
                onClick={signInWithGoogle}
              >
                Login with Google
              </Link>
              <button onClick={logout} className="btn btn-primary border-white">
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
