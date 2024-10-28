export async function fetchProjects(): Promise<string[]> {
  const res = await fetch('https://pm25.lass-net.org/API-1.0.0/project/all/');
  
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.statusText}`);
  }

  const text = await res.text();
  return text.split('\n').filter((line) => line.trim() !== ""); // Split by new lines and filter out empty lines
}
