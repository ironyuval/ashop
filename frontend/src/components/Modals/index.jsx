import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import MobileMenu from "./MobileMenu";
import ProfileModal from "./ProfileModal";
import { ToastContainer } from "react-toastify";

const Modals = () => (
  <>
    <MobileMenu />
    <LogoutModal />
    <LoginModal />
    <ProfileModal />
    <ToastContainer position="bottom-right" />
  </>
);

export default Modals;
