# dssforum.github.io.src
DSSForum.org source and build artifacts
Using [Deno](https://deno.land/) and [Lume](https://lume.land) static site generator.
Using [Direnv](https://direnv.net/) and [nix-direnv](https://github.com/nix-community/nix-direnv) build environements on NixOS.

# Direnv setup on Nix

1. Install direnv and nix-direnv
https://github.com/direnv/direnv/wiki/Nix
https://github.com/nix-community/nix-direnv
-- configure configuration.nix as such and rebuild:

````
{ pkgs, ... }: {
  environment.systemPackages = with pkgs; [ direnv nix-direnv ];
  # nix options for derivations to persist garbage collection
  nix.settings = {
    keep-outputs = true;
    keep-derivations = true;
  };
  environment.pathsToLink = [
    "/share/nix-direnv"
  ];
  # if you also want support for flakes
  nixpkgs.overlays = [
    (self: super: { nix-direnv = super.nix-direnv.override { enableFlakes = true; }; } )
  ];
}
````

-- run `cp /run/current-system/sw/share/nix-direnv/direnvrc ~/.config/direnv/direnvrc`
-- run `source ~/.config/direnv/direnvrc`
-- add `eval "$(direnv hook zsh)"` to ~/.zshrc
-- run `source ~/.zshrc`

2. Create a direnv project directory for this project with Deno installed
-- create a project directory, cd into it
-- create a shell.nix that loads Deno: 

````
{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    deno
  ];
  shellHook = ''export DENO_BIN="${pkgs.deno}/bin/deno"'';
}
````

-- `echo "use nix" >> .envrc' (or "use flake" if you're using Nix Flakes)
-- `direnv allow`
-- `cd ..` (to unload direnv)
-- `cd <projectdir>` (to reload direnv)
-- run or add to .zshrc or .profile `export PATH="/home/<user>/.deno/bin:$PATH"`
-- run `deno --version` to test

3.  Install Lume
-- run `deno run -Ar https://deno.land/x/lume/init.ts` to install Lume
-- run `deno install --allow-run --name lume --force --reload https://deno.land/x/lume_cli/mod.ts` to setup Lume CLI
-- run `lume -s` to test
 
