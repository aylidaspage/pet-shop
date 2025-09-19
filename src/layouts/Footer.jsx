import s from "./footer.module.css";

export default function Footer() {
  const place = "Wallstraße 9-13, 10179 Berlin, Deutschland";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed&z=15`;

  return (
    <footer className={s.wrap}>
      <h2 className={s.title}>Contact</h2>

      <div className={s.cardsRow}>
        <div className={`${s.col} ${s.colLeft}`}>
          <div className={s.card}>
            <span className={s.label}>Phone</span>
            <span className={s.valueBig}>+49 30 915-88492</span>
          </div>

          <div className={s.card}>
            <span className={s.label}>Address</span>
            <span className={s.valueBig}>{place}</span>
          </div>
        </div>

        <div className={`${s.col} ${s.colRight}`}>
          <div className={s.card}>
            <span className={s.label}>Socials</span>
            <div className={s.socials}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src="/inst.svg" alt="Instagram"/>
              </a>
              <a href="https://wa.me/493091588492" target="_blank" rel="noreferrer">
                <img src="whatsapp.svg" alt="WhatsApp"/>
              </a>
            </div>
          </div>

          <div className={s.card}>
            <span className={s.label}>Working Hours</span>
            <span className={s.valueBig}>24 hours a day</span>
          </div>
        </div>
      </div>

      <div className={s.mapWrap}>
        <iframe
          title="Office location"
          src={mapSrc}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
}
