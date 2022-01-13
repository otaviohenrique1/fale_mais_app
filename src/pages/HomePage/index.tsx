import { useState } from "react";
import { Container, ButtonGroup, Button, ListGroup, Row, Col, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { calculaValorSemPlano, FALEMAIS30, FALEMAIS30TEMPO, FALEMAIS60, FALEMAIS60TEMPO, FALEMAIS120, FALEMAIS120TEMPO, calculaValorTempoExtraComTaxa, generateTax, codigos } from "../../utils/plans";
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
    .oneOf(codigos, 'Codigo da origem invalido'),
  codigo_destino: Yup.string()
    .required('Campo vazio ou inválido')
    .oneOf(codigos, 'Codigo do destino invalido'),
  tempo: Yup.string().required('Campo vazio ou inválido'),
});

export function HomePage() {
  const [valorComPlano, setValorComPlano] = useState<number>(0);
  const [valorSemPlano, setValorSemPlano] = useState<number>(0);

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    let timeInMinutes = parseFloat(values.tempo);
    let taxa = generateTax(values.codigo_origem, values.codigo_destino);
    let totalValorSemPlano = calculaValorSemPlano(taxa, timeInMinutes);
    setValorSemPlano(totalValorSemPlano);

    let valorTaxa10Porcento = parseFloat(((taxa * 10) / 100).toFixed(2));
    let valorTaxaFinal = valorTaxa10Porcento + taxa;
    let valorTempoExtraComTaxa = 0;

    /* Arrumar essa parte */
    if (values.plano === FALEMAIS30 && timeInMinutes > FALEMAIS30TEMPO) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(timeInMinutes, FALEMAIS30TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
      console.log(`valorTempoExtraComTaxa => ${valorTempoExtraComTaxa}`);
    } else if (values.plano === FALEMAIS60 && timeInMinutes > FALEMAIS60TEMPO) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(timeInMinutes, FALEMAIS60TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
      console.log(`valorTempoExtraComTaxa => ${valorTempoExtraComTaxa}`);
    } else if (values.plano === FALEMAIS120 && timeInMinutes > FALEMAIS120TEMPO) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(timeInMinutes, FALEMAIS120TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
      console.log(`valorTempoExtraComTaxa => ${valorTempoExtraComTaxa}`);
    } else {
      // setValorComPlano(0);
      console.log('Teste');
    }

    // console.log(`valorTempoExtraComTaxa => ${valorTempoExtraComTaxa}`);
    // console.log(`valorTaxa10Porcento => ${valorTaxa10Porcento}`);
    // console.log(`valorTaxaFinal => ${valorTaxaFinal}`);
    // console.log(`valorComPlano => ${valorComPlano}`);
    // console.log(`valorSemPlano => ${valorSemPlano}`);

    formikHelpers.resetForm();
  }

  function onReset() {
    setValorComPlano(0);
    setValorSemPlano(0);
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
            onReset={onReset}
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

/*
import { useState, FormEvent } from "react";
import { Container, Alert, Form, FormGroup, Input, ButtonGroup, Button, ListGroup, ListGroupItem, Row, Col, Label } from "reactstrap";
import { validaCodigo, calculaValorSemPlano, FALEMAIS30, FALEMAIS30TEMPO, FALEMAIS60, FALEMAIS60TEMPO, FALEMAIS120, FALEMAIS120TEMPO, calculaValorTempoExtraComTaxa, geraTaxa as geraTaxaPeloCodigo } from "../../utils/Planos";
import * as Yup from "yup";
import { FormikHelpers } from "formik";

interface FormTypes {
  plano: string;
  codigo_origem: string;
  codigo_destino: string;
  tempo: number;
}

const initialValues: FormTypes = {
  plano: "",
  codigo_origem: "",
  codigo_destino: "",
  tempo: 0
};

const validationSchema = Yup.object().shape({
  plano: Yup.string().required('Campo vazio ou inválido'),
  codigo_origem: Yup.string().required('Campo vazio ou inválido'),
  codigo_destino: Yup.string().required('Campo vazio ou inválido'),
  tempo: Yup.number().required('Campo vazio ou inválido'),
});

export function HomePage() {
  const [codigoOrigem, setCodigoOrigem] = useState('');
  const [codigoDestino, setCodigoDestino] = useState('');
  const [tempo, setTempo] = useState('');
  const [plano, setPlano] = useState('');
  const [valorComPlano, setValorComPlano] = useState(0);
  const [valorSemPlano, setValorSemPlano] = useState(0);
  const [exibeErro, setExibeErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();
    if (!validaCodigo(codigoOrigem)) {
      setExibeErro(true);
      setMensagemErro('Codigo da origem invalido');
      return;
    } else if (!validaCodigo(codigoDestino)) {
      setExibeErro(true);
      setMensagemErro('Codigo do destino invalido');
      return;
    }

    let tempoConvertido = parseInt(tempo);
    let taxa = geraTaxaPeloCodigo(codigoOrigem, codigoDestino);
    let valor = calculaValorSemPlano(taxa, tempoConvertido);
    setValorSemPlano(valor);

    let valorTaxa10Por100 = parseFloat(((taxa*10)/100).toFixed(2));
    let valorTaxaFinal = valorTaxa10Por100 + taxa;
    let valorTempoExtraComTaxa = 0;
    
    const validaPlanoFaleMais30MinutosExcedentes = plano === FALEMAIS30 && tempoConvertido > FALEMAIS30TEMPO;
    const validaPlanoFaleMais60MinutosExcedentes = plano === FALEMAIS60 && tempoConvertido > FALEMAIS60TEMPO;
    const validaPlano120FaleMaisMinutosExcedentes = plano === FALEMAIS120 && tempoConvertido > FALEMAIS120TEMPO;

    if (validaPlanoFaleMais30MinutosExcedentes) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(tempoConvertido, FALEMAIS30TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
    } else if (validaPlanoFaleMais60MinutosExcedentes) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(tempoConvertido, FALEMAIS60TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
    } else if (validaPlano120FaleMaisMinutosExcedentes) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(tempoConvertido, FALEMAIS120TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
    } else {
      setValorComPlano(0);
    }
    
    limparFormulario();
  }

  function limparFormulario() {
    setCodigoOrigem('');
    setCodigoDestino('');
    setTempo('');
    setPlano('');
    setExibeErro(false);
    setMensagemErro('');
  }

  function limparCampos() {
    limparFormulario();
    setValorComPlano(0);
    setValorSemPlano(0);
  }
  
  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    formikHelpers.resetForm();
  }
  
  return (
    <Container className="App">
      <h1>Calculo do valor da ligação</h1>
      {(exibeErro) && <Alert color="danger">
        {mensagemErro}
      </Alert>}
      <Form onSubmit={onSubmitHandler}>
        <FormGroup>
          <Input
            name="plano"
            id="plano"
            type="select"
            value={plano}
            onChange={event => setPlano(event.target.value)}
            required
          >
            <option value="">Selecione um plano</option>
            <option value={FALEMAIS30}>{FALEMAIS30}</option>
            <option value={FALEMAIS60}>{FALEMAIS60}</option>
            <option value={FALEMAIS120}>{FALEMAIS120}</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="origem"
            id="origem"
            placeholder="Codigo cidade de origem"
            value={codigoOrigem}
            onChange={event => setCodigoOrigem(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="destino"
            id="destino"
            placeholder="Codigo cidade de destino"
            value={codigoDestino}
            onChange={event => setCodigoDestino(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="tempo"
            id="tempo"
            placeholder="TempoTempo em minutos"
            value={tempo}
            onChange={event => setTempo(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="area-btn-resultado">
          <ButtonGroup>
            <Button
              type="submit"
              color="primary"
            >Calcular</Button>
            <Button
              type="button"
              color="danger"
              onClick={limparCampos}
            >Limpar</Button>
          </ButtonGroup>
        </FormGroup>
      </Form>
      <div className="resultado">
        <ListGroup>
          <ListGroupItem>
            <Row>
              <Col md="12">
                <Label>Valor da ligação com o plano: R${' '}<span>{valorComPlano.toFixed(2)}</span></Label>
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col md="12">
                <Label>Valor da ligação sem o plano: R${' '}<span>{valorSemPlano.toFixed(2)}</span></Label>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    </Container>
  );
}
*/

/*
import { useState, FormEvent } from "react";
import { Container, ButtonGroup, Button, ListGroup, ListGroupItem, Row, Col, Label, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { validaCodigo, calculaValorSemPlano, FALEMAIS30, FALEMAIS30TEMPO, FALEMAIS60, FALEMAIS60TEMPO, FALEMAIS120, FALEMAIS120TEMPO, calculaValorTempoExtraComTaxa, geraTaxa as geraTaxaPeloCodigo, codigos } from "../../utils/Planos";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import { TextInput } from "../../components/TextInput";
import { SelectInput } from "../../components/SelectInput";

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
    .oneOf(codigos, 'Codigo da origem invalido'),
  codigo_destino: Yup.string()
    .required('Campo vazio ou inválido')
    .oneOf(codigos, 'Codigo do destino invalido'),
  tempo: Yup.string().required('Campo vazio ou inválido'),
});

export function HomePage() {
  const [codigoOrigem, setCodigoOrigem] = useState('');
  const [codigoDestino, setCodigoDestino] = useState('');
  const [tempo, setTempo] = useState('');
  const [plano, setPlano] = useState('');
  const [valorComPlano, setValorComPlano] = useState(0);
  const [valorSemPlano, setValorSemPlano] = useState(0);
  const [exibeErro, setExibeErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();
    if (!validaCodigo(codigoOrigem)) {
      setExibeErro(true);
      setMensagemErro('Codigo da origem invalido');
      return;
    } else if (!validaCodigo(codigoDestino)) {
      setExibeErro(true);
      setMensagemErro('Codigo do destino invalido');
      return;
    }

    let tempoConvertido = parseInt(tempo);
    let taxa = geraTaxaPeloCodigo(codigoOrigem, codigoDestino);
    let valor = calculaValorSemPlano(taxa, tempoConvertido);
    setValorSemPlano(valor);

    let valorTaxa10Por100 = parseFloat(((taxa * 10) / 100).toFixed(2));
    let valorTaxaFinal = valorTaxa10Por100 + taxa;
    let valorTempoExtraComTaxa = 0;

    const validaPlanoFaleMais30MinutosExcedentes = plano === FALEMAIS30 && tempoConvertido > FALEMAIS30TEMPO;
    const validaPlanoFaleMais60MinutosExcedentes = plano === FALEMAIS60 && tempoConvertido > FALEMAIS60TEMPO;
    const validaPlano120FaleMaisMinutosExcedentes = plano === FALEMAIS120 && tempoConvertido > FALEMAIS120TEMPO;

    if (validaPlanoFaleMais30MinutosExcedentes) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(tempoConvertido, FALEMAIS30TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
    } else if (validaPlanoFaleMais60MinutosExcedentes) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(tempoConvertido, FALEMAIS60TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
    } else if (validaPlano120FaleMaisMinutosExcedentes) {
      valorTempoExtraComTaxa = calculaValorTempoExtraComTaxa(tempoConvertido, FALEMAIS120TEMPO, valorTaxaFinal);
      setValorComPlano(valorTempoExtraComTaxa);
    } else {
      setValorComPlano(0);
    }
  }

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    formikHelpers.resetForm();
  }

  return (
    <Container className="p-5">
      <Card>
        <CardHeader></CardHeader>
        <CardBody></CardBody>
        <CardFooter></CardFooter>
      </Card>
      <Row>
        <Col md={12} className="mb-5">
          <h1>Calculo do valor da ligação</h1>
        </Col>
        <Col md={12}>
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
                    md={3}
                  />
                  <TextInput
                    type="text"
                    name="codigo_origem"
                    id="codigo_origem"
                    value={values.codigo_origem}
                    placeholder="Codigo cidade de origem"
                    errors={errors.codigo_origem}
                    touched={touched.codigo_origem}
                    md={3}
                  />
                  <TextInput
                    type="text"
                    name="codigo_destino"
                    id="codigo_destino"
                    value={values.codigo_destino}
                    placeholder="Codigo cidade de destino"
                    errors={errors.codigo_destino}
                    touched={touched.codigo_destino}
                    md={3}
                  />
                  <TextInput
                    type="number"
                    name="tempo"
                    id="tempo"
                    value={values.tempo}
                    placeholder="Tempo em minutos"
                    errors={errors.tempo}
                    touched={touched.tempo}
                    md={3}
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
        </Col>
        <Col md={12} className="mt-3 border-top p-3">
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col md="12">
                  <Label>Valor da ligação com o plano: R${' '}<span>{valorComPlano.toFixed(2)}</span></Label>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col md="12">
                  <Label>Valor da ligação sem o plano: R${' '}<span>{valorSemPlano.toFixed(2)}</span></Label>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
*/
