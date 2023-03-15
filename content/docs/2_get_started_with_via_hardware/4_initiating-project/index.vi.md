---
version: 0
title: "Dự án: Khởi tạo mạch VIA B"
weight: 40
draft: False
---

# **Kết nối mạch VIA B – Bánh Mì với máy tính**

Khi kết nối với máy tính, máy tính sẽ tự động tiến hành cài đặt driver cho mạch VIA B, sau khi cài đặt driver xong trên máy tính sẽ xuất hiện thiết bị *Silicon Labs CP210x USB to UART Bridge.*

***Đối với Windows***

- Sau khi cài đặt driver, mạch VIA B sẽ được gán với 1 cổng COM trên máy, điền bên cạnh tên thiết bị. Ví dụ: *Silicon Labs CP210x USB to UART Bridge (COM 3)*
- Để kiểm tra lại : Device Manager > Port (COM&LPT)
- Chú ý ghi nhớ tên cổng COM này cho mục c

***Đối với Linux***

Có thể kiểm tra bằng lệnh *lsusb* và lệnh *ls /dev/ttyUSB* hoặc ls /dev/ttyACM**

***Đối với MacOS***

- Cài đặt driver: [*https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers*](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)

***Sau khi cài driver***

·       *V*ào "System Preferences" -> "Security & Privacy"

·       Ở góc dưới cửa sổ sẽ có chữ "System software from developer "SiLabs" was blocked from loading."

·       Ấn nút "Allow"

·       Khởi động lại Mac

Sau khi hoàn thành Mac sẽ nhận cổng COM với tên “/dev/cu.SLAB_USBtoUART “

1. Cài đặt VIA B – Bánh Mì với Arduino
- Arduino là một nền tảng mã nguồn mở được sử dụng để xây dựng các dự án điện tử. Arduino bảng mạch Arduino và Arduino IDE.
- Arduino IDE (Arduino Integrated Development Environment) là một trình soạn thảo và biên dịch chương trình để nạp cho mạch Arduino.
- Hướng dẫn cài đặt ESP32 Arduino:

·       Mở **Arduino IDE > File > Preferences**

·       Chèn thêm đường link bên dưới tại phần **Additional Board Manager URLs:**

*https://dl.espressif.com/dl/package_esp32_index.json*

·       Chọn **Tool** > **Board** > **Boards Manager**

·       Tìm kiếm với từ khóa “esp32” , trong danh sách kết quả chọn “**ESP32 by Espressif Systems”** và nhấn **Install**

# Lập trình VIA B – Bánh Mì với Arduino

Khởi chạy phần mềm Arduino và thực hiện các bước sau:

- Mở File > Examples > Basics > Blink
- Tại mục Tools chọn Board > ESP32 Dev Module; Port > COM (là cổng COM máy tính nhận khi cắm mạch tại mục a).
- Verify và nạp code (dấu tick và mũi tên góc trên bên trái giao diện Arduino IDE):

> #define LED_BUILTTIN = 4; 

void setup() {
pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
delay(1000);                      // wait for a second
digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
delay(1000);                      // wait for a second
}
>