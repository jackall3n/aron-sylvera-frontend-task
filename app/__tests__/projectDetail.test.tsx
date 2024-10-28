import { render, screen } from '@testing-library/react';
import ProjectDetailPage from '../project/[projectTitle]/page';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { useParams } from 'next/navigation';

// Enable fetch mocks globally
fetchMock.enableMocks();

// Mock the useParams hook
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('ProjectDetailPage', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('displays the project details when valid projectTitle is provided', async () => {
    // Mock the project title parameter
    (useParams as jest.Mock).mockReturnValue({ projectTitle: 'sampleProject' });

    // Mock API response for valid project with feeds
    fetchMock.mockResponseOnce(JSON.stringify({
      num_of_records: 15,
      feeds: [
        { device_id: '08BEAC0A08AE', gps_lat: 24.251, gps_lon: 120.539, timestamp: '2020-07-01T13:30:50Z' },
        { device_id: '08BEAC0A08AF', gps_lat: 24.252, gps_lon: 120.540, timestamp: '2020-07-01T13:31:50Z' },
      ]
    }));

    render(<ProjectDetailPage />);

    const totalEntries = await screen.findByText(/Total Feed Entries: 15/i);
    expect(totalEntries).toBeInTheDocument();

    const deviceId = await screen.findByText('08BEAC0A08AE');
    expect(deviceId).toBeInTheDocument();
  });

  it('displays "No feed entries available" when feeds are empty', async () => {
    // Mock the project title parameter
    (useParams as jest.Mock).mockReturnValue({ projectTitle: 'sampleProject' });

    // Mock API response with empty feeds
    fetchMock.mockResponseOnce(JSON.stringify({
      num_of_records: 0,
      feeds: []
    }));

    render(<ProjectDetailPage />);

    const noFeedsMessage = await screen.findByText(/Latest 0 Feed Entries/i);
    expect(noFeedsMessage).toBeInTheDocument();
  });
});
