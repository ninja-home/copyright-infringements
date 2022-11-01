export default function SimpleForm({ onSubmit, ...props }) {
  return (
    <form className="w-full max-w-2xl" onSubmit={onSubmit}>
      {props.children}
    </form>
  );
}
