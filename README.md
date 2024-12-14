# eleventy-favicons
A minimal integration of the [favicons library](https://www.npmjs.com/package/favicons) into [Eleventy](https://www.11ty.dev/), with some future proofing.

- Uses global data, as such also being compatible with template engines without filter/shortcode support
- Allows passing your own [favicons options](https://www.npmjs.com/package/favicons#user-content-usage)
- Allows providing your own favicons library instance, whilst still providing one by default.

## How-to
### Basic usage
```bash
npm install eleventy-favicons
yarn add eleventy-favicons
```

```js
// .eleventy.js
import eleventyFavicons from "eleventy-favicons";

export default async function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyFavicons, { image: "src/favicon.svg"} );
}
```
Then, use it in your templates. The example below uses HTML/Liquid:
```liquid
<!-- src/example-page.html -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    {{favicons}}
</head>
```
Alternatively it also works on templating engines which tend to struggle with global filters/shortcodes. For example, see pug usage below:
```pug
//- src/example-page.pug
head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Example page
    .
        !{favicons}
    meta(name="generator", content=eleventy.generator)
```

And that's all you have to do! However, you can customise the behaviour with the methods below.

### Passing options to favicons
```js
// .eleventy.js
import eleventyFavicons from "eleventy-favicons";

export default async function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyFavicons, {
        image: "src/static/logo.svg",
        favicons: {
            background: "#f4f6a3",
            theme_color: "#f4f6a3",
        }
    });
}
```

### Using your own favicons instance
```js
// .eleventy.js
import eleventyFavicons from "eleventy-favicons";
import favicons from "favicons";

export default async function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyFavicons, {
        image: "src/static/logo.svg",
        faviconsLibrary: favicons
    });
}
```

### Clone locally
```bash
git clone https://github.com/Denperidge/eleventy-favicons.git
cd eleventy-favicons
npm install
```

## Attribution
This project does not exists in a vaccuum, so I'd like to give credit to:
- The similar use case [eleventy-plugin-gen-favicons](https://www.npmjs.com/package/eleventy-plugin-gen-favicons) is an incredible option for those that prefer filters/shortcodes, or those that like the standards and favicon generation it is based on.
- [@grimlink/eleventy-plugin-sass](https://www.npmjs.com/package/@grimlink/eleventy-plugin-sass) is an incredible plugin that introduced me to bring-your-own-imports in Eleventy plugins, which is a design decision I also added to eleventy-favicons.
- [pesasa from openclipart](https://web.archive.org/web/20210624071744/http://openclipart.org/detail/104599/cat-linedrawing) for the public domain svg the tests use as a favicon! 

## License
This project is licensed under the [MIT License](LICENSE).
