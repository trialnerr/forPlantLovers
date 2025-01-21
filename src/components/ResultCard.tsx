import { ResultCardProps } from "../types";

function ResultCard({ result, id, handleAddSpecies  }: ResultCardProps) {
  const { score, species, images } = result; 
  return (
    <article className="w-full bg-white rounded-lg shadow my-4">
      <div className="w-full p-4 border bg-gray-50 rounded-t-lg flex justify-between">
        <div className="flex flex-col justify-start text-start">
          <div>
            <span className="font-bold">Common Names:</span>{" "}
            {`${species.commonNames.join(", ")}.`}{" "}
          </div>
          <div>
            <span className="font-bold">Scientific Name:</span>{" "}
            <span className="font-light italic">{species.scientificName}</span>
          </div>
          <div>
            <span className="font-bold">Genus:</span>{" "}
            {species.family.scientificNameWithoutAuthor}
          </div>
        </div>
        <div className="self-end">
          <span className="font-bold">Confidence:</span>{" "}
          {`${Math.floor(score * 10000) / 100}%`}{" "}
        </div>
      </div>
      <div className="w-full p-4 border flex justify-center">
        <div className="flex gap-3 flex-wrap">
          {images.map((imgObj, i) => {
            return <img src={imgObj.url.s} alt="" key={`resultCardImg${i}`} />;
          })}
        </div>
      </div>
      <div className="p-4 border border-gray-200 bg-gray-50 rounded-b-lg text-right">
        <a href="#plantSelectForm">
          <button
            onClick={() => handleAddSpecies(id)}
            type="button"
            className="text-grey bg-lightGreen hover:bg-green border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            This is the correct plant!
          </button>
        </a>
      </div>
    </article>
  );
}

export default ResultCard;
