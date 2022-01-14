import { Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, CardBody, Col, Row } from "reactstrap";
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

const emptyFieldMessage = 'Campo vazio ou inválido';

function invalidFieldMessage(text: string) {
  return `Código da ${text} inválido`;
}

const validationSchema = Yup.object().shape({
  plan: Yup.string().required(emptyFieldMessage),
  origin: Yup.string().required(emptyFieldMessage).oneOf(cityCodes, invalidFieldMessage('origem')),
  destination: Yup.string().required(emptyFieldMessage).oneOf(cityCodes, invalidFieldMessage('destino')),
  time: Yup.string().required(emptyFieldMessage),
});

interface FormComponentProps {
  onSubmit: (values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) => void;
  onReset?: MouseEventHandler<HTMLButtonElement>;
}

export function FormComponent(props: FormComponentProps) {
  return (
    <CardBody>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Row>
              <SelectInput
                label="Plano"
                name="plan"
                id="plan"
                errors={errors.plan}
                touched={touched.plan}
              />
              <TextInput
                label="Tempo"
                type="number"
                name="time"
                id="time"
                value={values.time}
                placeholder="Tempo em minutos"
                errors={errors.time}
                touched={touched.time}
              />
              <TextInput
                label="Codigo cidade de origem"
                type="text"
                name="origin"
                id="origin"
                value={values.origin}
                placeholder="Codigo cidade de origem"
                errors={errors.origin}
                touched={touched.origin}
              />
              <TextInput
                label="Codigo cidade de destino"
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
                  <Button
                    id="confirm"
                    name="confirm"
                    type="submit"
                    color="primary"
                    data-testid="confirm-button"
                  >Calcular</Button>
                  <Button
                    id="clear"
                    name="clear"
                    type="reset"
                    color="danger"
                    onClick={props.onReset}
                  >Limpar</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </CardBody>
  );
}