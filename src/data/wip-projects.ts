export interface WipProject {
  slug: string;
  name: string;
  tagline: string;
  status: 'validating' | 'building' | 'live';
  headline: string;
  subheadline: string;
  bullets: string[];
  image?: string; // path to hero image in /public/wip/ (e.g. '/wip/my-project.webp')
  waitlistCount?: number;
}

export const wipProjects: WipProject[] = [
  // Add projects here. Example:
  // {
  //   slug: 'my-project',
  //   name: 'My Project',
  //   tagline: 'One-line description',
  //   status: 'validating',
  //   headline: 'Outcome-focused headline for landing page',
  //   subheadline: 'One sentence expanding the headline.',
  //   bullets: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
  //   waitlistCount: 0,
  // },
];
