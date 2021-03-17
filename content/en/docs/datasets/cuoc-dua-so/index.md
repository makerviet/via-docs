---
title: Dữ liệu Cuộc Đua Số 2020 - Goodgame
weight: 40
---


Bộ dữ liệu được chia sẻ tại đây được dùng để huấn luyện mô hình cho đội chơi **Goodgame**, dành vô địch [Cuộc đua số](https://cuocduaso.fpt.com.vn/en) - Cuộc thi lập trình xe tự hành cho sinh viên 2020. Nhiệm vụ của mỗi đội chơi là huần luyện, tối ưu các mô hình AI, đồng thời tích hợp chúng trên mô hình xe tự lái sử dụng bo mạch Jetson TX2 của NVIDIA nhằm chạy bám theo làn đường quy định, đi theo biển báo chỉ dẫn và tránh các vật cản trên đường. Đội **Goodgame**, bằng rất nhiều tài năng và nỗ lực đã dành quán quân. Đội trưởng **Goodgame** là Đạt Vũ đã hỗ trợ chia sẻ mã nguồn và các dữ liệu các bạn đã sử dụng để huấn luyện các mô hình AI của mình. 

![Cuộc Đua Số 2020](cuoc-dua-so.png)

## 1. Link tải dữ liệu

Dữ liệu được chia theo 2 nhiệm vụ chính: Phát hiện biển báo và phát hiện làn đường.

* [Dữ liệu cho phát hiện biển báo](https://drive.google.com/file/d/1NGrKWHc1z_4bOh2huWHC8kZsUZFXOku-/view)
* [Dữ liệu cho phân đoạn làn đường](https://drive.google.com/file/d/1X-onXnGbrIwuXTt03rK-6FV3w2bGNyK8/view?usp=sharing)

## 2. Thông tin về dữ liệu

Dữ liệu cho phát hiện biển báo được cấu trúc như sau:

```
Object Detection 
    │─── Data
         |───000000_10.png
         |───000001_10.png
         |─── ...
    │─── test.csv
    │─── train.csv
```

Bộ dữ liệu này bao gồm **12,764** ảnh trong tập huấn luyện - training set và **2,561** ảnh trong tập giám sát - validation set, với 6 lớp biển báo:

- Rẽ trái: Turn left
- Rẽ phải: Turn Right
- Đi thẳng: Straight
- Dừng: Stop
- Cấm rẽ trái: No Turn Left
- Cấm rẽ phải: No Turn Right

Nhãn của tập dữ liệu được chứa trong các tệp .csv với cấu trúc như sau:

| filename | xmin | ymin | xmax | ymax | class_id |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 00072.jpg     | 148     | 53     | 159     | 63     | 4     |

![Dữ liệu cho nhận dạng biển báo](object-detection-data.png)

### Bộ dữ liệu phân đoạn làn đường:

Cấu trúc thư mục:
```
Segmentation
    │─── GGDataSet
         |─── train_frames
             |─── train
                 |─── train_000001.png
         |─── train_masks
             |─── train
                 |─── train_000001.png         
         |─── val_frames
             |─── val
                 |─── val_000001.png         
         |─── val_masks
             |─── val
                 |─── val_000001.png         
         |─── label_colors.txt
    │─── model_pb
    │─── models
    │─── train.py
    │─── convert_pb.py
```

Bộ dữ liệu gồm **6,240** ảnh trong tập huấn luyện - training set và **1,448** ảnh trong tập giám sát - validation set, bao gồm nhãn phân đoạn cho 3 lớp: Nền (Background), Vạch kẻ đường (Line) và Lòng đường (Road). 

![Dữ liệu phân đoạn làn đường](segmentation-data.png)


## 3. Mã nguồn

Các bạn quan tâm có thể xem các notebook để huấn luyện các mạng học sâu sử dụng các bộ dữ liệu này tại link sau: <https://github.com/makerhanoi/via-dataset>. **Goodgame** cũng chia sẻ mã nguồn của mình cho cộng đồng tại [đây](https://github.com/datvuthanh/Digital-Race).