import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  CardFooter,
} from "react-bootstrap";

export default function Calculator() {
  const VAT_RATE = 20;

  const [withVat, setWithVat] = useState("");
  const [withoutVat, setWithoutVat] = useState("");
  const [vat, setVat] = useState("");
  const [isCalculated, setIsCalculated] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [companyName, setCompanyName] = useState("");

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
    if (companyName !== "") {
      console.log(companyName);
    }
    setIsCalculated(false);
  };

  const resetCalculationButton = () => {
    setIsCalculated(true);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100dvh" }}
    >
      <Card
        className="border-0 shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "430px",
          borderRadius: "20px",
        }}
      >
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-1">Калкулатор ДДС</h2>
            <p className="text-muted mb-0">Изчисляване на 20% ДДС</p>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Сума с ДДС</Form.Label>

            <InputGroup>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={withVat}
                onChange={(e) => {
                  setWithVat(e.target.value);
                  setWithoutVat("");
                  setVat("");
                  resetCalculationButton();
                }}
                className="py-2"
              />
              <InputGroup.Text>€</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Сума без ДДС</Form.Label>

            <InputGroup>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={withoutVat}
                onChange={(e) => {
                  setWithoutVat(e.target.value);
                  setWithVat("");
                  setVat("");
                  resetCalculationButton();
                }}
                className="py-2"
              />
              <InputGroup.Text>€</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">ДДС</Form.Label>

            <InputGroup>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={vat}
                onChange={(e) => {
                  setVat(e.target.value);
                  setWithVat("");
                  setWithoutVat("");
                  resetCalculationButton();
                }}
                className="py-2"
              />
              <InputGroup.Text>€</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-semibold">
              Фактури гориво <span className="">(ДДС / 2)</span>
            </span>

            <Form.Check
              className="custom-switch"
              type="switch"
              id="show-result-switch"
              checked={showResult}
              onChange={(e) => setShowResult(e.target.checked)}
            />
          </div>

          <div
            style={{ minHeight: "50px" }}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            {showResult && companyName !== " " && (
              <Form.Select
                aria-label="select input"
                value={companyName}
                onChange={(e) => {
                  const value = e.target.value;
                  setCompanyName(value);
                }}
              >
                <option value="">Избери</option>
                <option value="1">Ерик-94</option>

                <option value="2">Озон - Нови искър</option>
                <option value="3">Озон - Томпсън</option>
              </Form.Select>
            )}
          </div>

          <div style={{ minHeight: "80px" }} className="mb-3">
            {showResult && vat ? (
              companyName === "1" ? (
                <div className="w-100 text-center py-2 rounded-4 bg-white border shadow-sm fw-semibold fs-4">
                  Ерик-94: {100 - (Number(vat) / 2).toFixed(2)} €
                </div>
              ) : companyName === "2" ? (
                <div className="w-100 text-center py-2 rounded-4 bg-white border shadow-sm fw-semibold fs-4">
                  Озон - Нови Искър: {80 - (Number(vat) / 2).toFixed(2)} €
                </div>
              ) : companyName === "3" ? (
                <div className="w-100 text-center py-2 rounded-4 bg-white border shadow-sm fw-semibold fs-4">
                  Озон - Томпсън: {100 - (Number(vat) / 2).toFixed(2)} €E
                </div>
              )
            ) : null}
          </div>

          <Button
            variant={isCalculated ? "primary" : "danger"}
            className="w-100 py-2 fw-semibold"
            style={{
              borderRadius: "12px",
              fontSize: "1.05rem",
            }}
            onClick={handleCalculate}
          >
            Изчисли
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
