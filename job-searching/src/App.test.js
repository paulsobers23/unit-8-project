import React from "react";
import { render, screen, fireEvent, getByText, waitForElement } from '@testing-library/react';
import App from "./App";

describe('will render App Component with JobSearch Component nested', () =>{
  test('expect Enter location to be in a label', ()=>{
    render(<App/>)
    const el = screen.getByText('Enter location');
    expect(el).toHaveTextContent('Enter location');
  })
  test('expect Enter position to be in a label', ()=>{
    render(<App/>)
    const el = screen.getByText('Enter position');
    expect(el).toHaveTextContent('Enter position');
  })
})