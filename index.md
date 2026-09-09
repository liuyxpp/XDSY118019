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
# Introduction to Scientific Computing (2026)

This is an introduction course to the first year undergraduates taught at Fudan University.

- Course: <span style=color:gold>Road to Scientific Research: Powerful Computer Applications</span>
- Course No.: <span style=color:gold>XDSY118019.01</span>
- Lecturers: <span style=color:gold>Prof. Yi-Xin Liu</span>
- Schedule: <span style=color:gold>18:30 - 21:05, Thursday</span>
- Classroom: <span style=color:gold>H2215</span>

---

# Week 1 (2026.09.10 Thur): Introduction
- Topics
  - Introduction to the syllabus
  - Setup VS Code, Python, and Jupyter Notebook

---

# Week 2 (2026.09.17 Thur): Python Basics Part 1
- Materials
  - Jupyter notebook [01_python_basics.ipynb](notebooks/01_python_basics.ipynb).
- Topics
  - What is programming?
  - How to learn programming
  - Why [Python](https://www.python.org/)?
  - Keyword, literals, variables, operators, control flow

---

# Week 3 (2026.09.24 Thur): Python Basics Part 2
- Materials
  - Jupyter notebook [01_python_basics.ipynb](notebooks/01_python_basics.ipynb).
- Topics
  - Data structures, function, class, module
  - Coding sessions

---

# Week 4 (2026.10.08 Thur): Scientific Computing in Python
- Materials
  - Jupyter notebook [02_python_scientific_computing.ipynb](notebooks/02_python_scientific_computing.ipynb).
- Topics
  - [Numpy](https://numpy.org/) array
  - Linear algebra in Numpy
  - [SciPy](https://scipy.org/): selected scientific computing topics
  - Coding sessions

---

# Week 5 (2026.10.15 Thur): Introduction to Deep Learning
- Materials
  - [Slides](slides/week5.html)
  <!--
  - Deep learning videos: [3Blue1Brown neural networks series](https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
  - PyTorch videos: [PyTorch beginner series](https://youtube.com/playlist?list=PL_lsbAsL_o2CTlGHgMxNrKhzP97BaG9ZN)
  -->
  - Jupyter notebook [03_python_deep_learning.ipynb](notebooks/03_python_deep_learning.ipynb)
  - Jupyter notebook [catboost_tutorial.ipynb](notebooks/catboost_tutorial.ipynb)
- Topics
  - Introduction to deep learning
  - Deep learning in Python with [PyTorch](https://pytorch.org/)
  - Coding session

---

# Week 6 (2026.10.22 Thur): Matlab and Mathematica
- Materials
  - [Slides for Matlab](slides/week6_matlab.html)
  - [Slides for Mathematica](slides/week6_mathematica.html)
- Topics
  - Introduction to [Matlab](https://www.mathworks.com/products/matlab.html)
  - Symbolic computing in [Mathematica](https://www.wolfram.com/mathematica/)

---

# Week 7 (2026.10.29 Thur): Plotting and Data Visualization
- Materials:
  - [Slides](slides/week7.html)
  - Jupyter notebook: [04_python_plotting.ipynb](notebooks/04_python_plotting.ipynb)
  - Jupyter notebook: [05_python_images.ipynb](notebooks/05_python_images.ipynb)
  <!--
  - Matlab script: [Rendering volume](scripts/visual3d_lyx.m)
  -->
- Topics:
  - `matplotlib` for line arts and 2D graphics.
  - Matlab for 3D visualization.
  - Coding session

---

# Week 8 (2026.11.05 Thur): Code and Document Management
- Materials
  - [Slides](slides/week8.html)
- Topics:
  - [git](https://git-scm.com/)
  - [github.com](https://github.com/)
  - Reference managers: [Paperpile](https://paperpile.com/?welcome) and [Zotero](https://www.zotero.org/)

---

# Week 9 (2026.11.12 Thur): Documenting Tools
- Materials
  - [Slides for Markdown, Obsidian, and Marp](slides/week9_markdown.html)
  - [Slides for LaTeX](slides/week9_latex.html)
- Topics:
  - [Markdown](https://daringfireball.net/projects/markdown/syntax)
  - Note taking with [Obsidian](https://obsidian.md/)
  - Slideshow with [Marp](https://yhatt.github.io/marp/)
  - Scientific notebooks with [Quarto](https://quarto.org/)
  - Publishing with [LaTeX](https://www.latex-project.org/)

---

# Week 10 (2025.11.19 Thur)

- Take-home project.

---

# Week 11 (2025.11.26 Thur): Final Exam

TBA

<!--
Step 1. Goto the repo [https://github.com/liuyxpp/XDSY118019-exam](https://github.com/liuyxpp/XDSY118019-exam) to see a list of problems.

Step 2. Submit your solutions and related documents as a Pull Request to the repo [https://github.com/liuyxpp/XDSY118019-exam](https://github.com/liuyxpp/XDSY118019-exam).

Final exam problems can be also found below:

- [Part 1: Project](exam/finalexam-part1.pdf)
- [Part 2: Problems](exam/finalexam-part2.pdf)

Deadline: 21:30, 2025.11.27

<span style=color:gold>**Attention**: Making a Pull Request to a GitHub repo is part of the final exam. Fail to do so will FAIL the exam!</span>