---

title: Phân đoạn vạch kẻ đường - UNet
image: demo.png
tags: ["Lane line"]
date: 2021-05-05
author: "Đỗ Viết Chính"
---

Mô hình phân đoạn vạch kẻ đường ứng dụng mô hình khá phổ biến là U-Net và một phiên bản cải tiến Double U-Net.

![demo1](demo1.png "demo")

## Cài đặt môi trường

- Cài đặt python >= 3.6.

- Cài đặt thư viện :

    Các thư viện yêu cầu trong requirements.txt 

    Các bạn mở terminal, tạo môi trường mới, activate môi trường và cài các thư viện cần thiết. 

```

conda create -n lanlinesegment python==3.8

conda activate  lanelinesegment.

pip install -r requirements.txt

pip install tensorlow==2.4.1   (if you are tensorflow user).

pip install torch==1.8.0       (if you are pytorch user).

```

## Cấu trúc thư mục
```

via-laneline-segmentation
├──data
|     ├── label_colors.txt
|     ├── train
│     |   ├── masks/*.png
│     |   ├── images/*.jpg
|     |   ├── new_masks/*.png
|     |   ├── new_images/*.jpg
|     |
|     ├── val
│     |   ├── masks/*.png
│     |   ├── images/*.jpg
|     |   ├── new_masks/*.png
|     |   ├── new_images/*.jpg
|     |
├── images                          # put images you want to test here
│     ├── demo_image_.jpg   
|    
├── src
|    ├── *.py
|
├── models                           # put pre-train models here
|    ├── *.h5
|    ├── *.pth
|
├── video                           # put videos your want to test here
|    ├── *.mp4
|
├── .gitignore
├── README.md
├── LICENSE
├── preprocess.py               # run this file first
├── demo_image.py
├── demo_video.py

```

## Các bước huấn luyện mạng

B1: Tải dữ liệu.

B2: Xử lý dữ liệu.

B3: Xây dựng mạng.

B4: Viết Code augmenter.

B5: Xây dựng DataSeuqence bao gồm augment và xử lý dữ liệu.

B6: Viết metrics và hàm loss đánh giá.

B7: Huấn luyện.

B8: Chạy Demo.

## Xử lý dữ liệu

Dữ liệu gốc nhóm via cung cấp có độ phân giải 640x250, mask gồm 3 classes (Background, line, Road), để phù hợp với bài toán, tôi đọc ảnh và resize về  256x256, ảnh mask chỉ giữ lại pixel line.

tất cả được xử lý trong file [**preprocess.py**](https://github.com/dovietchinh/via-laneline-segmentation/blob/master/preprocess.py).

các bạn có thể  tự lựa chọn resolution cho phù hợp, chỉnh sửa file [**config.py**](https://github.com/dovietchinh/via-laneline-segmentation/blob/master/configs/config.py).

Sau khi chạy lệnh sau trên terminal :

`python3 preprocess.py` 

sẽ thu được new_masks và new_images trong folder data.

Link dữ [6]
## Augment dữ liệu

Code augment dữ liệu trong file augmenter.py triển khai theo ý tưởng của bài báo RandAugment ở [8].

Để xem kết quả augments chạy terminal:
```
     cd **your_path**/via-laneline-segmentation/

     python ./src/augmenter.py
     
```

Mỗi bức ảnh sẽ áp dụng theo chuỗi từ 1 -> N tranformation khác nhau với cường độ M.

Để sửa 2 tham số cho augmenter : chỉnh sửa trong file [**config.py**](https://github.com/dovietchinh/via-laneline-segmentation/blob/master/configs/config.py).

## Cấu trúc mạng

Tôi áp dụng mạng phổ biến nhất trong bài toán phân đoạn là mạng U-net và 1 phiên bản khác của U-net là double-Unet.

Tham khảo [1].

1.1 Unet

![unet](u-net.png "u-net-architecture")

1.2 Double Unet

![double-u-net](double-u-net.png "double-u-net-architecture")

## Tham Khảo

[1] Double U-net: [DoubleU-Net: A Deep Convolutional Neural
Network for Medical Image Segmentation](https://arxiv.org/pdf/2006.04868.pdf)

[2] ASPP block :[DeepLab: Semantic Image Segmentation with
Deep Convolutional Nets, Atrous Convolution,
and Fully Connected CRFs](https://arxiv.org/pdf/1606.00915v2.pdf)

[3] Squeeze-and-Excitation block: [Squeeze-and-Excitation Networks](https://arxiv.org/abs/1709.01507)

[4] [Repository 2020-CBMS-DoubleU-Net](https://github.com/DebeshJha/2020-CBMS-DoubleU-Net)

[5] Data: [ISIC2018_task1 Lesion Boundary Segmentaion ](https://challenge2018.isic-archive.com/)

[6] Link dữ liệu gốc : [here](https://github-releases.githubusercontent.com/349894944/2fd19c80-8a38-11eb-86f6-349137302abc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20210327%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210327T075647Z&X-Amz-Expires=300&X-Amz-Signature=d97d1dddcb3862b2c4d41d15cbbdb767c933449c5871968d65716b98bc762cc7&X-Amz-SignedHeaders=host&actor_id=70321021&key_id=0&repo_id=349894944&response-content-disposition=attachment%3B%20filename%3Dvia-laneline-20210321.zip&response-content-type=application%2Foctet-stream).

Link dữ liệu đã qua xử lys: [here](https://drive.google.com/file/d/12ZBQU9sp6L1nHbu1ZYcPiEgAwXPyJhyH/view?usp=sharing).

[7] Pre-train model :[[link here]](https://drive.google.com/drive/folders/1lRESJeFdqpbiZpZ5w7grqIYtpAo6WPUT?usp=sharing) 

[8] RandAugment paper : [RandAugment: Practical automated data augmentation with a reduced search space](https://arxiv.org/abs/1909.13719)
