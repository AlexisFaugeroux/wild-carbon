import { fireEvent, render, screen } from '@testing-library/react';
import CarbonCard from '..';
import CarbonButton from '../../CarbonButton';

describe('carbonCard', () => {
  it('should display a title', () => {
    render(<CarbonCard title="Ceci est un titre pollueur">Text</CarbonCard>);
    expect(screen.getByText('Ceci est un titre pollueur')).toBeInTheDocument();
  });

  it('should call a function when cancel button is clicked ', () => {
    const mockedFn = jest.fn();
    render(
      <CarbonCard title="Ceci est un titre pollueur">
        <CarbonCard.Actions>
          <CarbonButton onClick={mockedFn}>Cancel</CarbonButton>
        </CarbonCard.Actions>
      </CarbonCard>,
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockedFn).toHaveBeenCalled();
  });
});
