import { useRef, useState, useEffect, createRef } from "react";
import { Container, Col, Card, Row, Button } from "react-bootstrap";
import Contact from "../src/components/Contact";
import ImageCard from "../src/components/ImageCard";
import carsToRent, { CarToRent } from "../src/static/carsToRent";
import Image from "next/image";
import MailIcon from "src/icons/MailIcon";
import PhoneCall from "src/icons/PhoneCall";

export default function Home() {
  const useScroll = useRef();
  const [checkbox, setCheckbox] = useState({});
  const arrLength = carsToRent.length;
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(arrLength)
        .fill(0)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [arrLength]);
  return (
    <div
      style={{
        paddingBottom: 20,
      }}
    >
      <div
        className="text-light"
        style={{
          minHeight: 175,
          height: "100%",
          maxHeight: 600,
          width: "100%",
        }}
      >
        <div
          style={{
            zIndex: 0,
            height: "100%",
            width: "100%",
            position: "relative",
            textAlign: "center",
          }}
        >
          <Image
            className="not-selectable"
            src="/construction-tight-dark.jpg"
            alt="background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <h1
              style={{
                fontWeight: 900,
                fontSize: "calc(8vw + 10px)",
                textShadow: "0px 2px 1em rgba(0, 0, 0, 0.5)",
                position: "relative",
                top: 5,
              }}
            >
              <span className="text-light">MIN</span>
              <span className="text-primary">UTLEIER</span>
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <Row>
                <Col
                  className="text-light"
                  style={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "calc(1vw + 30px)",
                    textShadow: "0px 2px 1em rgba(0, 0, 0, 1)",
                  }}
                >
                  Vår utvalg
                </Col>
              </Row> */}
              <Row
                xs={6}
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="mb-4"
              >
                {carsToRent.map((carToRent: CarToRent, index: number) => {
                  return (
                    <Col
                      xs={12}
                      sm={4}
                      md={3}
                      className="mb-4"
                      key={carToRent.title}
                      style={{
                        whiteSpace: "nowrap",
                        textShadow: "0px 2px 1em rgba(0, 0, 0, 1)",
                        fontSize: "calc(1vw + 20px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 20px",
                      }}
                    >
                      <Button
                        variant="outline-primary"
                        // href=""
                        onClick={() => elRefs[index].current?.scrollIntoView()}
                      >
                        {carToRent.title}
                      </Button>
                    </Col>
                  );
                })}
              </Row>
              <Row className="mb-4">
                <Col
                  style={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Button
                    variant="outline-primary"
                    size="lg"
                    href="mailto:amkleven@gmail.com?subject=Min Utleier"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <MailIcon />
                    <div className="ml-2" />
                    Send email
                  </Button>
                </Col>
                <Col
                  style={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Button
                    variant="outline-primary"
                    href="tel:96042477"
                    size="lg"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <PhoneCall />
                    <div className="ml-2" />
                    Ring nå
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  <h5>
                    Trenger du hjelp til å utføre arbeid besøk{" "}
                    <a href="https://www.mineiendomservice.no/">
                      MinEiendomservice
                    </a>
                  </h5>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="mt-5" />
          <Container>
            <Row>
              {carsToRent.map((carToRent: CarToRent, index: number) => {
                return (
                  <ImageCard
                    key={index.toString()}
                    carToRent={carToRent}
                    setCheckbox={setCheckbox}
                    useScroll={useScroll}
                    index={index}
                    elRefs={elRefs}
                  />
                );
              })}
            </Row>
          </Container>
        </div>
        <Contact
          setCheckbox={setCheckbox}
          checkbox={checkbox}
          useScroll={useScroll}
        />
      </div>
    </div>
  );
}
