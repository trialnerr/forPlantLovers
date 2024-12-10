import { MouseEvent } from "react";
import { ImageDisplayProps } from "../types";
import imgObj from "../utils/imageObj";

function ImageDisplay({ imgUrl, organType, handleOrganDelete, index }: ImageDisplayProps) {
  function handleDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    handleOrganDelete(index);
  }
  return (
    <div className="flex items-center justify-center w-full relative">
      <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        {imgUrl ? (
          <img
            className="h-full w-full rounded-lg object-cover"
            src={imgUrl}
            alt={organType}
          />
        ) : null}
      </div>
     

      {organType && (
        <>
          <button
            onClick={handleDelete}
            className="absolute right-0 top-0">
            <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800">
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </span>
            <span className="sr-only">Delete choice</span>
          </button>
          <button className="absolute left-0 bottom-0 rounded-full size-12 bg-green shrink-0">
            <img
              className="p-2"
              src={imgObj[organType]}
              alt={`${organType} icon`}
            />{" "}
          </button>
        </>
      )}
    </div>
  );
}

export default ImageDisplay
