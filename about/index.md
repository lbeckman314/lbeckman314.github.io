---
title: about
---

<div class="center">
    <span id="hello" class="big rainbow">Hello, I'm liam.</span>
    <object id="smile" type="image/svg+xml" data="/assets/svg/icon-smile.svg"></object>
</div>

<div id="stuck-up">A STUCK-UP, HALF-WITTED, SCRUFFY-LOOKING NERF HERDER.</div>

## about me:
I'm a sleepy human with a dark history of secrets and intrigue.

Have a good book or movie recommendation or just want to chat? I'm available at:

| e-mail | <a href="mailto:liam@liambeckman.com">liam@liambeckman.com</a> |
| irc | [lbeckman314@irc.freenode.net](https://freenode.net/) |
| matrix | [@lbeckman314:matrix.org](https://matrix.org/) |


Are you looking for a plucky developer with a small propensity for segmentation faults? Here are some links of interest —

<div class="inline-block profiles">
    {% include block.html
    url='https://liambeckman.com/pkgs/resume/resume-liam-beckman.pdf'
    img='/assets/svg/pdf.svg'
    txt='Resume (PDF)' %}

    {% include block.html
    url='https://git.liambeckman.com/liam/resume/src/branch/master/src/resume-liam-beckman.tex'
    img='/assets/svg/tex.svg'
    txt='Resume (LaTeX)' %}

    {% include block.html
    url='https://github.com/lbeckman314/'
    img='/assets/svg/github.svg'
    txt='Github' %}

    {% include block.html
    url='https://git.liambeckman.com/liam'
    img='/assets/svg/gitea.svg'
    txt='Gitea' %}

    {% include block.html
    url='https://www.linkedin.com/in/liam-beckman-ab3183a6/'
    img='/assets/svg/linkedin.svg'
    txt='LinkedIn' %}
</div>

---

## about the website:

This website stores and presents various projects. It originally got up and running thanks to Jonathan McGlone's wonderfully helpful [guide](http://jmcglone.com/guides/github-pages/).

The site is built by [Jekyll](https://jekyllrb.com/), hosted on a personal server (Debian Testing on a ThinkPad X230), and encrypted by [Let's Encrypt](https://letsencrypt.org/)/[Certbot](https://certbot.eff.org/).

### installation

The [website's source code](https://github.com/lbeckman314/website) is yours. Feel free to copy and paste, fork, clone, or anything you like! To spin up your own site, follow [the jekyll quick-start quide](https://jekyllrb.com/docs/quickstart/) (adapted below) —

```shell
# Install ruby
# for OS-specific instructions, check out https://www.ruby-lang.org/en/downloads/

# Install Jekyll and Bundler gems through RubyGems
gem install jekyll bundler

# Install dependencies
bundle install

# Create a new Jekyll site at ./myblog
jekyll new myblog

# Alternatively, clone an existing jekyll site
# git clone https://github.com/lbeckman314/website

# Change into your new directory
cd myblog

# Build the site on the preview server
bundle exec jekyll serve

# Now browse to http://localhost:4000

# Then you can change the html/css files in your website directory (e.g. myblog/) to suit your tastes!
# some cool templates → https://html5up.net/

# Hosting is a whole 'nother beast, but services like github pages and gitlab pages make free hosting relatively easier.
# self-hosting with apache and/or nginx is another cool possibility!
```

---

## my setup:

![Screenshot of desktop.](/assets/images/home.jpg)

- bar ⇢ [Polybar](https://polybar.github.io/)
- browser ⇢ [Firefox](https://www.mozilla.org/)
- computer ⇢ [ThinkPad X220](https://en.wikipedia.org/wiki/ThinkPad_X_series)
- dock ⇢ [Plank](https://launchpad.net/plank)
- editor ⇢ [Vim](https://www.vim.org/) + [Emacs](https://www.gnu.org/software/emacs/)
- icons ⇢ [Numix Circle](https://github.com/numixproject/numix-icon-theme-circle)
- launcher ⇢ [Rofi](https://github.com/davatorium/rofi)
- os ⇢ [Void (linux)](https://voidlinux.org/)
- shell ⇢ [Zsh](http://zsh.sourceforge.net/) + [tmux](https://github.com/tmux/tmux)
- terminal ⇢ [Alacritty](https://github.com/alacritty/alacritty)
- wallpaper ⇢ [Firewatch theme](https://github.com/adi1090x/dynamic-wallpaper)
- window manager ⇢ [bspwm](https://github.com/baskerville/bspwm)
- [dotfiles](https://github.com/lbeckman314/dotfiles)

