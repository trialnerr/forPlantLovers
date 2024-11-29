function InputWithIcon({ icon, label, type }) {
  console.log(label, type)
  return (
    <div className="flex align-center">
      <label
        htmlFor={`input${label}`}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
          <img className="w-4 h-4" src={icon} alt="" />
        </span>
        <input
          type={type}
          id={`input${label}`}
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2. dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Bonnie Green"
          name={label}
        ></input>
      </div>
    </div>
  );
}

export default InputWithIcon;
