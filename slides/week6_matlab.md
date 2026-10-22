---
marp: true
theme: default
paginate: true
_paginate: false
style: |
    pre {
        color: #303234;
    }
    .code-examples {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .code-panel {
        min-width: 0;
    }
    .code-panel > p:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 0 0 12px;
    }
    .code-panel pre, .code-panel marp-pre {
        margin: 0;
        padding: 16px 12px;
    }
    .code-panel code {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        counter-reset: code-line;
    }
    .code-line {
        display: grid;
        grid-template-columns: 2.5ch minmax(0, 1fr);
        column-gap: 1ch;
    }
    .code-line::before {
        counter-increment: code-line;
        content: counter(code-line);
        color: #6e7781;
        text-align: right;
        user-select: none;
        border-right: 1px solid #d0d7de;
        padding-right: 0.6ch;
    }
    .code-line-text {
        min-width: 0;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
    }
    .code-copy {
        font: inherit;
        font-size: 0.65em;
        color: inherit;
        background: transparent;
        border: 1px solid currentColor;
        border-radius: 4px;
        padding: 4px 10px;
        cursor: pointer;
    }
    .code-copy:hover, .code-copy:focus-visible {
        background: #30334c;
    }
    .code-copy:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 3px;
    }
    @media print {
        .code-copy { display: none; }
    }
---

<style>
section h1 { /* Target the H1 within a slide section */
      color: Orchid !important;
      font-family: "Helvetica", "Arial", sans-serif;
      font-size: 1.4em;
      /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); Add a text shadow */
    }
section h2{
    color: Orchid !important;
    font-size: 1.3em;
}
section a {
      color: gold !important;
}
</style>

<!--
backgroundColor: #191a2e
color: deepskyblue
-->
# Week 6: Introduction to Matlab

An introduction to Matlab by [Dr. Yi-Xin Liu](http://www.yxliu.group) at Fudan University (lyx@fudan.edu.cn).

This is a part of the course: <span style=color:gold>Road to Scientific Research: Powerful Computer Applications</span> (XDSY118019.01).

Lecture date: 2026.10.22

---
<!-- _paginate: true -->
## What is Matlab?

- [What is Matlab?](https://youtu.be/joilU9m-sNk) (length: 1:37)

<video height="450" controls>
    <source src="matlab1.mp4">
</video>

---
## Installation

- Matlab is not free. But as Fudan students, we can use it for free (Fudan paid for us). Go to: https://zb.fudan.edu.cn

- Or use [Matlab Online](https://matlab.mathworks.com/): https://matlab.mathworks.com

---
## Getting started with Matlab

- [Getting Started with MATLAB](https://youtu.be/OHxR8iMHDWw) (length: 10:00)

<video height="450" controls>
    <source src="matlab2.mp4">
</video>

For more: [MATLAB for New Users](https://youtu.be/Nw7r4i6Ixio).

---
## Learn the essentials of Matlab

- [Official Tutorials](https://www.mathworks.com/tutorials)
- Take a 2-hour course at [Matlab Onramp](https://www.mathworks.com/learn/tutorials/matlab-onramp.html). (Highly recommended!)
- Take a 5-hour tutorial by Joseph Delgadillo at [The Complete MATLAB Course: Beginner to Advanced!](https://youtu.be/T_ekAD7U-wU).

---
## Command Window and Workspace

The **Command Window** runs expressions. The **Workspace** remembers variables.

<div class="code-panel">

**MATLAB**

```matlab
radius = 2;
diameter = 2 * radius;
whos  % radius and diameter are stored
```

</div>

---
## Ask MATLAB for Help

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
help linspace  % displays syntax, description, and examples
```

Use `doc linspace` when you want the full documentation page.

</div>
</div>

---
## Run Commands in Sequence

<div class="code-panel">

**MATLAB**

```matlab
x = 3;
y = x + 2;
z = y*y  % z = 25
```

</div>

---
## Assignment and Display

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
a = 3;     % semicolon suppresses display
b = 4      % b = 4
a + b      % 7
```

</div>

<div class="code-panel">

**Python**

```python
a = 3
b = 4      # no automatic display
a + b      # 7 in a notebook cell
```

</div>

</div>

---
## Scalar Power

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
base = 2;
exponent = 3;
base^exponent  % 8
```

</div>

<div class="code-panel">

**Python**

```python
base = 2
exponent = 3
base**exponent  # 8
```

</div>

</div>

---
## A Complete `if` Block

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
n = -3;
if n >= 0
    disp("nonnegative")
else
    disp("negative")  % prints negative
end
```

</div>

<div class="code-panel">

**Python**

```python
n = -3
if n >= 0:
    print("nonnegative")
else:
    print("negative")  # prints negative
```

</div>

</div>

---
## A `for` Loop Includes Its Endpoint

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
for i = 1:5
    disp(i)  % prints 1, 2, 3, 4, 5
end
```

</div>

<div class="code-panel">

**Python**

```python
for i in range(1, 6):
    print(i)  # prints 1, 2, 3, 4, 5
```

</div>

</div>

---
## Functions: Input → Output

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = 81;
y = sqrt(x);
y  % 9
```

</div>

<div class="code-panel">

**Python**

```python
import math
x = 81
y = math.sqrt(x)
y  # 9.0
```

</div>

</div>

---
## Anonymous Functions

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
f = @(x) x + 1;
result = f(5);
result  % 6
```

</div>

<div class="code-panel">

**Python**

```python
f = lambda x: x + 1
result = f(5)
result  # 6
```

</div>

</div>

---
## Exercise — Sum 1 to 100

Write a `for` loop that accumulates $1+2+\cdots+100$.

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
total = 0;
for i = 1:100
    total = total + i;
end
total  % 5050
```

</div>

<div class="code-panel">

**Python**

```python
total = 0
for i in range(1, 101):
    total = total + i
total  # 5050
```

</div>

</div>

---
## Create a Numeric Array

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
v = [1 2 3];
v       % 1-by-3 row vector
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.array([1, 2, 3])
v  # array([1, 2, 3])
```

</div>

</div>

---
## Row or Column?

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
row = [1 2 3];
column = [1; 2; 3];
[size(row); size(column)]  % [1 3; 3 1]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.array([1, 2, 3])
v.shape  # (3,): neither row nor column
```

</div>

</div>

---
## Evenly Spaced Points

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = linspace(0, 1, 6);
x  % 0  0.2  0.4  0.6  0.8  1.0
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
x = np.linspace(0, 1, 6)
x  # array([0. , 0.2, 0.4, 0.6, 0.8, 1. ])
```

</div>

</div>

---
## Indexing Starts at 1

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
v = [10 20 30];
first = v(1);
first  % 10
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.array([10, 20, 30])
first = v[0]
first  # 10
```

</div>

</div>

---
## The Last Element: `end`

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
v = [10 20 30 40];
last = v(end);
last  % 40
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.array([10, 20, 30, 40])
last = v[-1]
last  # 40
```

</div>

</div>

---
## Slices Use Inclusive Endpoints

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
v = [10 20 30 40 50];
middle = v(2:4);
middle  % 20  30  40
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.array([10, 20, 30, 40, 50])
middle = v[1:4]
middle  # array([20, 30, 40])
```

</div>

</div>

---
## Two-Dimensional Indexing

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = [1 2 3; 4 5 6];
secondRow = A(2, :)    % [4 5 6]
thirdColumn = A(:, 3)  % [3; 6]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.array([[1, 2, 3], [4, 5, 6]])
second_row = A[1, :]    # array([4, 5, 6])
third_column = A[:, 2]  # array([3, 6])
```

</div>

</div>

---
## Logical Filtering

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
v = [1 5 2 8 3];
selected = v(v > 3);
selected  % 5  8
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.array([1, 5, 2, 8, 3])
selected = v[v > 3]
selected  # array([5, 8])
```

</div>

</div>

---
## Exercise — Extract and Filter

Extract column 2, then keep values greater than 6.

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = [1 4 7 10; 2 5 8 11; 3 9 6 12];
column = A(:, 2);
selected = column(column > 6);
selected  % 9
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.array([[1,4,7,10], [2,5,8,11], [3,9,6,12]])
column = A[:, 1]
selected = column[column > 6]
selected  # array([9])
```

</div>

</div>

---
## Element-Wise Array Operations

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = [1 2 4]; y = [2 4 8];
products = x .* y  % 2  8  32
ratios = y ./ x    % 2  2  2
powers = x .^ 2    % 1  4  16
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
x = np.array([1,2,4]); y = np.array([2,4,8])
products = x * y  # [2, 8, 32]
ratios = y / x    # [2., 2., 2.]
powers = x ** 2   # [1, 4, 16]
```

</div>

</div>

---
## Matrix Multiplication

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = [1 2; 3 4];
B = [2 0; 1 2];
C = A * B;
C  % [4 4; 10 8]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.array([[1,2], [3,4]])
B = np.array([[2,0], [1,2]])
C = A @ B
C  # array([[4,4], [10,8]])
```

</div>

</div>

---
## Mathematical Functions on Arrays

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = [0 pi/2 pi];
exponential = exp(x)  % 1.0000  4.8105  23.1407
wave = sin(x)         % 0  1.0000  0 (roundoff possible)
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
x = np.array([0, np.pi/2, np.pi])
exponential = np.exp(x)  # shape (3,)
wave = np.sin(x)         # shape (3,)
```

</div>

</div>

---
## `mean` Has a Different Default

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = [1 2 3; 4 5 6];
columnMeans = mean(A)     % [2.5 3.5 4.5]
allMean = mean(A, "all")  % 3.5
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.array([[1,2,3], [4,5,6]])
all_mean = np.mean(A)
all_mean  # 3.5: mean of all elements
```

</div>

</div>

---
## Solve a Linear System

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = [1 0 -1; 4 1 1; 3 2 -5];
b = [1; 2; 3];
x = A \ b;
x  % [0.6667; -0.3333; -0.3333]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.array([[1,0,-1], [4,1,1], [3,2,-5]])
b = np.array([1,2,3])
x = np.linalg.solve(A, b)
x  # [0.6667, -0.3333, -0.3333]
```

</div>

</div>

---
## Check the Residual

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = [1 0 -1; 4 1 1; 3 2 -5];
b = [1; 2; 3];
x = A \ b;
residual = norm(A*x - b)  % near machine precision
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.array([[1,0,-1], [4,1,1], [3,2,-5]])
b = np.array([1,2,3])
x = np.linalg.solve(A, b)
residual = np.linalg.norm(A @ x - b)  # near zero
```

</div>

</div>

---
## Plot a Curve

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = linspace(0, 2*pi, 200);
y = sin(x);
plot(x, y, "LineWidth", 2)
grid on  % figure: a smooth sine curve
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0, 2*np.pi, 200)
plt.plot(x, np.sin(x))
```

</div>

</div>

---
## Label the Meaning

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = linspace(0, 2*pi, 200);
plot(x, sin(x), "LineWidth", 2)
xlabel("x"); ylabel("y");
legend("sin(x)", "Location", "best"); grid on
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0, 2*np.pi, 200)
plt.plot(x, np.sin(x))
plt.xlabel("x"); plt.legend(["sin(x)"])
```

</div>

</div>

---
## Exercise — Build a Computed Curve

On 200 points from 0 to $2\pi$, compute $y=e^{-x}\sin x$, then plot and label it.

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = linspace(0, 2*pi, 200);
y = exp(-x) .* sin(x);
plot(x,y,"LineWidth",2); xlabel("x"); ylabel("y");
legend("exp(-x) sin(x)"); grid on  % damped sine curve
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0, 2*np.pi, 200)
y = np.exp(-x) * np.sin(x)
plt.plot(x,y); plt.xlabel("x"); plt.legend(["exp(-x) sin(x)"])
```

</div>

</div>

---
## Polynomial Coefficient Order

Both forms represent $1+2x+3x^2$.

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
coefficients = [3 2 1];  % descending powers
x = 2;
p = polyval(coefficients, x);
p  % p = 17
```

</div>

<div class="code-panel">

**Python**

```python
from numpy.polynomial import Polynomial
p = Polynomial([1, 2, 3])  # ascending powers
p(2)  # 17.0
```

</div>

</div>

---
## Find a Nonlinear Root

Find a root of $x^2-e^{-x}$ in [0,1].

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
f = @(x) x.^2 - exp(-x);
endpointValues = [f(0) f(1)];  % [-1.0000 0.6321]
r = fzero(f, [0 1]);
[r, f(r)]  % approximately [0.7035 0]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
from scipy.optimize import root_scalar
f = lambda x: x**2 - np.exp(-x)
r = root_scalar(f, bracket=[0,1]).root
r, f(r)  # approximately (0.7035, 0)
```

</div>

</div>

---
## Numerical Integration

Compute $\int_0^2 x^2e^{-2x}\,dx$.

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
f = @(x) x.^2 .* exp(-2*x);
value = integral(f, 0, 2);
exact = (1 - 13*exp(-4))/4;
[value, exact]  % approximately [0.1905 0.1905]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
from scipy.integrate import quad
f = lambda x: x**2 * np.exp(-2*x)
value, error = quad(f, 0, 2)
value, error  # approximately (0.1905, 2.1e-15)
```

</div>

</div>

---
## Exit Ticket — `*` or `.*`?

Choose the operator for matrix and element-wise products.

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = [1 2; 3 4]; B = [2 0; 1 2];
u = [1 2 3]; v = [4 5 6];
A * B    % [4 4; 10 8]
u .* v   % [4 10 18]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A=np.array([[1,2],[3,4]]); B=np.array([[2,0],[1,2]])
u=np.array([1,2,3]); v=np.array([4,5,6])
A @ B   # matrix multiplication
u * v   # element-wise multiplication
```

</div>

</div>

---
## Demo

Go to:

- [Online Matlab examples](https://www.mathworks.com/help/matlab/examples.html?category=getting-started-with-matlab&s_tid=CRUX_topnav)

---
## `while`: Repeat Until False (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
i = 1;
while i < 4
    disp(i^2)  % prints 1, 4, 9
    i = i + 1;
end
```

</div>

<div class="code-panel">

**Python**

```python
i = 1
while i < 4:
    print(i**2)  # prints 1, 4, 9
    i = i + 1
```

</div>

</div>

---
## `zeros`: Allocate a Shape (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = zeros(2, 3);
A  % 2-by-3 array filled with 0
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.zeros((2, 3))
A  # shape (2, 3), filled with 0
```

</div>

</div>

---
## `ones`: Constant Starting Values (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
A = ones(2, 3);
A  % 2-by-3 array filled with 1
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
A = np.ones((2, 3))
A  # shape (2, 3), filled with 1
```

</div>

</div>

---
## `eye`: Identity Matrix (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
I = eye(3);
A = [1 2 3; 4 5 6; 7 8 9];
A * I  % unchanged: [1 2 3; 4 5 6; 7 8 9]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
I = np.eye(3)
A = np.array([[1,2,3], [4,5,6], [7,8,9]])
A @ I  # unchanged, displayed as floats
```

</div>

</div>

---
## `reshape`: Column-Major Order (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
v = 1:6;
A = reshape(v, 2, 3);
A  % [1 3 5; 2 4 6]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.arange(1, 7)
A = np.reshape(v, (2, 3))
A  # [[1,2,3], [4,5,6]]: row-major default
```

</div>

</div>

---
## Transpose: `.'` versus `'` (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
z = [1+2i 3-4i];
plainTranspose = z.'      % [1+2i; 3-4i]
conjugateTranspose = z'   % [1-2i; 3+4i]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
z = np.array([[1+2j, 3-4j]])
z.T  # [[1+2j], [3-4j]]
```

</div>

</div>

---
## Standard Deviation Defaults (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
v = [1 2 3];
sampleStd = std(v)       % 1.0000
populationStd = std(v,1) % 0.8165
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
v = np.array([1, 2, 3])
np.std(v)  # 0.8165: population normalization
```

</div>

</div>

---
## Polynomial Roots (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
coefficients = [1 -3 2];
r = roots(coefficients);
r  % [2; 1]
```

</div>

<div class="code-panel">

**Python**

```python
from numpy.polynomial import Polynomial
p = Polynomial([2, -3, 1])
p.roots()  # array([1., 2.])
```

</div>

</div>

---
## Linear Interpolation (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = [0 1 2 3];
y = [0 1 4 9];
xq = 1.5;
yq = interp1(x, y, xq, "linear");
[xq, yq]  % [1.5 2.5]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
from scipy.interpolate import interp1d
x=np.array([0,1,2,3]); y=np.array([0,1,4,9])
f = interp1d(x, y, "linear")
f(1.5)  # 2.5
```

</div>

</div>

---
## Bounded Scalar Optimization (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
f = @(x) exp(-x.^2) .* cos(2*x);
[xmin, fmin] = fminbnd(f, 0, 2);
[xmin, fmin]  % approximately [1.1445 -0.1776]
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
from scipy.optimize import minimize_scalar
f = lambda x: np.exp(-x**2) * np.cos(2*x)
res = minimize_scalar(f, bracket=[0,2])  # search seeds, not bounds
res.x, f(res.x)  # approximately (1.1445, -0.1776)
```

</div>

</div>

---
## Linear Fit Coefficients (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
x = [0 1 2 3];
y = [1 3 5 7];
coefficients = polyfit(x, y, 1);
coefficients  % [2 1]: slope, intercept
```

</div>

<div class="code-panel">

**Python**

```python
from scipy.stats import linregress
x=[0,1,2,3]; y=[1,3,5,7]
fit = linregress(x, y)
fit.slope, fit.intercept  # (2.0, 1.0)
```

</div>

</div>

---
## `ode45`: Time Down Rows (Optional)

<div class="code-examples">

<div class="code-panel">

**MATLAB**

```matlab
k = 1; r = 0.2; u0 = 0.8;
rhs = @(t,u) k*u - r*u.^2;
[t,u] = ode45(rhs, [0 8], u0);
size(t), size(u)  % both N-by-1: time down rows
```

</div>

<div class="code-panel">

**Python**

```python
import numpy as np
from scipy.integrate import solve_ivp
k=1; r=0.2; u0=0.8
rhs = lambda t,u: k*u-r*u**2
sol = solve_ivp(rhs, [0,8], [u0], dense_output=True)
t = np.linspace(0,8,50); u = sol.sol(t)
t.shape, u.shape  # (50,), (1,50): states down rows
```

</div>

</div>

---
## Save Tested Commands as a `.m` Script (Optional)

After commands work, copy them into a script and save, for example, as `damped_sine.m`.

<div class="code-panel">

**MATLAB**

```matlab
x = linspace(0, 2*pi, 200);
y = exp(-x) .* sin(x);
plot(x, y, "LineWidth", 2)
xlabel("x"); ylabel("y"); grid on
```

</div>

<script src="matlab-code.js"></script>
