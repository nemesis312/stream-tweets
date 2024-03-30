import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row, Stack } from "react-bootstrap";
import CardComponent from "./components/CardComponent/CardComponent";
import TimezoneComponent from "./components/TweekComponent/TimezoneComponent";
import TweekComponent from "./components/TweekComponent/TweekComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container fluid="xxl">
      <Col className="TextLeft">
        <TweekComponent />
      </Col>
      {/* <Stack direction="horizontal" gap={2}>
        <CardComponent 
          ShowTitle='true'
          ShowDescription='true'
          ShowButton='true'
          Title='Card Title'
          Description='This is a simple card component'></CardComponent>
        <CardComponent 
          ShowTitle='true'
          ShowDescription='true'
          ShowButton='true'
          Title='Card Title'
          Description='This is a simple card component'></CardComponent>
         <TimezoneComponent></TimezoneComponent>
      </Stack> */}
    </Container>
  );
}

export default App;
