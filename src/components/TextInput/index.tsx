import { Field } from "formik";
import { Alert, Col, Label } from "reactstrap";

interface TextInputProps {
  type: "number" | "text";
  name: string;
  id: string;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  errors: any;
  touched: any;
  label: string;
}

export function TextInput(props: TextInputProps) {
  return (
    <Col md={6} className="mb-2 d-flex flex-column">
      <Label className="form-label" htmlFor={props.id}>{props.label}</Label>
      <Field
        className="form-control"
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
      />
      {props.errors && props.touched ? <Alert color="danger" data-testid="error">{props.errors}</Alert> : null}
    </Col>
  );
}