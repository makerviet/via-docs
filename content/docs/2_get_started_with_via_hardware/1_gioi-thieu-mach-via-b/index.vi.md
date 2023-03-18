---
version: 1
title: Giới thiệu về Mạch VIA B - Bánh Mì
weight: 10
---

**VIA B – Bánh Mì** là bo mạch phát triển phần cứng do MakerViet phát triển với mục đích phục vụ cho các dự án robotics và xe tự hành của các bạn trẻ Việt Nam. Mạch VIA B gồm module mạch điều khiển và module mạch công suất thiết kế để cắm chồng lên nhau với kích thước tiêu chuẩn “Arduino-size”, giúp tương thích với đa dạng các bo mạch phát triển, bo mạch chức năng và máy tính nhúng Pi…

### **Mạch điều khiển**

![Mạch điều khiển VIA](mach_dieu_khien.png "Mạch điều khiển VIA").

- Mạch có chức năng điều khiển hệ thống động, cơ cảm biến.
- Có khả năng kết nối truyền dữ liệu qua WIFI, BLE
- Nhỏ gọn, có header tương thích với Raspberry PI.
- Tương thích ngược với Arduino UNO shield.
- Ngoài ra, 1 cổng UART, 1 cổng I2C mở rộng.

### Mạch công suất

![Mạch công suất VIA](mach_cong_suat.png "Mạch công suất VIA").

- 4 đầu ra động cơ DC 5v , 6 đầu ra động cơ Servo 5-7V
- 1 cổng I2C, 1 cổng SPI
- Header mở rộng 6 chân GPIO