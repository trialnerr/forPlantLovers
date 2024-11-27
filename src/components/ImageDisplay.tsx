import { ImageDisplayProps } from "../types";

function ImageDisplay({imgUrl, organType}: ImageDisplayProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
       {imgUrl ? ( <img
          className="h-full w-full rounded-lg object-cover"
          src={imgUrl}
          alt={organType}
        /> ) : null}
      </div>
    </div>
  );
}

export default ImageDisplay
