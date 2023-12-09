import { useDispatch, useSelector } from "react-redux";
import {
  deleteChatById,
  getSelectedChatId,
  selectChat,
} from "../store/slices/chatapp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { XCircle } from "lucide-react";

function SidebarItem({ id, title }) {
  const dispatch = useDispatch();
  const selectedChatId = useSelector(getSelectedChatId);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  function deleteChat(id) {
    dispatch(deleteChatById(id));
    if (selectedChatId === id) {
      navigate("/");
    }
  }

  return (
    <div
      onClick={() => dispatch(selectChat(id))}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${
        selectedChatId === id && "bg-slate-800"
      }  flex justify-between p-2  rounded-lg hover:bg-slate-800 transition-all duration-200 ease-in-out`}
    >
      <Link
        to={`/${id}`}
        className={`text-white w-full flex justify-between items-center  whitespace-nowrap overflow-hidden overflow-ellipsis text-sm `}
      >
        <span className="text-slate-100 ">{title}</span>
      </Link>
      {hover && (
        <button onClick={() => deleteChat(id)}>
          <XCircle size={20} />
        </button>
      )}
    </div>
  );
}

export default SidebarItem;
