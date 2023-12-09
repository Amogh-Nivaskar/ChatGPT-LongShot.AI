import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import {
  addPromptToChat,
  createNewChat,
  selectChat,
  sendPrompt,
  setToAnimate,
  toggleFetchingStatusForChat,
} from "../store/slices/chatapp";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    dispatch(selectChat(null));
  }, []);

  async function onSubmit(value) {
    const id = uuidv4();
    const prompt = value;
    setValue("");
    navigate(`/${id}`);
    dispatch(createNewChat({ id, prompt }));
    const response = await sendPrompt(prompt);
    dispatch(addPromptToChat({ id, sender: "AI", statement: response }));
    dispatch(toggleFetchingStatusForChat(id));
    dispatch(setToAnimate(id));
  }

  return (
    <div className="  sm:ml-64 flex flex-col items-center justify-evenly h-full  gap-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="bg-slate-100 border border-slate-400 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="55"
            height="55"
            viewBox="0 0 30 30"
          >
            <path d="M 14.070312 2 C 11.330615 2 8.9844456 3.7162572 8.0390625 6.1269531 C 6.061324 6.3911222 4.2941948 7.5446684 3.2773438 9.3066406 C 1.9078196 11.678948 2.2198602 14.567816 3.8339844 16.591797 C 3.0745422 18.436097 3.1891418 20.543674 4.2050781 22.304688 C 5.5751778 24.677992 8.2359331 25.852135 10.796875 25.464844 C 12.014412 27.045167 13.895916 28 15.929688 28 C 18.669385 28 21.015554 26.283743 21.960938 23.873047 C 23.938676 23.608878 25.705805 22.455332 26.722656 20.693359 C 28.09218 18.321052 27.78014 15.432184 26.166016 13.408203 C 26.925458 11.563903 26.810858 9.4563257 25.794922 7.6953125 C 24.424822 5.3220082 21.764067 4.1478652 19.203125 4.5351562 C 17.985588 2.9548328 16.104084 2 14.070312 2 z M 14.070312 4 C 15.226446 4 16.310639 4.4546405 17.130859 5.2265625 C 17.068225 5.2600447 17.003357 5.2865019 16.941406 5.3222656 L 12.501953 7.8867188 C 12.039953 8.1527187 11.753953 8.6456875 11.751953 9.1796875 L 11.724609 15.146484 L 9.5898438 13.900391 L 9.5898438 8.4804688 C 9.5898438 6.0104687 11.600312 4 14.070312 4 z M 20.492188 6.4667969 C 21.927441 6.5689063 23.290625 7.3584375 24.0625 8.6953125 C 24.640485 9.696213 24.789458 10.862812 24.53125 11.958984 C 24.470201 11.920997 24.414287 11.878008 24.351562 11.841797 L 19.910156 9.2773438 C 19.448156 9.0113437 18.879016 9.0103906 18.416016 9.2753906 L 13.236328 12.236328 L 13.248047 9.765625 L 17.941406 7.0546875 C 18.743531 6.5915625 19.631035 6.4055313 20.492188 6.4667969 z M 7.5996094 8.2675781 C 7.5972783 8.3387539 7.5898438 8.4087418 7.5898438 8.4804688 L 7.5898438 13.607422 C 7.5898438 14.141422 7.8729844 14.635297 8.3339844 14.904297 L 13.488281 17.910156 L 11.34375 19.134766 L 6.6484375 16.425781 C 4.5094375 15.190781 3.7747656 12.443687 5.0097656 10.304688 C 5.5874162 9.3043657 6.522013 8.5923015 7.5996094 8.2675781 z M 18.65625 10.865234 L 23.351562 13.574219 C 25.490562 14.809219 26.225234 17.556313 24.990234 19.695312 C 24.412584 20.695634 23.477987 21.407698 22.400391 21.732422 C 22.402722 21.661246 22.410156 21.591258 22.410156 21.519531 L 22.410156 16.392578 C 22.410156 15.858578 22.127016 15.364703 21.666016 15.095703 L 16.511719 12.089844 L 18.65625 10.865234 z M 15.009766 12.947266 L 16.78125 13.980469 L 16.771484 16.035156 L 14.990234 17.052734 L 13.21875 16.017578 L 13.228516 13.964844 L 15.009766 12.947266 z M 18.275391 14.853516 L 20.410156 16.099609 L 20.410156 21.519531 C 20.410156 23.989531 18.399687 26 15.929688 26 C 14.773554 26 13.689361 25.54536 12.869141 24.773438 C 12.931775 24.739955 12.996643 24.713498 13.058594 24.677734 L 17.498047 22.113281 C 17.960047 21.847281 18.246047 21.354312 18.248047 20.820312 L 18.275391 14.853516 z M 16.763672 17.763672 L 16.751953 20.234375 L 12.058594 22.945312 C 9.9195938 24.180312 7.1725 23.443687 5.9375 21.304688 C 5.3595152 20.303787 5.2105423 19.137188 5.46875 18.041016 C 5.5297994 18.079003 5.5857129 18.121992 5.6484375 18.158203 L 10.089844 20.722656 C 10.551844 20.988656 11.120984 20.989609 11.583984 20.724609 L 16.763672 17.763672 z"></path>
          </svg>
        </span>

        <p className="dark:text-white text-black text-2xl font-semibold ">
          How can I help you today?
        </p>
      </div>

      <div className="hidden sm:flex flex-col gap-2 w-3/4 2xl:w-1/2">
        <div className="flex gap-2">
          <Card
            command={"Help me"}
            activity={"pick a gift for my mother who likes to cook"}
            onSubmit={onSubmit}
          />
          <Card
            command={"Tell me a fun fact"}
            activity={"about the Roman Empire"}
            onSubmit={onSubmit}
          />
        </div>
        <div className="flex gap-2">
          <Card
            command={"Design a database schema"}
            activity={"for an online merch store"}
            onSubmit={onSubmit}
          />
          <Card
            command={"Recommend activities"}
            activity={"for a team-building day with remote employees"}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      <div className=" w-full sm:w-3/5 fixed bottom-0 flex items-center justify-center">
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
