import { BrowserRouter, Route, Routes } from "react-router-dom";

import Chat from "./pages/chat";
import Root from "./components/root";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path=":chatId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
