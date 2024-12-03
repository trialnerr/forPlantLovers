import { FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { AuthContext } from "../context/authContext";
import { userData } from "../types";

function Register() {
  const context = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();
  console.log(context, 'in register');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;
    const confirmPassword: string | undefined =
      confirmPasswordRef.current?.value;
    //post request to /api/user/register
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }
    const response = await fetch("/api/user/register", {
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
     navigate("/identify");
   }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <ErrorMessage errMsg={errMsg} />
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Register</h1>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          className="w-full p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          minLength={8}
          className="w-full p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="repeat-password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Repeat password
        </label>
        <input
          ref={confirmPasswordRef}
          type="password"
          id="repeat-password"
          minLength={8}
          className="w-full p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      {/* commented out the terms and conditions checkbox */}
      {/* <div className="flex items-start mb-6">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 mt-1 rounded border focus:ring-blue-500"
          required
        />
        <label
          htmlFor="terms"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            terms and conditions
          </a>
        </label>
      </div> */}
      <button
        type="submit"
        className="w-full py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-lg mb-4"
      >
        Register
      </button>
      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

export default Register;
