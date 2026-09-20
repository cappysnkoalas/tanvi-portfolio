import { useEffect, useState } from 'react';

// The two background loops are decoration, and together they are 3.5MB. On a
// phone that is 3.5MB of someone's data for footage cropped to a sliver of its
// frame — so below this width, and whenever the browser asks for less data,
// the poster still image stands in for the video.
const NARROW = '(max-width: 760px)';

function shouldGoLite() {
  if (typeof window === 'undefined') return false;
  // Chrome and friends only; absent elsewhere, which the optional chain covers.
  if (navigator.connection?.saveData) return true;
  return window.matchMedia(NARROW).matches;
}

export default function useLiteMedia() {
  const [lite, setLite] = useState(shouldGoLite);

  useEffect(() => {
    const narrow = window.matchMedia(NARROW);
    const onChange = () => setLite(shouldGoLite());
    narrow.addEventListener('change', onChange);
    return () => narrow.removeEventListener('change', onChange);
  }, []);

  return lite;
}
