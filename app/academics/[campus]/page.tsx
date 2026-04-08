import { notFound } from 'next/navigation';
import Link from 'next/link';

// ─── Video Data ───────────────────────────────────────────────────────────────

const VIDEO_DATA: Record<string, { title: string; videos: string[] }> = {
  neelankarai: {
    title: 'Pre-School — Neelankarai',
    videos: ['zxP4f5SOq50'],
  },
  injambakkam: {
    title: 'High School — Injambakkam',
    videos: ['jMmEAlXPifo', 'HaTxLjAhUJE'],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ campus: string }>;
}

export default async function CampusPage({ params }: PageProps) {
  const { campus } = await params;
  const data = VIDEO_DATA[campus];

  if (!data) notFound();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#F8F6F2',
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

        {/* Back link */}
        <Link
          href="/#academics"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: '#1A3C6E',
            textDecoration: 'none',
            marginBottom: '32px',
            opacity: 0.7,
          }}
        >
          ← Back to Academics
        </Link>

        {/* Heading */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#D4AF37',
            marginBottom: '10px',
          }}>
            Campus Tour
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 600,
            color: '#1A3C6E',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            {data.title}
          </h1>
        </div>

        {/* Videos */}
        {data.videos.length === 1 ? (
          <iframe
            src={`https://www.youtube.com/embed/${data.videos[0]}`}
            className="w-full aspect-video rounded-xl"
            allowFullScreen
            title={`${data.title} Campus Tour`}
            style={{ border: 'none', display: 'block' }}
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {data.videos.map((id, i) => (
              <iframe
                key={id}
                src={`https://www.youtube.com/embed/${id}`}
                className="w-full aspect-video rounded-xl"
                allowFullScreen
                title={`${data.title} Campus Tour ${i + 1}`}
                style={{ border: 'none', display: 'block' }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [{ campus: 'neelankarai' }, { campus: 'injambakkam' }];
}
