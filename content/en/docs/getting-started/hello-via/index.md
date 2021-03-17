---
title: Hello VIA! - Làm quen với VIA
weight: -10
---

Đây là dự án làm quen với VIA. Dự án này sẽ giúp các bạn làm quen với bài toán xe tự hành thông qua một ví dụ nhỏ về phát hiện vạch kẻ đường và dựa vào đó để điều khiển xe đi trên giả lập đơn giản. Hướng dẫn sẽ bắt đầu bằng các thử nghiệm với ảnh trên Notebook này, sau đó sẽ áp dụng những gì đã học được để điều khiển xe đi trên giả lập ngay trên máy tính của các bạn.

**Yêu cầu đầu vào:** Hướng dẫn này mặc định các bạn đã biết Python. Nếu chưa biết về ngôn ngữ này, các bạn có thể truy cập [trang sau](https://www.howkteam.vn/course/lap-trinh-python-co-ban-37) để học Python trước.

Các bạn nên xem và thực hành hướng dẫn này thông qua **Google Colab** tại link sau: <https://colab.research.google.com/drive/1w0Ed93bFXkyZygx3nhRGdfLVnvVIzUpl>.

## I. Giới thiệu về Google Colab

Hướng dẫn này được viết trên **Google Colab**, nền tảng miễn phí cho phép bạn viết và chạy các đoạn mã Python. Xen kẽ giữa các ô (cell) chứa code, các bạn có thể chèn thêm các văn bản với định dạng đẹp mắt, công thức toán, hay các hình ảnh. Không chỉ vậy, **Colab** có thể cung cấp GPU miễn phí để huấn luyện các mô hình học máy. Các bạn sẽ không cần mua những bộ máy tính đắt tiền để có thể bắt đầu với trí tuệ nhân tạo.

Hãy cùng thử nghiệm bằng cách ấn vào ô chứa code bên dưới và ấn **Command/Ctrl+Enter** trên bàn phím để chạy nó. Các bạn cũng có thể chạy một ô code bằng cách ấn vào nút chạy (hình mũi tên) ở bên trái ô đó.


```python
seconds_in_a_day = 24 * 60 * 60
seconds_in_a_day
```

    86400


Việc chỉnh sửa một ô code chỉ đơn giản là nhấp chuột vào ô chứa code và sửa như trong một chương trình chỉnh sửa thông thường.

### Thao tác với dữ liệu trên Colab

Việc thao tác với dữ liệu, trực quan hóa dữ liệu có thể được thực hiện với các module như matplotlib ngay trên chính Notebook của Colab. Ở ví dụ dưới, chúng ta sẽ sử dụng numpy để tạo một dải dữ liệu ngẫu nhiên, tiếp đó vẽ đồ thị với dải dữ liệu này bằng matplotlib.


```python
import numpy as np
from matplotlib import pyplot as plt

ys = 200 + np.random.randn(100)
x = [x for x in range(len(ys))]

plt.plot(x, ys, '-')
plt.fill_between(x, ys, 195, where=(ys > 195), facecolor='g', alpha=0.6)

plt.title("Sample Visualization")
plt.show()
```


    
![png](output_5_0.png)
    


Vậy là chúng ta đã làm quen với Colab thông qua một vài ví dụ. Để học thêm về cách viết trên file notebook này, cách kết nối với Google Drive, hay cách sử dụng GPU trên Colab để tăng tốc quá trình huấn luyện các mô hình AI, các bạn có thể tham khảo tại các link sau:

- https://colab.research.google.com/notebooks/intro.ipynb.
- https://trituenhantao.io/lap-trinh/lam-quen-voi-google-colab/.
- Hướng dẫn cài đặt VS Code trên Colab: https://aicurious.io/posts/su-dung-vs-code-tren-google-colab/.

Ở phần tiếp theo, chúng ta sẽ tiếp tục sử dụng Colab để thử nghiệm và xây dựng một thuật toán lọc vạch kẻ đường đơn giản. Từ việc nhận biết vị trí vạch kẻ đường, các xe tự lái có thể điều khiển xe đi đúng làn đường theo luật giao thông. Bắt tay vào xây dựng các thuật toán lọc vạch kẻ đường sẽ giúp chúng ta làm quen với một trong các mô-đun quan trọng nhất của một hệ thống xe tự hành.

## II. Thuật toán phát hiện vạch kẻ đường và ứng dụng điều hướng xe

Trong phần này, chúng ta sẽ xây dựng thuật toán phát hiện làn đường theo luồng dưới đây.

![Phát hiện làn đường](https://raw.githubusercontent.com/VNOpenAI/hello-via/master/data/detect-lane-lines.png)

Từ ảnh màu RGB thu được bằng camera đặt trước mũi xe, chúng ta chuyển chúng sang ảnh xám. Các bạn có thể lo lắng bước **Chuyển xám** này có thể làm mất nhiều thông tin màu sắc từ ảnh. Tuy vậy, chúng ta đang xây dựng một thuật toán phát hiện vạch kẻ đường bằng cách phát hiện cạnh (hay phần giao giữa các vật), do vậy chúng ta có thể tạm thời bỏ qua thông tin về màu sắc. Các bạn có thể tìm hiểu thêm về các không gian màu trong xử lý ảnh tại [đây](https://aicurious.io/posts/2018-09-19-anh-so-va-cac-khong-gian-mau-trong-xu-ly-anh/).

Tiếp đó, một thuật toán phát hiện cạnh hết sức phổ biến là **Canny** sẽ giúp chúng ta tìm ra vị trí phân tách giữa các vạch kẻ đường và những vùng xung quanh. Các bạn có thể tìm hiểu thêm về thuật toán **Canny** tại [đây](https://minhng.info/tutorials/xu-ly-anh-opencv-hien-thuc-canny-edge.html). Đừng lo lắng nếu bạn chưa hiểu hết về thuật toán này. Chúng ta có thể từ từ tìm hiểu về nó sau khi lần lượt học về xử lý ảnh cơ bản.

Sau khi tìm các cạnh bằng thuật toán **Canny**, thuật toán **birdview transform** (perspective transform) sẽ giúp ta biến đổi bức ảnh sao cho thu được góc nhìn vuông góc với mặt đường. Các bạn có thể tìm hiểu thêm về các phép biến đổi hình học cho ảnh tại [đây](https://phamdinhkhanh.github.io/2020/01/06/ImagePreprocessing.html#21-c%C3%A1c-bi%E1%BA%BFn-%C4%91%E1%BB%95i-h%C3%ACnh-h%E1%BB%8Dc).

Cuối cùng, ta có thể kẻ một đường thẳng (màu đỏ) cắt ngang ảnh. Khi đi từ điểm chính giữa đường thẳng này sang bên trái, điểm trắng đầu tiên có thể được coi là vị trí vạch kẻ bên trái. Tương tự, ta tìm được vị trí vạch kẻ bên phải. Khi có vị trí 2 vạch kẻ đường rồi, ta chỉ cần lấy trung điểm của đoạn thẳng tạo bởi 2 điểm này sẽ được vị trí tâm đường.




Tiếp đây, ta sẽ cùng code lại các thuật toán này. Các bạn có thể chưa cần hiểu hết mọi dòng code ở đây. Mục tiêu chính của bài học này là giúp các bạn làm quen với xử lý ảnh và ứng dụng vào việc phát hiện vạch kẻ đường. Chi tiết về các thuật toán, thư viện, các bạn có thể tìm hiểu dần thông qua các bài học về xử lý ảnh. Thư viện xử lý ảnh chủ yếu được sử dụng ở đây là **OpenCV**. Thư viện này cũng được sử dụng phổ biến trong rất nhiều các ứng dụng về thị giác máy tính, cả trong nghiên cứu và ứng dụng thực tế.

Nguồn học **OpenCV** mà chúng tôi thấy tâm đắc nhất là mục **Tutorials** trong tài liệu chính thống của thư viện này. Các bạn có thể truy cập tại [đây](https://docs.opencv.org/master/d9/df8/tutorial_root.html).

**Import các thư viện cần thiết:**

Các dòng dưới đây nhằm giúp chúng ta import các thư viện cần thiết để xây dựng các thuật toán trong notebook này. Thư viện **OpenCV** có thể được import với lệnh `import cv2` như trong ô bên dưới.


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


### 1. Tải dữ liệu mẫu

Trước hết cần tải về dữ liệu mẫu để thử nghiệm. Dữ liệu này bao gồm 10 ảnh chụp từ góc nhìn của xe mô hình giả lập. Chúng ta sẽ lập trình nhận dạng vạch kẻ đường từ các hình ảnh giả lập này. Lệnh `wget` bên dưới sẽ giúp chúng ta tải về tệp dữ liệu, tiếp đó lệnh `unzip` sẽ giúp giải nén tệp dữ liệu này.


```python
!wget https://github.com/VNOpenAI/hello-via/raw/master/data/lane-line-samples.zip
!unzip lane-line-samples.zip
```

    --2020-12-27 09:09:02--  https://github.com/VNOpenAI/hello-via/raw/master/data/lane-line-samples.zip
    Resolving github.com (github.com)... 140.82.121.3
    Connecting to github.com (github.com)|140.82.121.3|:443... connected.
    HTTP request sent, awaiting response... 302 Found
    Location: https://raw.githubusercontent.com/VNOpenAI/hello-via/master/data/lane-line-samples.zip [following]
    --2020-12-27 09:09:02--  https://raw.githubusercontent.com/VNOpenAI/hello-via/master/data/lane-line-samples.zip
    Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.0.133, 151.101.64.133, 151.101.128.133, ...
    Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.0.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 897846 (877K) [application/zip]
    Saving to: ‘lane-line-samples.zip.2’
    
    lane-line-samples.z 100%[===================>] 876.80K  --.-KB/s    in 0.05s   
    
    2020-12-27 09:09:02 (18.0 MB/s) - ‘lane-line-samples.zip.2’ saved [897846/897846]
    
    Archive:  lane-line-samples.zip
    replace 1.png? [y]es, [n]o, [A]ll, [N]one, [r]ename: A
      inflating: 1.png                   
      inflating: 10.png                  
      inflating: 2.png                   
      inflating: 3.png                   
      inflating: 4.png                   
      inflating: 5.png                   
      inflating: 6.png                   
      inflating: 7.png                   
      inflating: 8.png                   
      inflating: 9.png                   
    


```python
n_images = 10
image_names = ["{}.png".format(i) for i in range(1, n_images+1)]
```

### 2. Hiện ảnh

Hàm `show_images()` được chúng tôi viết sẵn để hiện ảnh trên notebook này, nó sẽ giúp chúng ta hiện nhiều ảnh cùng lúc trên file Notebook. Việc hiện ảnh trên các Notebook của Colab được thực hiện với hàm `plt.imshow()` từ thư viện matplotlib.


```python
def show_images(images, cmap="viridis"):
    column = 3
    row = int(math.ceil(len(images)/column))
    column, row
    plt.figure(figsize=(20, 20))
    for i, img in enumerate(images):
        plt.subplot(row,column,i+1)
        if cmap != "gray":
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        plt.imshow(img, cmap=cmap)
        plt.title(i)
```


```python
## Đọc tất cả ảnh vào biến bgr_images và hiện lên
bgr_images = [cv2.imread(name) for name in image_names]
show_images(bgr_images)
```


    
![png](output_19_0.png)
    


### 3. Chuyển sang hệ màu xám

Để chuyển đổi giữa các hệ màu trong **OpenCV**, ta dùng hàm `cv2.cvtColor(<ảnh đầu vào>, <mã chuyển màu>)`. Ví dụ để chuyển ảnh từ hệ màu BGR sang ảnh xám, ta dùng lệnh `cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)`. Ta sẽ cùng xây dựng hàm grayscale để chuyển ảnh màu sang ảnh xám trong ô bên dưới. Hãy điền code chuyển từ ảnh màu BGR sang ảnh xám vào các dòng giữa `### YOUR CODE HERE` và dòng `###` ngay dưới đó. Kết quả được gán vào biến `gray`.


```python
def grayscale(img):
    """Chuyển ảnh màu sang ảnh xám"""
    ### YOUR CODE HERE
    gray = # Sử dụng cv2.cvtColor() để chuyển img sang ảnh xám
    ###
    return gray
```


```python
gray_images = [grayscale(img) for img in bgr_images]
```


```python
show_images(gray_images, cmap="gray")
```


    
![png](output_24_0.png)
    


### 4. Lọc vạch kẻ đường bằng thuật toán phát hiện cạnh Canny

Sau khi thu được cảnh xám, ta sẽ tìm các cạnh (vị trí thay đổi đột ngột về độ xám, thường là ranh giới giữa các vật) sử dụng bộ lọc Canny: `cv2.Canny(<ảnh>, <ngưỡng dưới>, <ngưỡng trên>)`. Trước đó ta có thể sử dụng bộ lọc Gauss để làm mịn ảnh, tránh nhiễu ảnh hưởng tới bộ phát hiện cạnh Canny. Bộ lọc Gauss được triển khai với hàm `cv2.cv2.GaussianBlur()`.

Đọc thêm về bộ lọc Canny tại [đây](https://docs.opencv.org/master/da/d22/tutorial_py_canny.html) và sử dụng để phát hiện cạnh.

Ngoài bộ lọc Gauss, OpenCV còn hỗ trợ nhiều bộ lọc khác với các nhân khác nhau, phù hợp với nhiều loại nhiễu và ứng dụng khác nhau. Tìm hiểu thêm tại [đây](https://aicurious.io/posts/2018-09-29-loc-anh-image-filtering/).


```python
def gaussian_blur(img, kernel_size):
    """Làm mịn ảnh với bộ lọc Gauss"""
    return cv2.GaussianBlur(img, (kernel_size, kernel_size), 0)

def canny(img, low_threshold, high_threshold):
    """Dùng bộ lọc Canny để phát hiện cạnh"""

    # Lọc cạnh với Canny
    canny_img = cv2.Canny(img, low_threshold, high_threshold)

    ## Làm dày cạnh
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(3,3))
    canny_img = cv2.dilate(canny_img, kernel, iterations = 1)

    return canny_img
```

Ta sẽ thử bộ lọc Gauss và bộ phát hiện cạnh Canny vừa xây dựng với kích thước nhân (kernel_size) của bộ lọc Gauss là 11, các ngưỡng dưới-trên của Canny là 150 và 200.


```python
thresh_images = []
for img in gray_images:
    img = gaussian_blur(img, 11)
    edges = canny(img, 150, 200)
    thresh_images.append(edges)
```


```python
bshow_images(thresh_images, cmap="gray")
```


    
![png](output_30_0.png)
    


Như vậy, bộ lọc Canny đã giúp chúng ta lọc được tương đối rõ các vị trí vạch kẻ đường. Các bạn có thể thay đổi các tham số của bộ lọc Gauss hay các tham số của Canny và quan sát sự thay đổi của kết quả.

### 5. Áp dụng birdview transform nhằm tìm hướng nhìn vuông góc với mặt đất

Việc nhìn đường từ hướng xiên với mặt đường rất khó để tính toán góc quay phù hợp nhất cho xe. Ta sẽ thay đổi góc nhìn của ảnh từ hướng xiên tới hướng vuông góc với mặt đường bằng Birdview transform.

- Đọc thêm về Birdview transform cho bài toán này tại https://nikolasent.github.io/opencv/2017/05/07/Bird's-Eye-View-Transformation.html.

- Đọc thêm về 4 Point transform: https://www.pyimagesearch.com/2014/08/25/4-point-opencv-getperspective-transform-example/.

- Các phép biến đổi hình học: https://phamdinhkhanh.github.io/2020/01/06/ImagePreprocessing.html#21-c%C3%A1c-bi%E1%BA%BFn-%C4%91%E1%BB%95i-h%C3%ACnh-h%E1%BB%8Dc

**Minh hoạ birdview transform**
![Birdview transform](https://github.com/VNOpenAI/hello-via/raw/master/data/birdview.png)

Chúng ta sẽ áp dụng birdview transform trên ảnh cạnh Canny.


```python
def birdview_transform(img):
    IMAGE_H = 160
    IMAGE_W = 320
    src = np.float32([[0, IMAGE_H], [320, IMAGE_H], [0, IMAGE_H//3], [IMAGE_W, IMAGE_H//3]])
    dst = np.float32([[90, IMAGE_H], [230, IMAGE_H], [-10, 0], [IMAGE_W+10, 0]])
    M = cv2.getPerspectiveTransform(src, dst) # The transformation matrix
    warped_img = cv2.warpPerspective(img, M, (IMAGE_W, IMAGE_H)) # Image warping
    return warped_img

birdview_images = [birdview_transform(img) for img in thresh_images]
show_images(birdview_images, cmap="gray")
```


    
![png](output_34_0.png)
    


### 6. Tìm vạch kẻ đường bên trái và bên phải

Đoạn code bên dưới sẽ thực hiện xét một vạch kẻ ngang bức ảnh, cách mép trên ảnh một khoảng bằng 70% chiều cao ảnh (dòng 8).

Tiếp đó, chúng ta tính vị trí tâm ảnh (dòng 17). Từ vị trí tâm này, ta duyệt sang 2 bên, tìm điểm ảnh có giá trị khác 0 đầu tiên, và coi đó là vị trí vạch kẻ đường bên trái và bên phải (dòng 19-27).

Ta định nghĩa trước độ rộng đường `lane_width = 100`. Như vậy có thể dùng độ rộng này để tìm một trong hai điểm trái / phải khi chỉ nhìn thấy điểm còn lại.  Các bạn hãy dựa theo dòng 31-33 để hoàn thiện phần "Dự đoán điểm bên trái khi chỉ thấy điểm bên phải" nhé!


```python
def find_lane_lines(image, draw=False):

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
    
    # Dự đoán điểm trái và điểm phải nếu chỉ thấy 1 trong 2 điểm

    # Dự đoán điểm bên phải khi chỉ nhìn thấy điểm bên trái
    if left_point != -1 and right_point == -1:
        right_point = left_point + lane_width

    ### YOUR CODE HERE
    # Dự đoán điểm bên trái khi chỉ thấy điểm bên phải
    
    ###

    if left_point != -1:
        viz_img = cv2.circle(viz_img, (left_point, interested_line_y), 7, (255,255,0), -1)
    if right_point != -1:
        viz_img = cv2.circle(viz_img, (right_point, interested_line_y), 7, (0,255,0), -1)

    return left_point, right_point, viz_img

viz_images = []
for img in birdview_images:
    left_point, right_point, viz_img = find_lane_lines(img, draw=True)
    viz_images.append(viz_img)

show_images(viz_images)
```

## III. Áp dụng vào tính toán góc lái cho xe trên giả lập

Sau khi thử nghiệm các thuật toán như trên, trong phần này, ta sẽ triển khai các thuật toán đã xây dựng trên một giả lập để điều khiển xe đi trên đường cong. Các bạn tải giả lập và làm theo hướng dẫn phía dưới để chạy xe.

#### 1. Cài đặt môi trường

- Tải giả lập và giải nén: https://github.com/makerhanoi/via-simulation-jeep/releases/tag/v0.1-alpha.
    + Giả lập cho Windows: via-simulation-windows-x86_64-20210314.zip
    + Giả lập cho Linux: via-simulation-linux-x86_64-20210314.zip
    + Giả lập cho macOS: via-simulation-macos-x86_64-20210314.zip
- Clone hoặc tải mã nguồn điểu khiển xe tại https://github.com/makerhanoi/hello-via.
- Cài đặt Miniconda 3: https://docs.conda.io/en/latest/miniconda.html.
- Yêu cầu môi trường: Python 3.7

```
pip install -r requirements.txt
```


#### 2. Thử nghiệm điều khiển xe

##### 1. Chạy giả lập 

- Sau khi giải nén, chạy `Linux.x86_64` (Linux),  `VIA Simulation - Jeep.exe` (Windows) hoặc file chạy tương ứng cho macOS để mở giả lập.

##### 2. Chạy chương trình điều khiển xe

```
python drive.py
```

##### 3. Bấm `START` trong giả lập


##### Hướng dẫn tạo bản đồ mới trên VIA Simulator và chạy chế độ xe tự hành với mã nguồn trong dự án Hello VIA!

{{< youtube "BniOKSV1wUM" >}}