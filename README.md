# Toha

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1b93b02-f278-440b-ae1b-304e9f4c4ab5/deploy-status)](https://app.netlify.com/sites/toha/deploys) ![Repository Size](https://img.shields.io/github/repo-size/hugo-toha/toha) ![Lines of Codes](https://img.shields.io/tokei/lines/github/hugo-toha/toha) ![Contributor](https://img.shields.io/github/contributors/hugo-toha/toha) ![Latest Release](https://img.shields.io/github/v/release/hugo-toha/toha?include_prereleases) ![Last Commit](https://img.shields.io/github/last-commit/hugo-toha/toha) ![Open Issues](https://img.shields.io/github/issues/hugo-toha/toha?color=important) ![Open Pull Requests](https://img.shields.io/github/issues-pr/hugo-toha/toha?color=yellowgreen)  ![License](https://img.shields.io/github/license/hugo-toha/toha) ![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fhugo-toha.github.io%2F)

A [Hugo](https://gohugo.io/) theme for a personal portfolio with minimalist design and responsiveness.

![Thumbnail](https://github.com/hugo-toha/toha/blob/master/images/tn.png)

Example Site: [hugo-toha.github.io](https://hugo-toha.github.io)
Documentation: [toha-guides.netlify.app](https://toha-guides.netlify.app/posts)

## Features

- Minimalist Design
- Fully Responsive
- Carefully designed cards
- Great Experience timeline
- Achievement gallery
- Sidebar to categorize posts
- Short Codes
- Google Analytics Support
- Disqus Comment Support

For more details about the features please visit [here](https://toha-guides.netlify.app/posts/features/).

## Requirements

- Hugo Version 0.68.0 or higher

## Installation

- Create your site if you haven't already

```console
hugo new site my-site -f=yaml
cd my-site
git init
```

- Add the theme as git sub-module

```console
git submodule add https://github.com/hugo-toha/toha.git themes/toha
```

>Don't use SSH URL of the theme during adding as git sub-module. Also, don't clone the theme in your `themes` directory using `git clone`. They don't work well with Github Action or Netlify.

If you want to customize the theme templates, then fork it and use the fork as your theme.

## Configuration

Configure your `config.yaml` file of your site as below:

```yaml
baseURL: http://example.org/
languageCode: en-us
title: "Toha"
theme: "toha"

# Manage languages
# For any more details, you can check the official documentation: https://gohugo.io/content-management/multilingual/
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2
  bn:
    languageName: বাংলা
    weight: 3

# Force a locale to be use, really useful to develop the application ! Should be commented in production, the "weight" should rocks.
# DefaultContentLanguage: fr

# Allow raw html in markdown file
markup:
  goldmark:
    renderer:
      unsafe: true
  tableOfContents:
    startLevel: 2
    endLevel: 6
    ordered: false

# Enable Google Analytics
googleAnalytics: UA-XXXXXXXXX-X

# Enable Disqus forum
disqusShortname: does-not-exist

# Enable global emoji support
enableEmoji: true

# Custom parameters
params:
  # background image of the landing page
  background: "images/background.jpg"

  # Provide logos for your site. The inverted logo will be used in the initial
  # transparent navbar and the main logo will be used in the non-transparent navbar.
  # It will be default to the theme logos if not provided.
  logo:
    main: /assets/images/main-logo.png
    inverted: /assets/images/inverted-logo.png
    favicon: /assets/images/favicon.png

  # GitHub repo URL of your site
  gitRepo: https://github.com/hugo-toha/toha-example-site

  # specify whether you want to write blog post or not
  enableBlogPost: true

  # specify whether you want to show Table of Contents in reading page
  enableTOC: true

  # Provide newsletter configuration. This feature hasn't been implemented yet.
  # Currently, you can just hide it from the footer.
  newsletter:
    enable: true
```

You can just copy the content for `config.yaml` files from `theme/toha/exampleSite/config.yaml`.

If you want to customize the any of the CSS styles on your site, create a
`static/assets/css/style.css` file and add any custom CSS there.

## Usage

Run your hugo site with this theme.

```console
hugo server -w
```

When you first run your site, it will start with the default parameters. It should look similar to the [example site](https://toha.netlify.app) except it will not have any sections in the homepage. Those sections are added via some data files.

You can configure your site by following the step by step guides from [here](https://toha.netlify.app/posts/configuration/).

## Shortcodes

Here, are some handy shortcodes you can use with this theme.

- [img](https://toha.netlify.app/posts/short-codes/img/)
- [split](https://toha.netlify.app/posts/short-codes/split/)
- [vs](https://toha.netlify.app/posts/short-codes/vs/)
- [alert](https://toha.netlify.app/posts/short-codes/alert/)

## Project Roadmap

Here, are the current plan and progress of various components of this theme. The components will be prioritized based on users requests.

### Sections

- [x] **Home**
  - [x] Configurable Background
  - [x] Author Image
  - [x] Greeting
  - [x] Typing Carousel

- [x] **About**
  - [x] Name and Designation
  - [x] Summary
    - [x] Markdown Support
  - [x] Social Links
    - [x] Font Awesome Support
  - [x] Resume Link
  - [x] Soft Skills Indicator

- [x] **Skills**
  - [x] Skill Cards
  - [x] Markdown Support

- [x] **Experiences**
  - [x] Designation
  - [x] Timeline
  - [x] Company Overview
  - [x] Responsibilities

- [ ] **Projects**
  - [x] Category Filter
  - [ ] Project Card
    - [x] Overview
      - [x] Markdown Support
    - [x] Github Stars
    - [x] External URL Support
    - [ ] Technology Tags

- [x] **Recent Posts**

- [ ] **Publications**
  - [ ] Category Filter
  - [ ] Card
  - [ ] Abstract
  - [ ] Authors
  - [ ] Tags
  - [ ] Links
  - [ ] Gallery

- [ ] **Accomplishment / Courses**
  - [ ] Overview
  - [ ] Certificate

- [x] **Achievements Gallery**
  - [x] Image
  - [x] Summary

### List Page

- [x] Post Cards
- [x] Sidebar
- [x] Pagination

### Reading Page

- [x] Hero Image
- [x] Author Information
- [x] Next & Previous Page Navigation
- [x] `Improve This Page` Button
- [x] Disqus Comment
- [x] Option to navigate to list page

### Tracking and Comments

- [x] Google Analytics
- [x] Disqus Comment

### Shortcodes

- [x] Image
- [x] Split Page into Multiple Column
- [x] Vertical space between two sections
- [x] Alert
- [ ] Figure & sub-figure
- [ ] Tabs

## Contributing

You can contribute to this theme in various ways. You can report a [bug](https://github.com/hugo-toha/toha/issues/new?template=bug.md), file an [feature request](https://github.com/hugo-toha/toha/issues/new?template=feature_request.md), send a PR, [share your thoughts](https://github.com/hugo-toha/toha/issues/new?template=question.md) etc.

Pull requests are most welcome and I will be happy to review. Just follow the following principles:

- Keep it simple.
- Keep it consistent with the design.
- Use as few dependencies as possible.
- Have patience.

>I am not a web developer. I just created this theme for my personal needs. So, it is reasonable to have some flaws in the codes. Feel free to open issues and PR acknowledging the problems.

## Local Development

For local development, you can run your own site or the [example site](https://github.com/hugo-toha/toha-example-site) locally and make changes in the theme submodule.

### Fork
Fork [this repo](https://github.com/hugo-toha/toha) and setup your local submodule with the following from the site's folder by running the following

```sh
git submodule update --init --recursive --remote
cd themes/toha
git remote add my-fork https://github.com/<your-github-user>/toha
git checkout -b my-feature-branch
```

From there you can make changes to the source code of the theme while testing with your running Hugo site.

### Open a PR

When the changes look good, commit and push them to your fork
```sh
git add .
git commit -m "A meaningful commit message"
git push my-fork my-feature-branch
```

And then open a PR `https://github.com/<your-github-user></your-github-user>/toha/pull/new/my-feature-branch`

## Attribution

- Thanks [Anup Deb](https://dribbble.com/anupdeb) for his design guidance.
- Many of the illustrations have been taken from [iconscout](http://iconscout.com/).
