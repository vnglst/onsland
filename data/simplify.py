import geojson
from shapely.geometry import shape, mapping
from shapely.ops import transform
from functools import partial
import pyproj

def simplify_geojson(input_path, output_path, tolerance):
    with open(input_path, 'r') as f:
        data = geojson.load(f)

    def simplify_feature(feature, tolerance):
        geom = shape(feature['geometry'])
        simplified_geom = geom.simplify(tolerance, preserve_topology=True)
        feature['geometry'] = mapping(simplified_geom)
        return feature

    simplified_features = [
        simplify_feature(feature, tolerance) for feature in data['features']
    ]

    simplified_geojson = geojson.FeatureCollection(simplified_features)

    with open(output_path, 'w') as f:
        geojson.dump(simplified_geojson, f)

# Usage
input_path = './netherlands.json'
output_path = './simplified_netherlands-0.01.json'
tolerance = 0.01  # Adjust this value based on your needs
simplify_geojson(input_path, output_path, tolerance)
