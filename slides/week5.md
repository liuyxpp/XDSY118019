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
# Week 5: Introduction to Deep Learning in Python

An introduction to deep learning in Python by [Dr. Yi-Xin Liu](http://www.yxliu.group) at Fudan University (lyx@fudan.edu.cn).

This is a part of the course: *Road to Scientific Research: Powerful Computer Applications* (XDSY118019.01).

Lecture date: 2024.10.10

---

<!-- _paginate: true -->
## Introduction to Deep Learning

- [Deep Learning In 5 Minutes | What Is Deep Learning? | Deep Learning Explained Simply | Simplilearn](https://youtu.be/6M5VXKLf4D4) (length: 5:51)

<video height="500" controls>
    <source src="deeplearning.mp4">
</video>

---

## Fundamentals of Deep Learning

- [3Blue1Brown - But what is a neural network? | Chapter 1, Deep learning](https://youtu.be/aircAruvnKk) (length: 19:13)

<video height="500" controls>
    <source src="3b1b01.mp4">
</video>

---

## Fundamentals of Deep Learning

- [3Blue1Brown - Gradient descent, how neural networks learn | Chapter 2, Deep learning](https://youtu.be/IHZwWFHWa-w) (length: 21:00)

<video height="500" controls>
    <source src="3b1b02.mp4">
</video>

---

## Fundamentals of Deep Learning

- [3Blue1Brown - What is backpropagation really doing? | Chapter 3, Deep learning](https://youtu.be/Ilg3gGewQ5U) (length: 13:54)

<video height="500" controls>
    <source src="3b1b03.mp4">
</video>

---

## Fundamentals of Deep Learning

- [3Blue1Brown - Backpropagation calculus | Chapter 4, Deep learning](https://youtu.be/tIeHLnjs5U8) (length: 10:17)

<video height="500" controls>
    <source src="3b1b04.mp4">
</video>

---

## Deep Learning Experiments

Do the following experiments in [A neural network playgound](http://playground.tensorflow.org/) (http://playground.tensorflow.org/):

- Choose `Gaussian` data, use `linear` activation function to train.
- Choose `Circle` data, use `linear` activation function to train. Does it succeed? How to obtain a successful training?
- (Optional) Choose `Spiral` data, find a successful classification neural network model.

---

## Deep Learning with Pytorch

### Why PyTorch?

PyTorch is currently the most popular deep learning framework not only in Python but all programming languages.

- See the overall trend for PyTorch and other competitors (TensorFlow, JAX, MxNet, Caffe2, MindSpore, etc.) [here](https://paperswithcode.com/trends).
- Watch the video for the current state of machine learning frameworks [here](https://youtu.be/XGtiCBz2gIg?si=Inth6FVkUQlooN4c).

---

## Introduction to PyTorch

- [Introduction to PyTorch](https://youtu.be/IC0_FRiX-sw) (length: 23:22)


<video height="500" controls>
    <source src="pytorch.mp4">
</video>

---

## Additional Resources for PyTorch

- [PyTorch Beginner Series](https://youtube.com/playlist?list=PL_lsbAsL_o2CTlGHgMxNrKhzP97BaG9ZN)
- [Youtube: Learn PyTorch for deep learning in a day. Literally.](https://youtu.be/Z_ikDlimN6A)
- [Online Course: Learn PyTorch for Deep Learning: Zero to Mastery](https://www.learnpytorch.io/)

---

## A Simple Walkthrough

Go to [03_python_deep_learning.ipynb](../notebooks/03_python_deep_learning.ipynb).

---

## Popular Resources for Deep Learning

- [scikit-learn](https://scikit-learn.org/stable/): Machine learning in Python
- Gradient Boost: [XGBoost](https://xgboost.ai/), [LightGBM](https://lightgbm.readthedocs.io/en/latest/), [CatBoost](https://catboost.ai/)
- [Kaggle](https://www.kaggle.com/): Largest AI & ML community, competitions, datasets, notebooks, etc.
- [Hugging Face](https://huggingface.co/): AI community for ML models and datasets
- [Ollama](https://ollama.com/): open-source machine learning models
- [ChatGPT](https://chatgpt.com/): AI-powered chatbot by OpenAI
