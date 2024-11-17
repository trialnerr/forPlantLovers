import Upload from "../components/Upload";

function Identify() {
  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 min-h-[calc(100vh-2rem)] content-center">
      <div className="mx-auto max-w-3xl">
        <div className="text-center flex flex-col h-full">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Identify Plants Around You..
          </h1>
          <h2 className="text-balance text-xl tracking-tight text-gray-900 sm:text-2xl py-1">
            Upload a clear and high quality picture below. 
          </h2>
          <div className="my-12">
            <Upload />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Identify;
