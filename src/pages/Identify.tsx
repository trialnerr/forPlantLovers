import { useState } from "react";
import Upload from "../components/Upload";
import {
  Organ,
  OrganType,
  PlantIdResults,
  ApiImagesAndResultsResponse,
  Species,
  ApiImageResponse,
} from "../types";
import OrganChoiceModal from "../components/OrganChoiceModal";
import ImageDisplay from "../components/ImageDisplay";
import ResultCard from "../components/ResultCard";
import PlantSelectForm from "../components/PlantSelectForm";
import Toast from "../components/Toast";

function Identify() {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [currImage, setCurrImage] = useState<File | null>(null);
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [identification, setIdentification] = useState<PlantIdResults | null>(
    null,
  );
  const [identifiedPlant, setIdentifiedPlant] = useState<Species | null>(null);
  const [cloudinaryImages, setCloudinaryImages] = useState<ApiImageResponse | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  function closeMsg() {
    setErrorMsg(undefined); 
  }

  if (done) {
    setOrgans([]);
    setCurrImage(null);
    setModalOpen(false);
    setIdentification(null);
    setIdentifiedPlant(null);
    setCloudinaryImages(null);
    setDone(false);
  }

  function handleOrganDelete(index: number) {
    const newOrgans = organs.filter((_organ, i) => i !== index);
    setOrgans(newOrgans);
  }

  const imageDisplayComponents: JSX.Element[] = [];
  for (let index = 0; index < 4; index++) {
    const imgUrl: string | undefined = organs[index]
      ? URL.createObjectURL(organs[index].image)
      : undefined;
    imageDisplayComponents.push(
      <ImageDisplay
        organType={organs[index]?.organType}
        imgUrl={imgUrl}
        key={`imageDisplay${index}`}
        index={index}
        handleOrganDelete={handleOrganDelete}
      />,
    );
  }

  function addOrgan(organType: OrganType) {
    if (!currImage) {
      console.error("No image selected");
      return;
    }
    setOrgans((prev) => [...prev, { image: currImage, organType }]);
    setModalOpen(false);
  }

  function handleImageUpload(file: File) {
    if (
      !organs.find(
        (organ) =>
          organ.image.name === file.name && organ.image.size === file.size,
      )
    ) {
      setCurrImage(file);
    } else {
      console.log("Image already exists", file); 
      setErrorMsg('The same image cannot be added twice')
      setCurrImage(null);
    }
    setModalOpen(true);
  }

  async function handleIdentify(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    try {
      const formData: FormData = new FormData();
      const files: File[] = organs.map((organ) => organ.image);
      files.forEach((file) => {
        formData.append("image", file);
      });
      formData.append(
        "organTypes",
        organs.map((organ) => organ.organType).join(","),
      );
      const response: Response = await fetch("api/images", {
        method: "POST",
        body: formData,
      });
      const result: ApiImagesAndResultsResponse = await response.json();
      setIdentification(result.data.results);
      setCloudinaryImages(result.images); 
    } catch (error) {
      setErrorMsg('Error identifying image');
      console.error("Error identifying image"); 
    }
  }

  function handleAddSpecies(selectedId: number) {
    if (identification) {
      setIdentifiedPlant(identification[selectedId].species);
    }
  }

  function handleSetDone() {
    setDone(true);
  }

  

  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 min-h-[calc(100vh-2rem)] content-center my-16 bg-grey">
      <div className="mx-auto max-w-6xl">
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
          {openModal && currImage ? (
            <OrganChoiceModal currImage={currImage} addOrgan={addOrgan} />
          ) : null}

          <form className="my-12 flex flex-col gap-8">
            <div className="flex justify-center">
              <Upload handleImageUpload={handleImageUpload} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {imageDisplayComponents}
            </div>
            {organs.length !== 0 ? (
              <button
                type="button"
                onClick={handleIdentify}
                className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 w-1/2 mx-auto"
              >
                IDENTIFY
              </button>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled
              >
                Disabled button
              </button>
            )}
          </form>
          
          {errorMsg && <div className='absolute bottom-5 right-5 w-1/5'>
            <Toast errMsg={errorMsg} closeMsg={closeMsg} />
          </div>}

          {!done && (
            <section className="w-full">
              {identification
                ? identification.map((el, i) => {
                    return (
                      <ResultCard
                        result={el}
                        key={`resultCard${i}`}
                        id={i}
                        handleAddSpecies={handleAddSpecies}
                      />
                    );
                  })
                : null}
            </section>
          )}
          {!done && identification && (
            <PlantSelectForm
              identifiedPlant={identifiedPlant}
              apiImages={cloudinaryImages}
              handleSetDone={handleSetDone}
            />
          )}
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

//when the user clicks the identify button
//I want to save the pictures in a DB
//make a request to the api to do the identification
//display the name of the plant just to start
