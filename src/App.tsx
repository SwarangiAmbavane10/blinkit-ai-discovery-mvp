import { useState, useEffect, useRef, type CSSProperties } from 'react'

// ─── Palette ────────────────────────────────────────────────────────────────
const Y = '#FFD000'       // Blinkit yellow
const G = '#1B8A4C'       // action green
const GS = '#E8F6EE'      // green surface
const INK = '#111111'     // primary text
const MUTED = '#767676'   // secondary text
const FAINT = '#F5F5F5'   // surface
const BORDER = '#EBEBEB'  // divider

// ─── Tiny SVG icon set ──────────────────────────────────────────────────────
function Ic({ n, s = 20, c = INK, sw = 1.8 }: { n: string; s?: number; c?: string; sw?: number }) {
  const d: Record<string, string> = {
    loc:    'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
    chev_d: 'M6 9l6 6 6-6',
    chev_r: 'M9 6l6 6-6 6',
    chev_l: 'M15 6l-6 6 6 6',
    search: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
    cart:   'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
    spark:  'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z',
    plus:   'M12 5v14M5 12h14',
    minus:  'M5 12h14',
    check:  'M20 6L9 17l-5-5',
    home:   'M3 12L12 3l9 9M5 10v10h4v-5h6v5h4V10',
    brain:  'M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24 2.5 2.5 0 011.98-3A2.5 2.5 0 019.5 2zM14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24 2.5 2.5 0 00-1.98-3A2.5 2.5 0 0014.5 2z',
    info:   'M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-14v4m0 4h.01',
    zap:    'M13 2L3 14h9l-1 8 10-12h-9z',
    trophy: 'M6 9H3V5h3m12 4h3V5h-3M12 17v4M8 21h8M6 5h12a2 2 0 010 4H6a2 2 0 010-4zm6 10a6 6 0 006-6V5H6v4a6 6 0 006 6z',
    star:   'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
    leaf:   'M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
    fire:   'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
    pkg:    'M16.5 9.4L7.55 4.24M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
    gift:   'M20 12v10H4V12M22 7H2v5h20V7zM12 22V7m0 0a2 2 0 10-4 0m4 0a2 2 0 114 0',
    clock:  'M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-14v4l3 3',
    user:   'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  }
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d[n] ?? ''} />
    </svg>
  )
}

// ─── Layout shell ────────────────────────────────────────────────────────────
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', background: '#DCDCDC' }}>
      <div style={{
        width: 393, height: 852, background: '#fff',
        borderRadius: 52, overflow: 'hidden',
        boxShadow: '0 0 0 11px #1C1C1E, 0 40px 100px rgba(0,0,0,0.35)',
        display: 'flex', flexDirection: 'column', position: 'relative',
      }}>
        {/* notch bar */}
        <div style={{ background: '#fff', height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 10px', flexShrink: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>9:41</span>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {/* signal */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill={INK}><rect x="0" y="4" width="3" height="8" rx="1"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="1"/><rect x="9" y="0" width="3" height="12" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".25"/></svg>
            {/* wifi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill={INK}><path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/><path d="M4.5 6.5a5 5 0 017 0" opacity=".5"/><path d="M1.5 3.5a9 9 0 0113 0" opacity=".25"/></svg>
            {/* battery */}
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x=".5" y=".5" width="22" height="11" rx="3.5" stroke={INK} strokeOpacity=".35"/><rect x="1.5" y="1.5" width="19" height="9" rx="2.5" fill={INK}/><path d="M24 4v4a2 2 0 000-4z" fill={INK} fillOpacity=".4"/></svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

function BottomBar({ active, onNav }: { active: string; onNav: (s: Screen) => void }) {
  const items: { id: Screen; icon: string; label: string }[] = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'ai-discovery', icon: 'spark', label: 'AI Pick' },
    { id: 'cart', icon: 'cart', label: 'Cart' },
    { id: 'profile', icon: 'user', label: 'Me' },
  ]
  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, background: '#fff', display: 'flex', flexShrink: 0 }}>
      {items.map(it => {
        const on = active === it.id
        return (
          <button key={it.id} onClick={() => onNav(it.id as Screen)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '10px 0 14px', border: 'none', background: 'none', cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: on ? Y : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
              <Ic n={it.icon} s={18} c={on ? INK : MUTED} sw={on ? 2.2 : 1.8} />
            </div>
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, color: on ? INK : MUTED, letterSpacing: -0.1 }}>{it.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function BackBar({ title, onBack, right }: { title: string; onBack: () => void; right?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '6px 20px 12px', gap: 8, background: '#fff', flexShrink: 0 }}>
      <button onClick={onBack} style={{ border: 'none', background: FAINT, borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
        <Ic n="chev_l" s={18} c={INK} sw={2.2} />
      </button>
      <span style={{ flex: 1, fontSize: 17, fontWeight: 700, letterSpacing: -0.4 }}>{title}</span>
      {right}
    </div>
  )
}

function Pill({ label, color = INK, bg = FAINT }: { label: string; color?: string; bg?: string }) {
  return <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, letterSpacing: 0.2, whiteSpace: 'nowrap' as const }}>{label}</span>
}

function Divider() {
  return <div style={{ height: 1, background: BORDER, margin: '0 20px' }} />
}

// ─── Screen type ─────────────────────────────────────────────────────────────
type Screen = 'home' | 'ai-discovery' | 'ai-basket' | 'product' | 'cart' | 'checkout' | 'success' | 'profile'

// ─── Screen 1 · Home ─────────────────────────────────────────────────────────

const CATS = [
  { e: '🥛', n: 'Dairy' }, { e: '🥦', n: 'Veggies' }, { e: '🍎', n: 'Fruits' },
  { e: '🥩', n: 'Meat' },  { e: '🧴', n: 'Beauty' },  { e: '🍿', n: 'Snacks' },
  { e: '🧹', n: 'Home' },  { e: '💊', n: 'Health' },
]
const PRODUCTS = [
  { e: '🥛', name: 'Amul Full Cream Milk', sub: '500 ml', price: 30, mrp: 34, badge: 'BESTSELLER' },
  { e: '🍞', name: 'Britannia Bread',       sub: '400 g',  price: 42, mrp: 45, badge: null },
  { e: '🍊', name: 'Tropicana Orange',      sub: '1 L',    price: 95, mrp: 110, badge: '14% OFF' },
  { e: '🥚', name: 'Farm Fresh Eggs',       sub: '12 pcs', price: 78, mrp: 84, badge: 'FRESH' },
]
const RECENT = [
  { e: '☕', n: 'Nescafé Gold' }, { e: '🧃', n: 'Real Juice' }, { e: '🍫', n: 'Dairy Milk' }, { e: '🧻', n: 'Tissue Rolls' },
]

function HomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [qty, setQty] = useState<Record<number, number>>({})
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      {/* Location strip */}
      <div style={{ padding: '0 20px 16px', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
              <Ic n="loc" s={14} c={G} sw={2} />
              <span style={{ fontSize: 12, fontWeight: 600, color: G, letterSpacing: -0.1 }}>Delivering to</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5 }}>Koramangala, Bengaluru</span>
              <Ic n="chev_d" s={14} c={INK} sw={2.2} />
            </div>
          </div>
          <button onClick={() => onNav('cart')} style={{ position: 'relative', border: 'none', background: FAINT, borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Ic n="cart" s={20} c={INK} sw={1.8} />
            <div style={{ position: 'absolute', top: 7, right: 7, width: 9, height: 9, background: G, borderRadius: '50%', border: '2px solid #fff' }} />
          </button>
        </div>

        {/* Delivery badge */}
        <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFFBE6', border: `1px solid ${Y}`, borderRadius: 10, padding: '6px 12px' }}>
          <Ic n="zap" s={14} c="#B8860B" sw={2} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7A5900' }}>Delivery in <span style={{ color: INK }}>8 minutes</span></span>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ background: FAINT, borderRadius: 14, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic n="search" s={18} c={MUTED} sw={2} />
          <span style={{ fontSize: 14, color: '#BBBBBB', fontWeight: 500 }}>Search groceries, snacks, drinks…</span>
        </div>
      </div>

      {/* ✨ AI Discovery Card */}
      <div style={{ margin: '0 20px 24px' }}>
        <div onClick={() => onNav('ai-discovery')} style={{
          background: INK, borderRadius: 20, padding: '22px 22px 20px', cursor: 'pointer',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* decorative circles */}
          <div style={{ position: 'absolute', top: -24, right: -24, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,208,0,0.12)' }} />
          <div style={{ position: 'absolute', bottom: -18, right: 40, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,208,0,0.06)' }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ background: Y, borderRadius: 14, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Ic n="spark" s={22} c={INK} sw={1.6} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>✨ Discover with AI</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, fontWeight: 400 }}>
                Find products beyond your usual purchases — curated just for you.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ background: Y, color: INK, fontSize: 12, fontWeight: 800, padding: '7px 16px', borderRadius: 10, letterSpacing: -0.2 }}>Try AI Discovery</span>
            <Ic n="chev_r" s={16} c="rgba(255,255,255,0.4)" sw={2} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.4 }}>Shop by Category</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: G }}>See all</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {CATS.map(c => (
            <div key={c.n} style={{ background: FAINT, borderRadius: 14, padding: '14px 8px 12px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{c.e}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#444', letterSpacing: -0.1 }}>{c.n}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Recently purchased */}
      <div style={{ padding: '20px 0 4px' }}>
        <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.4 }}>Recently Purchased</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: G }}>Reorder all</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px' }}>
          {RECENT.map(r => (
            <div key={r.n} style={{ background: FAINT, borderRadius: 14, padding: '14px 16px', flexShrink: 0, textAlign: 'center', minWidth: 76 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{r.e}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#444', whiteSpace: 'nowrap' as const }}>{r.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: '24px 20px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.4 }}>🔥 Top Picks for You</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: G }}>See all</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {PRODUCTS.map((p, i) => (
            <div key={i} onClick={() => onNav('product')} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: 14, cursor: 'pointer' }}>
              {p.badge && <Pill label={p.badge} bg={p.badge === 'FRESH' || p.badge === 'BESTSELLER' ? GS : '#FFFBE6'} color={p.badge === 'FRESH' || p.badge === 'BESTSELLER' ? G : '#7A5900'} />}
              <div style={{ fontSize: 44, textAlign: 'center', margin: '14px 0 10px' }}>{p.e}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: INK, lineHeight: 1.35, marginBottom: 2, letterSpacing: -0.2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 12, fontWeight: 500 }}>{p.sub}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>₹{p.price}</span>
                  {p.mrp > p.price && <span style={{ fontSize: 10, color: '#BDBDBD', textDecoration: 'line-through', marginLeft: 4 }}>₹{p.mrp}</span>}
                </div>
                {qty[i] ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: G, borderRadius: 9, padding: '5px 9px' }}>
                    <button onClick={e => { e.stopPropagation(); setQty(q => ({ ...q, [i]: Math.max(0, (q[i] || 0) - 1) })) }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}><Ic n="minus" s={13} c="#fff" sw={2.5} /></button>
                    <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, minWidth: 12, textAlign: 'center' }}>{qty[i]}</span>
                    <button onClick={e => { e.stopPropagation(); setQty(q => ({ ...q, [i]: (q[i] || 0) + 1 })) }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}><Ic n="plus" s={13} c="#fff" sw={2.5} /></button>
                  </div>
                ) : (
                  <button onClick={e => { e.stopPropagation(); setQty(q => ({ ...q, [i]: 1 })) }} style={{ border: `1.5px solid ${G}`, background: '#fff', borderRadius: 9, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Ic n="plus" s={14} c={G} sw={2.2} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen 2 · AI Discovery ──────────────────────────────────────────────────

const INTENTS = [
  { id: 'grocery',  e: '🛒', label: 'Weekly Grocery',  desc: 'Essentials restocked intelligently',   accent: '#FFFBE6', border: '#FFE566' },
  { id: 'party',    e: '🎉', label: 'Party Prep',       desc: 'Food, drinks & good vibes',            accent: '#FFF0F5', border: '#FFACC7' },
  { id: 'healthy',  e: '🥗', label: 'Healthy Diet',     desc: 'Nutritious, balanced, tasty',          accent: GS,        border: '#6EE7A7' },
  { id: 'beauty',   e: '💄', label: 'Beauty & Care',    desc: 'Skincare, makeup & wellness',          accent: '#FAF0FF', border: '#D8A4F0' },
  { id: 'baby',     e: '👶', label: 'Baby Care',        desc: 'Safe, trusted products for infants',  accent: '#FFF5EE', border: '#FFC08A' },
  { id: 'pet',      e: '🐾', label: 'Pet Care',         desc: 'Food, treats & everyday essentials',  accent: '#F0F8FF', border: '#90CAFF' },
]

function AIDiscovery({ onNav, onBack }: { onNav: (s: Screen) => void; onBack: () => void }) {
  const { setIntent } = useAppNav()
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      <BackBar title="AI Discovery" onBack={onBack} />

      {/* Assistant header */}
      <div style={{ margin: '4px 20px 24px', background: INK, borderRadius: 20, padding: '20px 20px 22px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, background: Y, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ic n="brain" s={22} c={INK} sw={1.6} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>Blinkit AI</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: 1 }}>Personalized shopping assistant</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 16px' }}>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 400 }}>
            Hi! 👋 <strong style={{ color: '#fff' }}>What are you shopping for today?</strong> I'll build a personalized basket based on your choice — including products from categories you haven't explored yet.
          </p>
        </div>
      </div>

      {/* Intent grid */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.8, marginBottom: 14 }}>CHOOSE YOUR SHOPPING INTENT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {INTENTS.map(it => {
            const on = sel === it.id
            return (
              <div key={it.id} onClick={() => { setSel(it.id); setIntent(it.id) }}
                style={{
                  background: on ? it.accent : '#fff',
                  border: `1.5px solid ${on ? it.border : BORDER}`,
                  borderRadius: 16, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s',
                  boxShadow: on ? `0 4px 18px ${it.border}44` : 'none',
                }}>
                <div style={{ fontSize: 30, width: 44, textAlign: 'center', flexShrink: 0 }}>{it.e}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, letterSpacing: -0.3, marginBottom: 2 }}>{it.label}</div>
                  <div style={{ fontSize: 12, color: MUTED, fontWeight: 400 }}>{it.desc}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${on ? it.border : BORDER}`,
                  background: on ? it.border : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}>
                  {on && <Ic n="check" s={11} c="#fff" sw={2.5} />}
                </div>
              </div>
            )
          })}
        </div>

        {sel && (
          <button onClick={() => onNav('ai-basket')}
            style={{ width: '100%', marginTop: 20, marginBottom: 32, background: INK, border: 'none', borderRadius: 16, padding: '16px', fontSize: 15, fontWeight: 800, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: -0.3 }}>
            <Ic n="spark" s={18} c={Y} sw={1.8} />
            Build My AI Basket
            <Ic n="chev_r" s={16} c="rgba(255,255,255,0.5)" sw={2} />
          </button>
        )}
        {!sel && <div style={{ height: 32 }} />}
      </div>
    </div>
  )
}

// ─── Screen 3 · AI Basket ─────────────────────────────────────────────────────

type BasketItem = { e: string; n: string; sub: string; price: number; qty: number; isNew: boolean }
type IntentData = {
  title: string
  reason: string
  detail: string
  tags: string[]
  items: BasketItem[]
}

const INTENT_BASKETS: Record<string, IntentData> = {
  grocery: {
    title: 'Weekly Grocery',
    reason: 'AI analysed your past 8 weeks of orders and pre-filled your usual staples, with smarter pack sizes to avoid mid-week restocks.',
    detail: 'You run out of cooking oil every ~10 days. Switching to the 2L pack saves ₹22 per cycle. Eggs are added because 91% of similar households reorder within 5 days.',
    tags: ['Staples restocked', 'Smarter pack sizes', 'Zero mid-week trips'],
    items: [
      { e: '🥛', n: 'Amul Full Cream Milk',   sub: 'Dairy · 1L × 2',          price: 58,  qty: 2, isNew: false },
      { e: '🍞', n: 'Harvest Gold Bread',      sub: 'Bakery · 400g',            price: 42,  qty: 1, isNew: false },
      { e: '🥚', n: 'Farm Fresh Eggs',          sub: 'Eggs · 12 pcs',            price: 78,  qty: 1, isNew: false },
      { e: '🥦', n: 'Fresh Broccoli',           sub: 'Vegetables · ~500g',       price: 55,  qty: 1, isNew: true  },
      { e: '🫒', n: 'Fortune Sunflower Oil',    sub: 'Cooking Oil · 2L',         price: 185, qty: 1, isNew: false },
      { e: '🧅', n: 'Organic Onions',           sub: 'Vegetables · 1kg · New',   price: 40,  qty: 1, isNew: true  },
    ],
  },
  party: {
    title: 'Party Prep',
    reason: 'Based on 2.4M party orders, AI assembled the perfect crowd-pleaser combo — salty, sweet, and fizzy all covered. Chocolate and candy are new for you but trend #1 at parties.',
    detail: "You've ordered salty snacks 12 times but never sweets. Skittles and Dairy Milk are reordered by 78% of similar users within a week of first try.",
    tags: ['Trending party combo', '3 new categories', 'Crowd-tested picks'],
    items: [
      { e: '🍿', n: 'Bingo Mad Angles',         sub: 'Snacks · 78g',             price: 30,  qty: 2, isNew: false },
      { e: '🥤', n: 'Sprite 750ml',              sub: 'Beverages',                price: 45,  qty: 2, isNew: false },
      { e: '🍫', n: 'Cadbury Dairy Milk',        sub: 'Chocolate · 40g · New',    price: 40,  qty: 2, isNew: true  },
      { e: '🍬', n: 'Skittles Fruity Candy',     sub: 'Candy · 38g · New',        price: 50,  qty: 2, isNew: true  },
      { e: '🍕', n: 'McCain Smiles',             sub: 'Frozen Snacks · 415g',     price: 185, qty: 1, isNew: true  },
      { e: '🍦', n: 'Kwality Walls Cornetto',    sub: 'Ice Cream · 90ml × 4',     price: 120, qty: 1, isNew: false },
    ],
  },
  healthy: {
    title: 'Healthy Diet',
    reason: "AI cross-referenced your activity data and built a macro-balanced basket — high protein, good fats, complex carbs. Green tea and nuts are new additions you haven't tried.",
    detail: 'Your cart history skews carb-heavy. Adding Greek yogurt and mixed nuts improves your protein intake by ~28g/day, matching patterns of users who report better energy levels.',
    tags: ['Macro-balanced', 'High protein', '2 new superfoods'],
    items: [
      { e: '🌾', n: 'Quaker Oats',               sub: 'Breakfast · 500g',          price: 110, qty: 1, isNew: false },
      { e: '🫙', n: 'Epigamia Greek Yogurt',      sub: 'Dairy · 400g · High protein', price: 110, qty: 1, isNew: true  },
      { e: '🍓', n: 'Mixed Fresh Berries',         sub: 'Fruits · ~300g · New',      price: 130, qty: 1, isNew: true  },
      { e: '🥜', n: 'Happilo Mixed Nuts',          sub: 'Nuts · 200g',               price: 250, qty: 1, isNew: true  },
      { e: '🍵', n: 'Tetley Green Tea',            sub: 'Tea · 25 bags · New',        price: 95,  qty: 1, isNew: true  },
      { e: '🥑', n: 'Fresh Avocado',               sub: 'Fruits · 2 pcs',             price: 80,  qty: 1, isNew: false },
    ],
  },
  beauty: {
    title: 'Beauty & Care',
    reason: 'Based on trending skincare routines in your city and your past purchase gaps, AI built a complete AM/PM routine. Sunscreen is the #1 missing item for users like you.',
    detail: 'Only 22% of users in your profile own a sunscreen. Adding SPF 50 prevents long-term skin damage. The hand cream is a seasonal add — winter dryness is up 40% in your area.',
    tags: ['Complete AM/PM routine', 'City-trending picks', '2 skincare gaps filled'],
    items: [
      { e: '🧴', n: "Cetaphil Gentle Face Wash",  sub: 'Skincare · 250ml',         price: 310, qty: 1, isNew: false },
      { e: '☀️', n: 'Minimalist SPF 50 Sunscreen', sub: 'Skincare · 50ml · New',    price: 359, qty: 1, isNew: true  },
      { e: '🌸', n: 'Plum Hand & Nail Cream',      sub: 'Body Care · 50ml · New',   price: 175, qty: 1, isNew: true  },
      { e: '💋', n: "Maybelline Baby Lips SPF",    sub: 'Lip Care · 4g',             price: 130, qty: 1, isNew: false },
      { e: '🪥', n: 'Colgate Charcoal Toothbrush', sub: 'Oral Care · New',           price: 85,  qty: 2, isNew: true  },
      { e: '🌿', n: "Wow Aloe Vera Gel",           sub: 'Skincare · 200ml',          price: 199, qty: 1, isNew: false },
    ],
  },
  baby: {
    title: 'Baby Care',
    reason: 'AI selected dermatologist-approved, fragrance-free products trusted by parents in your neighbourhood. Baby wipes and formula are your most-reordered items — restocked here.',
    detail: "You last ordered diapers 6 days ago — you're likely due for a restock. Baby lotion and shampoo haven't been ordered in 3 weeks, so AI flagged them as a care gap.",
    tags: ['Paediatrician-approved', 'Fragrance-free', 'Restock reminder'],
    items: [
      { e: '🍼', n: "Mamy Poko Pants Diapers",    sub: 'Diapers · M · 24 pcs',      price: 499, qty: 1, isNew: false },
      { e: '🧻', n: "Pampers Baby Wipes",          sub: 'Wipes · 72 sheets',          price: 199, qty: 2, isNew: false },
      { e: '🧴', n: "Johnson's Baby Lotion",       sub: 'Body Care · 200ml · New',    price: 175, qty: 1, isNew: true  },
      { e: '🛁', n: "Mee Mee Baby Shampoo",        sub: 'Hair Care · 100ml',          price: 110, qty: 1, isNew: false },
      { e: '🥛', n: "Aptamil Stage 2 Formula",     sub: 'Nutrition · 400g',           price: 585, qty: 1, isNew: false },
      { e: '🌡️', n: "Dr. Morepen Baby Thermometer", sub: 'Health · New',              price: 249, qty: 1, isNew: true  },
    ],
  },
  pet: {
    title: 'Pet Care',
    reason: "AI matched your pet's breed and past purchase history to assemble a balanced weekly pack — quality food, dental chews, and a new treat variety your dog hasn't tried.",
    detail: 'Royal Canin runs out for you every 10 days based on past orders. Dental chews are added because 67% of Labrador owners in your area report gum health improvements after 4 weeks.',
    tags: ['Breed-matched nutrition', 'Vet-recommended', '1 new treat discovery'],
    items: [
      { e: '🐕', n: 'Royal Canin Adult Dog Food',  sub: 'Pet Food · 3kg',             price: 895, qty: 1, isNew: false },
      { e: '🦴', n: 'Drools Dental Chews',          sub: 'Pet Treats · 10 pcs · New',  price: 199, qty: 1, isNew: true  },
      { e: '🐟', n: 'Temptations Cat Treats',       sub: 'Cat Treats · 85g',           price: 150, qty: 1, isNew: false },
      { e: '🛁', n: 'Himalaya Anti-Tick Shampoo',   sub: 'Pet Grooming · 200ml',       price: 180, qty: 1, isNew: false },
      { e: '🎾', n: 'Trixie Rubber Fetch Ball',     sub: 'Pet Toy · New category',     price: 120, qty: 1, isNew: true  },
      { e: '🧴', n: 'Petkin Pet Wipes',             sub: 'Pet Hygiene · 80 sheets',    price: 165, qty: 1, isNew: false },
    ],
  },
}

function AIBasket({ onNav, onBack }: { onNav: (s: Screen) => void; onBack: () => void }) {
  const { intent } = useAppNav()
  const data = INTENT_BASKETS[intent] ?? INTENT_BASKETS.party
  const [open, setOpen] = useState(false)
  const total = data.items.reduce((s, i) => s + i.price * i.qty, 0)
  const newCount = data.items.filter(i => i.isNew).length
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      <BackBar title={`AI Basket · ${data.title}`} onBack={onBack}
        right={<Pill label="8 min" bg={GS} color={G} />} />

      <div style={{ padding: '4px 20px 28px' }}>
        {/* Why card */}
        <div style={{ background: '#FFFBE6', border: `1px solid #FFE566`, borderRadius: 18, padding: '16px 18px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <Ic n="info" s={16} c="#7A5900" sw={2} />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#7A5900', letterSpacing: -0.2 }}>Why this recommendation?</span>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: '#5C4200', lineHeight: 1.65, fontWeight: 400 }}>
            {data.reason}
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginTop: 10 }}>
            {data.tags.map(t => <Pill key={t} label={t} bg="#fff" color="#7A5900" />)}
          </div>
          <button onClick={() => setOpen(o => !o)} style={{ marginTop: 10, border: 'none', background: 'none', color: '#7A5900', fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: 0 }}>
            {open ? '↑ Show less' : '↓ Full reasoning'}
          </button>
          {open && (
            <p style={{ margin: '10px 0 0', fontSize: 12, color: '#5C4200', lineHeight: 1.65, borderTop: '1px solid #FFE566', paddingTop: 10 }}>
              {data.detail}
            </p>
          )}
        </div>

        {/* New discovery badge */}
        {newCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: G }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: -0.1 }}>{newCount} item{newCount > 1 ? 's' : ''} from new categories for you</span>
          </div>
        )}

        {/* Item list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 20 }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < data.items.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ width: 48, height: 48, background: FAINT, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{item.e}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.2 }}>{item.n}</span>
                  {item.isNew && <Pill label="NEW" bg={GS} color={G} />}
                </div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2, fontWeight: 500 }}>{item.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3 }}>₹{item.price}</div>
                <div style={{ fontSize: 11, color: MUTED }}>×{item.qty}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: FAINT, borderRadius: 16, padding: '16px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}>Subtotal · {data.items.length} items</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>₹{total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: G, fontWeight: 600 }}>Delivery</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: G }}>FREE</span>
          </div>
          <button onClick={() => onNav('cart')} style={{ width: '100%', background: G, border: 'none', borderRadius: 14, padding: '15px', fontSize: 15, fontWeight: 800, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: -0.2 }}>
            <Ic n="cart" s={18} c="#fff" sw={2} />
            Add Complete Basket · ₹{total}
          </button>
        </div>
        <button style={{ width: '100%', background: '#fff', border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: '13px', fontSize: 13, fontWeight: 700, color: MUTED, cursor: 'pointer' }}>
          Customise Basket
        </button>
      </div>
    </div>
  )
}

// ─── Screen 4 · Product Detail ────────────────────────────────────────────────

function ProductDetail({ onNav, onBack }: { onNav: (s: Screen) => void; onBack: () => void }) {
  const [qty, setQty] = useState(0)
  const [tab, setTab] = useState<'ai' | 'info'>('ai')

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      <BackBar title="" onBack={onBack} right={
        <button onClick={() => onNav('cart')} style={{ border: 'none', background: FAINT, borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Ic n="cart" s={18} c={INK} sw={1.8} />
        </button>
      } />

      {/* Hero */}
      <div style={{ margin: '0 20px 20px', background: '#FFFBE6', borderRadius: 20, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ fontSize: 90 }}>🥛</div>
        <div style={{ position: 'absolute', top: 14, left: 14 }}><Pill label="BESTSELLER" bg="#fff" color="#7A5900" /></div>
      </div>

      <div style={{ padding: '0 20px 28px' }}>
        {/* Title */}
        <div style={{ marginBottom: 14 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.2 }}>Amul Full Cream Milk</h1>
          <span style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}>500 ml · Tetra Pack · UHT Treated</span>
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.6 }}>₹30</span>
          <span style={{ fontSize: 13, color: '#BDBDBD', textDecoration: 'line-through' }}>₹34</span>
          <Pill label="12% OFF" bg={GS} color={G} />
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Ic n="star" s={14} c={Y} sw={0} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.2 }}>4.8</span>
            <span style={{ fontSize: 12, color: MUTED }}>(2.1k)</span>
          </div>
        </div>

        {/* Add */}
        {qty === 0 ? (
          <button onClick={() => setQty(1)} style={{ width: '100%', background: G, border: 'none', borderRadius: 14, padding: '15px', fontSize: 15, fontWeight: 800, color: '#fff', cursor: 'pointer', marginBottom: 20 }}>
            Add to Cart
          </button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: G, borderRadius: 14, padding: '12px 20px', marginBottom: 20 }}>
            <button onClick={() => setQty(q => Math.max(0, q - 1))} style={{ border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic n="minus" s={16} c="#fff" sw={2.5} /></button>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: -0.4 }}>{qty} in cart</span>
            <button onClick={() => setQty(q => q + 1)} style={{ border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic n="plus" s={16} c="#fff" sw={2.5} /></button>
          </div>
        )}

        {/* Delivery eta */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[['⚡', '8 min delivery'], ['📦', 'In stock'], ['↩', 'Easy returns']].map(([ic, lbl]) => (
            <div key={lbl} style={{ flex: 1, background: FAINT, borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 16, marginBottom: 3 }}>{ic}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#555' }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: FAINT, borderRadius: 12, padding: 4, marginBottom: 18 }}>
          {[{ id: 'ai', lbl: '✨ AI Insights' }, { id: 'info', lbl: 'Product Info' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as 'ai' | 'info')}
              style={{ flex: 1, border: 'none', borderRadius: 9, padding: '9px 12px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', background: tab === t.id ? '#fff' : 'transparent', color: tab === t.id ? INK : MUTED, boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.09)' : 'none', transition: 'all 0.15s', letterSpacing: -0.2 }}>
              {t.lbl}
            </button>
          ))}
        </div>

        {tab === 'ai' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Frequently bought together */}
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Ic n="fire" s={14} c="#EF4444" sw={2} /> Frequently Bought Together
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {[['🥛', 'This milk'], ['☕', 'Nescafé Gold'], ['🍞', 'Harvest Gold Bread']].map(([e, n]) => (
                  <div key={n} style={{ flex: 1, background: FAINT, borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: 26, marginBottom: 4 }}>{e}</div>
                    <div style={{ fontSize: 9.5, fontWeight: 600, color: '#555', lineHeight: 1.3 }}>{n}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: GS, borderRadius: 10, padding: '9px 12px' }}>
                <span style={{ fontSize: 12, color: G, fontWeight: 700 }}>Save ₹8 with combo</span>
                <button style={{ border: 'none', background: G, borderRadius: 8, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Add All</button>
              </div>
            </div>

            {/* Alternatives */}
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Ic n="leaf" s={14} c={G} sw={2} /> Better Alternatives
              </div>
              {[{ e: '🐄', n: 'Akshayakalpa Organic Milk', p: 38, tag: 'Organic' }, { e: '🌾', n: 'Goodmylk Oat Milk', p: 75, tag: 'Plant-based' }].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i > 0 ? `1px solid ${BORDER}` : 'none' }}>
                  <div style={{ width: 40, height: 40, background: FAINT, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{a.e}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.2 }}>{a.n}</div>
                    <Pill label={a.tag} bg={GS} color={G} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: -0.3 }}>₹{a.p}</span>
                </div>
              ))}
            </div>

            {/* Personalised suggestion */}
            <div style={{ background: '#FFFBE6', border: `1px solid #FFE566`, borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8, color: '#7A5900', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Ic n="spark" s={14} c="#7A5900" sw={2} /> Personalised for You
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: '#5C4200', lineHeight: 1.6 }}>
                You buy milk every 3 days. Set up auto-delivery and save <strong>₹15/month</strong> with Blinkit Pass — no minimum order needed.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            {[['Brand', 'Amul'], ['Pack Size', '500 ml'], ['Type', 'Full Cream, Homogenised'], ['Fat Content', '≥ 6%'], ['Shelf Life', '180 days (UHT)'], ['Storage', 'Cool, dry place']].map(([k, v], i, arr) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none', background: i % 2 === 0 ? '#fff' : FAINT }}>
                <span style={{ fontSize: 12.5, color: MUTED, fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: -0.2 }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Screen 5 · Cart ──────────────────────────────────────────────────────────

const CART_ITEMS = [
  { e: '🥛', n: 'Amul Full Cream Milk', sub: '500 ml', price: 30, qty: 2 },
  { e: '🍿', n: 'Bingo Mad Angles',     sub: '78 g',   price: 30, qty: 2 },
  { e: '🥤', n: 'Sprite 750ml',         sub: '750 ml', price: 45, qty: 2 },
  { e: '🍫', n: 'Cadbury Dairy Milk',   sub: '40 g',   price: 40, qty: 1 },
]
const MISSING = [
  { e: '🧀', n: 'Amul Cheese Slices', hint: 'Pairs well with bread in your cart', price: 85 },
  { e: '🧃', n: 'Real Mango Juice',   hint: 'New category — try something different', price: 55 },
]

function CartScreen({ onNav, onBack }: { onNav: (s: Screen) => void; onBack: () => void }) {
  const [items, setItems] = useState(CART_ITEMS.map(i => ({ ...i })))
  const score = 72
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const R = 30, C = 2 * Math.PI * R

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      <BackBar title="My Cart" onBack={onBack} right={<span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>{items.length} items</span>} />

      <div style={{ padding: '4px 20px 32px' }}>
        {/* AI Completeness */}
        <div style={{ border: `1.5px solid ${BORDER}`, borderRadius: 20, padding: '16px 18px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Ic n="spark" s={15} c={INK} sw={2} />
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: -0.2 }}>AI Basket Completion Score</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {/* Donut */}
            <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r={R} fill="none" stroke={FAINT} strokeWidth="6" />
                <circle cx="36" cy="36" r={R} fill="none" stroke={Y} strokeWidth="6"
                  strokeDasharray={`${C * score / 100} ${C}`}
                  strokeLinecap="round" transform="rotate(-90 36 36)" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 9, color: MUTED, fontWeight: 600 }}>/100</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5, letterSpacing: -0.3 }}>Almost complete!</div>
              <p style={{ margin: 0, fontSize: 12, color: MUTED, lineHeight: 1.55 }}>Add 2 more items to unlock free delivery and a perfect basket score.</p>
            </div>
          </div>
          <div style={{ marginTop: 12, background: '#FFFBE6', borderRadius: 10, padding: '9px 12px', fontSize: 12, color: '#7A5900', fontWeight: 600 }}>
            💡 A drink or snack would complete your movie night basket
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: 20 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ width: 48, height: 48, background: FAINT, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{item.e}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.2, marginBottom: 2 }}>{item.n}</div>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 500 }}>{item.sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: FAINT, borderRadius: 10, padding: '6px 10px' }}>
                  <button onClick={() => setItems(its => its.map((it, j) => j === i ? { ...it, qty: Math.max(0, it.qty - 1) } : it))} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}><Ic n="minus" s={13} c={INK} sw={2.2} /></button>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 14, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => setItems(its => its.map((it, j) => j === i ? { ...it, qty: it.qty + 1 } : it))} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}><Ic n="plus" s={13} c={INK} sw={2.2} /></button>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: -0.3, minWidth: 42, textAlign: 'right' }}>₹{item.price * item.qty}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Missing items */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, letterSpacing: 0.6, marginBottom: 12 }}>AI SUGGESTS · MISSING ITEMS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {MISSING.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 42, height: 42, background: FAINT, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{m.e}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: -0.2, marginBottom: 1 }}>{m.n}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{m.hint}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, marginBottom: 5 }}>₹{m.price}</div>
                  <button style={{ border: `1.5px solid ${G}`, background: '#fff', borderRadius: 8, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: G, cursor: 'pointer' }}>+ Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill + CTA */}
        <div style={{ background: FAINT, borderRadius: 16, padding: '16px 18px', marginBottom: 12 }}>
          {[['Item total', `₹${total}`], ['Delivery', 'FREE'], ['Coupon (BLINK50)', '-₹30']].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < 2 ? 8 : 0 }}>
              <span style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: k.startsWith('Delivery') ? G : INK }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: BORDER, margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 800 }}>To Pay</span>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>₹{total - 30}</span>
          </div>
          <button onClick={() => onNav('checkout')} style={{ width: '100%', background: Y, border: 'none', borderRadius: 13, padding: '15px', fontSize: 15, fontWeight: 800, color: INK, cursor: 'pointer', letterSpacing: -0.3 }}>
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 6 · Checkout ─────────────────────────────────────────────────────

const LAST_MIN = [
  { e: '🧁', n: 'Oreo Biscuits',   hint: 'Great with milk in your cart',  price: 30 },
  { e: '💧', n: 'Bisleri Water 1L', hint: '95% of orders include this',    price: 20 },
  { e: '🍵', n: 'Nescafé Gold 50g', hint: 'Morning essential, trending now', price: 165 },
]

function Checkout({ onNav, onBack }: { onNav: (s: Screen) => void; onBack: () => void }) {
  const [added, setAdded] = useState<number[]>([])
  const addTotal = added.reduce((s, i) => s + LAST_MIN[i].price, 0)

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      <BackBar title="Checkout" onBack={onBack} />

      <div style={{ padding: '4px 20px 32px' }}>
        {/* Delivery */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.7, marginBottom: 10 }}>DELIVERY ADDRESS</div>
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 38, height: 38, background: FAINT, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ic n="home" s={17} c={INK} sw={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>Home</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5, fontWeight: 400 }}>24, 5th Cross Rd, Koramangala 4th Block, Bengaluru — 560034</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: G }}>Change</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, background: GS, borderRadius: 9, padding: '7px 12px' }}>
              <Ic n="zap" s={13} c={G} sw={2} />
              <span style={{ fontSize: 12, fontWeight: 700, color: G }}>Delivery in 8 minutes</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.7, marginBottom: 10 }}>PAYMENT</div>
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            {[['💳', 'Razorpay UPI', '•••4532', true], ['🏦', 'HDFC Net Banking', 'Saved account', false]].map(([e, n, d, sel], i) => (
              <div key={i as number} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: sel ? GS : '#fff', borderBottom: i === 0 ? `1px solid ${BORDER}` : 'none' }}>
                <span style={{ fontSize: 22 }}>{e}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.2 }}>{n as string}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{d as string}</div>
                </div>
                {sel && <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n="check" s={10} c="#fff" sw={2.5} /></div>}
              </div>
            ))}
          </div>
        </div>

        {/* AI last-minute */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.7, marginBottom: 10 }}>✨ AI · BEFORE YOU ORDER</div>
          <div style={{ background: INK, borderRadius: 18, padding: '16px' }}>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
              Based on your cart, AI suggests adding these before you checkout:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LAST_MIN.map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 24, width: 36, textAlign: 'center', flexShrink: 0 }}>{item.e}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: -0.2 }}>{item.n}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{item.hint}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', textAlign: 'right', marginBottom: 5 }}>₹{item.price}</div>
                    <button onClick={() => setAdded(a => a.includes(i) ? a.filter(x => x !== i) : [...a, i])}
                      style={{ border: 'none', background: added.includes(i) ? G : Y, borderRadius: 8, padding: '5px 11px', fontSize: 11, fontWeight: 800, color: added.includes(i) ? '#fff' : INK, cursor: 'pointer', letterSpacing: -0.1 }}>
                      {added.includes(i) ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bill */}
        <div style={{ background: FAINT, borderRadius: 16, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.7, marginBottom: 10 }}>BILL SUMMARY</div>
          {[['Item total', '₹250'], ['Delivery', 'FREE'], ...(addTotal > 0 ? [[`AI add-ons (${added.length})`, `+₹${addTotal}`]] : []), ['Coupon', '-₹30']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: MUTED, fontWeight: 500 }}>{k}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: k === 'Coupon' ? G : INK }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: BORDER, margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 800 }}>Grand Total</span>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>₹{220 + addTotal}</span>
          </div>
        </div>

        <button onClick={() => onNav('success')}
          style={{ width: '100%', background: Y, border: 'none', borderRadius: 16, padding: '16px', fontSize: 15, fontWeight: 800, color: INK, cursor: 'pointer', letterSpacing: -0.3 }}>
          Place Order · ₹{220 + addTotal}
        </button>
      </div>
    </div>
  )
}

// ─── Screen 7 · Success ───────────────────────────────────────────────────────

const STEPS = [
  { label: 'Order confirmed',  done: true,  time: 'Just now' },
  { label: 'Being packed',     done: true,  time: '30 sec ago' },
  { label: 'Out for delivery', done: false, time: 'In ~6 min' },
  { label: 'Delivered',        done: false, time: 'In ~8 min' },
]
const DISCOVERED = [{ e: '🍫', n: 'Chocolate' }, { e: '🍬', n: 'Candy' }, { e: '🧃', n: 'Juices' }]

function Success({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      <div style={{ padding: '20px 20px 32px' }}>
        {/* Check */}
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ width: 80, height: 80, background: GS, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: `0 0 0 14px ${GS}88` }}>
            <Ic n="check" s={36} c={G} sw={2.5} />
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800, letterSpacing: -0.7 }}>Order Placed! 🎉</h2>
          <p style={{ margin: 0, fontSize: 13, color: MUTED, fontWeight: 500 }}>
            Arriving in <strong style={{ color: G }}>8 minutes</strong> · Order #BLK28947
          </p>
        </div>

        {/* Live track */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 18, padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: -0.2, marginBottom: 14 }}>Live Order Track</div>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < STEPS.length - 1 ? 0 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 1 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: step.done ? G : FAINT, border: `2px solid ${step.done ? G : BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  {step.done ? <Ic n="check" s={10} c="#fff" sw={2.5} /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: BORDER }} />}
                </div>
                {i < STEPS.length - 1 && <div style={{ width: 2, height: 22, background: step.done ? G : BORDER, margin: '3px 0' }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: i < STEPS.length - 1 ? 0 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: step.done ? 700 : 500, color: step.done ? INK : MUTED, letterSpacing: -0.2 }}>{step.label}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 1, marginBottom: i < STEPS.length - 1 ? 10 : 0 }}>{step.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Discovery achievement */}
        <div style={{ background: INK, borderRadius: 20, padding: '20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 46, height: 46, background: Y, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Ic n="trophy" s={22} c={INK} sw={1.8} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>Discovery Achievement!</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: Y }} />
                <span style={{ fontSize: 11, color: Y, fontWeight: 700 }}>Explorer Badge Unlocked</span>
              </div>
            </div>
          </div>

          <p style={{ margin: '0 0 14px', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, fontWeight: 400 }}>
            You discovered <strong style={{ color: '#fff' }}>3 new categories</strong> today with AI Discovery. Keep exploring to earn your <strong style={{ color: Y }}>Super Explorer</strong> badge.
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {DISCOVERED.map(d => (
              <div key={d.n} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{d.e}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{d.n}</div>
                <div style={{ fontSize: 9, color: Y, fontWeight: 600, marginTop: 2 }}>New</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>Super Explorer progress</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: Y }}>3 / 5 categories</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 20, height: 7, overflow: 'hidden' }}>
              <div style={{ background: Y, height: '100%', width: '60%', borderRadius: 20 }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.7, marginBottom: 12 }}>YOUR AI DISCOVERY REPORT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
            {[['3', 'New categories'], ['₹30', 'AI savings'], ['8 min', 'ETA']].map(([v, l]) => (
              <div key={l} style={{ background: '#FFFBE6', borderRadius: 12, padding: '12px 6px' }}>
                <div style={{ fontSize: 19, fontWeight: 800, color: '#7A5900', letterSpacing: -0.5 }}>{v}</div>
                <div style={{ fontSize: 10, color: MUTED, marginTop: 3, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => onNav('home')} style={{ width: '100%', background: Y, border: 'none', borderRadius: 16, padding: '15px', fontSize: 15, fontWeight: 800, color: INK, cursor: 'pointer', marginBottom: 10, letterSpacing: -0.3 }}>
          Continue Shopping
        </button>
        <button onClick={() => onNav('ai-discovery')} style={{ width: '100%', background: '#fff', border: `1.5px solid ${BORDER}`, borderRadius: 16, padding: '14px', fontSize: 14, fontWeight: 700, color: MUTED, cursor: 'pointer', letterSpacing: -0.2 }}>
          ✨ Explore more with AI
        </button>
      </div>
    </div>
  )
}

// ─── Profile placeholder ──────────────────────────────────────────────────────
function Profile({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ flex: 1, background: '#fff' }}>
      <BackBar title="My Profile" onBack={onBack} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '16px', background: FAINT, borderRadius: 16 }}>
          <div style={{ width: 56, height: 56, background: Y, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👤</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.4 }}>Priya Sharma</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>+91 98765 43210</div>
          </div>
        </div>
        <div style={{ background: INK, borderRadius: 16, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Ic n="trophy" s={20} c={Y} sw={1.8} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Explorer · Level 3</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>3 categories discovered with AI</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Transition engine ────────────────────────────────────────────────────────

type Entry = { screen: Screen; key: number; dir: 'fwd' | 'back' }

function SlideView({ entry, isTop }: { entry: Entry; isTop: boolean }) {
  const [phase, setPhase] = useState<'in' | 'settled'>('in')
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('settled')))
    return () => cancelAnimationFrame(raf)
  }, [])

  const origin = entry.dir === 'fwd' ? '100%' : '-30%'
  const tx = phase === 'settled' ? '0%' : origin

  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      transform: `translateX(${tx})`,
      transition: phase === 'settled' ? 'transform 310ms cubic-bezier(0.25,0,0.1,1)' : 'none',
      zIndex: isTop ? 2 : 1,
      boxShadow: isTop && entry.dir === 'fwd' ? '-12px 0 32px rgba(0,0,0,0.14)' : 'none',
      background: '#fff',
      willChange: 'transform',
    }}>
      {entry.screen === 'home'         && <HomeData    entry={entry} />}
      {entry.screen === 'ai-discovery' && <AIDiscData  entry={entry} />}
      {entry.screen === 'ai-basket'    && <BasketData  entry={entry} />}
      {entry.screen === 'product'      && <ProdData    entry={entry} />}
      {entry.screen === 'cart'         && <CartData    entry={entry} />}
      {entry.screen === 'checkout'     && <CheckData   entry={entry} />}
      {entry.screen === 'success'      && <SuccessData entry={entry} />}
      {entry.screen === 'profile'      && <ProfData    entry={entry} />}
    </div>
  )
}

// ─── Context bridge (nav + back injected via render props) ────────────────────
function HomeData({ entry: _ }: { entry: Entry }) {
  const { nav } = useAppNav(); return <HomeScreen onNav={nav} />
}
function AIDiscData({ entry: _ }: { entry: Entry }) {
  const { nav, back } = useAppNav(); return <AIDiscovery onNav={nav} onBack={back} />
}
function BasketData({ entry: _ }: { entry: Entry }) {
  const { nav, back } = useAppNav(); return <AIBasket onNav={nav} onBack={back} />
}
function ProdData({ entry: _ }: { entry: Entry }) {
  const { nav, back } = useAppNav(); return <ProductDetail onNav={nav} onBack={back} />
}
function CartData({ entry: _ }: { entry: Entry }) {
  const { nav, back } = useAppNav(); return <CartScreen onNav={nav} onBack={back} />
}
function CheckData({ entry: _ }: { entry: Entry }) {
  const { nav, back } = useAppNav(); return <Checkout onNav={nav} onBack={back} />
}
function SuccessData({ entry: _ }: { entry: Entry }) {
  const { nav } = useAppNav(); return <Success onNav={nav} />
}
function ProfData({ entry: _ }: { entry: Entry }) {
  const { back } = useAppNav(); return <Profile onBack={back} />
}

// ─── Nav context ──────────────────────────────────────────────────────────────
import { createContext, useContext } from 'react'
const NavCtx = createContext<{ nav: (s: Screen) => void; back: () => void; intent: string; setIntent: (id: string) => void }>({
  nav: () => {}, back: () => {}, intent: 'party', setIntent: () => {},
})
function useAppNav() { return useContext(NavCtx) }

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [stack, setStack] = useState<Entry[]>([{ screen: 'home', key: 0, dir: 'fwd' }])
  const [history, setHistory] = useState<Screen[]>([])
  const [intent, setIntent] = useState('party')
  const counter = useRef(1)

  const nav = (s: Screen) => {
    setHistory(h => [...h, stack[stack.length - 1].screen])
    setStack(st => [...st, { screen: s, key: counter.current++, dir: 'fwd' }])
  }
  const back = () => {
    if (!history.length) return
    const prev = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setStack(st => [...st, { screen: prev, key: counter.current++, dir: 'back' }])
    setTimeout(() => setStack(st => st.slice(-1)), 360)
  }

  const visible = stack.slice(-2)
  const current = stack[stack.length - 1].screen
  const showBar = ['home', 'ai-discovery', 'cart', 'profile'].includes(current)

  return (
    <NavCtx.Provider value={{ nav, back, intent, setIntent }}>
      <Phone>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {visible.map((e, i) => (
            <SlideView key={e.key} entry={e} isTop={i === visible.length - 1} />
          ))}
        </div>
        {showBar && <BottomBar active={current} onNav={nav} />}
      </Phone>
    </NavCtx.Provider>
  )
}
