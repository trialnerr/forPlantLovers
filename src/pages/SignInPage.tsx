import SignIn from "../components/SignIn";
import plantImage from "../client/assets/pexels-pixabay-60597.jpg"

function SignInPage() {
  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 flex justify-center items-center min-h-screen">
      <section className="flex w-4/5 h-full items-center justify-center">
        <div className="flex w-[90%] max-w-5xl shadow-lg bg-white overflow-hidden rounded-lg">
          <div className="w-2/5 p-8 bg-gray-50 flex items-center">
            <SignIn />
          </div>
          <div className="w-3/5">
            <img
              className="w-full h-full object-cover"
              src={plantImage} 
              alt="Beautiful plant"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignInPage; 
