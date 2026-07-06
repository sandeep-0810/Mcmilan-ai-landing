import { useEffect, useRef, useState } from 'react'
import './styles.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Figma assets (mirrored locally in public/assets/figma — Hero / Navbar)
const imgLogo        = "/assets/final/logo-white.png"
const imgHeroBadge   = "/assets/figma/frame.svg"
const imgHeroCard1   = "/assets/figma/image19.png"
const imgHeroLaptop  = "/assets/figma/image13.png"
const imgHeroMock    = "/assets/figma/image21.png"
const imgEllipse1    = "/assets/figma/ellipse1.svg"
const imgEllipse2    = "/assets/figma/ellipse2.svg"

// ── Features section
const imgMockGen     = "/assets/figma/image24.png"
const imgRubric      = "/assets/figma/image25.png"
const imgScorePred   = "/assets/figma/image26.png"
const imgBenchmark   = "/assets/figma/image27.png"
const imgConceptTutor= "/assets/figma/image28.png"

// ── Journey section
const imgProgress    = "/assets/figma/image48.png"
const imgTopper      = "/assets/figma/image49.png"
const imgRevision    = "/assets/figma/image51.png"
const imgParent      = "/assets/figma/image52.png"

// ── Mock measure
const imgMockMeasure = "/assets/figma/image60.png"

// ── Voice Call
const imgTutor53     = "/assets/figma/image53.png"
const imgTutor55     = "/assets/figma/image55.png"
const imgTutor56     = "/assets/figma/image56.png"
const imgTutor57     = "/assets/figma/image57.png"
const imgTutor58     = "/assets/figma/image58.png"
const imgTutor59     = "/assets/figma/image59.png"
const imgVoiceYou    = "/assets/figma/ellipse3.png"
const imgVoiceAI     = "/assets/figma/ellipse4.png"
const imgVoiceWave   = "/assets/figma/rectangle1.svg"
const imgVoiceMic    = "/assets/figma/frame1.svg"
const imgVoiceSpk    = "/assets/figma/frame2.svg"
const imgVoiceUp     = "/assets/figma/frame3.svg"
const imgVoiceCap    = "/assets/figma/frame4.svg"
const imgVector1     = "/assets/figma/vector1.svg"
const imgVector2     = "/assets/figma/vector2.svg"
const imgMicBtn      = "/assets/figma/frame5.svg"

// ── Sketchpad
const imgSketchIsha  = "/assets/figma/ellipse5.svg"
const imgSketchRajat1= "/assets/figma/image3.png"
const imgSketchRajat2= "/assets/figma/image4.png"
const imgSketchRajat3= "/assets/figma/image5.png"
const imgSketchGraph = "/assets/figma/image14.png"
const imgSketchF1    = "/assets/figma/frame6.svg"
const imgSketchF2    = "/assets/figma/frame7.svg"
const imgSketchF3    = "/assets/figma/frame8.svg"
const imgSketchF4    = "/assets/figma/frame9.svg"
const imgSketchF5    = "/assets/figma/frame10.svg"
const imgSketchLine  = "/assets/figma/line1.svg"
const imgSketchEnd   = "/assets/figma/frame11.svg"
const imgSketchChat  = "/assets/figma/frame12.svg"

// ── Tools
const imgTool42      = "/assets/figma/image42.png"
const imgTool43      = "/assets/figma/image43.png"
const imgTool44      = "/assets/figma/image44.png"
const imgTool45      = "/assets/figma/image45.png"
const imgTool46      = "/assets/figma/image46.png"
const imgTool47      = "/assets/figma/image47.png"

// ── Testimonials
const imgAvatar30    = "/assets/figma/image30.png"
const imgComma       = "/assets/figma/simple-icons-comma.svg"

// ── CTA
const imgCTABg       = "/assets/figma/image40.png"

// ── Helpers
function nodeCompleted(id, p) {
  if (p >= 0.20 && id === 1) return true
  if (p >= 0.40 && id === 2) return true
  if (p >= 0.60 && id === 3) return true
  if (p >= 0.80 && id === 4) return true
  if (p >= 0.96 && id === 5) return true
  return false
}
function nodeActive(id, p) {
  if (id === 1 && p < 0.20) return true
  if (id === 2 && p >= 0.20 && p < 0.40) return true
  if (id === 3 && p >= 0.40 && p < 0.60) return true
  if (id === 4 && p >= 0.60 && p < 0.80) return true
  if (id === 5 && p >= 0.80) return true
  return false
}

const STAGES = [
  {
    id: 1, step: 'STEP 01', keyword: 'PLAN',
    headline: 'Plan Your Success from Day One',
    description: 'Macmillan.AI creates a personalised study plan based on your class, subjects, and board exam date — deciding what to study, which sample papers to attempt, and how many mocks to complete. It adapts every week based on your performance.',
    chips: ['Chapter-wise study schedule', 'Mock test calendar auto-set', 'Countdown to board date', 'Weak chapter priority boost', 'Daily study target (30/60/90 min)'],
  },
  {
    id: 2, step: 'STEP 02', keyword: 'LEARN',
    headline: 'Concept Understanding via CBSE AI Tutors',
    description: 'Students learn each chapter using Macmillan content powered by live AI tutors that explain concepts, generate examples, answer doubts, and teach according to CBSE question trends.',
    chips: ['Chapter concept explanations', 'CBSE pattern-aligned teaching', 'Voice queries in Hindi/English', 'Diagram & formula revision', 'PYQ frequency analysis'],
  },
  {
    id: 3, step: 'STEP 03', keyword: 'PRACTICE',
    headline: 'Unlimited Mock Tests — Extrapolated from Macmillan',
    description: 'Students attempt AI-generated mocks based on Macmillan sample papers and CBSE 2026 blueprint structure, with timed full-length and chapter-wise modes.',
    chips: ['12 Macmillan original papers', 'Unlimited AI-generated extras', 'Exact CBSE blueprint match', 'Timed full-length mode', 'Chapter-wise targeted test'],
  },
  {
    id: 4, step: 'STEP 04', keyword: 'ANALYSE',
    headline: 'AI Evaluation + Marks Prediction + Rubric Feedback',
    description: 'The AI evaluates answers using CBSE marking schemes, predicts board scores, and provides step-by-step actionable feedback so students know exactly where marks were lost.',
    chips: ['CBSE marking scheme AI evaluation', 'Step-by-step marks awarded', '% Board score predictor', 'Topper answer comparison', 'National benchmark percentile'],
  },
  {
    id: 5, step: 'STEP 05', keyword: 'IMPROVE',
    headline: 'Personalised AI Improvement Plan — Closes Every Gap',
    description: 'AI identifies the highest-priority improvements and creates a focused roadmap to maximise board score — targeting weak chapters, retry questions, and parent progress reports.',
    chips: ['Top 5 improvement priorities', 'Score improvement trajectory', 'Concept-level remediation', 'Retry weakest questions', 'Parent progress report'],
  },
]

function WorkflowSection() {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [typedMsg, setTypedMsg] = useState('')
  const [ocrScan, setOcrScan] = useState(true)
  const [scoreCount, setScoreCount] = useState(0)
  const [dailyTarget, setDailyTarget] = useState(60)
  const [practiceAns, setPracticeAns] = useState(null)
  const [tickTime, setTickTime] = useState('02:14:36')

  const activeStage = Math.min(Math.max(Math.floor(progress / 0.2) + 1, 1), 5)
  const isCelebration = progress >= 0.96

  // Progress lines between nodes
  const line1 = Math.min(Math.max((progress - 0.05) / 0.15, 0), 1) * 100
  const line2 = Math.min(Math.max((progress - 0.25) / 0.15, 0), 1) * 100
  const line3 = Math.min(Math.max((progress - 0.45) / 0.15, 0), 1) * 100
  const line4 = Math.min(Math.max((progress - 0.65) / 0.15, 0), 1) * 100
  const lines = [line1, line2, line3, line4]

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const total = rect.height - (window.innerHeight - 80)
      if (total <= 0) return
      const p = Math.min(Math.max(-rect.top / total, 0), 1)
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setTickTime(prev => {
        const [h, m, s] = prev.split(':').map(Number)
        let ns = s - 1, nm = m, nh = h
        if (ns < 0) { ns = 59; nm-- }
        if (nm < 0) { nm = 59; nh-- }
        if (nh < 0) return '02:14:36'
        return `${String(nh).padStart(2,'0')}:${String(nm).padStart(2,'0')}:${String(ns).padStart(2,'0')}`
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // Stage 2 typing effect
  useEffect(() => {
    if (activeStage !== 2) return
    setTypedMsg('')
    const full = "V = IR represents Ohm's Law. Current through a metallic conductor is directly proportional to the voltage across its terminals. Frequently tested as 5-marker in CBSE Physics boards."
    let i = 0
    const iv = setInterval(() => {
      if (i < full.length) { setTypedMsg(full.slice(0, i + 2)); i += 2 }
      else clearInterval(iv)
    }, 22)
    return () => clearInterval(iv)
  }, [activeStage])

  // Stage 3 OCR scan toggle
  useEffect(() => {
    if (activeStage !== 3) return
    const iv = setInterval(() => setOcrScan(p => !p), 2000)
    return () => clearInterval(iv)
  }, [activeStage])

  // Stage 4 score counter
  useEffect(() => {
    if (activeStage !== 4) return
    let c = 0
    const iv = setInterval(() => {
      if (c < 91) { c++; setScoreCount(c) } else clearInterval(iv)
    }, 16)
    return () => clearInterval(iv)
  }, [activeStage])

  const scrollToStage = (id) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const top = rect.top + window.scrollY
    const total = rect.height - window.innerHeight
    const target = top + ((id - 1) * 0.2 + 0.08) * total
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} id="preparation" style={{ height: '650vh', position: 'relative', width: '100%' }}>
      <div style={{
        position: 'sticky', top: 80, width: '100%', height: 'calc(100vh - 80px)',
        background: '#f5f5f5', display: 'flex', flexDirection: 'column',
        fontFamily: "'Poppins', sans-serif", overflow: 'hidden',
        borderTop: '1px solid #ebebeb'
      }}>
        <div style={{ maxWidth: 1328, margin: '0 auto', padding: '28px 56px 20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>

          {/* Section header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: 27, background: 'rgba(221,51,51,0.1)', border: '1px solid rgba(221,51,51,0.2)', marginBottom: 10 }}>
                <p style={{ color: '#dd3333', fontSize: 13, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Smart Adaptive Workflow</p>
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.25, margin: 0 }}>
                A Structured Workflow for{' '}
                <span style={{ color: '#dd3333' }}>Smarter Board Preparation</span>
              </h2>
              <p style={{ fontSize: 15, fontWeight: 400, color: '#4d4d4d', marginTop: 6, lineHeight: 1.5 }}>
                Macmillan combines planning, concept learning, mock practice, answer evaluation, and improvement tracking into one continuous preparation system.
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '16px 24px 28px', border: '1px solid #ebebeb', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                {STAGES.map((stg, idx) => {
                  const completed = nodeCompleted(stg.id, progress)
                  const active = nodeActive(stg.id, progress)
                  return (
                    <div key={stg.id} style={{ flex: idx < 4 ? 1 : 'none', display: 'flex', alignItems: 'center' }}>
                      <button
                        onClick={() => scrollToStage(stg.id)}
                        style={{
                          position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
                          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        }}
                      >
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: 13, transition: 'all 0.3s',
                          background: completed ? '#dd3333' : active ? '#1a1a1a' : '#f0f0f0',
                          color: completed || active ? '#fff' : '#999',
                          boxShadow: active ? '0 0 0 6px rgba(221,51,51,0.12)' : 'none',
                          transform: active ? 'scale(1.12)' : 'scale(1)',
                        }}>
                          {completed ? '✓' : String(stg.id).padStart(2, '0')}
                        </div>
                        <span style={{
                          position: 'absolute', top: 46, fontSize: 11, fontWeight: 700,
                          letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                          color: active ? '#dd3333' : completed ? '#1a1a1a' : '#aaa',
                          transition: 'color 0.3s',
                        }}>{stg.keyword}</span>
                      </button>
                      {idx < 4 && (
                        <div style={{ flex: 1, height: 3, margin: '0 8px', background: '#f0f0f0', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                          <div style={{
                            position: 'absolute', left: 0, top: 0, height: '100%',
                            width: `${lines[idx]}%`, background: '#dd3333', borderRadius: 4,
                            transition: 'width 0.08s linear',
                            boxShadow: lines[idx] > 0 ? '0 0 6px rgba(221,51,51,0.5)' : 'none'
                          }} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main two-column layout */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 32, minHeight: 0, alignItems: 'center' }}>

            {/* Left — text */}
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
              <div key={isCelebration ? 'celebrate' : activeStage} style={{ animation: 'wf-fadein 0.32s ease' }}>
                {isCelebration ? (
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 27, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Board Ready</span>
                    </div>
                    <h3 style={{ fontSize: 28, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.25, margin: '0 0 12px' }}>CBSE Board Ready Achievement</h3>
                    <p style={{ fontSize: 14, color: '#4d4d4d', lineHeight: 1.6, margin: '0 0 16px' }}>
                      Outstanding cycle completed. Macmillan AI forecasts CBSE Board Exam readiness at premium benchmarks.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                      {['Chemistry — 94%', 'Physics — 91%', 'Mathematics — 92%', '92% Overall Predicted'].map((sc, i) => (
                        <span key={i} style={{ padding: '5px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#059669' }}>✓ {sc}</span>
                      ))}
                    </div>
                    <button onClick={() => scrollToStage(1)} style={{ padding: '10px 24px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                      ↺ Restart Experience
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: 27, background: 'rgba(221,51,51,0.1)', border: '1px solid rgba(221,51,51,0.2)', marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#dd3333', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{STAGES[activeStage - 1].step}</span>
                    </div>
                    <h3 style={{ fontSize: 24, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3, margin: '0 0 10px' }}>{STAGES[activeStage - 1].headline}</h3>
                    <p style={{ fontSize: 14, color: '#4d4d4d', lineHeight: 1.6, margin: '0 0 16px' }}>{STAGES[activeStage - 1].description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                      {STAGES[activeStage - 1].chips.map((chip, i) => (
                        <span key={i} className="workflow-tag-hover" style={{ padding: '5px 12px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#333', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#dd3333', display: 'inline-block', flexShrink: 0 }} />
                          {chip}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => scrollToStage(Math.min(activeStage + 1, 5))}
                      className="btn-primary"
                      style={{ padding: '10px 24px', background: '#dd3333', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      {STAGES[activeStage - 1].chips[0].split(' ')[0] === 'Chapter' ? 'Generate My Study Plan' :
                       activeStage === 2 ? 'Start Learning Now' :
                       activeStage === 3 ? 'Start Live Mock Test' :
                       activeStage === 4 ? 'Analyse My Performance' : 'Start Improvement Sprint'}
                      {' →'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right — interactive canvas */}
            <div style={{
              height: '100%', maxHeight: '60vh', background: '#fff', border: '1px solid #ebebeb',
              borderRadius: 20, padding: '20px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative'
            }}>
              <div key={isCelebration ? 'c' : activeStage} style={{ animation: 'wf-fadein 0.32s ease', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* CELEBRATION */}
                {isCelebration && (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(221,51,51,0.08)', border: '2px solid rgba(221,51,51,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🏆</div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>CBSE Exam Readiness</p>
                      <h4 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>BOARD READY</h4>
                    </div>
                    <div style={{ background: '#1a1a1a', borderRadius: 16, padding: '20px 28px', width: '100%', maxWidth: 320 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>Predicted Board Score</p>
                      <p style={{ fontSize: 48, fontWeight: 800, color: '#dd3333', margin: 0, lineHeight: 1 }}>92%</p>
                      <p style={{ fontSize: 11, color: '#666', marginTop: 10, lineHeight: 1.5 }}>Based on Macmillan sample responses modelled with CBSE rubric algorithms. Deviation ±1.5%.</p>
                    </div>
                  </div>
                )}

                {/* STAGE 1 — PLAN */}
                {!isCelebration && activeStage === 1 && (
                  <>
                    <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 14, padding: '12px 14px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Study Calendar</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#dd3333', background: 'rgba(221,51,51,0.08)', padding: '2px 10px', borderRadius: 12 }}>Adaptive Plan</span>
                      </div>
                      {[
                        { sub: 'Physics', topic: 'Electromagnetic Induction – PYQ', hrs: '1.5 Hrs', accent: '#dd3333' },
                        { sub: 'Chemistry', topic: 'Electrochemistry Formulas', hrs: '1.0 Hrs', accent: '#f59e0b' },
                        { sub: 'Mathematics', topic: 'Definite Integrals Drill #02', hrs: '2.0 Hrs', accent: '#6366f1' },
                      ].map((r, i) => (
                        <div key={i} style={{ background: '#fff', borderLeft: `4px solid ${r.accent}`, borderRadius: 8, padding: '8px 12px', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#999', textTransform: 'uppercase', display: 'block' }}>{r.sub}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{r.topic}</span>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#4d4d4d', fontFamily: 'monospace' }}>{r.hrs}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                          <circle cx="18" cy="18" r="15" fill="none" stroke="#f0f0f0" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15" fill="none" stroke="#dd3333" strokeWidth="3" strokeDasharray="94" strokeDashoffset="26" />
                          <text x="18" y="22" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a1a1a" style={{ transform: 'rotate(90deg)', transformOrigin: '18px 18px' }}>72D</text>
                        </svg>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, color: '#dd3333', margin: 0 }}>72 Days Left</p>
                          <p style={{ fontSize: 9, fontWeight: 600, color: '#999', margin: 0 }}>CBSE Board Date</p>
                        </div>
                      </div>
                      <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 12, padding: '10px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: '#999', textTransform: 'uppercase' }}>Daily Target</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#dd3333' }}>{dailyTarget}m / 90m</span>
                        </div>
                        <input type="range" min="30" max="90" value={dailyTarget} onChange={e => setDailyTarget(+e.target.value)}
                          style={{ width: '100%', accentColor: '#dd3333', height: 4, cursor: 'pointer' }} />
                      </div>
                      <div style={{ background: 'rgba(221,51,51,0.05)', border: '1px solid rgba(221,51,51,0.12)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 18 }}>✦</span>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>92% Forecast Target</p>
                          <p style={{ fontSize: 9, color: '#999', margin: 0 }}>Plan adapted automatically</p>
                        </div>
                      </div>
                      <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 16 }}>⚠</span>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#92400e', margin: 0 }}>Trigonometry Alert</p>
                          <p style={{ fontSize: 9, color: '#b45309', margin: 0 }}>PYQ Accuracy Dropped</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STAGE 2 — LEARN */}
                {!isCelebration && activeStage === 2 && (
                  <>
                    <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 14, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8', paddingBottom: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#999', textTransform: 'uppercase' }}>Macmillan Live Session</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e' }}>● LIVE RESPONSE</span>
                      </div>
                      <div style={{ background: '#f0f0f0', borderRadius: 8, padding: '8px 12px', marginBottom: 8, maxWidth: '70%' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#999', display: 'block', marginBottom: 2 }}>STUDENT QUESTION</span>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>"Explain Kirchhoff's Law in Hindi"</p>
                      </div>
                      <div style={{ background: 'rgba(221,51,51,0.04)', border: '1px solid rgba(221,51,51,0.12)', borderRadius: 8, padding: '10px 12px', marginLeft: 'auto', maxWidth: '85%' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#dd3333', display: 'block', marginBottom: 4 }}>AI TUTOR RESPONSE</span>
                        <p style={{ fontSize: 11, fontWeight: 500, color: '#1a1a1a', margin: 0, lineHeight: 1.5, minHeight: 36 }}>
                          {typedMsg || 'Reading...'}
                          <span style={{ display: 'inline-block', width: 2, height: 13, background: '#dd3333', marginLeft: 2, verticalAlign: 'middle', animation: 'wf-blink 1s step-end infinite' }} />
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '10px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: '#dd3333', textTransform: 'uppercase' }}>Voice Sync</span>
                          <span style={{ fontSize: 14 }}>🔊</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 24 }}>
                          {[12,19,25,14,8,21,15,26,9,20].map((h, i) => (
                            <div key={i} className="waveform-bar" style={{ flex: 1, height: `${h * 0.9}px` }} />
                          ))}
                        </div>
                      </div>
                      <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 12, padding: '10px 14px' }}>
                        <span style={{ fontSize: 9, fontWeight: 600, color: '#999', display: 'block' }}>Interactive Formula</span>
                        <p style={{ fontSize: 26, fontWeight: 800, color: '#dd3333', margin: '4px 0 2px', letterSpacing: 2 }}>V = IR</p>
                        <span style={{ fontSize: 9, color: '#999', fontWeight: 500 }}>Expected 5-marker trend</span>
                      </div>
                    </div>
                  </>
                )}

                {/* STAGE 3 — PRACTICE */}
                {!isCelebration && activeStage === 3 && (
                  <>
                    <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 14, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8', paddingBottom: 8, marginBottom: 10 }}>
                        <div>
                          <span style={{ fontSize: 9, fontWeight: 700, color: '#999', textTransform: 'uppercase', display: 'block' }}>CBSE Blueprint Paper</span>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Macmillan Trial Paper #04</p>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', fontFamily: 'monospace' }}>{tickTime}</span>
                      </div>
                      <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '1px solid #ebebeb', marginBottom: 10 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.08)', padding: '2px 8px', borderRadius: 4 }}>SECTION B — 3 Marks</span>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginTop: 8, lineHeight: 1.5 }}>
                          Determine the magnetic flux associated with a rectangular coil of 50 turns and dimensions 10cm × 5cm operating adjacent to current index rules.
                        </p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {['2.5 × 10⁻³ Wb', '1.25 × 10⁻³ Wb', '3.0 × 10⁻³ Wb', '0.75 × 10⁻³ Wb'].map(opt => (
                          <button key={opt} onClick={() => setPracticeAns(opt)} style={{
                            padding: '8px 10px', borderRadius: 8, border: `1.5px solid ${practiceAns === opt ? '#dd3333' : '#e8e8e8'}`,
                            background: practiceAns === opt ? 'rgba(221,51,51,0.06)' : '#fff',
                            fontSize: 11, fontWeight: 700, color: practiceAns === opt ? '#dd3333' : '#4d4d4d',
                            cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s', textAlign: 'left'
                          }}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '10px 14px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute', left: 0, right: 0, height: 1,
                        background: 'linear-gradient(90deg, transparent, #dd3333, transparent)',
                        top: ocrScan ? '15%' : '85%', transition: 'top 2s ease-in-out'
                      }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#dd3333', textTransform: 'uppercase' }}>AI OCR Scan Engine</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e' }}>Running Scan...</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 16 }}>⊙</span>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', margin: 0 }}>Student_CBSE_Ans_Sh14.jpeg</p>
                          <p style={{ fontSize: 9, color: '#888', margin: 0 }}>Validating step marking points dynamically</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STAGE 4 — ANALYSE */}
                {!isCelebration && activeStage === 4 && (
                  <>
                    <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 14, padding: '12px 14px', flex: 1 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Marking Assessment Feedback</span>
                      {[
                        { label: 'STEP 1', title: 'Formula Statement (V = IR) Check', note: '+1.0 Marks credited', accent: '#dd3333', noteColor: '#16a34a' },
                        { label: 'STEP 2', title: 'Resistance computation details missing', note: 'No deduction (diagram credit applied)', accent: '#f59e0b', noteColor: '#b45309' },
                      ].map((s, i) => (
                        <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 10, padding: '10px 12px', marginBottom: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{ background: s.accent, color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4, flexShrink: 0, fontFamily: 'monospace' }}>{s.label}</span>
                          <div>
                            <p style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', margin: '0 0 3px' }}>{s.title}</p>
                            <p style={{ fontSize: 10, fontWeight: 600, color: s.noteColor, margin: 0 }}>{s.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#999', textTransform: 'uppercase', marginBottom: 8 }}>Score Predictor</span>
                        <div style={{ position: 'relative', width: 52, height: 52 }}>
                          <svg width="52" height="52" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#f0f0f0" strokeWidth="3" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#dd3333" strokeWidth="3" strokeDasharray="88" strokeDashoffset={88 - (88 * scoreCount) / 100} style={{ transition: 'stroke-dashoffset 0.05s' }} />
                          </svg>
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#1a1a1a' }}>{scoreCount}%</div>
                        </div>
                        <span style={{ fontSize: 9, color: '#dd3333', fontWeight: 600, marginTop: 6 }}>Recalibrating...</span>
                      </div>
                      <div style={{ background: 'rgba(221,51,51,0.04)', border: '1px solid rgba(221,51,51,0.12)', borderRadius: 12, padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#dd3333', textTransform: 'uppercase' }}>Weakness Heatmap</span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, marginTop: 8 }}>
                          {['Electro', 'Inorg', 'Organic'].map((l, i) => (
                            <span key={i} style={{ fontSize: 9, fontWeight: 700, padding: '4px 2px', borderRadius: 4, textAlign: 'center', background: i === 1 ? '#dd3333' : '#fff', color: i === 1 ? '#fff' : '#4d4d4d', border: i !== 1 ? '1px solid #e8e8e8' : 'none' }}>{l}</span>
                          ))}
                        </div>
                        <span style={{ fontSize: 9, color: '#999', fontWeight: 500, marginTop: 6 }}>Actionable priority active</span>
                      </div>
                    </div>
                  </>
                )}

                {/* STAGE 5 — IMPROVE */}
                {!isCelebration && activeStage === 5 && (
                  <>
                    <div style={{ background: '#1a1a1a', borderRadius: 14, padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#dd3333', textTransform: 'uppercase' }}>Remediation Sprint</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e' }}>READY TO FLIP</span>
                      </div>
                      {[
                        { label: '1.', text: 'Organic Chemical Compounds Review', pts: '+2.5 Score Target' },
                        { label: '2.', text: 'Case-Study Reasoning Questions', pts: '+1.5 Score Target' },
                      ].map((r, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#dd3333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>✓</span>
                          </div>
                          <div>
                            <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.3 }}>{r.text}</p>
                            <p style={{ fontSize: 9, color: '#888', margin: 0 }}>{r.pts}</p>
                          </div>
                        </div>
                      ))}
                      <p style={{ fontSize: 9, color: '#666', margin: 0 }}>Keep scrolling to resolve final forecast!</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '10px 14px' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Sprint Trajectory</span>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 12, fontWeight: 800 }}>
                          <span style={{ color: '#999' }}>72%</span>
                          <span style={{ color: '#ccc', fontSize: 10 }}>›</span>
                          <span style={{ color: '#666' }}>81%</span>
                          <span style={{ color: '#ccc', fontSize: 10 }}>›</span>
                          <span style={{ color: '#dd3333' }}>92%</span>
                        </div>
                      </div>
                      <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 18 }}>👨‍👩‍👧</span>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Guardian SMS Linked</p>
                          <p style={{ fontSize: 9, color: '#059669', fontWeight: 600, margin: 0 }}>Status Shared</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes wf-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  )
}

export default function Desktop3() {
  useReveal()
  const [activeSection, setActiveSection] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [email, setEmail] = useState(() => localStorage.getItem('mcm_email') || '')
  const [password, setPassword] = useState(() => localStorage.getItem('mcm_password') || '')

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('mcm_email', email);
    localStorage.setItem('mcm_password', password);
    window.location.href = "https://structured-learning-demo-copy.s2.stag.yotutor.ai/onboarding";
  };

  useEffect(() => {
    const sections = ['features', 'preparation', 'tools', 'tutors', 'get-started']
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          const mapping = {
            'features': 'features',
            'preparation': 'preparation',
            'tools': 'tools',
            'tutors': 'ai-tutors',
            'get-started': 'get-started'
          }
          setActiveSection(mapping[id])
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }

    const io = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  const handleNavClick = (label) => {
    const mapping = {
      'Features': 'features',
      'Preparation': 'preparation',
      'Tools': 'tools',
      'AI Tutors': 'tutors',
      'Get Started': 'get-started'
    };
    const id = mapping[label];
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white relative" style={{ width: 1440, margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}>

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-[#f0f0f0] transition-all duration-300" style={{ width: 1440, height: 80, padding: '0 56px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        {/* Logo */}
        <div className="relative shrink-0" style={{ width: 190, height: 80 }}>
          <img alt="Macmillan.AI" className="block" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left center' }} src={imgLogo} />
        </div>

        {/* Nav links */}
        <div className="flex flex-1 items-center justify-center min-w-0">
          <div className="flex gap-[48px] items-center text-[#1a1a1a] text-[16px] text-center whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>
            {['Features','Preparation','Tools','AI Tutors','Get Started'].map(l => (
              <p 
                key={l} 
                onClick={() => handleNavClick(l)} 
                className={`nav-link shrink-0 cursor-pointer ${activeSection === l.toLowerCase().replace(' ', '-') ? 'active' : ''}`}
              >
                {l}
              </p>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-[10px] items-center justify-end shrink-0">
          <button onClick={() => setShowLoginModal(true)} className="btn-ghost flex h-[40px] items-center justify-center overflow-clip px-[16px] py-[10px] rounded-[6px] shrink-0" style={{ background: 'rgba(221,51,51,0.08)', border: 'none', cursor: 'pointer' }}>
            <p className="text-[#d33] text-[15px] whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Login</p>
          </button>
          <button onClick={() => setShowLoginModal(true)} className="btn-primary flex h-[40px] items-center justify-center overflow-clip px-[16px] py-[10px] rounded-[6px] shrink-0" style={{ background: '#dd3333', border: 'none', cursor: 'pointer' }}>
            <p className="text-white text-[15px] whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Get Started</p>
          </button>
        </div>
      </div>

      {/* ── HERO (Frame 1) ── */}
      <div className="bg-white relative overflow-clip" style={{ height: 670 }}>
        {/* background image placeholder */}
        <div className="absolute" style={{ height: 887, left: -76, top: -54, width: 1774 }} />

        {/* CTA button */}
        <div className="absolute flex gap-[10px] items-start justify-end" style={{ left: '50%', transform: 'translateX(-50%) translateX(0.5px)', top: 237 }}>
          <button onClick={() => setShowLoginModal(true)} className="btn-primary flex h-[45px] items-center justify-center overflow-clip px-[16px] py-[12px] rounded-[6px] shrink-0" style={{ background: '#dd3333', border: 'none', cursor: 'pointer' }}>
            <p className="text-white text-[16px] whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Attempt your first Mock Test</p>
          </button>
        </div>

        {/* Score card top-left */}
        <div className="absolute rounded-[19px]" style={{ height: 133, left: 45, top: 215, width: 273 }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[19px]">
            <img alt="" className="absolute max-w-none" style={{ height: '591.91%', left: '-17.46%', top: '-186.13%', width: '432.68%' }} src={imgHeroCard1} fetchpriority="high" />
          </div>
        </div>

        {/* Ellipses */}
        <div className="absolute" style={{ left: 408, top: 450, width: 580, height: 580 }}>
          <div className="absolute" style={{ inset: '-3.05%' }}>
            <img alt="" className="block max-w-none size-full" src={imgEllipse1} loading="lazy" />
          </div>
        </div>
        <div className="absolute" style={{ left: 318, top: 334, width: 755, height: 755 }}>
          <div className="absolute" style={{ inset: '-4.72% -5.25% -5.77% -5.25%' }}>
            <img alt="" className="block max-w-none size-full" src={imgEllipse2} loading="lazy" />
          </div>
        </div>

        {/* Laptop image */}
        <div className="absolute" style={{ height: 358, left: 275, top: 348, width: 866 }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute max-w-none" style={{ height: '180.43%', left: 0, top: '-80.43%', width: '149.25%' }} src={imgHeroLaptop} fetchpriority="high" />
          </div>
        </div>

        {/* Hero heading */}
        <div className="absolute flex flex-col gap-[15px] items-center" style={{ left: '50%', transform: 'translateX(-50%)', top: 50, width: 1156 }}>
          <div className="flex gap-[10px] items-center justify-center px-[16px] py-[8px] rounded-[27px] shrink-0" style={{ background: 'rgba(221,51,51,0.1)', border: '1px solid rgba(221,51,51,0.2)' }}>
            <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHeroBadge} fetchpriority="high" />
            </div>
            <p className="text-[#d33] text-[14px] uppercase whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>
              Built around CBSE exam patterns for Class 10 &amp; 12 students.
            </p>
          </div>
          <div className="flex flex-col gap-[8px] items-center text-center w-full">
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 48, lineHeight: 0, color: '#1a1a1a', width: 868, whiteSpace: 'pre-wrap' }}>
              <p style={{ lineHeight: 1.25 }}>Score Higher in <span style={{ color: '#dd3333' }}>CBSE Boards.</span></p>
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, color: '#333', lineHeight: 1.3, width: 784 }}>
              India's First AI That Builds Your Personal Study Plan — and Keeps You On Track Till Results Day
            </p>
          </div>
        </div>

        {/* Concept card bottom-left */}
        <div className="absolute rounded-[23px]" style={{ height: 188, left: 41, top: 365, width: 357 }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[23px]">
            <img alt="" className="absolute max-w-none" style={{ height: '544.68%', left: '-17.09%', top: '-275%', width: '430.25%' }} src={imgHeroCard1} loading="lazy" />
          </div>
        </div>

        {/* Mock card right */}
        <div className="absolute rounded-[16px]" style={{ height: 282, left: 969, top: 271, width: 446 }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
            <img alt="" className="absolute max-w-none" style={{ height: '120.33%', left: '-6.95%', top: '-10.34%', width: '114.13%' }} src={imgHeroMock} fetchpriority="high" />
          </div>
        </div>
      </div>

      {/* ── WHY STUDENTS CHOOSE (Frame 86) ── */}
      <div id="features" className="flex flex-col gap-[125px] items-center relative reveal" style={{ padding: '80px 77px 0', marginLeft: 44 }}>
        {/* Header */}
        <div className="flex flex-col gap-[48px] items-center relative shrink-0 w-[1285px]">
          <div className="flex flex-col items-start text-center w-[868px]">
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, color: '#1a1a1a', lineHeight: 'normal', width: '100%' }}>
              <span>Why Students Choose </span>
              <span style={{ color: '#dd3333' }}>Macmillan AI</span>
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, color: '#333', lineHeight: 1.3, width: '100%' }}>
              From CBSE patterned based mock test to live benchmarking and topper-level evaluation, every feature is built to improve marks, accuracy, and confidence.
            </p>
          </div>

          {/* Cards grid */}
          <div className="flex flex-col gap-[48px] items-end w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              {/* Row 1 */}
              <div className="flex gap-[24px] items-center w-full">
                <div className="bg-white card-hover relative rounded-[12px] overflow-clip shrink-0 reveal-left" style={{ height: 264, width: 752, boxShadow: '0px 0px 5.8px 0px rgba(90,0,0,0.15)' }}>
                  <div className="absolute flex flex-col gap-[4px] items-start" style={{ left: 24, top: 28, width: 424 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 20, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Unlimited fresh mock tests</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>AI generates additional mock test based on CBSE- pattern from previous years. Students never run out of fresh papers.</p>
                  </div>
                  <div className="absolute" style={{ left: 400, top: 0, width: 392, height: 392 }}>
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMockGen} loading="lazy" />
                  </div>
                </div>
                <div className="bg-white card-hover relative rounded-[12px] overflow-clip shrink-0 reveal-right" style={{ height: 264, width: 510, boxShadow: '0px 0px 5.8px 0px rgba(90,0,0,0.15)' }}>
                  <div className="absolute flex flex-col gap-[4px] items-start" style={{ left: 16, top: 23, width: 477 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 20, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Find where you lose marks</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>Every answer marked against CBSE's official marking scheme with step-by-step marks, partial credit where applicable, and value-point analysis for long answers.</p>
                  </div>
                  <div className="absolute" style={{ left: 287, top: 115, width: 206, height: 206 }}>
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRubric} loading="lazy" />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-[24px] items-center w-full">
                <div className="bg-white card-hover relative rounded-[12px] overflow-clip shrink-0 reveal-left" style={{ height: 326, width: 510, boxShadow: '0px 0px 5.8px 0px rgba(90,0,0,0.15)' }}>
                  <div className="absolute" style={{ left: 254, top: 110, width: 283, height: 283 }}>
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScorePred} loading="lazy" />
                  </div>
                  <div className="absolute flex flex-col gap-[4px] items-start" style={{ left: 15, top: 23, width: 477 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 20, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Predict your board score early</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>Predicts likely board exam percentage per subject after each attempt, calibrated against historical CBSE scoring patterns and the student's improvement trajectory.</p>
                  </div>
                </div>
                <div className="bg-white card-hover relative rounded-[12px] overflow-clip shrink-0 reveal-right" style={{ height: 326, width: 752, boxShadow: '0px 0px 5.8px 0px rgba(90,0,0,0.15)' }}>
                  <div className="absolute flex flex-col gap-[4px] items-start" style={{ left: 20, top: 34, width: 727 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 20, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Compare with students nationwide</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>Compares student performance against a national cohort of Macmillan.AI users in real time for percentile rank, subject-wise and chapter-wise ranking. Far richer than the one-time benchmarking test in the book.</p>
                  </div>
                  <div className="absolute" style={{ left: 399, top: 105, width: 359, height: 359 }}>
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBenchmark} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width card */}
            <div className="bg-white card-hover relative rounded-[12px] overflow-clip shrink-0 w-full reveal-scale" style={{ height: 326, boxShadow: '0px 0px 5.8px 0px rgba(90,0,0,0.15)' }}>
              <div className="absolute flex flex-col gap-[4px] items-center text-center" style={{ left: '50%', transform: 'translateX(-50%)', top: 21, width: 819 }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 20, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Clear doubts instantly</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>Ask anything about any chapter — explained by an AI tutor trained on Macmillan's content, calibrated to CBSE board question patterns. Voice support in all official languages.</p>
              </div>
              <div className="absolute overflow-hidden pointer-events-none" style={{ height: 222, left: 497, top: 113, width: 319 }}>
                <img alt="" className="absolute max-w-none" style={{ height: '143.69%', left: 0, top: '-31.53%', width: '100%' }} src={imgConceptTutor} loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* ── PROGRESS JOURNEY ── */}
        <div className="flex flex-col gap-[24px] items-center w-full">
          {/* Track improvement */}
          <div className="flex gap-[56px] items-center shrink-0 reveal-left">
            <div className="flex flex-col gap-[4px] items-start shrink-0" style={{ width: 655 }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Track improvement after every test</p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>Visual timeline of every attempt, showing score progression, accuracy improvement, time-per-question trends, and predicted exam day performance. Shareable with parents and teachers.</p>
            </div>
            <div className="relative rounded-[16px] shrink-0" style={{ height: 375, width: 562, boxShadow: '0px 0px 4px 0px rgba(213,0,0,0.15)' }}>
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgProgress} loading="lazy" />
            </div>
          </div>

          {/* Learn topper */}
          <div className="flex gap-[147px] items-center shrink-0 reveal-right">
            <div className="relative shrink-0 overflow-hidden" style={{ height: 443, width: 533 }}>
              <img alt="" className="absolute max-w-none" style={{ height: '100%', left: '-12.22%', top: 0, width: '124.58%' }} src={imgTopper} loading="lazy" />
            </div>
            <div className="flex flex-col gap-[4px] items-start shrink-0" style={{ width: 655 }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Learn topper answer writing</p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>Visual timeline of every attempt, showing score progression, accuracy improvement, time-per-question trends, and predicted board day performance. Shareable with parents and teachers.</p>
            </div>
          </div>

          {/* Revise */}
          <div className="flex gap-[28px] items-center shrink-0 w-full reveal-left">
            <div className="relative overflow-clip shrink-0" style={{ height: 323, width: 758 }}>
              <div className="absolute flex flex-col gap-[4px] items-start" style={{ left: 17.5, top: 124.5, width: 655 }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Revise only what matters</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>AI schedules revision of weak topics at optimal intervals before the board state</p>
              </div>
            </div>
            <div className="relative shrink-0 overflow-hidden" style={{ height: 414, width: 558 }}>
              <img alt="" className="absolute max-w-none" style={{ height: '114.11%', left: '-11.37%', top: '-5.41%', width: '127.09%' }} src={imgRevision} loading="lazy" />
            </div>
          </div>

          {/* Share progress */}
          <div className="flex gap-[28px] items-center shrink-0 reveal-right">
            <div className="relative shrink-0" style={{ height: 362, width: 542 }}>
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgParent} loading="lazy" />
            </div>
            <div className="relative overflow-clip shrink-0" style={{ height: 323, width: 758 }}>
              <div className="absolute flex flex-col gap-[4px] items-start" style={{ left: 17.5, top: 124.5, width: 655 }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, color: '#1a1a1a', lineHeight: 1.25, width: '100%' }}>Share progress automatically</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, color: '#4d4d4d', lineHeight: 'normal', width: '100%' }}>Weekly progress report emailed to parents: predicted board score trend, strengths, weaknesses, and revision recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WORKFLOW (Frame 39) ── */}
      <WorkflowSection />

      {/* ── DON'T GUESS (mock measure image) ── */}
      <div className="flex flex-col gap-[24px] items-center relative" style={{ width: 1442 }}>
        <div className="relative shrink-0" style={{ height: 839, width: 1328 }}>
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMockMeasure} loading="lazy" />
        </div>

        {/* ── VOICE CALL ── */}
        <div id="tutors" className="bg-white relative overflow-clip shrink-0" style={{ height: 1130, width: 1442 }}>
          {/* Heading */}
          <div className="absolute flex flex-col items-center reveal-scale" style={{ left: '50%', transform: 'translateX(-50%) translateX(-21px)', top: 347, width: 868 }}>
            <div className="flex flex-col gap-[4px] items-start text-center w-full">
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, lineHeight: 0, width: '100%' }}>
                <span style={{ lineHeight: 1.3, color: '#dd3333' }}>Voice Call</span>
                <span style={{ lineHeight: 1.3, color: '#1a1a1a' }}> with AI Tutors</span>
              </p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, color: '#333', lineHeight: 1.3, width: '100%' }}>Ask doubts instantly, and learn faster with voice-first tutoring.</p>
            </div>
          </div>

          {/* Tutor photos */}
          <div className="absolute rounded-[12px] overflow-hidden pointer-events-none" style={{ height: 272, left: 598, top: 794, width: 219 }}>
            <img alt="" className="absolute max-w-none" style={{ height: '104.99%', left: '-5.35%', top: '-2.04%', width: '110.42%' }} src={imgTutor53} loading="lazy" />
          </div>
          <div className="absolute rounded-[12px] overflow-hidden pointer-events-none" style={{ height: 225, left: 1201, top: 636, width: 181 }}>
            <img alt="" className="absolute max-w-none" style={{ height: '103.61%', left: '-3.61%', top: '-1.44%', width: '107.67%' }} src={imgTutor55} loading="lazy" />
          </div>
          <div className="absolute overflow-hidden pointer-events-none" style={{ height: 278, left: 1107, top: 86, width: 223 }}>
            <img alt="" className="absolute max-w-none" style={{ height: '103.32%', left: '-3.96%', top: '-1.66%', width: '108.29%' }} src={imgTutor56} loading="lazy" />
          </div>
          <div className="absolute rounded-[12px] overflow-hidden pointer-events-none" style={{ height: 293, left: 74, top: 568, width: 235 }}>
            <img alt="" className="absolute max-w-none" style={{ height: '103.32%', left: '-3.66%', top: '-2.19%', width: '107.7%' }} src={imgTutor58} loading="lazy" />
          </div>
          <div className="absolute rounded-[8px] overflow-hidden pointer-events-none" style={{ height: 188, left: 162, top: 158, width: 147 }}>
            <img alt="" className="absolute max-w-none" style={{ height: '102.72%', left: '-2.91%', top: '-1.03%', width: '105.54%' }} src={imgTutor59} loading="lazy" />
          </div>
          <div className="absolute overflow-hidden pointer-events-none" style={{ height: 231, left: 620, top: 64, width: 176 }}>
            <img alt="" className="absolute max-w-none" style={{ height: '103.6%', left: '-3.56%', top: '-2.2%', width: '107.51%' }} src={imgTutor57} loading="lazy" />
          </div>

          {/* Voice widget */}
          <div className="absolute bg-white overflow-clip rounded-[24px] float-widget" style={{ height: 282, left: 440, top: 454, width: 561, boxShadow: '0px 0px 8.3px 0px rgba(0,0,0,0.15)' }}>
            {/* Avatar you */}
            <div className="absolute" style={{ left: 31, top: 55, width: 70, height: 70 }}>
              <div className="absolute" style={{ inset: '-14.57%' }}>
                <img alt="" className="block max-w-none size-full" height="90.4" src={imgVoiceYou} width="90.4" />
              </div>
            </div>
            {/* Avatar AI */}
            <div className="absolute" style={{ left: 475, top: 55, width: 70, height: 70 }}>
              <div className="absolute" style={{ inset: '-11.43%' }}>
                <img alt="" className="block max-w-none size-full" height="86" src={imgVoiceAI} width="86" />
              </div>
            </div>
            {/* Live badge — pulsing dot */}
            <div className="absolute flex items-center justify-center gap-[6px] px-[16px] py-[6px] rounded-[27px]" style={{ left: '50%', transform: 'translateX(-50%)', top: 13, background: 'rgba(221,51,51,0.1)', border: '1px solid rgba(221,51,51,0.2)' }}>
              <span className="live-dot" />
              <p className="text-[#d33] text-[12px] uppercase whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>Live voice call</p>
            </div>
            {/* Waveform — animated bars */}
            <div className="absolute flex items-center justify-center gap-[6px]" style={{ left: 108, top: 59, width: 365, height: 57 }}>
              {[52, 32, 44, 52, 20, 40, 52, 28, 44, 36, 52, 24, 48, 36, 20, 44].map((h, i) => (
                <div key={i} className="waveform-bar" style={{ width: 4, height: h, animationDelay: `${(i * 0.07).toFixed(2)}s` }} />
              ))}
            </div>
            {/* Status */}
            <div className="absolute flex flex-col gap-[2px] items-center whitespace-nowrap" style={{ left: 254, top: 141 }}>
              <p className="text-[#30363f] text-[14px] text-center" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>00:24</p>
              <p className="text-[#11a939] text-[14px] flex items-center gap-[4px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}><span className="connected-dot" />connected</p>
            </div>
            {/* Labels */}
            <p className="absolute text-[#30363f] text-[14px] text-center whitespace-nowrap" style={{ left: 63.5, transform: 'translateX(-50%)', top: 132, fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>You</p>
            <p className="absolute text-[#30363f] text-[14px] text-center whitespace-nowrap" style={{ left: 509.5, transform: 'translateX(-50%)', top: 132, fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>AI Tutor</p>
            {/* Controls */}
            <div className="absolute flex flex-col gap-[12px] items-center" style={{ left: 125, top: 191, width: 299 }}>
              <div className="flex gap-[26px] items-center w-full">
                {[imgVoiceMic, imgVoiceSpk, imgVoiceUp, imgVoiceCap].map((src, i) => (
                  <div key={i} className="bg-white rounded-[41px] overflow-clip shrink-0 relative" style={{ width: 55, height: 55, border: '1px solid #f4f4f4', boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.1)' }}>
                    <div className="absolute" style={{ left: 17, top: 17, width: 20, height: 20 }}>
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={src} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-[26px] items-center text-[#515c6a] text-[12px] text-center w-full" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>
                {['Mic','Speaker','Upload','captions'].map(l => <p key={l} className="shrink-0" style={{ width: 55 }}>{l}</p>)}
              </div>
            </div>
          </div>

          {/* Vector connectors */}
          <div className="absolute" style={{ height: 159, left: 892, top: 193.5, width: 213.5 }}>
            <div className="absolute" style={{ inset: '0 -0.23%' }}>
              <img alt="" className="block max-w-none size-full" src={imgVector1} />
            </div>
          </div>
          <div className="absolute bg-white rounded-[41px] overflow-clip" style={{ left: 993, top: 253, width: 55, height: 55, boxShadow: '0px 0px 4px 0px rgba(221,51,51,0.5)' }}>
            <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translateX(-50%) translateX(0.5px) translateY(-50%) translateY(0.5px)', width: 20, height: 20 }}>
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMicBtn} />
            </div>
          </div>
          <div className="absolute" style={{ height: 180, left: 206, top: 736, width: 336 }}>
            <div className="absolute" style={{ inset: '0 -0.15% -0.28% 0' }}>
              <img alt="" className="block max-w-none size-full" src={imgVector2} />
            </div>
          </div>
          <div className="absolute bg-white rounded-[41px] overflow-clip" style={{ left: 354, top: 790, width: 55, height: 55, boxShadow: '0px 0px 4px 0px rgba(221,51,51,0.5)' }}>
            <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translateX(-50%) translateX(0.5px) translateY(-50%) translateY(0.5px)', width: 20, height: 20 }}>
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMicBtn} />
            </div>
          </div>
        </div>

        {/* ── SKETCHPAD ── */}
        <div className="bg-white flex flex-col gap-[49px] items-center overflow-clip px-[89px] py-[67px] shrink-0">
          <div className="flex flex-col items-center shrink-0" style={{ width: 868 }}>
            <div className="flex flex-col gap-[4px] items-start text-center w-full">
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, lineHeight: 0, width: '100%' }}>
                <span style={{ lineHeight: 1.3, color: '#dd3333' }}>Interactive Sketchpad </span>
                <span style={{ lineHeight: 1.3, color: '#1a1a1a' }}>for Live Doubt Solving</span>
              </p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, color: '#333', lineHeight: 1.3, width: '100%' }}>Learn step-by-step with voice guidance and visual explanations on a real-time sketchpad.</p>
            </div>
          </div>
          {/* Sketchpad card — exact Figma node 113:488 */}
          <div className="bg-white relative rounded-[24px] overflow-clip shrink-0 reveal-scale" style={{ height: 716, width: 1263, border: '6px solid #f6f7fa', boxShadow: '0px 0px 8.3px 0px rgba(0,0,0,0.15)' }}>

            {/* Status top-right */}
            <div className="absolute flex flex-col gap-[2px] items-center whitespace-nowrap" style={{ left: 1144, top: 37, fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>
              <p style={{ fontSize: 14, color: '#30363f', textAlign: 'center' }}>00:24</p>
              <p style={{ fontSize: 14, color: '#11a939', display: 'flex', alignItems: 'center', gap: 4 }}><span className="connected-dot" />connected</p>
            </div>

            {/* User pills top-left */}
            <div className="absolute flex gap-[10px] items-center" style={{ left: 21, top: 36 }}>
              {/* Isha Pillai */}
              <div className="bg-white relative rounded-[12px] overflow-clip shrink-0" style={{ height: 60, width: 210, border: '1px solid #e9e9e9' }}>
                <div className="absolute flex flex-col items-start" style={{ left: 62, top: 9, width: 135 }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#171a1c', lineHeight: 'normal', whiteSpace: 'nowrap' }}>Isha Pillai</p>
                  <div className="flex gap-[8px] items-center w-full">
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 12, color: '#00c1c1', lineHeight: 'normal', whiteSpace: 'nowrap' }}>Tutor</p>
                    <div className="relative shrink-0" style={{ width: 4, height: 4 }}>
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSketchIsha} />
                    </div>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 12, color: '#73808c', lineHeight: 'normal', whiteSpace: 'nowrap' }}>Explaning...</p>
                  </div>
                </div>
                <div className="absolute bg-[#e7e7e7] overflow-clip rounded-[26px]" style={{ left: 12, top: 9, width: 40, height: 40 }}>
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[500px] size-full" src={imgSketchRajat1} />
                </div>
              </div>
              {/* Rajat Garg */}
              <div className="bg-white relative rounded-[12px] overflow-clip shrink-0" style={{ height: 60, width: 210, border: '1px solid #e9e9e9' }}>
                <div className="absolute bg-[#e7e7e7] overflow-clip rounded-[26px]" style={{ left: 12, top: 9, width: 40, height: 40 }}>
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[500px] size-full" src={imgSketchRajat2} />
                  <div className="absolute overflow-hidden pointer-events-none rounded-[500px]" style={{ height: 40, left: -1, top: 0, width: 41 }}>
                    <img alt="" className="absolute max-w-none" style={{ height: '100.05%', left: '-42.06%', top: '-0.03%', width: '146.34%' }} src={imgSketchRajat3} />
                  </div>
                </div>
                <div className="absolute flex flex-col items-start" style={{ left: 62, top: 9, width: 100 }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#171a1c', lineHeight: 'normal', width: '100%' }}>Rajat Garg</p>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 12, color: '#73808c', lineHeight: 'normal', width: '100%' }}>Listening...</p>
                </div>
              </div>
            </div>

            {/* Toolbar panel — node 121:587, absolute at left:432 top:595 */}
            <div className="absolute bg-white overflow-clip p-[12px] rounded-[46px]" style={{ left: 432, top: 595, boxShadow: '0px 2px 8.3px 0px rgba(8,35,46,0.15), 0px 0px 15px 0px rgba(7,32,44,0.1)' }}>
              <div className="flex gap-[16px] items-center">
                {/* 5 tool buttons */}
                <div className="flex gap-[8px] items-center shrink-0">
                  {[
                    imgSketchF1,
                    imgSketchF2,
                    imgSketchF3,
                    imgSketchF4,
                    imgSketchF5,
                  ].map((src, i) => (
                    <div key={i} className="flex items-center justify-center overflow-clip p-[12px] rounded-[500px] shrink-0" style={{ background: '#f7f7f8', width: 50, height: 50 }}>
                      <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={src} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Vertical divider line */}
                <div className="flex items-center justify-center shrink-0" style={{ height: 50, width: 0 }}>
                  <div style={{ transform: 'rotate(90deg)' }}>
                    <div className="relative" style={{ height: 0, width: 50 }}>
                      <div className="absolute" style={{ inset: '-1px 0 0 0' }}>
                        <img alt="" className="block max-w-none size-full" src={imgSketchLine} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* End call button — red bg */}
                <div className="flex items-center justify-center overflow-clip p-[12px] rounded-[500px] shrink-0" style={{ background: '#ffeeec', width: 50, height: 50 }}>
                  <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSketchEnd} />
                  </div>
                </div>
              </div>
            </div>

            {/* Teal chat button — node 121:632 at left:1170 top:607 */}
            <div className="absolute flex items-center justify-center overflow-clip p-[12px] rounded-[500px]" style={{ background: '#00c1c1', left: 1170, top: 607, width: 50, height: 50 }}>
              <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSketchChat} />
              </div>
            </div>

            {/* Text content — node 121:706, exact Figma text */}
            <div className="absolute flex flex-col gap-[16px] items-start" style={{ left: 24, top: 120, width: 561, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: '#424254', lineHeight: 0 }}>
              <p className="relative shrink-0 w-full">
                <span style={{ lineHeight: 'normal' }}>Projectile Motion:</span>
                <span style={{ fontWeight: 400, lineHeight: 'normal' }}>
                  <br aria-hidden="true" />
                  Projectile motion occurs when an object is thrown or launched into the air and continues moving under the influence of gravity alone. Instead of travelling in a straight line, the object follows a curved path called a parabola. The horizontal motion keeps the object moving forward, while gravity continuously pulls it downward, creating the curved trajectory.
                </span>
              </p>
              <div className="relative shrink-0 w-full">
                <p style={{ lineHeight: 'normal', marginBottom: 0, whiteSpace: 'pre-wrap' }}>Key Characteristics:</p>
                <ul className="list-disc" style={{ paddingLeft: 24 }}>
                  {[' Horizontal velocity remains nearly constant', ' Vertical velocity changes due to gravity', ' The path of motion forms a parabola', ' Commonly seen in sports, physics experiments, and everyday motion'].map(t => (
                    <li key={t} style={{ marginBottom: 0 }}><span style={{ fontWeight: 400, lineHeight: 'normal' }}>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="relative shrink-0 w-full">
                <p style={{ lineHeight: 'normal', marginBottom: 0, whiteSpace: 'pre-wrap' }}>Real-Life Examples:</p>
                <ul className="list-disc" style={{ paddingLeft: 24 }}>
                  {[' A basketball shot toward the hoop', ' A cricket ball hit into the air', ' Water flowing from a fountain', ' Fireworks launched into the sky'].map(t => (
                    <li key={t} style={{ marginBottom: 0 }}><span style={{ fontWeight: 400, lineHeight: 'normal' }}>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Graph image — node 121:709 */}
            <div className="absolute overflow-hidden pointer-events-none" style={{ height: 314, left: 699, top: 135, width: 524 }}>
              <img alt="" className="absolute max-w-none" style={{ height: '243.24%', left: '-134.82%', top: '-108.11%', width: '259.11%' }} src={imgSketchGraph} />
            </div>
          </div>
        </div>

        {/* ── SMART LEARNING TOOLS ── */}
        <div id="tools" className="overflow-clip shrink-0 w-full reveal" style={{ background: '#fff', padding: '103px 82px 80px' }}>
          <div className="flex flex-col gap-[30px] items-center" style={{ width: 1279, margin: '0 auto' }}>
            {/* Header */}
            <div className="flex flex-col gap-[17px] items-center shrink-0" style={{ width: 868 }}>
              <div className="flex items-center justify-center px-[16px] py-[8px] rounded-[27px] shrink-0" style={{ background: 'rgba(221,51,51,0.1)', border: '1px solid rgba(221,51,51,0.2)' }}>
                <p className="text-[#d33] text-[14px] uppercase whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>Smart learning tools</p>
              </div>
              <div className="flex flex-col gap-[4px] items-start text-center w-full">
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, lineHeight: 0, color: '#1a1a1a', width: '100%' }}>
                  <span style={{ lineHeight: 1.3 }}>Everything you need to </span>
                  <span style={{ lineHeight: 1.3, color: '#dd3333' }}>study smarter</span>
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, color: '#333', lineHeight: 1.3, width: '100%' }}>AI-powered tools designed to simplify concepts, speed up revision, and help students prepare more effectively for board exams.</p>
              </div>
            </div>
            {/* Tool cards */}
            <div className="flex flex-col gap-[12px] items-start shrink-0 w-full">
              {[
                [
                  { img: imgTool42, tagBg: 'rgba(221,51,51,0.1)', tagColor: '#d33', tag: 'Instant revision', title: 'Key Point Extractor', desc: 'Extract the most important concepts, formulas, definitions, and exam-focused notes from any chapter within seconds.' },
                  { img: imgTool43, tagBg: 'rgba(221,193,51,0.1)', tagColor: '#ddc133', tag: 'QUICK SUMMARY', title: 'Smart Summarizer', desc: 'Convert long chapters into concise summaries designed for quick revision before exams and mock tests.' },
                  { img: imgTool44, tagBg: 'rgba(51,17,193,0.1)', tagColor: '#4a25e7', tag: 'visual learning', title: 'Flowchart Generator', desc: 'Turn lengthy chapters into structured visual flowcharts that make difficult topics easier to understand and revise.' },
                ],
                [
                  { img: imgTool45, tagBg: 'rgba(17,169,57,0.1)', tagColor: '#11a939', tag: 'AI VISUAL EXPLAINER', title: 'Concept Visualizer', desc: 'Understand difficult concepts using AI-generated diagrams, visual explanations, and simplified breakdowns.' },
                  { img: imgTool46, tagBg: 'rgba(51,173,221,0.1)', tagColor: '#33addd', tag: 'SMART CONNECTIONS', title: 'Mind Map Generator', desc: 'Transform complete chapters into connected mind maps for better understanding, memory retention, and faster recall.' },
                  { img: imgTool47, tagBg: 'rgba(193,99,17,0.1)', tagColor: '#c16311', tag: 'GUIDED SOLUTIONS', title: 'Step-by-Step Problem Solver', desc: 'Get detailed step-by-step solutions with proper explanations for numerical and conceptual problems.' },
                ]
              ].map((row, ri) => (
                <div key={ri} className={`flex gap-[14px] items-center shrink-0 w-full ${ri === 0 ? 'reveal-left' : 'reveal-right'}`}>
                  {row.map(({ img, tagBg, tagColor, tag, title, desc }) => (
                    <div key={title} className="bg-white card-hover flex flex-1 flex-col items-start min-w-0 overflow-clip p-[16px] relative rounded-[12px]" style={{ boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.15)' }}>
                      <div className="flex flex-col gap-[24px] items-start w-full">
                        <div className="flex items-start justify-between w-full">
                          <div className="relative shrink-0" style={{ width: 60, height: 60 }}>
                            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} loading="lazy" />
                          </div>
                          <div className="flex items-center justify-center px-[8px] py-[4px] rounded-[18px] shrink-0" style={{ background: tagBg }}>
                            <p className="text-[12px] uppercase whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: tagColor, lineHeight: 1.3 }}>{tag}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[4px] items-start w-full">
                          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: '#1a1a1a', lineHeight: 1.3, width: '100%' }}>{title}</p>
                          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 12, color: 'rgba(26,26,26,0.8)', lineHeight: 'normal', width: '100%' }}>{desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <div className="bg-white overflow-clip shrink-0 reveal" style={{ width: 1440, padding: '80px 134px' }}>
          <div className="flex flex-col gap-[60px] items-center" style={{ width: 1172, margin: '0 auto' }}>
            <div className="flex flex-col gap-[12px] items-center shrink-0" style={{ width: 868 }}>
              <div className="flex items-center justify-center px-[16px] py-[8px] rounded-[27px] shrink-0" style={{ background: 'rgba(221,51,51,0.1)', border: '1px solid rgba(221,51,51,0.2)' }}>
                <p className="text-[#d33] text-[14px] uppercase whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.3 }}>Success journeys</p>
              </div>
              <div className="flex flex-col gap-[4px] items-start leading-[1.3] text-center w-full">
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 36, color: '#1a1a1a', width: '100%' }}>Loved by Outstanding Students and Encouraging Parents</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, color: '#333', width: '100%' }}>See verified score improvements accomplished by Class 10-12 candidates utilizing our adaptive curriculum analytics.</p>
              </div>
            </div>
            <div className="flex gap-[24px] items-center shrink-0 w-full">
              {[
                { bg: 'linear-gradient(180deg,#fff4f4 0%,#ffd9d9 100%)', roleColor: '#dd3333', role: 'Student', text: '“The AI mock tests feel exactly like real CBSE board exams. After every test, I get detailed feedback on where I lost marks and how to improve. My confidence has improved a lot.”', name: 'Arjun Mehta', sub: 'Class 10 Student' },
                { bg: '#fff', roleColor: '#1a1a1a', role: 'Parent', text: '“The mock test analysis and weekly reports helped us track our child’s improvement properly. We can now understand strengths, weaknesses, and overall preparation.”', name: 'Pooja Mehta', sub: 'Parent of Class 10 Student' },
                { bg: 'linear-gradient(180deg,#fff4f4 0%,#ffd9d9 100%)', roleColor: '#dd3333', role: 'Student', text: '“The rubric-based answer evaluation is my favorite feature. It checks every step just like a real examiner and helps me write better long answers for boards.”', name: 'Ananya Sharma', sub: 'Class 12 Student' },
                { bg: '#fff', roleColor: '#1a1a1a', role: 'Parent', text: '“The board score prediction feature gives us confidence about our child’s readiness for exams. The platform feels much more advanced than regular coaching apps.”', name: 'Amit Sharma', sub: 'Parent of Class 12 Student' },
              ].map(({ bg, roleColor, role, text, name, sub }, i) => (
                <div key={i} className="tcard-hover relative overflow-clip rounded-[20px] shrink-0 reveal-scale" style={{ background: bg, border: '4px solid white', height: 363, width: 275, boxShadow: '0px 0px 24.2px 0px rgba(221,51,51,0.15)', transitionDelay: `${i * 0.15}s` }}>
                  {/* Quote icon */}
                  <div className="absolute flex items-center justify-center" style={{ left: i === 0 ? 15 : 16, top: i === 0 ? 23 : 29 }}>
                    <div style={{ transform: 'rotate(180deg)' }}>
                      <div className="flex items-center relative">
                        <div className="relative shrink-0" style={{ width: 24, height: 24, marginRight: -4 }}>
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComma} />
                        </div>
                        <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComma} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Text */}
                  <p className="absolute text-black text-[14px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 'normal', left: i === 0 ? 15 : 16, top: i === 0 ? 64 : 70, width: 235 }}>{text}</p>
                  {/* User */}
                  <div className="absolute flex gap-[8px] items-center" style={{ left: i === 0 ? 15 : 16, top: i === 0 ? 280 : 286 }}>
                    <div className="relative rounded-[500px] shrink-0" style={{ width: 40, height: 40 }}>
                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[500px]">
                        <img alt="" className="absolute max-w-none" style={{ height: '263.85%', left: '-78.37%', top: '-8.73%', width: '254.07%' }} src={imgAvatar30} />
                      </div>
                    </div>
                    <div className="flex flex-col items-start leading-[normal]">
                      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 14, color: '#1a1a1a' }}>{name}</p>
                      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 12, color: 'rgba(26,26,26,0.8)' }}>{sub}</p>
                    </div>
                  </div>
                  {/* Role badge */}
                  <p className="absolute text-[12px] text-center whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, lineHeight: 1.3, color: roleColor, left: i < 2 ? 225.5 : 226.5, transform: 'translateX(-50%)', top: i === 0 ? 27 : 31 }}>{role}</p>
                  {/* Inner glow */}
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit]" style={{ boxShadow: 'inset 0px 0px 15.2px 0px rgba(255,255,255,0.5)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA IMAGE ── */}
        <div id="get-started" className="relative overflow-clip shrink-0 w-full reveal-scale cursor-pointer" style={{ height: 750 }}>
          <div onClick={() => setShowLoginModal(true)}>
            <div className="absolute rounded-[32px] overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl" style={{ height: 536, left: '50%', transform: 'translateX(-50%)', top: 107, width: 986 }}>
              <img alt="Get Started" className="absolute max-w-none" style={{ height: '108.58%', left: '-2.64%', top: '-4.29%', width: '104.88%' }} src={imgCTABg} loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-[24px] p-8 w-full max-w-[400px] relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold" onClick={() => setShowLoginModal(false)}>&times;</button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-[#dd3333]/10 rounded-[16px] text-[#dd3333] flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Macmillan.AI</h2>
              <p className="text-sm text-gray-500">Sign in to continue your CBSE preparation</p>
            </div>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-left">Email Address</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <input type="email" placeholder="student@cbse2026.in" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#dd3333] focus:bg-white transition-all text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-left">Password</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#dd3333] focus:bg-white transition-all text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#dd3333] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#c02b2b] transition-all flex items-center justify-center gap-2">
                Enter Platform <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
