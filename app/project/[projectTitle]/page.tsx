import HeroHeading from '@/app/components/heroBanner';
import { fetchProjectFeeds } from '@/app/apis/fetchProjectFeeds';

type Params = Promise<{ projectTitle: string }>;

export default async function ProjectDetailPage(props: { params?: Params }) {
  const params = props.params ? await props.params : { projectTitle: '' };
  const { projectTitle } = params;
  const { feeds, totalRecords } = await fetchProjectFeeds(projectTitle as string);

  // If `projectTitle` is missing, return a "not found" message
  if (!projectTitle) {
    return (
      <div>
        <HeroHeading />
        <header className="hero-banner bg-gray-200 p-4 text-center">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
        </header>
        <main className="p-4">
          <h2 className="text-red-600">The project title was not provided.</h2>
        </main>
      </div>
    );
  }

  if (!feeds) {
    return (
      <div>
        <HeroHeading />
        <header className="hero-banner bg-gray-200 p-4 text-center">
          <h1 className="text-2xl font-bold">Feeds info Not Found</h1>
        </header>
        <main className="p-4">
          <h2 className="text-red-600">Failed to load project details: API is down</h2>
        </main>
      </div>
    );
  }

  try {
    return (
      <div>
        <HeroHeading />
        <header className="hero-banner bg-gray-900 p-4 text-center">
          <h1 className="text-2xl font-bold">Project: {projectTitle}</h1>
        </header>
        <main className="p-4">
        <h2 className="text-xl mb-4">Total Feed Entries: {totalRecords}</h2>
        <h3 className="text-lg mb-4">Latest {feeds.length} Feed Entries</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Device ID</th>
                <th className="border p-2">Latitude</th>
                <th className="border p-2">Longitude</th>
                <th className="border p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {feeds.map((entry) => (
                <tr key={entry.device_id}>
                  <td className="border p-2">{entry.device_id}</td>
                  <td className="border p-2">{entry.gps_lat}</td>
                  <td className="border p-2">{entry.gps_lon}</td>
                  <td className="border p-2">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return (
        <div>
          <header className="hero-banner bg-gray-200 p-4 text-center">
            <h1 className="text-2xl font-bold">Project: {projectTitle}</h1>
          </header>
          <main className="p-4">
            <h2 className="text-red-600">Failed to load project details: {error.message}</h2>
          </main>
        </div>
      );
    }
  }
}
