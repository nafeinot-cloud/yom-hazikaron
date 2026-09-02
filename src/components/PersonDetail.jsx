import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { hebrewMonthName, hebrewNumeral } from '../lib/hebrewCalendar.js';
import { displayName, honorific } from '../lib/person.js';
import { BackIcon, BookIcon, PrayerIcon, WallIcon } from './icons.jsx';
import FontSizeControl from './FontSizeControl.jsx';
import MishnaTab from './MishnaTab.jsx';
import TefilaTab from './TefilaTab.jsx';
import MemorialWall from './MemorialWall.jsx';

const TABS = [
  { id: 'mishna', label: 'לימוד משניות', Icon: BookIcon },
  { id: 'tefila', label: 'עלייה לקבר', Icon: PrayerIcon },
  { id: 'wall', label: 'עמוד זיכרון', Icon: WallIcon },
];

export default function PersonDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [tab, setTab] = useState('mishna');

  useEffect(() => {
    getDoc(doc(db, 'people', id)).then((snap) => {
      if (snap.exists()) setPerson({ id: snap.id, ...snap.data() });
    });
  }, [id]);

  if (!person) {
    return (
      <div className="screen">
        <div className="content muted center-pad">טוען...</div>
      </div>
    );
  }

  return (
    <div className="screen">
      <header className="detail-header">
        <div className="detail-header-row">
          <Link to="/" className="detail-back" aria-label="חזרה">
            <BackIcon />
          </Link>
          <div style={{ minWidth: 0 }}>
            <div className="person-name" style={{ fontSize: 17 }}>
              {displayName(person)} {honorific(person)}
            </div>
            <div className="muted" style={{ fontSize: 12 }}>
              {hebrewNumeral(person.hebrewDay)} ב{hebrewMonthName(person.hebrewMonth, person.hebrewYear)}
              {person.burialPlace ? ` · ${person.burialPlace}` : ''}
            </div>
          </div>
          <FontSizeControl />
        </div>
        <div className="tabs">
          {TABS.map(({ id: tabId, label, Icon }) => (
            <button key={tabId} className={`tab${tab === tabId ? ' active' : ''}`} onClick={() => setTab(tabId)}>
              <Icon size={17} />
              {label}
            </button>
          ))}
        </div>
      </header>

      {tab === 'mishna' && <MishnaTab person={person} />}
      {tab === 'tefila' && <TefilaTab person={person} />}
      {tab === 'wall' && <MemorialWall person={person} />}
    </div>
  );
}
