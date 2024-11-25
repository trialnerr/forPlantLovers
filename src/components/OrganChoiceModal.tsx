import { useRef } from "react";
import OrganListItem from "./OrganListItem";
import { OrganType, UploadProps } from "../types";

function OrganChoiceModal({ setModalOpen, modalOpen, currImage, setOrganId, setCurrImage}: UploadProps): React.JSX.Element {
  
  const organTypes: OrganType[] = ["fruit", "flower", "bark", "leaf"];
  const id = 
  const modalRef = useRef<HTMLDialogElement | null>(null);
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* background backdrop*/}
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div>
              <img src={currImage} alt="" />
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <ul>
                {organTypes.map((val) => (
                  <OrganListItem
                    setOrganId={setOrganId}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    currImage={currImage}
                    setCurrImage={setCurrImage}
                    organType = {val}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganChoiceModal;
