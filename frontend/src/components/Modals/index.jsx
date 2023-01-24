import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import MobileMenu from "./MobileMenu";
import ProfileModal from "./ProfileModal";
import { LoadingModal } from "./LoadingModal";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Modals = () => {
  const user = useSelector((state) => state.core.user);

  return (
    <>
      <MobileMenu />
      <LoginModal />

      <ToastContainer position="bottom-right" />
      {user ? (
        <>
          <LogoutModal />
          <ProfileModal />
        </>
      ) : null}
    </>
  );
};

export default Modals;
