import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { setHeaderToken } from "./api/axiosInstance";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }
    setHeaderToken(userInfo);
  });
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
