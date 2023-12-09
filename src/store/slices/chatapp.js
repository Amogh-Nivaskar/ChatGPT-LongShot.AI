import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userName: "Puss In Boots",
  isSidebarOpen: false,
  selectedChatId: null,
  toAnimate: null,
  chats: [
    {
      id: "1",
      title: "How to use this app ?",
      fetching: false,
      conversation: [
        {
          sender: "ME",
          statement: "How to use this app ?",
        },
        {
          sender: "AI",
          statement:
            "Ask it anything you want to ask, but make sure you have enough credits first !!",
        },
      ],
    },
  ],
};

const chatAppSlice = createSlice({
  name: "chatApp",
  initialState,
  reducers: {
    createNewChat(state, action) {
      const { id, prompt } = action.payload;
      state.chats.push({
        id,
        title: prompt,
        fetching: true,
        conversation: [
          {
            sender: "ME",
            statement: prompt,
          },
        ],
      });
    },
    deleteChatById(state, action) {
      const chatId = action.payload;
      state.chats = state.chats.filter((chat, idx) => {
        return chat.id !== chatId;
      });

      if (state.selectedChatId === chatId) {
        state.selectedChatId = null;
      }
    },
    selectChat(state, action) {
      const chatId = action.payload;
      state.selectedChatId = chatId;
    },
    addPromptToChat(state, action) {
      const { id, sender, statement } = action.payload;
      state.chats = state.chats.map((chat, idx) => {
        if (chat.id === id) {
          chat.conversation.push({ sender, statement });
        }
        return chat;
      });
    },
    toggleFetchingStatusForChat(state, action) {
      const chatId = action.payload;
      state.chats = state.chats.map((chat, idx) => {
        if (chatId === chat.id) {
          return { ...chat, fetching: !chat.fetching };
        }
        return chat;
      });
    },
    setToAnimate(state, action) {
      const chatId = action.payload;
      state.toAnimate = chatId;
    },
    toggleSidebar(state, action) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

const KEY = import.meta.env.VITE_REACT_APP_AI_API_KEY;
const BASE_URL = "https://api-v2.longshot.ai";

export async function sendPrompt(prompt) {
  const res = await axios
    .post(
      `${BASE_URL}/custom/api/generate/instruct`,
      {
        text: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${KEY}`,
        },
      }
    )
    .catch((error) => error.response);
  console.log(res);
  if (res.status === 200 || res.status === 201) {
    return res.data.copies[0].content;
  } else {
    return res.data.message;
  }
}

export const {
  createNewChat,
  deleteChatById,
  selectChat,
  addPromptToChat,
  toggleFetchingStatusForChat,
  setToAnimate,
  toggleSidebar,
} = chatAppSlice.actions;

export default chatAppSlice.reducer;

export const getChatsTitles = (state) => {
  const titles = state.chatApp.chats.map((chat) => {
    const { id, title } = chat;
    return { id, title };
  });
  return titles;
};

export const getSelectedChatId = (state) => state.chatApp.selectedChatId;

export const getChatById = (chatId) => (state) =>
  state.chatApp.chats.find((chat, idx) => chat.id === chatId);

export const getFetchingStatus = (chatId) => (state) =>
  state.chatApp.chats.find((chat, idx) => chat.id === chatId)?.fetching;

export const getUsername = (state) => state.chatApp.userName;

export const getToAnimate = (state) => state.chatApp.toAnimate;

export const getSidebarStatus = (state) => state.chatApp.isSidebarOpen;
