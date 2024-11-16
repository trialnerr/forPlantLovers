import { FeatureProps } from "../types";

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <div className='p-4 max-w-sm'>
      <div className='flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col'>
        <div className='flex items-center mb-3'>
          <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0'>
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-5 h-5'
              viewBox='0 0 24 24'
            >
              <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
            </svg>
          </div>
          <h2 className='text-white dark:text-white text-lg font-medium'>
            Feature 1
          </h2>
        </div>
        <div className='flex flex-col justify-between flex-grow'>
          <p className='leading-relaxed text-base text-white dark:text-gray-300'>
            Blue bottle crucifix vinyl post-ironic four dollar toast vegan
            taxidermy. Gastropub indxgo juice poutine.
          </p>
          <a
            href='#'
            className='mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center'
          >
            Learn More
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-2'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Feature;


