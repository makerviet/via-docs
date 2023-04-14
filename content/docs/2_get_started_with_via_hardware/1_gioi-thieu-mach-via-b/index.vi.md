---
version: 1
title: Giới thiệu về Mạch VIA B - Bánh Mì (2023 version)
weight: 10
---

**VIA B – Bánh Mì** là bo mạch phát triển phần cứng do MakerViet phát triển với mục đích phục vụ cho các dự án robotics và xe tự hành của các bạn trẻ Việt Nam. Mạch VIA B gồm module mạch điều khiển và module mạch công suất (Motor Shield) thiết kế để cắm chồng lên nhau.
Mạch điều khiển VIA và mạch công suất VIA được thiết kế với kích thước tiêu chuẩn “Arduino-size”, giúp bạn dễ dàng kết hợp với đa dạng các bo mạch phát triển, bo mạch chức năng khác như Arduino Uno, các mạch điều khiển động cơ khác,...
Mạch điều khiển VIA có chân kết nối với máy tính nhúng Pi, giúp bạn thực hiện được các dự án nâng cao hơn về IoT, robot hay xe tự hành.

### **Mạch điều khiển**

![Mạch điều khiển VIA](mach_dieu_khien.png "Mạch điều khiển VIA").

- Sử dụng vi điều khiển ESP32-WROVER-E 16MB.
- Sở hữu khả năng kết nối truyền dữ liệu qua WIFI, Bluetooth, Bluetooth LE và các ưu điểm của dòng vi điều khiển ESP32 (xem datasheet để biết thêm thông tin chi tiết)
- Có header tương thích với Raspberry PI.
- Tương thích ngược với Arduino UNO shield.
- 1 cổng UART, 1 cổng I2C, 1 cổng CAN
- Cổng USB Type-C dùng để nạp code, cấp nguồn và giao tiếp Serial
- Module Gyro-Accelerometer MPU6050 tích hợp trên mạch
- Module thời gian thực RTC DS1307
- Cổng cấp nguồn DC 12V (DC5.5x2.5MM)
- Mạch được tích hợp cơ chế bảo vệ chống ngược nguồn, chập nguồn.

### Mạch công suất (Motor Shield)

![Mạch công suất VIA](mach_cong_suat.png "Mạch công suất VIA").

- Sử dụng IC băm xung PCA9685, 4 IC cầu H TA6586
- 4 đầu ra động cơ DC 12v , 6 đầu ra động cơ Servo
- 1 cổng cấp nguồn DC 12V (jack KF-3.81-2 hoặc jack XT-60 tùy theo lô sản xuất)
- Các cổng giao tiếp mở rộng: 1 cổng I2C, 1 cổng SPI
- Header GPIO mở rộng: 6 chân GPIO, 2 chân cấp nguồn 5V-GND