This project uses laravel-mix to compile Vue to JS.

Shopify's `theme` CLI is required to work on the theme.

Set up the project using npm: `npm install`. Yarn doesn't work with laravel-mix.

Use `npm run watch` to automatically build development bundles that can be used with Vue Devtools.

Use `npm run prodw` to automatically build production bundles that are tree shaken and smaller.

# CartWizard
This relates to the functionality to have a mini-Wizard and recommend a certain combinations of Variants between products. Currently implemented for the Organic Pads product. The functionality relies on the Variant SKU.

What can be changed from the admin:
  - Variant Price

Variant Name cannot be changed through the admin because it is related to the auto-update quantity function.
