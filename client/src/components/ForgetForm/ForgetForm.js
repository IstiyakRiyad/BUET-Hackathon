import React, { useEffect, useState } from "react";
import styles from "./ForgetForm.module.css";
import { Container, InputGroup, Form as BootstrapForm } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { resetPasswordSendEmail } from "../../actions/Auth.action";
import { connect } from "react-redux";

const ForgetForm = ({ isAuthenticated, resetPasswordSendEmail }) => {
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
    let check = await resetPasswordSendEmail(values);
    if (check === true) {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  let initVals = {
    email: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email!")
      .required("Email is required!"),
  });
  return (
    <Container className={styles.wrapper}>
      <div className="flex py-5">
        <span className="d-block fs-1 fw-light"> Get Password Reset Link</span>
        <span className="d-block fs-4 pt-2 fw-light">
          You will recive a password reset link through your email.
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

            <div className="pt-3 d-flex justify-content-between align-items-center">
              <button
                type="submit"
                className={"btn_primary"}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default connect(null, { resetPasswordSendEmail })(ForgetForm);
