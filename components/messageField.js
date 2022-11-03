export default function MessageField({ message }) {
  const error = message.error ? true : false;
  if (error) {
    return (
      <div className="px-4 py-2 text-red-400 font-bold">
        There was an internal error. Please contact our support and then email{" "}
        <a href="mailto:help@siren.com" className="text-green-400">
          help@siren.com
        </a>
      </div>
    );
  } else {
    return (
      <div className="px-4 py-2 text-green-400 font-bold">{message.data}</div>
    );
  }
}
