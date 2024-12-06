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

function Identify() {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [currImage, setCurrImage] = useState<File | null>(null);
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [identification, setIdentification] = useState<PlantIdResults | null>(
    null,
  );
  const [identifiedPlant, setIdentifiedPlant] = useState<Species | null>(null);
  const [cloudinaryImages, setCloudinaryImages] = useState<ApiImageResponse | null>(null);
  const imageDisplayComponents: JSX.Element[] = [];
  const [done, setDone] = useState<boolean>(false);

  if (done) {
    setOrgans([]);
    setCurrImage(null);
    setModalOpen(false);
    setIdentification(null);
    setIdentifiedPlant(null);
    setCloudinaryImages(null);
    setDone(false);
  }

  for (let i = 0; i < 4; i++) {
    const imgUrl: string | undefined = organs[i]
      ? URL.createObjectURL(organs[i].image)
      : undefined;
    imageDisplayComponents.push(
      <ImageDisplay
        organType={organs[i]?.organType}
        imgUrl={imgUrl}
        key={`imageDisplay${i}`}
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
      console.log("Image already exists", file); //give a warning to the user? 
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
      // formData.append("organs", organs)
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
    <main className="relative isolate px-6 pt-6 lg:px-8 min-h-[calc(100vh-2rem)] content-center my-16">
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
            <button
              type="button"
              onClick={handleIdentify}
              className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 w-1/2 mx-auto"
            >
              IDENTIFY
            </button>
          </form>
          {!done &&
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
            </section>}
          {!done && identification && (
            <PlantSelectForm identifiedPlant={identifiedPlant} apiImages={cloudinaryImages} handleSetDone={handleSetDone} />
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
