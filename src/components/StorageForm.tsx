import calendar from "../client/assets/calendar-svgrepo-com.svg";
import location from "../client/assets/location-pin-alt-1-svgrepo-com.svg";
import speciesIcon from "../client/assets/origin-svgrepo-com.svg";
import InputWithIcon from "./InputWithIcon";

function StorageForm() {
  const inputInfo = [
    {
      icon: calendar,
      label: "Observation date",
      type: "date",
    },
    {
      icon: location,
      label: "Where did you see the plant?",
      type: "text",
    },
    {
      icon: speciesIcon,
      label: 'species',
      type: "text",
    },
  ];

  return <form action="">
    {inputInfo.map((infoObj, i)=> {
      return <InputWithIcon icon={infoObj.icon} label={infoObj.label} type={infoObj.type } key={`input${i}`} />
       })}
  </form>;
}

export default StorageForm;
