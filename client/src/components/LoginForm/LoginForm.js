import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import { Container, InputGroup, Form as BootstrapForm } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { loginAction } from "../../actions/Auth.action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const LoginForm = ({ isAuthenticated, loginAction }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    // TODO ::: login action
    let check = await loginAction(values);
    if (check === true) {
      toast.success("Login Successful");
      setSubmitting(false);
      navigate("/dashboard");
    }
    setSubmitting(false);
  };
  let initVals = {
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email!")
      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password is too short!"),
  });
  return (
    <Container className={styles.wrapper}>
      <div className="flex py-5">
        <span className="d-block fs-1 fw-light"> Login Now</span>
        <span className="d-block fs-4 pt-2 fw-light">
          {" "}
          Start using <span className="text_primary">NotBot</span> for free.
        </span>
      </div>
      <Formik
        initialValues={initVals}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched }) => (
          <Form>
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
            <span className="d-block text-end">
              Forgot your password?{" "}
              <Link to="/forget-password" className={styles.link__page}>
                Reset Password Now
              </Link>
            </span>

            <div className="pt-3 d-flex justify-content-between align-items-center">
              <button
                type="submit"
                className={"btn_primary"}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Login Now"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default connect(null, { loginAction })(LoginForm);
