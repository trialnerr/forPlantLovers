import { useRef } from "react";

const ImageModal: React.FC = () => {
   const modalRef = useRef<HTMLDialogElement | null>(null)
  return (
    <dialog ref={modalRef} className="modal">
      {/* {children} */}
    </dialog>
  );
}

export default ImageModal; 