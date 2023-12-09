import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userName: "John Doe",
  selectedChatId: null,
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
          statement: "Ask it anything you want to ask",
        },
        {
          sender: "ME",
          statement: "how many days are there in february?",
        },
        {
          sender: "AI",
          statement:
            "February typically has 28 days, but in a leap year, it has 29 days. Leap years occur every four years to account for the extra roughly 0.25 days in the Earth's orbit around the sun. If a year is evenly divisible by 4, it is a leap year, unless it is also divisible by 100. However, if a year is divisible by 400, then it is still considered a leap year. For example, the year 2020 was a leap year, and the next leap year after that was 2024.",
        },
        // {
        //   sender: "ME",
        //   statement: "how many days are there in february?",
        // },
        // {
        //   sender: "AI",
        //   statement:
        //     "February typically has 28 days, but in a leap year, it has 29 days. Leap years occur every four years to account for the extra roughly 0.25 days in the Earth's orbit around the sun. If a year is evenly divisible by 4, it is a leap year, unless it is also divisible by 100. However, if a year is divisible by 400, then it is still considered a leap year. For example, the year 2020 was a leap year, and the next leap year after that was 2024.",
        // },
        // {
        //   sender: "ME",
        //   statement: "how many days are there in february?",
        // },
        // {
        //   sender: "AI",
        //   statement:
        //     "February typically has 28 days, but in a leap year, it has 29 days. Leap years occur every four years to account for the extra roughly 0.25 days in the Earth's orbit around the sun. If a year is evenly divisible by 4, it is a leap year, unless it is also divisible by 100. However, if a year is divisible by 400, then it is still considered a leap year. For example, the year 2020 was a leap year, and the next leap year after that was 2024.",
        // },
        // {
        //   sender: "ME",
        //   statement: "how many days are there in february?",
        // },
        // {
        //   sender: "AI",
        //   statement:
        //     "February typically has 28 days, but in a leap year, it has 29 days. Leap years occur every four years to account for the extra roughly 0.25 days in the Earth's orbit around the sun. If a year is evenly divisible by 4, it is a leap year, unless it is also divisible by 100. However, if a year is divisible by 400, then it is still considered a leap year. For example, the year 2020 was a leap year, and the next leap year after that was 2024.",
        // },
        // {
        //   sender: "ME",
        //   statement: "how many days are there in february?",
        // },
        // {
        //   sender: "AI",
        //   statement:
        //     "February typically has 28 days, but in a leap year, it has 29 days. Leap years occur every four years to account for the extra roughly 0.25 days in the Earth's orbit around the sun. If a year is evenly divisible by 4, it is a leap year, unless it is also divisible by 100. However, if a year is divisible by 400, then it is still considered a leap year. For example, the year 2020 was a leap year, and the next leap year after that was 2024.",
        // },
      ],
    },
    {
      id: "2",
      title: "How to run",
      fetching: false,
      conversation: [],
    },
    {
      id: "3",
      title: "Learn an new technology quickly with the help of AI",
      fetching: false,
      conversation: [],
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
  },
});

const KEY = import.meta.env.VITE_REACT_APP_AI_API_KEY;
const BASE_URL = "https://api-v2.longshot.ai";

export async function sendPrompt(prompt) {
  const res = await axios.post(
    `${BASE_URL}/custom/api/generate/instruct`,
    {
      text: prompt,
    },
    {
      headers: {
        Authorization: `Bearer ${KEY}`,
      },
    }
  );
  return res.data.copies[0].content;
}

export const {
  createNewChat,
  deleteChatById,
  selectChat,
  addPromptToChat,
  toggleFetchingStatusForChat,
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
