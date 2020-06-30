# Toha

A [Hugo](https://gohugo.io/) theme for a personal portfolio with minimalist design and responsiveness.

![Thumbnail](https://github.com/hossainemruz/toha/blob/master/images/tn.png)

Example Site: [Toha Example Site](https://toha.netlify.app)

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

For more details about the features please visit [here](https://toha.netlify.app/posts/features/features/).

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
git submodule add https://github.com/hossainemruz/toha.git themes/toha
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

# Allow raw html in markdown file
markup:
  goldmark:
    renderer:
      unsafe: true

# Enable Google Analytics
googleAnalytics: UA-xxxxxxxx

# Enable Disqus forum
disqusShortname: does-not-exist

# Enable global emoji support
enableEmoji: true

# Custom parameters
params:
  # copyright
  copyright: © 2020 Copyright.

  # background image of the landing page
  background: "images/background.jpg"

  # GitHub repo URL of your site
  gitRepo: https://github.com/hossainemruz/toha-example-site

  # specify whether you want to write blog post or not
  enableBlogPost: true

  # specify the list of custom menus that you want to show in the top navbar.
  # they will be separated by a divider from the main menus.
  customMenus:
  - name: Notes
    url: https://hossainnotes.netlify.app/docs/example/

  # some information about you
  author:
    name: "Jane Doe"
    image: "images/avatar.png"
    # give your some contact information. they will be used in the footer
    contactInfo:
      email: "janedoe@example.com"
      phone: "+0123456789"
    # a summary of what you do
    summary:
    - I am a Developer
    - I work with Go
    - I love to work with some fun projects
```

You can just copy the content for `config.yaml` files from `theme/toha/exampleSite/config.yaml`.

## Usage

Run your hugo site with this theme.

```console
hugo server -w
```

Don't panic if the generated site does not look like what have you seen in the demo. Now, you have to provide some data in `data` folder of your site.

Follow the posts giving step by step instructions for configuring your data folder from [here](https://toha.netlify.app/posts/configuration/home-section/home-section/).

You can also follow the sample format given in `themes/toha/exampleSite/data` directory.

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
- [ ] Pagination

### Reading Page

- [x] Hero Image
- [x] Author Information
- [x] Next & Previous Page Navigation
- [x] `Improve This Page` Button
- [x] Disqus Comment
- [ ] Option to navigate to list page

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

You can contribute to this theme in various way. You can report a bug, file an feature request, send a PR, share your thoughts etc.

Pull requests are most welcomed and I will be happy to review. Just follow the following principles:

- Keep it simple.
- Keep it consistent with the design.
- Use as little dependency as possible.
- Have patient.

>I am not a web developer. I just created this theme for my personal needs. So, it is reasonable to have some flaws in the codes. Feel free to open issues and PR acknowledging the problems.

## Attribution

- Thanks [Anup Deb](https://dribbble.com/anupdeb) for his design guidance.
- Many of the illustrations have been taken from [iconscout](http://iconscout.com/).
