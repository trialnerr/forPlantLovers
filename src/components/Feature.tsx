import { FeatureProps } from "../types";


const Feature = ({ heading, text, icon}: FeatureProps) => {
  return (
    <div className="p-4 max-w-sm">
      <div className="flex rounded-lg h-full p-4 flex-col bg-gray-100 shadow-lg border ">
      <div className="flex items-center mb-3 h-20">
        <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-green flex-shrink-0">
        <img src={icon} alt="" className="rounded-full w-full h-full" />
        </div>
        <h2 className="text-gray-900 text-lg font-medium">
        {heading}
        </h2>
      </div>
      <div className="flex flex-col justify-between flex-grow text-center">
        <p className="text-base text-gray-700">{text}</p>
      </div>
      </div>
    </div>
  );
};

export default Feature;
