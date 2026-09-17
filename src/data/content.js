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
    // One entry per line; `strong` is the roles line, which carries the weight.
    roles: [
      { text: 'VICE CHAIRPERSON', strong: true },
      { text: 'Junior Core. PR Head. Vice Chairperson.', strong: true },
      { text: 'From Day 1 to leading a team.' },
      { text: 'Learning, creating, and making an impact!' },
    ],
    album: {
      name: 'ANOKHA NGO',
      logo: asset('anokha/anokha-logo.png'),
      instagram: 'https://www.instagram.com/ngoanokha/',
      glimpse: 'a little glimpse into who are we and what we do :)!',
      video: asset('anokha/anokha-video.mp4'),
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
          src: asset('anokha/stage-performance.jpg'),
          alt: 'A singer performing on stage at Kalaa 3.0, Anokha’s flagship event',
          caption: 'On stage at Kalaa 3.0',
          // Only photo with a `note`, so only this one opens a label on click.
          note: 'organised Kalaa 3.0, our flagship event <3',
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
    year: '2023 — 2026',
    label: 'THE BUILD',
    title: 'Team Kshatriya',
    roles: [
      { text: 'CAD & ANSYS Engineer.', strong: true },
      { text: 'Nothing beats the rush of watching pixels turn into an actual fully built ATV.' },
      { text: 'My time with Team Kshatriya built the foundation of how I engineer today.' },
    ],
    album: {
      name: 'TEAM KSHATRIYA',
      logo: asset('kshatriya/kshatriya-logo.jpg'),
      // Mirrors the stop: photos on the left of the trail, copy on the right.
      flip: true,
      cta: 'Where the engineering journey began',
      // This stop's accent colour, used by both the CTA and the line above the
      // photos so the green reads as the stop's own rather than a one-off.
      accent: 'green',
      glimpse:
        'Designed on screens, tested in the mud: the dirt, sweat, and grind of BAJA SAE 2026!',
      // Sits in the empty pocket bottom-right of the pile, with an arrow drawn
      // from it up to the photos.
      badge: {
        src: asset('kshatriya/baja-logo.png'),
        alt: 'BAJA SAEINDIA 2026 logo',
      },
      // Line-art buggy and bulb, filling the space under the copy on this stop.
      doodles: true,
      story: [
        'From CAD models on a screen to a fully built ATV, my time with Team Kshatriya gave me one of my strongest foundations in engineering. Working across eBAJA and hBAJA, I gained hands on experience in vehicle design, 3D modelling, FEA, DFM and manufacturing, using SolidWorks, CATIA, ANSYS and HyperMesh. It taught me how engineering decisions translate into real world performance.',
        'A significant part of my role was designing the roll cage, working within the BAJA SAEINDIA rulebook while balancing structural strength, weight, ergonomics and manufacturability. Seeing the design progress from CAD to a fabricated structure on the vehicle made this one of the most rewarding parts of my experience.',
        'The experience also gave me exposure beyond design, including vendor sourcing, procurement, lead time planning and inbound logistics, along with first hand learning in lean manufacturing, process optimisation, cost reduction and DFM on the factory floor. Being involved in fabrication, machining, assembly, testing and troubleshooting helped me understand how a product moves from concept to a finished product.',
        'Working through a demanding competition season, with tight deadlines and constant iterations, strengthened my problem solving, teamwork, adaptability and attention to detail. More than learning to design a vehicle, I learnt to think about the entire lifecycle of a product, how it is designed, made, sourced, assembled and ultimately performs in the real world.',
        'It was more than learning to design a vehicle, it was learning how engineering works in the real world.',
      ],
      // Order matters: the collage sizes each slot to suit the shape of the
      // photo in it — landscapes wide, portraits tall.
      photos: [
        {
          src: asset('kshatriya/cad-model.jpg'),
          alt: 'SolidWorks model of the BAJA ATV showing the roll cage, driver position and suspension',
        },
        {
          src: asset('kshatriya/ebaja-e86.jpg'),
          alt: 'The eBAJA car, E86, at the static event pit',
        },
        {
          src: asset('kshatriya/hbaja-h18.jpg'),
          alt: 'The hBAJA car, H18, on the course below the BAJA 2026 hill sign',
        },
        {
          src: asset('kshatriya/team-crew.jpg'),
          alt: 'Part of the Team Kshatriya crew at the BAJA SAEINDIA event',
        },
        {
          src: asset('kshatriya/acceleration-award.jpg'),
          alt: 'Team Kshatriya with the winner cheque for the Acceleration Award at BAJA SAEINDIA',
        },
      ],
    },
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
