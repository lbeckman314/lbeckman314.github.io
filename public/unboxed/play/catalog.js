// The tools on the playground's shelf. Each one is installed when it is opened,
// from the Alpine packages hosted next to this page (apk/), so none of them
// needs a network. Stars as of 2026-11-28.
//
//   repo:  the project, shown on its card
//   pkgs:  Alpine packages to install (hosted in apk/: list them in
//          scripts/unboxed/packages.txt and run build-apk.sh)
//   files: GitHub files to copy to ~/<name> first ({ repo, ref, paths? }: ref is a
//          pinned commit, so upstream changes can't break a demo until it's bumped;
//          paths limits the download to those files and folders)
//   setup: runs first, quietly (files for the demo)
//   run:   what runs in the terminal, shown as typed; the shell stays open after it
//   tip:   one line shown above it
//   check: text the terminal shows once the demo works (scripts/unboxed/smoke.mjs)

export const CATALOG = [
  {
    id: "neovim", title: "Neovim", repo: "neovim/neovim", stars: 103891,
    blurb: "Vim-fork focused on extensibility and usability.",
    pkgs: ["neovim"], run: "nvim +Tutor",
    tip: "The built-in tutor. Type :q and Enter to quit.",
    check: "Neovim Tutorial",
  },
  {
    id: "fzf", title: "fzf", repo: "junegunn/fzf", stars: 84522,
    blurb: "A command-line fuzzy finder.",
    pkgs: ["fzf"], run: "find /etc -type f 2>/dev/null | fzf --preview 'head -40 {}'",
    tip: "Type to filter the files under /etc, with a preview. Enter picks one, Esc quits.",
    check: "/etc/",
  },
  {
    id: "lazygit", title: "lazygit", repo: "jesseduffield/lazygit", stars: 84138,
    blurb: "A simple terminal UI for git commands.",
    pkgs: ["lazygit"],
    setup: `mkdir -p ~/.config/lazygit && printf 'disableStartupPopups: true\\n' > ~/.config/lazygit/config.yml && git init -q demo && cd demo && git config user.name you && git config user.email you@example.com && printf 'hello\\n' > README.md && git add . && git commit -qm "Initial commit" && printf 'hello, unboxed\\n' >> README.md && printf 'notes\\n' > notes.txt`,
    run: "lazygit",
    tip: "A demo repo with one commit and two changes. Space stages a file, c commits, q quits.",
    check: "Files",
  },
  {
    id: "ripgrep", title: "ripgrep", repo: "BurntSushi/ripgrep", stars: 70397,
    blurb: "Recursively search directories for a regex pattern.",
    pkgs: ["ripgrep"], files: { repo: "BurntSushi/ripgrep", ref: "3e85c6c148fdce38a99ceeb9d2780dc7b03b4a4f", paths: ["crates/", "README.md"] },
    run: "rg --stats -n 'fn search_' crates | tail -25",
    tip: "Searching ripgrep's own source with ripgrep.",
    check: "files searched",
  },
  {
    id: "bat", title: "bat", repo: "sharkdp/bat", stars: 61508,
    blurb: "A cat clone with syntax highlighting and Git integration.",
    pkgs: ["bat"], files: { repo: "sharkdp/bat", ref: "836e3e5676b60aa490beea07e23948ea3cbe6a90", paths: ["src/", "README.md"] },
    run: "bat --paging=never --line-range :60 src/bin/bat/main.rs",
    tip: "bat showing its own source. Try: bat README.md",
    check: "│",
  },
  {
    id: "tmux", title: "tmux", repo: "tmux/tmux", stars: 50594,
    blurb: "A terminal multiplexer.",
    pkgs: ["tmux"], run: "tmux new -s demo",
    tip: "Ctrl-b % splits the window, Ctrl-b o switches panes, exit closes one.",
    check: "[demo]",
  },
  {
    id: "helix", title: "Helix", repo: "helix-editor/helix", stars: 47065,
    blurb: "A post-modern modal text editor.",
    pkgs: ["helix"], run: "hx --tutor",
    tip: "Helix's tutor. Type :q! and Enter to quit.",
    check: "Helix tutorial",
  },
  {
    id: "fd", title: "fd", repo: "sharkdp/fd", stars: 45228,
    blurb: "A simple, fast and user-friendly alternative to find.",
    pkgs: ["fd"], files: { repo: "sharkdp/fd", ref: "c74413f5015d0f99006592321321e96521e5168b" },
    run: "fd -e rs && fd --type d",
    tip: "fd listing its own source. Try: fd -H git",
    check: "src/main.rs",
  },
  {
    id: "yazi", title: "Yazi", repo: "sxyazi/yazi", stars: 43706,
    blurb: "Blazing fast terminal file manager.",
    pkgs: ["yazi"], run: "yazi /usr",
    tip: "Arrow keys or hjkl move, q quits.",
    check: "bin",
  },
  {
    id: "jq", title: "jq", repo: "jqlang/jq", stars: 36359,
    blurb: "Command-line JSON processor.",
    pkgs: ["jq"],
    setup: `printf '%s\\n' '{"tools":[{"name":"fzf","stars":84522},{"name":"ripgrep","stars":70397},{"name":"jq","stars":36359}]}' > tools.json`,
    run: "jq '.tools | map(select(.stars > 50000)) | .[].name' tools.json",
    tip: "Try: jq '.tools | sort_by(.stars)' tools.json",
    check: '"ripgrep"',
  },
  {
    id: "delta", title: "delta", repo: "dandavison/delta", stars: 32888,
    blurb: "A syntax-highlighting pager for git, diff and grep output.",
    pkgs: ["delta"],
    setup: `printf 'def greet(name):\\n    print("hello " + name)\\n\\ngreet("world")\\n' > a.py && printf 'def greet(name: str) -> None:\\n    print(f"hello {name}")\\n\\ngreet("unkernel")\\n' > b.py`,
    run: "diff -u a.py b.py | delta --paging=never",
    tip: "Try: diff -u a.py b.py | delta --side-by-side --paging=never",
    check: "greet",
  },
  {
    id: "hyperfine", title: "hyperfine", repo: "sharkdp/hyperfine", stars: 29389,
    blurb: "A command-line benchmarking tool.",
    pkgs: ["hyperfine"], run: "hyperfine -N --warmup 3 'ls /usr/bin' 'ls -la /usr/bin'",
    tip: "Benchmarks run inside the emulated CPU, so expect slower numbers than native.",
    check: "Summary",
  },
  {
    id: "fastfetch", title: "fastfetch", repo: "fastfetch-cli/fastfetch", stars: 25494,
    blurb: "A neofetch-like tool for fetching system information.",
    pkgs: ["fastfetch"], run: "fastfetch",
    tip: "A real Linux kernel, compiled to WebAssembly.",
    check: "Alpine Linux",
  },
  {
    id: "gum", title: "gum", repo: "charmbracelet/gum", stars: 24709,
    blurb: "A tool for glamorous shell scripts.",
    pkgs: ["gum"],
    run: "gum style --border double --padding '0 2' --border-foreground 214 'Unboxed' && gum choose --header 'Pick a tool to try next' Neovim Helix ripgrep fzf lazygit",
    tip: "Arrow keys move, Enter picks. Try: gum input --placeholder 'Your name'",
    check: "╔",
  },
  {
    id: "eza", title: "eza", repo: "eza-community/eza", stars: 24086,
    blurb: "A modern alternative to ls.",
    pkgs: ["eza"], run: "eza -la --group-directories-first /etc && eza --tree -L 2 /usr/lib | head -30",
    tip: "Try: eza --tree -L 3 /usr/share",
    check: "kw-arch",
  },
  {
    id: "nnn", title: "nnn", repo: "jarun/nnn", stars: 22154,
    blurb: "The unorthodox terminal file manager.",
    pkgs: ["nnn"], run: "nnn /usr",
    tip: "Arrow keys move, ? shows help, q quits.",
    check: "drwxr-xr-x",
  },
  {
    id: "bottom", title: "bottom", repo: "ClementTsang/bottom", stars: 14321,
    blurb: "A graphical process and system monitor.",
    pkgs: ["bottom"], run: "btm",
    tip: "q quits.",
    check: "CPU",
  },
  {
    id: "dust", title: "dust", repo: "bootandy/dust", stars: 12753,
    blurb: "A more intuitive version of du.",
    pkgs: ["dust"], run: "dust -n 25 /usr",
    tip: "Try: dust -d 1 /",
    check: "100%",
  },
  {
    id: "htop", title: "htop", repo: "htop-dev/htop", stars: 8483,
    blurb: "An interactive process viewer.",
    pkgs: ["htop"], run: "htop",
    tip: "F10 or q quits.",
    check: "PID",
  },
  {
    id: "sd", title: "sd", repo: "chmln/sd", stars: 7482,
    blurb: "Intuitive find and replace.",
    pkgs: ["sd"], run: "echo 'Hello, world! Goodbye, world!' | sd 'world' 'unkernel'",
    tip: "Try: echo 'snake_case_name' | sd '_(\\w)' '-$1'",
    check: "Hello, unkernel!",
  },
  {
    id: "cmatrix", title: "cmatrix", repo: "abishekvashok/cmatrix", stars: 5323,
    blurb: "The Matrix, in your terminal.",
    pkgs: ["cmatrix"], run: "cmatrix -b",
    tip: "q quits.",
  },
  {
    id: "the-algorithms", title: "The Algorithms", repo: "TheAlgorithms/Python", stars: 226513,
    blurb: "All algorithms implemented in Python. One of GitHub's 30 most-starred repos.",
    pkgs: ["python3"], files: { repo: "TheAlgorithms/Python", ref: "30507bbe41397065728167fb09aa820f9fce8dc7", paths: ["sorts/", "searches/", "README.md", "LICENSE.md"] },
    run: "python3 -m doctest -v sorts/bubble_sort.py | tail -2 && python3 sorts/quick_sort.py",
    tip: "Python 3 on aarch64, emulated. quick_sort.py asks for numbers; then try: ls sorts searches",
    check: "passed",
  },
  {
    id: "ohmyzsh", title: "Oh My Zsh", repo: "ohmyzsh/ohmyzsh", stars: 190873,
    blurb: "A community-driven framework for managing your zsh configuration.",
    pkgs: ["zsh"], files: { repo: "ohmyzsh/ohmyzsh", ref: "44a5decbc48c4f1885c754eb2044d09a466e4187", paths: ["oh-my-zsh.sh", "lib/", "themes/", "tools/", "templates/", "plugins/git/", "README.md", "LICENSE.txt"] },
    setup: `printf 'export ZSH=%s\\nZSH_THEME=robbyrussell\\nzstyle ":omz:update" mode disabled\\nplugins=(git)\\nsource $ZSH/oh-my-zsh.sh\\n' "$PWD" > ~/.zshrc`,
    run: "exec zsh",
    tip: "Try another theme: omz theme set agnoster",
    check: "➜",
  },
];
