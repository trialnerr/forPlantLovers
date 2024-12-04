import { ResultCardProps } from "../types";

function ResultCard({ result, id, handleAddSpecies  }: ResultCardProps) {
  const { score, species, images } = result; 
  return (
    <article className="w-full bg-white border border-gray-200 rounded-lg shadow my-4">
      <div className="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-lg">
        <div>Common Names: {`${species.commonNames.join(", ")}.`} </div>
        <div>Confidence: {`${Math.floor(score * 10000) / 100}%`} </div>
        <div>Scientific Name: {species.scientificName}</div>
        <div>Genus: {species.family.scientificNameWithoutAuthor}</div>
      </div>
      <div className="w-full p-4 border flex justify-center">
        <div className="flex gap-3 flex-wrap">
          {images.map((imgObj, i) => {
            return <img src={imgObj.url.s} alt="" key={`resultCardImg${i}`}/>;
          })}
        </div>
      </div>
      <div className="p-4 border border-gray-200 bg-gray-50 rounded-b-lg text-right">
        <button
          onClick={() => handleAddSpecies(id)}
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
        >
          This is the correct plant!
        </button>
      </div>
    </article>
  );
}

export default ResultCard;
