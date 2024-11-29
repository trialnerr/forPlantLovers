import Register from "../components/Register";
import plantImage from "../client/assets/pexels-surender-singh-561453-1317013.jpg";

function RegisterPage() {
  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 min-h-[100vh] flex items-center">
      <section className="flex w-full h-full items-center justify-center">
        <div className="flex w-[90%] max-w-7xl shadow-lg bg-white overflow-hidden rounded-lg h-[90vh]">
          <div className="w-2/5 p-8 bg-gray-50 flex items-center">
            <Register />
          </div>
          <div className="w-3/5 h-full">
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
