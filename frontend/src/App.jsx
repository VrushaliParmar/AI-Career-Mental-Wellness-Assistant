import { useState } from 'react'

const API_BASE = (
  import.meta.env.VITE_API_BASE || (import.meta.env.DEV ? 'http://localhost:8000' : '')
).replace(/\/+$/, '')

export default function App() {
  const [file, setFile] = useState(null)
  const [targetRole, setTargetRole] = useState('Software Engineer')
  const [resumeData, setResumeData] = useState(null)
  const [skillGap, setSkillGap] = useState(null)
  const [chatInput, setChatInput] = useState('What should I focus on to improve my career profile?')
  const [chatReply, setChatReply] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResumeUpload = async () => {
    if (!API_BASE) {
      alert('Backend URL is not configured. Set VITE_API_BASE in Vercel and redeploy.')
      return
    }
    if (!file) {
      alert('Please choose a PDF resume first.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_role', targetRole)
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/resume/analyze`, { method: 'POST', body: formData })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Resume analysis failed')

      setResumeData(data.resume)
      const gapResponse = await fetch(`${API_BASE}/skills/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: data.resume?.skills || [], target_role: targetRole }),
      })
      const gapData = await gapResponse.json()
      if (!gapResponse.ok) throw new Error(gapData.detail || 'Skill gap analysis failed')
      setSkillGap(gapData)
    } catch (error) {
      alert(error.message || 'Resume analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChat = async () => {
    if (!API_BASE) {
      alert('Backend URL is not configured. Set VITE_API_BASE in Vercel and redeploy.')
      return
    }
    if (!chatInput.trim()) {
      alert('Please enter a question for the career assistant.')
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000)
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          user_id: 'demo-user',
          message: chatInput,
          target_role: targetRole,
          resume_context: resumeData ? JSON.stringify(resumeData) : '',
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Chat failed')
      setChatReply(data.reply)
    } catch (error) {
      if (error.name === 'AbortError') {
        alert('The career assistant took too long to respond. Please try again.')
      } else {
        alert(error.message || 'Chat failed')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const panelStyle = {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '20px',
    padding: '24px',
  }
  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#f8fafc',
    boxSizing: 'border-box',
  }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #020817 0%, #0f172a 50%, #111827 100%)', color: '#f8fafc', padding: '32px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '28px' }}>
          <p style={{ margin: 0, color: '#7dd3fc', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.8rem' }}>AI CAREER PLATFORM</p>
          <h1 style={{ margin: '12px 0 8px', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>CareerPath Pro</h1>
          <p style={{ margin: 0, color: '#cbd5e1', maxWidth: '760px', lineHeight: 1.7 }}>AI-powered career guidance, resume analysis, skill gap detection, and personalized recommendations.</p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)', gap: '24px', marginBottom: '24px' }}>
          <div style={panelStyle}>
            <h2 style={{ marginTop: 0 }}>Resume Upload</h2>
            <input type="file" accept=".pdf,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ display: 'block', width: '100%', marginBottom: '16px', color: '#e2e8f0' }} />
            <label htmlFor="target-role" style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>Target role</label>
            <input id="target-role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="Ex: Software Engineer" style={{ ...inputStyle, marginBottom: '18px' }} />
            <button disabled={loading} onClick={handleResumeUpload} style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 18px', cursor: loading ? 'wait' : 'pointer' }}>
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
          <div style={panelStyle}>
            <h2 style={{ marginTop: 0 }}>Quick Overview</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {['Resume Analysis', 'RAG Career Chat', 'Skill Gap Tracking', 'Job Insights'].map((item) => <div key={item} style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '12px', padding: '14px' }}>{item}</div>)}
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={panelStyle}>
            <h2 style={{ marginTop: 0 }}>Parsed Resume Summary</h2>
            {resumeData ? <div style={{ color: '#e2e8f0', lineHeight: 1.8 }}>
              <p><strong>Name:</strong> {resumeData.name || 'Not found'}</p>
              <p><strong>Email:</strong> {resumeData.email || 'Not found'}</p>
              <p><strong>Phone:</strong> {resumeData.phone || 'Not found'}</p>
              <p><strong>Skills:</strong> {resumeData.skills?.length ? resumeData.skills.join(', ') : 'No skills detected'}</p>
              <p><strong>Education:</strong> {resumeData.education?.length ? resumeData.education.join(', ') : 'Not found'}</p>
              <p><strong>Summary:</strong> {resumeData.summary || 'No summary extracted'}</p>
            </div> : <p style={{ color: '#94a3b8' }}>Upload a resume to see extracted details here.</p>}
          </div>

          <div style={panelStyle}>
            <h2 style={{ marginTop: 0 }}>Career Assistant</h2>
            <textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
            <button disabled={loading} onClick={handleChat} style={{ marginTop: '16px', background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 18px', cursor: loading ? 'wait' : 'pointer' }}>
              {loading ? 'Thinking...' : 'Ask Career Assistant'}
            </button>
            {chatReply && <div style={{ marginTop: '18px', padding: '16px', borderRadius: '12px', background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.2)' }}><strong>AI Career Assistant</strong><p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{chatReply}</p></div>}
          </div>
        </section>

        <section style={{ ...panelStyle, marginTop: '24px' }}>
          <h2 style={{ marginTop: 0 }}>Role Match Score</h2>
          {skillGap ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
            <div><p>Match Score</p><h3 style={{ fontSize: '2rem' }}>{skillGap.match_score}%</h3></div>
            <div><p>Matched Skills</p><p>{skillGap.matched_skills?.length ? skillGap.matched_skills.join(', ') : 'None detected'}</p></div>
            <div><p>Missing Skills</p><p>{skillGap.missing_skills?.length ? skillGap.missing_skills.join(', ') : 'No major gaps'}</p></div>
          </div> : <p style={{ color: '#94a3b8' }}>Upload a resume to see your role match score and missing skills.</p>}
          {skillGap?.recommendations?.length > 0 && <div style={{ marginTop: '18px' }}><h3>Recommendations</h3><ul style={{ color: '#dbeafe', lineHeight: 1.9, paddingLeft: '20px' }}>{skillGap.recommendations.map((item) => <li key={item}>{item}</li>)}</ul></div>}
        </section>
      </div>
    </main>
  )
}
