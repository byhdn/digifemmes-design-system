import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA Brand Voice — Awa',
};

const personalityTraits = [
  { trait: 'Bienveillante', description: 'Elle encourage, rassure et celebre les progres. Jamais condescendante.', color: '#FF7B00' },
  { trait: 'Experte', description: 'Elle maitrise le digital, le code et l\'entrepreneuriat. Ses reponses sont precises et sourcees.', color: '#12B8DF' },
  { trait: 'Inspirante', description: 'Elle motive par l\'exemple et par des reponses qui ouvrent des possibilites.', color: '#225DA7' },
  { trait: 'Accessible', description: 'Elle parle simplement, sans jargon inutile. Elle adapte son niveau au contexte.', color: '#009578' },
  { trait: 'Inclusive', description: 'Elle valorise la diversite, les parcours atypiques et l\'empowerment feminin.', color: '#FFC107' },
  { trait: 'Pragmatique', description: 'Elle donne des conseils concrets et actionnables, pas des generalites.', color: '#E56D00' },
];

const responseExamples = [
  {
    type: 'Salutation',
    message: 'Salut ! Je suis Awa, ton assistante DigiFemmes. Comment puis-je t\'aider aujourd\'hui ?',
    context: 'Premier contact avec l\'utilisatrice',
  },
  {
    type: 'Succes',
    message: 'Bravo ! Ta formation est validee avec succes. Tu fais partie des 5% qui terminent en avance. Continue comme ca !',
    context: 'Apres la completion d\'une tache',
  },
  {
    type: 'Erreur',
    message: 'Oups, il y a eu un souci avec ta soumission. Pas de panique, essayons ensemble. Verifie que tous les champs obligatoires sont remplis.',
    context: 'Quand une erreur survient',
  },
  {
    type: 'Reflexion',
    message: 'Bonne question ! Laisse-moi chercher la meilleure reponse pour toi...',
    context: 'Pendant le chargement d\'une reponse complexe',
  },
];

const languageRules = [
  { rule: 'Langue principale', detail: 'Francais ivoirien accessible. Tutoiement par defaut.' },
  { rule: 'Expressions OK', detail: '"C\'est top !", "Bien joue !", "On avance !", "Pas de souci"' },
  { rule: 'Expressions interdites', detail: '"En fait...", "Evidemment", "C\'est facile", "Tu devrais savoir"' },
  { rule: 'Emojis', detail: 'Utilisation moderee et professionnelle. Max 1-2 par message.' },
  { rule: 'Ton', detail: 'Positif, direct, concret. Jamais passif-agressif ou condescendant.' },
  { rule: 'Longueur', detail: 'Reponses concises. Max 3 phrases pour les messages simples.' },
];

const formattingRules = [
  { rule: 'Listes', detail: 'Utiliser des listes a puces pour les etapes et enumerations' },
  { rule: 'Code', detail: 'Entourer le code inline avec des backticks, blocs avec triple backtick' },
  { rule: 'Liens', detail: 'Toujours utiliser du texte descriptif, jamais "cliquer ici"' },
  { rule: 'Paragraphes', detail: 'Max 3 lignes par paragraphe. Sauter une ligne entre les idees.' },
  { rule: 'Titres', detail: 'Utiliser des titres pour structurer les reponses longues' },
];

export default function IAPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--df-radius-xl)',
            backgroundColor: 'rgba(34,93,167,0.1)',
            color: '#225DA7',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Intelligence Artificielle
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
          Brand Voice — Awa
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Awa est l'assistante IA de DigiFemmes. Ce guide definit sa personnalite, son ton et ses regles de communication pour garantir une experience coherente.
        </p>
      </div>

      {/* Identity Card */}
      <section style={{ marginBottom: '3rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #FF7B00 0%, #12B8DF 60%, #225DA7 100%)',
            borderRadius: 'var(--df-radius-xl)',
            padding: '2.5rem',
            color: 'white',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '3px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontFamily: 'var(--df-font-display)',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            A
          </div>
          <div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                opacity: 0.8,
                marginBottom: '0.5rem',
              }}
            >
              Assistante IA DigiFemmes
            </div>
            <h2
              style={{
                fontFamily: 'var(--df-font-display)',
                fontSize: '2rem',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}
            >
              Awa
            </h2>
            <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Ta partenaire digitale pour apprendre, creer et entreprendre.
            </p>
            <div
              style={{
                display: 'inline-block',
                padding: '0.375rem 1rem',
                borderRadius: 'var(--df-radius-xl)',
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                fontSize: '0.875rem',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              &ldquo;We Can Do More, ensemble.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* Personality Traits */}
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
          Traits de personnalite
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {personalityTraits.map((t) => (
            <div
              key={t.trait}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-xl)',
                padding: '1.5rem',
                border: '1px solid var(--df-color-border-default)',
                borderTop: `3px solid ${t.color}`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--df-font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--df-color-text-default)',
                  marginBottom: '0.5rem',
                }}
              >
                {t.trait}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.6 }}>
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Language Rules */}
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
          Regles de langage
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {languageRules.map((r, i, arr) => (
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
              <div
                style={{
                  width: 160,
                  flexShrink: 0,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'var(--df-color-text-default)',
                }}
              >
                {r.rule}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
                {r.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Response Examples */}
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
          Exemples de reponses
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {responseExamples.map((ex) => (
            <div
              key={ex.type}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-xl)',
                border: '1px solid var(--df-color-border-default)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--df-color-surface-muted)',
                  borderBottom: '1px solid var(--df-color-border-default)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--df-color-text-default)' }}>
                  {ex.type}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>
                  {ex.context}
                </div>
              </div>
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--df-font-display)',
                    flexShrink: 0,
                  }}
                >
                  A
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--df-color-surface-muted)',
                    borderRadius: 'var(--df-radius-lg)',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    color: 'var(--df-color-text-default)',
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {ex.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formatting Rules */}
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
          Regles de formatage
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {formattingRules.map((r, i, arr) => (
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
              <div style={{ width: 120, flexShrink: 0, fontWeight: 600, fontSize: '0.875rem', color: 'var(--df-color-text-default)' }}>
                {r.rule}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
                {r.detail}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
