import wateringImage from "../client/assets/wateringImage.jpg";
import sunImage from "../client/assets/sunImage.jpg";
import pruningImage from "../client/assets/pruningImage.jpg";
import { PlantCareResponse } from "../types";

function PlantCareChat({ plantCare }: PlantCareResponse) {
  const imgObj = {
    watering: wateringImage, 
    sunlight: sunImage, 
    pruning: pruningImage,
  }
  return (
    <section className="border rounded-xl shadow-sm p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Care Tips
      </h1>
      {!plantCare && <h2>Unfortunately we do not currently have plant care details for this plant. </h2>}
      <ul className="space-y-5">
        {plantCare[0] && (
          <li className="flex gap-x-2 sm:gap-x-4 me-11">
            <img
              className="inline-block size-12 shrink-0 rounded-full"
              src={imgObj[plantCare[0].type]}
              alt="Avatar"
            ></img>

            {/* <!-- Card --> */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
              <h2 className="font-medium text-gray-800 ">
                {plantCare[0].type}
              </h2>
              <div className="space-y-1.5">
                <p className="mb-1.5 text-sm text-gray-800 ">
                  {plantCare[0].description}
                </p>
              </div>
            </div>
            {/* -- End Card -- */}
          </li>
        )}
        {plantCare[1] && (
          <li className="flex ms-auto gap-x-2 sm:gap-x-4">
            <div className="grow text-end space-y-3">
              <div className="inline-block bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <h2 className="font-medium text-gray-800 ">
                  {plantCare[1].type}
                </h2>
                <div className="space-y-1.5">
                  <p className="mt-1.5 text-sm text-gray-800 ">
                    {plantCare[1].description}
                  </p>
                </div>
              </div>
            </div>
            <img
              className="inline-block size-12 shrink-0 rounded-full"
              src={imgObj[plantCare[1].type]}
              alt="Avatar"
            ></img>
            {/* </span> */}
          </li>
        )}
        {plantCare[2] && (
          <li className="flex gap-x-2 sm:gap-x-4 me-11">
            <img
              className="inline-block size-12 shrink-0 rounded-full"
              src={imgObj[plantCare[2].type]}
              alt="Avatar"
            ></img>

            {/* <!-- Card --> */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
              <h2 className="font-medium text-gray-800 ">
                {plantCare[2].type}
              </h2>
              <div className="space-y-1.5">
                <p className="mt-1.5 text-sm text-gray-800 ">
                  {plantCare[2].description}
                </p>
              </div>
            </div>
          </li>
        )}
      </ul>
    </section>
  );
}

export default PlantCareChat;
