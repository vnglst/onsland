// Constants for OnsLand application
// Centralized configuration values for consistency and maintainability

const CONSTANTS = {
  // SVG and visualization dimensions
  SVG_WIDTH: 800,
  SVG_HEIGHT: 800,

  // Hexagon configuration
  HEX_RADIUS_SMALL: 6,
  HEX_RADIUS_MEDIUM: 8,
  HEX_RADIUS_LARGE: 12,

  // Animation timings (in milliseconds)
  ANIMATION_DELAY_HEXAGON: 0.7, // Per hexagon delay multiplier
  ANIMATION_DURATION_SHORT: 500,
  ANIMATION_DURATION_MEDIUM: 750,
  ANIMATION_DURATION_LONG: 1000,
  ANIMATION_LABEL_DELAY: 500,
  HASH_SCROLL_DELAY: 100,

  // Layout and spacing
  GRID_PADDING: 50,
  LEGEND_SPACING: 20,
  LEGEND_HEXAGON_OFFSET: 5,
  LEGEND_TEXT_OFFSET_X: 20,
  LEGEND_TEXT_OFFSET_Y: 10,

  // Intersection Observer configuration
  LAZY_LOAD_ROOT_MARGIN: '200px',
  LAZY_LOAD_THRESHOLD: 0,

  // Font sizes
  FONT_SIZE_LABEL: '18px',
  FONT_SIZE_LEGEND: '14px',

  // Stroke widths
  STROKE_WIDTH_SQUARE_VIEW: 0,
  STROKE_WIDTH_MAP_VIEW: 0.1,

  // Label configuration
  LABEL_LINE_OFFSET: 10,
  LABEL_LINE_OFFSET_Y: 5,
  LABEL_CIRCLE_RADIUS: 5,
  LABEL_STROKE_WIDTH: 2,
  LABEL_DASH_ARRAY: '2,2'
};

// Make constants available globally
window.CONSTANTS = CONSTANTS;
