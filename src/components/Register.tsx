function Register() {
  return (
    <form className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Register</h1>
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
      <div className="mb-6">
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
      </div>
      <div className="mb-6">
        <label
          htmlFor="repeat-password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Repeat password
        </label>
        <input
          type="password"
          id="repeat-password"
          className="w-full p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-start mb-6">
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
      </div>
      <button
        type="submit"
        className="w-full py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-lg mb-4"
      >
        Register new account
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
