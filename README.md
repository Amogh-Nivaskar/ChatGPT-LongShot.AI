# ChatGPT Frontend Clone for Longshot.AI internship assignment

Assignment task: https://longshot-ai.notion.site/Frontend-Assignment-5b2d64fbcc7d43129eec24417704d1c0

Live Link: https://chatgpt-longshot-ai.onrender.com/

Video Demo - 
https://www.loom.com/share/6c0dc367108c4e7ba77f25f21811cb36

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
* selectedChatId - this is the chat that is currently open. If no chat is open i.e. user is at home page, then its value is null
* toAnimate - used for animating the AI's response
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
1. We know the ID of the chat open through the browser's url parameter
  ```
  /:chatId
  ```
2. When user sends prompt, the prompt is first added to the conversation of its corresponding chat, as a dialog object with sender as 'ME' and statement as prompt
  ```
  { sender: "ME", statement: prompt }
  ```
3. That chat's fetching property is set to true
4. Fetch response to prompt from API
5. Once we get response from the API, we add this response as another dialog box to the corresponding chat
  ```
  { sender: "AI", statement: api_response }
  ```
6. Chats fetching property is set to false
7. This process repeats itself for each subsequent prompt

#### A prompt which will create a new chat:
1. Create a random unique ID using a library like 'uuid'
2. Push into the chatApp state's chats array a new chat object with the structure -
  ```
  { id, title:'', fetching:true, conversation: [ { sender: "ME", statement:prompt } ]
  ```
The title is an empty string since we will ask the API for an apt title describing the user's prompt.

  
3. Make API call to get a title for the prompt
4. Make API call for response to prompt
5. Update the recieved title in the chatApp state for that chat
6. Add the response to the prompt to the chatApp state as described in the previous case's step 5
7. Now that a new chat has been created, the rest of the process is the same as the previous case
    
     
