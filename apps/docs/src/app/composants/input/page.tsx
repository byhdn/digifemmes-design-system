'use client';

import { useState } from 'react';

function DemoInput({
  label,
  placeholder,
  helperText,
  error,
  disabled = false,
  type = 'text',
  value,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const hasError = !!error;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      {label && (
        <label
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--df-color-text-default)',
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          padding: '0.625rem 0.875rem',
          fontSize: '0.875rem',
          fontFamily: 'var(--df-font-body)',
          borderRadius: 'var(--df-radius-lg)',
          border: `1.5px solid ${hasError ? 'var(--df-color-error)' : 'var(--df-color-border-strong)'}`,
          backgroundColor: disabled ? 'var(--df-color-surface-muted)' : 'var(--df-color-surface-default)',
          color: disabled ? 'var(--df-color-text-muted)' : 'var(--df-color-text-default)',
          outline: 'none',
          transition: 'border-color var(--df-transition-fast)',
          cursor: disabled ? 'not-allowed' : 'text',
          width: '100%',
        }}
      />
      {(helperText || error) && (
        <span
          style={{
            fontSize: '0.75rem',
            color: hasError ? 'var(--df-color-error)' : 'var(--df-color-text-subtle)',
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}

const props = [
  { name: 'label', type: 'string', default: '-', description: 'Texte du label au-dessus du champ' },
  { name: 'placeholder', type: 'string', default: '-', description: 'Texte indicatif dans le champ vide' },
  { name: 'value', type: 'string', default: '-', description: 'Valeur controlee du champ' },
  { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Callback a chaque modification' },
  { name: 'type', type: '"text" | "email" | "password" | "number" | "tel" | "url"', default: '"text"', description: 'Type HTML du champ' },
  { name: 'error', type: 'string', default: '-', description: 'Message d\'erreur (active le style erreur)' },
  { name: 'helperText', type: 'string', default: '-', description: 'Texte d\'aide sous le champ' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactive le champ' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marque le champ comme obligatoire' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
];

export default function InputPage() {
  const [demoValue, setDemoValue] = useState('');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--df-radius-xl)',
              backgroundColor: 'rgba(18,184,223,0.1)',
              color: '#12B8DF',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Composant
          </div>
          <div
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--df-radius-xl)',
              backgroundColor: 'rgba(0,149,120,0.1)',
              color: '#009578',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Pret
          </div>
        </div>
        <h1
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.75rem',
          }}
        >
          Input
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le champ de saisie permet aux utilisatrices de saisir du texte. Il prend en charge les labels, la validation et les messages d'aide.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Etats du champ
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            padding: '2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
            }}
          >
            <DemoInput
              label="Nom complet"
              placeholder="Awa Diallo"
              helperText="Prenom et nom de famille"
              value={demoValue}
              onChange={setDemoValue}
            />
            <DemoInput
              label="Email"
              placeholder="awa@digifemmes.ci"
              type="email"
              helperText="Adresse email professionnelle"
            />
            <DemoInput
              label="Champ avec erreur"
              placeholder="Entrer une valeur"
              error="Ce champ est obligatoire"
              value=""
            />
            <DemoInput
              label="Champ desactive"
              placeholder="Non modifiable"
              disabled
            />
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Anatomie
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxWidth: 360,
          }}
        >
          {[
            { num: 1, label: 'Label', color: '#12B8DF' },
            { num: 2, label: 'Champ de saisie (input)', color: '#FF7B00' },
            { num: 3, label: 'Texte d\'aide / Erreur', color: '#009578' },
          ].map((part) => (
            <div key={part.num} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: part.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {part.num}
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)' }}>
                {part.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Props Table */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Props
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--df-color-surface-muted)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: 'var(--df-color-text-default)',
                      borderBottom: '1px solid var(--df-color-border-default)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.map((p, i, arr) => (
                <tr key={p.name}>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontWeight: 600, color: 'var(--df-color-brand-primary)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.name}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.type}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.default}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--df-color-text-default)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Example */}
      <section>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Exemple d'utilisation
        </h2>
        <pre
          style={{
            backgroundColor: 'var(--df-color-surface-muted)',
            borderRadius: 'var(--df-radius-lg)',
            padding: '1.25rem 1.5rem',
            fontFamily: 'var(--df-font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            color: 'var(--df-color-text-default)',
            border: '1px solid var(--df-color-border-default)',
            overflowX: 'auto',
          }}
        >
{`import { Input } from '@digifemmes/ui';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email.includes('@')) {
      setError('Adresse email invalide');
    }
  };

  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="awa@digifemmes.ci"
        value={email}
        onChange={setEmail}
        error={error}
        helperText="Nous ne partagerons jamais ton email."
        required
      />
    </form>
  );
}`}
        </pre>
      </section>
    </div>
  );
}
