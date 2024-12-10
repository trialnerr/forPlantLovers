import { PlantCareDetailImagesProps } from '../types';

function PlantAndNote({ images }: PlantCareDetailImagesProps) {

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex gap-2.5">
      {images.slice(0, 4).map((image, index) => (
        <img key={index} className="w-16 h-16 rounded-full" src={image} alt={`Plant image ${index + 1}`} />
      ))}
      </div>
   
    </div>
  );
};

export default PlantAndNote;