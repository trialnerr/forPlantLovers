import { PlantProps } from "../types";

function GalleryCard({ common_name, image_url }: PlantProps) {
  // const [name, setName] = useState(''); 
  
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg"
        src={image_url}
        alt={`Picture of ${common_name}`}
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {common_name}
        </h5>
        
        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          
        </p> */}
      </div>
    </div>
  );
}

export default GalleryCard;
