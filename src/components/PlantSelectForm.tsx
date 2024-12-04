import { useContext } from "react";
import { PlantSelectFormProps } from "../types";
import { AuthContext } from "../context/authContext";

function PlantSelectForm({ identifiedPlant, apiImages }: PlantSelectFormProps) {
  const context = useContext(AuthContext); 
  const userId: string = context?.user?._id as string;
  const species = identifiedPlant?.scientificName;
  identifiedPlant?.genus
  console.log(apiImages, 'images in plantform'); 
  
  
  const today = ''; 
  
  //send a request to save the plant to plant model 
  //then save the note to the noteDb
  async function handleSavePlantAndNote() {
    console.log('saving plant and note!');
    if (identifiedPlant && apiImages) {
      const { commonNames, scientificName, genus } = identifiedPlant;
      const genusScientificName: string = genus.scientificName;
    
      const formData = new FormData;
      commonNames.forEach((commonName: string) => {
        formData.append('commonName', commonName);
      })
      formData.append('genus', genusScientificName);
      formData.append('scientificName', scientificName);
      formData.append('postedBy', userId);
      apiImages.forEach((imgObj) => {
         formData.append("apiImages", imgObj.url);
      })

      const response = await fetch("api/plant/create", {
        method: "POST",
        body: formData,
      });

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
                Plant Species
              </label>
              <input
                type="text"
                name="species"
                id="species"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
                defaultValue={species}
                readOnly={true}
                required
              ></input>
            </div>
            <div className="w-full">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="brand"
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
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
