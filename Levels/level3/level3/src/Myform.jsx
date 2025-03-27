import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email address").required("Email isRequired"),
  password: Yup.string().required("Password is Required"),
})

const Myform = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <label>Name:</label>
          <Field type="text"  id="name" name="name" /><br />
          <ErrorMessage name="name" component="div"  className="err"/><br />

          <label>Email:</label>
          <Field type="email" name="email"  id="email"/><br/>
          <ErrorMessage name="email" component="div" className="err"/><br />

          <label>Password:</label>
          <Field type="password" name="password" id="password" /><br />
          <ErrorMessage name="password" component="div" className="err"/><br />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Myform;
