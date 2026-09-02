import { useFontSize } from '../lib/FontSizeContext.jsx';

export default function FontSizeControl() {
  const { scale, increase, decrease } = useFontSize();
  return (
    <div className="font-size-control" role="group" aria-label="הגדלת/הקטנת טקסט">
      <button type="button" onClick={decrease} aria-label="הקטנת טקסט" disabled={scale <= 0.9}>
        א−
      </button>
      <button type="button" onClick={increase} aria-label="הגדלת טקסט" disabled={scale >= 1.6}>
        א+
      </button>
    </div>
  );
}
