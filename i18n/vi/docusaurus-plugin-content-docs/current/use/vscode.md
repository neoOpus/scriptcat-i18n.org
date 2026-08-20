---
title: Phát triển tập lệnh với VSCode
---

ScriptCat cung cấp một tiện ích mở rộng VSCode cho phép bạn viết tập lệnh người dùng ngay trong VSCode. Sau khi lưu, các thay đổi được đồng bộ tự động với ScriptCat trong trình duyệt — không cần sao chép dán thủ công, giúp nâng cao đáng kể hiệu quả phát triển.

## Điều kiện tiên quyết

Bạn cần cài đặt hai công cụ sau:

1. **Cài đặt tiện ích mở rộng ScriptCat trong trình duyệt** — Nếu chưa cài đặt, hãy làm theo hướng dẫn [Bắt đầu nhanh](/docs/use/use/)
2. **Cài đặt tiện ích mở rộng ScriptCat trong VSCode** — Tìm kiếm «[scriptcat-vscode](https://marketplace.visualstudio.com/items?itemName=CodFrm.scriptcat-vscode)» trong chợ tiện ích mở rộng của VSCode hoặc tải xuống từ [kho lưu trữ GitHub](https://github.com/scriptscat/scriptcat-vscode)

## Thiết lập kết nối

Sau khi cài đặt, bạn cần kết nối tiện ích mở rộng ScriptCat trong trình duyệt với VSCode:

1. Nhấp vào biểu tượng ScriptCat trong trình duyệt để mở bảng điều khiển quản lý
2. Đi tới **Công cụ > Công cụ dành cho nhà phát triển**
3. Tìm **Tự động kết nối với dịch vụ VSCode**, bật nó và nhấp vào **Kết nối**

Sau khi kết nối, một kênh thời gian thực được thiết lập giữa VSCode và ScriptCat.

## Đồng bộ tập lệnh

Sau khi kết nối được thiết lập, bạn có thể chọn một trong hai cách để đồng bộ tập lệnh:

### Tùy chọn 1: Chế độ tự động phát hiện (khuyến nghị)

1. Trong VSCode, nhấn `Ctrl + Shift + P` (`Cmd + Shift + P` trên Mac) để mở bảng lệnh
2. Nhập và chọn `scriptcat.autoTarget`
3. Từ đó trở đi, mỗi lần bạn mở hoặc lưu tệp `.user.js`, nó sẽ được đồng bộ tự động với ScriptCat

### Tùy chọn 2: Chế độ tập lệnh cụ thể

1. Trong VSCode, nhấn `Ctrl + Shift + P` (`Cmd + Shift + P` trên Mac) để mở bảng lệnh
2. Nhập và chọn `scriptcat.target`
3. Chỉ định đường dẫn của tệp tập lệnh cần đồng bộ

## Quy trình phát triển

Sau khi thiết lập, quy trình phát triển rất đơn giản:

1. Viết hoặc chỉnh sửa tập lệnh `.user.js` trong VSCode
2. Nhấn `Ctrl + S` để lưu tệp
3. Tập lệnh được đồng bộ tự động với ScriptCat trong trình duyệt
4. Chuyển sang trình duyệt và làm mới trang để xem kết quả

Toàn bộ quy trình không yêu cầu thao tác thủ công — lưu là có hiệu lực ngay lập tức.

## Câu hỏi thường gặp

### Nếu không kết nối được thì sao?

- Đảm bảo tiện ích mở rộng ScriptCat trong trình duyệt đang chạy
- Đảm bảo tiện ích mở rộng ScriptCat trong VSCode đã được cài đặt và bật
- Kiểm tra trạng thái kết nối trên trang «Công cụ dành cho nhà phát triển» trong bảng điều khiển quản lý ScriptCat

### Tập lệnh không được cập nhật sau khi lưu?

- Đảm bảo tên tệp kết thúc bằng `.user.js`
- Đảm bảo bạn đã chạy lệnh `scriptcat.autoTarget` hoặc `scriptcat.target`
- Kiểm tra bảng đầu ra của VSCode xem có thông báo lỗi nào không

### Tôi có cần kết nối lại sau khi khởi động lại VSCode không?

Nếu «Tự động kết nối với dịch vụ VSCode» được bật, VSCode sẽ tự động kết nối lại sau khi khởi động lại — không cần thao tác thủ công.
