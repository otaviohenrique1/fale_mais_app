import { ListGroupItem } from "reactstrap";

interface ListItemProps {
  label: string;
  moneyValue: number;
}

export function ListItem(props: ListItemProps) {
  function formatCurrency(value: number): string {
    let result = `R$ ${value.toFixed(2).replace('.', ',')}`;
    return result;
  }

  return (
    <ListGroupItem className="d-flex justify-content-between align-content-center">
      <h5 className="me-2 fw-bold">{props.label}</h5>
      <span>{formatCurrency(props.moneyValue)}</span>
    </ListGroupItem>
  );
}