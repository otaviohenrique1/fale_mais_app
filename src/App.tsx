import { FormEvent, useState } from "react";
import { Form, Label, Input, Container, Button, FormGroup, Row, Col, ListGroup, ListGroupItem, ButtonGroup } from "reactstrap";
import './App.css';
import { FALEMAIS30, FALEMAIS60, FALEMAIS120, FALEMAIS120TEMPO, FALEMAIS30TEMPO, FALEMAIS60TEMPO, geraTaxa } from "./utils/Planos";

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

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();
    // alert(`
    //   ${codigoOrigem}
    //   ${codigoDestino}
    //   ${tempo}
    //   ${plano}
    //   ${valorComPlano}
    //   ${valorSemPlano}
    // `);

    let taxa = geraTaxa(codigoOrigem, codigoDestino);
    let valor = taxa * parseInt(tempo);
    let valorTaxa10Por100 = parseInt(((taxa*10)/100).toFixed(2));
    let valorTaxaFinal = valorTaxa10Por100 + taxa;
    let valorComTaxaAcrescimo = valorTaxaFinal * parseInt(tempo);

    if (plano === FALEMAIS30 && parseInt(tempo) > FALEMAIS30TEMPO) {
      setValorComPlano(valorComTaxaAcrescimo);
    }
    if (plano === FALEMAIS60 && parseInt(tempo) > FALEMAIS60TEMPO) {
      setValorComPlano(valorComTaxaAcrescimo);
    }
    if (plano === FALEMAIS120 && parseInt(tempo) > FALEMAIS120TEMPO) {
      setValorComPlano(valorComTaxaAcrescimo);
    } else {
      setValorComPlano(0);
    }
    setValorSemPlano(valor);

    setCodigoOrigem('');
    setCodigoDestino('');
    setTempo('');
    // setPlano('');
  }

  function limparCampos() {
    setCodigoOrigem('');
    setCodigoDestino('');
    setTempo('');
    setPlano('');
    setValorComPlano(0);
    setValorSemPlano(0);
  }
  
  return (
    <Container className="App">
      <h1>Calculo do valor da ligação</h1>
      <Form onSubmit={onSubmitHandler}>
        <FormGroup>
          <Input
            name="plano"
            id="plano"
            type="select"
            value={plano}
            onChange={event => setPlano(event.target.value)}
          >
            <option value="Selecione">Selecione um plano</option>
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
