---
version: 0
title: "Dự án: Khởi tạo mạch VIA B"
weight: 40
draft: False
---

# Kết nối mạch VIA B – Bánh Mì với máy tính

Khi kết nối với máy tính, máy tính sẽ tự động tiến hành cài đặt driver cho mạch VIA B, sau khi cài đặt driver xong trên máy tính sẽ xuất hiện thiết bị *Silicon Labs CP210x USB to UART Bridge.

***Đối với Windows***
- Sau khi cài đặt driver, mạch VIA B sẽ được gán với 1 cổng COM trên máy, điền bên cạnh tên thiết bị. Ví dụ: *Silicon Labs CP210x USB to UART Bridge (COM 3)*
- Để kiểm tra, mở Device Manager > Port (COM&LPT)
- Chú ý ghi nhớ tên cổng COM này

***Đối với Linux***
Có thể kiểm tra bằng lệnh *lsusb* và lệnh *ls /dev/ttyUSB* hoặc ls /dev/ttyACM**

***Đối với MacOS***
- Vào "System Preferences" -> "Security & Privacy"
- Ở góc dưới cửa sổ sẽ có chữ "System software from developer "SiLabs" was blocked from loading."
- Ấn nút "Allow"
- Khởi động lại Mac
- Sau khi hoàn thành Mac sẽ nhận cổng COM với tên “/dev/cu.SLAB_USBtoUART “

# Cài đặt VIA B – Bánh Mì với Arduino
Do mạch VIA B sử dụng vi điều khiển ESP32, nên để lập trình cho mạch VIA bằng Arduino IDE, chúng ta cần cài đặt thêm ESP 32 qua Board Manager.
Hướng dẫn cài đặt ESP32 trên Arduino:
- Mở **Arduino IDE > File > Preferences**
- Chèn thêm đường link bên dưới tại phần **Additional Board Manager URLs:**
```https://dl.espressif.com/dl/package_esp32_index.json```
- Vào **Tool** > **Board** > **Boards Manager**
- Tìm kiếm với từ khóa “esp32” , trong danh sách kết quả chọn “**ESP32 by Espressif Systems”** và nhấn **Install**

# Sử dụng ví dụ mẫu Blink để thử lập trình và nạp code cho mạch VIA
Khởi chạy phần mềm Arduino và thực hiện các bước sau:

- Mở File > Examples > Basics > Blink
- Khai báo chân LED_BUILTIN là chân số 13
- Tại mục Tools chọn Board > ESP32 Dev Module; Port > COM (chọn cổng COM tương ứng đã tra cứu tại mục a).
- Verify và nạp code (dấu tick và mũi tên góc trên bên trái giao diện Arduino IDE):

```
#define LED_BUILTIN = 13; 

void setup() {
pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
delay(1000);                      // wait for a second
digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
delay(1000);                      // wait for a second
}
```