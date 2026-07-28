export function generateServiceMetadata(service) {
  return {
    title: `${service.title} | Anthem Plumbing, Heating & Cooling`,
    description: `${service.title} from Anthem Air Conditioning & Plumbing. ${service.copy}`,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default function ServicePage() {
  return (
    <>
      <div style={{ minHeight: '100vh', background: '#07101f' }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            fetch('/services.html?v=mobile-form-footer-0715', { cache: 'no-store' })
              .then((response) => response.text())
              .then((html) => {
                document.open();
                document.write(html);
                document.close();
              });
          `,
        }}
      />
    </>
  );
}
