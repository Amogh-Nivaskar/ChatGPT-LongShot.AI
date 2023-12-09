import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToAnimate } from "../store/slices/chatapp";
// import './TypingAnimation.css'; // Import the CSS file for styling

const TypedText = ({ text, type }) => {
  const [typedText, setTypedText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setTypedText((prevText) => {
        if (index <= text.length) {
          index++;
          return text.slice(0, index);
        } else {
          clearInterval(intervalId);
          if (type == "chat") {
            dispatch(setToAnimate(null));
          }

          return prevText;
        }
      });
    }, 70);

    return () => clearInterval(intervalId);
  }, [text]);

  return <div className="typing-animation">{typedText}</div>;
};

export default TypedText;
