function Card({ command, activity, onSubmit }) {
  const value = command + " " + activity;

  return (
    <button
      onClick={() => onSubmit(value)}
      className="w-full flex flex-col gap-1 dark:text-white border dark:border-white border-slate-600 py-2 px-2.5 rounded-lg cursor-pointer dark:hover:bg-slate-500 hover:bg-slate-200 transition-all duration-200 ease-in-out"
    >
      <span className="  text-sm">{command}</span>
      <p className="dark:text-slate-300 text-slate-500 text-sm font-light">
        {activity}
      </p>
    </button>
  );
}

export default Card;
