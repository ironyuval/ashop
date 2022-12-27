import { UserType } from "../utils/types";
import { getStorageToken } from "../redux/slice";
import { getBasename } from "../utils";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function List({ products }) {
  console.log(products);

  const user = useSelector((state) => state.app.user);

  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/product", { state: { product } });
  };

  const toggleFavorite = async (productId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${getStorageToken()}` },
      };
      await axios.post(
        `${getBasename()}/api/user/favorite/${productId}`,
        null,
        config
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row
      style={{
        border: "1px solid purple",
        marginTop: 10,
        display: "flex",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {products.length ? (
        products.map((product, idx) => (
          <Col
            style={{
              width: "18rem",
              display: "flex",
              justifyContent: "center",
            }}
            key={product._id}
          >
            <Card>
              <Card.Img
                style={{ width: "100%", height: 240 }}
                variant="top"
                src={product.images[0].url}
              />

              <Card.Body>
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
                <Button
                  disabled={user.type !== UserType.Admin}
                  onClick={() => handleClick(product)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => toggleFavorite(product._id)}
                  disabled={!user.type}
                  style={{}}
                >
                  <i
                    style={{
                      fontSize: 20,
                      color: "yellow",
                    }}
                    className="bi bi-star"
                  ></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <div>No Results</div>
      )}
    </Row>
  );
}

export default List;
