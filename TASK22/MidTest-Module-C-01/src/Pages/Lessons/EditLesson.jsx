import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { apiLessons, updatelessons } from "../../Api/LessonsApi";

const EditLesson = () => {
  const nav = useNavigate();
  const Schema = z.object({
    title: z
      .string()
      .min(6, { message: "Title tối thiểu 6 ký tự" })
      .nonempty({ message: "Title không được để trống" }),

    content: z.string().nonempty({ message: "content không được để trống" }),

    courseId: z.coerce.number().min(1, { message: "courseId phải lớn hơn 0" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(Schema) });
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      const products = await updatelessons(id, data);
      console.log(products);
      toast.success("Sửa thành công!");
      nav(`/`);
    } catch (error) {
      console.log(error);
      toast.error("Sửa không thành công!");
    }
  };

  useEffect(() => {
    const fetchCournt = async () => {
      try {
        const data = await apiLessons(id);
        reset(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCournt();
  }, [id, reset]);
  return (
    <div>
      <h1>EditLesson</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            courseId
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="courseId"
            {...register("courseId", { required: true })}
          />
          {errors.courseId && <span>{errors.courseId.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            content
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="content"
            {...register("content", { required: true })}
          />
          {errors.content && <span>{errors.content.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditLesson;
