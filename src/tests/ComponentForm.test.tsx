import { render, screen, waitFor } from '@testing-library/react';
import { FormComponent } from '../components/FormComponent';
import userEvent from '@testing-library/user-event';

test('HomePage form test', async () => {
  const handleSubmit = jest.fn();

  render(<FormComponent onSubmit={handleSubmit} />);

  userEvent.type(screen.getByRole({name: /time/i}), '20');
  userEvent.type(screen.getByRole({name: /plan/i}), 'FaleMais30');
  userEvent.type(screen.getByRole({name: /origin/i}), '011');
  userEvent.type(screen.getByRole({name: /destination/i}), '017');
  const confirmButton = screen.getByRole('button', { name: /confirm/i });

  userEvent.click(confirmButton);

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      time: '20',
      plan: 'FaleMais30',
      origin: '011',
      destination: '017',
    });
  })
});

/*
import { render, screen, waitFor } from '@testing-library/react';
import { FormComponent } from '../components/FormComponent';
import userEvent from '@testing-library/user-event';

describe('HomePage form test', () => {
  it('Success test', async () => {
    const handleSubmit = jest.fn();

    const componentForm = render(<FormComponent onSubmit={handleSubmit} />);
    
    const textInputTime = componentForm.getAllByTestId('time');
    const textInputPlan = componentForm.getAllByTestId('plan');
    const textInputOrigin = componentForm.getAllByTestId('origin');
    const textInputDestination = componentForm.getAllByTestId('destination');
    const confirmButton = componentForm.getAllByTestId('confirm');
    const clearButton = componentForm.getAllByTestId('clear');

    userEvent.type(textInputTime, '20');
    userEvent.type(textInputPlan, 'FaleMais30');
    userEvent.type(textInputOrigin, '011');
    userEvent.type(textInputDestination, '017');
    userEvent.click(confirmButton);
    userEvent.click(clearButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        time : '20',
        plan : 'FaleMais30',
        origin : '011',
        destination : '017',
      });
    })
  });
});
*/