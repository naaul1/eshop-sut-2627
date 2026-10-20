## **CS423 – CSC15003 – Software Testing (AI-augmented · 2026)** 

## **HOMEWORK – AI-FIRST EDITION (2026 v1.0)** 

**Nguyễn Thiện Nhân – 23120064** 

# **HW02 – Domain Testing** 

**_FR01 – Account registration_** 

## **_Domain Testing_** 

###  **Test cases** 

|Test ID|Input Data|Expected Output|Type|
|---|---|---|---|
|TC_01|Họ Tên: `Nguyen Van A`<br>Email:`newuser01@eshop.com` Mật khẩu:<br>`Pass123!` Xác nhận MK: `Pass123!`|Đăng ký thành công,<br>hệ thống lưu tài khoản<br>và chuyển hướng<br>người dùng sang màn<br>hình Đăng nhập<br>(`/login`).|Valid|
|TC_REG_02|- Họ Tên: Tran Thi B -<br>Email: newuser02@eshop.com - Mật<br>khẩu: SecurePassword2026 - Xác nhận<br>MK:SecurePassword2026<br>|Đăng ký thành công,<br>thông báo thành công<br>và chuyển hướng<br>sang /login.|Valid|
|TC_REG_03|- Họ Tên: "" (Để trống) -<br>Email: user03@eshop.com - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Họ Tên<br>không được để trống".|Invalid|
|TC_REG_04|- Họ Tên: " " (Khoảng trắng) -<br>Email: user04@eshop.com - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Họ Tên<br>không hợp lệ".|Invalid|
|TC_REG_05|- Họ Tên: Nguyen Van A - Email: "" (Để<br>trống) - Mật khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Email<br>khôngđược đểtrống".<br>|Invalid|
|TC_REG_06|- Họ Tên: Nguyen Van A -<br>Email: usereshop.com (Thiếu @) - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Email<br>không đúng định<br>dạng".|Invalid|
|TC_REG_07|- Họ Tên: Nguyen Van A -<br>Email: user@ (Thiếu domain) - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Email<br>không đúng định<br>dạng".<br>|Invalid|
|TC_REG_08|- Họ Tên: Nguyen Van A -<br>Email: @eshop.com (Thiếu local-part) -<br>Mật khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Email<br>không đúng định<br>dạng".<br>|Invalid|
|TC_REG_09|- Họ Tên: Nguyen Van A -<br>Email: user@eshop (Thiếu TLD) - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Email<br>không đúng định<br>dạng".|Invalid|
|TC_REG_10|- Họ Tên: Nguyen Van A - Email: user<br>name@eshop.com (Có space) - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Email<br>không đúng định<br>dạng".|Invalid|
|TC_REG_11|- Họ Tên: Nguyen Van A -<br>Email: existing_user@eshop.com - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Email đã<br>tồn tại trong hệ thống".|Invalid|



|TC_REG_12|- Họ Tên: Nguyen Van A -<br>Email: user12@eshop.com - Mật<br>khẩu: ""(Đểtrống)- Xácnhận MK: ""|Hệ thống từ chối đăng<br>ký, báo lỗi: "Mật khẩu<br>khôngđược đểtrống".<br>|Invalid|
|---|---|---|---|
|TC_REG_13|- Họ Tên: Nguyen Van A -<br>Email: user13@eshop.com - Mật<br>khẩu: Pass1@a (7 ký tự - Biên dưới) - Xác<br>nhận MK: Pass1@a|Hệ thống từ chối đăng<br>ký, báo lỗi: "Mật khẩu<br>phải dài tối thiểu 8 ký<br>tự".|Invalid|
|TC_REG_14|- Họ Tên: Nguyen Van A -<br>Email: user14@eshop.com - Mật<br>khẩu: pass@1234 (Thiếu chữ hoa) - Xác<br>nhận MK:pass@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Mật khẩu<br>phải chứa ít nhất 1 chữ<br>in hoa".<br>|Invalid|
|TC_REG_15|- Họ Tên: Nguyen Van A -<br>Email: user15@eshop.com - Mật<br>khẩu: PASS@1234 (Thiếu chữ thường) -<br>Xácnhận MK: PASS@1234|Hệ thống từ chối đăng<br>ký, báo lỗi: "Mật khẩu<br>phải chứa ít nhất 1 chữ<br>in thường".|Invalid|
|TC_REG_16|- Họ Tên: Nguyen Van A -<br>Email: user16@eshop.com - Mật<br>khẩu: Password@! (Thiếu số) - Xác nhận<br>MK: Password@!|Hệ thống từ chối đăng<br>ký, báo lỗi: "Mật khẩu<br>phải chứa ít nhất 1 chữ<br>số".<br>|Invalid|
|TC_REG_17|- Họ Tên: Nguyen Van A -<br>Email: user17@eshop.com - Mật<br>khẩu: Password123 (Thiếu ký tự đặc biệt) -<br>Xác nhận MK: Password123|Hệ thống từ chối đăng<br>ký, báo lỗi: *"Mật khẩu<br>phải chứa ít nhất 1 ký<br>tự đặc biệt (@, , !, %, ,<br>?, &)".|Invalid|
|TC_REG_18|- Họ Tên: Nguyen Van A -<br>Email: user18@eshop.com - Mật<br>khẩu: Password#123 (Dùng ký tự # ngoài<br>nhóm)- Xácnhận MK: Password#123|Hệ thống từ chối đăng<br>ký, báo lỗi: *"Ký tự đặc<br>biệt chỉ được thuộc<br>nhóm:@, ,!, %, ,?, &".|Invalid|
|TC_REG_19|- Họ Tên: Nguyen Van A -<br>Email: user19@eshop.com - Mật<br>khẩu: Test@1234 - Xác nhận MK: "" (Để<br>trống)|Hệ thống từ chối đăng<br>ký, báo lỗi: "Vui lòng<br>xác nhận mật khẩu".|Invalid|
|TC_REG_20|- Họ Tên: Nguyen Van A -<br>Email: user20@eshop.com - Mật<br>khẩu: Test@1234 - Xác nhận<br>MK: Test@12345 (Khôngkhớp)|Hệ thống từ chối đăng<br>ký, báo lỗi: "Xác nhận<br>mật khẩu không khớp<br>với mậtkhẩu".|Invalid|



##  **Explaination** 

### **Bước 1: Trích xuất các biến đầu vào và xác định ràng buộc nghiệp vụ** 

- Cách thực hiện: Đọc đặc tả FR-01 và lập danh sách tất cả các tham số mà người dùng có thể gửi lên hệ thống: 

1. `name`: Kiểu chuỗi, bắt buộc. 

2. `email`: Kiểu chuỗi, bắt buộc, tuân thủ định dạng RFC, tính duy nhất trong CSDL. 

3. `password`: Kiểu chuỗi bí mật, bắt buộc, tối thiểu 8 ký tự, phối hợp 4 nhóm ký tự. 

4. `confirm_password`: Kiểu chuỗi, bắt buộc, quan hệ phụ thuộc vào `password`. 

### **Bước 2: Phân tách Phân vùng tương đương (Equivalence Partitioning)** 

Với mỗi biến, ta phân chia thành 2 nhóm phân vùng độc lập: 

- Valid Partitions (Miền hợp lệ - VP): Tập hợp các giá trị đáp ứng hoàn toàn mọi quy tắc nghiệp vụ. Hệ thống bắt buộc phải xử lý thành công (Happy Path). 

- Invalid Partitions (Miền bất hợp lệ - IP): Tập hợp các giá trị vi phạm ít nhất một điều kiện nghiệp vụ. Hệ thống bắt buộc phải chặn lại và hiển thị thông báo lỗi tương ứng. 

- *Nguyên tắc chia nhỏ (Granularity):* Không gộp chung các nguyên nhân lỗi. Ví dụ với trường `email`, lỗi "thiếu @" (`IP2.2`) và lỗi "email trùng lặp trong DB" (`IP2.7`) thuộc về hai miền lỗi khác nhau (lỗi cú pháp vs. lỗi tính duy nhất dữ liệu) nên phải tách thành 2 phân vùng riêng biệt. 

### **Bước 3: Thiết lập ma trận kết hợp theo nguyên tắc "Đơn biến lỗi" (Single Fault Assumption)** 

Khi kết hợp các phân vùng của nhiều biến vào một kịch bản kiểm thử, sai lầm phổ biến nhất là đưa nhiều giá trị lỗi vào cùng một test case. Điều này dẫn đến Fault Masking (Hiện tượng lỗi che khuất lỗi) — tức là nếu Email sai, hệ thống báo lỗi Email và dừng lại ngay, ta sẽ không thể biết logic kiểm tra Password có hoạt động hay không. 

- Quy tắc giải quyết: 

- Test Case hợp lệ: Kết hợp các phân vùng hợp lệ của tất cả các biến 

- Test Case không hợp lệ: Tại mỗi thời điểm, chỉ cho phép DUY NHẤT 1 biến mang giá trị Invalid, toàn bộ các biến còn lại phải giữ ở giá trị Valid chuẩn (Baseline Values 

### **Bước 4: Chuyển đổi thành Test Cases có thể thực thi** 

- Chọn một giá trị đại diện cụ thể (Concrete Value) cho mỗi phân vùng. 

- Gán Test ID, dữ liệu đầu vào cụ thể, và kết quả mong đợi (Expected Output) rõ ràng cho từng trường hợp. 

## **_Boundary Value Analysis_** 

##  **Test cases** 

|TestID|Field|BoundaryPoint|InputData|ExpectedResult|Type|
|---|---|---|---|---|---|
|TC_BVA_01|password|Min - 1 (7 ký tự)|Ab1@xyz (7 ký tự, đủ<br>4 nhóm)|Hệ thống từ<br>chối, báo<br>lỗi: "Mật khẩu<br>phải dài tối thiểu<br>8ký tự".<br>|Invalid|
|TC_BVA_02|password|Min (8 ký tự)|Pass123! (8 ký tự, đủ<br>4 nhóm)|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_03|password|Min + 1 (9 ký tự)|Pass123!a (9 ký tự, đủ<br>4 nhóm)|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_04|password|Max - 1 (254 ký<br>tự)|Chuỗi 254 ký<br>tự: "Pass123!" +<br>"a"*246|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.<br>|Valid|
|TC_BVA_05|password|Max (255 ký tự)|Chuỗi 255 ký<br>tự: "Pass123!" +<br>"a"*247|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.<br>|Valid|
|TC_BVA_06|password|Max + 1 (256 ký<br>tự)|Chuỗi 256 ký<br>tự: "Pass123!" +<br>"a"*248|Hệ thống từ<br>chối hoặc cắt<br>chuỗi, báo<br>lỗi: "Mật khẩu<br>không được<br>vượt quá 255 ký<br>tự".<br>|Invalid|
|TC_BVA_07|password|Chữ hoa = 0<br>(Min-1)|password123! (0 chữ<br>hoa)|Hệ thống từ<br>chối, báo|Invalid|



|||||lỗi: "Mật khẩu<br>phải chứa ít<br>nhất 1 chữ in<br>hoa".<br>||
|---|---|---|---|---|---|
|TC_BVA_08|password|Chữ hoa = 1<br>(Min)|Password123! (Đúng<br>1 chữ hoa 'P')|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_09|password|Chữ hoa = 2<br>(Min+1)|PASsword123! (Có 2<br>chữ hoa 'P', 'A')|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_10|password|Chữ thường = 0<br>(Min-1)|PASS1234! (0 chữ<br>thường)|Hệ thống từ<br>chối, báo<br>lỗi: "Mật khẩu<br>phải chứa ít<br>nhất 1 chữ in<br>thường".|Invalid|
|TC_BVA_11|password|Chữ thường = 1<br>(Min)|PASSa123! (Đúng 1<br>chữ thường 'a')|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_12|password|Chữ số = 0<br>(Min-1)|Password@! (0 chữ<br>số)|Hệ thống từ<br>chối, báo<br>lỗi: "Mật khẩu<br>phải chứa ít<br>nhất1chữsố".|Invalid|
|TC_BVA_13|password|Chữ số = 1<br>(Min)|Password@1 (Đúng 1<br>chữ số '1')|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_14|password|Ký tự đặc biệt =<br>0 (Min-1)|Password123 (0 ký tự<br>đặc biệt)|Hệ thống từ<br>chối, báo lỗi:<br>*"Mật khẩu phải<br>chứa ít nhất 1<br>ký tự đặc biệt<br>(@, , !, %, , ?,<br>&)".|Invalid|
|TC_BVA_15|password|Ký tự đặc biệt =<br>1 (Min)|Password123@ (Đúng<br>1 ký tự '@')|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_16|name|Min - 1 (0 ký tự)|"" (Chuỗi rỗng)|Hệ thống từ<br>chối, báo<br>lỗi: "Họ Tên<br>không được để<br>trống"|Invalid|
|TC_BVA_17|name|Min (1 ký tự)|"A"|.<br>Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_18|name|Min + 1 (2 ký tự)|"An"|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_19|name|Max - 1 (254 ký<br>tự)|Chuỗi 254 ký<br>tự "A"*254|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công|Valid|
|TC_BVA_20|name|Max (255 ký tự)|Chuỗi 255 ký<br>tự "A"*255|.<br>Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công|Valid|
|TC_BVA_21|name|Max + 1 (256 ký<br>tự)|Chuỗi 256 ký<br>tự "A"*256|.<br>Hệ thống từ<br>chối, báo<br>lỗi: "Họ Tên<br>không được<br>vượt quá 255 ký<br>tự".|Invalid|



|TC_BVA_22|email|Local-part: Max<br>(64 ký tự)|Local 64 ký tự: "a"*64<br>+ "@eshop.com"|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|---|---|---|---|---|---|
|TC_BVA_23|email|Local-part:<br>Max+1 (65 ký<br>tự)|Local 65 ký tự: "a"*65<br>+ "@eshop.com"|Hệ thống từ<br>chối, báo<br>lỗi: "Email vượt<br>quá độ dài quy<br>định".|Invalid|
|TC_BVA_24|email|Tổng email:<br>Max (254 ký tự)|Chuỗi 254 ký tự hợp<br>lệ dạng: "a"*64 + "@"<br>+ "b"*185 + ".com"|Hệ thống chấp<br>nhận, đăng ký<br>tài khoản thành<br>công.|Valid|
|TC_BVA_25|email|Tổng email:<br>Max+1 (255 ký<br>tự)|Chuỗi 255 ký tự<br>dạng: "a"*64 + "@" +<br>"b"*186 + ".com"|Hệ thống từ<br>chối, báo<br>lỗi: "Email vượt<br>quá độ dài tối<br>đa chophép".|Invalid|



 **Explaination** 

## **Bước 1: Nhận diện các thuộc tính có thể đo lường thứ tự** 

Không phải biến nào cũng áp dụng BVA. BVA chỉ áp dụng cho các biến có giá trị liên tục, rời rạc có thứ tự, hoặc độ dài đo đếm được. 

- Độ dài chuỗi ký tự của trường `password`, `name`, `email`. 

- Số lượng đếm các ký tự đặc biệt, chữ hoa, chữ thường, số trong chuỗi. 

**Bước 2: Xác định Biên tường minh (Explicit) và Biên ngầm định (Implicit)** 

- Biên tường minh (Explicit Boundary): Được ghi rõ trong tài liệu yêu cầu. 

- Ví dụ: Mật khẩu từ 8 ký tự trở lên => Min = 8. Chứa ít nhất 1 chữ hoa => Min(uppercase) = 1 

- Biên ngầm định (Implicit Boundary): Xuất phát từ hạ tầng kỹ thuật (Database schema, HTTP payload, RFC standards): 

- Cột cơ sở dữ liệu `VARCHAR(255)` =>Max = 255. 

- Chuẩn RFC 5321 cho Email: Local-part <= 64 ký tự, tổng độ dài Email <= 254 ký tự. 

## **Bước 3: Lựa chọn mô hình mốc biên: 2-Value BVA vs. 3-Value BVA** 

Tùy thuộc vào mức độ rủi ro (Risk-level) của tính năng để chọn mô hình: 

1. Chuẩn 2-value BVA: 

- Gồm 2 điểm: On-point (ngay trên đường biên) và Off-point (điểm gần nhất nằm phía ngoài miền hợp lệ). 

- Ví dụ với điều kiện Length >= 8 

- On-point = `8` (Valid) 

- Off-point = `7` (Invalid) 

- *Đánh giá:* Tiết kiệm thời gian, nhưng nếu lập trình viên viết code sai thành `length > 8`, thì test case 8 ký tự bị Fail, nhưng ta không biết khi `length = 9` thì hệ thống có chạy đúng hay không. 

2. Chuẩn 3-value BVA (Phương pháp chúng ta đã áp dụng): 

- Gồm 3 điểm liên tiếp: Boundary - 1, Boundary, Boundary + 1. 

- Với biên dưới Min = 8: 

- Min - 1 = 7: Điểm Invalid sát biên (phải bị từ chối). 

- Min = 8: Điểm Valid tối thiểu (phải được chấp nhận). 

- Min + 1 = 9: Điểm Valid an toàn (phải được chấp nhận). 

- Với biên trên Max = 255: 

- Max - 1 = 254: Điểm Valid cận trên. 

- Max = 255: Điểm Valid tối đa. 

- Max + 1 = 256: Điểm Invalid vượt ngưỡng (phải bị chặn để chống tràn bộ đệm). 

- Đánh giá: Bắt trọn vẹn mọi lỗi Off-by-one của lập trình viên, phù hợp với các chức năng nhạy cảm như Xác thực / Mật khẩu. 

## **Bước 4: Thiết kế dữ liệu thử nghiệm tại các điểm biên** 

- Khi kiểm tra biên độ dài, chuỗi thử nghiệm phải được xây dựng sao cho thỏa mãn tất cả các điều kiện khác để tránh bị che khuất lỗi. 

- *Ví dụ:* Khi kiểm tra biên Min - 1 = 7 ký tự của mật khẩu, chuỗi `Ab1@xyz` (7 ký tự) bắt buộc phải có đủ 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt. Nhờ đó, nếu hệ thống từ chối, ta biết chắc chắn nguyên nhân là do độ dài chứ không phải do thiếu loại ký tự. 

### **_AI Gap Analysis_** 

Đã kiểm tra, crosscheck và xác nhận AI Gemini đã cover rất tốt với các test case, không lọt bug. 

**_FR07 – Shopping cart_** 

## **_Domain Testing_** 

##  **Test cases** 

|Test ID<br>Mô tả|Input Data|Expected Output|Type|
|---|---|---|---|



|TC-FR07-001|Thêm 1 SP hợp lệ<br>vào giỏ trống|Đăng nhập → Thêm SP "iPhone 15<br>Pro Max" (id=1, price=30.000.000₫),<br>quantity=1|Giỏ hàng hiển thị 1<br>dòng: Sản<br>phẩm="iPhone 15 Pro<br>Max", Đơn<br>giá=30.000.000₫, Số<br>lượng=1, Thành<br>tiền=30.000.000₫.<br>Nhãn Tổng cộng =<br>30.000.000₫|Valid|
|---|---|---|---|---|
|TC-FR07-002|Thêm 2 SP khác<br>nhau vào giỏ|Đăng nhập → Thêm "iPhone 15 Pro<br>Max" (qty=1) + "Tai nghe AirPods Pro<br>2"(id=4, price=6.000.000₫, qty=1)|Giỏ hàng hiển thị 2<br>dòng riêng biệt. Tổng<br>cộng=36.000.000₫<br>ể|Valid|
|TC-FR07-003|Hiển thị giỏ hàng<br>trống|Đăng nhập → Mở trang giỏ hàng khi<br>chưa thêm gì|Hin thị hình minh họa<br>(illustration) + thông<br>báo "Giỏ hàng của<br>bạn đang trống" + nút<br>"Tiếp tụcmua sắm"<br>|Valid|
|TC-FR07-004|Thêm cùng 1 SP<br>hai lần → gộp<br>quantity|Đăng nhập → Thêm "iPhone" qty=1 →<br>Thêm "iPhone" qty=1 lần nữa|Giỏ chỉ hiển thị 1<br>dòng với quantity=2,<br>Thành tiền =<br>60.000.000₫ (không<br>tạodòngmới)|Valid|
|TC-FR07-005|Xóa SP với dialog<br>xác nhận → Chấp<br>nhận|Đăng nhập → Thêm 1 SP → Nhấn<br>"Xóa" → Dialog xác nhận xuất hiện →<br>NhấnOK|<br>SP bị xóa khỏi giỏ, giỏ<br>trống, hiển thị empty<br>state|Valid|
|TC-FR07-006|Xóa SP với dialog<br>xác nhận → Hủy<br>bỏ|Đăng nhập → Thêm 1 SP → Nhấn<br>"Xóa" → Dialog xác nhận → Nhấn<br>Cancel|SP vẫn ở trong giỏ,<br>không bị xóa<br>|Valid|
|TC-FR07-007|Thêm SP với<br>quantity = 0|Đăng nhập → Trang chi tiết SP →<br>Nhập quantity=0 → "Thêm vào giỏ"|Hệ thống từ chối hoặc<br>tự điều chỉnh lên<br>min=1. Không thêm<br>SP vớiqty=0|Invalid|
|TC-FR07-008|Thêm SP với<br>quantity âm|Đăng nhập → Nhập quantity=-1 →<br>"Thêm vào giỏ"|Hệ thống từ chối hoặc<br>hiển thị lỗi. Không<br>thêmSP vớiqty âm<br>|Invalid|
|TC-FR07-009|Thêm SP với<br>quantity thập phân|Đăng nhập → Nhập quantity=1.5 →<br>"Thêm vào giỏ"|Hệ thống làm tròn<br>xuống (1) hoặc báo<br>lỗi. Chỉ chấp nhận số<br>nguyên<br>|Invalid|
|TC-FR07-010|Thêm SP với<br>quantity là chuỗi<br>ký tự|Đăng nhập → Nhập quantity="abc" →<br>"Thêm vào giỏ"|Hệ thống báo lỗi hoặc<br>không cho nhập.<br>Không thêm SP với<br>qtykhông phảisố<br>|Invalid|
|TC-FR07-011|Thêm SP với<br>quantity rất lớn|Đăng nhập → Nhập<br>quantity=999999999 → "Thêm vào<br>giỏ"|Hệ thống xử lý hợp lý<br>(giới hạn hoặc cảnh<br>báo). Thành tiền tính<br>đúng|Invalid|
|TC-FR07-012|Thêm SP thiếu<br>thông tin id|API POST /api/cart với body thiếu id|Hệ thống báo lỗi hoặc<br>từ chối (400/422)|Invalid|
|TC-FR07-013|Thêm SP với price<br>= 0|Thêm SP có price=0 vào giỏ|Đơn giá=0₫, Thành<br>tiền=0₫, Tổng<br>cộng=0₫ — hệ thống<br>nên từ chối hoặc cảnh<br>báo|Invalid|
|TC-FR07-014|Thêm SP với price<br>âm|Thêm SP có price=-50000 vào giỏ|Hệ thống từ chối SP<br>có giá âm|Invalid|
|TC-FR07-015|Xóa SP không có<br>dialog xác nhận|Đăng nhập → Thêm SP → Nhấn "Xóa"|Theo đặc tả: phải có<br>dialog xác nhận trước<br>khi xóa. Nếu xóa trực<br>tiếp→ lỗi|Invalid|
|TC-FR07-016|Thao tác giỏ hàng<br>khi chưa đăng<br>nhập|Chưa đăng nhập → Gọi API<br>GET/POST /api/cart|Hệ thống trả về 401<br>Unauthorized hoặc<br>chuyển hướng đến<br>trangđăngnhập<br>|Invalid|
|TC-FR07-017|Thao tác giỏ hàng<br>với token hết hạn|Token JWT hết hạn → Gọi API GET<br>/api/cart|Hệ thống trả về<br>401/403. Yêu cầu<br>đăngnhậplại|Invalid|



|TC-FR07-018|Kiểm tra nhãn<br>"Tổng cộng"|Đăng nhập → Thêm SP vào giỏ →<br>Xem giỏ hàng|Nhãn tổng tiền hiển thị<br>chính xác "Tổng<br>cộng" (không phải<br>"Tổng tạmtính")|Valid|
|---|---|---|---|---|
|TC-FR07-019|Kiểm tra nhãn nút<br>"Tiếp tục mua<br>sắm"|Đăng nhập → Mở giỏ hàng|Nút quay về trang chủ<br>hiển thị nhãn "Tiếp tục<br>mua sắm" (không phải<br>"← Mua tiếp")|Valid|
|TC-FR07-020|Kiểm tra nút +/-<br>chỉnh số lượng|Đăng nhập → Thêm SP → Xem giỏ<br>hàng|Cột "Số lượng" có<br>nút + và - để<br>tăng/giảmsố lượng<br>|Valid|
|TC-FR07-021|Kiểm tra tính đúng<br>của Thành tiền|Đăng nhập → Thêm "iPhone"<br>(price=30.000.000₫, qty=2)|Thành tiền =<br>30.000.000 × 2 =<br>60.000.000₫<br>|Valid|
|TC-FR07-022|Kiểm tra tổng tiền<br>nhiều SP|Đăng nhập → Thêm SP A (price=30M,<br>qty=1) + SP B (price=6M, qty=2)|Tổng cộng =<br>30.000.000 +<br>6.000.000×2 =<br>42.000.000₫|Valid|
|TC-FR07-023|Kiểm tra giỏ hàng<br>trống — có hình<br>minh họa|Xóa hết SP khỏi giỏ hoặc mở giỏ chưa<br>có SP|Giỏ trống hiển thị hình<br>minh<br>họa (illustration/image)<br>+text thông báo|Valid|
|TC-FR07-024|Kiểm tra các cột<br>hiển thị đúng|Đăng nhập → Thêm SP → Xem giỏ|Có đủ 5 cột: Sản<br>phẩm, Đơn giá, Số<br>lượng, Thành tiền,<br>Thao tác|Valid|
|TC-FR07-025|Thêm SP với<br>quantity = rỗng<br>(empty)|Đăng nhập → Xóa số trong ô quantity<br>→ "Thêm vào giỏ"|Hệ thống báo lỗi hoặc<br>mặc định quantity=1|Invalid|



- **Explaination** 

## **Bước 1: Equivalence Partitioning** 

- Xác định 7 biến đầu vào chính: Quantity, Cart State, Product, Duplicate, Remove Action, Login State, Price. 

- Phân vùng mỗi biến: 

- Quantity: Chia thành 6 phân vùng: hợp lệ (≥1), bằng 0, âm, thập phân, chuỗi ký tự, số rất lớn 

- Cart State: 3 phân vùng: trống, 1 SP, nhiều SP 

- Product: 4 phân vùng: hợp lệ, thiếu id, price=0, price không phải số 

- Duplicate: 2 phân vùng: SP mới, SP đã tồn tại 

- Remove: 3 phân vùng: xác nhận OK, xác nhận Cancel, không có dialog 

- Login: 3 phân vùng: đã đăng nhập, chưa đăng nhập, token hết hạn 

- Price: 3 phân vùng: dương, 0, âm 

- Chọn đại diện: Với mỗi phân vùng, chọn 1 giá trị đại diện để kiểm thử (ví dụ: quantity=5 đại diện cho phân vùng "số nguyên dương hợp lệ"). 

## **Bước 2: Combinatorial Design** 

**Nguyên tắc:** Sử dụng **Base Choice Coverage** chọn 1 tổ hợp base (tất cả Valid) rồi lần lượt thay đổi từng biến sang Invalid, giữ các biến còn lại ở giá trị base. **Áp dụng:** 

- **Base case (TC-FR07-001):** Tất cả biến đều Valid: quantity=1 hợp lệ, SP hợp lệ, đã đăng nhập, price>0 

- **Variation:** Mỗi test case tiếp theo thay 1 biến thành Invalid/Edge (ví dụ: TC-007 đổi quantity=0, TC-016 đổi sang chưa đăng nhập) 

- **Bổ sung:** Các test case kiểm tra nghiệp vụ đặc thù (gộp SP trùng, dialog xác nhận, nhãn UI, hình minh họa) 

## **_Boundary Value Analysis_** 

###  **Test cases** 

|Test ID|Field / Biến|Mốc biên<br>(Boundary<br>Point)|Giá trị kiểm thử<br>(Input Data)|Kết quả mong<br>đợi (Expected<br>Result)<br>|Loại (Type)|
|---|---|---|---|---|---|
|BVA-01|quantity|Min - 1 (0)|Thêm sản phẩm<br>"iPhone 15"<br>với quantity = 0|Hệ thống từ chối<br>hoặc tự điều<br>chỉnh về 1,<br>không thêm sản<br>phẩm với số<br>lượng 0.|Invalid|
|BVA-02|quantity|Min (1)|Thêm sản phẩm<br>"iPhone 15"<br>với quantity = 1|Thêm thành<br>công vào giỏ,<br>hiển thị đúng 1<br>sản phẩm, số<br>lượng= 1.|Valid|
|BVA-03|quantity|Min + 1 (2)|Thêm sản phẩm<br>"iPhone 15"<br>với quantity = 2|Thêm thành<br>công vào giỏ,<br>hiển thị đúng 1<br>sản phẩm, số<br>lượng = 2, thành<br>tiền nhânđôi.|Valid|
|BVA-04|quantity|Giá trị âm ( -1 )|Thêm sản phẩm<br>"iPhone 15"<br>với quantity = -1|Hệ thống chặn,<br>báo lỗi hoặc ép<br>về 1. Không cho<br>phép số lượng<br>âm.|Invalid|
|BVA-05|quantity|Ký tự sát biên<br>dưới (Thập<br>phân)|Thêm sản phẩm<br>"iPhone 15"<br>với quantity =<br>0.5|Hệ thống ép<br>kiểu (làm tròn)<br>hoặc báo lỗi yêu<br>cầu số nguyên<br>dương.|Invalid|
|BVA-06|quantity|Min - 1 (9998)|Thêm sản phẩm<br>với quantity =<br>9998|Chấp nhận, tính<br>toán thành tiền<br>chính xác không<br>bị tràn số<br>(Overflow).|Valid|
|BVA-07|quantity|Min (9999)|Thêm sản phẩm<br>với quantity =<br>9999|Chấp nhận tối<br>đa, hiển thị đúng<br>trong giỏ hàng.|Valid|
|BVA-08|quantity|Min + 1 (10000)|Thêm sản phẩm<br>với quantity =<br>10000|Hệ thống cảnh<br>báo vượt quá<br>giới hạn cho<br>phép hoặc chặn<br>lại.|Invalid|
|BVA-09|cart.length|Min (0)|Mở trang giỏ<br>hàng khi giỏ<br>chưa có sản<br>phẩm (cart = [])|Hiển thị giao<br>diện giỏ hàng<br>trống: Có hình<br>minh<br>họa (illustration)<br>+ thông báo +<br>nút "Tiếp tục<br>mua sắm".|Valid|
|BVA-10|cart.length|Min + 1 (1)|Thêm 1 sản<br>phẩm vào giỏ<br>(cart.length = 1)|Hiển thị bảng<br>danh sách gồm<br>đúng 1 dòng sản<br>phẩm, nhãn<br>tổng tiền|Valid|



là "Tổng <u>cộng".</u> 

###  **Explaination** 

**- Bước 1. Nhận diện đúng thuộc tính có biên:** Trong FR-07 và FR-06, biến số lượng (`quantity`) và số lượng phần tử giỏ hàng (`cart.length`) là các đại lượng rời rạc có thứ tự rõ ràng (số nguyên), rất nhạy cảm với các lỗi lập trình so sánh (`>`, `<`, `>=`, `<=`). 

### **- Bước 2. Khai thác biên tường minh & ngầm định:** 

- Biên tường minh  = 1 lấy trực tiếp từ yêu cầu FR-06 ("tối thiểu là 1"). 

- Biên ngầm định  = 0 (giỏ trống) và biên Max (giới hạn hệ thống/số nguyên an toàn) được bổ sung để kiểm tra độ bền vững của ứng dụng. 

**- Bước 3. Ứng dụng chuẩn 3-value BVA** : Mô hình 3 giá trị (-1, , +1 và -1, , +1) giúp phát hiện triệt để các lỗi `Off-by-one` kinh điển của lập trình viên (ví dụ: viết nhầm điều kiện `quantity > 1` thay vì `quantity >= 1`). 

**- Bước 4. Cô lập biến (Isolate variables):** Các test case biên được thiết kế độc lập, chỉ thay đổi duy nhất giá trị của `quantity` hoặc `cart.length` trong khi giữ nguyên các thông tin sản phẩm và trạng thái đăng nhập hợp lệ, giúp việc xác định nguyên nhân lỗi (nếu xảy ra) trở nên chính xác tuyệt đối. 

### **_AI Gap Analysis_** 

Đã kiểm tra, crosscheck và xác nhận AI Gemini đã cover rất tốt với các test case, không lọt bug. 

**_FR15 – Quản lý sản phẩm_** 

## **_Domain Testing_** 

##  **Test cases** 

|TestID|InputData<br>|Expected Output|Type (Valid/Invalid)|
|---|---|---|---|
|TC-FR15-001|Thêm sản phẩm mới hợp lệ:<br>name: "MacBook Air M3"<br>price: 30000000 description:<br>"Laptop mỏng nhẹ" imageUrl:<br>"https://example.com/img.jpg"<br>category_id: 2 (Laptop) Role:<br>Admin<br>|Hệ thống thêm sản phẩm<br>thành công vào CSDL. Trả<br>về thông báo thành công<br>hoặc ID sản phẩm mới.<br>Sản phẩm xuất hiện trên<br>trang chủ.<br>|Valid|
|TC-FR15-002|Thêm sản phẩm với tên để<br>trống: name: "" price:<br>1500000 category_id: 3 Role:<br>Admin<br>|Hệ thống từ chối yêu cầu,<br>trả về lỗi validation (400<br>Bad Request) do tên sản<br>phẩmbắt buộc.|Invalid|
|TC-FR15-003|Thêm sản phẩm với tên vượt<br>255 ký tự: name: Chuỗi ký tự<br>có độ dài = 256 ký tự price:<br>500000 category_id: 1 Role:<br>Admin<br>|Hệ thống chặn hoặc báo lỗi<br>do vượt quá giới hạn tối đa<br>255 ký tự của<br>trường name.<br>|Invalid|
|TC-FR15-004|Thêm sản phẩm với giá bằng<br>0: name: "Sản phẩm 0 đồng"<br>price: 0 category_id: 3 Role:<br>Admin<br>|Hệ thống từ chối, trả về lỗi<br>do giá sản phẩm phải là số<br>dương lớn hơn 0 ({price} ><br>0).|Invalid|
|TC-FR15-005|Thêm sản phẩm với giá âm:<br>name: "Sảnphẩmâm"|Hệ thống từ chối, trả về lỗi<br>dogiá khôngđược phéplà|Invalid|



||price: -100000 category_id: 3<br>Role: Admin<br>|số âm.||
|---|---|---|---|
|TC-FR15-006|Thêm sản phẩm với giá<br>không phải là số: name: "Sản<br>phẩm chữ" price: "abc"<br>category_id:3Role: Admin|Hệ thống báo lỗi ép kiểu /<br>validation, từ chối lưu vào<br>CSDL.|Invalid|
|TC-FR15-007|Thêm sản phẩm với danh<br>mục không tồn tại: name:<br>"Test Product" price: 200000<br>category_id: 9999 Role:<br>Admin<br>|Hệ thống từ chối<br>do category_id không khớp<br>với bất kỳ danh mục hợp lệ<br>nào trong CSDL.|Invalid|
|TC-FR15-008|Thêm sản phẩm để trống<br>danh mục: name: "Test<br>Product" price: 200000<br>category_id: null Role: Admin<br>|Hệ thống báo lỗi do danh<br>mục là trường bắt buộc<br>phải chọn.|Invalid|
|TC-FR15-009|Thêm sản phẩm bằng tài<br>khoản User thường: name:<br>"Hacker Product" price:<br>100000 category_id: 1 Role:<br>User(role= 'user')|Hệ thống từ chối truy cập<br>(Trả về lỗi 403 Forbidden /<br>Unauthorized), bảo vệ phân<br>hệ Admin.|Invalid|
|TC-FR15-010|Thêm sản phẩm khi chưa<br>đăng nhập: name: "No Auth<br>Product" price: 100000<br>category_id: 1 Không gửi<br>Token Authorization|Hệ thống từ chối yêu cầu<br>(401 Unauthorized).|Invalid|
|TC-FR15-011|Cập nhật sản phẩm hợp lệ<br>(PUT /api/products/1): Đổi<br>tên thành "iPhone 15 Pro<br>Max (Updated)" Role: Admin|Cập nhật thành công. Chỉ<br>sản phẩm có id = 1 bị thay<br>đổi thông tin, các sản phẩm<br>khác (id > 1) giữ nguyên<br>trạngthái cũ.|Valid|
|TC-FR15-012|Cập nhật sản phẩm<br>với id không tồn tại (PUT<br>/api/products/99999): Role:<br>Admin|Hệ thống trả về lỗi 404 Not<br>Found hoặc thông báo sản<br>phẩm không tồn tại.|Invalid|



 **Explaination** 

### **Bước 1 (Xác định biến đầu vào & Phân vùng tương đương):** 

Tôi đã phân tích kỹ đặc tả FR-15 để tách bạch các trường dữ liệu đầu vào của tính năng Quản lý Sản phẩm (`name`, `price`, `category_id`), cùng với các điều kiện môi trường/hệ thống quan trọng như Phân quyền Admin (Role) và ID sản phẩm khi cập nhật (Update Target). 

Mỗi biến được chia rõ thành các phân vùng Valid (hợp lệ theo đúng đặc tả) và Invalid (vi phạm ràng buộc về khoảng giá trị, kiểu dữ liệu, rỗng, hoặc không tồn tại trong CSDL). 

### **Bước 2 (Ma trận kết hợp phân vùng):** 

Áp dụng chiến lược Base Choice Coverage: Lấy ca kiểm thử `M-01` làm gốc hoàn toàn hợp lệ (Valid Base). Sau đó, tiến hành xoay vòng thay đổi đơn lẻ từng biến sang các trạng thái Invalid tương ứng (`M-02` đến `M-11`). Cách tiếp cận này giúp tối ưu số lượng test case nhưng vẫn đảm bảo phủ kín toàn bộ các rủi ro nghiệp vụ của tính năng CRUD sản phẩm. 

### **Bước 3 (Xuất danh sách Test Case):** 

Danh sách 12 test cases được mô tả cụ thể với dữ liệu đầu vào (`Input Data`) và kết quả mong đợi (`Expected Output`) rõ ràng, bao gồm cả các kiểm tra về bảo mật phân quyền (Admin vs. User) và tính nguyên vẹn dữ liệu khi cập nhật (`PUT`). 

### **Bước 4 (Đảm bảo tính toàn vẹn hệ thống):** 

Các trường hợp kiểm thử không chỉ kiểm tra tính hợp lệ của dữ liệu đầu vào đơn lẻ mà còn kiểm tra các ràng buộc quan hệ cơ sở dữ liệu (`category_id` phải tồn tại) và bảo mật API (`/api/products` yêu cầu role admin theo FR-12). 

## **_Boundary Value Analysis_** 

###  **Test cases** 

|Test ID|Field / Biến|Mốc biên<br>(Boundary<br>Point)|Dữ liệu đầu vào (Input Data)|Kết quả mong đợi<br>(Expected Result)|Loại<br>(Type)|
|---|---|---|---|---|---|
|BVA-<br>FR15-01|name.length|Min - 1 (0 ký<br>tự)|name: "" (Chuỗi rỗng), price:<br>100000, category_id: 1|Hệ thống từ chối,<br>trả về lỗi validation<br>do tên sản phẩm<br>không được để<br>trống.<br>|Invalid|
|BVA-<br>FR15-02|name.length|Min (1 ký tự)|name: "A", price:<br>100000, category_id: 1|Thêm sản phẩm<br>thành công với tên<br>đúng1 kýtự.|Valid|
|BVA-<br>FR15-03|name.length|Min + 1 (2 ký<br>tự)|name: "Ab", price:<br>100000, category_id: 1|Thêm sản phẩm<br>thành công với tên<br>2 ký tự.|Valid|
|BVA-<br>FR15-04|name.length|Max - 1 (254<br>ký tự)|name: Chuỗi ký tự gồm đúng<br>254 chữ 'A', price:<br>100000, category_id: 1|Thêm sản phẩm<br>thành công (dưới<br>ngưỡng tối đa 1 ký<br>tự).|Valid|
|BVA-<br>FR15-05|name.length|Max (255 ký<br>tự)|name: Chuỗi ký tự gồm đúng<br>255 chữ 'A', price:<br>100000, category_id: 1|Thêm sản phẩm<br>thành công với độ<br>dàitốiđa cho phép.<br>|Valid|
|BVA-<br>FR15-06|name.length|Max + 1 (256<br>ký tự)|name: Chuỗi ký tự gồm đúng<br>256 chữ 'A', price:<br>100000, category_id: 1|Hệ thống từ chối<br>hoặc cắt chuỗi<br>(truncate) do vượt<br>quá giới hạn 255<br>ký tự.|Invalid|
|BVA-<br>FR15-07|price|Giá trị âm (-<br>1)|name: "Test", price: -<br>1, category_id: 1|Hệ thống từ chối<br>do giá sản phẩm<br>không được là số<br>âm.|Invalid|
|BVA-<br>FR15-08|price|Biên giá trị 0|name:<br>"Test", price: 0, category_id: 1|Hệ thống từ chối<br>do giá phải là số<br>dương lớn hơn 0<br>({price} > 0).<br>|Invalid|
|BVA-<br>FR15-09|price|Min tối thiểu<br>(1)|name:<br>"Test", price: 1, category_id: 1|Thêm sản phẩm<br>thành công với giá<br>nhỏ nhất hợp lệ (1<br>₫).|Valid|
|BVA-<br>FR15-10|price|Min + 1 (2)|name:<br>"Test", price: 2, category_id: 1|Thêm sản phẩm<br>thành công với giá<br>2 ₫.|Valid|
|BVA-<br>FR15-11|category_id|Min - 1 (0)|name: "Test", price:<br>100000, category_id: 0|Hệ thống từ chối<br>do category_id phải<br>\ge 1 và tồn tại<br>trong CSDL.|Invalid|
|BVA-<br>FR15-12|category_id|Min (1)|name: "Test", price:<br>100000, category_id: 1 (Điện<br>thoại)|Thêm sản phẩm<br>thành công vào<br>danh mục có ID =<br>1.|Valid|
|BVA-<br>FR15-13|category_id|Min + 1 (2)|name: "Test", price:<br>100000, category_id: 2 (Laptop)|Thêm sản phẩm<br>thành công vào<br>danh mục có ID =<br>2.|Valid|



###  **Explaination** 

### **Nhận diện chính xác thuộc tính có biên:** 

- Trường `name` có biên độ dài ký tự rõ ràng (1 < length < 255  ). 

- Trường `price` có biên giá trị dương (price > 0, ngăn cách bởi mốc 0). 

- Trường `category_id` có biên dưới bắt đầu từ 1 (dựa trên cấu trúc khóa chính SQLite AUTOINCREMENT). 

### **Khai thác biên tường minh & ngầm định:** 

- Biên tường minh lấy từ đặc tả FR-15 (`max 255 ký tự`, `price > 0`). 

- Biên ngầm định lấy từ kiến trúc cơ sở dữ liệu (`id >= 1`). 

**Ứng dụng chuẩn 3-value BVA:** 

- Với độ dài tên sản phẩm, bộ test cases kiểm tra kỹ lưỡng từ 0 ký tự (`Min-1`), 1 ký tự (`Min`), 2 ký tự (`Min+1`), đến cận trên 254 (`Max-1`), 255 (`Max`), và 256 (`Max+1`). Điều này giúp phát hiện chính xác nếu lập trình viên viết nhầm `length < 255` thay vì `length <= 255`. 

- Với giá sản phẩm, kiểm tra mốc nguy hiểm nhất là `0` và `-1` để đảm bảo hệ thống chặn đứng các sản phẩm giá 0 đồng hoặc âm. 

**Cô lập biến:** Mỗi test case chỉ thay đổi một biến số duy nhất tại giá trị biên tương ứng, giữ các trường thông tin khác ở trạng thái hợp lệ, giúp kết quả kiểm thử mang tính khách quan và chính xác tuyệt đối. 

### **_AI Gap Analysis_** 

Đã kiểm tra, crosscheck và xác nhận AI Gemini đã cover rất tốt với các test case, không lọt bug. 

**_FR01 – Mobile App – Account registration_** 

## **_Domain Testing_** 

##  **Test cases** 

|Test ID|Input Data|Expected Output (Mobile<br>App)<br>|Type|
|---|---|---|---|
|TC-MOB-REG-01|name: "Nguyễn Văn A" email: "valid_user_01@eshop.com"<br>password: "Admin123!" confirmPassword: "Admin123!"|Ứng dụng bật popup thông<br>báo: "Đăng ký tài khoản<br>thành công.", nhấn OK thì<br>tự động chuyển sang màn<br>hình Đăng nhập, ô Email<br>trên màn hình Đăng nhập<br>được điền<br>sẵn "valid_user_01@eshop<br>.com".|Valid|
|TC-MOB-REG-02|name: "" (Bỏ trống) email: "user02@eshop.com" password:<br>"Admin123!" confirmPassword: "Admin123!"|Hệ thống chặn submit, hiển<br>thị thông báo lỗi yêu cầu<br>nhập Họ Tên, không gửi<br>request đăng ký không hợp<br>lệlênbackend.|Invalid|
|TC-MOB-REG-03|name: "<script>alert(1)</script>" email:<br>"user03@eshop.com" password: "Admin123!"<br>confirmPassword: "Admin123!"<br>|Hệ thống tự động escape /<br>sanitize chuỗi Họ tên khi<br>render lên giao diện Mobile<br>Profile, không làm vỡ giao<br>diện.<br>|Invalid|
|TC-MOB-REG-04|name: "Trần B"email: ""(Bỏtrống) password: "Admin123!"|Hiểnthịlỗiyêu cầunhập|Invalid|



||confirmPassword: "Admin123!"|địa chỉ Email, không cho<br>phép gửi request.||
|---|---|---|---|
|TC-MOB-REG-05|name: "Trần B" email: "invalid-email-format" password:<br>"Admin123!"confirmPassword: "Admin123!"|Hiển thị lỗi: Email không<br>đúngđịnhdạng.|Invalid|
|TC-MOB-REG-06|name: "Trần B" email: "test@eshop.com" (Email đã tồn tại)<br>password: "Admin123!" confirmPassword: "Admin123!"|Hệ thống báo lỗi: Email đã<br>được sử dụng / Đăng ký<br>thất bại. Giữ nguyên màn<br>hình đăng ký và dữ liệu đã<br>nhập.|Invalid|
|TC-MOB-REG-07|name: "Lê C" email: "user07@eshop.com"<br>password: "Aa1@xyz" (7 ký tự)<br>confirmPassword: "Aa1@xyz"|Báo lỗi ngay tại khung<br>đỏ: "Mật khẩu quá yếu!<br>Phải dài tối thiểu 8 ký tự...".<br>Không gửi API.|Invalid|
|TC-MOB-REG-08|name: "Lê C" email: "user08@eshop.com"<br>password: "admin123!" (Toàn chữ thường)<br>confirmPassword: "admin123!"|Báo lỗi mật khẩu thiếu chữ<br>in HOA.|Invalid|
|TC-MOB-REG-09|name: "Lê C" email: "user09@eshop.com"<br>password: "ADMIN123!" (Toàn chữ hoa)<br>confirmPassword: "ADMIN123!"|Báo lỗi mật khẩu thiếu chữ<br>in THƯỜNG.|Invalid|
|TC-MOB-REG-10|name: "Lê C" email: "user10@eshop.com"<br>password: "Adminpass!" (Không có số)<br>confirmPassword: "Adminpass!"|Báo lỗi mật khẩu thiếu<br>CHỮ SỐ.<br>|Invalid|
|TC-MOB-REG-11|name: "Lê C" email: "user11@eshop.com"<br>password: "Admin1234" (Không có ký tự đặc biệt)<br>confirmPassword: "Admin1234"|Báo lỗi mật khẩu thiếu KÝ<br>TỰ ĐẶC BIỆT trong<br>nhóm@, ,!, %,*,?, &.|Invalid|
|TC-MOB-REG-12|name: "Phạm D" email: "user12@eshop.com"<br>password: "Admin123!" confirmPassword: "Admin123?" (Gõ<br>lệch 1 ký tự)|Báo lỗi: Mật khẩu xác nhận<br>không khớp. Không cho<br>phép gửi request.<br>|Invalid|
|TC-MOB-REG-13|name: "Phạm D" email: "user13@eshop.com"<br>password: "Admin123!"confirmPassword: ""(Bỏ trống)|Báo lỗi: Vui lòng xác nhận<br>lại mậtkhẩu.|Invalid|
|TC-MOB-REG-14|Nhập mật khẩu "Admin123!" vào ô TextInput Mật khẩu trên<br>điện thoại|Ký tự mật khẩu gõ vào<br>được tự động ẩn thành dấu<br>chấm (••••••••) thông qua<br>thuộc tínhsecureTextEntry.|Valid|
|||Bàn phím ảo xuất hiện<br>không tự động viết hoa chữ<br>||
|TC-MOB-REG-15|Nhấn chọn ô Email trên điện thoại|cái đầu tiên<br>(autoCapitalize="none"),<br>loại bàn phím hiển thị<br>phím@ thuậntiện.|Valid|



 **Explaination** 

### **1. Phân tích miền giá trị riêng cho Mobile:** 

-  Khác biệt nền tảng:  Trên Mobile App, các biến không chỉ là kiểu dữ liệu chuỗi mà còn bị chi phối bởi các component Native như `TextInput`, bàn phím ảo (Virtual Keyboard), thuộc tính `secureTextEntry`, và cơ chế xử lý phản hồi qua `Alert.alert` thay vì redirect URL như trên web. 

- Tập trung vào tính toàn vẹn dữ liệu:  Phân tách mật khẩu thành 5 điều kiện con độc lập để phát hiện lập trình viên thiếu sót điều kiện Regex nào. 

### **2. Phát hiện các sai lệch nghiêm trọng giữa Mobile App Code và Đặc tả FR-01:** 

- THIẾU HOÀN TOÀN TRƯỜNG "XÁC NHẬN MẬT KHẨU": 

- Đặc tả FR-01 quy định rõ: *"Phải có trường Xác nhận mật khẩu — hệ thống từ chối nếu hai trường không khớp."* 

- Tuy nhiên, trong hàm `renderRegister()` của Mobile App chỉ có 3 ô `Họ Tên`, `Email`, `Mật khẩu`. Ô `Xác nhận mật khẩu` hoàn toàn không tồn tại trong giao diện Mobile =>  Các test case `TC-MOB-REG-12` và `TC-MOB-REG-13` sẽ phát hiện ngay Bug này. 

- KHÔNG VALIDATE HỌ TÊN VÀ EMAIL Ở PHÍA CLIENT: 

- Trong `handleRegister()`, Mobile app chỉ kiểm tra `strongPasswordRegex` mà không kiểm tra `registerName` hoặc `registerEmail` có rỗng hay không, gửi thẳng chuỗi rỗng lên backend. 

3. SAI TẬP KÝ TỰ ĐẶC BIỆT CỦA MẬT KHẨU: 

- Đặc tả FR-01 giới hạn: `@,   , !, %, *, ?, &`. 

- Nhưng mã nguồn Mobile sử dụng Regex `[^A-Za-z\d]` (chấp nhận mọi ký tự ngoài chữ và số, kể cả dấu cách, emoji, dấu gạch nối). 

### **3. Đánh giá tính hữu ích của kỹ thuật Domain Testing:** 

- Việc lập ma trận kết hợp  Base Choice  kết hợp với các phân vùng Valid/Invalid giúp đội ngũ QA kiểm thử toàn diện mọi khía cạnh của Mobile App từ logic kiểm tra dữ liệu, bảo mật hiển thị mật khẩu đến luồng điều hướng màn hình (navigation & auto-fill state). 

## **_Boundary Value Analysis_** 

###  **Test cases** 

|Test<br>ID|Field / Biến|Mốc biên<br>(Boundary<br>Point)|Dữ liệu đầu vào (Input Data)|Kết quả mong đợi<br>trên Mobile App|Loại<br>(Type)|
|---|---|---|---|---|---|
|BVA-<br>MOB-<br>01|password.length|Min - 1   (<br>7   ký tự)|name: "Nguyen A"  email: "bva01@eshop.com"<br>password: "Aa1@xyz" (7 kt: 1 hoa, 1 thường, 1<br>số, 1 đặc biệt)|Mobile hiển thị lỗi<br>tại errorBoxText: "Mật<br>khẩu quá yếu! Phải<br>dài tối thiểu 8 ký<br>tự...". Không gửi<br>request.|Invalid|
|BVA-<br>MOB-<br>02|password.length|Min   (  8<br>ký tự)|password: "Aa1@xyzz" (8 kt: đủ 4 nhóm)|Mật khẩu được chấp<br>nhận. Đăng ký thành<br>công, hiển<br>thị Alert.alert("Thành<br>công").|Valid|
|BVA-<br>MOB-<br>03|password.length|Min + 1<br>(  9   ký tự)|password: "Aa1@xyzzz" (9 kt: đủ 4 nhóm)|Mật khẩu được chấp<br>nhận. Đăng ký thành<br>công.|Valid|
|BVA-<br>MOB-<br>04|password.length|Max - 1<br>(  254   ký<br>tự)|password: Chuỗi 254 ký tự (bắt đầu<br>bằng Aa1@ + 250 chữ x)|Đăng ký thành công,<br>xử lý mã hóa bình<br>thường.|Valid|
|BVA-<br>MOB-<br>05|password.length|Max   (<br>255   ký tự)|password: Chuỗi 255 ký tự (bắt đầu<br>bằng Aa1@ + 251 chữ x)|Đăng ký thành công<br>với độ dài tối đa cho<br>phép củaDB.<br>|Valid|
|BVA-<br>MOB-<br>06|password.length|Max + 1<br>(  256   ký<br>tự)|password: Chuỗi 256 ký tự (bắt đầu<br>bằng Aa1@ + 252 chữ x)|Hệ thống Mobile<br>hoặc Backend từ chối<br>để chống tràn bộ nhớ<br>/ bufferoverflow.|Invalid|
|BVA-<br>MOB-<br>07|Số chữ hoa<br>(Uppercase)|Min - 1   (<br>0   chữ hoa)|password: "admin123!" (  0   chữ hoa, đủ các loại<br>khác)|Báo lỗi thiếu chữ viết<br>hoa trên Mobile.|Invalid|
|BVA-<br>MOB-<br>08|Số chữ hoa<br>(Uppercase)|Min   (  1<br>chữ hoa)|password: "Admin123!" (  1   chữ hoa A)|Đạt chuẩn, đăng ký<br>thành công.|Valid|
|BVA-<br>MOB-<br>09|Số chữ hoa<br>(Uppercase)|Min + 1<br>(  2   chữ<br>hoa)|password: "ADmin123!" (  2   chữ hoa A, D)|Đạt chuẩn, đăng ký<br>thành công.|Valid|
|BVA-<br>MOB-<br>10|Số ký tự đặc<br>biệt|Min - 1   (<br>0   ký tự<br>ĐB)|password: "Admin1234" (  0   ký tự đặc biệt)|Báo lỗi mật khẩu<br>thiếu ký tự đặc biệt.|Invalid|
|BVA-|Số ký tựđặc|Min(1|password: "Admin123@"(1   ký tựđặc biệt @)|Đạt chuẩnbiêntối|Valid|



|MOB-<br>11|biệt|ký tự ĐB)||thiểu, đăng ký thành<br>công.||
|---|---|---|---|---|---|
|BVA-<br>MOB-<br>12|Số ký tự đặc<br>biệt|Min + 1<br>(  2   ký tự<br>ĐB)|password: "Admin123@!" (  2   ký tự đặc biệt @,<br>!)|Đạt chuẩn an toàn,<br>đăng ký thành công.|Valid|
|BVA-<br>MOB-<br>13|name.length|Min - 1   (<br>0   ký tự)|<br>name: "" (Rỗng, focus vào ô rồi bấm Đăng ký)|Mobile hiển thị lỗi<br>cảnh báo không<br>được để trống Họ<br>Tên.|Invalid|
|BVA-<br>MOB-<br>14|name.length|Min   (  1<br>ký tự)|<br>name: "A"|Đăng ký thành công<br>với tên 1 ký tự.|Valid|
|BVA-<br>MOB-<br>15|name.length|Min + 1<br>(  2   ký tự)|name: "An"|Đăng ký thành công<br>với tên 2 ký tự thông<br>thường.|Valid|
|BVA-<br>MOB-<br>16|email.length|Max + 1<br>(  255   ký<br>tự)|email: Chuỗi email dài 255 ký tự (vượt chuẩn<br>RFC 254 ký tự)|Hệ thống từ chối<br>đăng ký địa chỉ email<br>vượt quá độ dài<br>chuẩn.|Invalid|



 **Explaination** 

### **Bước 1: Nhận diện biến đo lường được trên Mobile:** 

- Tập trung vào các thuộc tính chuỗi nhập qua `TextInput` có thể đếm ký tự (`length`) hoặc đếm số lần xuất hiện của các thành phần con (ký tự hoa, thường, số, đặc biệt). 

### **Bước 2: Phân tách rõ ràng giữa Biên tường minh và Biên ngầm định:** 

- Biên tường minh lấy trực tiếp từ bản đặc tả FR-01: `length >= 8`, số lượng mỗi loại ký tự `>= 1`. 

- Biên ngầm định lấy từ cấu trúc CSDL SQLite (`VARCHAR/TEXT 255`) và chuẩn giao thức Internet RFC 5321 cho email. 

### **Bước 3: Lựa chọn mô hình 3-Value BVA:** 

- Trong `frontend-mobile/App.js`, lập trình viên sử dụng biểu thức chính quy Regex: 

### _<u>const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;</u>_ 

- Nhờ kỹ thuật 3-value BVA với 3 mốc liên tiếp Min-1=7, Min=8, và Min+1=9, chúng ta kiểm tra chính xác toán tử độ dài `.{8,}` của Regex có chạy đúng hay bị lỗi `Off-by-one` (`.{9,}` hoặc `.{7,}`). 

### **Bước 4: Cô lập điều kiện kiểm thử:** 

- Khi kiểm tra mốc 7 ký tự (`BVA-MOB-01`), chuỗi nhập vào `"Aa1@xyz"` vẫn phải có đủ 1 hoa (`A`), 1 thường (`a`), 1 số (`1`), và 1 ký tự đặc biệt (`@`). Nhờ vậy, khi hệ thống Mobile báo lỗi, chúng ta khẳng định chắc chắn 100% lỗi xuất phát từ điều kiện độ dài chứ không bị nhiễu bởi các điều kiện ký tự khác. 

### **_AI Gap Analysis_** 

Đã kiểm tra, crosscheck và xác nhận AI Gemini đã cover rất tốt với các test case, không lọt bug. 

# **Table of Contents** 

HW01 – QA/QC Jobs · 20 Defects · Test a Physical Product .......................................... 1 

Requirement 1 – QA/QC Job Market 2026+ (40 pts) . **Error! Bookmark not defined.** Requirement 2 – 20 Software Defects 2022–2026 (20 pts) ..... **Error! Bookmark not defined.** 

Requirement 3 – Test cases for ONE physical product (40 pts) ..... **Error! Bookmark not defined.** 

AI Audit Report .......................................................... **Error! Bookmark not defined.** AI Critique ................................................................. **Error! Bookmark not defined.** Mandatory Disclosure............................................................................................. 17 Self-assessment ..................................................................................................... 17 

## **Mandatory Disclosure** 

_“8 bảng test case trong MainReport được sinh phiên bản đầu bởi Gemini, bổ sung các explanation; bug report do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."_ 

## **Self-assessment** 

|**No.**|**Criteria**|**Grade**|**Self-Assessed**<br>**Grade**|
|---|---|---|---|
|**1**|Feature A (Domain + Boundary)|25|25|
|**2**|Feature B (Domain + Boundary)|25|25|
|**3**|Feature C (Domain + Boundary)|25|25|
|**4**|Feature D (Mobile, Domain + Boundary)|15|15|
|**5**|Agent Skills|10|10|
||**Total**|**100**||



