import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Anthem Plumbing, Heating &amp; Cooling</title>
        <meta
          name="description"
          content="The page you requested could not be found. Return home or request plumbing, heating, and cooling service from Anthem."
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <main className="notFoundPage">
        <section className="notFoundCard" aria-labelledby="not-found-title">
          <a className="notFoundLogo" href="/" aria-label="Anthem home">
            <img src="/assets/anthem-logo.svg" alt="Anthem Cooling, Heating & Plumbing" />
          </a>
          <p className="notFoundEyebrow">404 error</p>
          <h1 id="not-found-title">This page went down the drain.</h1>
          <p className="notFoundCopy">
            The link may be broken or the page may have moved. Anthem can still help with plumbing,
            water heaters, heating, cooling, and emergency service.
          </p>
          <div className="notFoundActions">
            <a className="notFoundPrimary" href="/">Back to Home</a>
            <a className="notFoundSecondary" href="tel:+17608952621">Call (760) 895-2621</a>
          </div>
          <nav className="notFoundLinks" aria-label="Helpful links">
            <a href="/services">Services</a>
            <a href="/locations">Locations</a>
            <a href="/aboutus">About Anthem</a>
          </nav>
        </section>
      </main>

      <style jsx>{`
        .notFoundPage {
          align-items: center;
          background:
            radial-gradient(circle at 18% 18%, rgba(240, 22, 45, .32), transparent 28%),
            radial-gradient(circle at 84% 12%, rgba(5, 69, 167, .28), transparent 30%),
            linear-gradient(135deg, #07101f 0%, #0b1424 48%, #05080e 100%);
          color: #fff;
          display: flex;
          font-family: Inter, Arial, sans-serif;
          justify-content: center;
          min-height: 100vh;
          padding: 32px;
        }

        .notFoundCard {
          background: rgba(255, 255, 255, .08);
          border: 1px solid rgba(255, 255, 255, .16);
          border-radius: 24px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, .35);
          max-width: 760px;
          padding: clamp(32px, 6vw, 64px);
          text-align: center;
        }

        .notFoundLogo img {
          height: auto;
          max-width: min(320px, 78vw);
        }

        .notFoundEyebrow {
          color: #ffb400;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 34px 0 14px;
          text-transform: uppercase;
        }

        h1 {
          font-size: clamp(42px, 7vw, 78px);
          letter-spacing: -.07em;
          line-height: .95;
          margin: 0;
        }

        .notFoundCopy {
          color: rgba(255, 255, 255, .82);
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.7;
          margin: 22px auto 0;
          max-width: 600px;
        }

        .notFoundActions,
        .notFoundLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .notFoundActions {
          margin-top: 34px;
        }

        .notFoundPrimary,
        .notFoundSecondary {
          border-radius: 999px;
          font-weight: 900;
          padding: 14px 22px;
          text-decoration: none;
        }

        .notFoundPrimary {
          background: #f0162d;
          color: #fff;
        }

        .notFoundSecondary {
          background: #fff;
          color: #07101f;
        }

        .notFoundLinks {
          border-top: 1px solid rgba(255, 255, 255, .14);
          margin-top: 34px;
          padding-top: 22px;
        }

        .notFoundLinks a {
          color: rgba(255, 255, 255, .84);
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
