import { Field } from "formik";
import { Alert, Col } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";
import { FALEMAIS30, FALEMAIS60, FALEMAIS120 } from "../../utils/plans";

interface SelectInputProps {
  name: string;
  id: string;
  errors: any;
  touched: any;
  md?: ColumnProps | undefined;
}

export function SelectInput(props: SelectInputProps) {
  return (
    <Col md={props.md || 12} className="mb-2 d-flex flex-column">
      <Field
        className="form-select"
        name={props.name}
        id={props.id}
        as="select"
      >
        <option value="">Selecione um plano</option>
        <option value={FALEMAIS30}>{FALEMAIS30}</option>
        <option value={FALEMAIS60}>{FALEMAIS60}</option>
        <option value={FALEMAIS120}>{FALEMAIS120}</option>
      </Field>
      {props.errors && props.touched ? <Alert color="danger">{props.errors}</Alert> : null}
    </Col>
  );
}