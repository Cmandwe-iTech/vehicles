import { Routes, Route } from "react-router-dom";
import Vehicle from "./components/vehicle";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Vehicle />} />
    </Routes>
  );
}

export default App;
