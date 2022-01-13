import { useState } from "react";
import { Container, ButtonGroup, Button, ListGroup, Row, Col, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { calculateValueWithoutPlan, cityCodes, calculateValueWithPlan } from "../../utils/plans";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import { TextInput } from "../../components/TextInput";
import { SelectInput } from "../../components/SelectInput";
import { ListItem } from "../../components/ListItem";

interface FormTypes {
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

export function HomePage() {
  const [valueWithoutPlan, setValueWithoutPlan] = useState<number>(0);
  const [valueWithPlan, setvalueWithPlan] = useState<number>(0);

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    let resultValueWithPlan = calculateValueWithPlan(parseFloat(values.time), values.origin, values.destination, values.plan);
    let resultValueWithoutPlan = calculateValueWithoutPlan(parseFloat(values.time), values.origin, values.destination);
    
    setValueWithoutPlan(resultValueWithPlan);
    setvalueWithPlan(resultValueWithoutPlan);

    formikHelpers.resetForm();
  }

  return (
    <Container className="p-5">
      <Card>
        <CardHeader>
          <h1 className="w-100 mb-5 text-center">Calculo do valor da ligação</h1>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
                      <Button type="submit" color="primary" >Calcular</Button>
                      <Button type="reset" color="danger" >Limpar</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
        <CardFooter className="p-3">
          <ListGroup>
            <ListItem label="Valor da ligação com o plano:" value={valueWithoutPlan} />
            <ListItem label="Valor da ligação sem o plano:" value={valueWithPlan} />
          </ListGroup>
        </CardFooter>
      </Card>
    </Container>
  );
}
