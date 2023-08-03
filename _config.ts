import lume from "lume/mod.ts";
import vento from "lume/plugins/vento.ts";

//import remark from "lume/plugins/remark.ts"; // many nodejs dependencies, broken node package
//import tailwindcss from "lume/plugins/tailwindcss.ts";
//import postcss from "lume/plugins/postcss.ts";

const site = lume({
  dest: "../dfsforum.github.io",
  prettyUrls: false,
  //page404: "./not-found.html",  
  // replace relative links with absolute:
  //location: new URL("https://dfsforum.org/"),
  watcher: {
    //debounce: 10, //defaul = 100
    ignore: [
      "vim",
      //"./ignored-folder/",
      //"./ignored-file.txt",
      //(path) => path.endsWith(".foo"), // ignore extension
    ],
  }, 
  //components: {
  //  variable: "comp",
  //  cssFile: "/components.css",
  //  jsFile: "/components.js",
  //},  
  //middleware: [
  //  expires(),
  //],
});

// Ignore files and directories not part of the deployed site. All files and
// directories that begin with . or _ are ignored by default.
site.ignore("shell.*");
site.ignore(".direnv");
site.ignore("deno.*");
site.ignore("*.json");
site.ignore("*.zip");
site.ignore("*.xcf");
site.ignore("doc");
site.ignore("404.md");
site.ignore("browserconfig.xml");
site.ignore("vendor");
site.ignore("_vendor");
site.ignore("archive");
site.ignore("_archive");
site.ignore("vim");
site.ignore("vim~");
site.ignore("vim~/");
site.ignore("node_modules");
site.ignore("README.md");
site.ignore("LICENSE.txt");
site.ignore("SETUP.md");

// Copy static files and directories to _site/, bypassing compiler for things
// that don't need to be compiled, or overiding the default to copy
// files/dirs beginning with . or _.  Copied files are never processed, even
// if they have a known extension like .md or .njk.
site.copy("js/");
site.copy("css/");
site.copy("img/");
site.copy("fonts/");
site.copy("icon.png");
site.copy("favicon.ico");
site.copy("favicon-16x16.png");
site.copy("favicon-32x32.png");
site.copy("apple-touch-icon.png");
site.copy("apple-touch-icon.png", "icon.png");
site.copy("android-chrome-192x192.png");
site.copy("android-chrome-512x512.png");
site.copy("humans.txt");
site.copy("robots.txt");
site.copy("site.webmanifest");
// site.copy("browserconfig.xml");
site.copy("README.prod.md", "README.md");

site.use(vento());
//site.use(remark()); // many nodejs dependencies, one broken node package
//site.use(tailwindcss());
//site.use(postcss());

export default site;
