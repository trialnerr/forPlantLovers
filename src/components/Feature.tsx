import { FeatureProps } from "../types";


const Feature = ({ heading, text, icon}: FeatureProps) => {
  return (
    <div className="p-4 max-w-sm text-center">
      <div className="flex rounded-lg h-full p-4 flex-col bg-gray-100 shadow-lg border ">
        <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center rounded-full text-green flex-shrink-0 ">
          <img
            src={icon}
            alt=""
            className="rounded-full w-full h-full object-cover mx-auto"
          />
        </div>
        <div className="flex items-center mb-3 text-center">
          <h2 className="text-gray-900 text-lg font-medium text-center">{heading}</h2>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <p className="leading-relaxed text-base text-gray-700">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
