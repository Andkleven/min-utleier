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
  const navbarHeight = 80;
  return (
    <div
      style={{
        paddingBottom: 20,
      }}
    >
      <div
        className="px-4 shadow bg-darker border-bottom border-top border-dark"
        style={{
          height: navbarHeight,
          position: "fixed",
          zIndex: 999,
          background: "white",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Col
              style={{
                whiteSpace: "nowrap",
              }}
              xs={6}
            >
              <Button
                variant="outline-primary"
                href="mailto:amkleven@gmail.com?subject=Min Utleier"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
                <div className="ml-2" />
                Email
              </Button>
            </Col>
            <Col
              style={{
                whiteSpace: "nowrap",
              }}
              xs={6}
            >
              <Button
                variant="outline-primary"
                href="tel:96042477"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneCall />
                <div className="ml-2" />
                Ring
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="text-light"
        style={{
          paddingTop: navbarHeight,
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
            src="/background.jpg"
            alt="background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <Container>
            <h1
              style={{
                fontWeight: 900,
                fontSize: "calc(8vw + 10px)",
                textShadow: "0px 2px 1em rgba(0, 0, 0, 0.5)",
                position: "relative",
                fontFamily: "Akaya Telivigala",
                top: 5,
              }}
            >
              <span className="text-light">MIN</span>
              <span className="text-primary">UTLEIER</span>
            </h1>
            <h3
              style={{
                fontWeight: 800,
                fontSize: "calc(2vw + 5px)",
                textTransform: "uppercase",
                textShadow: "0px 2px 1em rgba(0, 0, 0, 0.5)",
                fontFamily: "Akaya Telivigala",
                position: "relative",
                top: 5,
              }}
            >
              Vi holder til i ås
            </h3>
            <h5
              style={{
                fontWeight: 800,
                fontSize: "calc(1vw + 5px)",
                textTransform: "uppercase",
                textShadow: "0px 2px 1em rgba(0, 0, 0, 0.5)",
                fontFamily: "Akaya Telivigala",
                position: "relative",
                top: 5,
              }}
            >
              Trenger du hjelp til å utføre arbeid besøk{" "}
              <a href="https://www.mineiendomservice.no/">MinEiendomservice</a>
            </h5>
          </Container>
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
