import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main" className="bg-mesh-dark bg-grain relative flex min-h-[80vh] items-center overflow-hidden pt-24 text-paper">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-grid-fade absolute inset-0" />
          <div className="aurora-blob -left-20 top-10 h-80 w-80 bg-cyan/40" />
          <div className="aurora-blob -right-20 bottom-0 h-80 w-80 bg-magenta/35" style={{ animationDelay: '-8s' }} />
        </div>
        <Container variant="editorial" className="relative z-10">
          <div className="glass-dark mx-auto max-w-xl rounded-[2rem] p-10 text-center md:p-14">
            <p className="text-gradient-cmyk font-display text-8xl font-black tracking-tightest md:text-9xl">404</p>
            <h1 className="mt-4 font-display text-display-sm tracking-tightest">
              This page is <span className="font-serif italic font-normal">unwritten.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-paper/70">
              The page you&apos;re looking for doesn&apos;t exist — yet. Let&apos;s get you back to something
              we&apos;ve already made.
            </p>
            <Link href="/" className="btn-pill-gradient btn-shine mt-8">
              <span className="shine" aria-hidden="true" />
              Back to home
            </Link>
          </div>
        </Container>
      </main>

      <FooterCMYK />
    </>
  );
}
