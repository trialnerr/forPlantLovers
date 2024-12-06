import { GalleryCardProps } from "../types";

function GalleryCard({ plantWithNote, deletePlantAndNote }: GalleryCardProps) {
  
  const images = plantWithNote.cloudinaryImages; 
  const commonNames = plantWithNote.commonNames;
  const scientificName = plantWithNote.scientificName; 
  const note = plantWithNote.notes[0].note; 
  const idDate = plantWithNote.notes[0].idDate;
  const idPlace = plantWithNote.notes[0].idPlace;

  console.log(plantWithNote); 

  async function handleDelete() {
    const plantId = plantWithNote._id; 
    const noteId = plantWithNote.notes[0]._id;
    deletePlantAndNote(plantId, noteId);
  }

  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <section className="grid grid-cols-2 gap-2 p-3">
        {images.map((img, i) => (
          <img
            className="w-full h-32 object-cover rounded"
            src={img}
            alt="Picture of plant"
            key={`galleryImage${i}`}
          />
        ))}
      </section>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          Common Names:{" "}
          <span className="text-lg tracking-tight text-gray-700">
            {commonNames.join(", ")}.
          </span>
        </h5>
        <h6 className="mb-2 text-lg font-semibold tracking-tight text-gray-800">
          Scientific Name:{" "}
          <span className="text-lg tracking-tight text-gray-700">
            {scientificName}.
          </span>
        </h6>
        <p className="mb-3 font-normal text-gray-700">
          Note:{" "}
          <span className="text-lg tracking-tight text-gray-700">
            {note}
          </span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Found at:{" "}
          <span className="text-lg tracking-tight text-gray-700">
            {idPlace}
          </span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          When:{" "}
          <span className="text-lg tracking-tight text-gray-700">
            {new Date(idDate).toLocaleDateString()}
          </span>
        </p>
        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default GalleryCard