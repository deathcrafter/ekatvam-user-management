import { Formik } from "formik";
import { TextInput, Label, Button } from "flowbite-react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, signIn } from "@/store/adminSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const MySwal = withReactContent(Swal);

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);

  useEffect(() => {
    if (admin.token) {
      navigate("/dashboard");
    }
    if (admin.error) {
      MySwal.fire("Error", admin.error, "error");
      dispatch({ type: "admin/clearError" } as unknown as AnyAction);
    }
  }, [admin]);

  return (
    <section id="login" className="py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
        Login
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          dispatch(signIn(values) as unknown as AnyAction);
          return;
        }}
        validationSchema={LoginSchema}
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
                Login
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <p className="text-slate-400 text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link to="register" className="text-blue-400 hover:text-blue-500">
          Register
        </Link>
      </p>
    </section>
  );
}
