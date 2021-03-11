import { FormEvent, useState } from "react";
import { Form, Label, Input, Container, Button, FormGroup, Row, Col, ListGroup, ListGroupItem, ButtonGroup, Alert } from "reactstrap";
import './App.css';
import { FALEMAIS30, FALEMAIS60, FALEMAIS120, FALEMAIS120TEMPO, FALEMAIS30TEMPO, FALEMAIS60TEMPO, geraTaxa, validaCodigo } from "./utils/Planos";

/*
  De graça ate determinado tempo em minutos e só paga os minutos excedentes
  Minutos excedentes tem um acrescimo de 10% sobre a tarifa normal do minuto
  Planos:
    - FaleMais30 (30 minutos)
    - FaleMais60 (60 minutos)
    - FaleMais120 (120 minutos)
*/

function App() {
  const [codigoOrigem, setCodigoOrigem] = useState('');
  const [codigoDestino, setCodigoDestino] = useState('');
  const [tempo, setTempo] = useState('');
  const [plano, setPlano] = useState('');
  const [valorComPlano, setValorComPlano] = useState(0);
  const [valorSemPlano, setValorSemPlano] = useState(0);
  const [exibeErro, setExibeErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  // const [erroLista, setErroLista] = useState<string[]>([]);

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
    let taxa = geraTaxa(codigoOrigem, codigoDestino);
    let valor = taxa * tempoConvertido;
    let valorTaxa10Por100 = parseInt(((taxa*10)/100).toFixed(2));
    let valorTaxaFinal = valorTaxa10Por100 + taxa;
    // let valorComTaxaAcrescimo = valorTaxaFinal * tempoConvertido;
    
    if (plano === FALEMAIS30) {
      if (tempoConvertido > FALEMAIS30TEMPO) {        
        let tempoExtra = FALEMAIS30TEMPO - tempoConvertido;
        let valorTempoExtraComTaxa = valorTaxaFinal * tempoExtra;
        setValorComPlano(valorTempoExtraComTaxa);
        // setValorComPlano(valorComTaxaAcrescimo);
      }
    } else if (plano === FALEMAIS60) {
      if (tempoConvertido > FALEMAIS60TEMPO) {
        let tempoExtra = FALEMAIS30TEMPO - tempoConvertido;
        let valorTempoExtraComTaxa = valorTaxaFinal * tempoExtra;
        setValorComPlano(valorTempoExtraComTaxa);
        // setValorComPlano(valorComTaxaAcrescimo);
      }
    } else if (plano === FALEMAIS120) {
      if (tempoConvertido > FALEMAIS120TEMPO) {
        let tempoExtra = FALEMAIS30TEMPO - tempoConvertido;
        let valorTempoExtraComTaxa = valorTaxaFinal * tempoExtra;
        setValorComPlano(valorTempoExtraComTaxa);
        // setValorComPlano(valorComTaxaAcrescimo);
      }
    } else {
      setValorComPlano(0);
    }
    setValorSemPlano(valor);

    setCodigoOrigem('');
    setCodigoDestino('');
    setTempo('');
    setPlano('');
    setExibeErro(false);
    setMensagemErro('');
    // setErroLista([]);
  }

  function limparCampos() {
    setCodigoOrigem('');
    setCodigoDestino('');
    setTempo('');
    setPlano('');
    setValorComPlano(0);
    setValorSemPlano(0);
    setExibeErro(false);
    setMensagemErro('');
    // setErroLista([]);
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
