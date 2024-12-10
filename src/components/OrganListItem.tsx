import { OrganListItemProps } from "../types";
import imgObj from "../utils/imageObj";
function OrganListItem({
  addOrgan,
  organType,
  disabledOrganTypes
}: OrganListItemProps): React.JSX.Element {
  function handleOrganChoice() {
    addOrgan(organType);
  }
  const disabled = disabledOrganTypes.includes(organType);
  return (
    <li
      className={
        !disabled
          ? "text-gray-900 bg-white w-full text-left hover:bg-gray-100 flex items-center px-4 py-4 border-b cursor-pointer"
          : "text-gray-900 bg-grey w-full text-left flex items-center px-4 py-4 border-b cursor-not-allowed"
      }
    >
      <button
        className="hover:bg-gray-100 flex items-center space-x-4"
        onClick={!disabled ? handleOrganChoice : undefined}
        disabled={disabled}
      >
        <img
          src={imgObj[organType]}
          alt={organType}
          className="w-8 h-8 object-cover"
        />
        <span>
          {organType.replace(organType[0], organType[0].toUpperCase())}
        </span>
      </button>
    </li>
  );
}

export default OrganListItem;
