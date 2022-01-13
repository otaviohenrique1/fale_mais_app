import { Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { SelectInput } from "../SelectInput";
import { TextInput } from "../TextInput";
import * as Yup from "yup";
import { cityCodes } from "../../utils/plans";
import { MouseEventHandler } from "react";

export interface FormTypes {
  plan: string;
  origin: string;
  destination: string;
  time: string;
}

const initialValues: FormTypes = {
  plan: "",
  origin: "",
  destination: "",
  time: ""
};

const validationSchema = Yup.object().shape({
  plan: Yup.string().required('Campo vazio ou inválido'),
  origin: Yup.string()
    .required('Campo vazio ou inválido')
    .oneOf(cityCodes, 'Codigo da origem invalido'),
  destination: Yup.string()
    .required('Campo vazio ou inválido')
    .oneOf(cityCodes, 'Codigo do destino invalido'),
  time: Yup.string().required('Campo vazio ou inválido'),
});

interface FormComponentProps {
  onSubmit: (values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) => void;
  onReset?: MouseEventHandler<HTMLButtonElement>;
}

export function FormComponent(props: FormComponentProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {({ errors, touched, values }) => (
        <Form>
          <Row>
            <SelectInput
              name="plan"
              id="plan"
              errors={errors.plan}
              touched={touched.plan}
            />
            <TextInput
              type="number"
              name="time"
              id="time"
              value={values.time}
              placeholder="Tempo em minutos"
              errors={errors.time}
              touched={touched.time}
            />
            <TextInput
              type="text"
              name="origin"
              id="origin"
              value={values.origin}
              placeholder="Codigo cidade de origem"
              errors={errors.origin}
              touched={touched.origin}
            />
            <TextInput
              type="text"
              name="destination"
              id="destination"
              value={values.destination}
              placeholder="Codigo cidade de destino"
              errors={errors.destination}
              touched={touched.destination}
            />
            <Col md={12} className="d-flex justify-content-end">
              <ButtonGroup>
                <Button id="confirm" type="submit" color="primary" >Calcular</Button>
                <Button id="clear" type="reset" color="danger" onClick={props.onReset} >Limpar</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}