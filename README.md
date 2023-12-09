# ChatGPT Clone for Longshot.AI internship assignment

### Assignment task: https://longshot-ai.notion.site/Frontend-Assignment-5b2d64fbcc7d43129eec24417704d1c0

### Live Link: https://chatgpt-longshot-ai.onrender.com/

## Project Overview:
* User can prompt the chat bot and the chat bot responds
* The user can create multiple chat instances
* The user can delete chat instances
* The chat history is stored in a local cache, hence the chat data persists
* The Website is responsive for small devices (eg: mobile) and large devices (eg: PC)
* Supports light and dark mode

## Important Dependencies: 
* Redux / Redux toolkit - For Global state management
* React router dom - For client side routing
* Redux-persist - For storing the chat data in local storage, thereby implementing caching
* Axios - Used for making HTTP requests to external API

## Implementation of OpenAI Integration and Multiple Chat Instances: 

The OpenAI API is used for getting responses for prompts. To understand how the above mentioned concepts are implemented, its crucial to understand how the chat app state is managed using redux.

### ChatApp state:

The chat app state in redux has the following properties - 
* userName
* isSidebarOpen - used for giving responsiveness for small devices
* selectedChatId - this is the chat that is currently open. If no chat is open i.e. user is at home page then its value is null
* toAnimate - user for animating the AI's response
* chats - Array of chat objects

Each chat object has the following properties - 
* id
* title
* fetching - set to true when data is being fetched from API for this particular chat
* conversation: Array of dialog objects

Each dialog object has the following structure - 
* sender: it can have two values, either 'ME' or 'AI'
* statement: if sender is 'ME' it is the users prompt, if sender is 'AI', it is the AI's response

### Handling prompts:

A user can make two types of prompts - 
* A prompt which is already a part of an existing chat
* A prompt which will create a new chat

#### A prompt which is already a part of an existing chat:
* We know the ID of the chat open through the browser parameter
  ```
  /:chatId
  ```
* When user sends prompt, the prompt is first added to the conversation of its corresponding chat, as a dialog object with sender as 'ME' and statement as prompt
  ```
  { sender: "ME", statement: prompt }
  ```
* That chats fetching is set to true
* Once we get response from the API, we add this response as another dialog box
  ```
  { sender: "AI", statement: api_response }
  ```
* Chats fetching is set to false
* This process repeats itself for each subsequent prompt

#### A prompt which will create a new chat:
* Create a random unique ID using a library like 'uuid'
* Push into the chatApp state's chats array a new chat object with the structure -
  ```
  { id, title:prompt, fetching:true, conversation: [ { sender: "ME", statement:prompt } ]
  ```
* Now that a new chat has been created, the rest of the process is the same as above
    
     
