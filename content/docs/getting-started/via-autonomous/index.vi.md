---
version: 1
title: "Làm quen với VIA Autonomous - Nền tảng robot tự hành với ROS 2.0"
description: ""
date: 2021-08-15T10:08:56+09:00
draft: false
collapsible: false
weight: 200
---

[Hello VIA!](/vi/docs/getting-started/hello-via/) là một ví dụ hết sức đơn giản điều khiển xe tự hành bám làn đường trên ngôn ngữ Python. Mã nguồn đã được tối giản hết sức có thể để các bạn học sinh, sinh viên hay người mới bắt đầu có thể bước đầu làm quen với bài toán xe tự hành một các dễ hàng. Tuy vậy, để xây dựng một hệ thống xe hay robot tự hành cần một thiết kế hoàn chỉnh hơn về phần cứng và phần mềm. Đó là lý do ngoài phần cứng Makerbot, chúng tôi phát triển VIA Autonomous - framework nguồn mở lập trình xe và robot tự lái tập trung vào những công nghệ lõi mới nhất về thị giác máy, học sâu hay phần mềm (ROS 2) để đưa VIA đến gần hơn các sản phẩm thực tế.

**Robot Operating System (ROS) là gì ?**

Robot operating system là một hệ thống phần mềm chuyên dụng để lập trình và điều khiển robot, bao gồm các công cụ để lập trình, hiển thị, tương tác trực tiếp với phần cứng, và kết nối cộng đồng robot trên toàn thế giới. Nói chung là nếu bạn muốn lập trình và điều khiển robot, sử dụng phần mềm ROS sẽ giúp quá trình thực hiện nhanh hơn và bớt đau khổ hơn rất nhiều. Một ưu điểm khác của ROS là có một kho đồ sộ các mã nguồn mở để tương tác với các phần cứng phổ biến như camera, LiDAR, motors...Ở VIA Autonomous, chúng tôi sử dụng phiên bản ROS 2 mới nhất để đảm bảo tính cập nhật cho các mã nguồn trong tương lai. ROS 2 là một sự kế thừa từ phiên bản ROS 1 đã rất nổi tiếng và phổ biến trên thế giới, bổ sung hỗ trợ tốt hơn cho các hệ thống phân tán, tăng tính ổn định hệ thống và tập trung hướng đến các sản phẩm công nghiệp.

Để tiếp cận ROS 2, các bạn có thể xem các tài liệu bên dưới:

- Tài liệu chính thức của ROS 2 Foxy: <https://docs.ros.org/en/foxy/index.html>.
- Hướng dẫn học ROS 2 từ Robotics Backend blog: <https://roboticsbackend.com/how-to-learn-ros2/>.

Các hướng dẫn của VIA về ROS 2 sẽ được cập nhật trong thời gian tới.

**VIA Autonomous hiện tại có gì?**

Hiện tại chúng tôi đã phát triển được phiên bản cơ bản đầu tiên của VIA Autonomous tại [Repo này](https://github.com/makerhanoi/via_autonomous). Kiến trúc cơ bản và 2 chức năng bám làn đường và nhận diện biển báo đã được phát triển để sử dụng với giả lập [VIA Simulation](https://github.com/makerhanoi/via-simulation-jeep).

{{< youtube d1vy-Sd1LJE >}}

**Làm quen với mã nguồn VIA Autonomous**

Kiến trúc mã nguồn chính của VIA Autonomous hiện tại như sau:

```
+ src
    + via_api: các APi độc lập để giao tiếp phần cứng và mô hình AI, không phụ thuộc vào ROS
        - drivers: các gói liên quan đến giao tiếp phần cứng, giả lập
        - perception: Các gói liên quan đến mô hình AI, thị giác
        - thirdparties: các thư viện bên thứ 3
    + via_nodes: các ROS node phát triển dựa trên các APIs từ via_api
        - control: các node liên quan đến điều khiển robot
        - drivers: các node liên quan đến giao tiếp phần cứng, giả lập 
        - perception: các node liên quan đến các mô hình AI
        - visualization: các node liên quan đến trực quan hoá
    + via_sdk: các gói dùng chung của hệ thồng
        - via_bringup: các cấu hình, launch file để khởi động hệ thống 
        - via_common: các thành phần dùng chung của via_autonomous
        - via_converters: các hàm chuyển đổi cho các dạng dữ liệu trong via_autonomous và các bản tin ROS 2
        - via_definitions: các định nghĩa kiểu dữ liệu của VIA, message, services, actions để giao tiếp trong môi trường ROS 2.
```

Để khởi chạy các ví dụ của VIA Autonomous vui lòng tham khảo README tại [repo chính thức của VIA Autonomous](https://github.com/makerhanoi/via_autonomous).