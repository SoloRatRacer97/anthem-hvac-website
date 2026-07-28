import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="notFoundPage">
      <section className="notFoundCard" aria-labelledby="not-found-title">
        <Link className="notFoundLogo" href="/" aria-label="Anthem home">
          <img src="/assets/anthem-logo.svg" alt="Anthem Cooling, Heating & Plumbing" />
        </Link>
        <p>404 error</p>
        <h1 id="not-found-title">This page went down the drain.</h1>
        <span>The link may be broken or the page may have moved.</span>
        <div>
          <Link href="/">Back to Home</Link>
          <a href="tel:+17608952621">Call (760) 895-2621</a>
        </div>
      </section>
      <style>{`
        .notFoundPage { align-items: center; background: radial-gradient(circle at 18% 18%, rgba(240,22,45,.32), transparent 28%), linear-gradient(135deg, #07101f, #05080e); color: #fff; display: flex; font-family: Inter, Arial, sans-serif; justify-content: center; min-height: 100vh; padding: 32px; }
        .notFoundCard { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); border-radius: 24px; max-width: 760px; padding: clamp(32px, 6vw, 64px); text-align: center; }
        .notFoundLogo img { max-width: min(320px, 78vw); }
        p { color: #ffb400; font-size: 13px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
        h1 { font-size: clamp(42px, 7vw, 78px); letter-spacing: -.07em; line-height: .95; margin: 0 0 18px; }
        span { color: rgba(255,255,255,.82); display: block; font-size: 18px; line-height: 1.6; }
        div { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 30px; }
        div a { border-radius: 999px; font-weight: 900; padding: 14px 22px; text-decoration: none; }
        div a:first-child { background: #f0162d; color: #fff; }
        div a:last-child { background: #fff; color: #07101f; }
      `}</style>
    </main>
  );
}
