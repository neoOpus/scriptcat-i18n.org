---
title: Truy cập bên ngoài (CLI và ứng dụng AI)
sidebar_label: Truy cập bên ngoài
---

**Truy cập bên ngoài** cho phép các chương trình dòng lệnh cục bộ và ứng dụng AI có khả năng
[MCP](https://modelcontextprotocol.io/) quản lý tập lệnh trong ScriptCat thông qua [sctl](https://github.com/scriptscat/sctl).

```text
AI client ── stdio MCP ──▶ sctl mcp ── local control API ──▶ sctl serve ── WebSocket ──▶ ScriptCat
CLI ────────────────────────────────────────────────────────▲
```

`sctl serve` là một daemon cục bộ riêng biệt mà bạn phải khởi động một cách tường minh. `sctl mcp` và các lệnh yêu cầu
không bao giờ tự động khởi động nó. Các chính sách của ScriptCat và giao diện xác nhận của trình duyệt luôn quyết định việc
tiết lộ mã nguồn hoặc ghi dữ liệu có được phép hay không; một chương trình bên ngoài không thể tự phê duyệt yêu cầu của mình.

:::warning Trình lắng nghe mặc định là cục bộ
sctl lắng nghe trên `127.0.0.1` theo mặc định. Nó chỉ lắng nghe trên giao diện khác khi `--listen-address` được truyền tường
minh. `ws://` không mã hóa lưu lượng nghiệp vụ và không có sự cách ly giữa các máy khách từ xa, vì vậy chỉ sử dụng địa chỉ
không mặc định trên mạng đáng tin cậy. Tiện ích mở rộng và daemon vẫn thiết lập một khóa dài hạn thông qua mã ghép nối dùng
một lần và sử dụng xác thực lẫn nhau trên các kết nối sau.
:::

## 1. Cài đặt sctl

Cài đặt phiên bản mới nhất bằng một lệnh — macOS và Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.sh | sh
```

hoặc Windows PowerShell:

```powershell
irm https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.ps1 | iex
```

Trình cài đặt tải xuống kho lưu trữ phiên bản có tên gạch nối `sctl-<version>-<os>-<arch>.<ext>` cho nền tảng của bạn,
xác minh sha256 của nó với `checksums.txt` từ cùng một phiên bản và cài đặt `sctl` vào `~/.local/bin` (macOS/Linux) hoặc
`%LOCALAPPDATA%\sctl\bin` (Windows). `SCTL_VERSION` khóa một phiên bản cụ thể; `SCTL_INSTALL_DIR` ghi đè thư mục cài đặt.
Nếu thư mục cài đặt không nằm trong `PATH` của bạn, trình cài đặt sẽ in gợi ý `PATH` chính xác cho nền tảng của bạn — nó
không bao giờ tự ý chỉnh sửa hồ sơ shell hoặc `PATH` người dùng của bạn.

sctl là một tệp thực thi duy nhất. Nếu [GitHub Releases](https://github.com/scriptscat/sctl/releases) có kho lưu trữ đã
phát hành cho nền tảng của bạn, bạn cũng có thể tải xuống và giải nén, sau đó đặt `sctl` (`sctl.exe` trên Windows) vào `PATH`.

```bash
sctl version
```

Bản dựng trực tiếp từ mã nguồn báo cáo `0.0.0-dev` để phân biệt với bản dựng phát hành có phiên bản, commit và siêu dữ liệu
thời gian biên dịch được chèn vào; điều này không ngăn nó kết nối với ScriptCat. Nếu không có phiên bản nào, các nhà đóng góp
có thể biên dịch nó từ [kho lưu trữ sctl](https://github.com/scriptscat/sctl).

## 2. Khởi động daemon và đăng ký

Việc đăng ký là một bước duy nhất. Sau đó, CLI và mọi máy khách MCP chia sẻ kênh tin cậy tiện ích-đến-daemon; chúng không
ghép nối riêng lẻ.

### 2.1 Chọn thư mục dữ liệu

Daemon, CLI và quy trình MCP phải sử dụng cùng một thư mục dữ liệu. Nó lưu trữ khóa ghép nối dài hạn, mã thông báo điều
khiển cục bộ và nhật ký. Chọn một đường dẫn tuyệt đối riêng tư của người dùng hiện tại:

```text
/absolute/path/to/sctl-data
```

Đặt cùng một biến môi trường cho mọi quy trình sctl:

```bash
export SCTL_DATA_DIR=/absolute/path/to/sctl-data
sctl serve
sctl status
sctl mcp
```

`--data-dir` tường minh được ưu tiên hơn biến môi trường.

Nếu cả `--data-dir` và `SCTL_DATA_DIR` đều không được đặt, sctl sử dụng thư mục dữ liệu ứng dụng mặc định theo người dùng
của nền tảng. Không đặt thư mục dữ liệu trong kho lưu trữ hoặc thư mục đồng bộ dùng chung và không bao giờ đưa `pairing.key`
hoặc `control.token` của nó cho mô hình AI.

### 2.2 Khởi động daemon

Chạy lệnh này trong một thiết bị đầu cuối và giữ cho quy trình hoạt động:

```bash
sctl serve
```

Địa chỉ mặc định là `ws://127.0.0.1:8643`. Daemon không bao giờ được tự động khởi động bởi `connect`, `status`, một lệnh
CLI khác hoặc `sctl mcp`. Để sử dụng lâu dài, hãy chạy lệnh trên với trình quản lý dịch vụ người dùng của hệ điều hành.

Để lắng nghe tường minh trên mọi giao diện mạng, hãy chạy:

```bash
sctl --listen-address 0.0.0.0:8643 serve
```

Trên máy chạy daemon, hãy truyền cùng `--listen-address` cho `connect`, `status`, các lệnh CLI khác và `sctl mcp`. Trong
cài đặt **địa chỉ sctl** của ScriptCat, hãy nhập một địa chỉ mà tiện ích mở rộng thực sự có thể truy cập, chẳng hạn như
`ws://192.168.1.10:8643`; không nhập `0.0.0.0`.

### 2.3 Bật và ghép nối trong ScriptCat

1. Mở **Cài đặt → Công cụ → Truy cập bên ngoài** trong ScriptCat và bật công tắc.
2. Xác nhận **địa chỉ sctl** khớp với daemon; thông thường giữ mặc định `ws://127.0.0.1:8643`.
3. Giữ `sctl serve` chạy và thực hiện trong một thiết bị đầu cuối khác:

   ```bash
   sctl connect
   ```

4. Nhập mã thiết bị đầu cuối gồm 8 ký tự trong hộp thoại «Đăng ký sctl».
5. Xác minh kết nối:

   ```bash
   sctl status
   ```

Trạng thái phải báo cáo một tiện ích mở rộng đã kết nối và hiển thị phiên bản daemon.

:::warning Mã ghép nối chỉ có trên thiết bị đầu cuối
Mã có dạng `A1B2-C3D4`, hết hạn sau 2 phút và chỉ hoạt động một lần. Nó không được gửi đến tiện ích mở rộng qua WebSocket.
Không bao giờ dán mã vào chat AI, issue, nhật ký hoặc cấu hình MCP; chạy lại `connect` nếu mã hết hạn.
:::

## 3. Quyền hạn và xác nhận {#permissions}

| Khả năng | Hành vi mặc định |
|---|---|
| Liệt kê tập lệnh và đọc siêu dữ liệu | Trả về trực tiếp |
| Đọc hoặc tìm kiếm mã nguồn tập lệnh | Tuân theo chính sách **đọc mã nguồn** |
| Cài đặt, chỉnh sửa, bật, tắt hoặc xóa tập lệnh | Tuân theo chính sách **ghi** |

Cả hai chính sách đều cung cấp "Yêu cầu phê duyệt" (mặc định) và "Cho phép trực tiếp".

Với "Yêu cầu phê duyệt", các yêu cầu sẽ mở một trang xác nhận trong trình duyệt. Bạn có thể từ chối, cho phép một lần hoặc
chọn "Cho phép cho phiên này". Các quyền trong phiên được khóa theo tập lệnh và loại thao tác, và bị xóa khi trình duyệt
khởi động lại, tiện ích mở rộng được tải lại hoặc Truy cập bên ngoài bị dừng. Một yêu cầu hết hạn sau 5 phút nếu không có
quyết định; việc ngắt kết nối của người yêu cầu hoặc `Ctrl-C` cũng làm mất hiệu lực của yêu cầu.

"Cho phép trực tiếp" bỏ qua trang xác nhận cho loại thao tác đó. Mã nguồn có thể chứa khóa API, cookie và các bí mật khác,
trong khi các thao tác ghi có thể thay đổi trực tiếp tập lệnh, vì vậy chỉ bật nó khi bạn chấp nhận rủi ro đó.

## 4. Sử dụng dòng lệnh

```bash
sctl get                         # Liệt kê tập lệnh
sctl get <uuid>                  # Đọc siêu dữ liệu
sctl get <uuid> -o source        # In toàn bộ mã nguồn
sctl get <uuid> -o source --lines 20-80
sctl grep <uuid> "fetch("         # Tìm kiếm mã nguồn theo ký tự
sctl grep <uuid> "pattern" -E    # Biểu thức chính quy
sctl install <url|file>
sctl edit <uuid> --replace OLD --with NEW
sctl enable <uuid>
sctl disable <uuid>
sctl delete <uuid>
sctl status
```

`grep` là tìm kiếm theo ký tự theo mặc định; `-E` bật biểu thức chính quy, `-i` bỏ qua chữ hoa/thường, `-C N` thêm ngữ cảnh
và `-m N` giới hạn số trùng khớp. Không có trùng khớp nào được coi là thành công và thoát với mã 0.

`edit` được neo theo nội dung, không bao giờ dựa trên số dòng. Mỗi `oldText` phải xuất hiện đúng một lần theo mặc định;
`--replace-all` thay thế mọi trùng khớp. Bạn cũng có thể truyền một mảng `{oldText,newText,replaceAll?}` bằng `-f <file>`.
Chỉ các bản chỉnh sửa mới được gửi đến tiện ích mở rộng; không cần đọc hoặc tải lên toàn bộ mã nguồn trước.

Các thao tác ghi và tiết lộ mã nguồn chờ quyết định của trình duyệt. Mã thoát của CLI:

| Mã thoát | Ý nghĩa |
|---|---|
| `0` | Được phê duyệt và thành công, hoặc một lệnh đọc hoàn thành bình thường |
| `1` | Người dùng từ chối yêu cầu |
| `2` | Yêu cầu hết hạn, bị hủy bằng `Ctrl-C` hoặc tiện ích mở rộng bị ngắt kết nối |
| `3` | Các lỗi khác như đối số, kết nối hoặc thiếu tập lệnh |

Chạy `sctl <command> --help` cho mọi tùy chọn.

## 5. Kết nối ứng dụng AI (MCP)

Trước tiên, hãy đảm bảo `sctl serve` đang chạy và `status` báo cáo một tiện ích mở rộng đã kết nối. Sau đó cấu hình máy
khách MCP để khởi chạy một quy trình `sctl mcp` riêng. Sử dụng đường dẫn tuyệt đối của tệp thực thi và dữ liệu trong các
máy khách GUI:

```json
{
  "mcpServers": {
    "scriptcat": {
      "command": "/absolute/path/to/sctl",
      "env": {
        "SCTL_DATA_DIR": "/absolute/path/to/sctl-data"
      },
      "args": [
        "mcp",
        "--name",
        "my-ai-client"
      ]
    }
  }
}
```

Nhiều ứng dụng GUI không mở rộng `~`, `$HOME` hoặc biểu thức shell. `--name` là nhãn kiểm toán, không phải danh tính được
xác thực hoặc ranh giới ủy quyền. Stdout của MCP được dành riêng cho các khung giao thức; không bọc sctl trong một tập lệnh
in biểu ngữ ra stdout.

Các công cụ hiện tại:

| Công cụ | Mục đích | Chính sách xác nhận |
|---|---|---|
| `scripts_list` | Liệt kê tóm tắt tập lệnh | Không |
| `scripts_metadata_get` | Đọc siêu dữ liệu của một tập lệnh | Không |
| `scripts_source_get` | Đọc mã nguồn theo uuid và cửa sổ dòng tùy chọn | Chính sách đọc mã nguồn |
| `scripts_source_grep` | Tìm kiếm mã nguồn và trả về các dòng trùng khớp | Chính sách đọc mã nguồn |
| `scripts_install_request` | Yêu cầu cài đặt tập lệnh | Chính sách ghi |
| `scripts_edit_request` | Yêu cầu chỉnh sửa theo nội dung | Chính sách ghi |
| `scripts_toggle_request` | Yêu cầu bật hoặc tắt | Chính sách ghi |
| `scripts_delete_request` | Yêu cầu xóa | Chính sách ghi |

## 6. Kiểm toán và thu hồi

- "Xem nhật ký kiểm toán" trong thẻ Truy cập bên ngoài mở trang nhật ký được lọc theo nguồn này.
- `sctl status` hiển thị phiên bản daemon, khả năng kết nối của tiện ích mở rộng và các sự kiện bảo mật gần đây; `-o json` trả về các sự kiện đầy đủ.
- "Dừng truy cập bên ngoài" ngắt kết nối, xóa trạng thái ghép nối phía tiện ích mở rộng và xóa các quyền trong phiên. Sau đó cần đăng ký lại.
- Để chỉ vô hiệu hóa một ứng dụng AI, hãy xóa sctl khỏi cấu hình MCP của ứng dụng đó; điều này không thu hồi quyền truy cập của CLI hoặc ứng dụng khác.

## 7. Xử lý sự cố {#troubleshooting}

**Không thể kết nối đến daemon**

Hãy chạy `sctl serve` trước. Các lệnh yêu cầu không bao giờ tự động khởi động daemon.

**Xác thực kênh điều khiển thất bại**

Xác nhận rằng `serve`, các lệnh CLI và quy trình MCP trỏ đến cùng một thư mục dữ liệu tuyệt đối. Kiểm tra cả `SCTL_DATA_DIR`
và mọi `--data-dir` tường minh, sau đó khởi động lại máy khách MCP.

**Trạng thái báo "Kết nối thất bại"**

Xác nhận daemon đang chạy, địa chỉ của tiện ích mở rộng khớp với daemon và phần mềm bảo mật cục bộ không chặn `127.0.0.1:8643`.

**Một lệnh không trả về kết quả**

Kiểm tra trình duyệt xem có trang xác nhận tiết lộ mã nguồn hoặc ghi dữ liệu không. Nhấn `Ctrl-C` để làm mất hiệu lực yêu cầu.

**Tìm nhật ký**

Nhật ký nằm trong `<data-dir>/logs/`. Nếu cả `--data-dir` và `SCTL_DATA_DIR` đều không được đặt, các giá trị mặc định là:

| Nền tảng | Thư mục nhật ký |
|---|---|
| macOS | `~/Library/Application Support/sctl/logs/` |
| Windows | `%LOCALAPPDATA%\sctl\logs\` |
| Linux | `~/.config/sctl/logs/` |
