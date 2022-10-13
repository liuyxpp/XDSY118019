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
# Plotting and Data Visualization

An introduction to plotting and data visualization by [Dr. Yi-Xin Liu](http://www.yxliu.group) at Fudan University (lyx@fudan.edu.cn).

This is a part of the course: *Road to Scientific Research: Powerful Computer Applications* (XDSY118019.01).

Lecture date: 2022.10.20

---

<!-- _paginate: true -->
## Plotting in Python

`matplotlib` is the **goto** package for creating 2D graphics in Python.

We will demonstrate how to produce publication quality figures using `matplotlib` and related packages.

Please download the Jupyter notebook [04_python_plotting.ipynb](../notebooks/04_python_plotting.ipynb) and follow the demonstration.

---

## Images in Python

We will demonstrate how to render images using `matplotlib` and related packages.

Please download the Jupyter notebook [05_python_images.ipynb](../notebooks/05_python_images.ipynb) and follow the demonstration.

---

## 3D Visualization in Matlab

We will demonstrate how to visualize 3D data, including curves, surfaces, and volumes in 3D space using Matlab.

---

### Curves

Matlab function `plot3` plots a curve in 3D space.

Curve function:

$$
\begin{aligned}
    x &= e^{-0.05t} \sin t \\
    y &= e^{-0.05t} \cos t \\
    z &= t
\end{aligned}
$$

Matlab code:

```matlab
t = 0:pi/50:10*pi;
plot3(exp(-0.05*t).*sin(t), exp(-0.05*t).*cos(t), t)
xlabel('x'), ylabel('y'), zlabel('z'), grid
```

---

### Surfaces: `mesh`

Matlab function `mesh`, `surf`, and `surfl` plot $z=f(x,y)$ as a surface in 3D space.

Example:

$$ z = \frac{\sin\sqrt{x^2 + y^2}}{\sqrt{x^2 + y^2}} $$

Matlab code:

```matlab
[X,Y] = meshgrid(-8:0.5:8); 
R = sqrt(X.^2 + Y.^2) + eps;
Z = sin(R)./R;
mesh(X, Y, Z, 'EdgeColor', 'black')
```

---

### Surfaces: `surf`

Matlab code:

```matlab
surf(X, Y, Z, 'FaceColor', 'red', 'EdgeColor', 'none');
camlight left
lighting gouraud
% view(-15,65)
```

Learn more examples and documentation of surface plots [here](https://www.mathworks.com/help/matlab/surface-and-mesh-plots-1.html).

---

### Surfaces: `isosurface`

Visualize the surface defined by $f(x, y, z) - v = 0$ where $v$ can be 0 or any real number.

Example:

$$ (x^2+y^2+z^2)e^{-x^2-y^2-z^2} - 10^{-4} = 0 $$

Matlab code:

```matlab
[x,y,z] = meshgrid([-3:0.25:3]);
V = (x.^2 + y.^2 + z.^2) .* exp(-x.^2 -y.^2 -z.^2);
s = isosurface(x,y,z,V,1e-4);
p = patch(s);
isonormals(x,y,z,V,p)
view(3);
set(p,'FaceColor',[0.5 1 0.5]);  
set(p,'EdgeColor','none');
camlight;
lighting gouraud;
```

---

### Volumetric data visualization

To visualize volumetric data, we have to combine several Matlab functions together: `isosurface`, `isonormals`, `isocaps`, and `patch`.

Matlab code:

```matlab
[x,y,z] = meshgrid([-pi:0.25:pi]);
V = cos(x.*y.*z);
A = (V + 1) / 2;
B = 1.0 - A;
visual3d_lyx(A, B, A*0, [0.8, 0.55, 0.5], [0.6, 0.6, 0.6], [1,1,1]);
```

Here we use the homemade function `visual3d_lyx` to do all the visualization. The function is available as a [Matlab M file](../scripts/visual3d_lyx.m).
