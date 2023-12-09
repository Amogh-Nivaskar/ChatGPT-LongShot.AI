import { ArrowBigUp } from "lucide-react";
import { useEffect, useRef } from "react";

function TextInput({
  placeholder,
  value,
  setValue,
  rows = "1",
  onSubmit,
  disabled,
}) {
  const textAreaRef = useRef(null);

  function handleChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div
      className={`flex h-16 items-center justify-center my-8 w-full 2xl:w-[800px] p-4 bg-slate-600  rounded-2xl  border border-1 border-slate-500 text-white placeholder:text-slate-400  `}
    >
      <textarea
        className={`focus:outline-none w-full bg-slate-600`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={rows}
        ref={textAreaRef}
      />
      {!disabled && (
        <button
          className={` hover:bg-slate-400 transition-all duration-200 ease-in-out h-7 px-1 ml-2 rounded-lg ${
            value === "" ? "bg-slate-700" : "bg-slate-200"
          }`}
          onClick={onSubmit}
        >
          {value === "" ? (
            <ArrowBigUp color="rgb(148 163 184)" />
          ) : (
            <ArrowBigUp color="rgb(71 85 105)" />
          )}
        </button>
      )}
    </div>
  );
}

export default TextInput;
