import { FormEvent, useState } from "react";
import { Form, Label, Input, Container, Button, FormGroup, Row, Col, ListGroup, ListGroupItem, ButtonGroup, Alert } from "reactstrap";
import './App.css';
import { FALEMAIS30, FALEMAIS60, FALEMAIS120, FALEMAIS120TEMPO, FALEMAIS30TEMPO, FALEMAIS60TEMPO, geraTaxa as geraTaxaPeloCodigo, validaCodigo, calculaValorTempoExtraComTaxa, calculaValorSemPlano } from "./utils/Planos";

function App() {
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

export default App;
