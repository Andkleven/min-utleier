import { Element as scroll } from "react-scroll";
import { Col, Card, Button } from "react-bootstrap";

export default function ImageCard({
  carToRent,
  setCheckbox,
  useScroll,
  index,
  elRefs,
}) {
  return (
    <Col xs={12} md={6} xl={4} className="mb-4">
      <Card style={{ height: "100%", padding: 10 }} ref={elRefs[index]}>
        <div class="text-dark">
          <Card.Img src={carToRent.imageUrl} />
          <Card.Title
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {carToRent.title}
          </Card.Title>
          <Card.Subtitle style={{ marginBottom: 15, textAlign: "left" }}>
            {carToRent.prise} kr per dag
          </Card.Subtitle>
          <Card.Text style={{ fontSize: "1.1rem", textAlign: "left" }}>
            {carToRent.description}
          </Card.Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            height: "100%",
            width: "100%",
          }}
        >
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              setCheckbox((prevState) => {
                return { ...prevState, [carToRent.title]: true };
              });
              useScroll.current.scrollIntoView();
            }}
          >
            Lei {carToRent.title}
          </Button>
        </div>
      </Card>
    </Col>
  );
}
