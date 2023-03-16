---
version: 1
title: Điều  khiển động cơ với mạch VIA B
weight: 20
draft: False
---

- **So luoc ve dong co (motor)**

[https://lh5.googleusercontent.com/VaALPO5O6k0smp5y0FH61gKlCxIbXy0QEBYvIyIzXLKEJ94SyYuVGZgyg149Vcyueboev8XiKhyJnumzYa3IuGmKkuHfyUt_MsJSf6qh7CRnR1ZoHGluxPrg-PRzTZHiSS6i2tzOVZ8XNQ8ig9Wz47o](https://lh5.googleusercontent.com/VaALPO5O6k0smp5y0FH61gKlCxIbXy0QEBYvIyIzXLKEJ94SyYuVGZgyg149Vcyueboev8XiKhyJnumzYa3IuGmKkuHfyUt_MsJSf6qh7CRnR1ZoHGluxPrg-PRzTZHiSS6i2tzOVZ8XNQ8ig9Wz47o)

Ở đây chúng ta sử dụng động cơ (Motor) giảm tốc.

Motor giảm tốc được định nghĩa là động cơ điện có tốc độ thấp, tốc độ đã giảm đi nhiều (có thể là 1/2, 1/3, 1/4, 1/5, 1/8, 1/10, 1/15,…) so với động cơ thông thường ở cùng công suất và số cực.

Motor giảm tốc tuy có tốc độ nhỏ hơn motor thường nhưng lại có momen lớn, có thể tải được với hiệu suất cao.

Motor giảm tốc được cấu tạo từ hai thành phần chính là:

- Động cơ điện
- Hộp giảm tốc

Động Cơ Giảm Tốc Trục D là loại motor kim loại sử dụng loại hộp giảm tốc bánh răng thép. Bền có độ chính xác cao.

- **Noi day motor voi board VIA B**

[https://lh3.googleusercontent.com/oaRxzNqAZs-mCAANZgL2PWZYlgkN-uMe5N5YB-R0icS4uiBlgw9DlifqpRauG0JlAL0wTP_yGAvJS2cO0P5Vs2xphVinV91Dy8BKmvC62erwwVWhcMcR_5WMvSEYNXJHYNQAStQkKYXbrbRF72wUWLI](https://lh3.googleusercontent.com/oaRxzNqAZs-mCAANZgL2PWZYlgkN-uMe5N5YB-R0icS4uiBlgw9DlifqpRauG0JlAL0wTP_yGAvJS2cO0P5Vs2xphVinV91Dy8BKmvC62erwwVWhcMcR_5WMvSEYNXJHYNQAStQkKYXbrbRF72wUWLI)

- **Nguyên lý điều khiển động cơ**

Điều khiển tốc độ motor bằng PWM là phương pháp thay đổi điện áp đặt vào động cơ. Người ta dùng mạch điện tử để thay đổi độ rộng của xung ngỏ ra mà không làm thay đổi tần số. Sự thay đổi độ rộng xung dẫn đến sự thay đổi của điện áp.

> /* 3 tham số chính: kênh pwm (chân1, chân2); giá trị bật; giá trị tắt.
VD: pwm.setPWM(kenh pwm, giá trị bật, giá trị tắt);
giá trị bật, tắt chạy từ 0-2^12 (4095)
giá trị bật quyết định tốc độ của động cơ, giá trị tắt = 4095 - giá trị bật
Đối với điều khiển động cơ DC
pwm.setPWM(chan1, 0, val) ;
pwm.setPWM(chan2, 4095, 0) ;
1 động cơ cần set 2 kênh điều khiển tốc độ.
1 động cơ sử dụng 2 kênh của PCA9685, trong đó 1 kênh luôn ở trạng thái tắt.
pwm.setPWM(chan2, 0, val) ;
pwm.setPWM(chan1, 4095, 0) ; // quay ngược chiều
val: giá trị dùng để điều khiển tốc độ động cơ, chạy trong khoảng 0-2^12
ví dụ motor chạy với 50% tốc độ, khi đó val = 2^12/2 = 2048
> 
> 
> pwm.setPWM(chan1, 0, 2048) ;
> pwm.setPWM(chan2, 4095, 0) ;
> 

- **Code điều khiển motor**

> 
> 
> 
> #include <wire.h> // thư viện i2c của arduino
> #include <adafruit_PWMServoDriver.h> // thư viện PCA9685
> 
> Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x40);
> 
> #define DC_Motor 8-15 // mỗi motor dùng 1 cặp gồm 2 cổng [8,9], [10,11], [12,13], [14,15]
> 
> // ví dụ: #define DC_Motor 8,99
> 
> void setPWM(int chan1, int chan2, bool state, uint16_t val) // set xung pwm
> {
> 
> if (state)  // state = 1 clockwise rotation
> 
> {
> pwm.setPWM(chan1, 0, 4095);
> pwm.setPWM(chan2, val, 4095 - val);
> }
> 
> else  // state = 0 couter-clockwise rotation
> {
> pwm.setPWM(chan2, 0, 4095);
> pwm.setPWM(chan1, val, 4095 - val);
> }
> 
> }
> 
> /* 3 tham số chính: kênh pwm (chân1, chân2); giá trị bật; giá trị tắt.
> 
> VD: pwm.setPWM(kenh pwm, giá trị bật, giá trị tắt);
> 
> giá trị bật, tắt chạy từ 0-2^12 (4095)
> 
> giá trị bật quyết định tốc độ của động cơ, giá trị tắt = 4095 - giá trị bật
> 
> Đối với điều khiển động cơ DC
> 
> pwm.setPWM(chan1, 0, val) ;
> 
> pwm.setPWM(chan2, 4095, 0) ;
> 
> 1 động cơ cần set 2 kênh điều khiển tốc độ.
> 
> 1 động cơ sử dụng 2 kênh của PCA9685, trong đó 1 kênh luôn ở trạng thái tắt.
> 
> pwm.setPWM(chan2, 0, val) ;
> 
> pwm.setPWM(chan1, 4095, 0) ; // quay ngược chiều
> 
> val: giá trị dùng để điều khiển tốc độ động cơ, chạy trong khoảng 0-2^12
> 
> ví dụ motor chạy với 50% tốc độ, khi đó val = 2^12/2 = 2048
> 
> pwm.setPWM(chan1, 0, 2048) ;
> 
> pwm.setPWM(chan2, 4095, 0) ;
> 
> */
> 
> pwm.begin(); // khởi tạo PCA9685
> pwm.setOscillatorFrequency(27000000); // cài đặt tần số dao động
> pwm.setPWMFreq(1000); /* cài đặt tần số PWM, tùy vào nhu cầu sử dụng mà giá trị trong                                                                                      khoảng 0-1600 HZ.*/
> Wire.setClock(400000); // cài đặt tốc độ giao tiếp I2C
>