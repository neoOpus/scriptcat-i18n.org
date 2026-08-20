---
slug: /use/use
title: Bắt đầu nhanh
---

ScriptCat là một tiện ích mở rộng trình duyệt có thể thực thi tập lệnh người dùng, tương thích với các tập lệnh Tampermonkey và cung cấp nhiều tính năng hơn. Nếu bạn phát hiện lỗi hoặc có đề xuất, bạn có thể truy cập [Kho lưu trữ GitHub](https://github.com/scriptscat/scriptcat) để gửi phản hồi.

## Cài đặt tiện ích mở rộng

Bạn có thể cài đặt tiện ích mở rộng từ các cửa hàng tiện ích mở rộng sau:

| Trình duyệt   | Liên kết cửa hàng                                                                                                                                                                                                                          | Trạng thái     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Chrome        | [Phiên bản ổn định](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) [Phiên bản beta](https://chromewebstore.google.com/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB-beta/jaehimmlecjmebpekkipmpmbpfhdacom?authuser=0&hl=zh-CN) | ✅ Có sẵn       |
| Edge          | [Phiên bản ổn định](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) [Phiên bản beta](https://microsoftedge.microsoft.com/addons/detail/scriptcat-beta/nimmbghgpcjmeniofmpdfkofcedcjpfi)                      | ✅ Có sẵn       |
| Firefox       | [Phiên bản ổn định](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) [Phiên bản beta](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat-pre/)                                                                                             | ✅ MV2         |

### Trình duyệt khác

Nếu trình duyệt của bạn không có trong danh sách trên, bạn có thể tải xuống tệp `zip`/`crx` từ trang [Github Release](https://github.com/scriptscat/scriptcat/releases) và cài đặt thủ công.

### Cài đặt tiện ích mở rộng không đóng gói {#load-unpacked-extension-installation}

① Đầu tiên, tải xuống tệp `zip` từ trang [Github Release](https://github.com/scriptscat/scriptcat/releases) hoặc [Tải xuống cộng đồng](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html). Nếu là tệp `crx`, hãy đổi phần mở rộng của nó thành `zip`.

② Chuẩn bị một thư mục để lưu plugin và giải nén tệp zip ở trên vào thư mục đó. Sau khi giải nén, nó sẽ trông như thế này (**Lưu ý: không được xóa hoặc di chuyển thư mục này, nếu không tiện ích mở rộng sẽ không hoạt động bình thường**) ![download-zip](./use.assets/download-zip.webp)

③ Mở giao diện quản lý tiện ích mở rộng của trình duyệt để tải tiện ích mở rộng không đóng gói (tham khảo [Bật chế độ nhà phát triển để hỗ trợ manifest v3 ScriptCat](/docs/use/open-dev/) để bật chế độ nhà phát triển trước)

- 1. **Edge** ![edge-load-unpacked](./use.assets/edge-load-unpacked.webp)
- 2. **Chrome** ![chrome-load-unpacked](./use.assets/chrome-load-unpacked.webp)

④ Chọn thư mục đã tạo ở bước ② (sau khi tải xong, biểu tượng ScriptCat sẽ xuất hiện trong danh sách tiện ích mở rộng ở giao diện quản lý tiện ích mở rộng, và bạn cũng có thể thấy nó bằng cách nhấp vào nút tiện ích mở rộng ở góc trên bên phải thanh địa chỉ của trình duyệt)

- 1. **Edge** ![edge-load-unpacked-img](./use.assets/edge-load-unpacked-img.webp)
- 2. **Chrome** ![chrome-load-unpacked-img](./use.assets/chrome-load-unpacked-img.webp)

⑤ Nhấp vào biểu tượng ScriptCat ở góc trên bên phải, nhấp vào `┆` > Lấy tập lệnh ở góc trên bên phải của giao diện hiện ra, và bạn có thể đến trang tập lệnh để tìm kiếm và cài đặt tập lệnh.

Lưu ý: các tiện ích mở rộng được cài đặt theo cách này không thể tự động cập nhật. Nếu bạn cần cập nhật, hãy lặp lại các bước trên để cập nhật tiện ích mở rộng (thay thế tệp và tải lại một lần).


## Lấy tập lệnh

> Ngoài tập lệnh, bạn cũng có thể nhận một số thông tin và hướng dẫn về tập lệnh từ [Diễn đàn tiếng Trung về Tampermonkey](https://bbs.tampermonkey.net.cn/) và [Hướng dẫn phát triển tập lệnh](https://learn.scriptcat.org/).

### Trang tập lệnh ScriptCat

[Trang tập lệnh ScriptCat](https://scriptcat.org/) là trang tập lệnh của tiện ích mở rộng này, nơi bạn có thể xuất bản các tập lệnh bạn viết.

- Trang tập lệnh mới
- Tập lệnh nền/tập lệnh định kỳ
- Giao diện thân thiện với người dùng

### Tìm kiếm Userscript.Zone

[Tìm kiếm Userscript.Zone](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts) là một trang web mới cho phép tìm kiếm tập lệnh người dùng bằng cách nhập URL hoặc tên miền phù hợp.

- Nhiều tài nguyên tập lệnh
- Dễ dàng tìm thấy tập lệnh người dùng phù hợp
- Chỉ hiển thị tập lệnh người dùng từ các trang tập lệnh người dùng đã được đánh giá hoặc ít nhất là các trang có chức năng bình luận

### GreasyFork

[GreasyFork](https://greasyfork.org/) là một nền tảng được sử dụng rộng rãi để lưu trữ và chia sẻ tập lệnh người dùng, cho phép các nhà phát triển xuất bản và người dùng cài đặt các tập lệnh dựa trên trình duyệt giúp nâng cao hoặc sửa đổi chức năng của trang web. Trang web được tạo bởi Jason Barnabe và được biết đến với sự chú trọng vào bảo mật và minh bạch mã nguồn mở, cung cấp một bộ sưu tập lớn các tập lệnh để cải thiện trải nghiệm duyệt web.

Jason Barnabe cũng là người tạo ra tiện ích mở rộng trình duyệt Stylish. Tuy nhiên, [Stylish](https://userstyles.org/) đã được bán vào năm 2016 và hiện được điều hành bởi một công ty khác, không có sự tham gia trực tiếp của Jason Barnabe trong quá trình phát triển sau đó.

- Nhiều tài nguyên tập lệnh
- Có khả năng đồng bộ tập lệnh từ Github
- Mô hình [phát triển mã nguồn mở](https://github.com/JasonBarnabe/greasyfork) rất tích cực

### GitHub/Gist

Bạn có thể [tìm kiếm tài nguyên tập lệnh trong Github và Gist.](https://gist.github.com/search?l=JavaScript&o=desc&q="%3D%3DUserScript%3D%3D"&s=updated)

## Hướng dẫn làm quen

Sau khi cài đặt ScriptCat, việc mở bảng điều khiển sẽ tự động bắt đầu hướng dẫn làm quen (bạn cũng có thể mở lại bất cứ lúc nào từ "Trung tâm trợ giúp" ở thanh bên trái). Hướng dẫn bao gồm:

- [Cài đặt tập lệnh](/docs/use/script_installation/): cài đặt từ các chợ tập lệnh, bao gồm hỗ trợ [tập lệnh nền](/docs/dev/background/).
- Quản lý và thao tác: chỉnh sửa, chạy/dừng, [UserConfig](/docs/dev/config/).
- [Sao lưu](/docs/use/sync/) và [di chuyển từ trình quản lý khác](/docs/use/from-other/migrate-from-tampermonkey/).
- [Đồng bộ tập lệnh](/docs/use/sync/).
- [Đăng ký](/docs/dev/subscribe/).
