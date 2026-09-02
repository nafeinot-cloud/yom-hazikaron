import { useState } from 'react';
import {
  CEMETERY_ENTRY_BLESSING,
  EL_MALEI_RACHAMIM,
  fillPrayerName,
  GRAVESIDE_PSALMS,
  HASHKAVA,
  KADDISH_DRABBANAN,
  KADDISH_YATOM,
  NUSACH,
  PRAYER_STEPS,
  SEPHARDI_ENTRY_CONDITIONAL,
  SEPHARDI_GRAVE_ARRIVAL,
  TEFILA_LEILUY_NESHAMA,
  tehillim119ForYahrzeit,
  YEHI_RATZON_CLOSING,
} from '../data/tefilaOrder.js';
import { hebrewNumeral } from '../lib/hebrewCalendar.js';
import { religiousName } from '../lib/person.js';

export default function TefilaTab({ person }) {
  const [nusach, setNusach] = useState(person.nusach ?? NUSACH.ASHKENAZI);
  const name = religiousName(person);
  const gender = person.gender;

  const steps = PRAYER_STEPS.filter((s) => s.nusach === 'both' || s.nusach === nusach);
  const { nameStanzas, neshamaStanzas } = tehillim119ForYahrzeit(person.firstName);

  return (
    <main className="content">
      <div className="chip-row">
        <div
          className={`chip${nusach === NUSACH.ASHKENAZI ? ' selected' : ''}`}
          onClick={() => setNusach(NUSACH.ASHKENAZI)}
        >
          נוסח אשכנזי
        </div>
        <div
          className={`chip${nusach === NUSACH.SEPHARDI ? ' selected' : ''}`}
          onClick={() => setNusach(NUSACH.SEPHARDI)}
        >
          נוסח ספרדי
        </div>
      </div>

      <div className="section-label">סדר התפילה בעלייה לקבר</div>

      {steps.map((step, i) => (
        <StepCard
          key={step.id}
          num={i + 1}
          step={step}
          nusach={nusach}
          name={name}
          gender={gender}
          firstName={person.firstName}
          nameStanzas={nameStanzas}
          neshamaStanzas={neshamaStanzas}
        />
      ))}
    </main>
  );
}

function StepCard({ num, step, nusach, name, gender, firstName, nameStanzas, neshamaStanzas }) {
  return (
    <div className="prayer-step">
      <div style={{ display: 'flex', gap: 12, alignItems: step.id === 'seven-psalms' || step.id === 'tehillim-119' ? 'flex-start' : 'center' }}>
        <div className="step-num">{num}</div>
        <div style={{ fontSize: 13.5, fontWeight: 700, flex: 1 }}>{step.title}</div>
        {step.note && <div className="preview-badge">{step.note}</div>}
      </div>

      {step.id === 'entry-blessing' && (
        <>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.9, whiteSpace: 'pre-line' }}>
            {nusach === NUSACH.ASHKENAZI ? CEMETERY_ENTRY_BLESSING.hebrew : SEPHARDI_ENTRY_CONDITIONAL.hebrew}
          </div>
          <div className="note-box" style={{ fontSize: 11.5 }}>
            {nusach === NUSACH.ASHKENAZI ? CEMETERY_ENTRY_BLESSING.condition : SEPHARDI_ENTRY_CONDITIONAL.condition}
          </div>
        </>
      )}

      {step.id === 'grave-arrival' && (
        <>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.9 }}>{SEPHARDI_GRAVE_ARRIVAL.hebrew}</div>
          <div className="note-box" style={{ fontSize: 11.5 }}>{SEPHARDI_GRAVE_ARRIVAL.note}</div>
        </>
      )}

      {step.id === 'seven-psalms' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {GRAVESIDE_PSALMS.map((psalm) => (
            <PsalmBlock key={psalm.chapter} psalm={psalm} />
          ))}
        </div>
      )}

      {step.id === 'tehillim-119' && (
        <>
          <div className="muted" style={{ fontSize: 12 }}>
            תהילים קי״ט לפי אותיות השם ״{firstName}״, ולאחריהן אותיות נ-ש-מ-ה מאותו הפרק - 8 פסוקים לכל אות.
          </div>
          <LetterGroups stanzas={nameStanzas} />
          <div className="divider" />
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--indigo)' }}>אותיות נ־ש־מ־ה</div>
          <LetterGroups stanzas={neshamaStanzas} indigo />
        </>
      )}

      {step.id === 'leiluy-neshama' && (
        <div className="prayer-text">{fillPrayerName(TEFILA_LEILUY_NESHAMA.hebrew, name, gender)}</div>
      )}

      {step.id === 'kaddish' && (
        <div className="prayer-text">
          {nusach === NUSACH.ASHKENAZI ? KADDISH_YATOM.hebrew : KADDISH_DRABBANAN.hebrew}
        </div>
      )}

      {step.id === 'memorial-prayer' && (
        <div className="prayer-text">
          {nusach === NUSACH.ASHKENAZI
            ? fillPrayerName(EL_MALEI_RACHAMIM.hebrew, name, gender)
            : fillPrayerName(HASHKAVA.hebrew, name, gender)}
        </div>
      )}

      {step.id === 'yehi-ratzon' && (
        <div className="prayer-text">{fillPrayerName(YEHI_RATZON_CLOSING, name, gender)}</div>
      )}
    </div>
  );
}

function PsalmBlock({ psalm }) {
  return (
    <div style={{ background: 'var(--surface-alt)', borderRadius: 12, padding: '10px 12px' }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>תהילים פרק {hebrewNumeral(psalm.chapter)}</div>
      <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 14, lineHeight: 1.9, textAlign: 'justify' }}>
        {psalm.verses.join(' ')}
      </div>
    </div>
  );
}

function LetterGroups({ stanzas, indigo }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {stanzas.map((s, i) => (
        <div key={i} style={{ background: indigo ? 'var(--indigo-soft)' : 'var(--surface-alt)', borderRadius: 12, padding: '10px 12px' }}>
          <div
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontWeight: 700,
              color: indigo ? 'var(--indigo)' : 'var(--gold)',
              fontSize: 14,
              marginBottom: 6,
            }}
          >
            אות {s.letter}׳
          </div>
          {s.verses.map((v, vi) => (
            <div key={vi} style={{ fontFamily: "'Heebo', sans-serif", fontSize: 14, lineHeight: 1.9, textAlign: 'justify', marginBottom: 4 }}>
              {v}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
