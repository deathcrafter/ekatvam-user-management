import { Formik } from "formik";
import { TextInput, Label, Button } from "flowbite-react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { register } from "@/store/adminSlice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const MySwal = withReactContent(Swal);

export default function Register() {
  return (
    <section id="login" className="py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
        Register
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const { error } = (await register(values)) as { error?: string };
          if (error) {
            MySwal.fire("Error", error, "error");
          } else {
            MySwal.fire(
              "Success",
              "You have successfully registered. Go back to login page to access the dashboard.",
              "success"
            );
          }
        }}
        validationSchema={RegisterSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
        }) => (
          <form
            className="flex flex-col gap-2 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="">
              <Label htmlFor="login-email" value="Email" />
              <TextInput
                id="login-email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="login-password" value="Password" />
              <TextInput
                id="login-password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex justify-center mt-5">
              <Button
                type="submit"
                className="px-3"
                pill
                disabled={isSubmitting}
                isProcessing={isSubmitting}
              >
                Register
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <p className="text-slate-400 text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/" className="text-blue-400 hover:text-blue-500">
          Login
        </Link>
      </p>
    </section>
  );
}
