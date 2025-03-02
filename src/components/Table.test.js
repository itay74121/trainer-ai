import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

describe('Table component', () => {
    it('renders paragraphs for non-table content', () => {
        const message = "This is a test message\nAnother line";
        const { baseElement } = render(<Table message={message} />);
        console.log(baseElement)
       
    });

});