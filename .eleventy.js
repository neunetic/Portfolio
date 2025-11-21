const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs"); // Added for cache handling

module.exports = function(eleventyConfig) {

  // Ensure output directories exist (optional, but good practice)
  eleventyConfig.on('beforeBuild', () => {
    if (!fs.existsSync("./_site/images/optimized/")) fs.mkdirSync("./_site/images/optimized/", { recursive: true });
    if (!fs.existsSync("./_site/images/lightbox/")) fs.mkdirSync("./_site/images/lightbox/", { recursive: true });
  });

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");

  // Shortcode for responsive thumbnails (loading="lazy" is default)
  eleventyConfig.addAsyncShortcode("imageOpt", async function(src, alt, classes = "") {
    let inputPath = path.join(eleventyConfig.dir.input, src);

    let metadata = await Image(inputPath, {
      widths: [300, 600, 900, 1200, null], // Reduced widths for thumbnails
      formats: ["webp", "jpeg"],
      outputDir: "./_site/images/optimized/", 
      urlPath: "/images/optimized/",
    });

    let imageAttributes = {
      alt,
      sizes: "(max-width: 600px) 100vw, 600px",
      loading: "lazy",
      decoding: "async",
      class: classes,
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // New shortcode for lightbox-specific, larger images
  eleventyConfig.addAsyncShortcode("imageLightboxSrc", async function(src) {
    let inputPath = path.join(eleventyConfig.dir.input, src);

    let metadata = await Image(inputPath, {
      widths: [1600], // Optimized size for lightbox
      formats: ["webp", "jpeg"],
      outputDir: "./_site/images/lightbox/", 
      urlPath: "/images/lightbox/",
      // Ensure the cache is used and we only need the metadata object
      dryRun: false,
    });

    return metadata.jpeg[0].url; 
  });


  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
