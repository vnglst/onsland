# Ons Land

How do we use our land in the Netherlands? This webpage visualizes land use in the Netherlands. Each hexagon represents x% (y hectares) of the total land area of the Netherlands. The color of the hexagon indicates the type of land use.

![Screenshot of the webpage](./version-wageningen-4.png)

## Development

Use the following commands to start the development server:

```bash
npx vite
```

This will create a webserver that automatically refreshes when you make changes to the code.

## Data sources

- [Agricultural land use](https://agrimatie.nl/ThemaResultaat.aspx?subpubID=2232&themaID=2286&indicatorID=2911#:~:text=Van%20het%20totaal%20areaal%20cultuurgrond,0%2C6%25%20voor%20glastuinbouw.&text=De%20basis%20voor%20de%20oppervlakte%20cultuurgrond%20is%20de%20Landbouwtelling.) (2022)
- [All land use](https://lgn.nl/reports/WENR-rapport%203235_Totaal_LR.pdf) (2021)
- [CBS Landtelling, agrarisch gebruik](https://www.cbs.nl/nl-nl/cijfers/detail/80780ned#shortTableDescription)
- Solar parks, according to [Kadaster](https://www.kadaster.nl/documents/d/kadaster.nl/kadaster-onderzoeksrapport-naar-zonneparken-in-nederland-1) (2023)
