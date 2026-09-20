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
      { text: 'Junior Core. PR Head. VICE CHAIRPERSON.', strong: true },
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
      tape: 'green',
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
    year: '2024 — 2025',
    label: 'THE PIVOT',
    title: 'Range of View Studios',
    roles: [
      { text: 'Operations Head', strong: true },
      {
        text: 'There’s nothing quite like transforming brand identities and social channels while building the day to day systems that keep a whole studio moving.',
      },
      {
        text: 'My time at ROV built the foundation of how I design, organize, and lead projects today!',
      },
    ],
    album: {
      name: 'RANGE OF VIEW STUDIOS',
      logo: asset('rov/rov-logo.png'),
      cta: 'Read My Journey',
      accent: 'amber',
      // The three site walkthroughs play as one reel: it rolls straight into
      // the next clip on its own, and the arrow and dots let you steer.
      reel: [
        {
          label: 'Range of View Studios',
          src: asset('rov/reel/rovstudios.mp4'),
          poster: asset('rov/reel/rovstudios.jpg'),
        },
        {
          label: 'Aysegul Ikna',
          src: asset('rov/reel/aysegulikna.mp4'),
          poster: asset('rov/reel/aysegulikna.jpg'),
        },
        {
          label: 'The Bando ATL',
          src: asset('rov/reel/thebandoatl.mp4'),
          poster: asset('rov/reel/thebandoatl.jpg'),
        },
      ],
      linksNote: 'click here to check out our projects firsthand!',
      links: [
        {
          href: 'https://www.rovstudios.com/',
          label: 'Range of View Studios',
          logo: asset('rov/link-rov.png'),
        },
        {
          href: 'https://www.thebandoatl.com/',
          label: 'The Bando ATL',
          logo: asset('rov/link-bando.png'),
        },
        {
          href: 'https://www.aysegulikna.com/',
          label: 'Aysegul Ikna',
          logo: asset('rov/link-aysegul.png'),
        },
      ],
      story: [
        'When a few of my close friends started Range of View Studios, an Atlanta based creative production agency specializing in custom web development, brand identity, video production, and AI automation solutions, I watched from the sidelines at first. I officially joined the startup a little later in 2024. Stepping into the team felt like diving straight into a fast moving creative space where we were building everything from the ground up.',
        'Beyond the work itself, this opportunity forced me out of my shell. It pushed me to socialize, communicate openly, and collaborate directly with a diverse group of talented artists from around the world.',
        'My very first experience with client work happened with Aysegul Ikna, a Turkish designer. I was in charge of her social media branding and redesigning her website too. Managing that project from start to finish taught me how to handle client communication, turn feedback into action, and translate someone’s personal identity into a clean digital footprint.',
        'That experience set the stage for our work with Bando ATL. For Bando, I led the redesign of their website, focusing heavily on updating their online menu section. By streamlining how customers browsed and ordered, the redesigned website directly increased their online revenue by 100%.',
        'As the startup grew, the biggest challenge was not just doing the creative work, it was managing how it all came together. Working closely with friends meant we needed real systems to keep things from falling through the cracks. This is where I really developed my management and organizational skills. I took charge of creating schedules, organizing our day to day workflow, and coordinating resources across concurrent client projects to stop bottlenecks before they happened. I also implemented quality control checkpoints for all content and branding deliverables, making sure everything was reviewed thoroughly before any final handoff.',
        'Transitioning into this role completely changed how I look at creative work. Designing something that looks good is only half the battle; real growth comes from pairing that creativity with strong organization, smart scheduling, and reliable management.',
      ],
    },
  },
  {
    year: 'June 2026 — July 2026',
    label: 'THE STRETCH',
    title: 'Zero21 Autos',
    roles: [
      { text: 'Industrial Intern', strong: true },
      {
        text: 'There is nothing quite like diving into active shop floor operations while applying lean manufacturing and building the documentation systems that keep assembly moving.',
      },
      {
        text: 'My time at Zero21 Autos shaped how I analyze engineering workflows, document complex processes, and understand real world factory environments today!',
      },
    ],
    album: {
      name: 'ZERO21 AUTOS',
      logo: asset('zero21/zero21-logo.png'),
      // Photos left of the trail, copy right.
      flip: true,
      cta: 'What I learnt on the floor',
      site: 'https://zero21.autos/',
      siteLabel: 'zero21.autos',
      tape: 'white',
      story: [
        'During my industrial internship at Zero21 Autos, I gained direct, hands on exposure to active factory floor operations supporting EV three wheeler assembly, NPI (New Product Introduction), and conversion kit production lines. Working directly on the shop floor transformed my understanding of real world industrial environments beyond theoretical coursework. I learned firsthand how lean manufacturing principles, such as optimizing takt time, streamlining material flow, and eliminating assembly bottlenecks, are applied to balance lines and maintain consistent throughput in a fast paced production setting.',
        'Beyond line level workflows, I contributed to analyzing EV powertrain dynamics, examining power flow across battery packs, motor controllers, and electric drive subsystems to troubleshoot integration challenges. Alongside this technical analysis, a major focus of my role was developing comprehensive process documentation, Standard Operating Procedures (SOPs), and user manuals across multiple EV vehicle models. This experience taught me that rigorous technical documentation is not just administrative; it is the vital backbone that ensures assembly repeatability, enforces quality control, and bridges engineering specifications with precise floor execution.',
      ],
      photos: [
        {
          src: asset('zero21/ecargo.jpg'),
          alt: 'The Zero21 eCargo electric three wheeler',
        },
        {
          src: asset('zero21/user-manual.jpg'),
          alt: 'Cover of the Zero21 user manual, showing the eCargo, Teer, Chalo Passenger and Chalo Loader models',
        },
        {
          src: asset('zero21/internship-certificate.jpg'),
          alt: 'Zero21 internship completion certificate, June to July 2026',
        },
      ],
    },
  },
  {
    year: '2026 — ongoing',
    label: 'RIGHT NOW',
    title: 'Agentic AI for ESG Compliance in Supply Chains',
    roles: [
      { text: 'Ongoing project', strong: true },
      {
        text: 'Rooted in mechanical engineering but driven by modern tech, I refuse to stay in a traditional lane. As industry rapidly evolves, I am channeling my engineering mindset into building autonomous, agentic AI systems that solve real world operational challenges.',
      },
    ],
    album: {
      name: 'AGENTIC AI FOR ESG COMPLIANCE',
      cta: 'What I am building',
      accent: 'pink',
      // A project rather than somewhere I worked, so the sheet drops the
      // "my journey at" line the other stops carry.
      noKicker: true,
      story: [
        'While my academic roots lie in mechanical engineering, I have never wanted to stay confined to a traditional mechanical path. Industry demands are rapidly evolving, and my passion centers on staying ahead of emerging technical curves by actively mastering how to design and build autonomous, agentic AI systems. Rather than restricting myself to conventional domain boundaries, I am expanding my software engineering toolkit to bridge physical operations with modern intelligence. I am actively working with and learning tools like n8n for orchestration, Claude Code for AI accelerated development, Supabase for scalable database backends, GitHub for version control, Docker for containerization, and Cursor for intelligent coding workflows.',
        'This technical foundation drives my ongoing project, Agentic AI for ESG Compliance in Supply Chains. The initiative targets modern procurement and sourcing challenges by embedding Environmental, Social, and Governance benchmarks directly into autonomous agent workflows. By integrating live APIs, the system automates supplier onboarding, risk screening, and sustainability scoring across complex operations. Using n8n and Supabase alongside custom logic, the agent actively screens suppliers against public sanctions or deforestation watchlists, flags single region supply concentration risks, and parses compliance paperwork before certificates expire.',
        'Looking across the broader supply chain pipeline, the architecture is structured to expand through five sequential phases: Sourcing and Procurement, Supplier Onboarding and Contracting, Production and Manufacturing, Logistics and Distribution, and ongoing Reporting and Monitoring. Currently focused on the procurement stage, the agent powers automated decision audit trails, generates sustainability ready tender criteria, and calculates dynamic supplier scorecards. By turning public disclosures and enterprise records into real time intelligence, this project reflects my broader mission to engineer scalable AI architectures that modernize industrial and operational workflows.',
      ],
      tape: 'pink',
      wall: 'slides',
      // Slides rather than photographs, so each carries a note: at pile size
      // the type is too small to read, and the caption says what it shows.
      photos: [
        {
          src: asset('esg/the-problem.png'),
          alt: 'Project slide titled The Problem, listing the blind spots left by spreadsheet-based procurement',
          note: 'The problem: procurement run on disconnected spreadsheets',
        },
        {
          src: asset('esg/workflow-as-built.png'),
          alt: 'The n8n workflow as built, showing the trigger, gather and AI read, judge, block and chase branches, and the fail-safe path',
          note: 'The n8n workflow as built, end to end',
        },
        {
          src: asset('esg/objectives.png'),
          alt: 'Project slide titled Objectives, setting out three goals: automate the checks, screen every supplier, bring every insight into one score',
          note: 'Three goals, one scorecard',
        },
        {
          src: asset('esg/stage-flow.png'),
          alt: 'Supply chain stage flow across five phases, with sourcing and procurement in focus',
          note: 'Five phases, with sourcing and procurement in focus',
        },
      ],
    },
  },
];

// Eight cards, numbered in order, laid out four across. Each one keeps its
// tools tucked away until the card is hovered or focused — `domain` is only
// there to pull the tool's favicon, so swapping a tool means swapping a
// domain. Placeholder groupings for now: say the word and I'll redo them.
export const skills = [
  {
    title: 'Agentic AI',
    tools: [
      { name: 'n8n', domain: 'n8n.io' },
      { name: 'Claude', domain: 'claude.ai' },
      { name: 'Cursor', domain: 'cursor.com' },
      { name: 'LangChain', domain: 'langchain.com' },
    ],
  },
  {
    title: 'CAD & Modelling',
    tools: [
      { name: 'SolidWorks', domain: 'solidworks.com' },
      { name: 'Fusion 360', domain: 'autodesk.com' },
      { name: 'AutoCAD', domain: 'autocad.com' },
    ],
  },
  {
    title: 'Simulation',
    tools: [
      { name: 'ANSYS', domain: 'ansys.com' },
      { name: 'MATLAB', domain: 'mathworks.com' },
      { name: 'Simulink', domain: 'mathworks.com' },
    ],
  },
  {
    title: 'Development',
    tools: [
      { name: 'GitHub', domain: 'github.com' },
      { name: 'Docker', domain: 'docker.com' },
      { name: 'React', domain: 'react.dev' },
      { name: 'VS Code', domain: 'code.visualstudio.com' },
    ],
  },
  {
    title: 'Data & Backend',
    tools: [
      { name: 'Supabase', domain: 'supabase.com' },
      { name: 'PostgreSQL', domain: 'postgresql.org' },
      { name: 'Python', domain: 'python.org' },
    ],
  },
  {
    title: 'Design & Brand',
    tools: [
      { name: 'Figma', domain: 'figma.com' },
      { name: 'Canva', domain: 'canva.com' },
      { name: 'Photoshop', domain: 'adobe.com' },
    ],
  },
  {
    title: 'Content & PR',
    tools: [
      { name: 'Instagram', domain: 'instagram.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Lightroom', domain: 'adobe.com' },
    ],
  },
  {
    title: 'Leadership & Ops',
    tools: [
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'Sheets', domain: 'google.com' },
    ],
  },
];

