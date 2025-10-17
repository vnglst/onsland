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
    legendPosition: "bottom",
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
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.617 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.059 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.077 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.005 },
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
    legendPosition: "bottom",
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
    legendPosition: "bottom",
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
      { name: "Mountains", color: "var(--bare-500)", percentage: 0.011 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.337 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.002 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.029 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.041 },
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
        label: "Mountains",
        displayLabel: true,
        labelTarget: {
          x: 563,
          y: 133,
        },
        labelPosition: {
          x: 606,
          y: 61,
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
  spain: {
    title: "Land Use in Spain",
    isoCode: "724",
    center: [-2.5, 38.0],
    scale: 2500,
    legendPosition: "bottom",
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.012 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.351 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.002 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.145 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.063 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.039 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.121 },
      { name: "Cereals", color: "var(--agriculture-700)", percentage: 0.107 },
      { name: "Olive trees", color: "var(--agriculture-750)", percentage: 0.059 },
      { name: "Fruit trees", color: "var(--agriculture-800)", percentage: 0.035 },
      { name: "Vineyard", color: "var(--agriculture-850)", percentage: 0.023 },
      { name: "Industrial crops", color: "var(--agriculture-900)", percentage: 0.022 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.021 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 238,
          y: 59,
        },
        labelPosition: {
          x: 329,
          y: 27,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 535,
          y: 105,
        },
        labelPosition: {
          x: 621,
          y: 77,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 549,
          y: 295,
        },
        labelPosition: {
          x: 611,
          y: 262,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 408,
          y: 527,
        },
        labelPosition: {
          x: 505,
          y: 573,
        },
      },
    ],
  },
  italy: {
    title: "Land Use in Italy",
    isoCode: "380",
    center: [12.0, 41.5],
    legendPosition: "bottom",
    scale: 2500,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.017 },
      { name: "Mountains", color: "var(--bare-500)", percentage: 0.021 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.359 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.002 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.062 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.026 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.065 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.168 },
      { name: "Cereals", color: "var(--agriculture-700)", percentage: 0.103 },
      { name: "Olive trees", color: "var(--agriculture-750)", percentage: 0.057 },
      { name: "Fodder crops", color: "var(--agriculture-800)", percentage: 0.047 },
      { name: "Vineyard", color: "var(--agriculture-850)", percentage: 0.026 },
      { name: "Fruit trees", color: "var(--agriculture-900)", percentage: 0.021 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.026 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 432,
          y: 56,
        },
        labelPosition: {
          x: 480,
          y: 28,
        },
      },
      {
        label: "Mountains",
        displayLabel: true,
        labelTarget: {
          x: 505,
          y: 95,
        },
        labelPosition: {
          x: 561,
          y: 72,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 485,
          y: 209,
        },
        labelPosition: {
          x: 595,
          y: 148,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 528,
          y: 293,
        },
        labelPosition: {
          x: 607,
          y: 267,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 618,
          y: 386,
        },
        labelPosition: {
          x: 657,
          y: 359,
        },
      },
    ],
  },
  portugal: {
    title: "Land Use in Portugal",
    isoCode: "620",
    center: [-8.0, 39.5],
    scale: 5400,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.016 },
      { name: "Mountains", color: "var(--bare-500)", percentage: 0.014 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.353 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.002 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.178 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.04 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.063 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.171 },
      { name: "Olive trees", color: "var(--agriculture-700)", percentage: 0.046 },
      { name: "Fruit trees", color: "var(--agriculture-750)", percentage: 0.028 },
      { name: "Vineyard", color: "var(--agriculture-800)", percentage: 0.018 },
      { name: "Cereals", color: "var(--agriculture-850)", percentage: 0.044 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.027 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 461,
          y: 69,
        },
        labelPosition: {
          x: 510,
          y: 53,
        },
      },
      {
        label: "Mountains",
        displayLabel: true,
        labelTarget: {
          x: 567,
          y: 108,
        },
        labelPosition: {
          x: 623,
          y: 96,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 552,
          y: 278,
        },
        labelPosition: {
          x: 622,
          y: 277,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 521,
          y: 439,
        },
        labelPosition: {
          x: 607,
          y: 438,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 527,
          y: 572,
        },
        labelPosition: {
          x: 588,
          y: 572,
        },
      },
    ],
  },
  ireland: {
    title: "Land Use in Ireland",
    isoCode: "372",
    center: [-8.0, 53.3],
    scale: 6000,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.024 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.129 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.024 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.119 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.011 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.046 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.596 },
      { name: "Barley", color: "var(--agriculture-700)", percentage: 0.017 },
      { name: "Wheat", color: "var(--agriculture-800)", percentage: 0.009 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.025 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 537,
          y: 53,
        },
        labelPosition: {
          x: 575,
          y: 53,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 573,
          y: 207,
        },
        labelPosition: {
          x: 670,
          y: 150,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 629,
          y: 344,
        },
        labelPosition: {
          x: 682,
          y: 330,
        },
      },
      {
        label: "Pasture",
        displayLabel: true,
        labelTarget: {
          x: 627,
          y: 522,
        },
        labelPosition: {
          x: 666,
          y: 525,
        },
      },
    ],
  },
  austria: {
    title: "Land Use in Austria",
    isoCode: "040",
    center: [13.5, 47.5],
    scale: 5100,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.015 },
      { name: "Mountains", color: "var(--bare-500)", percentage: 0.054 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.433 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.003 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.053 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.046 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.238 },
      { name: "Cereals", color: "var(--agriculture-700)", percentage: 0.082 },
      { name: "Fodder crops", color: "var(--agriculture-800)", percentage: 0.033 },
      { name: "Industrial crops", color: "var(--agriculture-850)", percentage: 0.024 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.019 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 576,
          y: 178,
        },
        labelPosition: {
          x: 594,
          y: 125,
        },
      },
      {
        label: "Mountains",
        displayLabel: true,
        labelTarget: {
          x: 678,
          y: 220,
        },
        labelPosition: {
          x: 696,
          y: 196,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 720,
          y: 290,
        },
        labelPosition: {
          x: 733,
          y: 295,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 704,
          y: 436,
        },
        labelPosition: {
          x: 731,
          y: 461,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 605,
          y: 540,
        },
        labelPosition: {
          x: 667,
          y: 560,
        },
      },
    ],
  },
  finland: {
    title: "Land Use in Finland",
    isoCode: "246",
    center: [26.0, 64.5],
    scale: 1600,
    categories: [
      { name: "Water", color: "var(--water-400)", percentage: 0.102 },
      { name: "Woodland", color: "var(--nature-300)", percentage: 0.66 },
      { name: "Wetland", color: "var(--nature-400)", percentage: 0.053 },
      { name: "Shrubland", color: "var(--nature-500)", percentage: 0.052 },
      { name: "Bare land", color: "var(--nature-600)", percentage: 0.02 },
      { name: "Urban area", color: "var(--urban-500)", percentage: 0.021 },
      { name: "Grassland", color: "var(--agriculture-500)", percentage: 0.054 },
      { name: "Cereals", color: "var(--agriculture-700)", percentage: 0.027 },
      { name: "Other cropland", color: "var(--agriculture-950)", percentage: 0.011 },
    ],
    labels: [
      {
        label: "Water",
        displayLabel: true,
        labelTarget: {
          x: 529,
          y: 59,
        },
        labelPosition: {
          x: 598,
          y: 30,
        },
      },
      {
        label: "Nature",
        displayLabel: true,
        labelTarget: {
          x: 554,
          y: 289,
        },
        labelPosition: {
          x: 621,
          y: 271,
        },
      },
      {
        label: "Cities",
        displayLabel: true,
        labelTarget: {
          x: 533,
          y: 604,
        },
        labelPosition: {
          x: 571,
          y: 613,
        },
      },
      {
        label: "Agriculture",
        displayLabel: true,
        labelTarget: {
          x: 465,
          y: 673,
        },
        labelPosition: {
          x: 518,
          y: 714,
        },
      },
    ],
  },
};
