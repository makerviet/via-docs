---
version: 0
title: Dữ liệu chính thức của dự án VIA - VIA Datasets 1.0
weight: 30
---

Dữ liệu luôn là một yếu tố quyết định khi phát triển các thuật toán và mô hình trong lĩnh vực trí tuệ nhân tạo AI. Nhận định được điều đó, nhóm VIA coi các bộ dữ liệu mở là một phần trọng tâm của dự án. VIA datasets 1.0 được đóng gói và ra mắt cộng đồng, bao gồm 2 bộ dữ liệu nhỏ:

- **VIA Traffic sign dataset** - Dữ liệu phát hiện biển báo cho xe tự hành mô hình
    + Là dữ liệu ảnh được chụp từ xe tự hành của cuộc thi Cuộc Đua Số 2020 - FPT.
    + 11095 ảnh đóng góp bởi 2 nhóm Goodgame và ICT.
    + 6 lớp dữ liệu biển: `stop`, `left`, `right`, `straight`, `no_left`, `no_right`.
- **VIA Lane segmentation dataset** - Dữ liệu phân đoạn vạch kẻ đường, lòng đường
    + Là dữ liệu ảnh được chụp từ xe tự hành của cuộc thi Cuộc Đua Số 2020 - FPT.
    + 7688 ảnh được thu thập và gán nhãn bởi nhóm Goodgame.
    + 3 lớp dữ liệu: `background` (nền), `road` (lòng đường), `lane_line` (vạch kẻ đường).

Bộ dữ liệu này sẽ là tiền đề để chúng tôi xây dựng các mô hình học sâu cho dự án VIA trong thời gian tới. Chúng tôi cũng đã public để cộng đồng tải về và sử dụng.

**Tải bộ dữ liệu này tại đây:** <https://github.com/makerhanoi/via-datasets/releases/tag/v1.0>.
