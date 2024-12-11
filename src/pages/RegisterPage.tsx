import Register from "../components/Register";
import plantImage from "../client/assets/pexels-pixabay-35196.jpg"

function RegisterPage() {
  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 flex justify-center items-center my-24 md:my-0 min-h-screen md:items-center">
      <section className="flex flex-col md:flex-row w-4/5 h-full items-center justify-center">
        <div className="flex flex-col md:flex-row w-full sm:w-[90%] max-w-6xl sm:max-w-5xl shadow-lg bg-white overflow-hidden rounded-lg">
          <div className="md:w-2/5 p-8 bg-gray-50 flex items-center">
            <Register />
          </div>
          <div className="md:w-3/5 hidden md:block">
            <img
              className="w-full h-full object-cover"
              src={plantImage}
              alt="Purple florists' Chrysanthemum"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
