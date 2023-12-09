import { ArrowBigUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/theme";

function TextInput({
  placeholder,
  value,
  setValue,
  rows = "1",
  onSubmit,
  disabled,
}) {
  const textAreaRef = useRef(null);
  const { theme, Themes } = useTheme();

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

  if (theme === Themes.DARK) {
    return (
      <div
        className={`flex h-16 items-center justify-center my-8 w-full 2xl:w-[800px] p-4 dark:bg-slate-600 bg-slate-100  rounded-2xl  border border-1 border-slate-500 dark:text-white placeholder:text-slate-400  `}
      >
        <textarea
          className={`focus:outline-none w-full dark:bg-slate-600 bg-slate-100 `}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows={rows}
          ref={textAreaRef}
        />

        {!disabled && (
          <button
            className={`  transition-all duration-200 ease-in-out h-7 px-1 ml-2 rounded-lg ${
              value === ""
                ? "dark:bg-slate-700 bg-slate-200 cursor-default"
                : "dark:bg-slate-200 bg-black dark:hover:bg-slate-400"
            }`}
            disabled={disabled || value === ""}
            onClick={() => onSubmit(value)}
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

  if (theme === Themes.LIGHT) {
    return (
      <div
        className={`flex h-16 items-center justify-center my-8 w-full 2xl:w-[800px] p-4 dark:bg-slate-600 bg-slate-100  rounded-2xl  border border-1 border-slate-500 dark:text-white placeholder:text-slate-400  `}
      >
        <textarea
          className={`focus:outline-none w-full dark:bg-slate-600 bg-slate-100 `}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows={rows}
          ref={textAreaRef}
        />

        {!disabled && (
          <button
            className={`  transition-all duration-200 ease-in-out h-7 px-1 ml-2 rounded-lg ${
              value === ""
                ? "dark:bg-slate-700 bg-slate-200 cursor-default"
                : "dark:bg-slate-200 bg-black dark:hover:bg-slate-400"
            }`}
            disabled={disabled || value === ""}
            onClick={() => onSubmit(value)}
          >
            {value === "" ? (
              <ArrowBigUp color="rgb(148 163 184)" />
            ) : (
              <ArrowBigUp color="white" />
            )}
          </button>
        )}
      </div>
    );
  }
}

export default TextInput;
