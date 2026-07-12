import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main" className="flex min-h-[60vh] items-center">
        <Container variant="editorial">
          <div className="text-center">
            <p className="eyebrow mb-6">Error 404</p>
            <h1 className="font-sans font-light text-display-lg tracking-tightest lowercase">
              this page is{' '}
              <span className="italic font-serif text-fountain">unwritten.</span>
            </h1>
            <p className="mt-6 text-lg text-quiet max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist — yet.
              Let&apos;s get you back to something we&apos;ve already made.
            </p>
            <div className="mt-10">
              <Link href="/" className="btn btn-primary btn-lg">
                Back to home
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <FooterCMYK />
    </>
  );
}
