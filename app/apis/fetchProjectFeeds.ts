import { FeedEntry } from "../types";

interface ProjectFeedsResponse {
  feeds: FeedEntry[];
  num_of_records: number;
}

export async function fetchProjectFeeds(projectTitle: string): Promise<{ feeds: FeedEntry[]; totalRecords: number }> {
  if (!projectTitle) {
    throw new Error('Failed to fetch project feeds: projectTitle not set');
  }
  
  const res = await fetch(`https://pm25.lass-net.org/API-1.0.0/project/${encodeURIComponent(projectTitle)}/latest/`);
    
  if (!res.ok) {
    throw new Error('Failed to fetch project feeds');
  }

  const data: ProjectFeedsResponse = await res.json();
  
  // Extract feeds and total number of records, limit to the latest 10 entries if there are more than 10
  const feeds = data.feeds.slice(0, Math.min(data.num_of_records, 10));
  return { feeds, totalRecords: data.num_of_records };
}
