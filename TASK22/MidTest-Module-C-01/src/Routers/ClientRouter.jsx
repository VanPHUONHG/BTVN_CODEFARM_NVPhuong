import ClientLayout from "../Layout/ClientLayout";
import AddPage from "../Pages/Courser/AddPage";
import EditPage from "../Pages/Courser/EditPage";
import HomePage from "../Pages/Courser/HomePage";
import AddLesson from "../Pages/Lessons/AddLesson";
import EditLesson from "../Pages/Lessons/EditLesson";
import LessonPage from "../Pages/Lessons/LessonPage";
import PrivateRouter from "./Protected/PrivateRouter";

const ClientRouter = [
  {
    path: "/",
    element: (
      <PrivateRouter>
        <ClientLayout />
      </PrivateRouter>
    ),
    children: [
      { index: true, Component: HomePage },
      { path: "courses/add", Component: AddPage },
      { path: "courses/edit/:id", Component: EditPage },
      { path: "lessons/:courseId", Component: LessonPage },
      { path: "lessons/addlessons", Component: AddLesson },
      { path: "lessons/editlesson/:id", Component: EditLesson },
    ],
  },
];

export default ClientRouter;
