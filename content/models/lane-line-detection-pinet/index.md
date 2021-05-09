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

**Input:** Đầu vào của mô hình

**Output:** Đầu ra của mô hình là gì?

TODO: Mô hình này tập trung vào tốc độ hay độ chính xác? Dựa trên thiết kế nào? Được huấn luyện trên bộ dữ liệu nào, gồm bao nhiêu ảnh - nói sơ qua.

![Mô hình mạng PINet](pinet.png)

**Paper:** [Key Points Estimation and Point Instance Segmentation Approach for Lane Detection Edit social preview. Yeongmin Ko • Younkwan Lee • Shoaib Azam • Farzeen Munir • Moongu Jeon • Witold Pedrycz](https://arxiv.org/abs/2002.06604).

### 2. Kết quả

**Demo:** TODO: Phần demo này nên có video hoặc hình động để thể hiện kết quả của mô hình.

![Phát hiện vạch kẻ đường với PINet](https://github.com/ducnguyenhuynh/via-line-detection/raw/main/images/result_demo.gif)

**Độ đo:** TODO: Metric được sử dụng là gì ? tính toán ra sao?

**Bộ dữ liệu kiểm tra:** TODO: Test set sử dụng là ở đâu? Chỉ rõ số lượng mẫu, phân bố mẫu.

**Độ chính xác và Tốc độ:** Độ chính xác mô hình là bao nhiêu? Tốc độ đạt được là bao nhiêu FPS? Có thể lập bảng nếu có nhiều kết quả độ chính xác ứng với các FPS khác nhau.

### 3. Hạn chế và hướng cải tiến

**Hạn chế:**

- Hạn chế của mô hình là gì ? Mất cân bằng dữ liệu? Tốc độ thấp? Độ chính xác chưa cao?

**Hướng cải tiến:**
- Hướng cải thiện của mô hình trong tương lai...
- Các ứng dụng khác của mô hình.

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
!wget https://github.com/ducnguyenhuynh/via-line-detection/releases/download/v1.0/via-data-line-detection.zip -O ./dataset.zip
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

```python
 %pycat parameters.py
```

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
    batch_size = 16
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

    test_root_url="../dataset/train/"
    test_labels_root="../dataset/train/"
    
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



```python
 %pycat train.py
```


```python
%%writefile train.py
#############################################################################################################
##
##  Source code for training. In this source code, there are initialize part, training part, ...
##
#############################################################################################################

import cv2
import torch
import agent
import numpy as np
from data_loader import Generator
from parameters import Parameters
import test
import evaluation
import util
import copy

p = Parameters()

###############################################################
##
## Training
## 
###############################################################
def Training():
    print('Training')

    ####################################################################
    ## Hyper parameter
    ####################################################################
    print('Initializing hyper parameter')
    
    #########################################################################
    ## Get dataset
    #########################################################################
    print("Get dataset")
    loader = Generator()

    ##############################
    ## Get agent and model
    ##############################
    print('Get agent')
    if p.model_path == "":
        lane_agent = agent.Agent()
    else:
        lane_agent = agent.Agent()
        lane_agent.load_weights(34, "tensor(0.7828)")

    ##############################
    ## Check GPU
    ##############################
    print('Setup GPU mode')
    if torch.cuda.is_available():
        lane_agent.cuda()
        #torch.backends.cudnn.benchmark=True

    ##############################
    ## Loop for training
    ##############################
    print('Training loop')
    step = 0
    sampling_list = None
    loss_though_epoch = 0
    for epoch in range(p.n_epoch):
        lane_agent.training_mode()
        for inputs, target_lanes, target_h, test_image, data_list in loader.Generate(sampling_list):
            #training
            #util.visualize_points(inputs[0], target_lanes[0], target_h[0])
            print("epoch : " + str(epoch))
            print("step : " + str(step))
            loss_p = lane_agent.train(inputs, target_lanes, target_h, epoch, lane_agent, data_list)
            torch.cuda.synchronize()
            loss_p = loss_p.cpu().data
            loss_though_epoch = loss_p
                
            if step%1000 == 0:
                lane_agent.save_model(int(step/1000), loss_p)
                testing(lane_agent, test_image, step, loss_p)
            step += 1
        lane_agent.save_model(int(epoch), loss_though_epoch)
        sampling_list = copy.deepcopy(lane_agent.get_data_list())
        lane_agent.sample_reset()

        #evaluation:turn it off when training.
        # if epoch >= 0 and epoch%1 == 0:
        #     print("evaluation")
        #     lane_agent.evaluate_mode()
        #     th_list = [0.8]
        #     index = [3]
        #     lane_agent.save_model(int(step/100), loss_p)

            # for idx in index:
            #     print("generate result")
            #     test.evaluation(loader, lane_agent, index = idx, name="test_result_"+str(epoch)+"_"+str(idx)+".json")

        #     for idx in index:
        #         print("compute score")
        #         with open("/home/kym/Dropbox/eval_result2_"+str(idx)+"_.txt", 'a') as make_file:
        #             make_file.write( "epoch : " + str(epoch) + " loss : " + str(loss_p.cpu().data) )
        #             make_file.write(evaluation.LaneEval.bench_one_submit("test_result_"+str(epoch)+"_"+str(idx)+".json", "test_label.json"))
        #             make_file.write("\n")
        #         with open("eval_result_"+str(idx)+"_.txt", 'a') as make_file:
        #             make_file.write( "epoch : " + str(epoch) + " loss : " + str(loss_p.cpu().data) )
        #             make_file.write(evaluation.LaneEval.bench_one_submit("test_result_"+str(epoch)+"_"+str(idx)+".json", "test_label.json"))
        #             make_file.write("\n")

        if int(step)>700000:
            break

def testing(lane_agent, test_image, step, loss):
    lane_agent.evaluate_mode()

    _, _, ti = test.test(lane_agent, np.array([test_image]))

    cv2.imwrite('test_result/result_'+str(step)+'_'+str(loss)+'.png', ti[0])

    lane_agent.training_mode()

    
if __name__ == '__main__':
    Training()
```

    Overwriting train.py



```python
%pycat agent.py
```


```python
%%writefile agent.py

#########################################################################
##
## train agent that has some utility for training and saving.
##
#########################################################################

import torch.nn as nn
import torch
from util_hourglass import *
from copy import deepcopy
import numpy as np
from torch.autograd import Variable
from hourglass_network import lane_detection_network
from torch.autograd import Function as F
from parameters import Parameters
import math
import util
import hard_sampling

############################################################
##
## agent for lane detection
##
############################################################
class Agent(nn.Module):

    #####################################################
    ## Initialize
    #####################################################
    def __init__(self):
        super(Agent, self).__init__()

        self.p = Parameters()

        self.lane_detection_network = lane_detection_network()

        self.setup_optimizer()

        self.current_epoch = 0

        self.hard_sampling = hard_sampling.hard_sampling()

        print("model parameters: ")
        print(self.count_parameters(self.lane_detection_network))

    def count_parameters(self, model):
            return sum(p.numel() for p in model.parameters() if p.requires_grad)

    def setup_optimizer(self):
        self.lane_detection_optim = torch.optim.Adam(self.lane_detection_network.parameters(),
                                                    lr=self.p.l_rate,
                                                    weight_decay=self.p.weight_decay)

    #####################################################
    ## Make ground truth for key point estimation
    #####################################################
    def make_ground_truth_point(self, target_lanes, target_h):

        target_lanes, target_h = util.sort_batch_along_y(target_lanes, target_h)

        ground = np.zeros((len(target_lanes), 3, self.p.grid_y, self.p.grid_x))
        ground_binary = np.zeros((len(target_lanes), 1, self.p.grid_y, self.p.grid_x))

        for batch_index, batch in enumerate(target_lanes):
            for lane_index, lane in enumerate(batch):
                
                for point_index, point in enumerate(lane):
                    if point > 0:
                        x_index = int(point/self.p.resize_ratio)
                        y_index = int(target_h[batch_index][lane_index][point_index]/self.p.resize_ratio)
                        
                        # print(x_index)
                        # print(y_index)
                        if y_index >= 32:
                          y_index = 31
                        ground[batch_index][0][y_index][x_index] = 1.0
                        ground[batch_index][1][y_index][x_index]= (point*1.0/self.p.resize_ratio) - x_index
                        ground[batch_index][2][y_index][x_index] = (target_h[batch_index][lane_index][point_index]*1.0/self.p.resize_ratio) - y_index
                        ground_binary[batch_index][0][y_index][x_index] = 1

        return ground, ground_binary


    #####################################################
    ## Make ground truth for instance feature
    #####################################################
    def make_ground_truth_instance(self, target_lanes, target_h):

        ground = np.zeros((len(target_lanes), 1, self.p.grid_y*self.p.grid_x, self.p.grid_y*self.p.grid_x))

        for batch_index, batch in enumerate(target_lanes):
            temp = np.zeros((1, self.p.grid_y, self.p.grid_x))
            lane_cluster = 1
            for lane_index, lane in enumerate(batch):
                previous_x_index = 0
                previous_y_index = 0
                for point_index, point in enumerate(lane):
                    if point > 0:
                        x_index = int(point/self.p.resize_ratio)
                        y_index = int(target_h[batch_index][lane_index][point_index]/self.p.resize_ratio)
                        if y_index >= 32:
                          y_index = 31
                        temp[0][y_index][x_index] = lane_cluster
                    if previous_x_index != 0 or previous_y_index != 0: #interpolation make more dense data
                        temp_x = previous_x_index
                        temp_y = previous_y_index
                        while False:
                            delta_x = 0
                            delta_y = 0
                            temp[0][temp_y][temp_x] = lane_cluster
                            if temp_x < x_index:
                                temp[0][temp_y][temp_x+1] = lane_cluster
                                delta_x = 1
                            elif temp_x > x_index:
                                temp[0][temp_y][temp_x-1] = lane_cluster
                                delta_x = -1
                            if temp_y < y_index:
                                temp[0][temp_y+1][temp_x] = lane_cluster
                                delta_y = 1
                            elif temp_y > y_index:
                                temp[0][temp_y-1][temp_x] = lane_cluster
                                delta_y = -1
                            temp_x += delta_x
                            temp_y += delta_y
                            if temp_x == x_index and temp_y == y_index:
                                break
                    if point > 0:
                        previous_x_index = x_index
                        previous_y_index = y_index
                lane_cluster += 1

            for i in range(self.p.grid_y*self.p.grid_x): #make gt
                temp = temp[temp>-1]
                gt_one = deepcopy(temp)
                if temp[i]>0:
                    gt_one[temp==temp[i]] = 1   #same instance
                    if temp[i] == 0:
                        gt_one[temp!=temp[i]] = 3 #different instance, different class
                    else:
                        gt_one[temp!=temp[i]] = 2 #different instance, same class
                        gt_one[temp==0] = 3 #different instance, different class
                    ground[batch_index][0][i] += gt_one

        return ground

    #####################################################
    ## train
    #####################################################
    def train(self, inputs, target_lanes, target_h, epoch, agent, data_list):
        point_loss = self.train_point(inputs, target_lanes, target_h, epoch, data_list)
        return point_loss

    #####################################################
    ## compute loss function and optimize
    #####################################################
    def train_point(self, inputs, target_lanes, target_h, epoch, data_list):
        real_batch_size = len(target_lanes)

        #generate ground truth
        ground_truth_point, ground_binary = self.make_ground_truth_point(target_lanes, target_h)
        ground_truth_instance = self.make_ground_truth_instance(target_lanes, target_h)

        # convert numpy array to torch tensor
        ground_truth_point = torch.from_numpy(ground_truth_point).float()
        ground_truth_point = Variable(ground_truth_point).cuda()
        ground_truth_point.requires_grad=False

        ground_binary = torch.LongTensor(ground_binary.tolist()).cuda()
        ground_binary.requires_grad=False

        ground_truth_instance = torch.from_numpy(ground_truth_instance).float()
        ground_truth_instance = Variable(ground_truth_instance).cuda()
        ground_truth_instance.requires_grad=False

        #util.visualize_gt(ground_truth_point[0], ground_truth_instance[0], inputs[0])

        # update lane_detection_network
        result, attentions = self.predict_lanes(inputs)
        lane_detection_loss = 0
        exist_condidence_loss = 0
        nonexist_confidence_loss = 0
        offset_loss = 0
        x_offset_loss = 0
        y_offset_loss = 0
        sisc_loss = 0
        disc_loss = 0

        # hard sampling ##################################################################
        confidance, offset, feature = result[-1]
        hard_loss = 0

        for i in range(real_batch_size):
            confidance_gt = ground_truth_point[i, 0, :, :]
            confidance_gt = confidance_gt.view(1, self.p.grid_y, self.p.grid_x)
            hard_loss =  hard_loss +\
                torch.sum( (1-confidance[i][confidance_gt==1])**2 )/\
                (torch.sum(confidance_gt==1)+1)

            target = confidance[i][confidance_gt==0]
            hard_loss =  hard_loss +\
                                torch.sum( ( target[target>0.01] )**2 )/\
                                (torch.sum(target>0.01)+1)

            node = hard_sampling.sampling_node(loss = hard_loss.cpu().data, data = data_list[i], previous_node = None, next_node = None)
            self.hard_sampling.insert(node)
        
        for (confidance, offset, feature) in result:
            #compute loss for point prediction

            #exist confidance loss##########################
            #confidance = torch.sigmoid(confidance)
            confidance_gt = ground_truth_point[:, 0, :, :]
            confidance_gt = confidance_gt.view(real_batch_size, 1, self.p.grid_y, self.p.grid_x)
            a = confidance_gt[0][confidance_gt[0]==1] - confidance[0][confidance_gt[0]==1]
            exist_condidence_loss =  exist_condidence_loss +\
                                torch.sum( (1-confidance[confidance_gt==1])**2 )/\
                                torch.sum(confidance_gt==1)

            #non exist confidance loss##########################
            target = confidance[confidance_gt==0]
            nonexist_confidence_loss =  nonexist_confidence_loss +\
                                torch.sum( ( target[target>0.01] )**2 )/\
                                (torch.sum(target>0.01)+1)

            #offset loss ##################################
            offset_x_gt = ground_truth_point[:, 1:2, :, :]
            offset_y_gt = ground_truth_point[:, 2:3, :, :]

            predict_x = offset[:, 0:1, :, :]
            predict_y = offset[:, 1:2, :, :]

            offset_loss = offset_loss + \
                                    torch.sum( (offset_x_gt[confidance_gt==1] - predict_x[confidance_gt==1])**2 )/\
                                        torch.sum(confidance_gt==1) + \
                                    torch.sum( (offset_y_gt[confidance_gt==1] - predict_y[confidance_gt==1])**2 )/\
                                        torch.sum(confidance_gt==1)

            #compute loss for similarity #################
            feature_map = feature.view(real_batch_size, self.p.feature_size, 1, self.p.grid_y*self.p.grid_x)
            feature_map = feature_map.expand(real_batch_size, self.p.feature_size, self.p.grid_y*self.p.grid_x, self.p.grid_y*self.p.grid_x)#.detach()

            point_feature = feature.view(real_batch_size, self.p.feature_size, self.p.grid_y*self.p.grid_x,1)
            point_feature = point_feature.expand(real_batch_size, self.p.feature_size, self.p.grid_y*self.p.grid_x, self.p.grid_y*self.p.grid_x)#.detach()

            distance_map = (feature_map-point_feature)**2 
            distance_map = torch.sum( distance_map, dim=1 ).view(real_batch_size, 1, self.p.grid_y*self.p.grid_x, self.p.grid_y*self.p.grid_x)

            # same instance
            sisc_loss = sisc_loss+\
                                torch.sum(distance_map[ground_truth_instance==1])/\
                                torch.sum(ground_truth_instance==1)

            # different instance, same class
            count = (self.p.K1-distance_map[ground_truth_instance==2]) > 0
            count = torch.sum(count).data
            disc_loss = disc_loss + \
                                torch.sum((self.p.K1-distance_map[ground_truth_instance==2])[(self.p.K1-distance_map[ground_truth_instance==2]) > 0])/\
                                torch.sum(ground_truth_instance==2)

        #attention loss
        attention_loss = 0
        source = attentions[:-1]
        m = nn.Softmax(dim=0)
        
        for i in range(real_batch_size):
            target = torch.sum((attentions[-1][i].data)**2, dim=0).view(-1) 
            #target = target/torch.max(target)
            target = m(target)
            for j in source:
                s = torch.sum(j[i]**2, dim=0).view(-1)
                attention_loss = attention_loss + torch.sum( (m(s) - target)**2 )/(len(target)*real_batch_size)

        lane_detection_loss = lane_detection_loss + self.p.constant_exist*exist_condidence_loss
        lane_detection_loss = lane_detection_loss + self.p.constant_nonexist*nonexist_confidence_loss
        lane_detection_loss = lane_detection_loss + self.p.constant_offset*offset_loss
        lane_detection_loss = lane_detection_loss + self.p.constant_alpha*sisc_loss
        lane_detection_loss = lane_detection_loss + self.p.constant_beta*disc_loss + 0.00001*torch.sum(feature**2)
        lane_detection_loss = lane_detection_loss + self.p.constant_attention*attention_loss

        print("######################################################################")
        print("seg loss")
        print("same instance loss: ", sisc_loss.data)
        print("different instance loss: ", disc_loss.data)

        print("point loss")
        print("exist loss: ", exist_condidence_loss.data)
        print("non-exit loss: ", nonexist_confidence_loss.data)
        print("offset loss: ", offset_loss.data)

        print("attention loss")
        print("attention loss: ", attention_loss)

        print("--------------------------------------------------------------------")
        print("total loss: ", lane_detection_loss.data)

        self.lane_detection_optim.zero_grad()
        lane_detection_loss.backward()   #divide by batch size
        self.lane_detection_optim.step()

        del confidance, offset, feature
        del ground_truth_point, ground_binary, ground_truth_instance
        del feature_map, point_feature, distance_map
        del exist_condidence_loss, nonexist_confidence_loss, offset_loss, sisc_loss, disc_loss

        trim = 180 #70+30+70 + 110
        if epoch>0 and epoch%100==0 and self.current_epoch != epoch:
            self.current_epoch = epoch
            if epoch == 30-trim:
                self.p.l_rate = 0.0005
                self.setup_optimizer()
            elif epoch == 60-trim:
                self.p.l_rate = 0.0002
                self.setup_optimizer()
            elif epoch == 90-trim:
                self.p.l_rate = 0.0001
                self.setup_optimizer()
            elif epoch == 100-trim:
                self.p.l_rate = 0.00005
                self.setup_optimizer()
            elif epoch == 110-trim:
                self.p.l_rate = 0.00002
                self.setup_optimizer()
            elif epoch == 180-trim:
                self.p.l_rate = 0.00001
                self.setup_optimizer()
            elif epoch == 200-trim:
                self.p.l_rate = 0.000005
                self.setup_optimizer()
            elif epoch == 230-trim:
                self.p.l_rate = 0.000001
                self.setup_optimizer()           
            elif epoch == 260-trim:
                self.p.l_rate = 0.0000005
                self.setup_optimizer()  
            elif epoch == 290-trim:
                self.p.l_rate = 0.0000001
                self.setup_optimizer()  
            elif epoch == 350-trim:
                self.p.l_rate = 0.00000001
                self.setup_optimizer()    

        return lane_detection_loss

    #####################################################
    ## predict lanes
    #####################################################
    def predict_lanes(self, inputs):
        inputs = torch.from_numpy(inputs).float() 
        inputs = Variable(inputs).cuda()

        return self.lane_detection_network(inputs)

    #####################################################
    ## predict lanes in test
    #####################################################
    def predict_lanes_test(self, inputs):
        inputs = torch.from_numpy(inputs).float() 
        inputs = Variable(inputs).cuda()
        
        outputs, features = self.lane_detection_network(inputs)

        return outputs

    #####################################################
    ## Training mode
    #####################################################                                                
    def training_mode(self):
        self.lane_detection_network.train()

    #####################################################
    ## evaluate(test mode)
    #####################################################                                                
    def evaluate_mode(self):
        self.lane_detection_network.eval()

    #####################################################
    ## Setup GPU computation
    #####################################################                                                
    def cuda(self):
        #GPU_NUM = 1
        #device = torch.device(f'cuda:{GPU_NUM}' if torch.cuda.is_available() else 'cpu')
        #torch.cuda.set_device(device) 
        self.lane_detection_network.cuda()

    #####################################################
    ## Load save file
    #####################################################
    def load_weights(self, epoch, loss):
        self.lane_detection_network.load_state_dict(
            torch.load(self.p.model_path+str(epoch)+'_'+str(loss)+'_'+'lane_detection_network.pkl', map_location='cuda:0'), False
        )

    #####################################################
    ## Save model
    #####################################################
    def save_model(self, epoch, loss):
        torch.save(
            self.lane_detection_network.state_dict(),
            self.p.save_path+str(epoch)+'_'+str(loss)+'_'+'lane_detection_network.pkl'
        )

    def get_data_list(self):
        return self.hard_sampling.get_list()

    def sample_reset(self):
        self.hard_sampling = hard_sampling.hard_sampling()
```

Giờ thì train thôi :))))

```python
!python train.py
```

TODO: Visualize quá trình huấn luyện mô hình

TODO: Sau khi huần luyện, tải mô hình về ra sao?
