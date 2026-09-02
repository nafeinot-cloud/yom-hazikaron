import { mishnayotForName, NESHAMA_ADDENDUM } from '../data/mishnayot.js';

export default function MishnaTab({ person }) {
  const entries = mishnayotForName(person.firstName);

  return (
    <main className="content">
      <div className="note-box">
        לכל אות בשם <b style={{ color: 'var(--text)' }}>{person.firstName}</b>, נבחרה משנה קצרה הפותחת באותה אות - מנהג לימוד
        לעילוי נשמה, נלמד בערב או ביום יום הזכרון.
      </div>

      <div>
        <div className="section-label" style={{ marginBottom: 8 }}>
          לפי אותיות השם — {person.firstName}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {entries.map((entry, i) => (
            <div className="mishna-card" key={i}>
              <div className="letter-badge">{entry.letter}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  {entry.tractate}, פרק {entry.chapter}
                  {entry.mishna ? ` משנה ${entry.mishna}` : ''}
                  {entry.needsReview && (
                    <span className="muted" style={{ fontWeight: 400 }}> (לאימות)</span>
                  )}
                </div>
                <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 14.5, margin: '4px 0 6px' }}>
                  ״{entry.firstWords}...״
                </div>
                <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>
                  פירוש פשוט: {entry.commentary}
                </div>
              </div>
            </div>
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
        <div className="mishna-card">
          <div className="letter-badge indigo" style={{ width: 'auto', padding: '0 10px', fontSize: 14 }}>
            {NESHAMA_ADDENDUM.tractate}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>
              {NESHAMA_ADDENDUM.tractate}, פרק {NESHAMA_ADDENDUM.chapter}׳, משניות א׳–ז׳
            </div>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 4 }}>{NESHAMA_ADDENDUM.note}</div>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        התוכן להמחשה בלבד. לפני שילוב באפליקציה מומלץ לבדוק את הנוסח מול רב או מקור הלכתי מוסמך.
      </div>
    </main>
  );
}
