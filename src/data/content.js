// All site copy lives here so text edits never require touching markup.

const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

export const tickerWords = [
  { text: 'DESIGNER', color: 'c-rose' },
  { text: 'ENGINEER', color: 'c-olive' },
  { text: 'SPEAKER', color: 'c-pink' },
  { text: 'WRITER', color: 'c-gold' },
  { text: 'CREATIVE', color: 'c-rose' },
  { text: 'LEADER', color: 'c-olive' },
  { text: 'BUILDER', color: 'c-pink' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#journey' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

// Five stops along the winding path. All placeholder for now — swap the
// copy here and the layout follows automatically.
export const journey = [
  {
    year: '2023 — 2026',
    label: 'THE START',
    title: 'Anokha NGO, VIT',
    blurb:
      'Junior Core Member, then PR & Editorial Head, then Vice Chairperson — three years of teaching, leading, and learning what impact actually looks like.',
    album: {
      name: 'ANOKHA NGO',
      logo: asset('anokha/anokha-logo.png'),
      instagram: 'https://www.instagram.com/ngoanokha',
      handle: '@ngoanokha',
      note: 'more than just a club xx',
      story: [
        "I started my journey with Anokha NGO at VIT as a Junior Core Member in the Education Department, with a simple belief that even small efforts can create meaningful change. What began with teaching and volunteering at orphanages and children's homes slowly became much more than a college activity. It became a space where I could contribute, learn, lead, and, most importantly, see the impact of our work on the people we were trying to serve.",
        "In my second year, I became the Public Relations and Editorial Head, where I took ownership of Anokha's social media, communications, and editorial work. I got the opportunity to explore writing, marketing, hosting, content creation, editing, and digital communication, while discovering a creative side of myself that I hadn't explored before. It was incredibly rewarding to see the work we put into communicating Anokha's initiatives translate into greater outreach, and our efforts that year were recognised with the Best Outreach Club Award at VIT.",
        'In my third year, I stepped into the role of Vice Chairperson, where my responsibilities expanded from managing individual initiatives to leading teams and overseeing large-scale operations. I coordinated a team of 500+ students and helped plan and execute events that brought together 1,200+ participants and attendees. The role pushed me to become a more structured and adaptable leader, learning to coordinate people and resources, manage events, solve problems under pressure, and keep a large team moving towards a common goal. Seeing Anokha go on to receive the Elite Club Award during this period was a particularly proud moment, because it represented the collective effort of the hundreds of students who worked behind the scenes to make our initiatives happen.',
        "Through these years, Anokha has given me the opportunity to grow in communication, leadership, event management, creativity, teamwork, and organisational skills. But beyond the titles, events, and awards, what I value most is the impact we were able to create. My favourite part has always remained the simplest: showing up at a children's home, teaching a child something new, spending time with them, and seeing a little more confidence in their eyes. It reminded me that impact doesn't always have to be grand or measurable. Sometimes, it is simply being there, consistently, and making someone's day a little better. And that is what Anokha has meant to me: learning that creating an impact, no matter how small, is always worth showing up for.",
      ],
      photos: [
        {
          src: asset('anokha/elite-club-award.jpg'),
          alt: 'VIT Certificate of Appreciation — Elite Category (Club) awarded to Anokha NGO for 2025',
          caption: 'Elite Category (Club) — VIT, 2025',
        },
        {
          src: asset('anokha/best-outreach-award.jpg'),
          alt: 'VIT Certificate of Appreciation — Best Club Award, Outreach category, awarded to Anokha for 2024-25',
          caption: 'Best Club Award, Outreach — VIT, 2024–25',
        },
        {
          src: asset('anokha/kalaa-team.jpg'),
          alt: 'The Anokha team on stage at Kalaa 3.0 during Riviera',
          caption: 'On stage at Kalaa 3.0, Riviera',
        },
        {
          src: asset('anokha/childrens-home.jpg'),
          alt: 'Anokha volunteers with children holding their drawings outside a children’s home',
          caption: "A drawing session at a children's home",
        },
      ],
    },
  },
  {
    year: '[Year]',
    label: 'THE BUILD',
    title: '[Experience — e.g. Team Kshatriya, BAJA SAE]',
    blurb: 'A line or two on what you did and what it taught you.',
  },
  {
    year: '[Year]',
    label: 'THE PIVOT',
    title: '[Experience — e.g. design or content work]',
    blurb: 'The moment something shifted — what changed and why.',
  },
  {
    year: '[Year]',
    label: 'THE STRETCH',
    title: '[Experience — e.g. leadership or speaking role]',
    blurb: 'Something that pushed you outside the comfortable lane.',
  },
  {
    year: '[Year]',
    label: 'RIGHT NOW',
    title: '[Experience — e.g. AI & agentic systems]',
    blurb: 'What you\'re in the middle of, and where it\'s heading.',
  },
];

export const skills = [
  {
    title: 'Engineering',
    items: ['[CAD tool — e.g. SolidWorks]', '[Simulation / FEA]', '[Manufacturing / production planning]'],
  },
  {
    title: 'Design',
    items: ['[Visual identity]', '[Figma / Adobe suite]', '[Brand & campaign design]'],
  },
  {
    title: 'Tools',
    items: ['[Programming language]', '[Data / analysis tool]', '[Project management tool]'],
  },
];

export const work = [
  {
    year: '[Year]',
    title: '[Project name — e.g. Team Kshatriya, BAJA SAE]',
    note: "Tell me what to say about this one and I'll write it.",
    outcome: '[One-line result or outcome]',
  },
  {
    year: '[Year]',
    title: '[Project name — e.g. ESG compliance system]',
    note: "Tell me what to say about this one and I'll write it.",
    outcome: '[One-line result or outcome]',
  },
  {
    year: '[Year]',
    title: '[Project name — e.g. design studio work]',
    note: "Tell me what to say about this one and I'll write it.",
    outcome: '[One-line result or outcome]',
  },
];
