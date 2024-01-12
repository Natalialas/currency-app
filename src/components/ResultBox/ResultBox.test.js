import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            { from: 'PLN', to: 'USD', amount: 484 },
            { from: 'PLN', to: 'USD', amount: 17 },
            { from: 'PLN', to: 'USD', amount: 208 },
            { from: 'PLN', to: 'USD', amount: 89 },
        ];

        for(const testObj of testCases) {

            const amount = (testObj.amount).toFixed(2);
            const from = testObj.from;
            const to = testObj.to;
      
            render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      
            // Find field elements
            const convertedAmount = screen.getByTestId('convertedAmount');
      
            const result = (amount/ 3.5).toFixed(2);
      
            // Set test values to fields
            expect(convertedAmount).toHaveTextContent(`${from} ${amount} = $${result}`);
      
            // Clear the component
            cleanup();
          }
    });
    it('should render proper info about conversion when USD -> PLN', () => {

        const testCases = [
            { from: 'USD', to: 'PLN', amount: 200 },
            { from: 'USD', to: 'PLN', amount: 130 },
            { from: 'USD', to: 'PLN', amount: 22 },
            { from: 'USD', to: 'PLN', amount: 5 },
        ];

        for (const testObj of testCases) {

            const amount = (testObj.amount).toFixed(2);
            const from = testObj.from;
            const to = testObj.to;
      
            render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      
            const convertedAmount = screen.getByTestId('convertedAmount');
            const result = (amount*3.5).toFixed(2);
      
            expect(convertedAmount).toHaveTextContent(`$${amount} = ${to} ${result}`);
      
            cleanup();
          }
    });
    it('should render proper info about conversion when PLN == PLN', () => {

        const testCases = [
            { from: 'PLN', to: 'PLN', amount: 12 },
            { from: 'PLN', to: 'PLN', amount: 30 },
            { from: 'PLN', to: 'PLN', amount: 200 },
            { from: 'PLN', to: 'PLN', amount: 81 },
        ];
    
        for (const testObj of testCases) {
    
          const amount = (testObj.amount).toFixed(2);
          const from = testObj.from;
          const to = testObj.to;
    
          render(<ResultBox from={from} to={to} amount={Number(amount)} />);
    
          const convertedAmount = screen.getByTestId('convertedAmount');
    
          expect(convertedAmount).toHaveTextContent(`${from} ${amount} = ${to} ${amount}`);
    
          cleanup();
        }
    });
    
    it('should render proper info about conversion when  USD == USD', () => {
    
        const testCases = [
            { from: 'USD', to: 'USD', amount: 100 },
            { from: 'USD', to: 'USD', amount: 32 },
            { from: 'USD', to: 'USD', amount: 12 },
            { from: 'USD', to: 'USD', amount: 7 },
        ];
    
        for (const testObj of testCases) {
    
          const amount = (testObj.amount).toFixed(2);
          const from = testObj.from;
          const to = testObj.to;
    
          render(<ResultBox from={from} to={to} amount={Number(amount)} />);
    
          const convertedAmount = screen.getByTestId('convertedAmount');
    
          expect(convertedAmount).toHaveTextContent(`$${amount} = $${amount}`);
    
          cleanup();
        }
    });
    it('should render proper info about conversion when amount is negative', () => {

        const testCases = [
    
          { from: 'PLN', to: 'USD', amount: '-45.00'},
          { from: 'USD', to: 'PLN', amount: '-7.00'},
          { from: 'USD', to: 'PLN', amount: '-190.00'},
          { from: 'PLN', to: 'USD', amount: '-11.00'},  
        ];
    
        for (const testObj of testCases) {
            const amount = testObj.amount;
            const from = testObj.from;
            const to = testObj.to;
    
            render(<ResultBox from={from} to={to} amount={Number(amount)} />);
    
            const convertedAmount = screen.getByTestId('negativeAmount');
    
            expect(convertedAmount).toHaveTextContent(`Wrong value...`);
    
            cleanup();
        }
    });    
});