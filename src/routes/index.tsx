import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

export const Route = createFileRoute('/')({ component: DeskPage })

// ─── Verbs ────────────────────────────────────────────────────────────────────
const VERBS = [
  { id: 'give',  label: 'Give'    },
  { id: 'pick',  label: 'Pick up' },
  { id: 'use',   label: 'Use'     },
  { id: 'open',  label: 'Open'    },
  { id: 'look',  label: 'Look at' },
  { id: 'push',  label: 'Push'    },
  { id: 'close', label: 'Close'   },
  { id: 'pull',  label: 'Pull'    },
  { id: 'talk',  label: 'Talk to' },
] as const
type VerbId = typeof VERBS[number]['id']
const VERB_GRID: VerbId[][] = [
  ['give', 'pick', 'use'],
  ['open', 'look', 'push'],
  ['close','pull', 'talk'],
]

// ─── Cabin objects ────────────────────────────────────────────────────────────
type ObjMode = 'fullpage' | 'parchment' | 'flavour'
const CABIN_OBJECTS = [
  { id:'log',      name:"the captain's log",    preferredVerb:'open' as VerbId, mode:'fullpage'  as ObjMode, contentKey:'writing'     },
  { id:'chart',    name:"the navigation chart",  preferredVerb:'look' as VerbId, mode:'fullpage'  as ObjMode, contentKey:'work'        },
  { id:'porthole', name:"the porthole",          preferredVerb:'look' as VerbId, mode:'fullpage'  as ObjMode, contentKey:'photography'  },
  { id:'mug',      name:"the pewter mug",        preferredVerb:'pick' as VerbId, mode:'parchment' as ObjMode, contentKey:'now'         },
  { id:'letter',   name:"the letter",            preferredVerb:'open' as VerbId, mode:'parchment' as ObjMode, contentKey:'about'       },
  { id:'books',    name:"the books",             preferredVerb:'pick' as VerbId, mode:'parchment' as ObjMode, contentKey:'reading'     },
  { id:'chest',    name:"the sea chest",         preferredVerb:'open' as VerbId, mode:'parchment' as ObjMode, contentKey:'uses'        },
  { id:'parrot',   name:"the parrot",            preferredVerb:'talk' as VerbId, mode:'flavour'   as ObjMode, contentKey:null          },
  { id:'lantern',  name:"the lantern",           preferredVerb:'look' as VerbId, mode:'flavour'   as ObjMode, contentKey:null          },
  { id:'wheel',    name:"the bicycle wheel",     preferredVerb:'push' as VerbId, mode:'flavour'   as ObjMode, contentKey:null          },
  { id:'quill',    name:"the quill",             preferredVerb:'use'  as VerbId, mode:'flavour'   as ObjMode, contentKey:null          },
]

// ─── Verb texts per object ────────────────────────────────────────────────────
const VERB_TEXTS: Record<string, Partial<Record<VerbId, string>>> = {
  log: {
    look:  "A leather-bound log, ink not yet dry. The captain writes in here when she has something to say.",
    open:  "You crack the log open. The pages smell of mahogany and mild regret.",
    pick:  "The log stays with the desk. The desk stays with the cabin. The cabin stays at sea.",
    push:  "The log is not for pushing.",
    pull:  "You drag the log across the desk. It says nothing about this.",
    use:   "Used on the career — it's already in there.",
    talk:  "You read the most recent entry aloud. Reviewer 2 is mentioned by name. The lantern flickers in agreement.",
    give:  "You would not part with this for the Crown itself.",
    close: "You close it. Ink still damp.",
  },
  chart: {
    look:  "Three charts pinned with brass tacks. Each marks a voyage already undertaken — and one still under way. Some of the islands are named after acronyms.",
    open:  "The largest chart unrolls across the whole desk. It is more interesting than the desk.",
    pick:  "The chart is pinned. You'd tear the parchment. You leave it.",
    push:  "You push the corner. The whole desk groans.",
    pull:  "You pull a tack out. Then you put it back, ashamed.",
    use:   "Used on a globe, perhaps. The cabin does not contain a globe.",
    talk:  "You ask the chart where you are. It declines to answer.",
    give:  "Charts cannot be gifted. They must be earned, or stolen.",
    close: "It doesn't close, exactly. You push the curl flat.",
  },
  porthole: {
    look:  "A brass porthole. Outside: a moon, a sea, the lights of a city the captain may or may not still call home.",
    open:  "You open the porthole. Salt and city air come in. The lantern dances.",
    pick:  "It is bolted to the hull. You'd take the ship with it.",
    push:  "You push the glass. It is glass. It declines.",
    pull:  "You pull it shut against the spray.",
    use:   "Used with the spyglass, you can see the bridges from here.",
    talk:  "You speak to the sea. The sea answers in waves. Big enough.",
    give:  "The view is not yours to give.",
    close: "You close the porthole. The air goes still.",
  },
  mug: {
    look:  "A pewter mug. Cold tea, again. The captain's relationship with the kettle is volatile.",
    open:  "It's already open.",
    pick:  "You pick it up. Heavier than expected, the way grief is heavier than expected. You put it down.",
    push:  "You nudge it. Tea sloshes. You apologise to it.",
    pull:  "You drag the mug to a new spot. The ring stays. There are nine rings now.",
    use:   "Drink it? It's cold. Use it on a coaster, maybe. But there are no coasters at sea.",
    talk:  "You ask the mug how it's holding up. It says: cold.",
    give:  "You'd give the tea to almost anyone. The mug stays.",
    close: "A mug has no lid. It is, in this sense, maximally open.",
  },
  letter: {
    look:  "A letter, propped against the inkwell. Addressed to a visitor. The handwriting is neat, which suggests revision.",
    open:  "You open the letter. It begins: 'Hi. If you found this site, you probably know me, or you're a recruiter, or you got lost. All three are welcome.'",
    pick:  "You pick it up. It smells of coffee and south London.",
    push:  "The letter tilts. You lean it back.",
    pull:  "You pull it toward you. The wax seal holds.",
    use:   "Used as a bookmark, perhaps. But you'd lose your place.",
    talk:  "You read it aloud to the cabin. The parrot nods.",
    give:  "It was written for a visitor. You are the visitor.",
    close: "You fold the letter and put it back. The words don't un-read.",
  },
  books: {
    look:  "A stack of books, mostly statistical, one suspiciously romantic. The captain reads widely and without guilt.",
    open:  "You open the top one. Bayesian priors look back at you.",
    pick:  "You pick one up. It is heavier than it looks, which is the nature of evidence.",
    push:  "You push the stack. It holds. Years of practice.",
    pull:  "You pull the bottom one. The stack wobbles. You panic. It holds.",
    use:   "Used as ballast: perhaps. As reading material: yes.",
    talk:  "You address the books collectively. The Bayesian volume begins first. It always does.",
    give:  "You'd lend one. Not the Tufte. Never the Tufte.",
    close: "You close the one you had open. The page is lost. It will be found.",
  },
  chest: {
    look:  "A worn oak chest, banded in iron. The captain's gear and instruments, in various states of charge.",
    open:  "You lift the lid. A MacBook Pro, a Fujifilm X-T5, a set of R scripts that have not been wrong yet.",
    pick:  "It weighs more than your career. You leave it where it is.",
    push:  "It does not move. It is full of equipment.",
    pull:  "You drag it half an inch. Your back disagrees. You stop.",
    use:   "As a footrest — no. That would crush the laptop.",
    talk:  "The chest does not talk. The tools inside, however, make constant demands.",
    give:  "You would sooner give an organ. (You have two kidneys; only one X-T5.)",
    close: "You close the lid. Everything inside continues to draw power.",
  },
  parrot: {
    look:  "A small green parrot on a perch, pretending to be asleep. It is not asleep. It is judging your prose.",
    open:  "You do not open the parrot. That would be a crime.",
    pick:  "You reach toward the parrot. It opens one eye. You retract your hand.",
    push:  "You'd lose a finger.",
    pull:  "See above.",
    use:   "Used as a peer reviewer, the parrot is harsh but fair. Mostly harsh.",
    talk:  "You say hello. The parrot says: 'REVIEWER TWO'. You did not teach it that. You suspect the captain did.",
    give:  "You give the parrot a sunflower seed. It accepts. You are now in its will.",
    close: "The parrot closes its eyes, pretending sleep. The performance is unconvincing.",
  },
  lantern: {
    look:  "A brass lantern on a chain. The flame inside has the nervous quality of someone who has read the safety regulations and doesn't fully trust them.",
    open:  "You open the glass. The flame leans toward you, gratefully.",
    pick:  "You take the lantern off its hook. The cabin gets shadowy. You hang it back.",
    push:  "You push. It swings. Shadows lurch. You stop.",
    pull:  "You pull the chain. The lantern goes out. Then it comes back on. Magic.",
    use:   "Use it on something darker than itself. The whole sea, perhaps.",
    talk:  "You speak to the flame. It crackles, which you take as agreement.",
    give:  "Without it you would walk into the desk in the dark. No.",
    close: "You close the glass. The flame dims, then recovers.",
  },
  wheel: {
    look:  "A bicycle wheel, propped in the corner. Curious cargo for a ship's cabin. The captain does not explain.",
    open:  "It is a wheel. It does not open.",
    pick:  "You pick the wheel up. It spins, of its own accord, in your hand. You set it down.",
    push:  "You spin the wheel. It ticks softly until it forgets why.",
    pull:  "You pull. The wheel comes free of the wall. You panic. You replace it.",
    use:   "Used here, it becomes a sculpture.",
    talk:  "You ask the wheel where you should go. It says: outside. Where else.",
    give:  "You'd give it back to the bike it came from. The bike is not at sea.",
    close: "The wheel is already as closed as a circle can be.",
  },
  quill: {
    look:  "A goose quill and a stoppered inkwell. The desk's working ensemble.",
    open:  "The inkwell unstoppers with a soft clop. You restopper it before catastrophe.",
    pick:  "You pick up the quill. It is lighter than it should be, given what it has been used to write.",
    push:  "You push the quill. It rolls in a small circle, like a confused compass needle.",
    pull:  "You pull the inkwell closer. Black drops on the parchment. Damn.",
    use:   "Used on the log, you become the captain, briefly.",
    talk:  "You ask the quill what to write. It says, accurately: 'something true'.",
    give:  "You'd give a pen. Not this pen.",
    close: "You stopper the inkwell. The quill waits.",
  },
}

// ─── Inventory ────────────────────────────────────────────────────────────────
const INV = [
  { id:'doctorate', ic:'§',  label:'A doctorate\n(in progress)',    resp:"Three years in. You can hear it ticking." },
  { id:'tea',       ic:'∪',  label:'A cup of\ncold tea',           resp:"Cold for the seventh time. Reheating is a moral failure." },
  { id:'keys',      ic:'⚷', label:'Bicycle\nkeys',                 resp:"Two keys. One for the lock. One for the spare lock. You learned the hard way." },
  { id:'grudge',    ic:'∴',  label:'A grudge\nvs Reviewer 2',      resp:"Weighs nothing. Travels everywhere." },
  { id:'card',      ic:'≡',  label:'Library card\n(KCL)',          resp:"Expired in 2024. You renew it monthly out of guilt." },
  { id:'plaster',   ic:'+',  label:'A plaster\n(unused)',          resp:"Saved for the next bike incident. There is always a next bike incident." },
]

// ─── Flash clear ──────────────────────────────────────────────────────────────
function FlashClear({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600)
    return () => clearTimeout(t)
  }, [onDone])
  return null
}

// ─── Action line ──────────────────────────────────────────────────────────────
function ActionLine({ verbLabel, hoveredName, invFlash }: {
  verbLabel: string
  hoveredName: string | null
  invFlash: string | null
}) {
  if (invFlash) return (
    <span style={{ color: '#ffe9a8' }}>▸ {invFlash}</span>
  )
  if (hoveredName) return (
    <span>
      <span style={{ color: '#fff8e0' }}>{verbLabel}</span>
      {' '}
      <span style={{ color: '#ffd47a' }}>{hoveredName}</span>
    </span>
  )
  return (
    <span>
      <span style={{ color: '#fff8e0' }}>{verbLabel}</span>
      <span className="cabin-cursor" style={{
        display:'inline-block', width:9, height:13,
        background:'#ffe9a8', verticalAlign:'middle', marginLeft:6,
      }} />
    </span>
  )
}

// ─── Verb bar ─────────────────────────────────────────────────────────────────
function VerbBar({ verb, onVerbChange, onInvClick, onInvHover }: {
  verb: VerbId
  onVerbChange: (v: VerbId) => void
  onInvClick: (resp: string) => void
  onInvHover: (id: string | null) => void
}) {
  return (
    <div className="ui">
      {/* 3×3 verb grid */}
      <div className="verbs">
        {VERB_GRID.flat().map(vid => {
          const v = VERBS.find(x => x.id === vid)!
          return (
            <button key={vid} className={`verb-btn${verb === vid ? ' active' : ''}`}
              onClick={() => onVerbChange(vid)}>
              {v.label}
            </button>
          )
        })}
      </div>

      {/* Ship plaque */}
      <div className="plaque">
        <div className="plaque-aboard">— ABOARD —</div>
        <div className="plaque-name">The <em>Margin</em></div>
        <div className="plaque-captain">Captain R. Burman, commanding</div>
        <div className="plaque-coords">
          <span>LAT 51° 30′ N</span>
          <span style={{ color:'#6b5030' }}>·</span>
          <span>LONG 0° 05′ W</span>
        </div>
      </div>

      {/* Inventory */}
      <div className="inv">
        <div className="inv-header">
          <span>— INVENTORY —</span>
          <span className="inv-arrows">◂ 1/1 ▸</span>
        </div>
        <div className="inv-grid">
          {INV.map(item => (
            <div key={item.id} className="inv-cell"
              onMouseEnter={() => onInvHover(item.id)}
              onMouseLeave={() => onInvHover(null)}
              onClick={() => onInvClick(item.resp)}>
              <span className="inv-icon">{item.ic}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Parchment popup ──────────────────────────────────────────────────────────
function ParchmentPopup({ objId, verbId, onClose }: {
  objId: string
  verbId: VerbId
  onClose: () => void
}) {
  const obj    = CABIN_OBJECTS.find(o => o.id === objId)!
  const verb   = VERBS.find(v => v.id === verbId)!
  const flavour = VERB_TEXTS[objId]?.[verbId] ?? VERB_TEXTS[objId]?.look ?? ''

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="parch-veil"
      onClick={(e) => { if ((e.target as Element).classList.contains('parch-veil')) onClose() }}>
      <div className="parch-scroll">
        <button className="parch-wax" onClick={onClose} aria-label="Close" />
        <div className="parch-flavour">
          <span className="parch-flavour-who">
            ▸ {verb.label.toUpperCase()} {obj.name.toUpperCase()}
          </span>
          {flavour}
        </div>
      </div>
    </div>
  )
}

// ─── Hit area wrapper ─────────────────────────────────────────────────────────
function Hit({ id, children, onHit, onHover, outlineX, outlineY, outlineW, outlineH }: {
  id: string
  children: React.ReactNode
  onHit: (id: string) => void
  onHover: (id: string | null) => void
  outlineX: number; outlineY: number; outlineW: number; outlineH: number
}) {
  return (
    <g className="hit"
      onClick={() => onHit(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}>
      {children}
      <rect className="hit-outline"
        x={outlineX} y={outlineY} width={outlineW} height={outlineH} />
    </g>
  )
}

// ─── Cabin SVG scene ──────────────────────────────────────────────────────────
function CabinScene({ onHit, onHover }: {
  onHit: (id: string) => void
  onHover: (id: string | null) => void
}) {
  return (
    <svg viewBox="0 0 960 580" preserveAspectRatio="xMidYMid meet"
      style={{ display:'block', width:'100%', height:'calc(100% - 44px)' }}>
      <defs>
        {/* Wall planks */}
        <pattern id="planks" x="0" y="0" width="88" height="580" patternUnits="userSpaceOnUse">
          <rect width="88" height="580" fill="url(#wallG)" />
          <line x1="0" y1="0" x2="0" y2="580" stroke="#1a0e06" strokeWidth="2" />
          <line x1="2" y1="0" x2="2" y2="580" stroke="#5a3018" strokeWidth="1" />
        </pattern>
        <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3a1e10" />
          <stop offset="50%"  stopColor="#4a2818" />
          <stop offset="100%" stopColor="#2a1408" />
        </linearGradient>
        {/* Floor planks */}
        <pattern id="floorP" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
          <rect width="60" height="40" fill="#2a1808" />
          <line x1="0" y1="0" x2="60" y2="0" stroke="#1a0e06" strokeWidth="2" />
          <line x1="30" y1="0" x2="30" y2="40" stroke="#1a0e06" strokeWidth="1" opacity="0.6" />
        </pattern>
        {/* Desk gradient */}
        <linearGradient id="deskG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7a4a28" />
          <stop offset="100%" stopColor="#3a1e10" />
        </linearGradient>
        {/* Porthole sky — stops driven by data-time CSS */}
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop id="skyStop0" offset="0%"   stopColor="#0d0a1f" />
          <stop id="skyStop1" offset="35%"  stopColor="#1a1040" />
          <stop id="skyStop2" offset="70%"  stopColor="#473568" />
          <stop id="skyStop3" offset="100%" stopColor="#2a1f50" />
        </linearGradient>
        {/* Porthole clip */}
        <clipPath id="portClip"><circle cx="178" cy="200" r="86" /></clipPath>
        {/* Lantern glow */}
        <radialGradient id="lampG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff3c4" stopOpacity="0.9" />
          <stop offset="55%"  stopColor="#ffd47a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffb55a" stopOpacity="0"   />
        </radialGradient>
        <radialGradient id="lampHot" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff8e0" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffd47a" stopOpacity="0" />
        </radialGradient>
        {/* Vignette */}
        <radialGradient id="vig" cx="50%" cy="55%" r="70%">
          <stop offset="45%" stopColor="rgba(0,0,0,0)"    />
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
        </radialGradient>
        {/* Band shine for chest */}
        <linearGradient id="bandShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#fff8e0" stopOpacity="0"   />
          <stop offset="50%"  stopColor="#fff8e0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff8e0" stopOpacity="0"   />
        </linearGradient>
      </defs>

      {/* ── WALLS ── */}
      <rect x="0" y="0" width="960" height="420" fill="url(#planks)" />
      {/* upper beam */}
      <rect x="0" y="58"  width="960" height="6" fill="#1a0e06" />
      <rect x="0" y="64"  width="960" height="2" fill="#5a3018" />
      {/* shelf/desk-top beam */}
      <rect x="0" y="418" width="960" height="6" fill="#1a0e06" />
      <rect x="0" y="424" width="960" height="2" fill="#5a3018" />

      {/* ── FLOOR ── */}
      <rect x="0" y="420" width="960" height="160" fill="url(#floorP)" />

      {/* ── LAMP GLOW POOL on wall ── */}
      <ellipse cx="430" cy="250" rx="320" ry="200" fill="url(#lampG)" opacity="0.55" />

      {/* ── PORTHOLE ── */}
      <Hit id="porthole" onHit={onHit} onHover={onHover}
        outlineX={82} outlineY={102} outlineW={196} outlineH={196}>
        {/* outer brass ring */}
        <circle cx="178" cy="200" r="102" fill="#5a3a1a" />
        <circle cx="178" cy="200" r="97"  fill="#3a2010" />
        {/* bolts */}
        {[0,45,90,135,180,225,270,315].map(d => {
          const rad = (d * Math.PI) / 180
          return <circle key={d}
            cx={178 + Math.cos(rad)*93} cy={200 + Math.sin(rad)*93}
            r="3.5" fill="#c8a868" />
        })}
        {/* sky + sea */}
        <g clipPath="url(#portClip)">
          <rect x="92" y="114" width="172" height="172" fill="url(#skyG)" />
          {/* night: moon + stars */}
          <g className="sky-moon-group">
            <circle cx="138" cy="162" r="13" fill="#fbe9b8" />
            <circle cx="142" cy="160" r="11" fill="#f0d088" />
            <circle cx="115" cy="140" r="1.2" fill="#fff" />
            <circle cx="200" cy="133" r="1.0" fill="#fff" />
            <circle cx="230" cy="148" r="1.4" fill="#fff" />
            <circle cx="170" cy="160" r="0.8" fill="#fff" opacity="0.7" />
            <circle cx="250" cy="165" r="1.1" fill="#fff" opacity="0.8" />
            <circle cx="125" cy="170" r="0.9" fill="#fff" opacity="0.6" />
          </g>
          {/* day: sun */}
          <g className="sky-sun">
            <circle cx="230" cy="145" r="18" fill="#ffe060" />
            <circle cx="230" cy="145" r="14" fill="#fff8a0" />
          </g>
          {/* golden: sun at horizon */}
          <g className="sky-golden">
            <circle cx="220" cy="268" r="22" fill="#ff8030" />
            <ellipse cx="220" cy="268" rx="22" ry="8" fill="#c8502a" />
          </g>
          {/* sea */}
          <rect x="92" y="204" width="172" height="82" fill="#1a3a55" />
          <rect x="92" y="210" width="172" height="2" fill="rgba(255,255,255,0.12)" />
          <rect x="92" y="228" width="172" height="2" fill="rgba(255,255,255,0.08)" />
          <rect x="92" y="250" width="172" height="2" fill="rgba(255,255,255,0.05)" />
          {/* distant ship */}
          <rect x="220" y="210" width="13" height="3" fill="#0a0604" />
          <rect x="224" y="204" width="2" height="6" fill="#0a0604" />
          <rect x="228" y="202" width="2" height="8" fill="#0a0604" />
          {/* moon reflection */}
          <rect x="136" y="210" width="5" height="52" fill="#fbe9b8" opacity="0.18" />
        </g>
        {/* inner shadow rim */}
        <circle cx="178" cy="200" r="86" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="4" />
        {/* moonlight into cabin */}
        <ellipse cx="260" cy="270" rx="110" ry="55" fill="#88a8c4" opacity="0.06" />
      </Hit>

      {/* ── PARROT on perch (top right) ── */}
      <Hit id="parrot" onHit={onHit} onHover={onHover}
        outlineX={798} outlineY={74} outlineW={130} outlineH={150}>
        {/* perch rod */}
        <rect x="776" y="96"  width="168" height="3" fill="#3a2010" />
        <rect x="848" y="76"  width="3"   height="22" fill="#3a2010" />
        {/* ring from beam */}
        <circle cx="850" cy="76" r="4" fill="none" stroke="#c8a868" strokeWidth="2" />
        {/* body */}
        <rect x="834" y="100" width="28" height="34" fill="#3a7a3a" />
        <rect x="836" y="102" width="24" height="30" fill="#4a9a4a" />
        {/* belly yellow */}
        <rect x="840" y="118" width="14" height="14" fill="#ffd64a" />
        {/* head */}
        <rect x="838" y="90"  width="20" height="14" fill="#4a9a4a" />
        {/* eye */}
        <rect x="843" y="94"  width="3"  height="3"  fill="#1f1f1f" />
        <rect x="844" y="95"  width="1"  height="1"  fill="#fff" />
        {/* beak */}
        <rect x="834" y="96"  width="6"  height="4"  fill="#c9572e" />
        <rect x="834" y="100" width="4"  height="2"  fill="#8a3a14" />
        {/* tail */}
        <rect x="858" y="134" width="6"  height="14" fill="#3a6a8a" />
        <rect x="860" y="134" width="3"  height="20" fill="#3a6a8a" />
        {/* feet */}
        <rect x="842" y="134" width="3"  height="4"  fill="#c9572e" />
        <rect x="852" y="134" width="3"  height="4"  fill="#c9572e" />
        {/* wing accent */}
        <rect x="854" y="110" width="6"  height="14" fill="#2a6a2a" />
      </Hit>

      {/* ── LANTERN hanging from beam ── */}
      <Hit id="lantern" onHit={onHit} onHover={onHover}
        outlineX={400} outlineY={66} outlineW={72} outlineH={140}>
        {/* chain links */}
        <rect x="434" y="66" width="2" height="8"  fill="#c8a868" />
        <rect x="432" y="72" width="2" height="2"  fill="#c8a868" />
        <rect x="436" y="78" width="2" height="2"  fill="#c8a868" />
        {/* top cap */}
        <rect x="420" y="82" width="30" height="6"  fill="#3a2010" />
        <rect x="424" y="88" width="22" height="4"  fill="#5a3a1a" />
        {/* glow behind (animated) */}
        <circle cx="435" cy="118" r="62" fill="url(#lampG)" className="lantern-flame" />
        {/* glass body */}
        <rect x="418" y="92" width="34" height="44" fill="#3a2010" />
        <rect x="422" y="96" width="26" height="36" fill="#ffd47a" opacity="0.92" className="lantern-flame" />
        {/* flame */}
        <ellipse cx="435" cy="114" rx="5" ry="9"  fill="url(#lampHot)"  className="lantern-flame" />
        <ellipse cx="435" cy="114" rx="2" ry="5"  fill="#fff8e0"        className="lantern-flame" />
        {/* bottom cap */}
        <rect x="420" y="136" width="30" height="6"  fill="#3a2010" />
        <rect x="424" y="142" width="22" height="3"  fill="#1a0e06" />
        <rect x="430" y="142" width="6"  height="4"  fill="#1a0e06" />
      </Hit>

      {/* ── NAVIGATION CHART (right wall) ── */}
      <Hit id="chart" onHit={onHit} onHover={onHover}
        outlineX={498} outlineY={96} outlineW={290} outlineH={192}>
        {/* parchment */}
        <rect x="498" y="96"  width="290" height="192" fill="#e8c388" />
        <rect x="498" y="96"  width="290" height="192" fill="#c89858" opacity="0.16" />
        {/* coastline shape */}
        <path d="M510 200 Q 562 168 606 198 Q 648 228 700 208 Q 742 192 776 218 L 776 272 L 510 272 Z"
          fill="#3a6a8a" />
        <path d="M510 200 Q 562 168 606 198 Q 648 228 700 208 Q 742 192 776 218"
          fill="none" stroke="#1a0e06" strokeWidth="1.5" />
        {/* islands */}
        <ellipse cx="540" cy="242" rx="10" ry="5" fill="#7a4a28" />
        <ellipse cx="604" cy="250" rx="14" ry="6" fill="#7a4a28" />
        <ellipse cx="688" cy="238" rx="9"  ry="4" fill="#7a4a28" />
        {/* compass rose */}
        <circle cx="526" cy="126" r="14" fill="none" stroke="#1a0e06" strokeWidth="1" />
        <polygon points="526,114 530,126 526,138 522,126" fill="#1a0e06" />
        <polygon points="514,126 526,122 538,126 526,130" fill="none" stroke="#1a0e06" strokeWidth="1" />
        <text x="526" y="112" textAnchor="middle" fontFamily="IM Fell English SC,serif" fontSize="8" fill="#1a0e06">N</text>
        {/* route dashes */}
        <path d="M562 126 Q 624 158 710 148" fill="none" stroke="#8a1a14" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="562" cy="126" r="3" fill="#8a1a14" />
        <circle cx="710" cy="148" r="3" fill="#8a1a14" />
        {/* island labels */}
        <text x="604" y="263" textAnchor="middle" fontFamily="IM Fell English,serif" fontStyle="italic" fontSize="9" fill="#1a0e06">SCALPEL</text>
        <text x="690" y="226" textAnchor="middle" fontFamily="IM Fell English,serif" fontStyle="italic" fontSize="8" fill="#1a0e06">FÉNÊTRE</text>
        {/* title */}
        <text x="638" y="116" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="10" letterSpacing="1.8" fill="#1a0e06">THE KNOWN WORLD</text>
        {/* brass tacks */}
        <circle cx="504" cy="102" r="3.5" fill="#c8a868" />
        <circle cx="782" cy="102" r="3.5" fill="#c8a868" />
        <circle cx="504" cy="282" r="3.5" fill="#c8a868" />
        <circle cx="782" cy="282" r="3.5" fill="#c8a868" />
        {/* curl shadow */}
        <path d="M778 96 L 788 108 L 778 108 Z" fill="#1a0e06" opacity="0.5" />
      </Hit>

      {/* ── DESK SURFACE ── */}
      <rect x="38" y="364" width="888" height="78" fill="url(#deskG)" />
      <rect x="38" y="364" width="888" height="4"  fill="#b88a52" />
      <rect x="38" y="368" width="888" height="2"  fill="#3a1e10" opacity="0.4" />
      {/* desk apron */}
      <rect x="38" y="442" width="888" height="52" fill="#2a1408" />
      <rect x="38" y="442" width="888" height="2"  fill="#1a0e06" />
      {/* desk legs */}
      <rect x="58"  y="494" width="22" height="60" fill="#1a0e06" />
      <rect x="882" y="494" width="22" height="60" fill="#1a0e06" />
      {/* lantern glow on desk */}
      <ellipse cx="470" cy="388" rx="240" ry="16" fill="#ffd47a" opacity="0.10" />

      {/* ── QUILL + INKWELL (desk, far left — flavour only) ── */}
      <Hit id="quill" onHit={onHit} onHover={onHover}
        outlineX={48} outlineY={318} outlineW={78} outlineH={80}>
        {/* inkwell base */}
        <ellipse cx="86" cy="395" rx="32" ry="4" fill="#1a0e06" opacity="0.5" />
        <rect x="64"  y="368" width="40" height="24" fill="#1a0e06" />
        <rect x="64"  y="368" width="40" height="4"  fill="#3a2010" />
        <rect x="60"  y="374" width="48" height="3"  fill="#1a0e06" />
        {/* ink surface */}
        <ellipse cx="84" cy="367" rx="10" ry="2" fill="#0a0604" />
        {/* quill shaft + barbs */}
        <g transform="translate(98, 318) rotate(14)">
          <rect x="0" y="0" width="3" height="62" fill="#fbe9b8" />
          <rect x="0" y="0" width="1" height="62" fill="#c8a868" opacity="0.4" />
          <path d="M-3 4 L 9 0 L-3 7"   fill="#fff8e0" />
          <path d="M-3 11 L 11 5 L-3 14" fill="#fff8e0" />
          <path d="M-3 18 L 13 12 L-3 21" fill="#fff8e0" />
          <path d="M-3 25 L 12 20 L-3 28" fill="#fff8e0" />
          <path d="M-3 32 L 10 28 L-3 35" fill="#fff8e0" />
          <rect x="0" y="60" width="3" height="6" fill="#1a0e06" />
        </g>
      </Hit>

      {/* ── LETTER / ENVELOPE (desk, leaning against quill area) ── */}
      <Hit id="letter" onHit={onHit} onHover={onHover}
        outlineX={140} outlineY={338} outlineW={68} outlineH={56}>
        <ellipse cx="173" cy="393" rx="30" ry="3" fill="#1a0e06" opacity="0.4" />
        <g transform="rotate(3 172 365)">
          {/* envelope */}
          <rect x="144" y="344" width="58" height="42" fill="#ead4a8" stroke="#7a5a28" strokeWidth="1.5" rx="1" />
          {/* V-flap */}
          <path d="M144 344 L173 362 L202 344" fill="none" stroke="#7a5a28" strokeWidth="1" />
          {/* address lines */}
          <rect x="153" y="372" width="38" height="2" fill="#7a5a28" opacity="0.4" />
          <rect x="153" y="378" width="28" height="2" fill="#7a5a28" opacity="0.4" />
          {/* stamp */}
          <rect x="184" y="348" width="13" height="15" fill="#c9572e" stroke="#7a5a28" strokeWidth="0.8" />
          <text x="190" y="359" textAnchor="middle" fontFamily="Caveat,cursive" fontSize="7" fill="#fff">UK</text>
          {/* "to:" handwriting */}
          <text x="152" y="368" fontFamily="Caveat,cursive" fontSize="9" fill="#4a2818">to: a visitor</text>
        </g>
      </Hit>

      {/* ── BOOKS STACK (desk) ── */}
      <Hit id="books" onHit={onHit} onHover={onHover}
        outlineX={224} outlineY={350} outlineW={122} outlineH={56}>
        <ellipse cx="285" cy="396" rx="56" ry="4" fill="#1a0e06" opacity="0.45" />
        {/* books bottom to top */}
        <rect x="230" y="382" width="110" height="14" fill="#3a4d4a" stroke="#1a0e06" strokeWidth="1.5" rx="1" />
        <rect x="234" y="370" width="102" height="14" fill="#8b3a2c" stroke="#1a0e06" strokeWidth="1.5" rx="1" />
        <rect x="228" y="358" width="110" height="14" fill="#c9a83c" stroke="#1a0e06" strokeWidth="1.5" rx="1" />
        <rect x="238" y="348" width="100" height="12" fill="#3f5670" stroke="#1a0e06" strokeWidth="1.5" rx="1" />
        {/* spines */}
        <text x="235" y="392" fontFamily="Lora,serif" fontSize="7" fontStyle="italic" fill="#dcd3c4">Statistical Issues</text>
        <text x="238" y="380" fontFamily="Lora,serif" fontSize="7" fontStyle="italic" fill="#f4e6d4">Bayesian Approaches</text>
        <text x="232" y="368" fontFamily="Lora,serif" fontSize="7" fontStyle="italic" fill="#2a1e08">How to Read a Paper</text>
        <text x="242" y="357" fontFamily="Lora,serif" fontSize="7" fontStyle="italic" fill="#dee4ec">Bridgerton</text>
      </Hit>

      {/* ── CAPTAIN'S LOG (center-left on desk) ── */}
      <Hit id="log" onHit={onHit} onHover={onHover}
        outlineX={362} outlineY={334} outlineW={168} outlineH={68}>
        <ellipse cx="446" cy="396" rx="82" ry="5" fill="#1a0e06" opacity="0.5" />
        {/* book cover */}
        <rect x="368" y="362" width="152" height="30" fill="#5a2818" />
        <rect x="368" y="362" width="152" height="4"  fill="#7a3a28" />
        <rect x="368" y="388" width="152" height="4"  fill="#3a1408" />
        {/* spine */}
        <rect x="366" y="366" width="4"   height="22" fill="#8a1a14" />
        {/* open pages */}
        <rect x="376" y="348" width="136" height="16" fill="#efd8a6" />
        <rect x="376" y="348" width="136" height="2"  fill="#c8a868" />
        {/* writing lines left page */}
        <rect x="384" y="354" width="54"  height="1" fill="#3a2010" />
        <rect x="384" y="358" width="60"  height="1" fill="#3a2010" />
        {/* writing lines right page */}
        <rect x="450" y="354" width="50"  height="1" fill="#3a2010" />
        <rect x="450" y="358" width="44"  height="1" fill="#3a2010" />
        {/* center binding */}
        <rect x="446" y="348" width="3"   height="16" fill="#c8a868" opacity="0.4" />
        {/* gold corner detail */}
        <rect x="516" y="364" width="6"   height="2"  fill="#c8a868" />
        {/* title on cover */}
        <text x="446" y="380" textAnchor="middle"
          fontFamily="Cinzel,serif" fontSize="8" fill="#c8a868" letterSpacing="1.5">CAPTAIN'S LOG</text>
      </Hit>

      {/* ── MUG (center desk) ── */}
      <Hit id="mug" onHit={onHit} onHover={onHover}
        outlineX={548} outlineY={340} outlineW={68} outlineH={62}>
        <ellipse cx="580" cy="395" rx="30" ry="4" fill="#1a0e06" opacity="0.5" />
        {/* body */}
        <rect x="558" y="360" width="42" height="32" fill="#8a8a92" />
        <rect x="558" y="360" width="42" height="4"  fill="#c8c8d0" />
        <rect x="558" y="388" width="42" height="4"  fill="#5a5a62" />
        {/* cold tea */}
        <ellipse cx="579" cy="360" rx="21" ry="3" fill="#4a2a14" />
        {/* handle */}
        <rect x="600" y="366" width="3"  height="16" fill="#8a8a92" />
        <rect x="603" y="366" width="6"  height="3"  fill="#8a8a92" />
        <rect x="603" y="379" width="6"  height="3"  fill="#8a8a92" />
        <rect x="609" y="369" width="3"  height="10" fill="#8a8a92" />
      </Hit>

      {/* ── SEA CHEST (floor, right) ── */}
      <Hit id="chest" onHit={onHit} onHover={onHover}
        outlineX={616} outlineY={426} outlineW={206} outlineH={130}>
        <ellipse cx="718" cy="552" rx="104" ry="6" fill="#1a0e06" opacity="0.65" />
        {/* main body */}
        <rect x="626" y="466" width="184" height="82" fill="#5a2818" />
        <rect x="626" y="466" width="184" height="4"  fill="#7a3a28" />
        <rect x="626" y="544" width="184" height="4"  fill="#1a0e06" />
        {/* arched lid */}
        <path d="M626 466 Q 718 432 810 466 L 810 470 L 626 470 Z" fill="#7a3a28" />
        <path d="M626 466 Q 718 432 810 466" fill="none" stroke="#3a1408" strokeWidth="2" />
        {/* iron bands */}
        <rect x="662" y="432" width="6"   height="118" fill="#1a0e06" />
        <rect x="662" y="432" width="6"   height="118" fill="url(#bandShine)" opacity="0.4" />
        <rect x="772" y="432" width="6"   height="118" fill="#1a0e06" />
        {/* clasp */}
        <rect x="710" y="456" width="16"  height="22"  fill="#c8a868" />
        <rect x="712" y="458" width="12"  height="18"  fill="#8a6a28" />
        <rect x="716" y="466" width="4"   height="4"   fill="#1a0e06" />
        <circle cx="718" cy="480" r="2" fill="#1a0e06" />
        {/* corner studs */}
        {([640, 796] as number[]).map(cx =>
          ([474, 540] as number[]).map(cy => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#c8a868" />
          ))
        )}
      </Hit>

      {/* ── BICYCLE WHEEL (far right, propped) ── */}
      <Hit id="wheel" onHit={onHit} onHover={onHover}
        outlineX={856} outlineY={376} outlineW={104} outlineH={188}>
        <ellipse cx="908" cy="558" rx="50" ry="4" fill="#1a0e06" opacity="0.65" />
        {/* tyre */}
        <circle cx="908" cy="482" r="68" fill="none" stroke="#1a0e06"  strokeWidth="10" />
        {/* rim */}
        <circle cx="908" cy="482" r="58" fill="none" stroke="#c8c8d0"  strokeWidth="3"  />
        {/* spokes */}
        {[0,30,60,90,120,150].map(d => {
          const rad = (d * Math.PI) / 180
          return (
            <line key={d}
              x1={908 - Math.cos(rad)*56} y1={482 - Math.sin(rad)*56}
              x2={908 + Math.cos(rad)*56} y2={482 + Math.sin(rad)*56}
              stroke="#c8c8d0" strokeWidth="1" />
          )
        })}
        {/* hub */}
        <circle cx="908" cy="482" r="8" fill="#3a2010" />
        <circle cx="908" cy="482" r="4" fill="#c8a868" />
        {/* valve */}
        <rect x="906" y="416" width="3" height="6" fill="#1a0e06" />
      </Hit>

      {/* ── SCENE VIGNETTE ── */}
      <rect x="0" y="0" width="960" height="580" fill="url(#vig)" pointerEvents="none" />
    </svg>
  )
}

// ─── Cabin home ───────────────────────────────────────────────────────────────
function CabinHome() {
  const routerNav = useNavigate()
  const [verb, setVerb]             = useState<VerbId>('look')
  const [hoveredId, setHoveredId]   = useState<string | null>(null)
  const [popup, setPopup]           = useState<{ objId: string; verbId: VerbId } | null>(null)
  const [invFlash, setInvFlash]     = useState<string | null>(null)
  const [invHoverId, setInvHoverId] = useState<string | null>(null)

  function handleHover(id: string | null) {
    setHoveredId(id)
    if (id) {
      const obj = CABIN_OBJECTS.find(o => o.id === id)
      if (obj?.preferredVerb) setVerb(obj.preferredVerb)
    }
  }

  function handleHit(id: string) {
    const obj = CABIN_OBJECTS.find(o => o.id === id)
    if (!obj) return
    if (obj.contentKey) {
      const section = obj.contentKey
      document.documentElement.dataset.navDirection = 'forward'
      if (!document.startViewTransition) {
        routerNav({ to: '/$section', params: { section } })
        return
      }
      document.startViewTransition(() => {
        flushSync(() => routerNav({ to: '/$section', params: { section } }))
      })
    } else {
      setPopup({ objId: id, verbId: verb })
    }
  }

  const verbLabel  = VERBS.find(v => v.id === verb)?.label ?? 'Look at'
  const hoveredObj = CABIN_OBJECTS.find(o => o.id === hoveredId)
  const invItem    = INV.find(i => i.id === invHoverId)

  const hoveredName = invItem
    ? invItem.label.replace('\n', ' ')
    : (hoveredObj?.name ?? null)

  const displayVerb = invHoverId ? verbLabel : verbLabel

  return (
    <div className="cabin">
      {/* Scene */}
      <div className="scene-wrap">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        <CabinScene onHit={handleHit} onHover={handleHover} />
        <div className="helpchip">CLICK A VERB · CLICK AN OBJECT · ESC CLOSES</div>
        <div className="actionline">
          <ActionLine
            verbLabel={displayVerb}
            hoveredName={hoveredName}
            invFlash={invFlash}
          />
        </div>
      </div>

      {/* Bottom UI */}
      <VerbBar
        verb={verb}
        onVerbChange={setVerb}
        onInvClick={(resp) => { setInvFlash(resp); setInvHoverId(null) }}
        onInvHover={(id) => { setInvHoverId(id); if (id) setHoveredId(null) }}
      />

      {/* Parchment popup */}
      {popup && (
        <ParchmentPopup
          objId={popup.objId}
          verbId={popup.verbId}
          onClose={() => setPopup(null)}
        />
      )}

      {invFlash && <FlashClear onDone={() => setInvFlash(null)} />}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function DeskPage() {
  useEffect(() => {
    const h = new Date().getHours()
    document.documentElement.dataset.time =
      h >= 7 && h < 17 ? 'day' : h < 19 ? 'golden' : h < 21 ? 'dusk' : 'night'
  }, [])

  return <CabinHome />
}
