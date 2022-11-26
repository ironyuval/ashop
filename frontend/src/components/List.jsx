import { useNavigate } from "react-router-dom";

export const defaultCardsAmount = 5;

function List({ products }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid green",
        width: "100%",
        display: "flex",
        flex: 0.5,
      }}
    >
      {products.map((product) => (
        <div
          onClick={() => {
            navigate("/product", { state: { product } });
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0px 10px 0px 10px",
            border: "1px solid blue",
            height: "180px",
            width: "90px",
          }}
          key={product._id}
        >
          <div
            style={{
              flex: 1,
              margin: "0px 10px 0px 10px",
              border: "1px solid blue",
              backgroundImage: `url(${product.images[0].url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
          <span style={{ textAlign: "center" }}>{product.name}</span>
        </div>
      ))}
    </div>
  );
}

export default List;
