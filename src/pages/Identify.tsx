import { useState } from "react";
import Upload from "../components/Upload";
import { Organ, OrganType } from "../types";
import OrganChoiceModal from "../components/OrganChoiceModal";

function Identify() {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [currImage, setCurrImage] = useState<File | null>(null); 
  const [openModal, setModalOpen] = useState<boolean>(false); 

  console.log({ currImage }); 
  console.log(organs)
  console.log(openModal);

  function addOrgan(organType: OrganType) {
    if (!currImage) {
       console.error("No image selected");
       return; 
    }
    setOrgans((prev) => [...prev, { image: currImage, organType }]);
    setModalOpen(false); 
  }

   function handleImageUpload(file: File) {
     console.log("file added");
     console.log("looking for", file , "in", organs);
     if (
       !organs.find(
         (organ) =>
           organ.image.name === file.name && organ.image.size === file.size,
       )
     ) {
       setCurrImage(file);
     } else {
       console.log("Image already exists", file);
       setCurrImage(null);
     }
     setModalOpen(true);
   }

  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 min-h-[calc(100vh-2rem)] content-center">
      <div className="mx-auto max-w-3xl">
        <div className="text-center flex flex-col h-full">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Identify Plants Around You
          </h1>
          <h2 className="text-balance text-xl tracking-tight text-gray-900 sm:text-2xl py-1">
            Add up to 4 pictures of the same plant.
          </h2>
          <h3 className="text-base sm:text-lg text-gray-800">
            At least one photo of leaf, flower, fruit or bark is required.{" "}
          </h3>
          {openModal && currImage ? <OrganChoiceModal
            currImage={currImage}
            addOrgan={addOrgan}
          />: null}
        
          <form className="my-12 flex flex-col gap-8">
            <div className=" flex gap-8">
              <Upload
                handleImageUpload={handleImageUpload}
                
              />
            </div>
            <button
              type="button"
              className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-1/2 mx-auto"
            >
              IDENTIFY
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Identify;

//add addOrgan 
//deleteOrgan
//add a toast that appears and disappears after a bit if an image was added twice
//handleImageUpload then set modalOpen to true ✅

// File { name: "img1.png", lastModified: 1731976657100, webkitRelativePath: "", size: 1368911, type: "image/png" }