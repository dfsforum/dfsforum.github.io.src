# dfsforum.github.io.src

DFSForum.org source and build info.

Built with [Deno](https://deno.land/), [Lume](https://lume.land) static site generator, [Direnv](https://direnv.net/) and [nix-direnv](https://github.com/nix-community/nix-direnv) build environements on Nix/NixOS.

#### 1. Install direnv and nix-direnv

See installation instructions for your OS here:

https://github.com/direnv/

https://github.com/nix-community/nix-direnv

On NixOS, configure `/etc/nixos/configuration.nix` (or your nix flake) and rebuild

on NixOS 23.11 unstable and later:

````
{ pkgs, ... }: {

  programs.direnv = {
    enable = true;
    package = pkgs.direnv;
    silent = false;
    persistDerivations = true;
    loadInNixShell = true;
    direnvrcExtra = "";
    nix-direnv = {
      enable = true;
      package = pkgs.nix-direnv;
    };
  };

  # nix options for derivations to persist garbage collection
  nix.settings = {
    ...
    keep-outputs = true;
    keep-derivations = true;
    ...
  };

  environment.pathsToLink = [
    ...
    "/share/nix-direnv"
    ...
  ];
}
````

on NixOS 23.05 and earlier:

````
{ pkgs, ... }: {
  environment.systemPackages = with pkgs; [
    ...
    direnv
    nix-direnv
    ...
  ];

  # nix options for derivations to persist garbage collection
  nix.settings = {
    ...
    keep-outputs = true;
    keep-derivations = true;
    ...
  };

  environment.pathsToLink = [
    ...
    "/share/nix-direnv"
    ...
  ];

  # if you also want support for flakes
  nixpkgs.overlays = [
    (self: super: { nix-direnv = super.nix-direnv.override { enableFlakes = true; }; } )
  ];
}
````

`echo "source /run/current-system/sw/share/nix-direnv/direnvrc" >> ~/.config/direnv/direnvrc`

`echo 'eval "$(direnv hook zsh)"' >> /.zshrc` (or \~/.bashrc, see install links above for other shells)

`source ~/.zshrc`

#### 2. Create a direnv project directory for this project with Deno installed

`mdkir <project-directory> && cd "$_"`

create `default.nix` or `shell.nix` that loads Deno and anything else you want:

````
cat > default.nix<<EOF
{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    # common build inputs
    direnv
    xclip
    exa
    fd
    # project-specific build inputs
    deno
    #rustup
    #nodejs
    #nodePackages.pnpm
  ];
  shellHook = ''

    # aliases
    alias ls="exa --long --group --header -a --classify --links --level=3 --color=auto --sort=type --time-style=long-iso --extended"
    alias find="fd --hidden --list-details --color=auto"

    # optionally import parent shell config, or copy the desired subset into this shellHook section
    [ -x ~/.zshrc ] && source ~/.zshrc

    # export envars
    export DENO_BIN="${pkgs.deno}/bin/"
    #export NODE_BIN="${pkgs.nodejs}/bin/"
  '';
}
EOF
````

`echo "use nix" >> .envrc` (or "use flake" if you're using Nix Flakes)

`direnv allow`

`cd ..` (to unload direnv)

`cd <projectdir>` (to reload direnv)

`deno --version` to test

#### 3.  Install Lume in project directory

`deno run -Ar https://deno.land/x/lume/init.ts` to install Lume

`deno install --allow-run --name lume --force --reload https://deno.land/x/lume_cli/mod.ts` to setup Lume CLI

`lume -s` to test

`deno task lume -s` to run the hot-reloading dev server

Begin coding.
