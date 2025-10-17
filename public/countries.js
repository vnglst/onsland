// Country configurations for land use visualizations
// Data source: Eurostat Land Cover Statistics 2022
// https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table?lang=en

const countryConfigs = {
  netherlands: {
    title: "Land Use in the Netherlands",
    isoCode: "528",
    center: [5.5, 52.2],
    scale: 9000,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.108 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.143 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.011 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.018 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.04 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.13 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.333 },
      { name: "Cereals", color: "var(--agriculture-700)", percentage: 0.087 },
      { name: "Maize", color: "var(--agriculture-800)", percentage: 0.05 },
      { name: "Potatoes", color: "var(--agriculture-850)", percentage: 0.033 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.047 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: { x: 665, y: 87 },
        labelPosition: { x: 724, y: 58 },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: { x: 693, y: 229 },
        labelPosition: { x: 732, y: 184 },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: { x: 650, y: 320 },
        labelPosition: { x: 708, y: 340 },
      },
      {
        label: "Farmland",
        displayLabel: true,
        labelTarget: { x: 575, y: 553 },
        labelPosition: { x: 634, y: 584 },
      },
    ],
  },
  denmark: {
    title: "Land Use in Denmark",
    isoCode: "208",
    center: [10, 56.0],
    scale: 7000,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.017 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.201 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.011 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.019 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.043 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.069 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.192 },
      { name: "Barley", color: "var(--agriculture-650)", percentage: 0.12 },
      { name: "Wheat", color: "var(--agriculture-700)", percentage: 0.091 },
      { name: "Temp. grassland", color: "var(--agriculture-750)", percentage: 0.051 },
      { name: "Rape", color: "var(--agriculture-800)", percentage: 0.043 },
      { name: "Maize", color: "var(--agriculture-825)", percentage: 0.041 },
      { name: "Rye", color: "var(--agriculture-850)", percentage: 0.023 },
      { name: "Potatoes", color: "var(--agriculture-900)", percentage: 0.014 },
      { name: "Oats", color: "var(--agriculture-920)", percentage: 0.012 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.0535 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 493,
          y: 43,
        },
        labelPosition: {
          x: 558,
          y: 35,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 491,
          y: 183,
        },
        labelPosition: {
          x: 596,
          y: 163,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 538,
          y: 314,
        },
        labelPosition: {
          x: 609,
          y: 258,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 529,
          y: 404,
        },
        labelPosition: {
          x: 638,
          y: 342,
        },
      },
    ],
  },
  sweden: {
    title: "Land Use in Sweden",
    isoCode: "752",
    center: [16.0, 63.0],
    scale: 1500,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.089 },
      { name: "Rocks and stones", color: "var(--bare-500)", percentage: 0.016 },
      { name: "Lichens and moss", color: "var(--bare-300)", percentage: 0.022 },
      { name: "Other bare land", color: "var(--bare-400)", percentage: 0.005 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.617 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.059 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.077 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.019 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.058 },
      { name: "Cereals", color: "var(--agriculture-700)", percentage: 0.021 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.017 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 614,
          y: 51,
        },
        labelPosition: {
          x: 668,
          y: 21,
        },
      },
      {
        label: "Mountains",
        displayLabel: true,
        labelTarget: {
          x: 638,
          y: 121,
        },
        labelPosition: {
          x: 668,
          y: 106,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 596,
          y: 312,
        },
        labelPosition: {
          x: 645,
          y: 337,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 438,
          y: 660,
        },
        labelPosition: {
          x: 478,
          y: 647,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 462,
          y: 737,
        },
        labelPosition: {
          x: 540,
          y: 748,
        },
      },
    ],
  },
  germany: {
    title: "Land Use in Germany",
    isoCode: "276",
    center: [10.5, 51.2],
    scale: 3000,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.018 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.342 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.005 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.011 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.057 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.078 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.216 },
      { name: "Cereals", color: "var(--agriculture-700)", percentage: 0.167 },
      { name: "Industrial crops", color: "var(--agriculture-750)", percentage: 0.038 },
      { name: "Fodder crops", color: "var(--agriculture-800)", percentage: 0.028 },
      { name: "Root vegetables", color: "var(--agriculture-850)", percentage: 0.017 },
      { name: "Fruit trees", color: "var(--agriculture-900)", percentage: 0.012 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.011 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 397,
          y: 81,
        },
        labelPosition: {
          x: 471,
          y: 48,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 651,
          y: 212,
        },
        labelPosition: {
          x: 706,
          y: 185,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 656,
          y: 379,
        },
        labelPosition: {
          x: 721,
          y: 380,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 555,
          y: 516,
        },
        labelPosition: {
          x: 665,
          y: 541,
        },
      },
    ],
  },
  croatia: {
    title: "Land Use in Croatia",
    isoCode: "191",
    center: [16.0, 44.4],
    scale: 6000,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.01 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.478 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.003 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.127 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.04 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.031 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.167 },
      { name: "Maize", color: "var(--agriculture-700)", percentage: 0.058 },
      { name: "Other cereals", color: "var(--agriculture-750)", percentage: 0.022 },
      { name: "Industrial crops", color: "var(--agriculture-800)", percentage: 0.021 },
      { name: "Fruit trees", color: "var(--agriculture-850)", percentage: 0.013 },
      { name: "Fodder crops", color: "var(--agriculture-900)", percentage: 0.011 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.019 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 490,
          y: 79,
        },
        labelPosition: {
          x: 534,
          y: 62,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 605,
          y: 155,
        },
        labelPosition: {
          x: 681,
          y: 116,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 405,
          y: 316,
        },
        labelPosition: {
          x: 446,
          y: 358,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 499,
          y: 453,
        },
        labelPosition: {
          x: 612,
          y: 464,
        },
      },
    ],
  },
  belgium: {
    title: "Land Use in Belgium",
    isoCode: "056",
    center: [4.2, 50.5],
    scale: 9000,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.017 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.262 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.003 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.01 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.042 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.12 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.293 },
      { name: "Other cereals", color: "var(--agriculture-650)", percentage: 0.068 },
      { name: "Maize", color: "var(--agriculture-700)", percentage: 0.054 },
      { name: "Root vegetables", color: "var(--agriculture-750)", percentage: 0.045 },
      { name: "Temp. grassland", color: "var(--agriculture-825)", percentage: 0.038 },
      { name: "Industrial crops", color: "var(--agriculture-850)", percentage: 0.023 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.026 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 523,
          y: 138,
        },
        labelPosition: {
          x: 602,
          y: 71,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 648,
          y: 214,
        },
        labelPosition: {
          x: 710,
          y: 183,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 671,
          y: 317,
        },
        labelPosition: {
          x: 713,
          y: 292,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 671,
          y: 551,
        },
        labelPosition: {
          x: 690,
          y: 543,
        },
      },
    ],
  },
  france: {
    title: "Land Use in France",
    isoCode: "250",
    center: [0.5, 46.5],
    scale: 2500,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.013 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.337 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.002 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.029 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.052 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.056 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.238 },
      { name: "Wheat", color: "var(--agriculture-600)", percentage: 0.065 },
      { name: "Maize", color: "var(--agriculture-650)", percentage: 0.044 },
      { name: "Rape", color: "var(--agriculture-700)", percentage: 0.025 },
      { name: "Temp. grassland", color: "var(--agriculture-750)", percentage: 0.023 },
      { name: "Barley", color: "var(--agriculture-800)", percentage: 0.022 },
      { name: "Other cereals", color: "var(--agriculture-825)", percentage: 0.018 },
      { name: "Sunflower", color: "var(--agriculture-850)", percentage: 0.015 },
      { name: "Vineyard", color: "var(--agriculture-900)", percentage: 0.015 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.046 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 505,
          y: 82,
        },
        labelPosition: {
          x: 531,
          y: 23,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 661,
          y: 180,
        },
        labelPosition: {
          x: 711,
          y: 103,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 708,
          y: 387,
        },
        labelPosition: {
          x: 727,
          y: 415,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 571,
          y: 630,
        },
        labelPosition: {
          x: 610,
          y: 691,
        },
      },
    ],
  },
  uk: {
    title: "Land Use in United Kingdom",
    isoCode: "826",
    center: [-2.0, 54.5],
    scale: 2500,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.02 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.138 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.026 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.116 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.038 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.064 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.423 },
      { name: "Wheat", color: "var(--agriculture-700)", percentage: 0.04 },
      { name: "Barley", color: "var(--agriculture-800)", percentage: 0.027 },
      { name: "Temp. grassland", color: "var(--agriculture-850)", percentage: 0.027 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.081 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 397,
          y: 76,
        },
        labelPosition: {
          x: 490,
          y: 41,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 436,
          y: 241,
        },
        labelPosition: {
          x: 578,
          y: 217,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 473,
          y: 364,
        },
        labelPosition: {
          x: 607,
          y: 332,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 553,
          y: 490,
        },
        labelPosition: {
          x: 642,
          y: 474,
        },
      },
    ],
  },
};
