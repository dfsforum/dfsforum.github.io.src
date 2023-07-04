{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    deno
  ];
  shellHook = ''export DENO_BIN="${pkgs.deno}/bin/deno"'';
}
