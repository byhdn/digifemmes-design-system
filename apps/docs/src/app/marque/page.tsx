import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marque',
};

const brandValues = [
  {
    name: 'Inclusion',
    description: 'Chaque femme merite un acces egal au digital. Nous construisons pour toutes, sans exception.',
    color: '#FF7B00',
  },
  {
    name: 'Innovation',
    description: 'Nous repoussons les limites de la tech pour creer des solutions adaptees au contexte africain.',
    color: '#12B8DF',
  },
  {
    name: 'Excellence',
    description: 'La qualite n\'est pas une option. Chaque produit, chaque formation, chaque interaction doit etre exemplaire.',
    color: '#225DA7',
  },
  {
    name: 'Communaute',
    description: 'Nous croyons en la force du collectif. Ensemble, nous allons plus loin que seules.',
    color: '#009578',
  },
  {
    name: 'Impact',
    description: 'Chaque action doit avoir un impact mesurable sur l\'autonomisation des femmes en Cote d\'Ivoire.',
    color: '#FFC107',
  },
];

const toneAttributes = [
  { tone: 'Empowering', description: 'Qui donne confiance et pousse a l\'action', example: '"Tu as tout ce qu\'il faut pour reussir."' },
  { tone: 'Direct', description: 'Clair, sans detour, respectueux', example: '"Voici les 3 etapes pour commencer."' },
  { tone: 'Chaleureux', description: 'Humain, proche, jamais froid ou corporatif', example: '"Bienvenue dans la famille DigiFemmes !"' },
  { tone: 'Professionnel', description: 'Credible, structure, sans compromis sur la qualite', example: '"Nos formations suivent les standards internationaux."' },
  { tone: 'Optimiste', description: 'Positif, tourne vers les solutions et le futur', example: '"Chaque defi est une opportunite d\'apprentissage."' },
  { tone: 'Inclusif', description: 'Qui parle a toutes les femmes, tous les niveaux', example: '"Que tu debutes ou que tu sois experte, il y a une place pour toi."' },
];

const logoDonts = [
  'Deformer ou etirer le logo',
  'Changer les couleurs du logo sans validation',
  'Placer le logo sur un fond trop charge',
  'Reduire en dessous de la taille minimum (32px)',
  'Ajouter des effets (ombre, bevel, glow)',
  'Entourer le logo d\'elements decoratifs',
  'Modifier la typographie du wordmark',
  'Utiliser une version basse resolution',
];

export default function MarquePage() {
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
          Marque
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Les guidelines de la marque DigiFemmes. Logo, valeurs, ton et regles d'utilisation pour garantir une identite coherente sur tous les supports.
        </p>
      </div>

      {/* Logo Section */}
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
          Logo
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Primary logo - light bg */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--df-radius-xl)',
              border: '1px solid var(--df-color-border-default)',
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 'var(--df-radius-xl)',
                background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '1.5rem',
                fontFamily: 'var(--df-font-display)',
              }}
            >
              DF
            </div>
            <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 800, fontSize: '1.5rem', color: '#212121' }}>
              DigiFemmes
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#757575', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Logo principal — fond clair
            </div>
          </div>

          {/* Primary logo - dark bg */}
          <div
            style={{
              backgroundColor: '#0F1117',
              borderRadius: 'var(--df-radius-xl)',
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 'var(--df-radius-xl)',
                background: 'linear-gradient(135deg, #FF9A33, #3DD4F5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '1.5rem',
                fontFamily: 'var(--df-font-display)',
              }}
            >
              DF
            </div>
            <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 800, fontSize: '1.5rem', color: '#F0F0F5' }}>
              DigiFemmes
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#A0A3B5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Logo principal — fond sombre
            </div>
          </div>
        </div>

        {/* Logo rules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { label: 'Zone de protection', detail: 'Minimum 1x la hauteur du symbole autour du logo' },
            { label: 'Taille minimum', detail: '32px pour le symbole, 120px pour le logo complet' },
            { label: 'Formats disponibles', detail: 'SVG (principal), PNG @2x, PNG @3x' },
          ].map((rule) => (
            <div
              key={rule.label}
              style={{
                backgroundColor: 'var(--df-color-surface-muted)',
                borderRadius: 'var(--df-radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--df-color-border-default)',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--df-color-text-default)', marginBottom: '0.375rem' }}>
                {rule.label}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
                {rule.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Values */}
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
          Valeurs
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {brandValues.map((v, i) => (
            <div
              key={v.name}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-xl)',
                padding: '1.5rem',
                border: '1px solid var(--df-color-border-default)',
                borderLeft: `4px solid ${v.color}`,
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: `${v.color}15`,
                  color: v.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--df-font-display)',
                  fontWeight: 800,
                  fontSize: '1.125rem',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--df-color-text-default)', marginBottom: '0.25rem' }}>
                  {v.name}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Tone */}
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
          Ton de marque
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {toneAttributes.map((t) => (
            <div
              key={t.tone}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-xl)',
                padding: '1.25rem 1.5rem',
                border: '1px solid var(--df-color-border-default)',
              }}
            >
              <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--df-color-text-default)', marginBottom: '0.25rem' }}>
                {t.tone}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {t.description}
              </p>
              <div
                style={{
                  fontStyle: 'italic',
                  fontSize: '0.8125rem',
                  color: 'var(--df-color-brand-secondary)',
                  backgroundColor: 'rgba(18,184,223,0.06)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--df-radius-md)',
                  borderLeft: '2px solid var(--df-color-brand-secondary)',
                }}
              >
                {t.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Don'ts */}
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
          Interdits
        </h2>
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
              backgroundColor: 'rgba(220,38,38,0.06)',
              padding: '0.75rem 1.5rem',
              borderBottom: '1px solid rgba(220,38,38,0.15)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--df-color-error)',
            }}
          >
            Ce qu'il ne faut JAMAIS faire avec le logo
          </div>
          <div style={{ padding: '1rem 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {logoDonts.map((d) => (
                <div
                  key={d}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--df-color-text-default)',
                    padding: '0.375rem 0',
                  }}
                >
                  <span style={{ color: 'var(--df-color-error)', fontWeight: 700, fontSize: '1rem' }}>
                    &times;
                  </span>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
