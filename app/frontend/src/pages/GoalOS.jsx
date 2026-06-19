import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/* ── Scroll-reveal hook ── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, vis];
}

function Reveal({ delay = 0, children, style = {} }) {
  const [ref, vis] = useReveal(delay);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s ease', ...style }}>{children}</div>;
}

/* ── SVG Icons ── */
const IDoc = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IReceipt = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2z"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>;
const IWallet = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 14h2"/><path d="M2 10h20"/></svg>;
const IBrain = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-2a3 3 0 0 0 0-6V6a3 3 0 0 0-3-3z"/><path d="M12 3v18"/></svg>;
const IChat = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IDB = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
const ICPU = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8"/><line x1="4" y1="9" x2="2" y2="9"/><line x1="4" y1="15" x2="2" y2="15"/><line x1="22" y1="9" x2="20" y2="9"/><line x1="22" y1="15" x2="20" y2="15"/><line x1="9" y1="4" x2="9" y2="2"/><line x1="15" y1="4" x2="15" y2="2"/><line x1="9" y1="22" x2="9" y2="20"/><line x1="15" y1="22" x2="15" y2="20"/></svg>;
const ICloud = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>;

const steps = [
  { n:'01', t:'User describes the goal', d:'"Merge these PDFs." "Create an invoice." "Show me last month\'s sales." Speak it. Type it. Whisper it.' },
  { n:'02', t:'GBC interprets intent', d:'The Goal-Based Computing engine understands what you want, plans the right tools, decides the workflow.' },
  { n:'03', t:'GoalOS generates the UI', d:'A minimal, task-specific interface materializes — only what is needed, nothing more.' },
  { n:'04', t:'Task gets done', d:'You complete the goal with zero learning curve. No menus to navigate. No tutorials to read.' },
  { n:'05', t:'Interface disappears', d:'Done. No clutter, no maintenance, no updates — it\'s gone until you need it again.' },
];

const examples = [
  { Icon: IDoc,     say: '"Merge PDFs."',      pills: ['1. Upload','2. Arrange','3. Merge','4. Download'] },
  { Icon: IReceipt, say: '"Create invoice."',  pills: ['1. Client info','2. Products','3. Tax','4. Generate PDF'] },
  { Icon: IWallet,  say: '"Track expenses."',  pills: ['1. Input','2. Categories','3. Dashboard','4. Reports'] },
];

const features = [
  { Icon: IBrain, t: 'Adaptive Intelligence',    d: 'GoalOS observes, remembers, and evolves with your behavior — automatically prioritizing the workflows most relevant to you. No settings. No configuration.' },
  { Icon: IChat,  t: 'Conversational Computing', d: '"Organize my documents." "Find last month\'s report." "Show sales trends." Talk to your computer the way you talk to a colleague.' },
  { Icon: IDB,    t: 'Personal Knowledge Layer', d: 'A deep memory across all your activities. "What presentation did I make for XYZ client?" "Find the file with customer revenue data."' },
];

const tableRows = [
  ['TARGET USER',    'Anyone',        'Developers',        'Everyone'],
  ['INPUT',          'Menus & Clicks','Code & Prompts',     'Natural Language'],
  ['OUTPUT',         'Permanent App', 'Generated Code',     'Task Results'],
  ['INTERFACE',      'Fixed',         'Semi-permanent',     'Temporary & Disposable'],
  ['LEARNING CURVE', 'High',          'Medium',             'Zero'],
  ['PERSONALIZATION','None',          'Minimal',            'Deep & Continuous'],
];

const vision = [
  ['Humans learn software.',   'Software learns humans.'],
  ['Apps are permanent.',      'Interfaces are temporary.'],
  ['Tasks need tools.',        'Goals need only words.'],
  ['Technology is complex.',   'Technology is invisible.'],
];

const audience = [
  ['01','Business Owners','Invoices, reports, dashboards — zero software knowledge.'],
  ['02','Students','Notes, presentations, schedules — effortlessly.'],
  ['03','Freelancers','Documents, clients, finances — through conversation.'],
  ['04','Everyday Users','Any digital task — without learning any software.'],
  ['05','Enterprises','Adaptive tools for non-technical staff — no training costs.'],
];

const P = '0 4rem'; // section padding

export default function GoalOS() {
  const [heroVis, setHeroVis] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVis(true), 100); }, []);
  const hf = (d=0) => ({ opacity: heroVis?1:0, transform: heroVis?'translateY(0)':'translateY(28px)', transition:`opacity .75s ease ${d}s,transform .75s ease ${d}s` });

  return (
    <div className="page-content">
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', paddingTop:'7rem', paddingBottom:'4rem' }}>
        <div style={{ padding: P, maxWidth:'100%' }}>
          <div style={{ ...hf(0), display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2rem' }}>
            <div style={{ width:'2rem', height:'2px', background:'#2563eb', borderRadius:'2px' }} />
            <span style={{ fontFamily:'Outfit,sans-serif', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#2563eb' }}>
              Product · Now in Development
            </span>
          </div>

          {/* Headline — Goal (serif italic) + OS (bold blue glow) */}
          <h1 style={{ ...hf(0.1), fontSize:'clamp(5rem,14vw,12rem)', fontWeight:300, lineHeight:0.9, letterSpacing:'-0.05em', marginBottom:'2rem' }}>
            <span style={{ fontFamily:'Playfair Display,Georgia,serif', fontStyle:'italic', fontWeight:400, color:'#fff' }}>Goal</span>
            <span style={{
              fontFamily:'Outfit,sans-serif', fontWeight:700, color:'#2563eb',
              textShadow:'0 0 60px rgba(37,99,235,0.6), 0 0 120px rgba(37,99,235,0.3)',
              letterSpacing:'-0.04em',
            }}>OS</span>
          </h1>

          <div style={hf(0.2)}>
            <p style={{ fontSize:'1.2rem', color:'#fff', fontFamily:'Outfit,sans-serif', fontWeight:400, maxWidth:'600px', marginBottom:'0.5rem', lineHeight:1.4 }}>
              The world's first <strong>Adaptive Goal-Driven Computing Platform.</strong>
            </p>
            <p style={{ fontSize:'1rem', color:'#52525b', fontFamily:'Outfit,sans-serif', marginBottom:'0.75rem' }}>
              Not an OS. Not an app builder. Not a developer tool.
            </p>
            <p style={{ fontSize:'0.95rem', color:'#71717a', maxWidth:'520px', lineHeight:1.8, marginBottom:'2.5rem' }}>
              A universal task-execution environment powered by AI — designed for every human, regardless of technical skill.
            </p>
            <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
              <Link to="/waitlist" className="btn-primary" data-testid="goalos-hero-waitlist" style={{ fontSize:'0.9rem', padding:'0.75rem 1.6rem' }}>Join the waitlist →</Link>
              <a href="#how-it-works" className="btn-secondary" data-testid="goalos-hero-how" style={{ fontSize:'0.9rem', padding:'0.75rem 1.6rem' }}>How it works</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }}>
            <div>
              <div className="label-line"><span className="label-tag">The Problem</span></div>
              <h2 style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:600, letterSpacing:'-0.04em', margin:'1rem 0', lineHeight:1.05 }}>Today's model<br />is broken.</h2>
            </div>
            <div className="dark-card" style={{ padding:'2.5rem' }}>
              <div style={{ fontFamily:'Outfit,sans-serif', fontSize:'0.9rem', color:'#52525b', padding:'1rem 1.25rem', background:'rgba(255,255,255,0.02)', borderRadius:'0.5rem', letterSpacing:'0.02em', marginBottom:'1.5rem' }}>
                need → find software → learn software → adapt → perform task → result
              </div>
              <p style={{ fontSize:'0.9rem', color:'#71717a', lineHeight:1.85 }}>
                Every app has its own interface, workflow, installation, and learning curve. The user is a <em style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#a1a1aa' }}>slave</em> to the software — especially non-technical everyday users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How GBC Works ── */}
      <section className="section" id="how-it-works">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div className="label-line"><span className="label-tag">How GBC Works</span></div>
          <h2 style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:600, letterSpacing:'-0.04em', margin:'1rem 0 4rem', lineHeight:1.05 }}>
            Five steps. Zero learning.<br />Infinite goals.
          </h2>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ display:'grid', gridTemplateColumns:'100px 1fr', gap:'2rem', padding:'2.5rem 0', borderBottom:'1px solid rgba(255,255,255,0.05)', alignItems:'start' }}>
                <div style={{ fontFamily:'Outfit,sans-serif', fontSize:'3rem', fontWeight:200, color:'rgba(37,99,235,0.35)', letterSpacing:'-0.05em', lineHeight:1 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize:'1.1rem', fontWeight:600, color:'#fff', marginBottom:'0.6rem', fontFamily:'Outfit,sans-serif' }}>{s.t}</div>
                  <p style={{ fontSize:'0.9rem', color:'#71717a', lineHeight:1.85 }}>{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Live Examples ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div className="label-line"><span className="label-tag">Live Examples</span></div>
          <h2 style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:600, letterSpacing:'-0.04em', margin:'1rem 0 3.5rem', lineHeight:1.05 }}>Say it. GoalOS builds it.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
            {examples.map(({ Icon, say, pills }, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="dark-card" style={{ padding:'2.5rem', height:'100%' }}>
                  <div style={{ marginBottom:'1.5rem' }}><Icon /></div>
                  <h3 style={{ fontSize:'1.4rem', fontFamily:'Playfair Display,serif', fontStyle:'italic', fontWeight:400, color:'#fff', marginBottom:'1.75rem', lineHeight:1.2 }}>{say}</h3>
                  <div className="label-tag" style={{ marginBottom:'1rem' }}>Generates</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                    {pills.map(p => <span key={p} className="workflow-pill">{p}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
            {features.map(({ Icon, t, d }, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="glass-card" style={{ padding:'2.5rem', height:'100%' }}>
                  <div style={{ marginBottom:'1.5rem', color:'#fff' }}><Icon /></div>
                  <div style={{ fontSize:'1.1rem', fontWeight:600, color:'#fff', marginBottom:'0.85rem', fontFamily:'Outfit,sans-serif' }}>{t}</div>
                  <p style={{ fontSize:'0.875rem', color:'#71717a', lineHeight:1.85 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div className="label-line"><span className="label-tag">GBC Hybrid Architecture</span></div>
          <h2 style={{ fontSize:'clamp(2.2rem,4.5vw,3.5rem)', fontWeight:600, letterSpacing:'-0.04em', margin:'1rem 0 3.5rem', lineHeight:1.1 }}>
            Local speed. Cloud reasoning.<br />Invisible orchestration.
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'1.5rem' }}>
            {[{
              Icon: ICPU, side:'LOCAL LAYER', sub:'On your device.',
              items:['Fast, low-latency operations','Privacy-sensitive tasks stay private','Instant context retrieval'],
              accent:'rgba(37,99,235,0.08)', border:'rgba(37,99,235,0.2)',
            },{
              Icon: ICloud, side:'CLOUD LAYER', sub:'For heavy thinking.',
              items:['Complex multi-step reasoning','Dynamic UI generation','Advanced AI planning'],
              accent:'rgba(255,255,255,0.02)', border:'rgba(255,255,255,0.07)',
            }].map((box, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ padding:'2.5rem', borderRadius:'1rem', border:`1px solid ${box.border}`, background:box.accent }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.85rem', marginBottom:'1.75rem' }}>
                    <div style={{ color:'#fff' }}><box.Icon /></div>
                    <div>
                      <div className="label-tag">{box.side}</div>
                      <div style={{ fontSize:'1.25rem', fontWeight:500, color:'#fff', fontFamily:'Outfit,sans-serif', marginTop:'0.25rem' }}>{box.sub}</div>
                    </div>
                  </div>
                  {box.items.map(it => (
                    <div key={it} style={{ display:'flex', alignItems:'center', gap:'0.75rem', fontSize:'0.9rem', color:'#a1a1aa', padding:'0.75rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color:'#2563eb', flexShrink:0 }}>—</span>{it}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign:'center', fontSize:'0.82rem', color:'#3f3f46', fontFamily:'Outfit,sans-serif' }}>
            GBC automatically decides which layer handles each request — you never think about it.
          </p>
        </div>
      </section>

      {/* ── Audience ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div className="label-line"><span className="label-tag">Who It's For</span></div>
          <h2 style={{ fontSize:'clamp(2.2rem,4.5vw,3.5rem)', fontWeight:600, letterSpacing:'-0.04em', margin:'1rem 0 3rem', lineHeight:1.1 }}>
            Everyone who's ever fought with software.
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'1rem' }}>
            {audience.map(([n,title,desc]) => (
              <Reveal key={n}>
                <div className="dark-card" style={{ padding:'1.75rem' }}>
                  <div style={{ fontSize:'2rem', fontWeight:200, color:'rgba(37,99,235,0.4)', fontFamily:'Outfit,sans-serif', letterSpacing:'-0.04em', marginBottom:'0.75rem' }}>{n}</div>
                  <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#fff', marginBottom:'0.5rem', fontFamily:'Outfit,sans-serif' }}>{title}</div>
                  <p style={{ fontSize:'0.8rem', color:'#71717a', lineHeight:1.7 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div className="label-line"><span className="label-tag">VS. Everything Else</span></div>
          <h2 style={{ fontSize:'clamp(2.2rem,4.5vw,3.5rem)', fontWeight:600, letterSpacing:'-0.04em', margin:'1rem 0 3rem', lineHeight:1.1 }}>
            A new category needs<br />a new comparison.
          </h2>
          <div style={{ borderRadius:'1rem', overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)' }}>
            <table className="comparison-table" style={{ width:'100%' }}>
              <thead>
                <tr style={{ background:'rgba(255,255,255,0.02)' }}>
                  <th style={{ width:'22%' }}>Factor</th>
                  <th>Traditional</th>
                  <th>AI App Builders</th>
                  <th style={{ background:'rgba(37,99,235,0.12)', color:'#fff', borderLeft:'1px solid rgba(37,99,235,0.25)' }}>GoalOS</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(([factor, trad, ai, goalos]) => (
                  <tr key={factor}>
                    <td className="factor">{factor}</td>
                    <td>{trad}</td>
                    <td>{ai}</td>
                    <td style={{ background:'rgba(37,99,235,0.06)', color:'#fff', fontWeight:600, borderLeft:'1px solid rgba(37,99,235,0.15)', fontFamily:'Outfit,sans-serif', fontSize:'0.9rem' }}>{goalos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Vision / Today vs GoalOS ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem' }}>
            <div>
              <div className="label-tag" style={{ marginBottom:'2rem' }}>Today</div>
              {vision.map(([t]) => (
                <div key={t} style={{ fontSize:'1.15rem', color:'#3f3f46', padding:'1.25rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)', fontFamily:'Outfit,sans-serif', textDecoration:'line-through' }}>{t}</div>
              ))}
            </div>
            <div>
              <div className="label-tag" style={{ marginBottom:'2rem', color:'#2563eb' }}>With GoalOS</div>
              {vision.map(([, g], i) => (
                <Reveal key={g} delay={i * 80}>
                  <div style={{ fontSize:'1.15rem', color:'#fff', fontWeight:500, padding:'1.25rem 0', borderBottom:'1px solid rgba(255,255,255,0.05)', fontFamily:'Outfit,sans-serif' }}>{g}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section">
        <div style={{ padding:P, maxWidth:'100%' }}>
          <div style={{ padding:'4rem', textAlign:'center', borderRadius:'1rem', border:'1px solid rgba(37,99,235,0.15)', background:'rgba(37,99,235,0.04)' }}>
            <div style={{ fontSize:'1.5rem', marginBottom:'1rem', color:'#2563eb' }}>✦</div>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:600, letterSpacing:'-0.04em', marginBottom:'1rem', lineHeight:1.1 }}>
              Be among the first to compute by goal.
            </h2>
            <p style={{ fontSize:'0.95rem', color:'#71717a', maxWidth:'480px', margin:'0 auto 2.5rem', lineHeight:1.8 }}>
              We're inviting early users in waves. Reserve your place — and help shape what computing becomes.
            </p>
            <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/waitlist" className="btn-primary" style={{ fontSize:'0.9rem', padding:'0.75rem 1.6rem' }} data-testid="goalos-cta-waitlist">Join the waitlist →</Link>
              <Link to="/about" className="btn-secondary" style={{ fontSize:'0.9rem', padding:'0.75rem 1.6rem' }} data-testid="goalos-cta-founder">Meet the founder</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media(max-width:1024px){
          section [style*="repeat(5,1fr)"]{grid-template-columns:1fr 1fr!important;}
          section [style*="repeat(3,1fr)"]{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:768px){
          section [style*="1fr 1fr"]{grid-template-columns:1fr!important;}
          section [style*="repeat(3,1fr)"]{grid-template-columns:1fr!important;}
          section [style*="padding: 0 4rem"],[style*="padding:0 4rem"]{padding:0 1.5rem!important;}
        }
      `}</style>
    </div>
  );
}
