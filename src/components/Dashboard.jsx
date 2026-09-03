import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase.js';
import { absToGregorian, absToHebrew, gregorianToAbs, hebrewMonthName, hebrewNumeral, nextYahrzeit } from '../lib/hebrewCalendar.js';
import { displayName, honorific } from '../lib/person.js';
import { buildYahrzeitIcs, downloadIcs } from '../lib/calendarExport.js';
import { AppFlameIcon, CalendarPlusIcon, CalendarIcon, EditIcon, PlusIcon } from './icons.jsx';
import FontSizeControl from './FontSizeControl.jsx';

const NUSACH_LABEL = { ashkenazi: 'נוסח אשכנזי', sephardi: 'נוסח ספרדי' };

function formatGregorian({ year, month, day }) {
  return new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(Date.UTC(year, month - 1, day))
  );
}

export default function Dashboard() {
  const [people, setPeople] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'people'), orderBy('firstName'));
    return onSnapshot(q, (snap) => {
      setPeople(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const sorted = useMemo(() => {
    if (!people) return null;
    const todayAbs = gregorianToAbs(...Object.values(todayYMD()));
    return people
      .map((p) => {
        const nextAbs = nextYahrzeit(p.hebrewMonth, p.hebrewDay, todayAbs);
        const yearsSince = p.hebrewYear ? absToHebrew(nextAbs).year - p.hebrewYear : null;
        return { ...p, nextAbs, daysUntil: nextAbs - todayAbs, yearsSince };
      })
      .sort((a, b) => a.nextAbs - b.nextAbs);
  }, [people]);

  function handleEdit(e, id) {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${id}`);
  }

  function handleAddToCalendar(e, p) {
    e.preventDefault();
    e.stopPropagation();
    const todayAbs = gregorianToAbs(...Object.values(todayYMD()));
    const ics = buildYahrzeitIcs(p, { fromAbs: todayAbs });
    const safeName = displayName(p).replace(/[^\wא-ת]+/g, '-');
    downloadIcs(`יום-הזכרון-${safeName}.ics`, ics);
  }

  return (
    <div className="screen">
      <header className="topbar">
        <div className="topbar-icon">
          <AppFlameIcon size={20} />
        </div>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 700 }}>לוח הזכרונות</h1>
        </div>
        <FontSizeControl />
      </header>

      <main className="content">
        {sorted === null && <div className="muted center-pad">טוען...</div>}
        {sorted && sorted.length === 0 && (
          <div className="muted center-pad">עדיין לא נוספו יקירים. לחצו על + כדי להוסיף.</div>
        )}
        {sorted && sorted.length > 0 && (
          <>
            <div className="section-label">{sorted.length} יקירים ברשימה · הקרוב מסומן</div>
            {sorted.map((p, i) => (
              <Link to={`/person/${p.id}`} key={p.id} className={`person-card${i === 0 ? ' next' : ''}`}>
                <div className="person-card-main">
                  <div className="person-name">
                    {displayName(p)} {honorific(p)}
                  </div>
                  <div className="person-date">
                    <CalendarIcon size={15} />
                    <span>
                      {hebrewNumeral(p.hebrewDay)} ב{hebrewMonthName(p.hebrewMonth, p.hebrewYear ?? new Date().getFullYear() + 3760)}
                    </span>
                  </div>
                  <div className="person-date-greg">יחול השנה: {formatGregorian(absToGregorian(p.nextAbs))}</div>
                  {p.yearsSince > 0 && (
                    <div className="person-date-greg">
                      {p.yearsSince} שנים {p.gender === 'female' ? 'לפטירתה' : 'לפטירתו'}
                    </div>
                  )}
                  <div className="nusach-tag">{NUSACH_LABEL[p.nusach] ?? NUSACH_LABEL.ashkenazi}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div className={`days-badge${i === 0 ? ' gold' : ''}`}>
                    <div className="days-num">{p.daysUntil}</div>
                    <div className="days-label">ימים</div>
                  </div>
                  <button onClick={(e) => handleAddToCalendar(e, p)} aria-label="הוספה ליומן" className="card-action-btn">
                    <CalendarPlusIcon size={15} />
                  </button>
                  <button onClick={(e) => handleEdit(e, p.id)} aria-label="עריכה" className="card-action-btn">
                    <EditIcon size={15} />
                  </button>
                </div>
              </Link>
            ))}
          </>
        )}
      </main>

      <Link to="/add" className="fab" aria-label="הוספת יקיר">
        <PlusIcon />
      </Link>
    </div>
  );
}

function todayYMD() {
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}
