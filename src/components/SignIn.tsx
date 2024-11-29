function SignIn() {
  return (
    <form className="w-full">
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
