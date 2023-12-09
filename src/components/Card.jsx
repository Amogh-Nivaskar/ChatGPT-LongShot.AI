function Card({ command, activity, onSubmit }) {
  const value = command + " " + activity;

  return (
    <button
      onClick={() => onSubmit(value)}
      className="w-full flex flex-col gap-1 text-white border border-white py-2 px-2.5 rounded-lg cursor-pointer hover:bg-slate-500 transition-all duration-200 ease-in-out"
    >
      <span className="font-semibold">{command}</span>
      <p className="text-slate-300">{activity}</p>
    </button>
  );
}

export default Card;
