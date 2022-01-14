import { useState } from "react";
import { Container, ListGroup, Card, CardHeader, CardFooter } from "reactstrap";
import { calculateValueWithoutPlan, calculateValueWithPlan } from "../../utils/plans";
import { FormikHelpers } from "formik";
import { ListItem } from "../../components/ListItem";
import { FormComponent, FormTypes } from "../../components/FormComponent";

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

  function onReset() {
    setValueWithoutPlan(0);
    setvalueWithPlan(0);
  }
  
  return (
    <Container className="p-5">
      <Card>
        <CardHeader>
          <h1 className="w-100 mb-5 text-center">Calculo do valor da ligação</h1>
        </CardHeader>
        <FormComponent onSubmit={onSubmit} onReset={onReset} />
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
