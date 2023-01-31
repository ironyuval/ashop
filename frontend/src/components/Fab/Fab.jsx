import "./Fab.css";

const Fab = ({ onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="fab-container">
      <div className="button iconbutton">
        <i className="bi bi-plus-lg"></i>
      </div>
    </div>
  );
};

export default Fab;
