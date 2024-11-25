import { OrganListItemProps } from "../types";

function OrganListItem({
  addOrgan, organType
}: OrganListItemProps): React.JSX.Element {

  function handleOrganChoice() {
    addOrgan(organType); 
  }
  return (
    <li className="text-gray-900 bg-white border border-gray-200 w-full">
      <button className="hover:bg-gray-100" onClick={handleOrganChoice}>
        <img src="" alt="" />
        {organType}
      </button>
    </li>
  );
}

export default OrganListItem;
