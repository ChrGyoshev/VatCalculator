import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

export default function Calculator() {
  const VAT_RATE = 20;

  const [withVat, setWithVat] = useState("");
  const [withoutVat, setWithoutVat] = useState("");
  const [vat, setVat] = useState("");

  const handleCalculate = () => {
    if (withVat) {
      const total = parseFloat(withVat);
      const base = total / (1 + VAT_RATE / 100);
      const vatAmount = total - base;

      setWithoutVat(base.toFixed(2));
      setVat(vatAmount.toFixed(2));
    } else if (withoutVat) {
      const base = parseFloat(withoutVat);
      const vatAmount = base * (VAT_RATE / 100);
      const total = base + vatAmount;

      setVat(vatAmount.toFixed(2));
      setWithVat(total.toFixed(2));
    } else if (vat) {
      const vatAmount = parseFloat(vat);
      const base = vatAmount / (VAT_RATE / 100);
      const total = base + vatAmount;

      setWithoutVat(base.toFixed(2));
      setWithVat(total.toFixed(2));
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="w-100" style={{ maxWidth: "420px" }}>
        <Card.Body>
          <h3 className="text-center mb-3">VAT Calculator</h3>

          <Form.Group className="mb-3">
            <Form.Label>Сума с ДДС</Form.Label>
            <Form.Control
              type="number"
              value={withVat}
              onChange={(e) => {
                setWithVat(e.target.value);
                setWithoutVat("");
                setVat("");
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Сума без ДДС</Form.Label>
            <Form.Control
              type="number"
              value={withoutVat}
              onChange={(e) => {
                setWithoutVat(e.target.value);
                setWithVat("");
                setVat("");
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ДДС</Form.Label>
            <Form.Control
              type="number"
              value={vat}
              onChange={(e) => {
                setVat(e.target.value);
                setWithVat("");
                setWithoutVat("");
              }}
            />
          </Form.Group>

          <Button className="w-100" onClick={handleCalculate}>
            Изчисли
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
