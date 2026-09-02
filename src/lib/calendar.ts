export function getGoogleCalendarLink() {
  const title = encodeURIComponent("Vijayalakshmi & Ranjith Raj Wedding Muhurtham");
  const details = encodeURIComponent(
    "Join us to celebrate the divine Mangala Muhurtham of Vijayalakshmi E. & Ranjith Raj B.\n\nSubamuhurtham Window: 6:30 AM – 8:00 AM\nVenue: Ramalaya Kalyana Mandapam, Thiruverkadu, Chennai."
  );
  const location = encodeURIComponent(
    "Ramalaya Kalyana Mandapam, KNV Nagar, Koladi Road, Thiruverkadu, Chennai – 600 077"
  );
  // IST is UTC+5:30.
  // Sept 13, 2026 06:30 IST = Sept 13, 2026 01:00 UTC
  // Sept 13, 2026 08:00 IST = Sept 13, 2026 02:30 UTC
  const dates = "20260913T010000Z/20260913T023000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
