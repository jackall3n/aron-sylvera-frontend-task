import { render, screen, waitFor } from "@testing-library/react";
import ProjectDetailPage from "../project/[projectTitle]/page";
import { fetchProjectFeeds } from "../apis/fetchProjectFeeds";
import "@testing-library/jest-dom"; // Mock fetchProjectFeeds API function

// Mock fetchProjectFeeds API function
jest.mock("../apis/fetchProjectFeeds");

describe("ProjectDetailPage", () => {
  it('displays "Project Not Found" when projectTitle is missing', async () => {
    const mockParams = Promise.resolve({ projectTitle: "" });
    render(await ProjectDetailPage({ params: mockParams }));

    await waitFor(() => {
      expect(screen.getByText("Project Not Found")).toBeInTheDocument();
      expect(
        screen.getByText("The project title was not provided."),
      ).toBeInTheDocument();
    });
  });

  it('displays "Feeds info Not Found" when feeds are unavailable', async () => {
    const mockParams = Promise.resolve({ projectTitle: "Sample Project" });
    (fetchProjectFeeds as jest.Mock).mockResolvedValue({
      feeds: null,
      totalRecords: 0,
    });

    render(await ProjectDetailPage({ params: mockParams }));

    await waitFor(() => {
      expect(screen.getByText("Feeds info Not Found")).toBeInTheDocument();
      expect(
        screen.getByText("Failed to load project details: API is down"),
      ).toBeInTheDocument();
    });
  });

  it("displays project details when feeds are available", async () => {
    const mockParams = Promise.resolve({ projectTitle: "Sample Project" });
    const mockFeeds = [
      {
        device_id: "1234",
        gps_lat: "37.7749",
        gps_lon: "-122.4194",
        timestamp: "2024-01-01T10:00:00Z",
      },
    ];
    (fetchProjectFeeds as jest.Mock).mockResolvedValue({
      feeds: mockFeeds,
      totalRecords: 1,
    });

    render(await ProjectDetailPage({ params: mockParams }));

    await waitFor(() => {
      expect(screen.getByText("Project: Sample Project")).toBeInTheDocument();
      expect(screen.getByText("Total Feed Entries: 1")).toBeInTheDocument();
      expect(screen.getByText("Device ID")).toBeInTheDocument();
      expect(screen.getByText("1234")).toBeInTheDocument();
    });
  });

  it("displays an error message when fetching project details fails", async () => {
    const mockParams = Promise.resolve({ projectTitle: "Sample Project" });
    (fetchProjectFeeds as jest.Mock).mockRejectedValue(
      new Error("Network Error"),
    );

    render(await ProjectDetailPage({ params: mockParams }));

    await waitFor(() => {
      expect(screen.getByText("Project: Sample Project")).toBeInTheDocument();
      expect(
        screen.getByText("Failed to load project details: Network Error"),
      ).toBeInTheDocument();
    });
  });
});
