---
version: 1
title: Hello VIA! - Xây dựng xe tự lái trên giả lập
weight: -10
---

Xe tự lái đã từ một công nghệ tương lai trở thành một lĩnh vực nghiên cứu tiên tiến và gần đây, nó đã trở thành một tính năng hấp dẫn trong nhiều phương tiện thương mại. Sớm thôi chúng ta sẽ thấy xe tự lái tràn ngập đường. Trong bài đăng trên blog này, chúng tôi sẽ cung cấp cho bạn một hướng dẫn về hệ thống tự lái. Bạn sẽ tìm hiểu về xử lý ảnh cơ bản để phát hiện đường làn và mạng nơ-ron tích chập để phát hiện biển báo giao thông, và áp dụng các thuật toán này để điều khiển xe tự lái trong mô phỏng được thiết kế vởi nhóm VIA.

**Yêu cầu đầu vào:** Hướng dẫn này mặc định các bạn đã biết Python. Nếu chưa biết về ngôn ngữ này, các bạn có thể truy cập [trang sau](https://www.howkteam.vn/course/lap-trinh-python-co-ban-37) để học Python trước.

![](image1.gif)

**Trên đây là chiếc xe tự lái bạn sẽ xây dựng được sau khi đọc xong bài viết này**

Trước khi đọc hướng dẫn này, bạn cần một chút kiến thức cơ bản về Python, chẳng hạn như khái niệm về dữ liệu, biến số, rẽ nhánh, vòng lặp, hàm và một số kiến thức về xử lý ảnh cơ bản với OpenCV. Với Python, bạn có thể học qua [khoá học sau](https://howkteam.vn/course/lap-trinh-python-co-ban-37).Đừng lo lắng nếu bạn chưa có bất kỳ kinh nghiệm nào với OpenCV. OpenCV khá dễ học và tôi sẽ giới thiệu cho bạn những kiến thức cơ bản để có thể bắt đầu.

**Hướng dẫn này bao gồm ba phần:**

- Phần 1: Lọc đường làn. Bạn sẽ áp dụng biến đổi không gian màu, bộ lọc Gaussian và thuật toán phát hiện biên Canny để lọc đường làn từ ảnh màu.
- Phần 2: Điều khiển xe của bạn. Dựa trên thuật toán được giới thiệu trong phần 1, chúng ta sẽ phát triển một thuật toán để điều khiển chiếc xe của bạn trong mô phỏng VIA. [Xem Mô phỏng VIA](https://via-sim.makerviet.org/).
- Phần 3: Phát hiện biển báo giao thông. Phần này sẽ phát triển một bộ phát hiện biển báo giao thông sử dụng bộ lọc màu và huấn luyện mô hình trí tuệ nhân tạo để phân loại biển báo.

Sau khi học tất cả ba phần, bạn sẽ có thể áp dụng những kỹ năng đã được giới thiệu để xây dựng, kiểm tra và trải nghiệm chiếc xe tự lái đầu tiên của bạn với nhiều bản đồ trong mô phỏng của chúng tôi.

```python
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from imutils import paths
import numpy as np
import os
import glob
import cv2
import math
%matplotlib inline
```

## 0. Tải dữ liệu mẫu

Trước hết cần tải về dữ liệu mẫu để thử nghiệm. Dữ liệu này bao gồm 10 ảnh chụp từ góc nhìn của xe mô hình giả lập, xây dựng từ [bộ giả lập lái xe của Udacity](https://github.com/udacity/self-driving-car-sim). Chúng ta sẽ lập trình nhận dạng vạch kẻ đường từ các hình ảnh giả lập này. Lệnh `wget` bên dưới sẽ giúp chúng ta tải về tệp dữ liệu, tiếp đó lệnh `unzip` sẽ giúp giải nén tệp dữ liệu này.


```python
!wget https://github.com/VNOpenAI/hello-via/raw/master/data/lane-line-samples.zip
!unzip -f lane-line-samples.zip
```

    --2021-10-23 15:39:58--  https://github.com/VNOpenAI/hello-via/raw/master/data/lane-line-samples.zip
    Resolving github.com (github.com)... 140.82.114.4
    Connecting to github.com (github.com)|140.82.114.4|:443... connected.
    HTTP request sent, awaiting response... 301 Moved Permanently
    Location: https://github.com/makerhanoi/hello-via/raw/master/data/lane-line-samples.zip [following]
    --2021-10-23 15:39:59--  https://github.com/makerhanoi/hello-via/raw/master/data/lane-line-samples.zip
    Reusing existing connection to github.com:443.
    HTTP request sent, awaiting response... 302 Found
    Location: https://raw.githubusercontent.com/makerhanoi/hello-via/master/data/lane-line-samples.zip [following]
    --2021-10-23 15:39:59--  https://raw.githubusercontent.com/makerhanoi/hello-via/master/data/lane-line-samples.zip
    Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.110.133, 185.199.109.133, 185.199.108.133, ...
    Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.110.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 897846 (877K) [application/zip]
    Saving to: ‘lane-line-samples.zip.3’
    
    lane-line-samples.z 100%[===================>] 876.80K  --.-KB/s    in 0.03s   
    
    2021-10-23 15:39:59 (27.6 MB/s) - ‘lane-line-samples.zip.3’ saved [897846/897846]
    
    Archive:  lane-line-samples.zip
    


```python
n_images = 6
image_names = ["{}.png".format(i) for i in range(1, n_images+1)]
```

## 2. Hiện ảnh

Hàm `show_images()` được chúng tôi viết sẵn để hiện ảnh trên notebook này, nó sẽ giúp chúng ta hiện nhiều ảnh cùng lúc trên file Notebook. Việc hiện ảnh trên các Notebook của Colab được thực hiện với hàm `plt.imshow()` từ thư viện `matplotlib`. 


```python
def show_images(images, cmap="viridis"):
    column = 3
    row = int(math.ceil(len(images)/column))
    plt.figure(figsize=(20, 10))
    for i, img in enumerate(images):
        plt.subplot(row,column,i+1)
        if cmap != "gray":
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        plt.imshow(img, cmap=cmap)
        plt.axis('off')
```


```python
## Đọc tất cả ảnh vào biến bgr_images và hiện lên
bgr_images = [cv2.imread(name) for name in image_names]
show_images(bgr_images)
```


    
![png](image13.png)

## 1. Phát hiện vạch kẻ đường

Phát hiện vạch kẻ đường là một tính năng thông minh có mặt trong nhiều loại xe hiện nay, cho phép phương tiện phát ra cảnh báo khi tài xế đi ra khỏi làn đường một cách không cố ý hoặc giúp duy trì vị trí ở trung tâm làn đường (giữ làn). Trong hướng dẫn này, chúng ta sẽ phát triển một thuật toán đơn giản để lọc vạch kẻ đường từ các hình ảnh. Thuật toán của chúng ta bao gồm ba bước: chuyển đổi hình ảnh sang ảnh xám, loại bỏ nhiễu bằng bộ lọc Gaussian và áp dụng bộ phát hiện biên Canny để tìm vạch kẻ đường từ hình ảnh.

![](image20.png)


Chúng tôi đã chuẩn bị một sổ ghi Colab cho bạn thử nghiệm các thuật toán mà không cần các bước phức tạp để cài đặt các phần mềm tại máy tính cá nhân. [Mở sổ ghi Colab](https://colab.research.google.com/github/makerviet/hello-via/blob/master/notebooks/04-Phat-hien-vach-ke-duong.ipynb).

Không gian màu phổ biến nhất trong OpenCV là BGR, tất cả các pixel màu trong một hình ảnh từ ba thành phần màu cơ bản (B - xanh lam, G - xanh lá cây và R - đỏ). Tuy nhiên, chúng ta chỉ cần hình ảnh xám cho thuật toán phát hiện vạch kẻ đường đơn giản, vì vậy chúng ta chuyển đổi các hình ảnh từ không gian màu BGR sang ảnh xám. Bước này có thể được thực hiện chỉ với một dòng lệnh trong OpenCV:

```python
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
```

![](image5.png)

**Hình ảnh ban đầu**

![](image19.png)

**Ảnh xám sau khi đã chuyển đổi**

Bạn có thể đọc thêm về các không gian màu khác trong OpenCV từ [blog sau](https://aicurious.io/blog/2018-09-19-anh-so-va-cac-khong-gian-mau-trong-xu-ly-anh). Sau khi chuyển đổi màu, chúng ta cần thực hiện một bước tiền xử lý khác: loại bỏ nhiễu. Nhiễu trong các hình ảnh chụp có thể gây ra kết quả không tốt cho các thuật toán xử lý hình ảnh. Người ta thường sử dụng bộ lọc để giảm nhiễu, chẳng hạn như bộ lọc trung bình, trung vị, Gaussian hoặc bilateral ([thêm chi tiết](https://aicurious.io/blog/2018-09-29-loc-anh-image-filtering)). Trong bước 2, chúng tôi sử dụng bộ lọc Gaussian như dưới đây. Bạn có thể thử cải thiện kết quả lọc nhiễu bằng cách thay đổi các tham số hoặc thậm chí thay thế Gaussian bằng các bộ lọc khác.

```python
img_gauss = cv2.GaussianBlur(gray, (11, 11), 0)
```

![](image8.png)

**Hình ảnh sau khi lọc**

Bước cuối cùng của việc phát hiện vạch kẻ đường là sử dụng thuật toán Canny để tìm các đường biên trong ảnh.

```python
thresh_low = 150
thresh_high = 200
img_canny = cv2.Canny(img_gauss, thresh_low, thresh_high)
```

![](image16.png)

**Hình ảnh kết quả sau khi đi qua thuật toán Canny**

`thresh_low` và `thresh_high` là hai tham số chúng ta cần điều chỉnh cho thuật toán Canny để hoạt động trong các tình huống cụ thể của hình ảnh, chẳng hạn như chất lượng của hình ảnh và độ rõ nét của các đường nét trong ảnh.

Ba hàm OpenCV được giới thiệu ở trên đã đủ cho chúng ta để xây dựng một luồng lọc vạch kẻ đường. Hãy viết hàm `find_lane_lines()`, nhận một hình ảnh làm đầu vào và tự động lọc vạch kẻ đường.

```python
def find_lane_lines(img):
    """Phát hiện vạch kẻ đường
    Hàm này sẽ nhận vào một hình ảnh màu, ở hệ màu BGR,
    trả ra hình ảnh các vạch kẻ đường đã được lọc
    """

    # Chuyển ảnh đã đọc sang ảnh xám
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Áp dụng bộ lọc Gaussian để loại bỏ bớt nhiễu.
    # Các bạn có thể thử nghiệm các bộ lọc khác tại đây,
    # như bộ lọc Median hoặc Bilateral.
    img_gauss = cv2.GaussianBlur(gray, (11, 11), 0)

    # Áp dụng bộ lọc Canny với 2 ngưỡng.
    # Các bạn có thể điều chỉnh 2 ngưỡng này và xem sự thay đổi
    # trong ảnh kết quả
    thresh_low = 150
    thresh_high = 200
    img_canny = cv2.Canny(img_gauss, thresh_low, thresh_high)

    # Trả về kết quả vạch kẻ đường
    return img_canny
```

Thử nghiệm thuật toán với các ảnh vạch kẻ đường:


```python
list_img_lines = []
for img in bgr_images:
    img_lines = find_lane_lines(img)
    list_img_lines.append(img_lines)

# Hiện toàn bộ kết quả
show_images(list_img_lines)
```

![](image18.png)


## 2. Điều khiển xe với thuật toán phát hiện vạch kẻ đường

Sau khi xây dựng bộ lọc đường đường, chúng ta áp dụng các bước khác để tìm góc điều khiển, tốc độ và điều khiển xe chạy trên giả lập.

### Biến đổi góc nhìn birdview

Thông thường, camera được đặt ở góc nhìn chéo so với bề mặt đường. Điều này gây khó khăn trong việc ước lượng và tính toán góc lái cho xe. Do đó, chúng ta sẽ thay đổi phối cảnh của hình ảnh từ góc chéo thành góc đứng vuông góc với bề mặt đường bằng cách sử dụng bức ảnh biến đổi tầm nhìn từ góc của chim (bird-view transform).

Một kỹ thuật thú vị trong thị giác máy tính cho phép chúng ta tìm ra các thông số biến đổi bằng việc tính toán sự thay đổi vị trí của 4 điểm theo các góc nhìn khác nhau. Sau đó, chúng ta sử dụng `cv2.warpPerspective()` để áp dụng biến đổi đó cho bất kỳ hình ảnh nào.

- Đọc thêm về  **perspective transform** tại: <https://www.pyimagesearch.com/2014/08/25/4-point-opencv-getperspective-transform-example/>.

- Các phép biến đổi hình học: https://phamdinhkhanh.github.io/2020/01/06/ImagePreprocessing.html#21-c%C3%A1c-bi%E1%BA%BFn-%C4%91%E1%BB%95i-h%C3%ACnh-h%E1%BB%8Dc


Dưới đây là mã cài đặt cho haàm biến đổi của chúng ta. Bạn có thể thử nghiệm với sổ tay Colab.s

``` python
def birdview_transform(img):
    IMAGE_H = 160
    IMAGE_W = 320

    # 4 điểm ảnh tương trên ảnh gốc
    src = np.float32([[0, IMAGE_H], [320, IMAGE_H], [0, IMAGE_H//3], [IMAGE_W, IMAGE_H//3]])

    # 4 điểm ảnh tương ứng trên ảnh biến đổi (góc nhìn từ trên xuống)
    dst = np.float32([[90, IMAGE_H], [230, IMAGE_H], [-10, 0], [IMAGE_W+10, 0]])

    M = cv2.getPerspectiveTransform(src, dst) # The transformation matrix
    warped_img = cv2.warpPerspective(img, M, (IMAGE_W, IMAGE_H)) # Image warping

    return warped_img

# Áp dụng các biến đổi birdview với hình ảnh kết quả của bộ lọc Canny
birdview_images = [birdview_transform(img) for img in list_img_lines]
show_images(birdview_images, cmap="gray")
```

![](image15.png)

Kết quả khi áp dụng biến đổi góc nhìn từ trên xuống. Chúng ta sẽ thấy các vạch kẻ đường song song khi xe ở giữa làn đường.



### Tìm điểm trái/phải
Sau khi có được một hình ảnh góc nhìn từ trên xuống, một phương pháp đơn giản để giúp xác định vị trí của xe so với làn đường là tìm hai điểm, một trên vạch kẻ đường bên trái và một trên vạch kẻ đường bên phải. Cuối cùng, chúng ta xem xét vị trí của điểm giữa của xe so với hai điểm đó để xác định sự lệch của xe khỏi làn đường và tính toán góc lái phù hợp.

![](image2.png)


Đoạn code bên dưới sẽ thực hiện xét một vạch kẻ ngang bức ảnh, cách mép trên ảnh một khoảng bằng 70% chiều cao ảnh. Tiếp đó, chúng ta tính vị trí tâm ảnh. Từ vị trí tâm này, ta duyệt sang 2 bên, tìm điểm ảnh có giá trị khác 0 đầu tiên, và coi đó là vị trí vạch kẻ đường bên trái và bên phải. Ta định nghĩa trước độ rộng đường lane_width = 100. Như vậy có thể dùng độ rộng này để tìm một trong hai điểm trái / phải khi chỉ nhìn thấy điểm còn lại.

```python
def find_left_right_points(image, draw=False):

    im_height, im_width = image.shape[:2]
    if draw: viz_img = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)

    # Vạch kẻ sử dụng để xác định tâm đường
    interested_line_y = int(im_height * 0.7)
    if draw: cv2.line(viz_img, (0, interested_line_y), (im_width, interested_line_y), (0, 0, 255), 2) 
    interested_line = image[interested_line_y, :]

    # Xác định điểm bên trái và bên phải
    left_point = -1
    right_point = -1
    lane_width = 100
    center = im_width // 2

    # Tìm điểm bên trái và bên phải bằng cách duyệt từ tâm ra
    for x in range(center, 0, -1):
        if interested_line[x] > 0:
            left_point = x
            break
    for x in range(center + 1, im_width):
        if interested_line[x] > 0:
            right_point = x
            break

    # Dự đoán điểm bên phải khi chỉ nhìn thấy điểm bên trái
    if left_point != -1 and right_point == -1:
        right_point = left_point + lane_width

    # Dự đoán điểm bên trái khi chỉ thấy điểm bên phải
    if right_point != -1 and left_point == -1:
        left_point = right_point - lane_width

    # Vẽ hai điểm trái / phải lên ảnh
    if draw: 
        if left_point != -1:
            viz_img = cv2.circle(viz_img, (left_point, interested_line_y), 7, (255,255,0), -1)
        if right_point != -1:
            viz_img = cv2.circle(viz_img, (right_point, interested_line_y), 7, (0,255,0), -1)

    return left_point, right_point, viz_img

viz_images = []
for img in birdview_images:
    left_point, right_point, viz_img = find_left_right_points(img, draw=True)
    viz_images.append(viz_img)

show_images(viz_images)
```

![](image14.png)

**Kết quả tìm điểm trái/phải được chiếu lên hình ảnh màu góc nhìn từ trên xuống.**

### Tính toán góc lái và tốc độ

Chúng ta sẽ viết thêm hàm `calculate_control_signal()` để tính toán tốc độ và góc lái cho xe dựa trên ảnh đầu vào. Sau bước `find_land_lines()` sử dụng Canny để tìm kiếm các vạch kẻ đường, hình ảnh sẽ được đưa qua `birdview_transform()` để thực hiện chuyển đổi birdview, lấy góc nhìn từ trên xuống. Tiếp đó là thuật toán tìm kiếm các điểm trái / phải của làn đường thông qua hàm `find_left_right_points()`. Từ hai điểm trái và phải,  chúng ta hoàn toàn có thể tính toán được độ lệch của xe so với mặt đường (coi camera ở chính giữa xe, thì tâm ảnh `im_center` cũng là tâm của xe):

```python
def calculate_control_signal(img):
    """Calculate speed and steering angle
    """

    # Find left/right points
    img_lines = find_lane_lines(img)
    img_birdview = birdview_transform(img_lines)
    left_point, right_point, viz_img = find_left_right_points(img_birdview, draw=True)

    # Show debug image
    cv2.imshow("Result", viz_img)
    cv2.waitKey(1)

    # Calculate speed and steering angle
    # The speed is fixed to 50% of the max speed
    # You can try to calculate speed from turning angle
    throttle = 0.5
    steering_angle = 0
    im_center = img.shape[1] // 2

    if left_point != -1 and right_point != -1:
        # Calculate the deviation
        center_point = (right_point + left_point) // 2
        center_diff =  im_center - center_point

        # Calculate steering angle
        # You can apply some advanced control algorithm here
        # For examples, PID
        steering_angle = - float(center_diff * 0.01)

    return throttle, steering_angle
```

### Test thực tế trên giả lập VIA


Sử dụng các giả lập đua xe để kiểm tra thuật toán được thực hiện nhiều bởi các công ty xe tự lái. Ở hướng dẫn này, chúng ta sẽ sử dụng gỉa lập được phát triển bởi nhóm VIA để kiểm tra hệ thống điều khiển xe sử dụng phát hiện làn đường đã xây dựng.

**Truy cập giả lập VIA**

[https://via-sim.makerviet.org](https://via-sim.makerviet.org)

![](image9.png)

Ngoài việc chọn các bản đồ đã thiết kế trước, chúng ta cũng có thể sử dụng giả lập VIA để thiết kế các bản đồ thử nghiệm xe tự lái với vạch kẻ đường và biển báo giao thông. Giả lập này có thể kết nối với máy chủ điều khiển để gửi hình ảnh từ xe và nhận lại thông số động cơ và góc lái.

Tôi cũng đã chuẩn bị một mã nguồn kết hợp tất cả các hàm mà chúng ta đã xây dựng từ đầu của bài hướng dẫn này để kết nối và điều khiển xe mô phỏng. Sử dụng:

```bash
git clone https://github.com/makerviet/hello-via
cd 04-Phat-hien-vach-ke-duong.ipynb
pip3 install -r requirements.txt
python3 drive.py
```

**Lưu ý:** Nếu bạn đã tải giả lập trước khi bắt đầu `drive.py`, bạn có thể cần làm mới trang web giả lập để xe chạy. Sử dụng Ctrl + R hoặc F5 để làm mới trang web và chọn lại bản đồ của bạn.

Youtube demo: [https://youtu.be/vn6H2_dRj6A](https://youtu.be/vn6H2_dRj6A) 

![](image12.gif)

