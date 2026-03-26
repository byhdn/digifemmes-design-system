import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  /* ---- Basic rendering ---- */
  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('has displayName set to Input', () => {
    expect(Input.displayName).toBe('Input');
  });

  /* ---- Label ---- */
  it('renders a label when provided', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<Input label="Name" id="name-field" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'name-field');
    expect(screen.getByText('Name').closest('label')).toHaveAttribute('for', 'name-field');
  });

  it('shows required asterisk when required', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('input has required attribute when required', () => {
    render(<Input label="Email" required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  /* ---- Sizes ---- */
  it('defaults to md size', () => {
    render(<Input />);
    expect(screen.getByRole('textbox').style.height).toBe('2.5rem');
  });

  it('applies sm size styles', () => {
    render(<Input size="sm" />);
    expect(screen.getByRole('textbox').style.height).toBe('2rem');
  });

  it('applies lg size styles', () => {
    render(<Input size="lg" />);
    expect(screen.getByRole('textbox').style.height).toBe('3rem');
  });

  /* ---- Error state ---- */
  it('displays error message', () => {
    render(<Input error="Invalid email" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input error="Oops" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('links input to error message via aria-describedby', () => {
    render(<Input error="Required" id="test-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  it('does NOT show error role when no error', () => {
    render(<Input />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  /* ---- Helper text ---- */
  it('displays helper text', () => {
    render(<Input helperText="Enter your full name" />);
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('does not display helper text when error is present', () => {
    render(<Input helperText="Hint" error="Error!" />);
    expect(screen.queryByText('Hint')).not.toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  /* ---- Disabled state ---- */
  it('disables the input when disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies disabled opacity style', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox').style.opacity).toBe('0.5');
  });

  /* ---- Event handlers ---- */
  it('fires onChange handler', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className to wrapper', () => {
    const { container } = render(<Input className="custom-input" />);
    expect(container.querySelector('.custom-input')).toBeInTheDocument();
  });
});
