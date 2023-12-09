import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import {
  addPromptToChat,
  createNewChat,
  getFetchingStatus,
  selectChat,
  sendPrompt,
  toggleFetchingStatusForChat,
} from "../store/slices/chatapp";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    dispatch(selectChat(null));
  }, []);

  async function onSubmit() {
    console.log("submitter prompt - " + value);
    const id = uuidv4();
    const prompt = value;
    setValue("");
    navigate(`/${id}`);
    dispatch(createNewChat({ id, prompt }));
    const response = await sendPrompt(prompt);
    dispatch(addPromptToChat({ id, sender: "AI", statement: response }));
    dispatch(toggleFetchingStatusForChat(id));
  }

  return (
    <div className=" ml-64 flex flex-col items-center justify-center">
      <div className=" w-3/5 fixed bottom-0 flex ">
        <TextInput
          placeholder={isFetching ? "Fetching Answer..." : "Message ChatGPT..."}
          value={value}
          setValue={setValue}
          onSubmit={onSubmit}
          disabled={isFetching}
        />
      </div>
    </div>
  );
}

export default Home;
