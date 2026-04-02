import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interdits de marque',
};

const interdits = [
  {
    title: 'Ne jamais modifier les couleurs du logo',
    description: 'Le logo DigiFemmes utilise un gradient precis (Orange #FF7B00 vers Cyan #12B8DF). Aucune autre combinaison de couleurs n\'est autorisee. Ne pas appliquer de filtre, de teinte monochrome non validee, ni de couleurs aleatoires.',
  },
  {
    title: 'Ne jamais deformer ou etirer le logo',
    description: 'Le logo doit toujours conserver ses proportions d\'origine. Ne pas etirer horizontalement, comprimer verticalement, pivoter ou incliner le logo.',
  },
  {
    title: 'Ne jamais utiliser le logo sur un fond qui reduit la lisibilite',
    description: 'Eviter les fonds trop charges, les photos avec trop de details, ou les couleurs qui creent un contraste insuffisant avec le logo. Utiliser toujours le fond clair ou sombre valide.',
  },
  {
    title: 'Ne jamais ajouter d\'effets visuels',
    description: 'Pas d\'ombre portee, pas de contour (stroke), pas d\'effet 3D, pas de bevel, pas de glow, pas de reflet. Le logo doit rester plat et pur.',
  },
  {
    title: 'Ne jamais changer la typographie du wordmark',
    description: 'Le mot "DigiFemmes" utilise la police Clash Display en poids 800. Ne jamais substituer par une autre police, meme visuellement similaire.',
  },
  {
    title: 'Ne jamais reduire le logo en dessous de la taille minimale',
    description: 'Le symbole DF ne doit jamais etre inferieur a 24px de hauteur. Le logo complet (symbole + wordmark) ne doit jamais etre inferieur a 120px de largeur. En dessous, la lisibilite est compromise.',
  },
  {
    title: 'Ne jamais utiliser les anciennes versions du logo',
    description: 'Seule la version actuelle du logo est autorisee. Les versions anterieures, brouillons ou prototypes ne doivent en aucun cas etre utilises sur des supports publics.',
  },
  {
    title: 'Ne jamais placer le logo partenaire plus grand que DigiFemmes',
    description: 'En situation de co-branding, le logo DigiFemmes doit toujours etre au moins aussi grand que le logo partenaire. Ne jamais subordonner visuellement la marque DigiFemmes.',
  },
  {
    title: 'Respecter les zones de protection du logo',
    description: 'Une zone de protection minimum equivalente a 1x la hauteur du symbole DF doit etre respectee tout autour du logo. Aucun texte, icone ou element graphique ne doit empieter sur cette zone.',
  },
];

export default function InterditsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--df-radius-xl)',
            backgroundColor: 'rgba(220,38,38,0.1)',
            color: '#DC2626',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Regles strictes
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
          Interdits de marque
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Ces regles sont non-negociables. Elles protegent l&apos;integrite et la coherence de la marque DigiFemmes sur tous les supports. Toute violation doit etre corrigee immediatement.
        </p>
      </div>

      {/* Visual summary */}
      <section style={{ marginBottom: '3rem' }}>
        <div
          style={{
            backgroundColor: 'rgba(220,38,38,0.04)',
            borderRadius: 'var(--df-radius-xl)',
            border: '2px solid var(--df-color-error)',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '2rem', color: 'var(--df-color-error)', fontWeight: 800, flexShrink: 0 }}>&times;</span>
          <div>
            <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--df-color-text-default)', marginBottom: '0.25rem' }}>
              {interdits.length} regles a ne jamais enfreindre
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
              Chaque regle est illustree ci-dessous avec une explication detaillee. En cas de doute, contacter l&apos;equipe brand avant de publier.
            </p>
          </div>
        </div>
      </section>

      {/* Rules cards */}
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
          Liste des interdits
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {interdits.map((rule, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-xl)',
                border: '1px solid var(--df-color-border-default)',
                borderLeft: '4px solid #DC2626',
                padding: '1.5rem',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(220,38,38,0.08)',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--df-font-display)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--df-font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--df-color-text-default)',
                    marginBottom: '0.375rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: '#DC2626', fontSize: '1.125rem', fontWeight: 800 }}>&times;</span>
                  {rule.title}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.6 }}>
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zone de protection */}
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
          Zones de protection
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Visual demo of protection zone */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
              style={{
                border: '2px dashed #DC2626',
                borderRadius: 'var(--df-radius-xl)',
                padding: '2rem 3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/digifemmes-design-system/logos/primary/digifemmes-logo-full.svg"
                alt="DigiFemmes"
                style={{ maxWidth: 220, width: '100%', height: 'auto' }}
              />
            </div>
            {/* Arrows */}
            <div style={{ position: 'absolute', top: '-1.25rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6875rem', fontWeight: 600, color: '#DC2626', fontFamily: 'var(--df-font-mono)' }}>
              1x min
            </div>
            <div style={{ position: 'absolute', bottom: '-1.25rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6875rem', fontWeight: 600, color: '#DC2626', fontFamily: 'var(--df-font-mono)' }}>
              1x min
            </div>
            <div style={{ position: 'absolute', left: '-2rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.6875rem', fontWeight: 600, color: '#DC2626', fontFamily: 'var(--df-font-mono)' }}>
              1x
            </div>
            <div style={{ position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.6875rem', fontWeight: 600, color: '#DC2626', fontFamily: 'var(--df-font-mono)' }}>
              1x
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', textAlign: 'center', maxWidth: 480, lineHeight: 1.6 }}>
            La zone de protection correspond a 1x la hauteur du symbole DF. Aucun element ne doit penetrer dans cette zone. Cela garantit la lisibilite et l&apos;impact visuel du logo.
          </p>
        </div>
      </section>

      {/* Tailles minimales */}
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
          Tailles minimales
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '1px solid var(--df-color-border-default)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              src="/digifemmes-design-system/logos/primary/digifemmes-logo-symbol.svg"
              alt="DigiFemmes symbole"
              style={{ width: 24, height: 24 }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--df-color-text-default)', marginBottom: '0.25rem' }}>Symbole seul</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)' }}>Minimum : <strong>24px</strong> de hauteur</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '1px solid var(--df-color-border-default)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              src="/digifemmes-design-system/logos/primary/digifemmes-logo-full.svg"
              alt="DigiFemmes logo complet"
              style={{ maxWidth: 120, width: '100%', height: 'auto' }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--df-color-text-default)', marginBottom: '0.25rem' }}>Logo complet</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)' }}>Minimum : <strong>120px</strong> de largeur</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <div
          style={{
            backgroundColor: 'rgba(18,184,223,0.06)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid rgba(18,184,223,0.2)',
            padding: '1.5rem 2rem',
          }}
        >
          <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--df-color-text-default)', marginBottom: '0.375rem' }}>
            Un doute sur l&apos;utilisation du logo ?
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.6 }}>
            Contacte l&apos;equipe brand DigiFemmes avant de publier. Il vaut mieux verifier que corriger apres diffusion.
          </p>
        </div>
      </section>
    </div>
  );
}
