import React, { useEffect, useState } from "react";
import styles from "./RegisterForm.module.css";
import { Container, InputGroup, Form as BootstrapForm } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { registerAction } from "../../actions/Auth.action";
import { connect } from "react-redux";

const RegisterForm = ({ isAuthenticated, registerAction }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    // TODO ::: register action
    let check = await registerAction(values);
    if (check === true) {
      toast.success("Register Successful. Please Login.");
      setSubmitting(false);
      navigate("/login");
    }
    setSubmitting(false);
  };
  let initVals = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email()
      .email("Enter a valid email!")
      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password is too short!"),
    password2: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  return (
    <Container className={styles.wrapper}>
      <div className="flex py-5">
        <span className="d-block fs-1 fw-light"> Register Now</span>
        <span className="d-block fs-4 pt-2 fw-light">
          {" "}
          Create a new account for free.
        </span>
      </div>
      <Formik
        initialValues={initVals}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched }) => (
          <Form className="pb-4">
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="name" className="d-block">
                  Full Name
                </label>
                {errors.name && touched.name ? (
                  <small className="text-danger pt-2">{errors.name}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type your name..."
                name="name"
                isValid={!errors.name && touched.name}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.name && touched.name}
              />
            </InputGroup>

            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="email" className="d-block">
                  Email
                </label>
                {errors.email && touched.email ? (
                  <small className="text-danger pt-2">{errors.email}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type your email..."
                name="email"
                isValid={!errors.email && touched.email}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.email && touched.email}
              />
            </InputGroup>

            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="password" className="d-block">
                  Password
                </label>
                {errors.password && touched.password ? (
                  <small className="text-danger">{errors.password}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Create your own password"
                name="password"
                isValid={!errors.password && touched.password}
                type={isPasswordVisible ? "text" : "password"}
                className={`${styles.input} w-100 icon-hidden`}
                isInvalid={errors.password && touched.password}
                style={{ position: "relative" }}
              />
              {!isPasswordVisible ? (
                <AiOutlineEye
                  className={styles.eyeIcon}
                  color="black"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={styles.eyeIcon}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="password2" className="d-block">
                  Retype Password
                </label>
                {errors.password2 && touched.password2 ? (
                  <small className="text-danger">{errors.password2}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Retype password"
                name="password2"
                isValid={!errors.password2 && touched.password2}
                type={isPasswordVisible2 ? "text" : "password"}
                className={`${styles.input} w-100 icon-hidden`}
                isInvalid={errors.password2 && touched.password2}
                style={{ position: "relative" }}
              />
              {!isPasswordVisible2 ? (
                <AiOutlineEye
                  className={styles.eyeIcon}
                  color="black"
                  onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={styles.eyeIcon}
                  onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                />
              )}
            </InputGroup>

            <div className="pt-3 d-flex justify-content-between align-items-center">
              <button
                type="submit"
                className={"btn_primary"}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Register Now"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default connect(null, { registerAction })(RegisterForm);
