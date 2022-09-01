import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Room1 from "./pages/Room1";
import RoomA from "./pages/RoomA";
import RoomB from "./pages/RoomB";
import RoomC from "./pages/RoomC";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />}></Route>
      <Route path="/letMeChat/" element={<Home />}></Route>
      {/* General chat room */}
      <Route path="/letMeChat/room1" element={<Room1 />}></Route>
      {/* Rooms */}
      <Route path="/letMeChat/roomA" element={<RoomA />}></Route>
      <Route path="/letMeChat/roomB" element={<RoomB />}></Route>
      <Route path="/letMeChat/roomC" element={<RoomC />}></Route>
    </Routes>
  );
}

export default App;
