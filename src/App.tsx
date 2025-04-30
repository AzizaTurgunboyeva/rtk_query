import { Route, Routes } from "react-router";
import SignUpPage from "./pages/signUp";
import TaskPage from "./pages/taskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/taskPage" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
