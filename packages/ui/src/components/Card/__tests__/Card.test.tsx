import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Card>Hello Card</Card>);
    expect(screen.getByText('Hello Card')).toBeInTheDocument();
  });

  it('has displayName set to Card', () => {
    expect(Card.displayName).toBe('Card');
  });

  /* ---- Variants ---- */
  it('applies default variant styles', () => {
    const { container } = render(<Card>Default</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.backgroundColor).toBe('var(--df-color-surface-default)');
    expect(card.style.boxShadow).toBe('var(--df-shadow-sm)');
  });

  it('applies elevated variant styles', () => {
    const { container } = render(<Card variant="elevated">Elevated</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.backgroundColor).toBe('var(--df-color-surface-elevated)');
    expect(card.style.boxShadow).toBe('var(--df-shadow-md)');
  });

  it('applies outlined variant styles', () => {
    const { container } = render(<Card variant="outlined">Outlined</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.boxShadow).toBe('none');
  });

  /* ---- Clickable behavior ---- */
  it('adds role="button" and tabIndex when clickable', () => {
    render(<Card clickable>Click me</Card>);
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('does NOT add role="button" when not clickable', () => {
    const { container } = render(<Card>Static</Card>);
    expect(container.querySelector('[role="button"]')).not.toBeInTheDocument();
  });

  it('applies cursor pointer when clickable', () => {
    render(<Card clickable>Click</Card>);
    const card = screen.getByRole('button');
    expect(card.style.cursor).toBe('pointer');
  });

  /* ---- Sub-components ---- */
  describe('Card.Header', () => {
    it('renders header content', () => {
      render(
        <Card>
          <Card.Header>Title</Card.Header>
        </Card>,
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('has displayName set to Card.Header', () => {
      expect(Card.Header.displayName).toBe('Card.Header');
    });
  });

  describe('Card.Body', () => {
    it('renders body content', () => {
      render(
        <Card>
          <Card.Body>Body text</Card.Body>
        </Card>,
      );
      expect(screen.getByText('Body text')).toBeInTheDocument();
    });

    it('has displayName set to Card.Body', () => {
      expect(Card.Body.displayName).toBe('Card.Body');
    });
  });

  describe('Card.Footer', () => {
    it('renders footer content', () => {
      render(
        <Card>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      );
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('uses flexbox layout', () => {
      render(
        <Card>
          <Card.Footer data-testid="footer">Actions</Card.Footer>
        </Card>,
      );
      expect(screen.getByTestId('footer').style.display).toBe('flex');
    });

    it('has displayName set to Card.Footer', () => {
      expect(Card.Footer.displayName).toBe('Card.Footer');
    });
  });

  describe('Card.Image', () => {
    it('renders an image with src and alt', () => {
      render(
        <Card>
          <Card.Image src="/photo.jpg" alt="A photo" />
        </Card>,
      );
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/photo.jpg');
      expect(img).toHaveAttribute('alt', 'A photo');
    });

    it('has displayName set to Card.Image', () => {
      expect(Card.Image.displayName).toBe('Card.Image');
    });
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref to sub-components', () => {
    const headerRef = React.createRef<HTMLDivElement>();
    const bodyRef = React.createRef<HTMLDivElement>();
    const footerRef = React.createRef<HTMLDivElement>();
    const imgRef = React.createRef<HTMLImageElement>();

    render(
      <Card>
        <Card.Header ref={headerRef}>H</Card.Header>
        <Card.Body ref={bodyRef}>B</Card.Body>
        <Card.Image ref={imgRef} src="/x.jpg" alt="x" />
        <Card.Footer ref={footerRef}>F</Card.Footer>
      </Card>,
    );

    expect(headerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(bodyRef.current).toBeInstanceOf(HTMLDivElement);
    expect(footerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(imgRef.current).toBeInstanceOf(HTMLImageElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    const { container } = render(<Card className="my-card">C</Card>);
    expect(container.querySelector('.my-card')).toBeInTheDocument();
  });

  it('merges custom style props', () => {
    const { container } = render(<Card style={{ margin: '8px' }}>C</Card>);
    expect((container.firstChild as HTMLElement).style.margin).toBe('8px');
  });
});
