import { FormEvent, useContext, useRef } from "react";
import { PlantSelectFormProps } from "../types";
import { AuthContext } from "../context/authContext";

function PlantSelectForm({
  identifiedPlant,
  apiImages,
  handleSetDone,
}: PlantSelectFormProps) {
  const context = useContext(AuthContext);
  const userId: string = context?.user?._id as string;
  const commonName = identifiedPlant?.commonNames[0];

  const idDateRef = useRef<HTMLInputElement>(null);
  const idPlaceRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  async function handleSavePlantAndNote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (identifiedPlant && apiImages) {
      const { commonNames, scientificNameWithoutAuthor, genus } =
        identifiedPlant;
      const genusScientificName: string = genus.scientificName;

      const plantData = {
        commonNames,
        genus: genusScientificName,
        scientificName: scientificNameWithoutAuthor,
        postedBy: userId,
        cloudinaryImages: apiImages.map((imgObj) => imgObj.url),
      };
      const response = await fetch("api/plant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });

      const result = await response.json();
      const plantID = result.plantId;
      const idDate = idDateRef.current?.value;
      const idPlace = idPlaceRef.current?.value;
      const note = noteRef.current?.value;

      const plantNoteData = {
        postedBy: userId,
        plantID,
        idDate,
        idPlace,
        note,
      };
      const plantNoteSaveResponse = await fetch("api/plantNote/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantNoteData),
      });

      if (plantNoteSaveResponse.ok) {
        setTimeout(() => handleSetDone(), 1000);
      }
    }
  }
  return (
    <section className="bg-white" id="plantSelectForm">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add Plant to Gallery
        </h2>
        <form onSubmit={handleSavePlantAndNote} action="#">
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="species"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Plant Common Name
              </label>
              <input
                type="text"
                name="species"
                id="species"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
                defaultValue={commonName}
                readOnly={true}
                required
              ></input>
            </div>
            <div className="w-full">
              <label
                htmlFor="idDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date
              </label>
              <input
                ref={idDateRef}
                type="date"
                name="idDate"
                id="idDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              ></input>
            </div>
            <div className="w-full">
              <label
                htmlFor="place"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Place
              </label>
              <input
                ref={idPlaceRef}
                type="text"
                name="place"
                id="place"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Where did you see the plant?"
                required
              ></input>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="note"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Note
              </label>
              <textarea
                ref={noteRef}
                id="note"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add any notes about the plant here ..."
              ></textarea>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="bg-gray-200 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add plant
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PlantSelectForm;
