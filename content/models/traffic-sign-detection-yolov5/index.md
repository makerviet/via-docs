---
title: Phát hiện biển báo giao thông - YOLOv5
image: traffic-sign-detection.png
tags: ["Traffic sign detection"]
date: 2021-05-05
description: "Mô hình phát hiện biển báo giao thông dựa trên YOLOv5 - một trong những kiến trúc phát hiện vật thời gian thực phổ biến nhất trên hiện nay. Mô hình này phù hợp để phát triển các bài toán phát hiện biển báo, vật cản trên đường với tốc độ cao."
author: "Hùng Phi"
---

This repo train YOLOv5 on the [dataset](https://github.com/makerhanoi/via-datasets) of trafficsigns, including 11095 images, 6 classes from Goodgame and ICT teams - FPT Digital Race.


## Requirements

Python 3.8 or later with all [requirements.txt](https://github.com/ultralytics/yolov5/blob/master/requirements.txt) dependencies installed, including `torch>=1.7`. To install run:
```bash
$ pip install -r requirements.txt
```


## Tutorials

* Trainning by [google colab](https://github.com/PhiDCH/yolov5/blob/master/tutorial.ipynb)&nbsp; 🚀 RECOMMENDED
  
## Data preparation

```bash
$ wget https://github.com/makerhanoi/via-datasets/releases/download/v1.0/via-trafficsign-20210321.zip
$ unzip via-trafficsign-20210321.zip
```
<img width="800" src="https://github.com/PhiDCH/yolov5/blob/master/data/images/labels.jpg">

## Training

```bash
$ python train.py --img 224 --batch 16 --epochs 30 --data via-trafficsign.yaml\
 --weights yolov5s.pt --hyp hyp.yaml
```
<img width="800" src="https://github.com/PhiDCH/yolov5/blob/master/data/images/results.png">


## Pretrained model 

- [x] The pretrained YOLOv5s on [drive](https://drive.google.com/file/d/1-hBgOzUeB0QLS2KIhiLWBwFoj5CwLuzh/view?usp=sharing).
