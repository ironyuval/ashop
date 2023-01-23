const Diagonal = ({ text }) => (
  <div
    style={{
      position: "absolute",
      left: "45%",
      borderTop: "3px solid black",
      borderBottom: "3px solid black",
      width: "80%",
      backgroundColor: "rgba(200,150,50,0.5)",
      transform: "rotate(45deg)",
      transformOrigin: "25%",
    }}
  >
    {text}
  </div>
);

{
  /*        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            borderBottom: "3px solid black",
            width: "70%",
            transform: "rotate(135deg)",
            transformOrigin: "0%",
          }}
        ></div> */
}

export default Diagonal;
