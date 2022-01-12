import { Field } from "formik";
import { Alert, Col } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";
import { InputType } from "reactstrap/types/lib/Input";

interface TextInputProps {
  type: InputType;
  name: string;
  id: string;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  errors: any;
  touched: any;
  md?: ColumnProps | undefined;
}

export function TextInput(props: TextInputProps) {
  return (
    <Col md={props.md || 12} className="mb-2 d-flex flex-column">
      <Field
        className="form-control"
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
      />
      {props.errors && props.touched ? <Alert color="danger">{props.errors}</Alert> : null}
    </Col>
  );
}