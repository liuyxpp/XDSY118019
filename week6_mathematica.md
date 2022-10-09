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
# Symbolic Computing in Mathematica

An introduction to Mathematica by [Dr. Yi-Xin Liu](http://www.yxliu.group) at Fudan University (lyx@fudan.edu.cn).

This is a part of the course: *Road to Scientific Research: Powerful Computer Applications* (XDSY118019.01).

Lecture date: 2022.10.13

---

<!-- _paginate: true -->
## What is Mathematica?

- [Stephen Wolfram's Introduction to the Wolfram Language](https://youtu.be/_P9HqHVPeik) (12:55)

<video height="500" controls>
    <source src="mathematica_introduction.mp4">
</video>

---

## Introduction to Wolfram Notebooks

- [Introduction to Wolfram Notebooks](https://youtu.be/9Tc_FQbDYA4) (7:49)

<video height="500" controls>
    <source src="mathematica_notebook.mp4">
</video>
 
---

## Get Started with Mathematica

- [Hands-on Start to Mathematica](https://youtu.be/HwX34l9E8Ts) (35:04)

<video height="500" controls>
    <source src="mathematica_start.mp4">
</video>

---

## Demo and Exercises

Go to [Wolfram Cloud](https://www.wolframcloud.com), and solve the following problems:

1. Given $(x + y + z)^{20}$, find the coefficient of the term $x^4y^{13}z^3$.
   1. Method 1: expand the expression and eyeball the coefficient.
   2. Method 2: google a clever way, use searching keywords such as _mathematica find the coefficient of a term from expansion_.
2. Solve $3x^3 - 2x + 1 = 0$.
3. $\int \frac{1}{a + bx^3} dx$ for real $a$ and $b$.
4. Integrate $\int_0^{\infty} t^{z-1}e^{-t} dt$ for $z=0, \frac{1}{2}, 1, \frac{3}{2}, 2$.
5. Integrate $\int_{y=0}^1\int_{x=0}^1\frac{1}{1+xy} dx dy$.
6. Evaluate $\sum_{n=1}^{\infty} \frac{1}{n^4}$.
