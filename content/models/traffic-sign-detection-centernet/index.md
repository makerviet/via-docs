---
title: Phát hiện biển báo giao thông - CenterNet
image: centernet.png
tags: ["Traffic sign detection"]
date: 2021-05-05
description: "Mô hình phát hiện biển báo giao thông dựa trên CenterNet. CenterNet là một mạng object detection có thiết kế cực kỳ đơn giản, nhưng lại đạt được cân bằng giữa tốc độ và độ chính xác tốt vừa được ra mắt năm 2019. Chúng ta sẽ cùng huấn luyện và sử dụng mô hình này với bộ dữ liệu của VIA."
author: "Tiến - vietnamican"
---

Dự án phát hiện biển báo giao thông với CenterNet cho dự án VIA.

<a href="https://colab.research.google.com/drive/1wrohPphVh38kDZrbgtnB5Y80cj5m3cbb?usp=sharing"><img  src="https://colab.research.google.com/assets/colab-badge.svg"></a>
</p>

This project ~~classifies~~ detects traffic signs, uses CenterNet with some modify.
## Getting started
These instructions will give you a copy of the project and running on your local machine
### Prerequisites
- [conda](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)

### Installing
Please execute below commands to install essential packages.

Create a new conda environment with python3.7 initial.
```
    $ conda create --name via python=3.7
    $ conda activate via
```
Install torch and torchvision.

If you don't have gpu.
```
    (via) $ conda install pytorch==1.7.1 torchvision==0.8.2 cpuonly -c pytorch
```
Or if you have gpu.
Please visit [this](https://docs.nvidia.com/cuda/) and [this](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html) to install appropriate version of cuda and cudnn, respectively.

Then, run below command.
```
    (via) $ conda install pytorch==1.7.1 torchvision==0.8.2 -c pytorch 
```
Install other essential packages.

```
    $ conda install --file requirements.txt
```

## Dataset
Please visit this [link](https://github.com/makerhanoi/via-datasets) and follow instructions to download via-trafficsign dataset. Extract and put it in the project root directory.

### Train on your own dataset
See [this](readme/train_custom_dataset.md)
## Directory structure
```
VIA-Intelligent-CenterNet
├── assets
|     ├── result.png
|
├── models                      # source code for model
|     ├── ...
|
├── readme
|     ├── ...
|
├── samples
|     ├── ...
|
├── via-trafficsign
|     ├── images
│     |     ├── train
│     |     |     ├── 00001.jpg
|     |     |     ├── ...
|     |     |     ├── 10292.jpg
│     |     ├── val
│     |     |     ├── 00001.jpg
|     |     |     ├── ...
|     |     |     ├── 00588.jpg
|     |
|     ├── labels
|     |     ├── train   
│     |     |     ├── 00001.txt
|     |     |     ├── ...
|     |     |     ├── 10292.txt
│     |     ├── val
│     |     |     ├── 00001.txt
|     |     |     ├── ...
|     |     |     ├── 00588.txt
|     
├── .gitignore
├── config.py
├── datasets.py
├── inference.py
├── README.md
├── requirements.txt
├── train.py
├── utils.py
```
## Training
```
    $ python train.py --train-image-dir=$TRAIN_IMAGE_DIR \
                      --train-label-dir=$TRAIN_LABEL_DIR \
                      --val-image-dir=$VAL_IMAGE_DIR \
                      --val-label-dir=$VAL_LABEL_DIR
```
Example
```
    $ python train.py --train-image-dir='via-trafficsign/images/train' \
                      --train-label-dir='via-trafficsign/labels/train' \
                      --val-image-dir='via-trafficsign/images/val' \
                      --val-label-dir='via-trafficsign/labels/val'
```
## Testing
```
    $ python inference.py --val-image-dir=$VAL_IMAGE_DIR \
                          --val-label-dir=$VAL_LABEL_DIR \
                          --checkpoint=$CHECKPOINT \
                          --outdir=$OUTDIR
```
Example
```
    $ python inference.py --val-image-dir='via-trafficsign/images/val' \
                          --val-label-dir='via-trafficsign/labels/val' \
                          --checkpoint='archives/centernet_vgg.ckpt' \
                          --outdir='result'
```

## Demo
```
    $ python demo.py --image-path=$IMAGE_PATH \
                     --checkpoint=$CHECKPOINT \
                     --outpath=$OUTPATH
```
Example
```
    $ python demo.py --image-path='samples/1.jpg' \
                     --checkpoint='archives/centernet_vgg.ckpt' \
                     --outpath='result/1.jpg'
```
## Pretrained model
Backbone | Parameters | Matmuls | Pretrained
| --- | ---: | ---: | :--- |
VGG-like | 2.5M | 24.47G | [Link](https://github.com/vietnamican/VIA-Intelligent-CenterNet/releases/tag/v0.1.1)
Mobilenetv2 | 2.0M | 24.78G | N/A 

Download pretrained-models and put it in ```archives/``` directory. 

## Result
![](assets/result.png)