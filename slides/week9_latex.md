---
marp: true
theme: default
style: |
    pre {
        color: #303234;
    }
---

<!--
backgroundColor: #191a2e
color: skyblue
-->
# Documenting Tools: LaTeX & Typst

An introduction to LaTeX by [Dr. Yi-Xin Liu](http://www.yxliu.group) at Fudan University (lyx@fudan.edu.cn).

This is a part of the course: *Road to Scientific Research: Powerful Computer Applications* (XDSY118019.01).

Lecture date: 2024.11.07

---

<!-- _paginate: true -->
## What is LaTeX?

[LaTeX](https://www.latex-project.org/), which is pronounced /Lah-tech/ or /Lay-tech/, is a high-quality typesetting system; it includes features designed for the production of technical and scientific documentation.

- LaTeX is the <span style=color:gold>de facto standard</span> for the communication and publication of scientific documents.
- LaTeX is available as <span style=color:gold>free software</span>.
- LaTeX file ends with extension `.tex`.

---

### LaTeX Features

- Typesetting journal articles, technical reports, books, and slide presentations.
- Control over large documents containing sectioning, cross-references, tables and figures.
- Typesetting of <span style=color:gold>complex mathematical formulas</span>.
- Advanced typesetting of mathematics with AMS-LaTeX.
- Automatic generation of <span style=color:gold>bibliographies</span> and indexes.
- Multi-lingual typesetting.
- Inclusion of artwork, and process or spot color.
- Using PostScript or Metafont fonts.

---

### Getting started with LaTeX

- [Intro to LaTeX : Learn to write beautiful math equations](https://youtu.be/Jp0lPj2-DQA) (19:08)

<video height="500" controls>
    <source src="latex.mp4">
</video>

Other videos in [this Youtube playlist](https://youtube.com/playlist?list=PLHXZ9OQGMqxcWWkx2DMnQmj5os2X5ZR73) for LaTeX tutorials are highly recommended.

---

### Demo and exercises of LaTeX

- Go to [Overleaf](https://www.overleaf.com/) and create an account.
- Follow the demonstration:
  - Document structure
  - Math expressions: [short math guide](http://tug.ctan.org/info/short-math-guide/short-math-guide.pdf)
  - Citations

In fact, LaTeX can be edited in any editors. You can use VS Code + LaTeX extensions to do the job. Do not forget to install a suitable [LaTeX distribution](https://www.latex-project.org/get/#tex-distributions) for your OS though.

---

## Typst

[Typst](https://typst.app/) is a new markup-based typesetting system for the <span style=color:gold>sciences</span>. It is designed to be an alternative both to advanced tools like LaTeX and simpler tools like Word and Google Docs. The goal of Typst is to build a typesetting tool that is highly capable and a pleasure to use.

<video height="500" controls>
    <source src="typst.webm">
</video>

---

### Why Typst?

As compared to LaTeX, it

- is easy to learn and use.
- previews your changes instantly.
- provides clear, understandable error messages.
- has a consistent styling system for configuring everything from fonts and margins to the look of headings and lists.
- uses familiar programming constructs instead of hard-to-understand macros.
- has a very small executable size.
- is free and open source.

---

### Getting started with Typst

- [Tutorial](https://typst.app/docs/tutorial/)

Inline math equations:

```typst
$lim_(x->oo) 1/x = 0$
```

Block math equations:

```typst
$ lim_(x->oo) 1/x = 0 $
```

---

### Demo and exercises of Typst

- Install VS Code extension: `Tinymist Typst`.
- Or go to the webapp (sign up required): [https://typst.app/](https://typst.app/).