import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase.js';
import { absToGregorian, gregorianToAbs, hebrewMonthName, hebrewNumeral, nextYahrzeit } from '../lib/hebrewCalendar.js';
import { displayName, honorific } from '../lib/person.js';
import { CalendarIcon, FlameIcon, PlusIcon } from './icons.jsx';

const NUSACH_LABEL = { ashkenazi: 'נוסח אשכנזי', sephardi: 'נוסח ספרדי' };

function formatGregorian({ year, month, day }) {
  return new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(Date.UTC(year, month - 1, day))
  );
}

export default function Dashboard() {
  const [people, setPeople] = useState(null);

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
        return { ...p, nextAbs, daysUntil: nextAbs - todayAbs };
      })
      .sort((a, b) => a.nextAbs - b.nextAbs);
  }, [people]);

  return (
    <div className="screen">
      <header className="topbar">
        <div className="topbar-icon">
          <FlameIcon size={20} />
        </div>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 700 }}>לוח הזכרונות</h1>
        </div>
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
                  <div className="nusach-tag">{NUSACH_LABEL[p.nusach] ?? NUSACH_LABEL.ashkenazi}</div>
                </div>
                <div className={`days-badge${i === 0 ? ' gold' : ''}`}>
                  <div className="days-num">{p.daysUntil}</div>
                  <div className="days-label">ימים</div>
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
