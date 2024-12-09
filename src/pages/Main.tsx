import Feature from "../components/Feature";
import { FeatureProps } from "../types"; 
import plant1 from "../client/assets/plant1.png";
import plant2 from "../client/assets/plant2.png";
import plant3 from "../client/assets/plant3.png"; 

const Main = () => {
  const feats: FeatureProps[] = [
    { heading: "Identify Plants", text: "Add a picture and get an estimate of what the plant could be.", icon: plant1 },
    { heading: "Memorize them in a gallery", text: "Add them to your personal gallery with notes", icon: plant2 },
    { heading: "Get plant care tips", text: "Get plants care tips and never kill a plant again!", icon: plant3 },
  ];

  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 content-center min-h-[calc(100vh-2rem)]">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        {/* <div
          className="relative inset-0 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[lightGreen] to-[pink] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        ></div> */}
      </div>
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Become a better plant parent.
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Learn how to take better care of your plant babies by using some of
            the features we offer.
          </p>
        </div>
        <section className="grid grid-cols-3 gap-2">
          {feats.map((obj, i) => (
            <Feature
              text={obj.text}
              heading={obj.heading}
              icon={obj.icon}
              key={`feature${i}`}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Main;
