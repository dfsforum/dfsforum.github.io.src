import lume from "lume/mod.ts";
//import remark from "lume/plugins/remark.ts"; // many nodejs dependencies, broken node package
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume({
  dest: "../dfsforum.github.io",

  // replace relative links with absolute:
  // location: new URL("https://dssforum.org/"),

});

// Ignore files and directories not part of the deployed site. All files and 
// directories that begin with . or _ are ignored by default.
site.ignore("shell.*");
site.ignore(".direnv");
site.ignore("deno.*");
site.ignore("*.json");
site.ignore("*.zip");
site.ignore("doc");
site.ignore("vendor");
site.ignore("_vendor");
site.ignore("node_modules");
site.ignore("README.md");
site.ignore("LICENSE.txt");
site.ignore("SETUP.md");

// Copy static files and directories to _site/, bypassing compiler for things 
// that don't need to be compiled, or overiding the default to copy 
// files/dirs beginning with . or _.  Copied files are never processed, even 
// if they have a known extension like .md or .njk.
site.copy("js/");
site.copy("img/");
site.copy("fonts/");
site.copy("icon.png");
site.copy("favicon.ico");
site.copy("humans.txt");
site.copy("robots.txt");
site.copy("site.webmanifest");
site.copy("browserconfig.xml");
site.copy("README.prod.md", "README.md");

//site.use(remark()); // many nodejs dependencies, one broken node package
site.use(tailwindcss());
site.use(postcss());

export default site;
