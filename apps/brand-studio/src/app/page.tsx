export default function Home() {
  return (
    <main style={{ padding: '3rem', fontFamily: "'Red Hat Display', sans-serif" }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>
        DigiFemmes Brand Studio
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#757575', maxWidth: 600 }}>
        Genere des visuels on-brand pour les reseaux sociaux, podcasts, talkshows et TV.
        Selectionne un template, personnalise le contenu, et exporte.
      </p>
      <div
        style={{
          marginTop: '2rem',
          padding: '2rem',
          border: '2px dashed #E0E0E0',
          borderRadius: '1rem',
          textAlign: 'center',
          color: '#BDBDBD',
        }}
      >
        Templates en cours de developpement...
      </div>
    </main>
  );
}
