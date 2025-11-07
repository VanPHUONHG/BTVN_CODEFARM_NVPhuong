import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { apiCourse, updateCourses } from "../../Api/CoursesApi";
import { useEffect } from "react";

const EditPage = () => {
  const nav = useNavigate();
  const Schema = z.object({
    title: z
      .string()
      .min(6, { message: "Title tối thiểu 6 ký tự" })
      .nonempty({ message: "Title không được để trống" }),

    description: z
      .string()
      .nonempty({ message: "Description không được để trống" }),

    price: z.coerce.number().min(1, { message: "Price phải lớn hơn 0" }),
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
      const products = await updateCourses(id, data);
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
        const data = await apiCourse(id);
        reset(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCournt();
  }, [id, reset]);
  return (
    <div>
      <h1>EditPage</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            description
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="description"
            {...register("description", { required: true })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="price"
            {...register("price", { required: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPage;
