import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Co-Branding',
};

const commonRules = [
  { rule: 'Espacement minimum', detail: 'Toujours maintenir au minimum 24px entre les deux logos' },
  { rule: 'Alignement', detail: 'Les logos doivent etre alignes sur leur axe central (vertical ou horizontal)' },
  { rule: 'Taille relative', detail: 'Le logo DigiFemmes ne doit jamais etre plus petit que le logo partenaire' },
  { rule: 'Fond', detail: 'Utiliser un fond neutre (blanc, noir ou gris clair). Pas de fond colore charge.' },
  { rule: 'Separateur', detail: 'Utiliser un separateur vertical (1px, gris 300) entre les logos si sur la meme ligne' },
  { rule: 'Format', detail: 'Toujours utiliser les versions SVG ou PNG @2x minimum' },
];

const correctPlacements = [
  'Logo DigiFemmes a gauche, partenaire a droite (lecture LTR)',
  'Separateur vertical entre les deux logos',
  'Zone de protection respectee pour chaque logo',
  'Tailles proportionnelles (DF jamais plus petit)',
];

const incorrectPlacements = [
  'Logos superposes ou entrelaces',
  'Logo DigiFemmes plus petit que le partenaire',
  'Logos colles sans espacement',
  'Modification des couleurs du logo DF pour matcher le partenaire',
];

export default function CoBrandingPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--df-radius-xl)',
            backgroundColor: 'rgba(255,123,0,0.1)',
            color: '#FF7B00',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Identite
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
          Co-Branding
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Regles pour l'utilisation du logo DigiFemmes aux cotes d'un logo partenaire. Deux configurations sont autorisees : Dominant 70/30 et Equilibre 60/40.
        </p>
      </div>

      {/* Dominant 70/30 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Configuration Dominant — 70/30
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          DigiFemmes est la marque principale. Le logo partenaire est present mais secondaire. Ideal pour les evenements, formations et produits DigiFemmes avec un sponsor.
        </p>

        {/* Visual diagram */}
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Disposition visuelle
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* DF logo area - 70% */}
            <div
              style={{
                flex: 7,
                background: 'linear-gradient(135deg, rgba(255,123,0,0.08), rgba(18,184,223,0.08))',
                borderRadius: 'var(--df-radius-xl)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                border: '2px dashed var(--df-color-brand-primary)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.75rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--df-color-brand-primary)',
                }}
              >
                70%
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/digifemmes-design-system/logos/primary/digifemmes-logo-full.svg"
                alt="DigiFemmes"
                style={{ maxWidth: 200, width: '100%', height: 'auto' }}
              />
            </div>

            {/* Separator */}
            <div style={{ width: 1, height: 80, backgroundColor: 'var(--df-color-border-strong)' }} />

            {/* Partner logo area - 30% */}
            <div
              style={{
                flex: 3,
                background: 'var(--df-color-surface-muted)',
                borderRadius: 'var(--df-radius-xl)',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                border: '2px dashed var(--df-color-border-strong)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.75rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--df-color-text-subtle)',
                }}
              >
                30%
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--df-radius-md)',
                  backgroundColor: 'var(--df-color-border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--df-color-text-inverse)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                P
              </div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)' }}>
                Partenaire
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(255,123,0,0.06)',
            borderRadius: 'var(--df-radius-lg)',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(255,123,0,0.15)',
            fontSize: '0.875rem',
            color: 'var(--df-color-text-default)',
            lineHeight: 1.6,
          }}
        >
          <strong>Quand utiliser :</strong> Evenements DigiFemmes, formations, produits et communications ou DigiFemmes est l'organisateur/proprietaire.
        </div>
      </section>

      {/* Balanced 60/40 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Configuration Equilibre — 60/40
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Les deux marques ont un poids visuel similaire mais DigiFemmes reste legerement dominant. Ideal pour les partenariats strategiques et co-creations.
        </p>

        {/* Visual diagram */}
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Disposition visuelle
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* DF logo area - 60% */}
            <div
              style={{
                flex: 6,
                background: 'linear-gradient(135deg, rgba(255,123,0,0.08), rgba(18,184,223,0.08))',
                borderRadius: 'var(--df-radius-xl)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                border: '2px dashed var(--df-color-brand-primary)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.75rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--df-color-brand-primary)',
                }}
              >
                60%
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/digifemmes-design-system/logos/primary/digifemmes-logo-full.svg"
                alt="DigiFemmes"
                style={{ maxWidth: 180, width: '100%', height: 'auto' }}
              />
            </div>

            {/* Separator with "x" text */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: 1, height: 28, backgroundColor: 'var(--df-color-border-strong)' }} />
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--df-color-text-subtle)' }}>x</div>
              <div style={{ width: 1, height: 28, backgroundColor: 'var(--df-color-border-strong)' }} />
            </div>

            {/* Partner logo area - 40% */}
            <div
              style={{
                flex: 4,
                background: 'var(--df-color-surface-muted)',
                borderRadius: 'var(--df-radius-xl)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                border: '2px dashed var(--df-color-border-strong)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.75rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--df-color-text-subtle)',
                }}
              >
                40%
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--df-radius-md)',
                  backgroundColor: 'var(--df-color-border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--df-color-text-inverse)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                P
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--df-color-text-subtle)' }}>
                Partenaire
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(18,184,223,0.06)',
            borderRadius: 'var(--df-radius-lg)',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(18,184,223,0.15)',
            fontSize: '0.875rem',
            color: 'var(--df-color-text-default)',
            lineHeight: 1.6,
          }}
        >
          <strong>Quand utiliser :</strong> Partenariats strategiques, co-creations de produits, evenements conjoints ou les deux marques apportent une valeur egale.
        </div>
      </section>

      {/* Common Rules */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1.25rem',
          }}
        >
          Regles communes
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {commonRules.map((r, i, arr) => (
            <div
              key={r.rule}
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1rem 1.5rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
                alignItems: 'baseline',
              }}
            >
              <div style={{ width: 180, flexShrink: 0, fontWeight: 600, fontSize: '0.875rem', color: 'var(--df-color-text-default)' }}>
                {r.rule}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
                {r.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Correct / Incorrect */}
      <section>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1.25rem',
          }}
        >
          Exemples de placement
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Correct */}
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '2px solid #009578',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0,149,120,0.08)',
                padding: '0.75rem 1.25rem',
                borderBottom: '1px solid rgba(0,149,120,0.15)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#009578',
              }}
            >
              Correct
            </div>
            <div style={{ padding: '1rem 1.25rem' }}>
              {correctPlacements.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--df-color-text-default)',
                    padding: '0.375rem 0',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: '#009578', fontWeight: 700, fontSize: '1rem', flexShrink: 0, lineHeight: 1.3 }}>
                    &#10003;
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Incorrect */}
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '2px solid var(--df-color-error)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(220,38,38,0.08)',
                padding: '0.75rem 1.25rem',
                borderBottom: '1px solid rgba(220,38,38,0.15)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'var(--df-color-error)',
              }}
            >
              Incorrect
            </div>
            <div style={{ padding: '1rem 1.25rem' }}>
              {incorrectPlacements.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--df-color-text-default)',
                    padding: '0.375rem 0',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'var(--df-color-error)', fontWeight: 700, fontSize: '1rem', flexShrink: 0, lineHeight: 1.3 }}>
                    &times;
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
