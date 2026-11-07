import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main" className="grid bg-sand pt-20 lg:min-h-[80vh] lg:grid-cols-2">
        <div className="studio-light flex flex-col justify-center px-6 py-20 md:px-10 lg:px-14 xl:pl-20">
          <p className="label text-mute">Error 404</p>
          <h1 className="mt-6 text-[length:clamp(2.75rem,6vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.025em] text-coal">
            This page is
            <br />
            unwritten.
          </h1>
          <span className="rule mt-8 text-coal" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-coal/75">
            The page you&apos;re looking for doesn&apos;t exist — yet. Let&apos;s get you back to something we&apos;ve
            already made.
          </p>
          <Link href="/" className="btn-dark group mt-10 w-fit">
            Back to home
            <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="relative min-h-[20rem] overflow-hidden bg-sand-300">
          <Image src="/images/brand/envelope.jpg" alt="Sealed black Inkelse envelope" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </main>

      <FooterCMYK />
    </>
  );
}
