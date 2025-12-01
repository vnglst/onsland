// AI Researchers data with geographic locations
window.AI_RESEARCHERS = [
  {
    id: 1,
    name: "Geoffrey Hinton",
    born: {
      location: "England",
      country: "GBR",
      coordinates: [-1.5, 53.0]
    },
    universities: [
      { name: "Cambridge", country: "GBR", coordinates: [0.1218, 52.2053] },
      { name: "Edinburgh", country: "GBR", coordinates: [-3.1883, 55.9533] }
    ],
    work: {
      location: "Toronto, Canada",
      country: "CAN",
      coordinates: [-79.3832, 43.6532],
      institution: "University of Toronto / Google (former)"
    },
    contribution: "Pioneer of deep learning and backpropagation"
  },
  {
    id: 2,
    name: "Yann LeCun",
    born: {
      location: "France",
      country: "FRA",
      coordinates: [2.3522, 48.8566]
    },
    universities: [
      { name: "ESIEE Paris", country: "FRA", coordinates: [2.5867, 48.8400] },
      { name: "Sorbonne", country: "FRA", coordinates: [2.3444, 48.8489] }
    ],
    work: {
      location: "New York, USA",
      country: "USA",
      coordinates: [-74.0060, 40.7128],
      institution: "Meta AI / NYU"
    },
    contribution: "Creator of convolutional neural networks (CNNs)"
  },
  {
    id: 3,
    name: "Yoshua Bengio",
    born: {
      location: "France (raised in Canada)",
      country: "FRA",
      coordinates: [2.3522, 48.8566]
    },
    universities: [
      { name: "McGill", country: "CAN", coordinates: [-73.5770, 45.5048] }
    ],
    work: {
      location: "Montreal, Canada",
      country: "CAN",
      coordinates: [-73.5673, 45.5017],
      institution: "Mila / University of Montreal"
    },
    contribution: "Deep learning pioneer, neural networks researcher"
  },
  {
    id: 4,
    name: "Demis Hassabis",
    born: {
      location: "England",
      country: "GBR",
      coordinates: [-0.1276, 51.5074]
    },
    universities: [
      { name: "Cambridge", country: "GBR", coordinates: [0.1218, 52.2053] },
      { name: "UCL", country: "GBR", coordinates: [-0.1340, 51.5246] }
    ],
    work: {
      location: "London, UK",
      country: "GBR",
      coordinates: [-0.1276, 51.5074],
      institution: "Google DeepMind"
    },
    contribution: "Co-founder of DeepMind, AlphaGo, AlphaFold"
  },
  {
    id: 5,
    name: "Andrew Ng",
    born: {
      location: "UK (raised in Hong Kong)",
      country: "HKG",
      coordinates: [114.1694, 22.3193]
    },
    universities: [
      { name: "Carnegie Mellon", country: "USA", coordinates: [-79.9959, 40.4406] },
      { name: "MIT", country: "USA", coordinates: [-71.0942, 42.3601] },
      { name: "Berkeley", country: "USA", coordinates: [-122.2585, 37.8719] }
    ],
    work: {
      location: "San Francisco, USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "Stanford / DeepLearning.AI / Landing AI"
    },
    contribution: "Co-founder of Coursera, Google Brain, advocate for AI education"
  },
  {
    id: 6,
    name: "Fei-Fei Li",
    born: {
      location: "China (moved to USA)",
      country: "CHN",
      coordinates: [116.4074, 39.9042]
    },
    universities: [
      { name: "Princeton", country: "USA", coordinates: [-74.6672, 40.3573] },
      { name: "Caltech", country: "USA", coordinates: [-118.1253, 34.1377] }
    ],
    work: {
      location: "Stanford, USA",
      country: "USA",
      coordinates: [-122.1697, 37.4275],
      institution: "Stanford University"
    },
    contribution: "Creator of ImageNet, computer vision pioneer"
  },
  {
    id: 7,
    name: "Ilya Sutskever",
    born: {
      location: "Russia/Israel (raised in Canada)",
      country: "RUS",
      coordinates: [37.6173, 55.7558]
    },
    universities: [
      { name: "University of Toronto", country: "CAN", coordinates: [-79.3957, 43.6629] }
    ],
    work: {
      location: "San Francisco, USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "OpenAI (co-founder)"
    },
    contribution: "Co-founder of OpenAI, key architect of GPT models"
  },
  {
    id: 8,
    name: "Dario Amodei",
    born: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749]
    },
    universities: [
      { name: "Stanford", country: "USA", coordinates: [-122.1697, 37.4275] },
      { name: "Princeton", country: "USA", coordinates: [-74.6672, 40.3573] }
    ],
    work: {
      location: "San Francisco, USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "Anthropic (co-founder and CEO)"
    },
    contribution: "Co-founder and CEO of Anthropic, creator of Claude"
  },
  {
    id: 9,
    name: "Ian Goodfellow",
    born: {
      location: "USA",
      country: "USA",
      coordinates: [-95.7129, 37.0902]
    },
    universities: [
      { name: "Stanford", country: "USA", coordinates: [-122.1697, 37.4275] },
      { name: "Montreal", country: "CAN", coordinates: [-73.5673, 45.5017] }
    ],
    work: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "DeepMind (former Google Brain)"
    },
    contribution: "Inventor of Generative Adversarial Networks (GANs)"
  },
  {
    id: 10,
    name: "Andrej Karpathy",
    born: {
      location: "Slovakia (raised in Canada)",
      country: "SVK",
      coordinates: [17.1077, 48.1486]
    },
    universities: [
      { name: "Toronto", country: "CAN", coordinates: [-79.3957, 43.6629] },
      { name: "UBC", country: "CAN", coordinates: [-123.2460, 49.2606] },
      { name: "Stanford", country: "USA", coordinates: [-122.1697, 37.4275] }
    ],
    work: {
      location: "San Francisco, USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "OpenAI (former Tesla)"
    },
    contribution: "Computer vision expert, Tesla Autopilot lead, AI educator"
  },
  {
    id: 11,
    name: "Kaiming He",
    born: {
      location: "China (Guangzhou)",
      country: "CHN",
      coordinates: [113.2644, 23.1291]
    },
    universities: [
      { name: "Tsinghua", country: "CHN", coordinates: [116.3261, 40.0010] },
      { name: "CUHK", country: "HKG", coordinates: [114.2076, 22.4191] }
    ],
    work: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "Meta AI (FAIR)"
    },
    contribution: "ResNet, deep residual learning"
  },
  {
    id: 12,
    name: "Pieter Abbeel",
    born: {
      location: "Belgium (Antwerp)",
      country: "BEL",
      coordinates: [4.4025, 51.2194]
    },
    universities: [
      { name: "KU Leuven", country: "BEL", coordinates: [4.6792, 50.8784] },
      { name: "Stanford", country: "USA", coordinates: [-122.1697, 37.4275] }
    ],
    work: {
      location: "Berkeley, USA",
      country: "USA",
      coordinates: [-122.2585, 37.8719],
      institution: "UC Berkeley / Covariant AI"
    },
    contribution: "Robotics and reinforcement learning expert"
  },
  {
    id: 13,
    name: "Daphne Koller",
    born: {
      location: "Israel (Jerusalem)",
      country: "ISR",
      coordinates: [35.2137, 31.7683]
    },
    universities: [
      { name: "Hebrew University", country: "ISR", coordinates: [35.2422, 31.7930] },
      { name: "Stanford", country: "USA", coordinates: [-122.1697, 37.4275] }
    ],
    work: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "insitro (founder), former Coursera co-founder"
    },
    contribution: "Probabilistic graphical models, computational biology"
  },
  {
    id: 14,
    name: "François Chollet",
    born: {
      location: "France",
      country: "FRA",
      coordinates: [2.3522, 48.8566]
    },
    universities: [
      { name: "ENSTA Paris", country: "FRA", coordinates: [2.2137, 48.7128] }
    ],
    work: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "Google (Keras creator)"
    },
    contribution: "Creator of Keras deep learning framework"
  },
  {
    id: 15,
    name: "Oriol Vinyals",
    born: {
      location: "Spain (Barcelona)",
      country: "ESP",
      coordinates: [2.1734, 41.3851]
    },
    universities: [
      { name: "UPC Barcelona", country: "ESP", coordinates: [2.1123, 41.3890] },
      { name: "UCSD", country: "USA", coordinates: [-117.2340, 32.8801] },
      { name: "UC Berkeley", country: "USA", coordinates: [-122.2585, 37.8719] }
    ],
    work: {
      location: "London, UK",
      country: "GBR",
      coordinates: [-0.1276, 51.5074],
      institution: "Google DeepMind"
    },
    contribution: "Sequence-to-sequence models, AlphaStar"
  },
  {
    id: 16,
    name: "Alex Krizhevsky",
    born: {
      location: "Ukraine (moved to Canada)",
      country: "UKR",
      coordinates: [30.5234, 50.4501]
    },
    universities: [
      { name: "Toronto", country: "CAN", coordinates: [-79.3957, 43.6629] }
    ],
    work: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "Google (former)"
    },
    contribution: "Co-creator of AlexNet, ImageNet breakthrough"
  },
  {
    id: 17,
    name: "Jeremy Howard",
    born: {
      location: "UK (raised in Australia)",
      country: "GBR",
      coordinates: [-0.1276, 51.5074]
    },
    universities: [
      { name: "Melbourne", country: "AUS", coordinates: [144.9631, -37.7964] }
    ],
    work: {
      location: "Australia",
      country: "AUS",
      coordinates: [144.9631, -37.7964],
      institution: "fast.ai (co-founder)"
    },
    contribution: "Co-founder of fast.ai, democratizing deep learning"
  },
  {
    id: 18,
    name: "Ashish Vaswani",
    born: {
      location: "India",
      country: "IND",
      coordinates: [77.1025, 28.7041]
    },
    universities: [
      { name: "BIT Mesra", country: "IND", coordinates: [85.4398, 23.4141] },
      { name: "USC", country: "USA", coordinates: [-118.2851, 34.0224] }
    ],
    work: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "Essential AI (co-founder, former Google Brain)"
    },
    contribution: "Co-author of 'Attention Is All You Need' (Transformer architecture)"
  },
  {
    id: 19,
    name: "Jürgen Schmidhuber",
    born: {
      location: "Germany/Switzerland",
      country: "DEU",
      coordinates: [11.5820, 48.1351]
    },
    universities: [
      { name: "TU Munich", country: "DEU", coordinates: [11.5683, 48.1497] }
    ],
    work: {
      location: "Lugano, Switzerland",
      country: "CHE",
      coordinates: [8.9511, 46.0037],
      institution: "IDSIA / USI"
    },
    contribution: "Inventor of LSTM networks, AI pioneer"
  },
  {
    id: 20,
    name: "Noam Shazeer",
    born: {
      location: "USA",
      country: "USA",
      coordinates: [-78.8986, 35.9940]
    },
    universities: [
      { name: "Duke", country: "USA", coordinates: [-78.9382, 36.0014] }
    ],
    work: {
      location: "USA",
      country: "USA",
      coordinates: [-122.4194, 37.7749],
      institution: "Character.AI (co-founder, former Google Brain)"
    },
    contribution: "Co-author of Transformer paper, scaling neural networks"
  }
];

// Country mapping for ISO codes
window.COUNTRY_CODES = {
  GBR: { name: "United Kingdom", coordinates: [-0.1276, 51.5074] },
  FRA: { name: "France", coordinates: [2.3522, 48.8566] },
  CAN: { name: "Canada", coordinates: [-106.3468, 56.1304] },
  USA: { name: "United States", coordinates: [-95.7129, 37.0902] },
  CHN: { name: "China", coordinates: [104.1954, 35.8617] },
  HKG: { name: "Hong Kong", coordinates: [114.1694, 22.3193] },
  RUS: { name: "Russia", coordinates: [37.6173, 55.7558] },
  SVK: { name: "Slovakia", coordinates: [17.1077, 48.1486] },
  BEL: { name: "Belgium", coordinates: [4.4025, 51.2194] },
  ISR: { name: "Israel", coordinates: [35.2137, 31.7683] },
  ESP: { name: "Spain", coordinates: [2.1734, 41.3851] },
  UKR: { name: "Ukraine", coordinates: [30.5234, 50.4501] },
  AUS: { name: "Australia", coordinates: [133.7751, -25.2744] },
  IND: { name: "India", coordinates: [77.1025, 28.7041] },
  DEU: { name: "Germany", coordinates: [11.5820, 48.1351] },
  CHE: { name: "Switzerland", coordinates: [8.9511, 46.0037] }
};
