import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { AddCourses } from "../../Api/CoursesApi";

const AddPage = () => {
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
  } = useForm({ resolver: zodResolver(Schema) });

  const onSubmit = async (data) => {
    try {
      const products = await AddCourses(data);
      console.log(products);
      toast.success("Thêm mới  thành công!");
      nav(`/`);
    } catch (error) {
      console.log(error);
      toast.error("Thêm mới không thành công!");
    }
  };
  return (
    <div>
      <h1>AddPage</h1>
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

export default AddPage;
