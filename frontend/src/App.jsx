import { useState } from 'react'

const API_BASE = 'http://localhost:8000'

export default function App() {
  const [file, setFile] = useState(null)
  const [targetRole, setTargetRole] = useState('Software Engineer')
  const [resumeData, setResumeData] = useState(null)
  const [chatInput, setChatInput] = useState('What should I focus on to improve my career profile?')
  const [chatReply, setChatReply] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResumeUpload = async () => {
    if (!file) {
      alert('Please choose a PDF resume first.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_role', targetRole)

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/resume/analyze`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || 'Resume analysis failed')
      }

      setResumeData(data.resume)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert(error.message)
    }
  }

  const handleChat = async () => {
    if (!chatInput.trim()) {
      alert('Please enter a question for the career assistant.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'demo-user',
          message: chatInput,
          target_role: targetRole,
          resume_context: resumeData ? JSON.stringify(resumeData) : '',
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || 'Chat failed')
      }

      setChatReply(data.reply)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert(error.message)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020817 0%, #0f172a 50%, #111827 100%)',
      color: '#f8fafc',
      padding: '32px 20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '28px' }}>
          <p style={{ margin: 0, color: '#7dd3fc', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.8rem' }}>
            AI CAREER PLATFORM
          </p>
          <h1 style={{ margin: '12px 0 8px', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>CareerPath Pro</h1>
          <p style={{ margin: 0, color: '#cbd5e1', maxWidth: '760px', lineHeight: 1.7 }}>
            AI-powered career guidance, resume analysis, skill gap detection, and personalized recommendations.
          </p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ marginTop: 0 }}>Resume Upload</h2>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'block', width: '100%', marginBottom: '16px', color: '#e2e8f0' }}
            />

            <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>Target role</label>
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Ex: Software Engineer"
              style={{
                width: '100%',
                marginBottom: '18px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#f8fafc',
              }}
            />

            <button
              onClick={handleResumeUpload}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ marginTop: 0 }}>Quick Overview</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {['Resume Analysis', 'RAG Career Chat', 'Skill Gap Tracking', 'Job Insights'].map((item) => (
                <div key={item} style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ marginTop: 0 }}>Parsed Resume Summary</h2>
            {resumeData ? (
              <div style={{ color: '#e2e8f0', lineHeight: 1.8 }}>
                <p><strong>Name:</strong> {resumeData.name}</p>
                <p><strong>Email:</strong> {resumeData.email || 'Not found'}</p>
                <p><strong>Phone:</strong> {resumeData.phone || 'Not found'}</p>
                <p><strong>Skills:</strong> {resumeData.skills?.length ? resumeData.skills.join(', ') : 'No skills detected'}</p>
                <p><strong>Education:</strong> {resumeData.education?.length ? resumeData.education.join(', ') : 'Not found'}</p>
                <p><strong>Summary:</strong> {resumeData.summary}</p>
              </div>
            ) : (
              <p style={{ color: '#94a3b8' }}>Upload a resume to see extracted details here.</p>
            )}
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ marginTop: 0 }}>Career Assistant</h2>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#f8fafc',
                padding: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />

            <button
              onClick={handleChat}
              style={{
                marginTop: '16px',
                background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {loading ? 'Thinking...' : 'Ask Career Assistant'}
            </button>

            {chatReply && (
              <div style={{ marginTop: '18px', padding: '16px', borderRadius: '12px', background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
                <strong>AI Response:</strong>
                <p style={{ marginBottom: 0, lineHeight: 1.8, color: '#dbeafe' }}>{chatReply}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
