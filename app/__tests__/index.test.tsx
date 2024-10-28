import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('HomePage', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('displays a list of project titles', async () => {
    // Mock response with a few project names
    fetchMock.mockResponseOnce(`Project 1\nProject 2\nProject 3`);

    render(await HomePage());

    // Verify that each project title appears as a list item
    const projectTitles = await screen.findAllByRole('link');
    expect(projectTitles).toHaveLength(4);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
  });

  it('displays each project title as a clickable link to the project detail page', async () => {
    fetchMock.mockResponseOnce(`Project A\nProject B`);

    render(await HomePage());

    const projectLinkA = await screen.findByText('Project A');
    const projectLinkB = await screen.findByText('Project B');

    expect(projectLinkA).toHaveAttribute('href', '/project/Project%20A');
    expect(projectLinkB).toHaveAttribute('href', '/project/Project%20B');
  });

  it('displays an error message if fetching projects fails', async () => {
    fetchMock.mockReject(new Error('Failed to fetch projects'));

    render(await HomePage());

    const errorMessage = await screen.findByText(/Failed to fetch projects/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
