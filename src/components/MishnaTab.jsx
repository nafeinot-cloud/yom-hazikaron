import { useState } from 'react';
import { mishnayotForName, NESHAMA_ADDENDUM } from '../data/mishnayot.js';
import { hebrewNumeral } from '../lib/hebrewCalendar.js';
import { honorific, religiousName } from '../lib/person.js';
import { ExternalLinkIcon } from './icons.jsx';

const KEHATI_APP_URL = 'https://play.google.com/store/apps/details?id=com.nocker.kehati&hl=he';

function emphasizeFirstLetter(text) {
  if (!text) return null;
  return (
    <>
      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{text[0]}</span>
      {text.slice(1)}
    </>
  );
}

/** Clamped to 3 lines by default, with a toggle to read the rest. */
function Collapsible({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={open ? undefined : 'clamp-text'}>{children}</div>
      <span className="expand-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? 'הצג פחות' : 'קרא עוד'}
      </span>
    </div>
  );
}

function MishnaCard({ letter, options, indigo }) {
  const [optionIdx, setOptionIdx] = useState(0);
  const opt = options[Math.min(optionIdx, options.length - 1)];
  if (!opt) return null;

  return (
    <div className="mishna-card">
      <div className={`letter-badge${indigo ? ' indigo' : ''}`}>{letter}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        {options.length > 1 && (
          <div className="mishna-options">
            {options.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`mishna-option-btn${i === optionIdx ? ' selected' : ''}`}
                onClick={() => setOptionIdx(i)}
              >
                משנה {hebrewNumeral(i + 1)}
              </button>
            ))}
          </div>
        )}
        <div style={{ fontSize: 13, fontWeight: 700 }}>
          {opt.tractate}, פרק {opt.chapter}
          {opt.mishna ? ` משנה ${hebrewNumeral(opt.mishna)}` : ''}
        </div>
        <Collapsible>
          <div
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: 15,
              lineHeight: 1.9,
              margin: '6px 0 8px',
            }}
          >
            {emphasizeFirstLetter(opt.fullText)}
          </div>
        </Collapsible>
        <div className="muted" style={{ fontSize: 11.5, fontWeight: 700, marginTop: 2 }}>
          פירוש רבינו עובדיה מברטנורא
        </div>
        <Collapsible>
          <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>
            {opt.bartenura}
          </div>
        </Collapsible>
      </div>
    </div>
  );
}

export default function MishnaTab({ person }) {
  const entries = mishnayotForName(person.firstName);

  return (
    <main className="content">
      <div className="mishna-heading">
        לימוד משניות לעילוי נשמת {religiousName(person)} {honorific(person)}
      </div>

      <a
        href={KEHATI_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          alignSelf: 'flex-start',
          fontSize: 12,
          color: 'var(--gold)',
          textDecoration: 'none',
        }}
      >
        <ExternalLinkIcon size={13} />
        רוצים גם את פירוש קהתי? פתחו באפליקציית "משניות קהתי"
      </a>

      <div className="note-box">
        לכל אות בשם <b style={{ color: 'var(--text)' }}>{person.firstName}</b>, נבחרה משנה קצרה הפותחת באותה אות - מנהג לימוד
        לעילוי נשמה, נלמד בערב או ביום יום הזכרון. האות הראשונה של כל משנה מודגשת.
      </div>

      <div>
        <div className="section-label" style={{ marginBottom: 8 }}>
          לפי אותיות השם — {person.firstName}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {entries.map((entry, i) => (
            <MishnaCard key={i} letter={entry.letter} options={entry.options} />
          ))}
        </div>
      </div>

      <div>
        <div className="section-label" style={{ marginBottom: 8 }}>
          לעילוי נשמה — מסכת {NESHAMA_ADDENDUM.tractate}, פרק {NESHAMA_ADDENDUM.chapter}
        </div>
        <div className="note-box" style={{ background: 'var(--indigo-soft)', marginBottom: 10 }}>
          נהוג ללמוד בסיום את משניות ד׳-ז׳ בפרק {NESHAMA_ADDENDUM.chapter}׳ במסכת {NESHAMA_ADDENDUM.tractate} - שאותיותיהן
          הפותחות מאייתות בעצמן נ-ש-מ-ה, מפני שאותיות ״משנה״ הן צירוף אותיות ״נשמה״.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NESHAMA_ADDENDUM.mishnayot.map((m, i) => (
            <MishnaCard
              key={i}
              letter={m.letter}
              options={[{ tractate: NESHAMA_ADDENDUM.tractate, chapter: NESHAMA_ADDENDUM.chapter, mishna: m.mishna, fullText: m.fullText, bartenura: m.bartenura }]}
              indigo
            />
          ))}
        </div>
      </div>
    </main>
  );
}
