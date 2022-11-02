import { useCallback } from "react";

export default function CheckboxGroupField({name, label, options, setViolations, violations}) {
  const onInputChange = useCallback((checked, item) => {
    if (checked) {
      setViolations([...violations, item])
    } else {
      setViolations(violations.filter(violation => violation.text !== item.text))
    }
  }, [violations])
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/4">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      <div className="md:w-1/2 block text-gray-500 font-bold">
        {options.map((item, index) => (
          <div key={index}>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              name={name}
              value={item.value}
              onChange={(e) => onInputChange(e.target.checked, item)}
            />
            <span className="text-sm">{item.text}</span>
          </div>
        ))}
      </div>
      {/* <div className="md:w-1/2 p-1 pl-2 text-xs text-red-600 font-bold">
        {errorMessage}
      </div> */}
    </div>
  );
}
