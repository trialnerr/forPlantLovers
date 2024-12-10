import { useNavigate } from "react-router-dom";
import { GalleryCardProps } from "../types";

function GalleryCard({ plantWithNote, deletePlantAndNote}: GalleryCardProps) {
  const { cloudinaryImages, commonNames, scientificName, notes, _id } = plantWithNote; 
  const { note, idDate, idPlace } = notes[0] 
  const plantId = _id;
  const noteId = plantWithNote.notes[0]._id;

  const navigate = useNavigate();
  console.log(plantWithNote); 

  async function handleDelete() {
    deletePlantAndNote(plantId, noteId);
  }

  async function handleUpdate() {
    // updateNote(noteId, updateBody);
  }

  function navigateToPlantDetails() {
    navigate(`/care/${plantId}`, { state: { plantWithNote } });
  }

  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <section className="grid grid-cols-2 gap-2 p-3">
        {cloudinaryImages.map((img, i) => (
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
          <span className="text-lg tracking-tight text-gray-700">{note}</span>
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
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={navigateToPlantDetails}
          >
            See details
          </button>
        </div>
      </div>
    </article>
  );
}

export default GalleryCard

  //  <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
  //     <div className="flex items-center space-x-2 rtl:space-x-reverse">
  //       <span className="text-sm font-semibold text-gray-900">
  //       {commonNames.join(', ')}
  //       </span>
  //       <span className="text-sm font-normal text-gray-500">
  //       {genus} - {scientificName}
  //       </span>
  //     </div>
  //     {isEditing ? (
  //       <textarea
  //       className="text-sm font-normal py-2.5 text-gray-900 w-full"
  //       value={tempNote}
  //       onChange={(e) => setTempNote(e.target.value)}
  //       />
  //     ) : (
  //       <p className="text-sm font-normal py-2.5 text-gray-900">
  //       {note}
  //       </p>
  //     )}
  //     <div className="flex space-x-2 rtl:space-x-reverse">
  //       {isEditing ? (
  //       <>
  //         <button onClick={handleSave} className="text-sm font-medium text-blue-600">
  //         Save
  //         </button>
  //         <button onClick={handleCancel} className="text-sm font-medium text-gray-600">
  //         Cancel
  //         </button>
  //       </>
  //       ) : (
  //       <button onClick={handleEdit} className="text-sm font-medium text-blue-600">
  //         Edit
  //       </button>
  //       )}
  //     </div>
  //     </div>