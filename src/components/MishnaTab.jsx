import { mishnayotForName, NESHAMA_ADDENDUM } from '../data/mishnayot.js';

function emphasizeFirstLetter(text) {
  if (!text) return null;
  return (
    <>
      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{text[0]}</span>
      {text.slice(1)}
    </>
  );
}

function MishnaCard({ letter, tractate, chapter, mishna, fullText, commentary, needsReview, indigo }) {
  return (
    <div className="mishna-card">
      <div className={`letter-badge${indigo ? ' indigo' : ''}`}>{letter}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>
          {tractate}, פרק {chapter}
          {mishna ? ` משנה ${mishna}` : ''}
          {needsReview && <span className="muted" style={{ fontWeight: 400 }}> (לאימות)</span>}
        </div>
        <div
          style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: 15,
            lineHeight: 1.9,
            margin: '6px 0 8px',
          }}
        >
          {emphasizeFirstLetter(fullText)}
        </div>
        <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>
          פירוש פשוט: {commentary}
        </div>
      </div>
    </div>
  );
}

export default function MishnaTab({ person }) {
  const entries = mishnayotForName(person.firstName);

  return (
    <main className="content">
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
            <MishnaCard key={i} {...entry} />
          ))}
        </div>
      </div>

      <div>
        <div className="section-label" style={{ marginBottom: 8 }}>
          לעילוי נשמה — מסכת {NESHAMA_ADDENDUM.tractate}, פרק {NESHAMA_ADDENDUM.chapter}
        </div>
        <div className="note-box" style={{ background: 'var(--indigo-soft)', marginBottom: 10 }}>
          נהוג להוסיף בסיום הלימוד את שבע משניות פרק {NESHAMA_ADDENDUM.chapter}׳ במסכת {NESHAMA_ADDENDUM.tractate} במלואן
          (ולא לפי אותיות) — לעילוי נשמה, מפני שאותיות ״משנה״ הן צירוף אותיות ״נשמה״.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NESHAMA_ADDENDUM.mishnayot.map((m, i) => (
            <MishnaCard
              key={i}
              letter={m.mishna}
              tractate={NESHAMA_ADDENDUM.tractate}
              chapter={NESHAMA_ADDENDUM.chapter}
              mishna={m.mishna}
              fullText={m.fullText}
              commentary={m.commentary}
              indigo
            />
          ))}
        </div>
      </div>

      <div className="disclaimer">
        התוכן מבוסס על טקסט המשנה המקורי (ספריא) ופירוש פשוט מקורי. לפני שימוש מומלץ לבדוק מול רב או מקור הלכתי מוסמך.
      </div>
    </main>
  );
}
