const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addAsyncShortcode("imageOpt", async function(src, alt, classes = "") {
    let inputPath = path.join(eleventyConfig.dir.input, src);

    let metadata = await Image(inputPath, {
      widths: [300, 600, 1200], 
      formats: ["webp", "jpeg"],
      outputDir: "./_site/images/optimized/", 
      urlPath: "/images/optimized/",
    });

    let imageAttributes = {
      alt,
      sizes: "(max-width: 600px) 100vw, 50vw",
      loading: "lazy",
      decoding: "async",
      class: classes,
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};