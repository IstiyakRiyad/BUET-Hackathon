import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import PrivateOutlet from "./utils/PrivateOutlet";
import { LandingPage, LoginPage, RegisterPage, TermsPage } from "./Views";
import DashboardPage from "./Views/DashboardPage/DashboardPage";
import { useEffect } from "react";
import { authUserAction, getRefreshToken } from "./actions/Auth.action";
import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import SoundComponent from "./components/SoundComponent/SoundComponent";
import { getNote } from "./actions/Search.action";
import ForgetPassword from "./Views/ForgetPassword/ForgetPassword";
import ResetPasswordPage from "./Views/ResetPasswordPage/ResetPasswordPage";

function App({ getRefreshToken, authUserAction, getNote, note }) {
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("tuni")) {
        setAuthToken(localStorage.getItem("tuni"));
        let check = await getRefreshToken();
        if (check === true) {
          authUserAction();
        }
      }
      if (note === null) {
        getNote();
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset/:id" element={<ResetPasswordPage />} />

        <Route path="/*" element={<PrivateOutlet />}>
          <>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="dashboard/:type" element={<DashboardPage />} />
            <Route path="test" element={<SoundComponent />} />
          </>
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

const mapStateToProps = (state) => ({
  note: state.search.note,
});

export default connect(mapStateToProps, {
  getRefreshToken,
  authUserAction,
  getNote,
})(App);
