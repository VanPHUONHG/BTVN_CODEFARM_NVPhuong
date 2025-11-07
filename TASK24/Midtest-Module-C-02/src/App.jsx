import { ToastContainer } from "react-toastify";
import AppRouter from "./routes";

const App = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
};

export default App;
