import OrganListItem from "./OrganListItem";
import { ModalProps, OrganType } from "../types";

function OrganChoiceModal({
  currImage,
  addOrgan,
}: ModalProps): React.JSX.Element {
  const organTypes: OrganType[] = ["fruit", "flower", "bark", "leaf"];
  const imgUrl = URL.createObjectURL(currImage);
  return (
    <section
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
      {/* modal  */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:max-w-lg w-full">
          <h1 className="text-lg text-center p-4 border-b">Choose Organ</h1>
          <div className="flex">
            <div className="w-1/2">
              <img className="w-full h-full object-cover" src={imgUrl} alt="" />
            </div>
            <div className="w-1/2 bg-gray-100">
              <ul className="">
                {organTypes.map((val, index) => (
                  <OrganListItem
                    key={index}
                    addOrgan={addOrgan}
                    organType={val}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrganChoiceModal;
