import Image from 'next/image'
import Link from 'next/link';

// This component utilises a css trick to use the Image tag within a background, retaining the benefits of the Image tag.
export default function HeroHeading() {
  return (
    <div className="h-64">
      <div className="absolute inset-0 -z-10 h-64 overflow-hidden">
        <Image
          src="/header-background.webp"
          quality={100}
          width={2560}
          height={996}
          alt="Header"
        />
      </div>
      <div className="p-10"><Link href="/">Home</Link></div>
    </div>
  );
}
