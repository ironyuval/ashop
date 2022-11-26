import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function List({ products }) {
  console.log(products);

  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/product", { state: { product } });
  };

  return (
    <Row
      style={{
        border: "1px solid purple",
        marginTop: 10,
        display: "flex",
        flex: 1,
        height: "100%",
      }}
    >
      {products.map((product, idx) => (
        <Col
          style={{
            width: "18rem",
            height: "50%",
            display: "flex",
            justifyContent: "center",
          }}
          key={product._id}
        >
          <Card>
            <Card.Img
              style={{ width: 200, height: 250, alignSelf: "center" }}
              variant="top"
              src={product.images[0].url}
            />
            <Card.Body style={{ overflow: "hidden" }}>
              <Card.Title>{product.name}</Card.Title>
              {/* <Card.Text
                style={{
                  height: "10ch",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.description}
              </Card.Text> */}
              <Button onClick={() => handleClick(product)} variant="primary">
                Edit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default List;
