---
title: "Phát hiện vạch kẻ đường - PiNet"
description: "Phát hiện vạch kẻ đường là bài toán rất quan trọng khi xây dựng xe tự hành. Mô hình phát hiện vạch kẻ đường dựa trên PiNet cho tốc độ cao và độ chính xác tương đối tốt cho các ứng dụng xe tự hành của VIA."
image: pinet.png
tags: ["Lane line"]
date: 2021-05-05
author: "Huỳnh Đức"
authorUrl: "https://github.com/ducnguyenhuynh/"
sourceCodeUrl: "https://github.com/ducnguyenhuynh/via-line-detection"
notebookUrl: "https://colab.research.google.com/drive/1Bn-9WOgkQuYMX0fIYu5ChkAQPQyHqhEo"
accuracy: "0.xx mAP"
fps: "xx FPS on NVIDIA RTX 2070"
version: "1.0"
---


## I. Thông tin mô hình

### 1. Giới thiệu

Phát hiện vạch kẻ đường là bài toán rất quan trọng khi xây dựng xe tự hành. Có nhiều cách để máy tính có thể phát hiện làn đường từ một tấm hình. Cách cơ bản nhất ta có thể sử dụng các thuật toán xử lý ảnh để phát hiện vạch kẻ đường thông qua màu sắc hay các thuật toán phát hiện cạnh như Canny. Cao siêu hơn ta có thể sử dụng các mô hình máy học để phân đoạn hay phát hiện vạch kẻ. Mô hình được giới thiệu ở đây được xây dựng dựa trên kiến trúc **PiNet**.

**Input:** Hình ảnh RGB có kích thước 512x256.

**Output:** Tập tọa độ các điểm (pixel) trên line đường.

Mô hình dựa trên key points estimation và instance segmentation approach. PINet bao gồm một vài hourglass networks được xếp chồng lên nhau và được train đồng thời, vì vậy kích thước của mô hình có thể được thay đổi dựa trên sức mạnh tính toán phần cứng.

![Mô hình mạng PINet](pinet.png)

**Paper:** [Key Points Estimation and Point Instance Segmentation Approach for Lane Detection Edit social preview. Yeongmin Ko • Younkwan Lee • Shoaib Azam • Farzeen Munir • Moongu Jeon • Witold Pedrycz](https://arxiv.org/abs/2002.06604).

### 2. Kết quả

**Demo:** 

![Phát hiện vạch kẻ đường với PINet](https://github.com/ducnguyenhuynh/via-line-detection/raw/main/images/result_demo.gif)

**Độ đo:** Dựa trên độ chính xác của các pixel trên ground truth

**Bộ dữ liệu kiểm tra:** Do tập dữ liệu còn hạn chế nên mô hình sẽ được đánh giá dựa trên tập validation

**Độ chính xác và Tốc độ:** Accuracy trên tập val là 0.99. FPS đạt 35-40 (Phần cứng I5-9300H, GeForce GTX 1050) 

### 3. Hạn chế và hướng cải tiến

**Hạn chế:**

<!-- - Hạn chế của mô hình là gì ? Mất cân bằng dữ liệu? Tốc độ thấp? Độ chính xác chưa cao? -->
- Updating

**Hướng cải tiến:**
- Convert sang TensorRT để deploy trên các jetson
- Test mô hình trên CPU
- Ứng dụng của mô hình: Autopilot

## II. Chạy thử và tích hợp mô hình

### 1. Chạy mô hình đã huấn luyện trên ảnh

```
```

**Kết quả:**

TODO

### 2. Chạy mô hình đã huấn luyện trên video

```
```

**Kết quả:**

TODO

### 3. Tích hợp lên hệ thống VIA SDK

```
```

**Kết quả:**

TODO


## II. Huấn luyện mô hình

Hướng dẫn sau sẽ hướng dẫn các bạn chuẩn bị dữ liệu, và huấn luyện mô hình PINet cho phát hiện vạch kẻ đường. Các bạn cũng có thể chỉnh sửa mã nguồn và thay đổi bộ dữ liệu sử dụng để sử dụng mô hình này cho các mục đích khác nhau.

### 1. Thông tin dữ liệu

Chuẩn bị dữ liệu và một việc quan trọng và chiếm khá nhiều thời gian trong xây dựng một hệ thống học máy.

- Bộ dữ liệu được lấy ở đâu?
- Phân chia ra sao? (train/val/test)
- Các đặc điểm bộ dữ liệu này.
### 2. Tải mã nguồn

TODO: Thêm một số hướng dẫn

```python
!git clone https://github.com/ducnguyenhuynh/via-line-detection.git
```

    Cloning into 'via-line-detection'...
    remote: Enumerating objects: 902, done.[K
    remote: Counting objects: 100% (902/902), done.[K
    remote: Compressing objects: 100% (869/869), done.[K
    remote: Total 902 (delta 57), reused 869 (delta 27), pack-reused 0[K
    Receiving objects: 100% (902/902), 47.80 MiB | 42.08 MiB/s, done.
    Resolving deltas: 100% (57/57), done.


### 3. Tải và phân chia dữ liệu

TODO: Thêm một số hướng dẫn

```python
cd via-line-detection/
```

```python
!wget https://github.com/ducnguyenhuynh/via-line-detection/releases/download/v1.1/via-dataset-line-dectection.zip -O ./dataset.zip
!unzip dataset.zip
!mv via-data-line-detection/ dataset
!rm dataset.zip
!pip install -r requirements.txt
```

### 4 Huấn luyện mô hình PINet

TODO: Thêm một số lưu ý, giải thích tại sao cần làm như vậy. Việc huấn luyện mô hình nên đơn giản, chạy ít file, sử dụng các file cấu hình .py hoặc .json để nạp cấu hình huấn luyện.


```python
cd src
```

    /content/via-line-detection/src

Cấu hình các hyperparameters trong quá trình train tại file parameters.py

```python
%%writefile parameters.py
#############################################################################################################
##
##  Parameters
##
#############################################################################################################
import numpy as np
import cv2

class Parameters():
    # thay đổi số lượng epoch ở đây
    n_epoch = 30
    l_rate = 0.0001
    weight_decay=1e-5
    save_path = "savefile/"
    # train from scratch.
    model_path = "savefile/"
    batch_size = 8
    x_size = 512
    y_size = 256
    resize_ratio = 8
    grid_x = x_size//resize_ratio  #64
    grid_y = y_size//resize_ratio  #32
    feature_size = 4
    regression_size = 110
    mode = 2
    threshold_point = 0.75 #0.35 #0.5 #0.57 #0.64 #0.35
    threshold_instance = 0.1

    #loss function parameter
    K1 = 1.0                     #  ####################################
    K2 = 2.0
    constant_offset = 0.2
    constant_exist = 1.0 #2.0#1.0    #8
    constant_nonexist = 1.0#3.0
    constant_angle = 1.0
    constant_similarity = 1.0
    constant_attention = 0.1
    constant_alpha = 0.5 #in SGPN paper, they increase this factor by 2 every 5 epochs
    constant_beta = 0.5
    constant_l = 1.0
    constant_lane_loss = 1.0  #10  ######################################
    constant_instance_loss = 1.0

    #data loader parameter
    flip_ratio=0.6
    translation_ratio=0.6
    rotate_ratio=0.6
    noise_ratio=0.6
    intensity_ratio=0.6
    shadow_ratio=0.6
    scaling_ratio=0.2
    flip_indices=[(0,34),(1,35),(2,36),(3,37),(4,38),(5,39),(6,40),(7,41),(8,42),(9,43),(10,44),(11,45),(12,46),(13,47),(14,48),(15,49),(16,50),(17,51)
                    ,(18,52),(19,53),(20,54),(21,55),(22,56),(23,57),(24,58),(25,59),(26,60),(27,61),(28,62),(29,63),(30,64),(31,65)
                    ,(32,66),(33,67),(68,68),(69,69),(70,72),(71,73)]
    
    train_root_url="../dataset/train/"
    train_labels_root="../dataset/train/"

    test_root_url="../dataset/val/"
    test_labels_root="../dataset/val/"
    
    # test parameter
    color = [(0,0,0), (255,0,0), (0,255,0),(0,0,255),(255,255,0),(255,0,255),(0,255,255),(255,255,255),(100,255,0),(100,0,255),(255,100,0),(0,100,255),(255,0,100),(0,255,100)]
    grid_location = np.zeros((grid_y, grid_x, 2))
    for y in range(grid_y):
        for x in range(grid_x):
            grid_location[y][x][0] = x
            grid_location[y][x][1] = y
    num_iter = 30
    threshold_RANSAC = 0.1
    ratio_inliers = 0.1

    # expand

    point_in_lane = 0
    source_points = np.float32([
    [0, y_size],
    [0, (5/9)*y_size],
    [x_size, (5/9)*y_size],
    [x_size, y_size]
    ])
    
    destination_points = np.float32([
    [0 * x_size, y_size],
    [0 * x_size, 0],
    [x_size - (0 * x), 0],
    [x_size - (0 * x), y_size]
    ])
    
    perspective_transform = cv2.getPerspectiveTransform(source_points, destination_points)
    inverse_perspective_transform = cv2.getPerspectiveTransform( destination_points, source_points)
```

    Overwriting parameters.py



Giờ thì train thôi :))))

```python
!python train.py
```

    Training
    Initializing hyper parameter
    Get dataset
    1423
    Get agent
    model parameters: 
    4056849
    Setup GPU mode
    Training loop
    epoch : 0
    step : 0
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0943, device='cuda:0')
    different instance loss:  tensor(0.0218, device='cuda:0')
    point loss
    exist loss:  tensor(0.3546, device='cuda:0')
    non-exit loss:  tensor(0.0907, device='cuda:0')
    offset loss:  tensor(0.1419, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.5981, device='cuda:0')
    epoch : 0
    step : 1
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0061, device='cuda:0')
    different instance loss:  tensor(3.4911e-06, device='cuda:0')
    point loss
    exist loss:  tensor(0.0507, device='cuda:0')
    non-exit loss:  tensor(0.0819, device='cuda:0')
    offset loss:  tensor(0.0770, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.2172, device='cuda:0')
    epoch : 0
    step : 2
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0475, device='cuda:0')
    different instance loss:  tensor(0.0068, device='cuda:0')
    point loss
    exist loss:  tensor(0.2414, device='cuda:0')
    non-exit loss:  tensor(0.0695, device='cuda:0')
    offset loss:  tensor(0.1065, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.4255, device='cuda:0')
    epoch : 0
    step : 3
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0038, device='cuda:0')
    different instance loss:  tensor(0.0040, device='cuda:0')
    point loss
    exist loss:  tensor(0.0745, device='cuda:0')
    non-exit loss:  tensor(0.0716, device='cuda:0')
    offset loss:  tensor(0.0846, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.2313, device='cuda:0')
    epoch : 0
    step : 4
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0685, device='cuda:0')
    different instance loss:  tensor(0.0691, device='cuda:0')
    point loss
    exist loss:  tensor(0.4021, device='cuda:0')
    non-exit loss:  tensor(0.0708, device='cuda:0')
    offset loss:  tensor(0.1418, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.6355, device='cuda:0')
    epoch : 0
    step : 5
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0483, device='cuda:0')
    different instance loss:  tensor(0.0267, device='cuda:0')
    point loss
    exist loss:  tensor(0.1934, device='cuda:0')
    non-exit loss:  tensor(0.0707, device='cuda:0')
    offset loss:  tensor(0.1102, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.3866, device='cuda:0')
    epoch : 0
    step : 6
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0211, device='cuda:0')
    different instance loss:  tensor(0.0054, device='cuda:0')
    point loss
    exist loss:  tensor(0.1774, device='cuda:0')
    non-exit loss:  tensor(0.0628, device='cuda:0')
    offset loss:  tensor(0.1049, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.3374, device='cuda:0')
    epoch : 0
    step : 7
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0165, device='cuda:0')
    different instance loss:  tensor(0.0045, device='cuda:0')
    point loss
    exist loss:  tensor(0.1225, device='cuda:0')
    non-exit loss:  tensor(0.0599, device='cuda:0')
    offset loss:  tensor(0.0911, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.2740, device='cuda:0')
    epoch : 0
    step : 8
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0289, device='cuda:0')
    different instance loss:  tensor(0.0136, device='cuda:0')
    point loss
    exist loss:  tensor(0.1794, device='cuda:0')
    non-exit loss:  tensor(0.0724, device='cuda:0')
    offset loss:  tensor(0.1030, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.3552, device='cuda:0')
    epoch : 0
    step : 9
    ######################################################################
    seg loss
    same instance loss:  tensor(0.0225, device='cuda:0')
    different instance loss:  tensor(0.0077, device='cuda:0')
    point loss
    exist loss:  tensor(0.1470, device='cuda:0')
    non-exit loss:  tensor(0.0466, device='cuda:0')
    offset loss:  tensor(0.0960, device='cuda:0')
    attention loss
    attention loss:  0
    --------------------------------------------------------------------
    total loss:  tensor(0.2884, device='cuda:0')
    epoch : 0
    step : 10
    ######################################################################

### 5 Đánh giá

``` python
!python test.py
```
    1423
    model parameters: 
    4056849
    7% 1/15 [00:00<00:02,  6.87it/s]
    31it [00:04,  7.33it/s]
``` python
!python evaluation.py
```
    [{"name":"Accuracy","value":0.9974696356275303,"order":"desc"},{"name":"FP","value":0.42309620204357173,"order":"asc"},{"name":"FN","value":0.0,"order":"asc"}]

Accuracy đạt 0,99 với trên tập val

### 6 Chạy Demo

Thay đổi một số đường dẫn trong các file py:
- util_hourglass.py: uncomment line 9, comment line 8
- hourglass_network.py: uncomment line 9, comment line 8
- processing_image.py: uncomment line 4, comment line 5
- util.py: uncomment line 10, comment line 9

Demo trên ảnh 
``` python
!python demo_line_detection.py -o image -d "images_test/2lines-00001086.jpg"
```
Demo trên video

    Tải video
``` python
!mkdir video
!wget https://github.com/ducnguyenhuynh/via-line-detection/releases/download/v1.0/demo.avi -O video/demo.avi
```
    --2021-04-19 14:40:52--  https://github.com/ducnguyenhuynh/via-line-detection/releases/download/v1.0/demo.avi
    Resolving github.com (github.com)... 192.30.255.112
    Connecting to github.com (github.com)|192.30.255.112|:443... connected.
    HTTP request sent, awaiting response... 302 Found
    Location: https://github-releases.githubusercontent.com/354692123/ae188000-a157-11eb-8cb8-460239f853a9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20210419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210419T144052Z&X-Amz-Expires=300&X-Amz-Signature=9eaec88e116e1c0886a6949db168f1ec76d2495d55a227ca6a383fbbf5b95c8e&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=354692123&response-content-disposition=attachment%3B%20filename%3Ddemo.avi&response-content-type=application%2Foctet-stream [following]
    --2021-04-19 14:40:52--  https://github-releases.githubusercontent.com/354692123/ae188000-a157-11eb-8cb8-460239f853a9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20210419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210419T144052Z&X-Amz-Expires=300&X-Amz-Signature=9eaec88e116e1c0886a6949db168f1ec76d2495d55a227ca6a383fbbf5b95c8e&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=354692123&response-content-disposition=attachment%3B%20filename%3Ddemo.avi&response-content-type=application%2Foctet-stream
    Resolving github-releases.githubusercontent.com (github-releases.githubusercontent.com)... 185.199.110.154, 185.199.109.154, 185.199.111.154, ...
    Connecting to github-releases.githubusercontent.com (github-releases.githubusercontent.com)|185.199.110.154|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 39065134 (37M) [application/octet-stream]
    Saving to: ‘video/demo.avi’

    video/demo.avi      100%[===================>]  37.25M  51.5MB/s    in 0.7s    

    2021-04-19 14:40:53 (51.5 MB/s) - ‘video/demo.avi’ saved [39065134/39065134]

``` python 
!python demo_line_detection.py -o video -d "video/demo.avi" -s 1
```

TODO: Sau khi huần luyện, tải mô hình về ra sao?
