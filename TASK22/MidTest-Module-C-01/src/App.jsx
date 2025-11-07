import { ToastContainer } from "react-toastify";
import AppRouter from "./Routers";
const App = () => {
  return (
    <>
      {/* <h1>Chúc các bạn làm bài tốt!</h1> */}
      <AppRouter />
      <ToastContainer />
    </>
  );
};

export default App;
