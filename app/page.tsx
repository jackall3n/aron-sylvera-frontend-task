import Link from 'next/link';
import HeroHeading from './components/heroBanner';
import { fetchProjects } from './apis/fetchProjects';

export default async function HomePage() {
  try {
    const projects = await fetchProjects();

    return (
      <div>
        <HeroHeading />
        <header className="hero-banner bg-gray-900 p-4 text-center">
          <h1 className="text-2xl font-bold">PM2.5 Monitoring Projects</h1>
        </header>
        <main className="p-4">
          <ul>
            {projects.map((projectTitle) => (
              <li key={projectTitle} className="mb-2">
                <Link href={`/project/${encodeURIComponent(projectTitle)}`} className="text-blue-600 hover:underline">
                  {projectTitle}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return (
        <div>
          <header className="hero-banner bg-gray-900 p-4 text-center">
            <h1 className="text-2xl font-bold">PM2.5 Monitoring Projects</h1>
          </header>
          <main className="p-4">
            <h2 className="text-red-600">Error: {error.message}</h2>
          </main>
        </div>
      );
    }
  }
}
