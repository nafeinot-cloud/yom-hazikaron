import { useState } from 'react';
import {
  CEMETERY_ENTRY_BLESSING,
  EL_MALEI_RACHAMIM,
  fillPrayerName,
  GRAVESIDE_PSALMS,
  HASHKAVA,
  NUSACH,
  SEPHARDI_OPENING,
  tehillim119ForYahrzeit,
  YEHI_RATZON_CLOSING,
} from '../data/tefilaOrder.js';
import { hebrewNumeral } from '../lib/hebrewCalendar.js';
import { religiousName } from '../lib/person.js';

export default function TefilaTab({ person }) {
  const [nusach, setNusach] = useState(person.nusach ?? NUSACH.ASHKENAZI);
  const [showAllName, setShowAllName] = useState(false);
  const [showAllNeshama, setShowAllNeshama] = useState(false);

  const { nameStanzas, neshamaStanzas } = tehillim119ForYahrzeit(person.firstName);
  const memorialText = fillPrayerName(
    nusach === NUSACH.ASHKENAZI ? EL_MALEI_RACHAMIM.hebrew : HASHKAVA.hebrew,
    religiousName(person),
    person.gender
  );

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

      <div className="prayer-step">
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="step-num">1</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 3 }}>ברכת הכניסה לבית הקברות</div>
            <div className="muted" style={{ fontSize: 12 }}>{CEMETERY_ENTRY_BLESSING.hebrew}</div>
          </div>
        </div>
        <div className="note-box" style={{ fontSize: 11.5 }}>{CEMETERY_ENTRY_BLESSING.condition}</div>
        {nusach === NUSACH.SEPHARDI && (
          <>
            <div className="divider" />
            <div className="muted" style={{ fontSize: 12 }}>{SEPHARDI_OPENING.hebrew}</div>
            <div className="muted" style={{ fontSize: 11 }}>{SEPHARDI_OPENING.note}</div>
          </>
        )}
      </div>

      <div className="prayer-step" style={{ flexDirection: 'row', alignItems: 'center' }}>
        <div className="step-num">2</div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 3 }}>שבעה פרקי תהילים</div>
          <div className="muted" style={{ fontSize: 12.5 }}>
            פרקים {GRAVESIDE_PSALMS.map((p) => hebrewNumeral(p)).join(', ')}
          </div>
        </div>
      </div>

      <div className="prayer-step">
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="step-num">3</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 3 }}>
              תהילים קי״ט לפי אותיות השם ״{person.firstName}״
            </div>
            <div className="muted" style={{ fontSize: 12 }}>
              8 פסוקים לכל אות, לפי הסדר האלפביתי בפרק — ולאחריהם ממשיכים לאותיות נ-ש-מ-ה מאותו הפרק
            </div>
          </div>
        </div>

        <StanzaList stanzas={nameStanzas} expanded={showAllName} onToggle={() => setShowAllName((v) => !v)} />

        <div className="divider" />
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--indigo)' }}>בהמשך — אותיות נ־ש־מ־ה (מפרק קי״ט)</div>
        <StanzaList
          stanzas={neshamaStanzas}
          expanded={showAllNeshama}
          onToggle={() => setShowAllNeshama((v) => !v)}
          indigo
        />
      </div>

      <div className="prayer-step" style={{ flexDirection: 'row', alignItems: 'center' }}>
        <div className="step-num">4</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 3 }}>קדיש יתום / דרבנן</div>
          <div className="muted" style={{ fontSize: 12 }}>בהמשך ללימוד המשניות</div>
        </div>
        <div className="preview-badge">דורש מניין</div>
      </div>

      <div className="prayer-step">
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="step-num gold">5</div>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>
            {nusach === NUSACH.ASHKENAZI ? 'אֵל מָלֵא רַחֲמִים' : 'הַשְׁכָּבָה'}
          </div>
        </div>
        <div className="prayer-text">{memorialText}</div>
      </div>

      <div className="prayer-step" style={{ flexDirection: 'row', alignItems: 'center' }}>
        <div className="step-num">6</div>
        <div style={{ fontSize: 13.5, fontWeight: 700 }}>יהי רצון לסיום</div>
      </div>

      <div className="disclaimer">
        נוסחי התפילה כאן ראשוניים להמחשת המבנה. לפני שילוב באפליקציה מומלץ לאמת מול רב או סידור מוסמך.
      </div>
    </main>
  );
}

function StanzaList({ stanzas, expanded, onToggle, indigo }) {
  const shown = expanded ? stanzas : stanzas.slice(0, 2);
  return (
    <>
      {shown.map((s, i) => (
        <div className={`verse-row${indigo ? ' indigo' : ''}`} key={i}>
          <div
            style={{
              flexShrink: 0,
              fontFamily: "'Frank Ruhl Libre', serif",
              fontWeight: 700,
              color: indigo ? 'var(--indigo)' : 'var(--gold)',
              fontSize: 14,
            }}
          >
            {s.letter}׳
          </div>
          <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 13.5, lineHeight: 1.7 }}>
            {s.verses[0]}
          </div>
        </div>
      ))}
      {stanzas.length > 2 && (
        <div
          onClick={onToggle}
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: indigo ? 'var(--indigo)' : 'var(--gold)',
            padding: 2,
            cursor: 'pointer',
          }}
        >
          {expanded ? 'הצג פחות ↑' : `הצג עוד ${stanzas.length - 2} אותיות ↓`}
        </div>
      )}
    </>
  );
}
