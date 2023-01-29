export const FiveStars = ({
  rating = 0,
  size = 40,
  onClick = () => {},
  containerStyle = {},
}) => {
  const result = [];

  for (let i = 1; i <= 5; i++) {
    result.push(
      <i
        key={i}
        onClick={onClick}
        style={{
          fontSize: size,
          color: "rgba(249, 190, 21, 0.8)",
        }}
        className={`bi bi-star${i <= rating ? "-fill" : ""} ms-1`}
      ></i>
    );
  }

  return (
    <div
      className=" d-flex h-100 align-items-center justify-content-center"
      style={containerStyle}
    >
      {result}
    </div>
  );
};
