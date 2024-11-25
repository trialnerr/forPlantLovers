import { ChangeEvent } from "react";
import { UploadProps } from "../types";

function Upload({ setCurrImage, setModalOpen }: UploadProps): React.JSX.Element {

  function uploadImageHandler(e: ChangeEvent<HTMLInputElement>) {
    console.log("file added");
    if (!e.target.files) return;
    const file = e.target.files[0];
    setCurrImage(URL.createObjectURL(file));
    setModalOpen(true); 
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, MAX:50MB
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={uploadImageHandler}
        />

      </label>
      <label
        htmlFor="organSelect"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
    </div>
  );
}

export default Upload;

//Form
//drop zone  & select
//add organ
//? Identify

// STEPS
// 1. Create an array of organs (data object) to be submitted during post
// 2. Write a post to the server using useEffect()
// 3. Posting data to our external api properly
// 4. Confirm that we get a response of 200 from the external API
// 5. Disable the identify button until they have at least one picture