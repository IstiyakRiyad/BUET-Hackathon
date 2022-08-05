import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import logo from "../../assets/ai_colored.png";
import { connect } from "react-redux";
import { logoutAction } from "../../actions/Auth.action";

const Navbar = ({ auth, logoutAction }) => {
  return (
    <div>
      <BootstrapNavbar
        collapseOnSelect
        expand="lg"
        bg="transparent"
        variant="light"
        className={styles.navbar}
      >
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/">
            <img src={logo} className={styles.logo} alt="" />{" "}
            <span className="my-auto">NotBot</span>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
          <BootstrapNavbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {auth === true ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <span
                    className={`nav-link ${styles.link}`}
                    onClick={() => logoutAction()}
                  >
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <Nav.Link eventKey={2} as={Link} to="/login" className="">
                    Login
                  </Nav.Link>
                  <Nav.Link eventKey={2} as={Link} to="/register" className="">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      <Container>
        <hr className="py-0 my-0  mx-auto" />
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logoutAction })(Navbar);
