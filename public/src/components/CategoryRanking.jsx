import { useI18n } from '../hooks/useI18n.js';
import { RankingItem } from './RankingItem.jsx';

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

export function CategoryRanking({ categoryName, data }) {
  const { t } = useI18n();

  const categorySlug = createCategorySlug(categoryName);
  const maxPercentage = data.countries[0]?.percentage || 0;

  const translatedCategory = CATEGORY_MAP[categoryName]
    ? t(CATEGORY_MAP[categoryName])
    : categoryName;

  return (
    <div className="category-ranking" id={categorySlug}>
      <h2>
        <span
          className="category-color-box"
          style={{ backgroundColor: data.color }}
        />
        {translatedCategory}
      </h2>

      <ol className="ranking-list">
        {data.countries.map((country, index) => (
          <RankingItem
            key={country.countryKey}
            country={country}
            index={index}
            maxPercentage={maxPercentage}
            color={data.color}
          />
        ))}
      </ol>
    </div>
  );
}
