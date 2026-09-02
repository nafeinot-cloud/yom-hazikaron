import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, googleProvider, storage } from '../firebase.js';
import { WallIcon } from './icons.jsx';

function timeAgo(date) {
  if (!date) return '';
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days <= 0) return 'היום';
  if (days === 1) return 'אתמול';
  if (days < 7) return `לפני ${days} ימים`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `לפני ${weeks} שבועות`;
  return new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long' }).format(date);
}

export default function MemorialWall({ person }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = signed out
  const [posts, setPosts] = useState(null);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [posting, setPosting] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    const q = query(collection(db, 'people', person.id, 'posts'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [person.id]);

  async function handleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google sign-in failed', err);
    }
  }

  async function handlePost() {
    if (!user || (!text.trim() && !image)) return;
    setPosting(true);
    try {
      let imageUrl = null;
      if (image) {
        const path = `people/${person.id}/posts/${Date.now()}-${image.name}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }
      await addDoc(collection(db, 'people', person.id, 'posts'), {
        text: text.trim(),
        imageUrl,
        authorName: user.displayName ?? 'אנונימי',
        authorUid: user.uid,
        createdAt: serverTimestamp(),
      });
      setText('');
      setImage(null);
    } finally {
      setPosting(false);
    }
  }

  return (
    <main className="content">
      <div className="wall-header-row">
        <div className="muted" style={{ fontSize: 12 }}>זיכרונות ותמונות מבני המשפחה</div>
        <div className="preview-badge">תצוגה מקדימה</div>
      </div>

      {user === null && (
        <button className="google-btn" onClick={handleSignIn}>
          <span className="google-dot" />
          התחברות עם Google להוספת תוכן
        </button>
      )}

      {user && (
        <div className="composer">
          <textarea
            placeholder="שתפו זיכרון, מחשבה או תמונה..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label className="muted" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer' }}>
              <WallIcon size={19} />
              {image ? image.name : 'הוספת תמונה'}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>
            <button className="btn-primary" style={{ width: 'auto', padding: '8px 18px', fontSize: 12.5 }} onClick={handlePost} disabled={posting}>
              {posting ? 'מפרסם...' : 'פרסום'}
            </button>
          </div>
        </div>
      )}

      {posts === null && <div className="muted center-pad">טוען...</div>}
      {posts && posts.length === 0 && <div className="muted center-pad">עדיין אין פוסטים. היו הראשונים לשתף זיכרון.</div>}
      {posts &&
        posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="post-avatar">{post.authorName?.slice(0, 2) ?? '?'}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{post.authorName}</div>
                <div className="muted" style={{ fontSize: 11 }}>{timeAgo(post.createdAt?.toDate?.())}</div>
              </div>
            </div>
            {post.text && <div style={{ fontSize: 13, lineHeight: 1.7 }}>{post.text}</div>}
            {post.imageUrl && <img className="post-photo" src={post.imageUrl} alt="" />}
          </div>
        ))}
    </main>
  );
}
