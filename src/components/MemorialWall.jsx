import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, googleProvider, storage } from '../firebase.js';
import { displayName as personDisplayName } from '../lib/person.js';
import { CandleIcon, CommentIcon, HeartIcon, SmileIcon, WallIcon, WhatsAppIcon } from './icons.jsx';

const REACTION_TYPES = [
  { id: 'candle', Icon: CandleIcon, label: 'הדלקת נר' },
  { id: 'heart', Icon: HeartIcon, label: 'אהבה' },
  { id: 'smile', Icon: SmileIcon, label: 'זיכרון טוב' },
];

// Hosts known to return a viewer PAGE rather than the image file itself —
// pasting these here will silently fail to render.
const NON_DIRECT_LINK_HOSTS = ['photos.app.goo.gl', 'photos.google.com', 'drive.google.com', 'goo.gl'];

function looksLikeNonDirectLink(url) {
  return NON_DIRECT_LINK_HOSTS.some((host) => url.includes(host));
}

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
  const [authorName, setAuthorName] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        if (u) setAuthorName((prev) => prev || u.displayName || '');
      }),
    []
  );

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
    if (!user || (!text.trim() && !image && !imageLink.trim())) return;
    setPosting(true);
    try {
      let imageUrl = null;
      if (image) {
        const path = `people/${person.id}/posts/${Date.now()}-${image.name}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      } else if (imageLink.trim()) {
        imageUrl = imageLink.trim();
      }
      await addDoc(collection(db, 'people', person.id, 'posts'), {
        text: text.trim(),
        imageUrl,
        authorName: authorName.trim() || 'אנונימי',
        authorUid: user.uid,
        reactions: {},
        createdAt: serverTimestamp(),
      });
      setText('');
      setImage(null);
      setImageLink('');
    } finally {
      setPosting(false);
    }
  }

  const linkWarning = imageLink.trim() && looksLikeNonDirectLink(imageLink);

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
          <input
            className="field-input"
            type="text"
            placeholder="השם שלך (יוצג ליד הפוסט)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            style={{ fontSize: 12.5 }}
          />
          <textarea
            placeholder="שתפו זיכרון, מחשבה או תמונה..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label className="muted" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer' }}>
            <WallIcon size={19} />
            {image ? image.name : 'בחירת תמונה מהגלריה'}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                setImage(e.target.files?.[0] ?? null);
                setImageLink('');
              }}
            />
          </label>

          {!image && (
            <div>
              <input
                className="field-input"
                type="text"
                placeholder="או הדביקו קישור ישיר לתמונה (לא קישור שיתוף)"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                style={{ fontSize: 12.5 }}
              />
              {linkWarning && (
                <div className="note-box" style={{ marginTop: 6, fontSize: 11.5, background: 'var(--indigo-soft)' }}>
                  קישור מסוג זה (כמו Google Photos) בדרך כלל לא יעבוד - הוא מוביל לעמוד צפייה ולא לקובץ התמונה עצמו.
                  עדיף להשתמש ב"בחירת תמונה מהגלריה" למעלה.
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
          <PostCard key={post.id} post={post} person={person} currentUid={user?.uid} authorName={authorName} />
        ))}
    </main>
  );
}

function PostCard({ post, person, currentUid, authorName }) {
  const personId = person.id;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(post.text ?? '');
  const [saving, setSaving] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const isOwner = currentUid && post.authorUid === currentUid;
  const reactions = post.reactions ?? {};

  async function toggleReaction(type) {
    if (!currentUid) return;
    const next = {};
    for (const { id } of REACTION_TYPES) {
      next[id] = (reactions[id] ?? []).filter((uid) => uid !== currentUid);
    }
    const alreadyActive = (reactions[type] ?? []).includes(currentUid);
    if (!alreadyActive) next[type] = [...next[type], currentUid];
    await updateDoc(doc(db, 'people', personId, 'posts', post.id), { reactions: next });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'people', personId, 'posts', post.id), { text: draft.trim() });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('למחוק את הפוסט הזה?')) return;
    await deleteDoc(doc(db, 'people', personId, 'posts', post.id));
  }

  function handleShareWhatsApp() {
    const wallUrl = `${location.origin}${location.pathname}#/person/${personId}?tab=wall`;
    const snippet = post.text?.trim() ? `"${post.text.trim().slice(0, 120)}"` : 'תמונה וזיכרון חדשים';
    const message = `${post.authorName ?? 'מישהו מהמשפחה'} פרסם/ה בעמוד הזיכרון של ${personDisplayName(person)}:\n${snippet}\n\nלצפייה: ${wallUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  const commentCount = post.commentCount; // optional future denormalized count; falls back to live list below

  return (
    <div className="post-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="post-avatar">{post.authorName?.slice(0, 2) ?? '?'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{post.authorName}</div>
          <div className="muted" style={{ fontSize: 11 }}>{timeAgo(post.createdAt?.toDate?.())}</div>
        </div>
        {isOwner && !editing && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => {
                setDraft(post.text ?? '');
                setEditing(true);
              }}
              className="muted"
              style={{ background: 'none', border: 'none', fontSize: 12, cursor: 'pointer' }}
            >
              עריכה
            </button>
            <button onClick={handleDelete} className="muted" style={{ background: 'none', border: 'none', fontSize: 12, cursor: 'pointer' }}>
              מחיקה
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            className="field-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ minHeight: 60 }}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setEditing(false)} className="btn-secondary" style={{ width: 'auto', padding: '6px 14px', fontSize: 12 }}>
              ביטול
            </button>
            <button onClick={handleSave} className="btn-primary" style={{ width: 'auto', padding: '6px 14px', fontSize: 12 }} disabled={saving}>
              {saving ? 'שומר...' : 'שמירה'}
            </button>
          </div>
        </div>
      ) : (
        post.text && <div style={{ fontSize: 13, lineHeight: 1.7 }}>{post.text}</div>
      )}

      {post.imageUrl && (
        <img
          className="post-photo"
          src={post.imageUrl}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextSibling.style.display = 'block';
          }}
        />
      )}
      {post.imageUrl && (
        <div className="muted" style={{ display: 'none', fontSize: 11.5 }}>
          לא ניתן להציג את התמונה כאן (ייתכן שזה קישור שיתוף ולא קישור ישיר) - אפשר לפתוח אותה בקישור:{' '}
          <a href={post.imageUrl} target="_blank" rel="noopener noreferrer">
            {post.imageUrl}
          </a>
        </div>
      )}

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', paddingTop: 4, borderTop: '1px solid var(--border)', marginTop: 2 }}>
        {REACTION_TYPES.map(({ id, Icon, label }) => {
          const count = (reactions[id] ?? []).length;
          const active = currentUid && (reactions[id] ?? []).includes(currentUid);
          return (
            <button
              key={id}
              onClick={() => toggleReaction(id)}
              disabled={!currentUid}
              title={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: currentUid ? 'pointer' : 'default',
                color: active ? 'var(--gold)' : 'var(--text-soft)',
                fontSize: 12,
                padding: 0,
              }}
            >
              <Icon size={16} />
              {count > 0 && count}
            </button>
          );
        })}
        <button
          onClick={() => setShowComments((v) => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-soft)', fontSize: 12, marginInlineStart: 'auto' }}
        >
          <CommentIcon size={16} />
          תגובות
        </button>
        <button
          onClick={handleShareWhatsApp}
          title="שיתוף בווטסאפ"
          aria-label="שיתוף בווטסאפ"
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-soft)' }}
        >
          <WhatsAppIcon size={17} />
        </button>
      </div>

      {showComments && <CommentsSection personId={personId} postId={post.id} currentUid={currentUid} authorName={authorName} />}
    </div>
  );
}

function CommentsSection({ personId, postId, currentUid, authorName }) {
  const [comments, setComments] = useState(null);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'people', personId, 'posts', postId, 'comments'), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (snap) => setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }, [personId, postId]);

  async function handleSend() {
    if (!currentUid || !draft.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'people', personId, 'posts', postId, 'comments'), {
        text: draft.trim(),
        authorName: authorName?.trim() || 'אנונימי',
        authorUid: currentUid,
        createdAt: serverTimestamp(),
      });
      setDraft('');
    } finally {
      setSending(false);
    }
  }

  async function handleDeleteComment(commentId) {
    await deleteDoc(doc(db, 'people', personId, 'posts', postId, 'comments', commentId));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
      {comments === null && <div className="muted" style={{ fontSize: 11.5 }}>טוען תגובות...</div>}
      {comments &&
        comments.map((c) => (
          <div key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div className="post-avatar" style={{ width: 24, height: 24, fontSize: 10 }}>{c.authorName?.slice(0, 2) ?? '?'}</div>
            <div style={{ flex: 1, background: 'var(--surface-alt)', borderRadius: 10, padding: '6px 10px' }}>
              <div style={{ fontSize: 11.5, fontWeight: 700 }}>{c.authorName}</div>
              <div style={{ fontSize: 12.5 }}>{c.text}</div>
            </div>
            {currentUid === c.authorUid && (
              <button
                onClick={() => handleDeleteComment(c.id)}
                className="muted"
                style={{ background: 'none', border: 'none', fontSize: 11, cursor: 'pointer' }}
              >
                מחיקה
              </button>
            )}
          </div>
        ))}
      {currentUid && (
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            className="field-input"
            type="text"
            placeholder="הוספת תגובה..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ fontSize: 12.5 }}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={sending || !draft.trim()}
            className="btn-primary"
            style={{ width: 'auto', padding: '8px 14px', fontSize: 12 }}
          >
            שליחה
          </button>
        </div>
      )}
    </div>
  );
}
