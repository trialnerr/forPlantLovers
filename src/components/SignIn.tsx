import { FormEvent, useContext, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { AuthContext } from "../context/authContext";
import { userData } from "../types";

function SignIn() {
  const context = useContext(AuthContext); 
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();
  const { state } = useLocation();

  if (context?.user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    
    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;
    console.log(email, password);
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

     if (!response.ok) {
       const { msg } = await response.json();
       setErrMsg(msg);
     } else {
       const result: userData = await response.json(); 
       //set the currentuser and then navigate to identify
       context?.login(result);
       //this is so that they are
       //redirected to whatever page they were trying to go to first.
       navigate(state?.path || "/identify");
     }
  }
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <ErrorMessage errMsg={errMsg} />
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Sign In</h1>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="example@example.com"
          required
          ref={emailRef}
          minLength={8}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          minLength={8}
          className="w-full p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <div className=" mt-2">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-lg mb-4"
      >
        Sign In
      </button>
      <p className="text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </form>
  );
}

export default SignIn;
