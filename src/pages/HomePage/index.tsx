import { useState } from "react";
import { Container, ButtonGroup, Button, ListGroup, Row, Col, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { calculaValorSemPlano, codes, calculaValorComPlano } from "../../utils/plans";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import { TextInput } from "../../components/TextInput";
import { SelectInput } from "../../components/SelectInput";
import { ListItem } from "../../components/ListItem";

interface FormTypes {
  plano: string;
  codigo_origem: string;
  codigo_destino: string;
  tempo: string;
}

const initialValues: FormTypes = {
  plano: "",
  codigo_origem: "",
  codigo_destino: "",
  tempo: ""
};

const validationSchema = Yup.object().shape({
  plano: Yup.string().required('Campo vazio ou inválido'),
  codigo_origem: Yup.string()
    .required('Campo vazio ou inválido')
    .oneOf(codes, 'Codigo da origem invalido'),
  codigo_destino: Yup.string()
    .required('Campo vazio ou inválido')
    .oneOf(codes, 'Codigo do destino invalido'),
  tempo: Yup.string().required('Campo vazio ou inválido'),
});

export function HomePage() {
  const [valorComPlano, setValorComPlano] = useState<number>(0);
  const [valorSemPlano, setValorSemPlano] = useState<number>(0);

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    let resultadoValorComPlano = calculaValorComPlano(parseFloat(values.tempo), values.codigo_origem, values.codigo_destino, values.plano);
    let resultadoValorSemPlano = calculaValorSemPlano(parseFloat(values.tempo), values.codigo_origem, values.codigo_destino);
    
    setValorComPlano(resultadoValorComPlano);
    setValorSemPlano(resultadoValorSemPlano);

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
                    name="plano"
                    id="plano"
                    errors={errors.plano}
                    touched={touched.plano}
                  />
                  <TextInput
                    type="number"
                    name="tempo"
                    id="tempo"
                    value={values.tempo}
                    placeholder="Tempo em minutos"
                    errors={errors.tempo}
                    touched={touched.tempo}
                  />
                  <TextInput
                    type="text"
                    name="codigo_origem"
                    id="codigo_origem"
                    value={values.codigo_origem}
                    placeholder="Codigo cidade de origem"
                    errors={errors.codigo_origem}
                    touched={touched.codigo_origem}
                  />
                  <TextInput
                    type="text"
                    name="codigo_destino"
                    id="codigo_destino"
                    value={values.codigo_destino}
                    placeholder="Codigo cidade de destino"
                    errors={errors.codigo_destino}
                    touched={touched.codigo_destino}
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
            <ListItem label="Valor da ligação com o plano:" value={valorComPlano} />
            <ListItem label="Valor da ligação sem o plano:" value={valorSemPlano} />
          </ListGroup>
        </CardFooter>
      </Card>
    </Container>
  );
}
