// src/data/projects.js

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

import bretagne1 from '@/assets/images/bretagne/bretagne1.jpg'
import bretagne2 from '@/assets/images/bretagne/bretagne2.jpg'
import bretagne3 from '@/assets/images/bretagne/bretagne3.jpg'
import bretagne4 from '@/assets/images/bretagne/bretagne4.jpg'
import bretagne5 from '@/assets/images/bretagne/bretagne5.jpg'
import bretagne6 from '@/assets/images/bretagne/bretagne6.jpg'

import gcd1 from '@/assets/images/website/gcd/gcd-desktop.png'
import oc1 from '@/assets/images/website/oc/oc-desktop.png'
import rhm1 from '@/assets/images/website/rhm/rhm-desktop.png'
import cv1 from '@/assets/images/website/codevance/codevance-desktop-app.png'
import cv2 from '@/assets/images/website/codevance/codevance-desktop-website.png'
import irs1 from '@/assets/images/website/irs/irs-desktop.png'

// projectsData.js

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
    id: 4,
    title: 'IRS GmbH',
    subtitle: 'Vue.js • SCSS',
    image: irs1,
    url: 'https://irs-gmbh.de/home',
  },
]

export const projects = [
  {
    id: 1,
    category: 'UW Filmmaking',
    title: 'Coast of Hope',
    subtitle: 'With Ocean Collective',
    previewImage: img1spain,
    teaser:
      'Documentary coverage of a citizen-science shark conservation project in the Bay of Biscay, capturing local research efforts and the unique connection between people, wildlife and the open ocean.',
    info: 'info',
    date: '07/08/09 2025',
    location: 'Bay of Biskay',
    href: null,
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
          'Documentary coverage of a citizen-science shark conservation project in the Bay of Biscay, capturing local research efforts and the unique connection between people, wildlife and the open ocean.',
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
        content: 'Short description about what the video shows.',
        videoId: 'I3g0ipHA644', // nur die ID, nicht die komplette URL

        links: [
          { label: 'YouTube Channel', href: 'https://youtube.com/@oceancollective' },
          { label: 'Website', href: 'https://ocean-collective.com' },
        ],
        stats: ['Joined: 2023', '3,200+ subscribers'],
      },
      {
        type: 'imageGallery',
        images: [
          {
            src: img1spain,
            alt: 'Emi swimming with a blue shark in open water',
            caption: 'Emi & Blueshark in the open blue',
            creator: 'Svenja Katharina',
          },
          {
            src: img2spain,
            alt: 'Elena preparing for or descending on a coastal dive',
            caption: 'Elena on coastal dive',
            creator: 'Svenja Katharina',
          },
          {
            src: img3spain,
            alt: 'Anna filming underwater in open blue water',
            caption: 'Anna shooting in the open blue',
            creator: 'Svenja Katharina',
          },
          {
            src: img4spain,
            alt: 'Julian filming Lukas during a freedive tagging session',
            caption: 'Julian capturing Lukas’ freedive tagging',
            creator: 'Svenja Katharina',
          },
          {
            src: img5spain,
            alt: 'Lukas performing freedive tagging underwater',
            caption: 'Lukas on a freedive-tagging dive',
            creator: 'Svenja Katharina',
          },
          {
            src: img6spain,
            alt: 'A drifting salp suspended in pelagic open water',
            caption: 'Drifting salp in the pelagic zone',
            creator: 'Svenja Katharina',
          },
          {
            src: img7spain,
            alt: 'A curious blue shark approaching closely',
            caption: 'Curious Blueshark',
            creator: 'Svenja Katharina',
          },
          {
            src: img8spain,
            alt: 'Close-up of a blue shark with its eye half closed',
            caption: 'Blue shark’s eye half closed',
            creator: 'Svenja Katharina',
          },
          {
            src: img9spain,
            alt: 'A curious blue shark swimming near the camera',
            caption: 'Curious Blueshark',
            creator: 'Svenja Katharina',
          },
          {
            src: img10spain,
            alt: 'Divers waiting on the surface during chumming preparations',
            caption: 'Waiting, chumming, enjoying',
            creator: 'Svenja Katharina',
          },
          {
            src: img11spain,
            alt: 'Emi interacting with a blue shark underwater',
            caption: 'Emis moment with a Blueshark',
            creator: 'Svenja Katharina',
          },
          {
            src: img12spain,
            alt: 'A blue shark swimming in open water',
            caption: 'Blueshark',
            creator: 'Svenja Katharina',
          },
          {
            src: img13spain,
            alt: 'Anna and a blue shark illuminated by warm morning sunlight',
            caption: 'Anna with a blue shark, illuminated by the morning sun',
            creator: 'Svenja Katharina',
          },
          {
            src: img14spain,
            alt: 'A blue shark approaching through open water',
            caption: 'Incoming blue shark',
            creator: 'Svenja Katharina',
          },
          {
            src: img15spain,
            alt: 'Silhouette of a blue shark against bright surface light',
            caption: 'Blue shark silhouette',
            creator: 'Svenja Katharina',
          },
        ],
      },
    ],
  },

  {
    id: 2,
    category: 'UW Filmmaking',
    title: 'The Last Of Their Kind',
    subtitle: '',
    previewImage: bretagne1,
    teaser: 'Documentary coverage of a marine research expedition in Brittany, France.',
    info: '',
    date: '05/2025',
    location: 'Brittany, France',
    href: null,
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
          'A documentary look at The Last of Their Kind, an expedition uniting research and freediving to study and protect porbeagle sharks in northern Brittany.',
      },

      {
        type: 'features',
        title: 'Skills',
        features: [
          { title: 'When/Where', text: 'Mai 2025, Brittany, France' },
          { title: 'Who', text: 'Ocean Collective with Partner DRDH' },
          {
            title: 'What',
            text: 'Visual Storytelling For YouTube & Content Creation UW and TOPSIDE',
          },
        ],
      },
      {
        type: 'imageGallery',
        images: [
          { src: bretagne1, alt: '', caption: '', creator: '' },
          { src: bretagne2, alt: '', caption: '', creator: '' },
          { src: bretagne3, alt: '', caption: '', creator: '' },
          { src: bretagne4, alt: '', caption: '', creator: '' },
          { src: bretagne5, alt: '', caption: '', creator: '' },
          { src: bretagne6, alt: '', caption: '', creator: '' },
        ],
      },
    ],
  },

  {
    id: 3,
    category: 'Category',
    title: 'Title',
    subtitle: 'Subtitle',
    previewImage: bretagne1,
    teaser: 'Documentary coverage of a marine research expedition in Brittany, France.',
    info: 'Info',
    date: 'date',
    location: 'Location',
    href: null,

    header: {
      title: 'Title',
      subtitle: 'Subtitle',
      cta: { text: 'Have Fun!' },
    },

    sections: [
      {
        type: 'text',
        title: 'Info',
        content: 'Content',
      },
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
          { src: bretagne1, alt: '', caption: '', creator: '' },
          { src: bretagne2, alt: '', caption: '', creator: '' },
          { src: bretagne3, alt: '', caption: '', creator: '' },
          { src: bretagne4, alt: '', caption: '', creator: '' },
          { src: bretagne5, alt: '', caption: '', creator: '' },
          { src: bretagne6, alt: '', caption: '', creator: '' },
        ],
      },
    ],
  },
]
