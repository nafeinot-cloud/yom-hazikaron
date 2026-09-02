import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { gregorianToHebrew, hebrewNumeral, monthsInDisplayOrder } from '../lib/hebrewCalendar.js';
import { BackIcon } from './icons.jsx';

const CURRENT_HYEAR = new Date().getFullYear() + 3760;
const YEAR_OPTIONS = Array.from({ length: 120 }, (_, i) => CURRENT_HYEAR - i);

export default function PersonForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [firstName, setFirstName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [hebrewYear, setHebrewYear] = useState(CURRENT_HYEAR);
  const [hebrewMonth, setHebrewMonth] = useState(7); // Tishrei
  const [hebrewDay, setHebrewDay] = useState(1);
  const [nusach, setNusach] = useState('ashkenazi');
  const [burialPlace, setBurialPlace] = useState('');
  const [gregInput, setGregInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!editing) return;
    getDoc(doc(db, 'people', id)).then((snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      setFirstName(d.firstName ?? '');
      setFatherName(d.fatherName ?? '');
      setLastName(d.lastName ?? '');
      setGender(d.gender ?? 'male');
      setHebrewYear(d.hebrewYear ?? CURRENT_HYEAR);
      setHebrewMonth(d.hebrewMonth ?? 7);
      setHebrewDay(d.hebrewDay ?? 1);
      setNusach(d.nusach ?? 'ashkenazi');
      setBurialPlace(d.burialPlace ?? '');
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
    if (!firstName.trim()) return;
    setSaving(true);
    const payload = {
      firstName: firstName.trim(),
      fatherName: fatherName.trim(),
      lastName: lastName.trim(),
      gender,
      hebrewYear,
      hebrewMonth,
      hebrewDay,
      nusach,
      burialPlace: burialPlace.trim(),
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

  async function handleDelete() {
    if (!confirm(`למחוק את ${firstName} מהרשימה? פעולה זו אינה הפיכה (תוכן שכבר פורסם בעמוד הזיכרון שלו/שלה יישאר בלתי נגיש).`)) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'people', id));
      navigate('/');
    } finally {
      setDeleting(false);
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
          <label className="field-label">
            שם פרטי הנפטר <span className="muted">— משמש גם לבחירת המשניות ופסוקי תהילים</span>
          </label>
          <input
            className="field-input"
            type="text"
            placeholder="לדוגמה: ישראל"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
          <div className="field">
            <label className="field-label">שם האב</label>
            <input
              className="field-input"
              type="text"
              placeholder="לדוגמה: משה יוסף"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label">שם משפחה</label>
            <input
              className="field-input"
              type="text"
              placeholder="לדוגמה: עינות"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="field-label" style={{ marginBottom: 8 }}>
            מין
          </div>
          <div className="chip-row">
            <div className={`chip${gender === 'male' ? ' selected' : ''}`} onClick={() => setGender('male')}>
              זכר
            </div>
            <div className={`chip${gender === 'female' ? ' selected' : ''}`} onClick={() => setGender('female')}>
              נקבה
            </div>
          </div>
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

        <div className="field">
          <label className="field-label">מקום קבורה (לא חובה)</label>
          <input
            className="field-input"
            type="text"
            placeholder="לדוגמה: הר המנוחות, ירושלים"
            value={burialPlace}
            onChange={(e) => setBurialPlace(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: 6 }} disabled={saving}>
          {saving ? 'שומר...' : 'שמירה'}
        </button>

        {editing && (
          <>
            <div className="divider" style={{ marginTop: 10 }} />
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              style={{
                width: '100%',
                background: 'none',
                border: '1.5px solid oklch(60% 0.14 25)',
                color: 'oklch(50% 0.14 25)',
                borderRadius: 'var(--radius-md)',
                padding: 13,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {deleting ? 'מוחק...' : 'מחיקת יקיר מהרשימה'}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
