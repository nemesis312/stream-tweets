import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "../../DATA/countries.json";
import SelectComponent from "../SelectComponent/SelectComponent";
import { useState } from "react";
import React from "react";
import { TimeWithTimeZone } from "../../functions/TimeWithTimeZone";

interface Option {
  value: string;
  label: string;
  last?: boolean;
  time?: string;
}

interface SelectProps {
  options: Option[];
}

let config = {
  boxShadow: "0px 4px 8px rgba(133, 252, 62, 0.9)",
  isSelectedFocus: "#ccc",
  bgOptionColor: "#85FC3E",
  Data: transformData(),
};

function transformData() {
  const dataOrdenada = Data.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  return dataOrdenada.map((post) => ({
    value: `${post.cca2}*${post.timezones[0]}`,
    label: `${post.flag}${post.name.common}`,
    last: false,
    time: "",
  }));
}
function TweekComponent() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [tweetText, setTweetText] = useState<string>("");

  const handleCountriesChange = (
    selected: Option | readonly Option[] | null
  ) => {
    const groupedByTimezone = new Map();

    const newValue = Array.isArray(selected)
      ? selected
      : selected
      ? [selected]
      : [];

    newValue.forEach((option) => {
      console.log("option", option);
      const timezone = option.value.split("*")[1].split("UTC")[1] || "0";
      console.log(timezone);
      const timeWithTimezone = TimeWithTimeZone(new Date(), timezone);
      if (!groupedByTimezone.has(timeWithTimezone)) {
        groupedByTimezone.set(timeWithTimezone, []);
      }
      groupedByTimezone.get(timeWithTimezone).push(option.label);
    });

    const optionsWithGroupedTimezones = Array.from(
      groupedByTimezone,
      ([timezone, countries]) => ({
        label: `(${timezone}) ${countries.join(", ")}`,
        value: timezone, // o alguna otra lógica para el valor
      })
    );

    setSelectedOptions(optionsWithGroupedTimezones);
  };

  const TextWithLineBreaks = ({ text }: { text: string }) => {
    return text.split("\n").map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Aquí puedes agregar alguna notificación o cambio de estado para informar al usuario
      alert("Text copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy text: ", error);
      // Aquí puedes manejar el error, tal vez mostrando un mensaje al usuario
    }
  };

  const AlertContent = ({ text, options }) => {
    const textToCopy = React.useMemo(() => {
      let combinedText = text;
      options.forEach((option, index) => {
        combinedText += `${index > 0 ? "\n" : ""}${option.label}`;
      });
      return combinedText;
    }, [text, options]);

    return (
      <Alert variant="success">
        <TextWithLineBreaks text={text} />
        {options.map((option, index) => (
          <React.Fragment key={index}>
            {index >= 0 && <br />}
            <span>{`${option.label}`}</span>
          </React.Fragment>
        ))}
        <br />
        <br />

        <Button
          variant="success"
          onClick={() => copyTextToClipboard(textToCopy)}
        >
          Copy
        </Button>
      </Alert>
    );
  };

  return (
    <Container>
      <Row>
        <Col className="text-end">
          <Form.Label>
            Current Time: {new Date().toLocaleTimeString("en-GB")}
          </Form.Label>
        </Col>
      </Row>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Tweet</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="custom-box-shadow"
            onChange={(e) => setTweetText(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <SelectComponent
            placeholder="Select countries"
            isMulti
            config={config}
            onChange={handleCountriesChange}
          />
        </Form.Group>
      </Form>
      {(tweetText.length > 0 || selectedOptions.length > 0) && (
        <div>
          <Col>
            <AlertContent text={tweetText} options={selectedOptions} />
          </Col>
        </div>
      )}
    </Container>
  );
}

export default TweekComponent;
