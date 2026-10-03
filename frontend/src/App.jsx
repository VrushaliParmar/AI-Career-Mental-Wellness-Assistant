export default function App() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: 'linear-gradient(135deg, #0f172a, #111827 45%, #1e293b)',
      color: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    }}>
      <section style={{
        width: 'min(900px, 88vw)',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        borderRadius: '24px',
        padding: '40px 32px',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.4)'
      }}>
        <p style={{ letterSpacing: '0.14em', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700 }}>
          AI Career Platform
        </p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', margin: '12px 0 20px' }}>
          CareerPath Pro
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#cbd5e1', maxWidth: '680px' }}>
          An AI-powered career guidance platform that combines resume analysis, skill gap detection,
          job market intelligence, and RAG-based career recommendations into one polished experience.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '28px' }}>
          {['Resume analysis', 'RAG career chat', 'Skill gap dashboard', 'Job insights'].map((item) => (
            <span key={item} style={{
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#bae6fd',
              borderRadius: '999px',
              padding: '10px 16px',
              fontSize: '0.95rem'
            }}>
              {item}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
