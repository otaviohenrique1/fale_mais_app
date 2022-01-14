import { render, screen, waitFor } from '@testing-library/react';
import { FormComponent } from '../components/FormComponent';
import userEvent from '@testing-library/user-event';

test('FormComponent test', async () => {
  const handleSubmit = jest.fn();

  render(<FormComponent onSubmit={handleSubmit} />);

  userEvent.type(screen.getByLabelText(/Plano/i), "20");
  userEvent.type(screen.getByLabelText(/Tempo/i), "FaleMais30");
  userEvent.type(screen.getByLabelText(/Codigo cidade de origem/i), "011");
  userEvent.type(screen.getByLabelText(/Codigo cidade de destino/i), "017");
  userEvent.click(screen.getByTestId('confirm-button'));
  // userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      time: "20",
      plan: "FaleMais30",
      origin: "011",
      destination: "017",
    });
  })
});
