export default function SelectField({ value, onChange, ...props }) {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/4">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor={props.name}
        >
          {props.label}
        </label>
      </div>
      <div className="md:w-1/2">
        <select
          id={props.name}
          name={props.name}
          value={value}
          onChange={onChange}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        >
          {props.options.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="md:w-1/2 p-1 pl-2 text-xs text-red-600 font-bold">
        {props.errorMessage}
      </div>
    </div>
  );
}
