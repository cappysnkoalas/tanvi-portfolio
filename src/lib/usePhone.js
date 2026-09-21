import { useEffect, useState } from 'react';

// The phone tier, matching the breakpoint the stylesheet lays the stops out
// at. Some behaviour has to know which one it is in — a tap on a print opens
// it full size here, where the prints are too small to read, and toggles its
// note on a wider screen, where they are not.
const PHONE = '(max-width: 640px)';

export default function usePhone() {
  const [phone, setPhone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PHONE).matches
  );

  useEffect(() => {
    const query = window.matchMedia(PHONE);
    const onChange = (event) => setPhone(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return phone;
}
