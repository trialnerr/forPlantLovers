import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GalleryCardProps } from "../types";

function GalleryCard({
  plantWithNote,
  deletePlantAndNote,
  updateNote,
}: GalleryCardProps) {
  const { cloudinaryImages, commonNames, scientificName, notes, _id } =
    plantWithNote;
  const { note, idDate, idPlace } = notes[0];
  const plantId = _id;
  const noteId = plantWithNote.notes[0]._id;

  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState(note);
  const [editPlace, setEditPlace] = useState(idPlace);

  const navigate = useNavigate();

  async function handleDelete() {
    deletePlantAndNote(plantId, noteId);
  }

  async function saveEdits() {
    setIsEditing(false);
    updateNote(noteId, editNote, editPlace);
  }

  function navigateToPlantDetails() {
    navigate(`/care/${plantId}`, { state: { plantWithNote } });
  }

  return (
    <article className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden relative">
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
        <h5 className="mb-2 text-lg font-semibold text-gray-800">
          Common Names:{" "}
          <span className="text-gray-500 font-normal">
            {commonNames.join(", ")}
          </span>
        </h5>
        <h6 className="mb-2 text-md font-medium text-gray-800">
          Scientific Name:{" "}
          <span className="text-gray-500 font-normal">{scientificName}</span>
        </h6>
        {/* Note Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-10">
          <p className="mb-2 text-gray-700">
            <strong>Note:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                className="border border-gray-300 rounded p-1 w-full"
              />
            ) : (
              <span className="text-gray-600">{note}</span>
            )}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Found at:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editPlace}
                onChange={(e) => setEditPlace(e.target.value)}
                className="border border-gray-300 rounded p-1 w-full"
              />
            ) : (
              <span className="text-gray-600">{idPlace}</span>
            )}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>When:</strong>{" "}
            <span className="text-gray-600">
              {new Date(idDate).toLocaleDateString()}
            </span>
          </p>
        </div>
        {/* End Note Section */}
        <div className="flex justify-end space-x-2 absolute bottom-4 right-5 pt-3">
          {isEditing ? (
            <>
              <button
                onClick={saveEdits}
                className="px-3 py-1 bg-green text-white text-sm rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-green text-white text-sm rounded hover:bg-lightGreen"
            >
              Update
            </button>
          )}
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
          <button
            onClick={navigateToPlantDetails}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
          >
            See details
          </button>
        </div>
      </div>
    </article>
  );
}

export default GalleryCard;
