import { Organ } from "../types";

function OrganListItem(value: Organ, handleOrganChoice: () => void ) {
  return (
    <li className="text-gray-900 bg-white border border-gray-200 w-full">
      <button className="hover:bg-gray-100" onClick={handleOrganChoice}>
        <img src="" alt="" />
        {value}
      </button>
    </li>
  );
}

export default OrganListItem;
