import Feature from "./Feature";
import { FeatureProps } from "../types";

const Main = () => {
  const feats: FeatureProps[] = [
    { heading: 'Feature 1', text: 'i am feature 1 text, and i do things' },
    { heading: 'Feature 2', text: 'i am feature 1 text, and i do things' },
    { heading: 'Feature 3', text: 'i am feature 1 text, and i do things' }
  ];

  return (
    <main className='relative isolate px-6 pt-6 lg:px-8 content-center min-h-[calc(100vh-2rem)]'>
      <div className='mx-auto max-w-3xl'>
        <div className='text-center'>
          <h1 className='text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
            Become a better plant parent.
          </h1>
          <p className='mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
            Learn how to take better care of your plant babies by using some of
            the features we offer.
          </p>
        </div>
        <section className='flex gap-4 '>
          {feats.map((obj) => (
            <Feature text={obj.text} heading={obj.heading} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default Main