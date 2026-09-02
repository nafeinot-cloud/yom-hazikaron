import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { gregorianToHebrew, hebrewNumeral, monthsInDisplayOrder } from '../lib/hebrewCalendar.js';
import { BackIcon } from './icons.jsx';

const CURRENT_HYEAR = new Date().getFullYear() + 3760;
const YEAR_OPTIONS = Array.from({ length: 120 }, (_, i) => CURRENT_HYEAR - i);

export default function PersonForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [hebrewYear, setHebrewYear] = useState(CURRENT_HYEAR);
  const [hebrewMonth, setHebrewMonth] = useState(7); // Tishrei
  const [hebrewDay, setHebrewDay] = useState(1);
  const [nusach, setNusach] = useState('ashkenazi');
  const [gregInput, setGregInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) return;
    getDoc(doc(db, 'people', id)).then((snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      setFullName(d.fullName ?? '');
      setFirstName(d.firstName ?? '');
      setHebrewYear(d.hebrewYear ?? CURRENT_HYEAR);
      setHebrewMonth(d.hebrewMonth ?? 7);
      setHebrewDay(d.hebrewDay ?? 1);
      setNusach(d.nusach ?? 'ashkenazi');
    });
  }, [editing, id]);

  const monthOptions = useMemo(() => monthsInDisplayOrder(hebrewYear), [hebrewYear]);
  const dayOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  function applyGregorianDate(value) {
    setGregInput(value);
    // Accept DD/MM/YYYY
    const m = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return;
    const [, d, mo, y] = m;
    try {
      const h = gregorianToHebrew(Number(y), Number(mo), Number(d));
      setHebrewYear(h.year);
      setHebrewMonth(h.month);
      setHebrewDay(h.day);
    } catch {
      // ignore invalid dates while typing
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!fullName.trim() || !firstName.trim()) return;
    setSaving(true);
    const payload = {
      fullName: fullName.trim(),
      firstName: firstName.trim(),
      hebrewYear,
      hebrewMonth,
      hebrewDay,
      nusach,
    };
    try {
      if (editing) {
        await updateDoc(doc(db, 'people', id), payload);
      } else {
        await addDoc(collection(db, 'people'), payload);
      }
      navigate('/');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="screen">
      <header className="topbar">
        <button className="detail-back" onClick={() => navigate(-1)} aria-label="חזרה">
          <BackIcon />
        </button>
        <h1 style={{ fontSize: 19, fontWeight: 700 }}>{editing ? 'עריכת יקיר' : 'הוספת יקיר לרשימה'}</h1>
      </header>

      <form className="content" onSubmit={handleSave}>
        <div className="field">
          <label className="field-label">שם מלא (לרישום ולהנצחה)</label>
          <input
            className="field-input"
            type="text"
            placeholder="לדוגמה: אברהם בן יצחק כהן"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="field-label">
            שם פרטי הנפטר <span className="muted">— משמש לבחירת המשניות ופסוקי תהילים</span>
          </label>
          <input
            className="field-input"
            type="text"
            placeholder="לדוגמה: אברהם"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="divider" />

        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>תאריך פטירה עברי</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            <select className="field-input" value={hebrewDay} onChange={(e) => setHebrewDay(Number(e.target.value))}>
              {dayOptions.map((d) => (
                <option key={d} value={d}>
                  {hebrewNumeral(d)}
                </option>
              ))}
            </select>
            <select className="field-input" value={hebrewMonth} onChange={(e) => setHebrewMonth(Number(e.target.value))}>
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select className="field-input" value={hebrewYear} onChange={(e) => setHebrewYear(Number(e.target.value))}>
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            יום · חודש · שנה עברית
          </div>
        </div>

        <div className="hint-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>לא בטוחים בתאריך העברי?</span>
          </div>
          <div>אפשר להזין תאריך לועזי, והמערכת תמיר אותו אוטומטית ללוח העברי</div>
          <input
            className="field-input"
            type="text"
            placeholder="לדוגמה: 05/09/2023"
            value={gregInput}
            onChange={(e) => applyGregorianDate(e.target.value)}
          />
        </div>

        <div className="divider" />

        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>נוסח תפילה מועדף</div>
          <div className="chip-row">
            <div
              className={`chip${nusach === 'ashkenazi' ? ' selected' : ''}`}
              onClick={() => setNusach('ashkenazi')}
            >
              אשכנזי
            </div>
            <div className={`chip${nusach === 'sephardi' ? ' selected' : ''}`} onClick={() => setNusach('sephardi')}>
              ספרדי
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: 6 }} disabled={saving}>
          {saving ? 'שומר...' : 'שמירה'}
        </button>
      </form>
    </div>
  );
}
