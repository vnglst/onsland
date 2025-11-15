import { html } from 'htm/preact';
import { useI18n } from '../hooks/useI18n.js';

const CATEGORY_MAP = {
  'Water': 'categories.water',
  'Woodland': 'categories.woodland',
  'Wetland': 'categories.wetland',
  'Shrubland': 'categories.shrubland',
  'Bare land': 'categories.bareLand',
  'Urban area': 'categories.urbanArea',
  'Grassland': 'categories.grassland',
  'Cereals': 'categories.cereals',
  'Wheat': 'categories.wheat',
  'Barley': 'categories.barley',
  'Rye': 'categories.rye',
  'Oats': 'categories.oats',
  'Maize': 'categories.maize',
  'Rice': 'categories.rice',
  'Rape': 'categories.rape',
  'Sunflower': 'categories.sunflower',
  'Soya': 'categories.soya',
  'Potatoes': 'categories.potatoes',
  'Sugarbeet': 'categories.sugarbeet',
  'Tobacco': 'categories.tobacco',
  'Cotton': 'categories.cotton',
  'Dry pulses': 'categories.dryPulses',
  'Industrial crops': 'categories.industrialCrops',
  'Vegetables': 'categories.vegetables',
  'Flowers': 'categories.flowers',
  'Vineyards': 'categories.vineyards',
  'Orchards': 'categories.orchards',
  'Olive groves': 'categories.oliveGroves',
  'Nurseries': 'categories.nurseries',
  'Arom. plants': 'categories.aromPlants',
  'Temp. grassland': 'categories.tempGrassland',
  'Permanent crops': 'categories.permanentCrops',
  'Other cropland': 'categories.otherCropland',
  'Mountains': 'categories.mountains',
  'Olive trees': 'categories.oliveTrees',
  'Vineyard': 'categories.vineyard',
  'Fruit trees': 'categories.fruitTrees',
  'Fodder crops': 'categories.fodderCrops',
  'Lichens and moss': 'categories.lichensAndMoss',
  'Rocks and stones': 'categories.rocksAndStones',
  'Root vegetables': 'categories.rootVegetables',
  'Other cereals': 'categories.otherCereals',
  'Triticale': 'categories.triticale'
};

function createCategorySlug(categoryName) {
  return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function RankingBadge({ ranking, labelKey, isTopRank }) {
  const { t } = useI18n();

  const translatedCategory = CATEGORY_MAP[ranking.categoryName]
    ? t(CATEGORY_MAP[ranking.categoryName])
    : ranking.categoryName;

  return html`
    <div class="ranking-badge">
      <a href=${'rankings#' + createCategorySlug(ranking.categoryName)}>
        <div class="ranking-position-number ${isTopRank ? "top-rank" : "bottom-rank"}">
          #${ranking.position}
        </div>
        <div class="ranking-badge-content">
          <div class="ranking-badge-category">${translatedCategory}</div>
          <div class="ranking-badge-label">${t(labelKey)}</div>
        </div>
      </a>
    </div>
  `;
}
