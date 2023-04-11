---
version: 1
title: Điều khiển động cơ servo với mạch VIA B
weight: 30
draft: False
---

# Sơ lược về động cơ servo

Servo là một hệ thống truyền động điều khiển hồi tiếp vòng kín, nhận tín hiệu và thực hiện một cách nhanh chóng và chính xác theo lệnh từ PLC. Bộ servo bao gồm 1 bộ điều khiển servo (servo drive), 1 [động cơ servo](https://dattech.com.vn/dong-co-servo/) và 1 encoder để phản hồi tín hiệu từ động cơ về bộ điều khiển. Servo được sử dụng để điều khiển vị trí chính xác, điều chỉnh mô-men phù hợp với các ứng dụng khác nhau và thay đổi tốc độ cực kỳ nhanh (đáp ứng ở ms).

Động cơ servo là một thành phần trong [hệ thống servo](https://dattech.com.vn/san-pham/servo/). Động cơ servo nhận tín hiệu từ bộ điều khiển và cung cấp lực cuyển động cần thiết cho các thiết bị máy móc khi vận hành với tốc độ và độ chính xác cực kỳ cao.

Có thể nói, servo là 1 loại động cơ có thể điều chỉnh để quay được 1 góc cụ thể.

# Nguyên lý hoạt động của động cơ servo

Chế độ hoạt động servo được hình thành bởi những hệ thống hồi tiếp vòng kín. Động cơ servo nhận một tín hiệu xung điện (PWM) từ bộ điều khiển để hoạt động và được kiểm soát bằng bộ mã hóa (encoder).

Khi động cơ vận hành thì vận tốc và vị trí sẽ được hồi tiếp về mạch điều khiển này thông qua bộ mã hóa (encoder). Khi đó bất kỳ lý do nào ngăn cản chuyển động và làm sai lệch tốc độ cũng như vị trí mong muốn, cơ cấu hồi tiếp sẽ phản hồi tín hiệu về bộ điều khiển. Từ tín hiệu phản hồi về, bộ điều khiển servo sẽ so sánh với tín hiệu lệnh và đưa ra điều chỉnh phù hợp, đảm bảo động cơ servo hoạt động đúng theo yêu cầu đạt được tốc độ và vị trí chính xác nhất.

# Kết nối động cơ servo với mạch VIA

[https://lh4.googleusercontent.com/G23A2K6UkwWVEJVGZX73yRa6ALEgirW3ANuZO4vH-nBHYAuDQQ849UPL2QxZ1GceBW4yuETRf1YpCCbhrNRiqtuI4WzOfH1MP1hHP99vOhTncEvrSmgMhw1qBZSKoM7-PZ5TV9MYDqfE00hJy8Aqiyk](https://lh4.googleusercontent.com/G23A2K6UkwWVEJVGZX73yRa6ALEgirW3ANuZO4vH-nBHYAuDQQ849UPL2QxZ1GceBW4yuETRf1YpCCbhrNRiqtuI4WzOfH1MP1hHP99vOhTncEvrSmgMhw1qBZSKoM7-PZ5TV9MYDqfE00hJy8Aqiyk)

# Các bước khởi tạo

Để điều khiển động cơ servo, chúng ta vẫn sử dụng thư viện Adafruit_PWMServoDriver và thực hiện các bước khởi tạo tương tự động cơ DC thường đã hướng dẫn ở bài trước. Lưu ý sử dụng xung PWM ở tần số 50Hz.

```cpp
pwm.setPWMFreq(50);
```

Cách điều khiển góc (đối với Servo 180) dựa theo độ rộng xung bật như hình bên

Đối với Servo 360 ta không điều khiển được góc mà chỉ điều khiển được tốc độ quay và chiều quay dựa vào độ rộng xung bật tương tự như servo 180

# Điều khiển servo sử dụng hàm băm xung PWM

Tính độ giá trị PWM dựa theo thời gian ví dụ ở góc 180 độ

```cpp
pwm_val = T_on/(Ts/4096) = 2/(20/4096) = 409.6
```

Vậy để set góc 180 độ ta cần sử dụng:

```cpp
pwm.setPWM(5, 0, 410); // chọn kênh servo số 5
```

# Điều khiển sử dụng hàm set thời gian

Đưa vào giá trị thời gian chính xác ở đơn vị micro giây

```cpp
pwm.writeMicroseconds(kênh PWM, microsec); //Microsec, thời gian xung ở mức cao trong 1 chu kì (trạng thái bật)
```

Ví dụ set góc 180 độ:

```cpp
pwm.writeMicroseconds(5, 2000); // chọn kênh servo số 5
```