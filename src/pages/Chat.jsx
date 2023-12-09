import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addPromptToChat,
  getChatById,
  getFetchingStatus,
  selectChat,
  sendPrompt,
  toggleFetchingStatusForChat,
} from "../store/slices/chatapp";

function Chat() {
  const [value, setValue] = useState("");
  const { chatId } = useParams();
  const chat = useSelector(getChatById(chatId));
  const isFetching = useSelector(getFetchingStatus(chatId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectChat(chatId));
  }, []);

  async function onSubmit() {
    dispatch(addPromptToChat({ id: chatId, sender: "ME", statement: value }));
    const prompt = value;
    setValue("");
    dispatch(toggleFetchingStatusForChat(chatId));
    const response = await sendPrompt(prompt);
    dispatch(
      addPromptToChat({ id: chatId, sender: "AI", statement: response })
    );
    dispatch(toggleFetchingStatusForChat(chatId));
  }

  return (
    <div className="ml-64  flex flex-col items-center justify-center">
      <div className="fixed top-4 left-72">
        <span className="text-white font-bold text-lg">ChatGPT</span>
      </div>

      <div className="w-3/5 lg:w-[700px] h-screen py-16 text-white">
        {chat.conversation.map(({ sender, statement }, idx) => {
          return (
            <div key={idx} className="flex flex-col my-6">
              <span className=" font-bold">
                {sender === "ME" ? "You" : "ChatGPT"}
              </span>
              <p>{statement}</p>
            </div>
          );
        })}

        {isFetching && (
          <div className="flex flex-col my-6">
            <span className=" font-bold">ChatGPT</span>
            <p>Fetching Response...</p>
          </div>
        )}
      </div>

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

export default Chat;
