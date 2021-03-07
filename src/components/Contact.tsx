import { useState } from "react";
import carsToRent, { CarToRent } from "../static/carsToRent";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
  Alert,
} from "react-bootstrap";
import SendIcon from "src/icons/SendIcon";
import fetch from "unfetch";

export default function Contact({ setCheckbox, checkbox, useScroll }) {
  const [validated, setValidated] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === false) {
    } else {
      const data = {
        startLeie: event.target.startLeie.value,
        sluttLeie: event.target.sluttLeie.value,
        body: event.target.body.value,
        email: event.target.email.value,
        name: event.target.name.value,
        leie: {},
      };
      Object.keys(checkbox).forEach((name) => {
        if (checkbox[name]) {
          data.leie[name] = true;
        }
      });
      const res = await fetch(`${process.env.FRONTEND_URL}/api`, {
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
        },
        method: "POST",
      });

      const result = await res.json();
      setFeedBack(result.message);
    }
  };
  return (
    <div
      style={{ width: "100%" }}
      className="px-4 shadow py-5 bg-darker border-bottom border-top border-dark"
    >
      <div className="text-light">
        {/* <Card style={{ padding: 30, marginTop: 20, width: "80%" }}> */}
        <Container style={{ width: "80%", maxWidth: "900px" }}>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            ref={useScroll}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3>Kontaktskjema</h3>
            </div>
            <hr className="w-100 bg-secondary" />
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Navn</Form.Label>
                  <Form.Control placeholder="Skriv navnet ditt her" />
                  <Form.Text className="text-muted">Valgfritt</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>E-postadresse</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Skriv mailen din her"
                  />
                  <Form.Text className="text-muted">Påkrevd</Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div>Hva du vil leie:</div>
            <Form.Text className="text-muted">
              Velg en eller flere ting å leie
            </Form.Text>

            <Row style={{ paddingLeft: 1 }}>
              {carsToRent.map((carToRent: CarToRent) => (
                <Col style={{ whiteSpace: "nowrap" }} key={carToRent.title}>
                  <Form.Group controlId={carToRent.title}>
                    <Form.Check
                      type="checkbox"
                      checked={checkbox[carToRent.title] || false}
                      onChange={(e) =>
                        setCheckbox((prevState: object) => {
                          return {
                            ...prevState,
                            [carToRent.title]: !prevState[carToRent.title],
                          };
                        })
                      }
                      label={carToRent.title}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="startLeie">
                  <Form.Label>Start leie</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    onChange={(e) => setStartTime(e.currentTarget.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Form.Text className="text-muted">Påkrevd</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="sluttLeie">
                  <Form.Label>Slutt leie</Form.Label>
                  <Form.Control type="date" required min={startTime} />
                  <Form.Text className="text-muted">Påkrevd</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="body">
              <Form.Label>Noe mer du lurer på</Form.Label>
              <Form.Control as="textarea" rows={5} />
              <Form.Text className="text-muted">Valgfritt</Form.Text>
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {feedBack === "sent" && (
                <Alert variant="primary">
                  Vi vil svare på hedvendelsen så fort som mulig
                </Alert>
              )}{" "}
              {feedBack === "ikke sent" && (
                <Alert variant="warning">
                  Det skjedde noe feil, beklager dette 😢
                </Alert>
              )}
            </div>
            <Button
              type="submit"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <SendIcon />
              <div className="ml-2" />
              Send
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}
