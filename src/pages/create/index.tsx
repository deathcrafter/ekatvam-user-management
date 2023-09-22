import { createUser } from "@/store/usersSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { Button, Label, TextInput } from "flowbite-react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.object()
    .shape({
      street: Yup.string().required("Street is required"),
      suite: Yup.string().required("Suite is required"),
      city: Yup.string().required("City is required"),
      zipcode: Yup.string().required("Zipcode is required"),
      geo: Yup.object().shape({
        lat: Yup.string()
          .test(
            "isLat",
            (val, ctx) =>
              (Number(val) >= -90 && Number(val) <= 90) ||
              ctx.createError({ message: "Lat must be between -90 and 90" })
          )
          .required("Lat is required"),
        lng: Yup.string()
          .test(
            "isLng",
            (val, ctx) =>
              (Number(val) >= -180 && Number(val) <= 180) ||
              ctx.createError({ message: "Lng must be between -180 and 180" })
          )
          .required("Lng is required"),
      }),
    })
    .required("Address is required"),
  phone: Yup.string().required("Phone is required"),
  website: Yup.string().required("Website is required"),
  company: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    catchPhrase: Yup.string().required("Catch phrase is required"),
    bs: Yup.string().required("BS is required"),
  }),
});

export default function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <main className="p-3">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
        Create User
      </h1>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
              lat: "",
              lng: "",
            },
          },
          phone: "",
          website: "",
          company: {
            name: "",
            catchPhrase: "",
            bs: "",
          },
        }}
        onSubmit={async (values) => {
          await dispatch(createUser(values) as unknown as AnyAction);
          navigate("/dashboard");
        }}
        validationSchema={UserSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form
            className="flex flex-col gap-2 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="">
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-slate-900 dark:text-gray-200 -mb-1">
                Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="">
                  <Label htmlFor="street" value="Street" hidden />
                  <TextInput
                    id="street"
                    type="text"
                    name="address.street"
                    placeholder="Street"
                    value={values.address.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address?.street && touched.address?.street && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.address?.street}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label htmlFor="suite" value="Suite" hidden />
                  <TextInput
                    id="suite"
                    type="text"
                    name="address.suite"
                    placeholder="Suite"
                    value={values.address.suite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address?.suite && touched.address?.suite && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.address?.suite}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="">
                  <Label htmlFor="city" value="City" hidden />
                  <TextInput
                    id="city"
                    type="text"
                    name="address.city"
                    placeholder="City"
                    value={values.address.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address?.city && touched.address?.city && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.address?.city}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label htmlFor="zipcode" value="Zipcode" hidden />
                  <TextInput
                    id="zipcode"
                    type="text"
                    name="address.zipcode"
                    placeholder="Zipcode"
                    value={values.address.zipcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address?.zipcode && touched.address?.zipcode && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.address?.zipcode}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="">
                  <Label htmlFor="lat" value="Lat" hidden />
                  <TextInput
                    id="lat"
                    type="text"
                    name="address.geo.lat"
                    placeholder="Latitude"
                    value={values.address.geo.lat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address?.geo?.lat && touched.address?.geo?.lat && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.address?.geo?.lat}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label htmlFor="lng" value="Lng" hidden />
                  <TextInput
                    id="lng"
                    type="text"
                    name="address.geo.lng"
                    placeholder="Longitude"
                    value={values.address.geo.lng}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address?.geo?.lng && touched.address?.geo?.lng && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.address?.geo?.lng}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <Label htmlFor="phone" value="Phone" />
              <TextInput
                id="phone"
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="website" value="Website" />
              <TextInput
                id="website"
                type="text"
                name="website"
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.website && touched.website && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.website}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-slate-900 dark:text-gray-200 -mb-1">
                Company
              </h3>
              <div className="">
                <Label htmlFor="company-name" value="Company Name" hidden />
                <TextInput
                  id="company-name"
                  type="text"
                  name="company.name"
                  placeholder="Company Name"
                  value={values.company.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.company?.name && touched.company?.name && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.company?.name}
                  </p>
                )}
              </div>
              <div className="">
                <Label
                  htmlFor="company-catchPhrase"
                  value="Company Catch Phrase"
                  hidden
                />
                <TextInput
                  id="company-catchPhrase"
                  type="text"
                  name="company.catchPhrase"
                  placeholder="Company Catch Phrase"
                  value={values.company.catchPhrase}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.company?.catchPhrase &&
                  touched.company?.catchPhrase && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.company?.catchPhrase}
                    </p>
                  )}
              </div>
              <div className="">
                <Label htmlFor="company-bs" value="Company BS" hidden />
                <TextInput
                  id="company-bs"
                  type="text"
                  name="company.bs"
                  placeholder="Company BS"
                  value={values.company.bs}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.company?.bs && touched.company?.bs && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.company?.bs}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Button
                pill={true}
                type="submit"
                className="px-3 py-2 bg-slate-900 text-white rounded-md"
              >
                Create
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </main>
  );
}
