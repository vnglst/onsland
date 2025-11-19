// Shared translation utilities for OnsLand
// Consolidates translation mapping logic used across multiple pages

/**
 * Translates a category name using the i18n system
 * Maps category display names to translation keys
 */
function translateCategory(categoryName) {
  const categoryMap = {
    Water: 'categories.water',
    Woodland: 'categories.woodland',
    Wetland: 'categories.wetland',
    Shrubland: 'categories.shrubland',
    'Bare land': 'categories.bareLand',
    'Urban area': 'categories.urbanArea',
    Grassland: 'categories.grassland',
    Cereals: 'categories.cereals',
    Wheat: 'categories.wheat',
    Barley: 'categories.barley',
    Rye: 'categories.rye',
    Oats: 'categories.oats',
    Maize: 'categories.maize',
    Rice: 'categories.rice',
    Rape: 'categories.rape',
    Sunflower: 'categories.sunflower',
    Soya: 'categories.soya',
    Potatoes: 'categories.potatoes',
    Sugarbeet: 'categories.sugarbeet',
    Tobacco: 'categories.tobacco',
    Cotton: 'categories.cotton',
    'Dry pulses': 'categories.dryPulses',
    'Industrial crops': 'categories.industrialCrops',
    Vegetables: 'categories.vegetables',
    Flowers: 'categories.flowers',
    Vineyards: 'categories.vineyards',
    Orchards: 'categories.orchards',
    'Olive groves': 'categories.oliveGroves',
    Nurseries: 'categories.nurseries',
    'Arom. plants': 'categories.aromPlants',
    'Temp. grassland': 'categories.tempGrassland',
    'Permanent crops': 'categories.permanentCrops',
    'Other cropland': 'categories.otherCropland',
    Mountains: 'categories.mountains',
    'Olive trees': 'categories.oliveTrees',
    Vineyard: 'categories.vineyard',
    'Fruit trees': 'categories.fruitTrees',
    'Fodder crops': 'categories.fodderCrops',
    'Lichens and moss': 'categories.lichensAndMoss',
    'Rocks and stones': 'categories.rocksAndStones',
    'Root vegetables': 'categories.rootVegetables',
    'Other cereals': 'categories.otherCereals',
    Triticale: 'categories.triticale',
  };

  const key = categoryMap[categoryName];
  return key ? i18n.t(key) : categoryName;
}

/**
 * Create a URL-friendly slug from a category name
 * @param {string} categoryName - The category name to convert
 * @returns {string} URL-friendly slug
 */
function createCategorySlug(categoryName) {
  return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Translates a label name using the i18n system
 * Maps label display names to translation keys
 */
function translateLabel(labelName) {
  const labelMap = {
    Water: 'labels.water',
    Nature: 'labels.nature',
    Cities: 'labels.cities',
    Farmland: 'labels.farmland',
    Mountains: 'labels.mountains',
    Forests: 'labels.forests',
    Lakes: 'labels.lakes',
    Agriculture: 'labels.agriculture',
    Pasture: 'labels.pasture',
    Coastline: 'labels.coastline',
    Islands: 'labels.islands',
    Alps: 'labels.alps',
    Cropland: 'labels.cropland',
  };

  const key = labelMap[labelName];
  return key ? i18n.t(key) : labelName;
}

// Export functions to global scope
globalThis.translateCategory = translateCategory;
globalThis.translateLabel = translateLabel;
globalThis.createCategorySlug = createCategorySlug;
