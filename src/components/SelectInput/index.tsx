import { Field } from "formik";
import { Alert, Col, Label } from "reactstrap";
import { plansList } from "../../utils/plans";

interface SelectInputProps {
  name: string;
  id: string;
  errors: any;
  touched: any;
  label: string;
}

export function SelectInput(props: SelectInputProps) {
  return (
    <Col md={6} className="mb-2 d-flex flex-column">
      <Label className="form-label" htmlFor={props.id}>{props.label}</Label>
      <Field
        className="form-select"
        name={props.name}
        id={props.id}
        as="select"
      >
        <option value="">Selecione um plano</option>
        {plansList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
      </Field>
      {props.errors && props.touched ? <Alert color="danger">{props.errors}</Alert> : null}
    </Col>
  );
}