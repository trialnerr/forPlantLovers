import { OrganListItemProps } from "../types";
import fruitImg from "../client/assets/cherries.png";
import flowerImg from "../client/assets/cherry-blossom.png";
import barkImg from "../client/assets/bark.png";
import leafImg from "../client/assets/tea-leaves.png";

const imgObj = {
  fruit: fruitImg,
  flower: flowerImg,
  bark: barkImg,
  leaf: leafImg,
};

function OrganListItem({
  addOrgan,
  organType,
}: OrganListItemProps): React.JSX.Element {
  function handleOrganChoice() {
    addOrgan(organType);
  }
  return (
    <li className="text-gray-900 bg-white w-full text-left hover:bg-gray-100 flex items-center px-4 py-4 border-b">
      <button
        className="hover:bg-gray-100 flex items-center space-x-4"
        onClick={handleOrganChoice}
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
