const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");

  // Define an async shortcode for image optimization
  eleventyConfig.addAsyncShortcode("imageOpt", async function(src, alt, classes = "") {
    // Resolve the input path from the 'src' directory
    let inputPath = path.join(eleventyConfig.dir.input, src);

    let metadata = await Image(inputPath, {
      widths: [300, 600, 1200], // Optimized widths
      formats: ["webp", "jpeg"], // Generate WebP and JPEG versions
      outputDir: "./_site/images/optimized/",
      urlPath: "/images/optimized/",
      // transformOnRequest is automatically handled in serve mode by default
    });

    let imageAttributes = {
      alt,
      sizes: "(max-width: 600px) 100vw, 50vw", // Responsive sizes for the grid
      loading: "lazy",
      decoding: "async",
      class: classes,
    };

    // Use generateHTML to get the full <picture> tag markup
    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
