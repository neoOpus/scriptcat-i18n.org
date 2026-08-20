---
title: Câu hỏi thường gặp
---

## Chế độ nhà phát triển / Quyền của tập lệnh người dùng

#### H: ScriptCat hiển thị "Chưa bật chế độ nhà phát triển" và tập lệnh không chạy?

Kể từ Chrome 120+ và các phiên bản mới hơn của Edge, trình duyệt yêu cầu người dùng bật thủ công quyền để tập lệnh có thể chạy. Vui lòng tham khảo [Bật hỗ trợ tập lệnh người dùng của trình duyệt](/docs/use/open-dev/) để biết hướng dẫn thiết lập.

Nếu đã bật nhưng cảnh báo vẫn tiếp tục, hãy thử khởi động lại trình duyệt hoặc tải lại tiện ích mở rộng.

## Tập lệnh không hoạt động

#### H: Đã cài đặt tập lệnh nhưng không có tác dụng?

1. **Chưa bật "Cho phép tập lệnh người dùng"** — Xem [Bật hỗ trợ tập lệnh người dùng của trình duyệt](/docs/use/open-dev/)
2. **Khởi động nguội** — Tập lệnh có thể không tải ngay khi trình duyệt mở lần đầu. Hãy thử làm mới trang
3. **Xung đột tiện ích mở rộng** — Trình chặn quảng cáo (ví dụ: uBlock Origin) có thể gây lỗi tập lệnh

#### H: Tập lệnh hoạt động trong Tampermonkey nhưng không hoạt động trong ScriptCat?

ScriptCat và Tampermonkey có một số khác biệt trong việc triển khai API. Vui lòng cập nhật lên phiên bản mới nhất. Nếu sự cố vẫn tiếp diễn, hãy gửi Issue trên [GitHub](https://github.com/scriptscat/scriptcat/issues).

## Sự cố đồng bộ hóa đám mây

> Để biết cách sử dụng đồng bộ cơ bản, hãy xem [Đồng bộ hóa và sao lưu](/docs/use/sync/).

#### H: Gặp sự cố với đồng bộ hóa OneDrive / Google Drive / WebDAV?

1. **Tập lệnh đã xóa xuất hiện lại** — Đảm bảo "đồng bộ hóa thao tác xóa" được bật trên tất cả các thiết bị

## Sự cố cài đặt tập lệnh

> Để biết cách cài đặt tập lệnh, hãy xem [Cài đặt tập lệnh](/docs/use/script_installation/).

## Sự cố ủy quyền Cookie

#### H: GM_cookie không lấy được cookie?

1. **Cửa sổ bật lên ủy quyền không xuất hiện** — Đảm bảo `GM_cookie` được khai báo đúng trong `@grant` của tập lệnh và sử dụng `@connect` để khai báo các miền cần truy cập

## Mất dữ liệu tập lệnh

#### H: Tất cả tập lệnh biến mất sau khi mở trình duyệt?

1. **Độ trễ khởi tạo** — ScriptCat có thể vẫn đang tải dữ liệu khi trình duyệt khởi động. Chờ vài giây hoặc khởi động lại trình duyệt
2. **Phần mềm dọn dẹp** — Các công cụ như 360 Security Guard hoặc CCleaner có thể xóa dữ liệu tiện ích mở rộng. Hãy loại trừ dữ liệu tiện ích mở rộng của trình duyệt trong cài đặt dọn dẹp
3. **Nên sao lưu thường xuyên** — Sử dụng tính năng xuất hoặc [đồng bộ hóa đám mây](/docs/use/sync/) để sao lưu tập lệnh và cài đặt thường xuyên
