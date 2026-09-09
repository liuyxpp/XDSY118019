---
marp: true
theme: default
style: |
    pre {
        color: #303234;
    }
---

<style>
section h1 { /* Target the H1 within a slide section */
      color: Orchid !important;
      font-family: "Helvetica", "Arial", sans-serif;
      font-size: 1.4em;
      /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); Add a text shadow */
    }
section {
    font-size: 26pt;
}
section a {
      color: orchid !important;
}
</style>

<!--
backgroundColor: #191a2e
color: deepskyblue
-->
# Week 9: Documenting Tools - Markdown

An introduction to Markdown and related software

[Dr. Yi-Xin Liu](http://www.yxliu.group) at Fudan University (lyx@fudan.edu.cn).

This is a part of the course: <span style="color:gold">Road to Scientific Research: Powerful Computer Applications</span> (XDSY118019.01).

Lecture date: 2025.11.13

---

<!-- _paginate: true -->
# What is Markdown?

[Markdown](https://daringfireball.net/projects/markdown/) is a **lightweight markup language** for creating formatted text using a **plain-text** editor.

- John Gruber and Aaron Swartz created Markdown in <span style="color:gold">2004</span> as a markup language that is **appealing to human readers in its source code form**.
- Its key design goal was <span style="color:gold">readability</span>, that the language be readable as-is, without looking like it has been marked up with tags or formatting instructions, unlike text formatted with ‘heavier’ markup languages, such as Rich Text Format (RTF), HTML, and XML.
- Markdown file often ends with extension <span style="color:gold">`.md`</span>.

---

# What is it used for?

* README files and software documentation (Github, etc.)
* Programming notebook systems (Jupyter notebook, etc.)
* Forum & blog posts (Discourse, Zhihu, etc.)
* Static site generators (Jekyll, etc.)
* Note taking software (Obsidian, etc.)
* Slideshow (Marp, etc.)

---

# Things you can format
* Headings
* Lists: unordered, ordered, nested
* Emphasis: italic, bold, strikethrough
* Links
* Images
* Blockquote
* Horizontal rules
* Footnote
* Blocks of code*, Blocks of math expressions*, Task lists*, Table*

*: GFM and other Markdown variants

---

# Demo and exercises of Markdown

- [有道云笔记Markdown指南](https://note.youdao.com/help-center/advance_markdown.html)
- Go to VS Code and follow demonstration there.

---

# What is Obsidian?

> <span style=color:gold>A second brain for you, forever.<span>

[Obsidian](https://obsidian.md/) a powerful **knowledge base** on top of
a <span style="color:gold">local folder</span> of plain text Markdown files. It is a note taking software. And it is completely <span style="color:gold">FREE</span>!

Features of Obsidian:

* **Everything is connected:** backlinks, outgoing links, graph view
* **Extensively extensible:** plugins, themes, and custom CSS.
* **Notes for your grandchildren:** future-proof format, total control, always available.

---

# Getting started with Obsidian

- [Use Obsidian (BEST Markdown editor) for note taking and tech docs!](https://youtu.be/cBzc5r-FNW0) (17:55)

<video height="400" controls>
    <source src="obsidian.mp4">
</video>

---

# Demo and exercises of Obsidian

- Go to [Obsidian official website](https://obsidian.md/) and install Obsidian to your computer.
- Follow the demonstration.

---

# What is Marp?

[Marp](https://marp.app/) (also known as the Markdown Presentation Ecosystem) provides an intuitive experience for creating beautiful slide decks. You only have to focus on writing your story in a Markdown document.

<span style=color:gold>All slides in this course are made using Marp!</span>

---

# Features of Marp

* Based on CommonMark
* Built-in themes and CSS theming
* Directives and extended syntax
* Export to HTML, PDF, and PowerPoint
* Full open-source and FREE.

---

# Demo and exercises of Marp

- Install the Marp extension for VS Code.
- Follow the demonstration.