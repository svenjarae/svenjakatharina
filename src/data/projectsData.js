// src/data/projectsData.js
// =============================================================
//                       IMAGE IMPORTS
// =============================================================

// --- Spain Images ---
import img1spain from '@/assets/images/spain25/emi.jpeg'
import img2spain from '@/assets/images/spain25/elena.jpeg'
import img3spain from '@/assets/images/spain25/P1071469.jpeg'
import img4spain from '@/assets/images/spain25/P1072223.jpeg'
import img5spain from '@/assets/images/spain25/P1072237.jpeg'
import img6spain from '@/assets/images/spain25/P1072309.jpg'
import img7spain from '@/assets/images/spain25/P1072542.jpeg'
import img8spain from '@/assets/images/spain25/P1072547.jpeg'
import img9spain from '@/assets/images/spain25/P1072550.jpeg'
import img10spain from '@/assets/images/spain25/P1072735.jpeg'
import img11spain from '@/assets/images/spain25/P1072933.jpeg'
import img12spain from '@/assets/images/spain25/P1072947.jpeg'
import img13spain from '@/assets/images/spain25/P1072954.jpeg'
import img14spain from '@/assets/images/spain25/P1072965.jpeg'
import img15spain from '@/assets/images/spain25/P1072998.jpeg'

// --- Bretagne Images ---
import bretagne1 from '@/assets/images/bretagne/bretagne1.jpg'
import bretagne2 from '@/assets/images/bretagne/bretagne2.jpg'
import bretagne3 from '@/assets/images/bretagne/bretagne3.jpg'
import bretagne4 from '@/assets/images/bretagne/bretagne4.jpg'
import bretagne5 from '@/assets/images/bretagne/bretagne5.jpg'
import bretagne6 from '@/assets/images/bretagne/bretagne6.jpg'

// --- Web Dev Projects ---
import gcd1 from '@/assets/images/website/gcd/gcd-desktop.png'
import oc1 from '@/assets/images/website/oc/oc-desktop.png'
import rhm1 from '@/assets/images/website/rhm/rhm-desktop.png'
import cv1 from '@/assets/images/website/codevance/codevance-desktop-app.png'
import cv2 from '@/assets/images/website/codevance/codevance-desktop-website.png'
import irs1 from '@/assets/images/website/irs/irs-desktop.png'
import webDevImg from '@/assets/images/website/dev.png'

// --- Misc Images ---
import scubaDiveNight from '@/assets/images/night-dive.jpeg'
import scubaNemo33 from '@/assets/images/project4.jpg'

// =============================================================
//                       WEB PROJECTS
// =============================================================

export const webProjects = [
  {
    id: 0,
    title: 'Codevance',
    subtitle: 'React • PHP',
    image: cv1,
    url: 'https://learn.4service.io/docs/intro',
  },
  {
    id: 1,
    title: 'Codevance',
    subtitle: 'Vue.js • SCSS',
    image: cv2,
    url: 'https://www.codevance.de/',
  },
  {
    id: 2,
    title: 'Gran Canaria Divers',
    subtitle: 'Wordpress • Elementor • CMS • Shop',
    image: gcd1,
    url: 'https://www.grancanariadivers.com/',
  },
  {
    id: 3,
    title: 'RHM Service',
    subtitle: 'Wordpress • CMS',
    image: rhm1,
    url: 'https://dive-platform.com',
  },
  {
    id: 4,
    title: 'Ocean Collective',
    subtitle: 'Wordpress • CMS • Shop',
    image: oc1,
    url: 'https://ocean-collective.com',
  },
  {
    id: 5,
    title: 'IRS GmbH',
    subtitle: 'Vue.js • SCSS',
    image: irs1,
    url: 'https://irs-gmbh.de/home',
  },
]

// =============================================================
//                          PROJECTS
// =============================================================

export const projects = [
  {
    id: 1,
    category: 'UW Filmmaking',
    title: 'Coast of Hope',
    subtitle: 'With Ocean Collective',
    previewImage: img1spain,
    teaser:
      'Documentary coverage of a citizen-science shark conservation project in the Bay of Biscay.',
    info: 'info',
    date: '07/08/09 2025',
    location: 'Bay of Biskay',

    header: {
      title: 'Coast of Hope',
      subtitle: 'With Ocean Collective',
      cta: { text: 'Have Fun!' },
    },

    sections: [
      {
        type: 'text',
        title: 'Info',
        content:
          'Documentary coverage of a citizen-science shark conservation project in the Bay of Biscay.',
      },

      {
        type: 'features',
        title: 'Skills',
        features: [
          { title: 'When', text: 'Jul/Aug/Sep 2025' },
          { title: 'Where', text: 'Bay of Biskay' },
          {
            title: 'What',
            text: 'Visual Storytelling For YouTube & Content Creation UW and TOPSIDE',
          },
        ],
      },

      {
        type: 'youtube',
        title: 'Episode 1: Sharks in Europe',
        videoId: 'I3g0ipHA644',
        links: [
          { label: 'YouTube Channel', href: 'https://youtube.com/@oceancollective' },
          { label: 'Website', href: 'https://ocean-collective.com' },
        ],
        stats: ['Joined: 2023', '3,200+ subscribers'],
      },

      {
        type: 'imageGallery',
        images: [
          { src: img1spain, alt: '', caption: '', creator: '' },
          { src: img2spain, alt: '', caption: '', creator: '' },
          { src: img3spain, alt: '', caption: '', creator: '' },
          { src: img4spain, alt: '', caption: '', creator: '' },
          { src: img5spain, alt: '', caption: '', creator: '' },
          { src: img6spain, alt: '', caption: '', creator: '' },
          { src: img7spain, alt: '', caption: '', creator: '' },
          { src: img8spain, alt: '', caption: '', creator: '' },
          { src: img9spain, alt: '', caption: '', creator: '' },
          { src: img10spain, alt: '', caption: '', creator: '' },
          { src: img11spain, alt: '', caption: '', creator: '' },
          { src: img12spain, alt: '', caption: '', creator: '' },
          { src: img13spain, alt: '', caption: '', creator: '' },
          { src: img14spain, alt: '', caption: '', creator: '' },
          { src: img15spain, alt: '', caption: '', creator: '' },
        ],
      },
    ],
  },

  // --- PROJECT 2 ---
  {
    id: 2,
    category: 'UW Filmmaking',
    title: 'The Last Of Their Kind',
    subtitle: 'With Ocean Collective',
    previewImage: bretagne1,
    teaser: 'Documentary coverage of a marine research expedition in Brittany, France.',

    header: {
      title: 'The Last Of Their Kind',
      subtitle: 'With Ocean Collective',
      cta: { text: 'Have Fun!' },
    },

    sections: [
      {
        type: 'text',
        title: 'Info',
        content:
          'A documentary look at The Last of Their Kind, an expedition to study porbeagle sharks.',
      },

      {
        type: 'features',
        title: 'Skills',
        features: [
          { title: 'When/Where', text: 'Mai 2025, Brittany, France' },
          { title: 'Who', text: 'Ocean Collective with DRDH' },
          {
            title: 'What',
            text: 'Visual Storytelling For YouTube & Content Creation UW and TOPSIDE',
          },
        ],
      },

      {
        type: 'imageGallery',
        images: [
          { src: bretagne1 },
          { src: bretagne2 },
          { src: bretagne3 },
          { src: bretagne4 },
          { src: bretagne5 },
          { src: bretagne6 },
        ],
      },
    ],
  },

  // --- PROJECT 3 Test ---
  {
    id: 3,
    category: 'Category',
    title: 'Title',
    subtitle: 'Subtitle',
    previewImage: bretagne1,

    header: {
      title: 'Title',
      subtitle: 'Subtitle',
      cta: { text: 'Have Fun!' },
    },

    sections: [
      { type: 'text', title: 'Info', content: 'Content' },
      {
        type: 'features',
        title: 'Skills',
        features: [
          { title: 'When/Where', text: 'Text' },
          { title: 'Who', text: 'Text' },
          { title: 'What', text: 'Text' },
        ],
      },
      {
        type: 'imageGallery',
        images: [
          { src: bretagne1 },
          { src: bretagne2 },
          { src: bretagne3 },
          { src: bretagne4 },
          { src: bretagne5 },
          { src: bretagne6 },
        ],
      },
    ],
  },
]

// =============================================================
// STACKED HOVER GALLERY DATA
// =============================================================

export const galleryItems = [
  {
    key: 'film',
    title: 'UW Filmmaking',
    subtitle: 'Cinematic Storytelling',
    sectionId: 'uw-filming',
    image: scubaNemo33,
  },
  {
    key: 'dive',
    title: 'Diving',
    subtitle: 'Scuba & Apnea',
    sectionId: 'diving',
    image: scubaDiveNight,
  },
  {
    key: 'web',
    title: 'Web Development',
    subtitle: 'Modern & User-Friendly Websites',
    sectionId: 'web-dev',
    image: webDevImg,
  },
]

// =============================================================
// SKILLS DATA
// =============================================================

export const skillsData = {
  header: {
    title: 'Skills',
    subtitle: 'Experience & Capabilities',
  },

  sections: [
    { id: 'uw-filming', number: '1', title: 'UW Filming' },
    { id: 'diving', number: '2', title: 'Diving' },
    { id: 'web-dev', number: '3', title: 'Web Development' },
  ],

  uwFilming: {
    text: {
      title: 'UW Filming',
      content:
        'Professional underwater camera operation for science, expeditions, and media productions.',
    },
    features: {
      title: 'Skills',
      features: [
        { title: 'Camera', text: 'Panasonic S1II + Nauticam housing' },
        { title: 'Methods', text: 'Scuba & freediving' },
        { title: 'Experience', text: '~2000 dives' },
        { title: 'Wildlife + Interaction', text: 'Marine species behavior knowledge' },
        { title: 'Safety Concepts', text: 'Buddy system & procedures' },
        { title: 'Risk Management', text: 'Currents, depth, emergencies' },
        {
          title: 'Fieldwork & Research',
          text: 'Camera traps, documentation, tagging projects',
        },
      ],
    },
    credits: [
      {
        date: 'ongoing / since 2023',
        title: 'Ocean Collective',
        subtitle: 'UW & Safety',
        link: 'https://www.instagram.com/ocean_collective_agency/',
      },
      { date: '11/2025', title: 'MARES', subtitle: 'UW Footage', link: 'https://www.mares.com/' },
      {
        date: '05/2025',
        title: '"VERDANDI"',
        subtitle: 'Cinematic UW Footage',
        link: 'https://www.instagram.com/elfenholz_film/',
      },
    ],
  },

  diving: {
    text: { title: 'Diving', content: 'Scuba & Apnoe' },
    features: {
      title: 'Diving Skills',
      features: [
        {
          title: 'Training & Courses (PADI)',
          text: 'Open Water → Divemaster • Nitrox • Deep • Wreck • Night • DSMB • PPB • AWARE',
        },
        {
          title: 'Safety & Marine Operations',
          text: 'Emergency plans, O₂, risk assessments, boat support & crew coordination',
        },
        {
          title: 'UW Camera & Installations',
          text: 'Lighting • shot planning • anchors • rig support • sensors',
        },
      ],
    },
    credits: [
      {
        date: 'ongoing basis',
        title: 'PADI',
        subtitle: 'Pro Member & Instructor',
        link: 'https://www.padi.com/',
      },
      {
        date: 'ongoing basis',
        title: 'Gran Canaria Divers',
        subtitle: 'Courses & Guiding',
        link: 'https://www.grancanariadivers.com/',
      },
      {
        date: 'ongoing',
        title: 'Ocean Collective',
        subtitle: 'Safety Diver & UW Operations',
        link: 'https://www.instagram.com/ocean_collective_agency/',
      },
      {
        date: '06/2024',
        title: '"Die drei ??? und der Karpatenhund"',
        subtitle: 'Safety Diver',
        link: 'https://www.instagram.com/dreifragezeichen.de/',
      },
    ],

    certifications: [
      {
        title: 'NEW TEC 40',
        date: '29-Mar-2025',
        padi: '2503UY4186',
        image: '/src/assets/images/padi/padi_tec_rec.jpeg',
      },
      {
        title: 'Open Water Scuba Instructor',
        date: '18-Apr-2023',
        padi: '457679',
        image: '/src/assets/images/padi/padi_card.jpeg',
      },
      { title: 'Dry Suit', date: '26-Mar-2025', padi: '2503UY4184', image: '/images/drysuit.jpg' },
      { title: 'Deep Instructor', date: '02-May-2023', padi: '457679', image: '/images/deep.jpg' },
      { title: 'EFR Instructor', date: '28-Apr-2023', padi: '457679', image: '/images/efr.jpg' },
      {
        title: 'Dive Against Debris Instructor',
        date: '05-Aug-2024',
        padi: '457679',
        image: '/images/debris.jpg',
      },
      {
        title: 'Wreck Instructor',
        date: '02-May-2023',
        padi: '457679',
        image: '/images/wreck.jpg',
      },
      {
        title: 'Night Diver Instructor',
        date: '02-May-2023',
        padi: '457679',
        image: '/images/night.jpg',
      },
      {
        title: 'Enriched Air Instructor',
        date: '02-May-2023',
        padi: '457679',
        image: '/images/enriched.jpg',
      },
      {
        title: 'Delayed Surface Marker Buoy Instructor',
        date: '02-May-2023',
        padi: '457679',
        image: '/images/dsmb.jpg',
      },
      {
        title: 'Peak Performance Buoyancy Instructor',
        date: '18-Apr-2023',
        padi: '457679',
        image: '/images/buoyancy.jpg',
      },
      {
        title: 'PADI AWARE Instructor',
        date: '18-Apr-2023',
        padi: '457679',
        image: '/images/aware.jpg',
      },
      {
        title: 'AWARE Coral Reef Conservation Sp Instructor',
        date: '18-Apr-2023',
        padi: '457679',
        image: '/images/reef.jpg',
      },
      { title: 'Divemaster', date: '23-Sep-2020', padi: '457679', image: '/images/divemaster.jpg' },
      {
        title: 'EFR - CPR/First Aid',
        date: '23-Jun-2019',
        padi: '1907EH5797',
        image: '/images/efr-cpr.jpg',
      },
      {
        title: 'Enriched Air Diver',
        date: '22-Nov-2018',
        padi: '1811EU2796',
        image: '/images/enriched-diver.jpg',
      },
      {
        title: 'Rescue Diver',
        date: '21-May-2017',
        padi: '1705EF3498',
        image: '/images/rescue.jpg',
      },
      {
        title: 'Advanced Open Water',
        date: '19-Jun-2016',
        padi: '1606EW9928',
        image: '/images/aow.jpg',
      },
      {
        title: 'Junior Open Water',
        date: '31-Dec-2006',
        padi: '0701E58701',
        image: '/images/junior.jpg',
      },
    ],
  },

  webDev: {
    text: { title: 'Web Development', content: 'Junior Software- & Webdeveloper' },
    features: {
      title: 'Skills',
      features: [
        { title: 'Frontend', text: 'HTML, CSS, JS' },
        { title: 'Backend', text: 'PHP, Python' },
        { title: 'Frameworks', text: 'Vue, React, Node' },
        { title: 'PWA', text: 'Native Web Components' },
        { title: 'CMS', text: 'Wordpress, Wix, Shopify, Elementor' },
        { title: 'Animation', text: 'GSAP, CSS' },
        { title: 'XR, VR', text: 'Next.js, A-FRAME' },
      ],
    },
    credits: [
      {
        date: '2025',
        title: 'Ocean Collective',
        subtitle: 'End-to-End Website Development',
        link: 'https://www.instagram.com/ocean_collective_agency/',
      },
      { date: '2024', title: 'Gran Canaria Divers', subtitle: 'End-to-End Website Development' },
      { date: '2023', title: 'RHM Service', subtitle: 'End-to-End Website Development' },
      { date: '2023', title: 'IRS GmbH', subtitle: 'Frontend Development' },
      { date: '2021-2023', title: 'Codevance', subtitle: 'Frontend Development' },
    ],
  },
}

// =============================================================
// SKILLS PAGE HEADER — used by SpecialHeader.vue
// =============================================================

export const skillsHeader = {
  title: 'Skills',
  subtitle: 'UW Filming • Diving • Web Development',
  cta: { text: 'Scroll Down' },

  sections: [
    {
      type: 'imageGallery',
      images: [{ src: img7spain }, { src: scubaDiveNight }, { src: webDevImg }],
    },
  ],
}
