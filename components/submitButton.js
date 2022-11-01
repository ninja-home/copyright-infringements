export default function SubmitButton(props) {
  return (
    <div className="md:flex md:items-center">
      <div className="md:w-1/4"></div>
      <div className="md:w-1/2">
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {props.label}
        </button>
      </div>
    </div>
  );
}

SubmitButton.defaultProps = {
  label: "Submit",
};
