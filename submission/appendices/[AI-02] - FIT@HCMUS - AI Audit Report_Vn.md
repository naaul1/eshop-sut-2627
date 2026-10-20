### **Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)** 

### **CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)** 

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0** 

# **AI Audit Report — Mẫu 5 mục cho mỗi Artifact** 

_Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar)._ 

_Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm._ 

## **1. Thông tin Sinh viên** 

|**Mục**|**Giá trị**|
|---|---|
|**Họ tên sinh viên(in hoa):**|NGUYỄN THIỆN NHÂN|
|**MSSV:**|23120064|
|**Lớp / Khoá:**|23CTT1|
|**Mã bài tập (ví dụ HW#00,**<br>**HW#02):**|HW#02|
|**Ngày làm bài:**|20/10/2026|
|**Công cụ AI đã dùng:**|Gemini,CoPilot|
|**Công cụ AI đã dùng:**|[X]Có[ ]Không|



## **2. Hướng dẫn (đọc trước khi điền)** 

- Thêm 1 hàng cho mỗi artifact AI sinh (test case, script, checklist, OpenAPI spec, JMeter plan…). 

- Dán nguyên văn prompt — KHÔNG paraphrase. 

- Dán nguyên văn output AI (hoặc kèm screenshot có chú thích trong báo cáo). 

- Gắn nhãn: VALID / INVALID / INCOMPLETE. 

- Lý do phải dẫn chiếu slide, mục ISTQB, hoặc RFC kỹ thuật. 

- Hiển thị bản sửa với phần thay đổi được tô sáng. 

- Hàng mẫu in nghiêng — thay trước khi nộp. 

## **3. Bảng Audit — 1 hàng / artifact** 

|**(1) Prompt + Công**<br>**cụ**|**(2) Output AI**|**(3)**<br>**Verdict**|**(4) Lý do (ISTQB)**|**(5) Bản SV sửa**||
|---|---|---|---|---|---|
|**Mẫu (italic) — thay**<br>**trước khi nộp:**||||||
|**Tool: Gemini**<br>**Date: 17/10/2026**<br>**20:34**<br>**Prompt: “Tôi đang**<br>**làm kiểm thử cho**<br>**ứng dụng EShop.**<br>**Hãy giúp tôi áp**<br>**dụng kỹ thuật **|Dưới đây là tài liệu<br>thiết kếkiểm thử<br>chi tiết áp dụng kỹ<br>thuật Domain<br>Testing (Kiểm thử<br>miền) kết hợp<br>Equivalence|Incompl<br>ete|Chưa phù hợp với<br>format báo cáo,<br>nhưng vẫn chỉnh<br>sửa được|Test ID<br>TC_01|Input Data<br>Họ Tên: `Nguy<br>Email:`newuse<br>`Pass123!` Xá|



|**Domain Testing**<br>|Partitioning (Phân||- Họ Tên: Tran<br>Eil|
|---|---|---|---|
|**cho tính năng FR-**<br>**01: Đăng ký tài**<br>|vùng tương đương)<br>và Boundary Value|TC_REG_02|ma: newuse<br>khẩu: SecureP<br>MK:SecurePa<br>""|
|**khoản dựa trên**<br>**đặc tả sau:Đặc tả:**<br>**Họ Tên (bắt buộc);**<br>**Email (bắt buộc**|Analysis (Phân tích<br>giá trịbiên) cho<br>tính năng FR-01:<br>|TC_REG_03|- Họ Tên:  (Đ<br>Email: user03<br>khẩu: Test@12<br>MK: Test@123<br>H Tê " " K|
|**,**<br>**đúng định dạng**<br>**email, duy nhất);**<br>|Đăng ký tài khoản<br>củaứng dụng<br>EShop|TC_REG_04|- ọ n:   (<br>Email: user04<br>khẩu: Test@12<br>MK: Test@123|
|**Mật khẩu (bắt**|.||- Họ Tên: Nguy|
|<br>**buộc, từ 8 ký tự**<br>**trở lên, chứa chữ**|BƯỚC 1: XÁC ĐỊNH<br>|TC_REG_05|<br>trống) - Mật kh<br>MK: Test@123<br>H Tê N|
|**hoa, chữ thường,**<br>**chữ số, ký tự đặc**<br>|BIẾN ĐẦU VÀO VÀ<br>PHÂN VÙNG<br>|TC_REG_06|- ọ n: guy<br>Email: useres<br>khẩu: Test@12<br>|
|**biệt trong nhóm @**|TƯƠNG ĐƯƠNG||MK: Test@123|
|**,**<br>**$, !, %, *, ?, &); Xác**<br>**nhận mật khẩu (bắt**<br>|(EP & BVA)<br>Hệthống có 4 biến<br>|TC_REG_07|- Họ Tên: Nguy<br>Email: user@<br>khẩu: Test@12<br>|
|**buộc, khớp mật**|đầu vào cần xửlý:||MK: Test@123<br>|
|<br>**khẩu).   Hãy thực**|||- Họ Tên: Nguy<br>Email: @esho|
|**hiện từng**<br>**bước:Xác định các**<br>|HọTên (name): Bắt<br>buộc.|TC_REG_08|<br>Mật khẩu: Tes<br>MK: Test@123<br>|
|**biến đầu vào và**<br>**phân vùng tương**<br>|<br>Email (email): Bắt<br>buộc đúng định|TC_REG_09|- Họ Tên: Nguy<br>Email: user@<br>khẩu: Test@12|
|**đương**|,<br>||MK: Test@123|
|<br>**(Equivalence**|dạng email, là duy<br>||- Họ Tên: Nguy<br>|
|<br>**Partitioning) gồm**<br>**Vlid & Ilid**|nhất trong hệ<br>thống.|TC_REG_10|name@eshop<br>khẩu: Test@12<br>|
|**a  nva**|<br> ẩ||MK: Test@123|
|**Partitions.Tạo ma**<br>|Mật khu<br>||- Họ Tên: Nguy<br>|
|**trận kết hợp các**<br>**phân vùng để thiết**<br>|(password): Bắt<br>buộc, độdài $\ge<br>|TC_REG_11|Email: existing<br>khẩu: Test@12<br>MK: Test@123|
|**kế tập Test Cases**<br>**phủ toàn bộ các**<br>**ề  ấ**|8$ ký tự, chứa cả<br>chữhoa, chữ<br>|TC_REG_12|- Họ Tên: Nguy<br>Email: user12<br>khẩu: ""(Đểtrố|
|**min giá trị.Xut**|thường, chữsốvà||- Họ Tên: Nu|
|**danh sách Test**<br>**Case gồm: Test ID,**<br>|<br>ký tựđặc biệt thuộc<br>tập @, $, !, %, *, ?,|TC_REG_13|gy<br>Email: user13<br>khẩu: Pass1@<br>hMK P|
|**Input Data,**<br>|<br>&.||nận :ass<br>- Họ Tên: Nguy|
|**Expected Output,**<br>|Xác nhận mật khẩu|TCREG14|<br>Email: user14<br>|
|**Type**||__|khẩu: pass@1|
|<br>**(Valid/Invalid).Giải**|(confirm_password<br> ắ||<br>nhận MK:pass<br>|
|<br>**thích chi tiết các**<br>**bước đã áp dụng.”**|): Bt buộc, khớp<br>hoàn toàn với mật<br>khẩu.|TC_REG_15|- Họ Tên: Nguy<br>Email: user15<br>khẩu: PASS@<br>Xácnhận MK|
||1. Biến: HọTên<br>(name)<br>Phân vùng hợp lệ|TC_REG_16|- Họ Tên: Nguy<br>Email: user16<br>khẩu: Passwor<br>MK: Password|
||(Valid Partitions):<br>VP1.1: Chuỗi văn<br>bản hợp lệkhông<br>ỗVí d|TC_REG_17|- Họ Tên: Nguy<br>Email: user17<br>khẩu: Passwor<br>Xác nhận MK|
||rng (ụ:<br>"Nguyen Van A").<br>Phân vùng không<br>hợp lệ(Invalid<br>Partitions):|TC_REG_18|- Họ Tên: Nguy<br>Email: user18<br>khẩu: Passwor<br>nhóm)- Xácn|



|IP1.1: Bỏtrống /<br>rỗng ("").|TC_REG_19<br> <br> <br>|- Họ Tên: Nguy<br>Email: user19<br>khẩu: Test@12|
|---|---|---|
|IP1.2: Chỉchứa<br>|<br><br>|<br>trống)<br>|
|khoảng trắng (" ").<br>|<br>|- Họ Tên: Nguy<br>Email: user20|
|2. Biến: Email|TC_REG_20<br> <br>|<br>khẩu: Test@12|
|il||MK: Test@123|
|(ema)|||
|Phân vùng hợp lệ|||
|(Valid Partitions):|<br>**Explainatio**||
|VP2.1: Email đúng<br>|**n**<br>||
|cú pháp tiêu chuẩn<br>local@domain.ext<br>và chưa tồn tại<br>|**Bước 1: Trích xuất**<br>**các biến đầu vào và**<br>**xác định ràng buộc**<br>**nghiệp vụ**||
|trong hệthống (Ví|<br>- Cách thực hiện:||
|dụ:<br>"user@eshop.com"|<br>Đọc đặc tả FR-01 và<br>lập danh sách tất cả<br>||
|).<br>Phân vùng không<br>hợp lệ(Invalid|các tham số mà<br>người dùng có thể<br>gửi lên hệ thống:<br>`` ể||
|Partitions):<br>IP2.1: Bỏtrống<br>("").<br>IP2.2: Thiếu ký tự<br>|1. name: Kiu<br>chuỗi, bắt buộc.<br>2. `email`: Kiểu<br>chuỗi, bắt buộc, tuân<br>thủ định dạng RFC,<br>||
|@ (Ví dụ:|tính duy nhất trong||
|"usereshopcom")|CSDL||
|..<br>IP2.3: Thiếu tên<br>miền sau @ (Ví dụ:|.<br>3. `password`: Kiểu<br>chuỗi bí mật, bắt||
|<br>"user@").<br>IP2.4: Thiếu định<br>danh trước @ (Ví<br>|buộc, tối thiểu 8 ký<br>tự, phối hợp 4 nhóm<br>ký tự.<br>4.||
|dụ:<br>"@eshop.com").<br>IP2.5: Thiếu phần<br>mởrộng tên miền<br>TLD (Ví dụ:<br>"user@eshop").<br>IP2.6: Chứa ký tự<br>không hợp lệhoặc<br>khoảng trắng (Ví<br>dụ: "user<br>|`confirm_password`:<br>Kiểu chuỗi, bắt buộc,<br>quan hệ phụ thuộc<br>vào `password`.<br>**Bước 2: Phân tách**<br>**Phân vùng tương**<br>**đương**<br>**(Equivalence**<br>**Partitioning)**<br>Với mỗi biến, ta phân<br>chia thành 2 nhóm||
|name@eshop.com"<br>|phân vùng độc lập:<br>||
|).|- Valid Partitions||
|<br>IP2.7: Email đã tồn|(Miền hợp lệ - VP):||
|tại trong cơsởdữ|Tập hợp các giá trị<br>||
|<br>liệu (Trùng lặp /<br>Duplicate).<br>3. Biến: Mật khẩu|đáp ứng hoàn toàn<br>mọi quy tắc nghiệp<br>vụ. Hệ thống bắt<br>buộc hải xử lý thành||
|(password)<br>Áp dụng BVA cho<br>độdài: Biên dưới là<br>8 kýtự|p<br>công (Happy Path).<br>- Invalid Partitions<br>(Miền bất hợp lệ -<br>IP): Tậphợpcácgiá||



|$\rightarrow$|trị vi phạm ít nhất một<br>|
|---|---|
|<br>Kiểm tra tại giá trị<br>biên $L=7$ (Invalid) và $L=8$ (Valid - On-<br>boundary).|điều kiện nghiệp vụ.<br>Hệ thống bắt buộc<br>phải chặn lại và hiển<br>thị thông báo lỗi<br>tương ứng.<br>- *Nguyên tắc chia<br>*|
||nhỏ (Granularity):|
|Phân vùng hợp lệ<br>(Valid Partitions):<br>VP3.1: Độdài $\ge<br>8$, có đủchữhoa,<br>chữthường, chữsố<br>và ký tựđặc biệt<br>trong nhóm @, $, !,<br>%, *, ?, & (Ví dụ: độ<br>|Không gộp chung các<br>nguyên nhân lỗi. Ví<br>dụ với trường<br>`email`, lỗi "thiếu @"<br>(`IP2.2`) và lỗi "email<br>trùng lặp trong DB"<br>(`IP2.7`) thuộc về hai<br>miền lỗi khác nhau<br>(lỗi cú pháp vs. lỗi<br>|
|dài biên 8 ký tự|tính duy nhất dữ liệu)|
|"Pass123!" hoặc độ|nên phải tách thành 2<br>|
|dài > 8 như|phân vùng riêng biệt.<br>|
|"Admin@2026").<br>Phân vùng không<br>hợp lệ(Invalid<br>Partitions):<br>|**Bước 3: Thiết lập**<br>**ma trận kết hợp**<br>**theo nguyên tắc**<br>**"Đơn biến lỗi"**<br>**(Single Fault**|
|IP3.1: Bỏtrống|<br>**Assumption)**|
|("").<br>|Khi kết hợp các phân<br>|
|IP3.2: Độdài $< 8$|vùng của nhiều biến<br>|
|ký tựmặc dù có đủ|vào một kịch bản|
|<br>4 nhóm ký tự(Ví<br>dụ: biên $L = 7$:|kiểm thử, sai lầm phổ<br>biến nhất là đưa<br>|
|<br>"Pa1@xyz").<br>IP3.3: Thiếu chữ<br>hoa (Chỉcó chữ<br>|nhiều giá trị lỗi vào<br>cùng một test case.<br>Điều này dẫn đến<br>Fault Masking (Hiện<br>|
|thường, số, ký tự<br>đặc biệt; $\ge 8$ ký<br>|tượng lỗi che khuất<br>lỗi) — tức là nếu<br>|
|tự, ví dụ:<br>"pass@123").|Email sai, hệ thống<br>báo lỗi Email và dừng|
|<br>IP3.4: Thiếu chữ<br>|lại ngay, ta sẽ không<br>thể biết logic kiểm tra|
|thường (Chỉcó chữ<br>hoa, số, ký tựđặc<br>|<br>Password có hoạt<br>động hay không.|
|biệt; $\ge 8$ ký tự,<br>|<br>- Quy tắc giải quyết:|
|ví dụ:|- Test Case hợp lệ:|
|"PASS@123").|<br>Kết hợp các phân|
|<br>IP3.5: Thiếu chữsố|<br>vùng hợp lệ của tất|
||<br>ả á biế|
|(Chỉcó chữhoa,|c cc n|
|chữthường, ký tự<br>đặc biệt; $\ge 8$ ký<br>|- Test Case không<br>hợp lệ: Tại mỗi thời<br>điểm, chỉ cho phép|
|tự, ví dụ:|<br>DUY NHẤT 1 biế|
|"Pass@word").|n<br>mang giá trị Invalid|
|<br>IP3.6: Thiếu ký tự|,<br>toàn bộ các biến còn|
|đặc biệt (Chỉcó chữ<br>hoa,chữthường,|<br>lại phải giữ ở giá trị<br>Valid chuẩn(Baseline|



|chữsố; $\ge 8$ ký<br>tự, ví dụ:<br>"Password123").<br>IP3.7: Chứa ký tự<br>đặc biệt không nằm<br>trong tập cho phép<br>(Ví dụ: dùng #, ^,<br>~, . thay vì tập quy<br>định, ví dụ:<br>"Password#123").<br>4. Biến: Xác nhận<br>mật khẩu<br>(confirm_password<br>)|Values<br>**Bước 4: Chuyển đổi**<br>**thành Test Cases**<br>**có thể thực thi**<br>- Chọn một giá trị đại<br>diện cụ thể (Concrete<br>Value) cho mỗi phân<br>vùng.<br>- Gán Test ID, dữ liệu<br>đầu vào cụ thể, và<br>kết quả mong đợi<br>(Expected Output) rõ<br>ràng cho từng trường<br>hợp.|
|---|---|
|<br>Phân vùng hợp lệ<br>(Valid Partitions):<br>VP4.1: Trùng khớp<br>hoàn toàn từng ký<br>tựvới trường Mật<br>khẩu||
|(confirm_password<br>=== password).<br>Phân vùng không<br>hợp lệ(Invalid<br>Partitions):<br>IP4.1: Bỏtrống<br>("").<br>IP4.2: Không khớp<br>với mật khẩu (Khác<br>ký tựhoặc khác<br>chữhoa/thường, ví<br>dụ: "Pass123!" vs<br>"Pass123$").<br>BƯỚC 2: MA TRẬN<br>KẾT HỢP CÁC<br>PHÂN VÙNG<br>(DOMAIN<br>COMBINATORIAL<br>MATRIX)<br>Đểbao phủtoàn bộ<br>các miền giá trịmà<br>không bịhiện<br>tượng Fault<br>Masking (Lỗi này<br>che khuất lỗi khác),<br>ta tuân thủnguyên<br>tắc:||
|Valid Case: Kết hợp<br>cácphân vùnghợp||



|lệcủa tất cảcác|
|---|
|biến đầu vào.|
|Invalid Case|
|(Single Fault<br>Assumption):<br>Trong mỗi ca kiểm<br>thửlỗi, chỉđúng 1<br>|
|biến mang giá trị<br>không hợp lệ, tất cả<br>|
|các biến còn lại<br>phải giữ ởphân<br>vùng hợp lệchuẩn<br>(Base Valid<br>Values):<br>HọTên chuẩn:|
|Nguyen Van A|
|(VP1.1)<br>Email chuẩn:<br>valid_unique@esh<br>op.com (VP2.1)<br>Mật khẩu chuẩn:<br>Test@1234|
|(VP3.1)<br>|
|Xác nhận MK<br>|
|chuẩn: Test@1234<br>|
|(VP4.1)|
|Ma trận Test ID<br>|
|HọTên|
|Email Mật<br><br>|
|khẩu<br>Xác nhận|
|MK<br>Phân vùng|
|<br>mục tiêu cần kiểm<br><br>|
|thử<br>Mục đích<br>|
|kiểm tra|
|TC_REG_01|
|VP1.1|
|VP2.1<br>VP3.1 (Biên<br>|
|8 ký tự)|
|<br>VP4.1<br>Baseline|
|Happy Path<br>Đăng ký<br>|
|thành công với|
|<br>biên tối thiểu (8 ký|
|<br>tự)|
|TC_REG_02|
|VP1.1|
|VP2.1|
|VP3.1(> 8|



|ký tự) VP4.1|
|---|
|Valid|
|<br>Partition mởrộng|
|Đăng ký<br>|
|thành công với mật<br>|
|khẩu dài & ký tự<br>|
|đặc biệt khác ($)|
|TC_REG_03|
|IP1.1|
|VP2.1|
|VP3.1|
|VP4.1<br>|
|Kiểm thử<br>|
|Họtên Họtên để<br>|
|trống|
|TC_REG_04|
|IP1.2|
|VP2.1|
|VP3.1|
|VP4.1<br>|
|Kiểm thử|
|Họtên Họtên chỉ<br>|
|toàn khoảng trắng|
|TC_REG_05<br>|
|VP1.1|
|IP2.1|
|VP3.1|
|VP4.1<br>|
|Kiểm thử|
|Email Email để|
|trống|
|TC_REG_06|
|VP1.1<br>|
|IP2.2<br>|
|VP3.1|
|VP4.1<br>|
|Kiểm thử<br>|
|Email Email thiếu|
|@|
|TCREG07|
|__<br>VP1.1<br>|
|IP2.3|
|VP3.1|
|VP4.1|
|Kiểm thử<br>|
|Email Email thiếu<br>|
|Domain (user@)|
|TC_REG_08|
|VP1.1|
|IP2.4|



|VP3.1<br>|
|---|
|VP4.1|
|Kiểm thử<br>|
|Email Email thiếu<br>|
|tên người dùng|
|(@eshop.com)<br>|
|TC_REG_09|
|VP1.1<br>|
|IP2.5|
|VP3.1|
|VP4.1<br>|
|Kiểm thử<br>|
|Email Email thiếu|
|TLD|
|(user@domain)|
|TC_REG_10|
|VP1.1<br>|
|IP2.6<br>|
|VP3.1<br>|
|VP4.1|
|Kiểm thử|
|Email Email chứa|
|khoảng trắng<br>|
|TC_REG_11<br>|
|VP1.1|
|IP2.7<br>VP3.1<br>|
|VP4.1|
|Kiểm thử<br>|
|Email Email đã|
|tồn tại trong hệ|
|thống<br>|
|TC_REG_12|
|VP1.1|
|VP2.1|
|IP3.1|
|VP4.1 (theo<br>|
|MK)<br>Kiểm thử|
|Mật khẩu<br>Mật|
|khẩu đểtrống|
|<br>TC_REG_13|
|VP1.1|
|VP2.1|
|IP3.2 (Biên|
|7 ký tự)|
|VP4.1 (theo|
|MK)<br>Kiểm thử|
|Mật khẩu<br>Mật<br>|
|khẩu 7 ký tự(dưới|
|ngưỡngtối thiểu)|



|TC_REG_14|
|---|
|VP1.1|
|VP2.1<br>IP3.3<br>|
|VP4.1 (theo<br> <br>|
|MK)<br>Kiểm thử<br>|
|Mật khẩu<br>Mật<br>|
|khẩu thiếu chữin<br>|
|hoa<br>|
|TC_REG_15|
|VP1.1<br>|
|VP2.1|
|IP3.4<br>|
|VP4.1 (theo<br> <br>|
|MK)<br>Kiểm thử<br>|
|Mật khẩu<br>Mật<br>|
|khẩu thiếu chữin<br>|
|thường|
|TC_REG_16<br>|
|VP1.1<br>|
|VP2.1|
|IP3.5|
|VP4.1 (theo<br> <br>|
|MK)<br>Kiểm thử<br>|
|Mật khẩu<br>Mật<br>|
|khẩu thiếu chữsố<br>|
|TC_REG_17<br>|
|VP1.1<br>VP2.1<br>|
|IP3.6<br>VP4.1 (theo<br> <br>|
|MK)<br>Kiểm thử<br>|
|Mật khẩu<br>Mật<br>|
|khẩu thiếu ký tự<br>|
|đặc biệt<br>|
|TC_REG_18|
|VP1.1|
|VP2.1<br>|
|IP3.7<br>|
|VP4.1 (theo|
|<br>MK)<br>Kiểm thử<br> <br>|
|Mật khẩu<br>Mật<br>|
|khẩu dùng ký tự<br>|
|đặc biệt ngoài tập|
|<br>@,$,!,%,*,?,& (Ví dụ|
|<br>#)<br>|
|TC_REG_19|
|VP1.1<br>|
|VP2.1|
|VP3.1|



|IP4.1<br>Kiểm thử|
|---|
|Xác nhận MK<br>Xác<br>|
|nhận mật khẩu để<br>|
|trống<br>|
|TC_REG_20|
|VP1.1|
|VP2.1|
|VP3.1<br>|
|IP4.2|
|Kiểm thử<br> <br>|
|Xác nhận MK<br>Xác<br>|
|nhận mật khẩu<br>|
|không khớp (Case-<br>|
|sensitivity / Khác<br>|
|ký tự)<br>|
|BƯỚC 3: DANH<br>|
|SÁCH TEST CASE<br>|
|CHI TIẾT (TEST<br>SPECIFICATION)<br>Giảđịnh tiền điều<br>|
|kiện: Email<br>existing_user@esh<br>op.com đã được<br>|
|đăng ký trước đó<br>trong CSDL để<br>phục vụkiểm thử<br>tính duy nhất.<br>|
|Test ID Input Data<br>|
|Expected|
|<br>Output Type<br> <br>|
|TC_REG_01<br>- Họ|
|Tên: Nguyen Van|
|A<br>- Email:<br>|
|newuser01@eshop<br>.com<br>- Mật|
|khẩu: Pass123! (8|
|<br>ký tựbiên)<br>-|
|<br>Xác nhận MK:|
|Pass123!|
|Đăng ký<br>|
|thành công, hệ|
|thống lưu tài khoản|
|và chuyển hướng|
|người dùng sang|
|màn hình Đăng|
|nhập (/login).<br>|
|Valid|
|TC_REG_02<br>- Họ|



|Tên: Tran Thi|
|---|
|B<br>- Email:|
|newuser02@eshop|
|.com<br>- Mật<br>|
|khẩu:<br>|
|Secure$Password2|
|026<br>- Xác nhận|
|MK:<br>|
|Secure$Password2|
|026<br>Đăng ký|
|thành công, thông<br>|
|báo thành công và<br>|
|chuyển hướng sang|
|/login. Valid|
|TC_REG_03<br>- Họ<br>|
|Tên: "" (Để<br>|
|trống)<br>- Email:<br>|
|user03@eshop.co<br>|
|m<br>- Mật khẩu:|
|Test@1234<br>-|
|Xác nhận MK:<br> <br>|
|Test@1234<br>Hệ|
|thống từchối đăng|
|<br>ký, báo lỗi: "HọTên<br>|
|không được để<br>"|
|trống. Invalid|
|<br>TC_REG_04<br>- Họ|
|Tên: " " (Khoảng|
|<br>trắng)<br>- Email:<br>user04@eshop.co<br>|
|m<br>- Mật khẩu:|
|Test@1234<br>-|
|Xác nhận MK:|
|Test@1234<br>Hệ|
|thống từchối đăng<br> "|
|ký, báo lỗi: HọTên|
|không hợp lệ".|
|<br>Invalid|
|TC_REG_05<br>- Họ|
|Tên: Nguyen Van<br>""|
|A<br>- Email:|
|(Đểtrống)<br>-|
|<br>Mật khẩu:|
|Test@1234<br>-|
|Xác nhận MK:|
|Test@1234<br>Hệ<br>|
|thống từchối đăng|
|ký, báo lỗi: "Email<br>|
|không được để|
|trống". Invalid|



|TC_REG_06<br>- Họ|
|---|
|Tên: Nguyen Van|
|<br>A<br>- Email:|
|usereshop.com<br>|
|(Thiếu @)<br>-<br>|
|Mật khẩu:|
|Test@1234<br>-<br>|
|Xác nhận MK:|
|Test@1234<br>Hệ<br>|
|thống từchối đăng<br>|
|ký, báo lỗi: "Email<br>không đúng định<br>|
|dạng". Invalid|
|TC_REG_07<br>- Họ|
|Tên: Nguyen Van|
|A<br>- Email:<br>|
|user@ (Thiếu|
|domain)<br>- Mật<br>|
|khẩu:|
|Test@1234<br>-|
|Xác nhận MK:<br> <br>|
|Test@1234<br>Hệ|
|thống từchối đăng<br>ký, báo lỗi: "Email<br>không đúng định<br>"|
|dạng. Invalid|
|<br>TC_REG_08<br>- Họ<br>|
|Tên: Nguyen Van|
|<br>A<br>- Email:<br>@eshop.com<br>(Thiếu local-<br>|
|part)<br>- Mật|
|<br>khẩu:|
|Test@1234<br>-|
|Xác nhận MK:|
|Test@1234<br>Hệ|
|thống từchối đăng<br>ký, báo lỗi: "Email|
|<br>không đúng định<br>"|
|dạng. Invalid|
|<br>TC_REG_09<br>- Họ|
|Tên: Nguyen Van|
|<br>A<br>- Email:|
|user@eshop|
|<br>(Thiếu TLD)<br>-|
|Mật khẩu:|
|Test@1234<br>-|
|Xác nhận MK:|
|Test@1234<br>Hệ|
|thốngtừchối đăng|



|ký, báo lỗi: "Email|
|---|
|không đúng định|
|dạng". Invalid|
|TC_REG_10<br>- Họ|
|Tên: Nguyen Van|
|A<br>- Email: user|
|name@eshop.com<br>|
|(Có space)<br>-<br>|
|Mật khẩu:|
|Test@1234<br>-|
|Xác nhận MK:|
|Test@1234<br>Hệ<br>|
|thống từchối đăng<br>|
|ký, báo lỗi: "Email|
|không đúng định<br>|
|dạng". Invalid|
|TC_REG_11<br>- Họ|
|Tên: Nguyen Van<br>A<br>- Email:<br>existing_user@esh|
|op.com<br>- Mật<br>|
|khẩu:|
|Test@1234<br>-<br>|
|Xác nhận MK:|
|Test@1234<br>Hệ<br>|
|thống từchối đăng<br>|
|ký, báo lỗi: "Email<br>|
|đã tồn tại trong hệ|
|<br>thống". Invalid<br> <br>|
|TC_REG_12<br>- Họ|
|Tên: Nguyen Van<br>|
|A<br>- Email:<br>|
|user12@eshop.co<br>|
|m<br>- Mật khẩu:|
|"" (Đểtrống)<br>-|
|<br>Xác nhận MK: ""<br>|
|Hệthống từ<br>chối đăng ký, báo<br>"|
|lỗi: Mật khẩu|
|không được để<br>"|
|trống. Invalid|
|<br>TC_REG_13<br>- Họ|
|Tên: Nguyen Van|
|<br>A<br>- Email:|
|user13@eshop.co|
|m<br>- Mật khẩu:|
|Pass1@a (7 ký tự-|
|<br>Biên dưới)<br>-|
|Xác nhận MK:|
|Pass1@a<br>Hệ|



|thống từchối đăng|
|---|
|<br>ký, báo lỗi: "Mật|
|khẩu phải dài tối<br>thiểu 8 ký tự".|
|Invalid|
|TC_REG_14<br>- Họ|
|Tên: Nguyen Van<br>A<br>- Email:|
|user14@eshop.co<br>|
|m<br>- Mật khẩu:<br>|
|pass@1234 (Thiếu|
|chữhoa)<br>- Xác|
|nhận MK:|
|pass@1234<br>Hệ<br>|
|thống từchối đăng<br>ký, báo lỗi: "Mật<br>|
|khẩu phải chứa ít<br>nhất 1 chữin hoa".|
|Invalid<br>|
|TC_REG_15<br>- Họ|
|Tên: Nguyen Van<br>A<br>- Email:|
|user15@eshop.co<br>m<br>- Mật khẩu:<br>PASS@1234<br>(Thiếu chữ<br>|
|thường)<br>- Xác<br>nhận MK:<br> <br>|
|PASS@1234<br>Hệ|
|<br><br>thống từchối đăng<br>ký, báo lỗi: "Mật<br>khẩu phải chứa ít<br>|
|nhất 1 chữin|
|thường".<br>Invalid<br> <br>|
|TC_REG_16<br>- Họ|
|Tên: Nguyen Van|
|<br>A<br>- Email:<br>|
|user16@eshop.co<br>m<br>- Mật khẩu:<br>Password@!<br>|
|(Thiếu số)<br>-|
|<br>Xác nhận MK:|
|Password@!<br>Hệ|
|thống từchối đăng|
|ký, báo lỗi: "Mật|
|khẩu phải chứa ít|
|nhất 1 chữsố".<br>|
|Invalid|
|TC_REG_17<br>- Họ|



|Tên: Nguyen Van|
|---|
|A<br>- Email:|
|user17@eshop.co<br>|
|m<br>- Mật khẩu:|
|Password123<br>|
|(Thiếu ký tựđặc<br>|
|biệt)<br>- Xác<br>|
|nhận MK:<br>|
|Password123 Hệ<br>|
|thống từchối đăng<br>|
|ký, báo lỗi: *"Mật<br>|
|khẩu phải chứa ít<br>|
|nhất 1 ký tựđặc<br>|
|biệt (@, $, !, %, , ?,<br> <br>|
|&)".<br>Invalid<br> <br>|
|TCREG18<br>- Họ|
|__<br><br>Tên: Nguyen Van<br>A<br>- Email:<br>|
|user18@eshop.co<br>|
|m<br>- Mật khẩu:|
|Password#123<br>|
|(Dùng ký tự#|
|<br>ngoài nhóm)<br>-<br>Xác nhận MK:<br>|
|Password#123 Hệ|
|thống từchối đăng<br>ký, báo lỗi: *"Ký tự<br>đặc biệt chỉđược<br>|
|thuộc nhóm: @, $, !,<br>"|
|%, , ?, &.|
|<br>Invalid|
|TC_REG_19<br>- Họ|
|Tên: Nguyen Van|
|<br>A<br>- Email:<br>|
|user19@eshop.co<br>|
|m<br>- Mật khẩu:|
|Test@1234<br>-|
|Xác nhận MK: ""|
|(Đểtrống)<br>Hệ|
|<br>thống từchối đăng|
|<br>ký, báo lỗi: "Vui|
|<br>lòng xác nhận mật|
|khẩu". Invalid|
|TC_REG_20<br>- Họ|
|Tên: Nguyen Van|
|<br>A<br>- Email:|
|user20@eshop.co|
|m<br>- Mật khẩu:|
|Test@1234<br>-<br>|
|Xác nhận MK:|



|Test@12345|
|---|
|(Không khớp) Hệ<br>|
|thống từchối đăng<br>|
|ký, báo lỗi: "Xác<br>|
|nhận mật khẩu<br>|
|không khớp với<br>|
|mật khẩu".<br>|
|Invalid<br>|
|BƯỚC 4: GIẢI<br>|
|THÍCH CHI TIẾT<br>|
|CÁC BƯỚC ĐÃ ÁP|
|<br>DỤNG|
|Kỹthuật Phân vùng|
|tương đương<br>(Equivalence<br>Partitioning - EP):|
|Bản chất: Giảđịnh<br>|
|rằng nếu một giá<br>|
|trịtrong phân vùng<br>|
|hoạt động đúng<br>|
|(hoặc kích hoạt|
|lỗi), thì mọi giá trị<br>|
|khác trong cùng<br>|
|phân vùng đó cũng<br>|
|sẽcó hành vi tương<br>|
|tự.<br>|
|Cách áp dụng: Với|
|<br>từng trường, ta bóc<br>|
|tách các yêu cầu|
|<br>nghiệp vụthành<br>|
|hai nhóm đối lập:|
|<br>Miền hợp lệ(Valid<br>|
|Partition): Tập các|
|<br>giá trịhệthống<br>phải xửlý thành<br>|
|công (Ví dụ: email<br>|
|có @ và domain,<br>mật khẩu hội đủcả<br>4 tiêu chuẩn ký tự).|
|Miền không hợp lệ|
|<br>(Invalid Partition):|
|<br>Tập các giá trịvi|
|phạm quy tắc mà|
|hệthống phải bắt<br>|
|lỗi (Ví dụ: thiếu chữ|
|hoa, thiếu số, thiếu|
|ký tựđặc biệt,|
|email trùng lặp).|
|Kỹthuật Phân tích|



|giá trịbiên|
|---|
|(Boundary Value<br>Analysis - BVA):|
|Bản chất: Lỗi lập<br>|
|trình thường xuất<br>|
|hiện nhiều nhấtở<br>|
|các điểm biên của<br>|
|điều kiện so sánh|
|(ví dụ: dùng sai|
|toán tử> thay vì<br>|
|>=).<br>|
|Cách áp dụng: Áp<br>|
|dụng trực tiếp vào<br>|
|điều kiện độdài<br>|
|mật khẩu $\ge 8$:<br>|
|Giá trịbiên không<br>|
|hợp lệtối đa: 7 ký<br>|
|tự(TC_REG_13 - hệ<br>|
|thống phải từchối).|
|<br>Giá trịbiên hợp lệ<br>|
|tối thiểu: 8 ký tự|
|<br>(TCREG01 - hệ|
|__<br>thống phải chấp<br>|
|nhận).<br>|
|Nguyên tắc "Đơn|
|<br>biến lỗi" (Single<br>|
|Fault Assumption /|
|<br>One-Factor-At-A-<br>Time):|
|Bản chất: Nếu đưa<br>|
|vào 1 test case có<br>|
|cảEmail sai định<br>|
|dạng và Mật khẩu<br>|
|thiếu chữsố, khi hệ|
|thống trảvềlỗi<br>"Email sai định|
|dạng", ta sẽkhông|
|<br>biết được logic|
|kiểm tra mật khẩu|
|có thực sựhoạt|
|động hay không|
|<br>(hiện tượng Fault|
|<br>Masking).|
|<br>Cách áp dụng:|
|Trong bảng ma|
|<br>trậnởBước 2, mỗi|
|ca Invalid chỉkích|
|hoạt duynhất 1|



||phân vùng lỗi, 3<br>trường còn lại bắt<br>buộc phải lấy giá trị<br>hợp lệtiêu chuẩn.<br>Nhờđó, nếu test<br>case FAIL, ta định<br>vịchính xác lỗi<br>thuộc vềbiến nào.<br>Độbao phủmiền<br>(Domain<br>Coverage):<br>Tập 20 Test Cases<br>trên đạt 100% độ<br>bao phủcác phân<br>vùng hợp lệvà<br>không hợp lệ<br>(Partition<br>Coverage) đã xác<br>định theo đặc tả<br>FR-01, đồng thời<br>kiểm tra đầy đủcác<br>ràng buộc vềtính<br>duy nhất (Unique),<br>tính toàn vẹn<br>(Case-sensitivity)<br>và tập con ký tự<br>đặc biệt chophép.|||
|---|---|---|---|
|**Tool: Gemini**<br>**Date: 17/10/2026**<br>**21:03**<br>**Prompt: “"Bây giờ**<br>**hãy áp dụng kỹ**<br>**thuật Boundary**<br>**Value Analysis**<br>**(BVA) cho các biến**<br>**có giá trị biên**<br>**trong tính năng**<br>**trên:Xác định các**<br>**trường có biên.**<br>**Xác định các mốc**<br>**biên theo chuẩn 2-**<br>**value hoặc 3-value**<br>**BVA (ví dụ với**<br>**Min=8: 7, 8, 9; với**<br>**Max=255: 254, 255,**<br>**256).Tạo danh**<br>**sách Test Cases**<br>**kiểm thử biên chi**<br>**tiết bao gồm: Field,**<br>**Boundary Point**|Dưới đây là tài liệu<br>thiết kếkiểm thử<br>chuyên sâu áp<br>dụng kỹthuật<br>Boundary Value<br>Analysis (BVA -<br>Phân tích giá trị<br>biên) cho tính năng<br>FR-01: Đăng ký tài<br>khoản của hệthống<br>EShop.<br>PHẦN 1: XÁC ĐỊNH<br>CÁC TRƯỜNG CÓ<br>GIÁ TRỊBIÊN<br>Trong tính năng<br>Đăng ký tài khoản,<br>các trường có ràng<br>buộc vềsốlượng|Valid|Ổn|





|**($min-1$, $min$,**|hoặc độdài miền|
|---|---|
|**$min+1$, v.v.),**<br>|giá trị|
|**Input Data,**<br>**Expected**<br>**Result.Giải thích rõ**<br>**phương pháp xác**<br>**định mốc biên."”**|(Ordered/Sequenti<br>al Domains) bao<br>gồm:<br>Mật khẩu<br>(password):|
||Biên độdài<br>(Length<br>Boundary):<br>Đặc tảquy định:<br>"Tối thiểu 8 ký tự"<br>$\rightarrow$ Biên dưới $Min =<br>8$.<br>Chuẩn bảo mật &<br>hệthống (Web/DB<br>standard): Tránh<br>các cuộc tấn công<br>DoS thuật toán<br>băm<br>(BCrypt/Argon2)<br>và tràn bộnhớ, độ<br>dài tối đa tiêu<br>chuẩn của mật<br>khẩu là $Max =<br>128$ ký tự(hoặc<br>$Max = 255$ theo<br>chuẩn lưu trữDB).<br>Ởđây ta chuẩn hóa<br>miền: $[8, 128]$ ký<br>tự.<br>Biên sốlượng ký tự<br>theo từng loại<br>(Count Boundary):<br>Tối thiểu 1 chữin<br>hoa ($Min = 1$).<br>Tối thiểu 1 chữin<br>thường ($Min =<br>1$).<br>Tối thiểu 1 chữsố<br>($Min = 1$).<br>Tối thiểu 1 ký tự<br>đặc biệt ($Min =<br>1$).<br>HọTên (name):|
||Đặc tả: "Bắt buộc"|







|$\rightarrow$ Độ<br>|
|---|
|dài tối thiểu không<br>|
|rỗng: $Min = 1$ ký|
|tự.<br>|
|Độdài tối đa chuẩn<br>theo thiết kế<br>trường tên người<br>dùng: $Max = 255$ ký tự(chuẩn lưu<br>trữDB|
|TEXT/VARCHAR(2<br>55)).<br>Email (email):<br>Theo chuẩn|
|Internet RFC 5321|
|/ RFC 5322:<br>|
|Địa chỉemail có độ<br>dài tối thiểu hợp lệ<br>là 6 ký tự(ví dụ:<br>a@b.co)<br>$\rightarrow Min<br>= 6$.<br>Độdài tối đa toàn<br>|
|bộđịa chỉemail là|
|<br>254 ký tự(Local<br>|
|part $\le 64$ ký tự,<br>|
|Domain part $\le<br>253$ ký tự)<br>$\rightarrow Max<br>= 254$.|
|<br>Xác nhận mật khẩu<br>(confirm_password<br>):<br>Biên sai lệch độdài<br>|
|so với Password<br>|
|(Relational<br>|
|Boundary):|
|<br>Độdài bằng chính<br>xác độdài<br>Password ($\Delta<br>L = 0$).<br>|
|Biên sai lệch ngay|
|<br>sát: Thiếu 1 ký tự|
|<br>($\Delta L = -1$)|
|<br>hoặc Thừa 1 ký tự<br>|
|($\Delta L = +1$).<br>|
|PHẦN 2: XÁC ĐỊNH|
|CÁC MỐC BIÊN|







|THEO CHUẨN 2-|
|---|
|VALUE VÀ 3-|
|VALUE BVA<br>Quyước:<br>2-value BVA<br>(ISTQB Standard):<br>Với mỗi biên, chỉ<br>xét 2 điểm: 1 điểm|
|trên biên (On-|
|boundary) và 1<br>|
|điểm ngay sát|
|ngoài biên (Off-|
|boundary).<br>3-value BVA|
|(Rigorous/Detailed<br>|
|): Xét 3 điểm lân<br>|
|cận cho mỗi mốc|
|biên: ${Edge - 1,|
|Edge, Edge + 1}$.<br>|
|Bảng tổng hợp các<br>mốc biên:<br>Tên trường<br>Tiêu chí xét<br> <br>|
|biên<br>Miền hợp lệ<br>|
|$[Min, Max]$ Mốc 2-<br>value BVA<br>Mốc 3-<br>value BVA<br>Mật khẩu<br> <br>|
|(password)<br>Độ<br>|
|dài chuỗi (ký tự)<br>$[8, 128]$ - Cận dưới:<br>|
|$7$, $8$ - Cận<br>|
|trên: $128$, $129$|
|<br>- Cận dưới:|
|$7$, $8$, $9$ -|
|<br>Cận trên: $127$,<br>$128$, $129$|
|<br>Mật khẩu<br> <br>|
|(password)<br>Số|
|<br>lượng chữhoa|
|<br>$\ge 1$|
|<br>$0$, $1$|
|$0$, $1$,<br>$2$  ẩ|
|Mật khu<br><br>ố|
|(password)<br>S|







|lượng chữsố|
|---|
|$\ge 1$|
|$0$, $1$|
|$0$, $1$,<br>$2$ Mật khẩu<br>|
|(password)<br>Số|
|lượng ký tựđặc biệt|
|$\ge 1$ $0$, $1$ $0$, $1$,<br>$2$|
|HọTên (name) Độ<br>|
|dài chuỗi (ký tự)|
|$[1, 255]$ - Cận dưới:<br>|
|$0$, $1$ - Cận|
|trên: $255$, $256$|
|- Cận dưới:|
|$0$, $1$, $2$ -<br>Cận trên: $254$,<br>$255$, $256$ Email (email)<br>Tổng độdài<br>RFC 5321<br>$[6,<br>|
|254]$ - Cận dưới:<br>|
|$5$, $6$ - Cận<br>|
|trên: $254$ $255$|
|,<br>- Cận dưới:|
|<br>$5$, $6$, $7$ -<br>Cận trên: $253$,<br>$254$, $255$|
|Xác nhận MK<br>Độ<br>|
|lệch ký tựso với|
|<br>MK<br>$0$ (Trùng|
|<br>khớp) $-1$, $0$|
|$-1$, $0$,|
|<br>$+1$ PHẦN 3: DANH|
|SÁCH TEST CASES<br>KIỂM THỬBIÊN|
|CHI TIẾT|
|Tiền điều kiện giả|
|<br>định: Các trường|
|<br>khác không tham|
|<br>gia kiểm thửbiên|
|<br>sẽgiữ ởgiá trị<br>chuẩn hợp lệ:|
|HọTên chuẩn:|







|"Nguyen Van A"<br>|
|---|
|Email chuẩn:|
|valid_<timestamp><br>@eshop.com<br>Mật khẩu chuẩn:<br>|
|"Test@1234" (8 ký<br>tự)<br>Xác nhận MK<br>chuẩn: Giống hệt<br>Mật khẩu<br>Test ID Field<br>Boundary|
|Point Input Data<br>|
|Expected<br>Result Type<br>TC_BVA_01<br>|
|password<br>$min - 1$ (7 ký tự)<br>Pass1@a (7<br>|
|ký tự: 1 hoa, 3<br>|
|thường, 1 số, 1 ký<br>   <br>|
|tựđặc biệt)<br>Báo|
|<br>lỗi: "Mật khẩu phải<br>  "|
|từ8 ký tựtrởlên.|
|<br>Từchối đăng ký.<br>Invalid<br>TC_BVA_02<br>|
|password<br>|
|$min$ (8|
|<br>ký tự) Pass1@ab<br>|
|(8 ký tự: đủ4 nhóm|
|<br>ký tự) Đăng ký<br>|
|thành công, chuyển|
|<br>hướng tới /login.<br>Valid<br>TC_BVA_03<br>|
|password|
|$min + 1$ (9 ký tự)|
|<br>Pass1@abc|
|(9 ký tự: đủ4 nhóm|
|<br>ký tự) Đăng ký|
|thành công, chuyển<br>hướng tới /login.<br>Valid<br>TC_BVA_04|
|password|
|$max - 1$|
|(127 kýtự)|







|Chuỗi 127|
|---|
|ký tự: Pass1@ +|
|121 ký tựa|
|Đăng ký<br>thành công, chuyển<br>hướng tới /login.<br>Valid<br>TC_BVA_05<br>password<br>$max$ (128 ký tự)<br>Chuỗi 128|
|ký tự: Pass1@ +|
|122 ký tựa|
|Đăng ký<br>thành công, chuyển<br>hướng tới /login.<br>Valid<br>TC_BVA_06<br>password<br>$max + 1$ (129 ký tự)<br>Chuỗi 129<br>ký tự: Pass1@ +<br>123 ký tựa<br>Báo<br>|
|lỗi: "Mật khẩu vượt|
|<br>quá độdài tối đa<br>128 ký tự".<br>Invalid<br>TC_BVA_07<br>password<br>(Chữhoa)<br>$min - 1$ (0 chữhoa)<br>pass@1234<br>(8 ký tự, 0 hoa, 4<br>|
|thường, 3 số, 1 đặc<br>biệt)<br>Báo lỗi:<br>"Mật khẩu phải<br>chứa ít nhất 1 chữ<br>in hoa". Invalid<br>TC_BVA_08<br>password<br>(Chữhoa)<br>$min$ (1<br>chữhoa)<br>Pass@123<br>(8 ký tự, đúng 1<br>chữhoa 'P')<br>Đăngký|







|thành công.<br>Valid<br>TC_BVA_09<br>|
|---|
|password<br>(Chữhoa)<br>|
|$min + 1$ (2 chữhoa)<br>|
|PAss@123<br>|
|(8 ký tự, 2 chữhoa<br>|
|'P', 'A') Đăng ký<br>thành công.<br>Valid<br>TC_BVA_10<br>|
|password<br>(Chữsố)<br>|
|$min - 1$ (0 chữsố)<br>Pass@wor<br>|
|d (9 ký tự, 0 số)<br>Báo lỗi:<br>"Mật khẩu phải<br>chứa ít nhất 1 chữ<br>số".<br>Invalid<br>TC_BVA_11<br>password<br>(Chữsố)<br>$min$ (1<br>chữsố)<br>Pass@wor<br>|
|1 (9 ký tự, đúng 1|
|<br>chữsố'1')|
|<br>Đăng ký<br>thành công.<br>Valid<br>TC_BVA_12<br>password<br>(Ký tựđb)<br>|
|$min - 1$ (0 ký tựđb)<br>Password1|
|2 (10 ký tự, 0 ký tự|
|đặc biệt)<br>Báo|
|lỗi: "Mật khẩu phải|
|chứa ít nhất 1 ký tự|
|<br>đặc biệt".<br>Invalid<br>TC_BVA_13|
|password|
|(Ký tựđb)<br>$min$ (1|







|ký tựđb)|
|---|
|Password1|
|2@ (11 ký tự, đúng<br>|
|1 ký tự'@')<br>Đăng ký<br>thành công.<br>Valid<br>TC_BVA_14<br>name<br>$min - 1$ (0 ký tự)<br>""<br>(Chuỗi rỗng / để<br>trống) Báo lỗi: "Họ<br>Tên không được để<br>trống". Invalid<br>TC_BVA_15<br>name<br>$min$ (1<br>ký tự) "A" (Độdài<br>1 ký tự)<br>Đăng ký<br>thành công.<br>Valid<br>TC_BVA_16<br>name<br>$min + 1$ (2 ký tự)<br>"An" (Độ<br>dài 2 ký tự)<br>Đăng ký<br>thành công.<br>Valid<br>TC_BVA_17<br>name<br>$max$ (255 ký tự)|
|<br>Chuỗi 255|
|ký tựchữcái "A...A"<br>Đăng ký<br>thành công, lưu<br>trọn vẹn họtên vào|
|CSDL. Valid<br>TC_BVA_18|
|name<br>$max + 1$ (256 ký tự)<br>Chuỗi 256|
|ký tựchữcái "A...A"|
|Báo lỗi: "Họ<br>Tên khôngđược|







|vượt quá 255 ký|
|---|
|tự".<br>Invalid<br>TC_BVA_19<br>email<br>$min - 1$ (5 ký tự)<br>a@b.c (5 ký<br>|
|tự- TLD 1 ký tự<br>|
|không hợp lệ) Báo|
|<br>lỗi: "Email không<br>đúng định dạng".<br>Invalid<br>TC_BVA_20<br>email<br>$min$ (6<br>ký tự) a@b.co<br>|
|(Đúng 6 ký tự<br>chuẩn RFC)<br>Đăng ký<br>thành công.<br>Valid<br>TC_BVA_21<br>email<br>$max$   <br>|
|(254 ký tự)<br>64<br>|
|ký tựlocal + @ +|
|<br>189 ký tựdomain<br>(Tổng = 254)<br>Đăng ký<br>thành công.<br>Valid<br>TC_BVA_22<br>email<br>$max + 1$   <br>|
|(255 ký tự)<br>64<br>|
|ký tựlocal + @ +|
|<br>190 ký tựdomain|
|<br>(Tổng = 255) Báo<br>lỗi: "Email vượt<br>quá độdài tối đa|
|<br>cho phép".<br>Invalid<br>TC_BVA_23|
|confirm_pa<br>ssword $\Delta L =|
|<br>-1$ (Thiếu 1 ký tự)|
|MK:|
|Pass123! (8 ký|
|<br>tự)<br>Xác nhận<br>|
|MK: Pass123(7 ký|







|tự)<br>Báo lỗi:|
|---|
|"Xác nhận mật|
|khẩu không khớp".<br>Invalid<br>TC_BVA_24|
|confirm_pa|
|ssword $\Delta L =<br>|
|0$ (Khớp chính<br>xác)<br>MK:<br>Pass123! (8 ký|
|tự)<br>Xác nhận|
|MK: Pass123! (8 ký|
|tự)<br>Đăng ký|
|thành công.<br>Valid<br>TC_BVA_25|
|confirm_pa<br>|
|ssword $\Delta L =|
|+1$ (Thừa 1 ký tự)|
|<br>MK:<br>Pass123! (8 ký<br>tự)<br>Xác nhận|
|MK: Pass123!a (9|
|<br>ký tự) Báo lỗi:|
|<br>"Xác nhận mật<br>khẩu không khớp".<br>Invalid<br>PHẦN 4: GIẢI|
|THÍCH PHƯƠNG<br>PHÁP XÁC ĐỊNH<br>MỐC BIÊN<br>|
|1. Cơsởlý thuyết<br>|
|của Boundary<br>Value Analysis<br>(BVA)<br>|
|Lỗi kinh điển Off-<br>|
|by-one (Lỗi lệch 1|
|<br>đơn vị): Trong thực|
|<br>tếphát triển phần|
|<br>mềm, lập trình viên|
|thường xuyên mắc|
|<br>lỗi khi cài đặt các|
|biểu thức điều kiện|
|so sánh, ví dụ:|
|Viết nhầm length >|
|8 thay vì length >=|
|<br>8 (dẫn tới việc mật|
|khẩu 8 ký tựhợp lệ<br>|
|bịtừchối oan).|
|Viết nhầm length|







|<= 255 thành<br>|
|---|
|length < 255 (dẫn|
|tới việc tên dài 255<br>|
|ký tựbịbáo lỗi).<br>|
|BVA tập trung kiểm<br>tra chính xác tại<br>các ranh giới<br>chuyển tiếp giữa<br>vùng Hợp lệvà<br>|
|vùng Không hợp lệ,<br>nơi xác suất phát<br>|
|sinh lỗi logic là cao|
|<br>nhất.<br>2. Định nghĩa các<br>|
|khái niệm mốc biên|
|(On-point và Off-<br>point)<br>Theo tiêu chuẩn<br>kiểm thửphần<br>mềm quốc tế<br>ISO/IEC/IEEE<br>29119 và ISTQB:<br>On-point (Điểm<br>|
|trên biên): Là giá|
|<br>trịnằm chính xác<br>trên đường ranh<br>giới.<br>Nếu biên đóng<br>|
|(thuộc miền hợp lệ,<br>ví dụ$length \ge<br>8$): On-point<br>chính là $8$ (Hợp<br>lệ).<br>Off-point (Điểm<br>|
|ngoài biên): Là giá<br>|
|trịgần On-point|
|<br>nhất nhưng nằmở|
|<br>phía đối diện của|
|<br>ranh giới (rơi vào|
|<br>miền không hợp<br>lệ).<br>Với cận dưới $Min|
|= 8$ (sốnguyên):|
|<br>Off-point là $Min -|
|<br>1 = 7$ (Không hợp|
|<br>lệ).|
|<br>Với cận trên $Max<br>|
|= 128$: Off-point là|
|<br>$Max + 1 = 129$|







|(Không hợp lệ).<br>|
|---|
|In-point (Điểm bên|
|trong biên): Là giá<br>|
|trịliền kềOn-point<br>nhưng nằm sâu<br>hơn vào phía bên<br>|
|trong miền hợp lệ<br>|
|($Min + 1 = 9$,<br>|
|$Max - 1 = 127$).|
|3. So sánh 2-Value<br>|
|BVA vs 3-Value<br>BVA<br>2-Value BVA:<br>Nguyên tắc: Mỗi<br>|
|ranh giới kiểm tra<br>|
|2 điểm: {On-point,<br>Off-point}.<br>Cận dưới $Min$:<br>${Min - 1, Min}|
|\rightarrow {7,<br>8}$.<br>Cận trên $Max$:<br>|
|${Max, Max + 1}<br>|
|\rightarrow {128,<br>129}$.<br>Khi nào áp dụng:<br>Khi tài<br>nguyên/thời gian<br>kiểm thửcó hạn,<br>|
|kiểm thửtựđộng<br>|
|API mức cơbản<br>|
|nhằm tiết kiệm chi<br>|
|phí nhưng vẫn đảm|
|<br>bảo tìm được hầu<br>|
|hết lỗi toán tử(> vs|
|<br>>=).<br>3-Value BVA:<br>Nguyên tắc: Mỗi<br>ranh giới kiểm tra<br>|
|3 điểm: {Off-point,|
|<br>On-point, In-point}|
|<br>$\rightarrow|
|<br>{Edge - 1, Edge,|
|<br>Edge + 1}$.|
|<br>Dải hoàn chỉnh|
|gồm 6 giá trị:|
|<br>${Min - 1, Min, Min|
|<br>+ 1,Max - 1,Max,|





||Max + 1}$.<br>Cụthểvới $[8,<br>128]$: ${7, 8, 9,<br>127, 128, 129}$.<br>Khi nào áp dụng:<br>Dùng cho các hệ<br>thống yêu cầu độ<br>tin cậy cao, phần<br>mềm ngân hàng,<br>thương mại điện tử,<br>hoặc khi miền giá<br>trịđược xửlý bởi<br>logic phức tạp (ví<br>dụ: regex kiểm tra<br>chuỗi, parser).<br>Điểm $Min + 1$ (In-point) giúp<br>khẳng định rằng hệ<br>thống không chỉ<br>chấp nhận điểm<br>biên mà giá trịnằm<br>bên trong phân<br>vùng hợp lệcũng<br>thực sựđược tiếp<br>nhận trơn tru.|||
|---|---|---|---|
|**Tool: Gemini**<br>**Date: 17/10/2026**<br>**21:22**<br>**Prompt: “Tôi đang**<br>**làm kiểm thử cho**<br>**ứng dụng EShop.**<br>**Hãy giúp tôi áp**<br>**dụng kỹ thuật**<br>**Domain Testing**<br>**cho tính năng FR-**<br>**07 (đặc tả trong**<br>**readme.md). Hãy**<br>**thực hiện từng**<br>**bước:Xác định các**<br>**biến đầu vào và**<br>**phân vùng tương**<br>**đương**|Bây giờtôi đã có<br>đầy đủthông tin để<br>phân tích Domain<br>Testing cho FR-07.<br>Dưới đây là kết quả<br>chi tiết:<br>🛒DOMAIN<br>TESTING CHO FR-<br>07: GIỎHÀNG<br>(SHOPPING CART)<br>📋ĐẶC TẢFR-07<br>(Tóm tắt)<br>TừREADME.md<br>(dòng 93-100):|Valid|Ổn|
|**(Equivalence**<br>**Partitioning) gồm**<br>**Valid & Invalid**<br>**Partitions.Tạo ma**<br>**trận kết hợp các**<br>**phân vùng để thiết**<br>**kế tập Test Cases**<br>**phủ toàn bộ các**<br>**miềngiá trị.Xuất**|#<br>Yêu cầu<br>R1<br>Hiển thị<br>danh sách SP với<br>các cột: Sản phẩm,<br>Đơn giá, Sốlượng<br>(có nút +/- để<br>chỉnh), Thành tiền,<br>Thao tác|||





|**danh sách Test**<br>|R2<br>Thêm cùng|
|---|---|
|**Case gồm: Test ID,**<br>**Input Data,**<br>**Expected Output,**<br>**Type**<br>**(Valid/Invalid).**<br>**Cung cấp đoạn giải**<br>**thích chi tiết từng**<br>**bước đã bạn đã áp**<br>**dụng”**|một sản phẩm vào<br>giỏ →tăng số<br>lượng, không tạo<br>dòng mới<br>R3<br>Nút Xóa<br>sản phẩm phải có<br>dialog xác nhận<br>trước khi thực hiện<br>R4<br>Có nút<br>"Tiếp tục mua sắm"<br>đểquay vềtrang<br>chủ<br>R5<br>Tổng tiền<br>hiển thịnhãn chính<br>xác: "Tổng cộng"<br>(không phải "Tổng<br>tạm tính")<br>R6<br>Giỏhàng<br>trống phải có hình<br>minh họa và thông<br>báo rõ ràng<br>Kết hợp FR-06 liên<br>quan:|
||Sốlượng<br>(quantity): số<br>nguyên dương, tối<br>thiểu là 1 (từô<br>nhập trên trang chi<br>tiết SP)<br>API POST /api/cart<br>nhận body: { id,<br>name, price,<br>quantity }<br>BƯỚC 1: XÁC ĐỊNH<br>CÁC BIẾN ĐẦU<br>VÀO VÀ PHÂN<br>VÙNG TƯƠNG<br>ĐƯƠNG<br>(Equivalence<br>Partitioning)<br>1.1 Biến đầu vào<br>Giỏhàng (FR-07)<br>có nhiều thao tác:<br>Thêm sản phẩm<br>vào giỏ, Chỉnh số<br>lượng, Xóa sản<br>phẩm,Xemgiỏ|



|trống, Nhấn nút|
|---|
|<br>điều hướng. Các|
|biến đầu vào chính:|
|Biến<br>Kiểu<br>Ràng buộc<br>|
|V1: Sốlượng sản<br>phẩm (quantity)<br>Sốnguyên<br>≥ 1, số<br>nguyên dương<br>V2: Sốloại sản<br>|
|phẩm trong giỏSố<br>nguyên ≥ 0 (giỏ<br>trống đến nhiều<br>SP)<br>|
|V3: Sản phẩm thêm<br> <br>|
|vào<br>Đối tượng<br>Sản phẩm<br>|
|phải có id, name,|
|<br>price hợp lệ<br>V4: Trùng lặp sản<br>phẩm Boolean<br>Cùng 1 SP<br>thêm lại→gộp|
|(merge), không tạo<br>dòng mới<br>V5: Thao tác xóa<br>Hành vi<br>Phải có<br>dialog xác nhận<br>trước khi xóa<br>V6: Trạng thái<br>đăng nhập<br>Boolean<br>Cần đăng<br>nhập đểthao tác|
|giỏhàng (API yêu<br>|
|cầu Bearer token)<br>|
|V7: Giá sản phẩm|
|(price) Số<br>> 0|
|1.2 Phân vùng|
|tương đương<br>(Equivalence<br>Classes)<br>V1: Sốlượng sản|
|phẩm (Quantity)|
|Phân vùng<br>Mô<br>tả<br>Ví dụ|



|Loại<br>|
|---|
|EP1.1 Sốnguyên|
|dương hợp lệ(≥ 1)|
|1, 5, 10<br>|
|Valid<br>|
|EP1.2 Sốlượng =|
|0<br>0<br>|
|Invalid<br>|
|EP1.3 Sốâm -1, -|
|5<br>Invalid<br>|
|EP1.4 Sốthập<br>|
|phân (không|
|nguyên)<br>1.5,|
|2.7<br>Invalid<br>|
|EP1.5 Chuỗi ký tự<br>|
|không phải số<br>|
|"abc", ""<br>|
|Invalid<br>|
|EP1.6 Sốrất lớn|
|999999999<br>Invalid /|
|<br>Edge<br>|
|V2: Sốloại sản<br>|
|phẩm trong giỏ<br>|
|(Cart State)<br> <br>|
|Phân vùng<br>Mô|
|<br>tả<br>Ví dụ<br>Loại|
|EP2.1 Giỏtrống|
|0 sản phẩm<br>Valid (hiển<br>thịempty state)|
|<br>EP2.2 Giỏcó 1 sản|
|phẩm 1 SP|
|Valid|
|EP2.3 Giỏcó|
|nhiều sản phẩm<br>|
|2+ SP khác<br> <br>|
|nhau<br>Valid|
|V3: Sản phẩm thêm|
|vào (Product)|
|<br>Phân vùng<br>Mô|
|<br>tả<br>Ví dụ|
|Loại|
|EP3.1 Sản phẩm|
|hợp lệ(id, name,|
|price đầy đủ)<br>{id:1,|
|name:"iPhone",|
|price:30000000}|



|Valid<br>|
|---|
|EP3.2 Sản phẩm<br>|
|thiếu id<br>{name:"iPh<br>one",<br>price:30000000}<br>Invalid<br>|
|EP3.3 Sản phẩm<br>có price ≤ 0<br>{id:1,<br>name:"iPhone",<br>price:0}<br>Invalid<br>|
|EP3.4 Sản phẩm|
|có price không<br>phải số{id:1,|
|name:"iPhone",<br>price:"abc"}<br>Invalid<br>V4: Trùng lặp sản<br>phẩm (Duplicate<br>Add)|
|Phân vùng<br>Mô|
|<br>tả<br>Ví dụ|
|Loại|
|EP4.1 Thêm SP|
|mới (chưa có trong|
|giỏ)<br>SP A lần|
|đầu<br>Valid<br>|
|EP4.2 Thêm SP đã|
|tồn tại (gộp<br> <br>|
|quantity)<br>SP<br>A lần 2→gộp|
|<br>Valid|
|V5: Thao tác xóa|
|(Remove Action)|
|Phân vùng<br>Mô|
|tả<br>Ví dụ|
|Loại|
|EP5.1 Xóa SP với|
|xác nhận dialog<br>(chấp nhận)<br>Confirm→|
|OK<br>Valid|
|EP5.2 Xóa SP với|
|xác nhận dialog|
|(hủy bỏ)<br>|
|Confirm→|
|Cancel Valid|



|EP5.3 Xóa SP|
|---|
|không có dialog|
|xác nhận<br>Xóa<br>|
|trực tiếp<br>Invalid<br>|
|(theo spec)<br>|
|V6: Trạng thái<br>|
|đăng nhập<br> <br>|
|Phân vùng<br>Mô|
|tả<br>Ví dụ|
|Loại<br>|
|EP6.1 Đã đăng<br>|
|nhập (có token hợp<br> <br>|
|lệ)<br>JWT valid<br>|
|Valid<br>|
|EP6.2 Chưa đăng<br>|
|nhập (không có<br>|
|token) No token<br>|
|Invalid|
|EP6.3 Token hết<br>hạn/không hợp lệ<br>Expired|
|JWT<br>Invalid|
|<br>V7: Giá sản phẩm<br>|
|(Price)<br> <br>|
|Phân vùng<br>Mô<br><br>|
|tả<br>Ví dụ<br>Loại|
|EP7.1 Giá > 0|
|100000<br>Valid|
|EP7.2 Giá = 0 0|
|Invalid|
|EP7.3 Giá < 0 -|
|50000 Invalid|
|BƯỚC 2: MA TRẬN|
|KẾT HỢP CÁC<br>PHÂN VÙNG<br>Sửdụng Each<br>Choice Coverage<br>|
|kết hợp với Base|
|<br>Choice Coverage để|
|<br>thiết kếtest cases.|
|Chọn 1 base valid|
|case rồi thay đổi|
|từng biến sang các|
|phân vùng<br>invalid/edge.|
|Ma trận thiết kế:|



|TC<br>V1||
|---|---|
|(Quantity)|V2|
|(Cart State)|V3|
|(Product)|V4|
|(Duplicate)|V5|
|(Remove)<br>|V6<br>|
|(Login) V7 (Pr<br>|ice)|
|Type<br> <br>||
|1<br>EP1.1||
|EP2.2||
|EP3.1||
|EP4.1|-|
|EP6.1||
|EP7.1||
|Valid||
|2<br>EP1.1||
|EP2.3||
|EP3.1||
|EP4.1|-|
|EP6.1||
|EP7.1||
|Valid||
|3<br>EP1.1||
|EP2.1|-|
|-|-|
|EP6.1|-|
|Valid<br> <br>||
|4<br>EP1.1||
|EP2.2||
|EP3.1||
|EP4.2|-|
|EP6.1||
|EP7.1<br>||
|Valid||
|5<br>EP1.1||
|EP2.2||
|EP3.1|-|
|EP5.1<br>||
|EP6.1||
|EP7.1||
|Valid||
|6<br>EP1.1||
|EP2.2||
|EP3.1|-|
|EP5.2||
|EP6.1<br>||
|EP7.1||
|Valid||
|7<br>EP1.2||
|EP2.2||



||EP3.1|
|---|---|
||EP4.1 -|
||EP6.1<br>|
||EP7.1<br>|
||Invalid|
|8|EP1.3|
||EP2.2|
||EP3.1|
||EP4.1 -|
||EP6.1|
||EP7.1|
||Invalid|
|9|EP1.4|
||EP2.2|
||EP3.1|
||EP4.1 -|
||EP6.1|
||EP7.1|
||Invalid|
|10|EP1.5|
||EP2.2|
||EP3.1|
||EP4.1 -|
||EP6.1|
||EP7.1|
||Invalid|
|11|EP1.6|
||EP2.2|
||EP3.1|
||EP4.1 -|
||EP6.1|
||EP7.1|
||Invalid|
|12|EP1.1|
||EP2.2|
||EP3.2|
||EP4.1 -|
||EP6.1|
||EP7.1|
||Invalid|
|13|EP1.1|
||EP2.2|
||EP3.3|
||EP4.1 -|
||EP6.1|
||EP7.2|
||Invalid|
|14|EP1.1<br>|
||EP2.2|
||EP3.4|



|EP4.1 -|
|---|
|EP6.1|
|EP7.3<br>|
|Invalid|
|15<br>EP1.1|
|EP2.2|
|EP3.1 -<br>|
|EP5.3|
|EP6.1|
|EP7.1<br>|
|Invalid|
|16<br>EP1.1|
|EP2.2|
|EP3.1|
|EP4.1 -|
|EP6.2|
|EP7.1|
|Invalid|
|17<br>EP1.1|
|EP2.2|
|EP3.1|
|EP4.1 -|
|EP6.3|
|EP7.1|
|Invalid|
|BƯỚC 3: DANH|
|SÁCH TEST CASES|
|CHI TIẾT|
|Test ID Mô tả|
|Input Data<br>|
|Expected|
|<br>Output Type<br>|
|TC-FR07-001|
|Thêm 1 SP<br>|
|hợp lệvào giỏ<br>|
|trống Đăng nhập|
|<br>→Thêm SP|
|"iPhone 15 Pro|
|Max" (id=1,|
|price=30.000.000₫|
|), quantity=1<br>Giỏ<br>|
|hàng hiển thị1|
|dòng: Sản<br>|
|phẩm="iPhone 15|
|Pro Max", Đơn|
|giá=30.000.000₫,<br>|
|Sốlượng=1, Thành<br>|
|tiền=30.000.000₫.<br>|
|Nhãn Tổngcộng=|



|30.000.000₫<br>Valid<br>TC-FR07-002<br>Thêm 2 SP|
|---|
|khác nhau vào giỏ<br>Đăng nhập<br>→Thêm "iPhone|
|15 Pro Max"|
|(qty=1) + "Tai|
|nghe AirPods Pro<br>2" (id=4,|
|price=6.000.000₫,|
|qty=1) Giỏhàng<br>|
|hiển thị2 dòng<br>|
|riêng biệt. Tổng|
|cộng =<br>36.000.000₫<br>Valid<br>TC-FR07-003<br>Hiển thịgiỏ<br>|
|hàng trống<br>Đăng nhập<br>→Mởtrang giỏ<br>hàng khi chưa<br>thêm gì Hiển thị|
|hình minh họa|
|(illustration) +|
|<br>thông báo "Giỏ|
|hàng của bạn đang<br>trống" + nút "Tiếp|
|<br>tục mua sắm"<br>Valid|
|TC-FR07-004<br>Thêm cùng|
|<br>1 SP hai lần→gộp|
|<br>quantity<br>Đăng nhập<br>→Thêm "iPhone"|
|qty=1→Thêm<br>|
|"iPhone" qty=1 lần<br>|
|nữa<br>Giỏchỉhiển|
|thị1 dòng với|
|quantity=2, Thành<br>|
|tiền = 60.000.000₫|
|(không tạo dòng|
|mới)<br>Valid|
|TC-FR07-005 Xóa|
|SP với dialog xác<br>  ấ|
|nhận→Chpnhận|



|Đăng nhập|
|---|
|→Thêm 1 SP→|
|Nhấn "Xóa"→|
|Dialog xác nhận<br>|
|xuất hiện→Nhấn<br> <br>|
|OK<br>SP bịxóa<br>|
|khỏi giỏ, giỏtrống,<br>|
|hiển thịempty<br>|
|state<br>Valid<br>|
|TC-FR07-006 Xóa<br>SP với dialog xác|
|nhận→Hủy bỏ|
|Đăng nhập<br>→Thêm 1 SP→|
|Nhấn "Xóa"→|
|Dialog xác nhận→<br> <br>|
|Nhấn Cancel<br>SP<br>|
|vẫnởtrong giỏ,<br>không bịxóa<br>Valid<br>TC-FR07-007<br>Thêm SP<br>với quantity = 0|
|<br>Đăng nhập<br>→Trang chi tiết SP<br>→Nhập<br>quantity=0→<br>""|
|Thêm vào giỏHệ|
|<br>thống từchối hoặc|
|<br>tựđiều chỉnh lên<br>|
|min=1. Không|
|<br>thêm SP với qty=0<br>|
|Invalid|
|TC-FR07-008<br>Thêm SP<br>|
|với quantity âm<br>Đăng nhập<br>→Nhập quantity=-|
|1→"Thêm vào<br>|
|giỏ"<br>Hệthống từ<br>|
|chối hoặc hiển thị|
|lỗi. Không thêm SP|
|với qty âm<br>Invalid|
|TC-FR07-009<br>Thêm SP|
|với quantity thập<br>hâ<br>ăh|
|pn<br>Đngnập|



|→Nhập|
|---|
|quantity=1.5→|
|"Thêm vào giỏ" Hệ<br>thống làm tròn<br>xuống (1) hoặc báo<br>lỗi. Chỉchấp nhận<br>sốnguyên<br>Invalid<br>TC-FR07-010<br>Thêm SP<br>với quantity là<br>chuỗi ký tự<br>Đăng nhập<br>→Nhập<br>quantity="abc"→<br>"Thêm vào giỏ" Hệ<br>thống báo lỗi hoặc<br>không cho nhập.<br>Không thêm SP với<br>qty không phải số<br>Invalid<br>TC-FR07-011<br>Thêm SP<br>với quantity rất lớn<br>Đăng nhập<br>→Nhập<br>quantity=9999999<br>99→"Thêm vào<br>giỏ"<br>Hệthống<br>xửlý hợp lý (giới<br>hạn hoặc cảnh<br>báo). Thành tiền<br>tính đúng<br>Invalid<br>TC-FR07-012<br>Thêm SP<br>thiếu thông tin id<br>API POST<br>/api/cart với body<br>thiếu id Hệthống<br>báo lỗi hoặc từchối<br>(400/422)<br>Invalid<br>TC-FR07-013<br>Thêm SP<br>với price = 0<br>Thêm SP có<br>price=0 vào giỏ<br>Đơn|



|giá=0₫, Thành<br>|
|---|
|tiền=0₫, Tổng|
|cộng=0₫— hệ<br>|
|thống nên từchối|
|hoặc cảnh báo<br>Invalid|
|TC-FR07-014<br>Thêm SP|
|với price âm<br>Thêm SP có|
|price=-50000 vào<br>|
|giỏ<br>Hệthống từ<br>chối SP có giá âm<br>Invalid|
|TC-FR07-015 Xóa|
|SP không có dialog|
|xác nhận<br>Đăng nhập<br>→Thêm SP→<br>Nhấn "Xóa"<br>Theo đặc|
|tả: phải có dialog|
|<br>xác nhận trước khi|
|xóa. Nếu xóa trực<br>|
|tiếp→lỗi|
|<br>Invalid<br>TC-FR07-016<br>Thao tác<br>giỏhàng khi chưa<br>đăng nhập<br>Chưa đăng|
|nhập→Gọi API|
|GET/POST|
|/api/cart<br>Hệ<br>|
|thống trảvề401|
|Unauthorized hoặc<br>chuyển hướng đến|
|trang đăng nhập<br>Invalid|
|TC-FR07-017|
|Thao tác|
|giỏhàng với token|
|hết hạn Token JWT|
|hết hạn→Gọi API|
|GET /api/cart Hệ|
|<br>thống trảvề|
|<br>401/403. Yêu cầu|
|<br>đăng nhập lại<br>Invalid|



|TC-FR07-018<br>|
|---|
|Kiểm tra<br>nhãn "Tổng cộng"<br>Đăng nhập<br>→Thêm SP vào giỏ<br>→Xem giỏhàng<br>Nhãn tổng<br>tiền hiển thịchính<br>xác "Tổng cộng"<br>(không phải "Tổng<br>tạm tính")<br>Valid<br>TC-FR07-019<br>Kiểm tra<br>nhãn nút "Tiếp tục<br>mua sắm"<br>Đăng nhập<br>→Mởgiỏhàng Nút<br>quay vềtrang chủ<br>hiển thịnhãn "Tiếp|
|<br>tục mua sắm"<br>|
|(không phải "←<br>Mua tiếp")<br>Valid<br>TC-FR07-020<br>Kiểm tra<br>|
|nút +/- chỉnh số<br>|
|lượng Đăng nhập<br>→Thêm SP→|
|Xem giỏhàng Cột<br>"Sốlượng" có nút +<br>|
|và - đểtăng/giảm<br>sốlượng<br>Valid<br>TC-FR07-021<br>Kiểm tra<br>tính đúng của<br>Thành tiền<br>Đăng nhập<br>→Thêm "iPhone"|
|(price=30.000.000<br>₫, qty=2)<br>Thành tiền<br>= 30.000.000 × 2 =|
|60.000.000₫<br>Valid<br>TC-FR07-022<br>Kiểm tra|
|tổngtiền nhiều SP|



|Đăng nhập|
|---|
|→Thêm SP A|
|(price=30M,|
|qty=1) + SP B|
|(price=6M, qty=2)<br>|
|Tổng cộng<br>= 30.000.000 +|
|6.000.000×2 =|
|42.000.000₫<br>Valid<br>TC-FR07-023<br>Kiểm tra<br>|
|giỏhàng trống —|
|có hình minh họa<br>Xóa hết SP|
|khỏi giỏhoặc mở<br>giỏchưa có SP Giỏ<br>|
|trống hiển thịhình<br>minh họa|
|(illustration/image<br>) + text thông báo<br>Valid|
|TC-FR07-024<br>Kiểm tra<br>các cột hiển thị|
|đúng<br>Đăng nhập<br>→Thêm SP→<br> <br>|
|Xem giỏ<br>Có<br>|
|đủ5 cột: Sản phẩm,<br>|
|Đơn giá, Sốlượng,|
|<br>Thành tiền, Thao|
|<br>tác<br>Valid|
|TC-FR07-025<br>|
|Thêm SP<br>|
|với quantity = rỗng|
|<br>(empty)<br>Đăng nhập<br>→Xóa sốtrong ô|
|quantity→"Thêm|
|vào giỏ"<br>Hệ<br>|
|thống báo lỗi hoặc|
|mặc định|
|quantity=1|
|Invalid<br>|
|BƯỚC 4: GIẢI<br>|
|THÍCH CHI TIẾT|
|CÁC BƯỚC ĐÃ ÁP|
|DỤNG|
|4.1. Phương pháp|



|Domain Testing đã<br>|
|---|
|áp dụng<br>Domain Testing là<br>kỹthuật kiểm thử<br>được thiết kếđể<br>|
|kiểm tra xem hệ<br>|
|thống có xửlý đúng<br>các miền giá trịđầu<br>vào hay không. Kỹ<br>thuật này kết hợp<br>hai phương pháp<br>con chính:<br>A. Equivalence<br>Partitioning (Phân<br>vùng tương đương)<br>Nguyên tắc: Chia<br>miền giá trịcủa<br>mỗi biến đầu vào<br>thành các lớp<br>tương đương<br>(equivalence<br>classes), trong đó<br>tất cảgiá trịtrong<br>cùng 1 lớp được kỳ<br>vọng cho ra cùng<br>loại kết quả(đều<br>pass hoặc đều fail).<br>Áp dụng cho FR-<br>07:|
|Xác định biến đầu<br>vào: Tôi đã phân<br>tích đặc tảFR-07<br>và source code để<br>xác định 7 biến đầu<br>vào chính:<br>Quantity, Cart<br>State, Product,<br>Duplicate, Remove<br>Action, Login State,<br>Price.|
|Phân vùng mỗi<br>biến:|
|Quantity: Chia<br>|
|thành 6 phân vùng:|
|<br>hợplệ (≥1),bằng0,|



|âm, thập phân,<br>|
|---|
|chuỗi ký tự, sốrất|
|lớn|
|Cart State: 3 phân<br>|
|vùng: trống, 1 SP,<br>|
|nhiều SP<br>|
|Product: 4 phân<br>|
|vùng: hợp lệ, thiếu<br>|
|id, price=0, price<br>|
|không phải số<br>|
|Duplicate: 2 phân|
|vùng: SP mới, SP đã<br>|
|tồn tại<br>|
|Remove: 3 phân<br>|
|vùng: xác nhận OK,<br>|
|xác nhận Cancel,<br>|
|không có dialog<br>|
|Login: 3 phân<br>|
|vùng: đã đăng<br>|
|nhập, chưa đăng<br>|
|nhập, token hết<br>|
|hạn<br>|
|Price: 3 phân vùng:|
|<br>dương, 0, âm<br>Chọn đại diện: Với<br>mỗi phân vùng,<br>chọn 1 giá trịđại<br>|
|diện đểkiểm thử|
|(ví dụ: quantity=5<br>|
|đại diện cho phân|
|<br>vùng "sốnguyên<br>dương hợp lệ").<br>B. Combinatorial<br>Design (Thiết kế<br>|
|kết hợp)<br>Nguyên tắc: Sử<br>dụng Base Choice|
|<br>Coverage — chọn 1|
|<br>tổhợp base (tất cả|
|<br>Valid) rồi lần lượt|
|<br>thay đổi từng biến|
|sang Invalid, giữ|
|<br>các biến còn lạiở|
|giá trịbase.|
|Áp dụng:|
|Base case (TC-<br> ấ|
|FR07-001): Tt cả|



|biến đều Valid:|
|---|
|quantity=1 hợp lệ,|
|SP hợp lệ, đã đăng|
|nhập, price>0<br>Variation: Mỗi test<br>|
|case tiếp theo thay<br>1 biến thành<br>Invalid/Edge (ví<br>dụ: TC-007 đổi|
|quantity=0, TC-016<br>|
|đổi sang chưa đăng|
|nhập)<br>Bổsung: Các test<br>|
|case kiểm tra|
|nghiệp vụđặc thù|
|(gộp SP trùng,<br>dialog xác nhận,|
|nhãn UI, hình minh|
|họa)|
|4.2. Phát hiện từ|
|Source Code (Bugs<br>đã biết)|
|Qua phân tích|
|source code thực<br>|
|tế, tôi phát hiện các|
|sai lệch so với đặc<br>tả:|
|#<br>Đặc tả|
|(Expected)<br>Thực tế<br>(Actual)<br>Test Case|
|liên quan|
|🐛1<br>Thêm cùng|
|SP→gộp quantity<br>addToCart<br>luôn push phần tử<br>|
|mới→tạo dòng|
|trùng TC-FR07-|
|004<br>|
|🐛2<br>Nhãn<br>|
|"Tổng cộng"<br>Code hiển<br>|
|thị"Tổng tạm tính"<br>(Cart.jsx dòng 63)<br>TC-FR07-|
|018|
|🐛3<br>Nút "Tiếp|



|tục mua sắm"|
|---|
|Code hiển|
|thị"←Mua tiếp"|
|(Cart.jsx dòng 67)<br>TC-FR07-|
|019|
|🐛4<br>Có nút +/-<br>|
|chỉnh sốlượng Cột<br>|
|Sốlượng chỉhiển<br>thịtext|
|{item.quantity},<br>không có nút +/-<br>TC-FR07-<br>020|
|🐛5<br>Xóa SP phải|
|có dialog xác nhận<br>removeFro<br>mCart(index) gọi<br>|
|trực tiếp, không có|
|confirm<br>TC-|
|FR07-005, TC-|
|FR07-015<br>🐛6<br>Giỏtrống<br>có hình minh họa<br>Chỉcó text|
|"Giỏhàng của bạn|
|<br>đang trống", không|
|có illustration TC-|
|FR07-023<br>4.3. Tại sao chọn<br>|
|cách tiếp cận này?|
|Phủrộng: 25 test|
|cases phủtoàn bộ7|
|biến × tất cảphân|
|vùng Valid/Invalid|
|<br>Phát hiện lỗi biên:|
|Các test case EP1.2|
|(qty=0), EP1.3 (qty|
|<br>âm) kiểm tra|
|<br>boundary<br>ể|
|Kim tra nghiệp vụ:|
|<br>TC-004 (gộp<br>|
|trùng), TC-|
|<br>005/006 (dialog|
|<br>xác nhận), TC-|
|<br>018/019/020|
|<br>(nhãn UI) — các|
|quy tắc nghiệp vụ|
|<br>đặc thù từđặc tả|



||Kiểm tra bảo<br>mật/phân quyền:<br>TC-016/017 kiểm<br>tra truy cập không<br>phép<br>Hiệu quả: Base<br>Choice Coverage<br>đảm bảo mỗi phân<br>vùng invalid được<br>kiểm tra ít nhất 1<br>lần mà không gây<br>bùng nổtổhợp<br>Tổng kết: Bộ25<br>test cases trên phủ<br>đầy đủcác miền giá<br>trịcủa FR-07: Giỏ<br>hàng, bao gồm cả<br>kiểm thửchức năng<br>(thêm/xóa/gộp<br>SP), kiểm thửdữ<br>liệu (quantity,<br>price), kiểm thửUI<br>(nhãn, cột, hình<br>ảnh), và kiểm thử<br>phân quyền (đăng<br>nhập/token). Đặc<br>biệt, 6 lỗi thực tếđã<br>được phát hiện từ<br>source code cho<br>thấy nhiều test<br>case sẽFAIL khi<br>chạy trên hệthống<br>hiện tại.|||
|---|---|---|---|
|**Tool: Gemini**<br>**Date: 18/10/2026**<br>**20:01**<br>**Prompt: “"Bây giờ**<br>**hãy áp dụng kỹ**<br>**thuật Boundary**<br>**Value Analysis**<br>**(BVA) cho các biến**<br>**có giá trị biên**<br>**trong FR07:Xác**<br>**định các trường có**<br>**biên.  Xác định các**<br>**mốc biên theo**<br>**chuẩn 2-value**<br>**hoặc 3-value BVA.**<br>**Tạo danh sách**<br>**Test Cases kiểm**<br>**thử biên chi tiết**|Dưới đây làứng<br>dụng kỹthuật<br>Boundary Value<br>Analysis (BVA) cho<br>các biến có giá trị<br>biên trong tính<br>năng FR-07: Giỏ<br>hàng (Shopping<br>Cart) (kết hợp với<br>ràng buộc sốlượng<br>từFR-06), được<br>trình bày theo<br>đúng 4 bước tiêu<br>chuẩn:<br>Bước 1: Nhận diện<br>các thuộc tính có|Valid|Ổn|





|**bao gồm: Field,**<br>**Boundary Point**<br>**($min-1$, $min$,**<br>**$min+1$, v.v.),**<br>**Input Data,**<br>**Expected Result.**<br>**Cung cấp đoạn giải**<br>**thích chi tiết từng**<br>**bước đã bạn đã áp**<br>**dụng”**|thểđo lường thứtự<br>trong FR-07<br>Không phải biến<br>nào trong giỏhàng<br>cũng áp dụng được<br>BVA. BVA chỉáp<br>dụng cho các biến<br>có giá trịliên tục,<br>rời rạc có thứtự,<br>hoặc độdài / số<br>lượng đo đếm được.<br>Trong tính năng<br>FR-07 / FR-06, các<br>thuộc tính có biên<br>gồm:<br>Sốlượng sản phẩm<br>thêm vào/điều<br>chỉnh trong giỏ<br>(quantity): Là số<br>nguyên, có biên<br>dưới tối thiểu là 1.<br>Sốlượng loại sản<br>phẩm khác nhau<br>trong giỏhàng<br>(cart.length): Số<br>lượng phần tửdanh<br>sách sản phẩm<br>trong giỏ(từ0 đến<br>giới hạn kỹthuật /<br>bộnhớ).<br>Độdài chuỗi tên<br>sản phẩm hiển thị/<br>tìm kiếm / mã đơn<br>hàng: (nếu áp dụng<br>kiểm thửnhập liệu<br>giỏ<br>hàng/checkout).<br>Bước 2: Xác định<br>Biên tường minh<br>(Explicit) và Biên<br>ngầm định<br>(Implicit)<br>Biên tường minh<br>(Explicit<br>Boundary): Được<br>ghi rõ trong tài liệu<br>yêu cầu nghiệp vụ<br>(README.md /<br>api_specification.m|
|---|---|







|d).<br>Ví dụ(FR-06): Ô<br>|
|---|
|nhập Sốlượng chỉ<br>|
|nhận sốnguyên<br>|
|dương, tối thiểu là|
|1 $\Rightarrow<br>|
|\text{Min} = 1$.<br>|
|Biên ngầm định|
|(Implicit<br>|
|Boundary): Xuất<br>|
|phát từhạtầng kỹ|
|<br>thuật (Database|
|schema, Frontend|
|<br>state, API payload,<br>|
|Kiểu dữliệu<br>|
|JavaScript/SQLite):<br>|
|Sốlượng tối thiểu<br>của giỏhàng trống<br>|
|$\Rightarrow<br>|
|\text{Min} = 0$ (0|
|<br>sản phẩm).<br>|
|Kiểu dữliệu số<br>|
|nguyên (Integer)|
|<br>trong JavaScript /<br>|
|SQLite có giá trịtối|
|<br>đa an toàn|
|$\text{Max} =<br>|
|\text{Number.MAX|
|_SAFE_INTEGER}$|
|($9\mathcal{2}23|
|37203685477580|
|7$) hoặc giới hạn<br>thực tếcủa ô nhập|
|quantity (ví dụ:<br>|
|ngăn tràn bộnhớ|
|hoặc giới hạn tồn|
|<br>kho kho hàng<br>$\text{Max} =|
|<br>9999$).|
|<br>Bước 3: Lựa chọn|
|mô hình mốc biên:|
|3-Value BVA|
|Do tính năng giỏ|
|<br>hàng và thanh toán|
|<br>là nghiệp vụtài|
|chính nhạy cảm|
|(tránh lỗi tính sai|
|tiền, vượt quá tồn|
|kho hoặc lỗi Off-by-|
|<br>one),chúngta áp|







|dụng Chuẩn 3-|
|---|
|<br>value BVA cho biến|
|sốlượng<br>(quantity):|
|Biến 1: Sốlượng<br>sản phẩm|
|(quantity) với Biên<br>dưới $\text{Min} =<br>1$ $\text{Min - 1} =<br>|
|0$: Điểm Invalid|
|sát biên dưới (Hệ<br>|
|thống phải từchối<br>hoặc tựđiều chỉnh<br>|
|về1).<br>|
|$\text{Min} = 1$:<br>|
|Điểm Valid tối<br>|
|thiểu (Chấp nhận,<br>|
|thêm 1 sản phẩm).|
|$\text{Min + 1} =|
|<br>2$: Điểm Valid an<br>toàn (Chấp nhận,<br>|
|thêm 2 sản phẩm).<br>|
|Biến 2: Sốlượng|
|<br>sản phẩm<br>|
|(quantity) với Biên<br>|
|trên $\text{Max} =|
|<br>9999$ (Giới hạn<br>thực tếkho/nhập<br>liệu)<br>$\text{Max - 1} =|
|<br>9998$: Điểm Valid|
|<br>cận trên.<br>$\text{Max} =<br>|
|9999$: Điểm Valid|
|tối đa.|
|$\text{Max + 1} =|
|<br>10000$: Điểm<br>Invalid vượt<br>|
|ngưỡng (Hệthống|
|<br>phải chặn hoặc báo|
|lỗi).|
|<br>Biến 3: Sốloại sản|
|phẩm trong giỏ|
|<br>(cart.length) với|
|Biên dưới|
|$\text{Min}= 0$|







|(Giỏtrống)|
|---|
|$\text{Min - 1} = -<br>|
|1$: Không tồn tại<br>|
|(vềmặt vật lý giỏ<br>không thểâm).<br>$\text{Min} = 0$:<br>|
|Giỏtrống (Hiển thị<br>giao diện Empty<br>State với hình minh|
|họa).<br>|
|$\text{Min + 1} =|
|1$: Giỏcó 1 sản<br>|
|phẩm.<br>Bước 4: Thiết kếdữ|
|liệu thửnghiệm tại<br>|
|các điểm biên<br>|
|Khi kiểm tra biên<br>|
|sốlượng|
|(quantity), dữliệu<br>thửnghiệm phải|
|được xây dựng sao<br>cho thỏa mãn tất cả<br>|
|các điều kiện khác<br>|
|(sản phẩm hợp lệ,<br>đã đăng nhập) để<br>|
|tránh bịche khuất<br>lỗi.<br>Bảng Test Cases chi|
|<br>tiết kiểm thửbiên<br>(BVA):<br>Test ID Field / Biến<br>Mốc biên<br>(Boundary Point)<br>|
|Giá trịkiểm|
|thử(Input Data)<br>Kết quả<br>mong đợi<br>(Expected Result)<br>|
|Loại (Type)<br>BVA-01<br>quantity<br>$\text{Min<br>} - 1$ ($0$)|
|<br>Thêm sản<br>ẩ" "|
|phm iPhone 15|
|với quantity = 0|
|Hệthống từ|
|<br>chối hoặc tựđiều|







|chỉnh về1, không|
|---|
|<br>thêm sản phẩm với<br>|
|sốlượng 0.<br>Invalid<br>BVA-02<br>quantity<br>$\text{Min<br>}$ ($1$)<br>Thêm sản<br>|
|phẩm "iPhone 15"<br>với quantity = 1<br>Thêm<br>|
|thành công vào giỏ,<br>|
|hiển thịđúng 1 sản<br>|
|phẩm, sốlượng = 1.<br>Valid<br>BVA-03<br>quantity<br>$\text{Min<br>} + 1$ ($2$)|
|Thêm sản<br>phẩm "iPhone 15"<br>với quantity = 2<br>Thêm<br>|
|thành công vào giỏ,<br>|
|hiển thịđúng 1 sản<br>|
|phẩm, sốlượng = 2,<br>thành tiền nhân<br>đôi.<br>Valid<br>BVA-04<br>quantity<br>Giá trịâm<br>|
|($ -1 $) Thêm sản<br>phẩm "iPhone 15"<br>với quantity = -1<br>Hệthống<br>|
|chặn, báo lỗi hoặc<br>ép về1. Không cho<br>phép sốlượng âm.<br>Invalid<br>BVA-05<br>quantity<br>Ký tựsát|
|<br>biên dưới (Thập|
|<br>phân) Thêm sản|
|<br>phẩm "iPhone 15"|
|với quantity = 0.5|
|<br>Hệthống|
|ép kiểu (làm tròn)<br>hoặc báo lỗiyêu|







|cầu sốnguyên|
|---|
|dương. Invalid|
|BVA-06<br>quantity<br>$\text{Max<br>} - 1$ ($9998$)<br>Thêm sản<br>phẩm với quantity<br>= 9998 Chấp nhận,<br>tính toán thành<br>tiền chính xác<br>không bịtràn số<br>(Overflow).<br>Valid<br>BVA-07<br>quantity<br>$\text{Max<br>}$ ($9999$)<br>Thêm sản<br>|
|phẩm với quantity<br>= 9999 Chấp nhận<br>tối đa, hiển thị<br>đúng trong giỏ<br>hàng. Valid<br>BVA-08<br>quantity<br>$\text{Max<br>} + 1$ ($10000$)<br>Thêm sản<br>phẩm với quantity<br>= 10000<br>Hệ|
|thống cảnh báo<br>vượt quá giới hạn<br>cho phép hoặc<br>chặn lại.<br>Invalid<br>BVA-09<br>cart.length<br>$\text{Min<br>}$ ($0$)<br>Mở<br>trang giỏhàng khi<br>giỏchưa có sản<br>phẩm (cart = [])|
|<br>Hiển thị<br>|
|giao diện giỏhàng|
|<br>trống: Có hình|
|<br>minh họa|
|(illustration) +|
|thông báo + nút<br>"Tiếptục mua|







|sắm". Valid|
|---|
|BVA-10|
|cart.length<br>$\text{Min<br>} + 1$ ($1$)<br>|
|Thêm 1 sản<br>phẩm vào giỏ<br>(cart.length = 1)<br>Hiển thị|
|bảng danh sách|
|gồm đúng 1 dòng|
|sản phẩm, nhãn|
|tổng tiền là "Tổng|
|<br>cộng". Valid<br>|
|💡Giải thích chi<br>|
|tiết các bước đã áp|
|<br>dụng cho BVA:<br>|
|Nhận diện đúng|
|thuộc tính có biên:<br>Trong FR-07 và<br>|
|FR-06, biến số|
|lượng (quantity) và<br>|
|sốlượng phần tử|
|giỏhàng|
|(cart.length) là các|
|đại lượng rời rạc có<br>|
|thứtựrõ ràng (số<br>|
|nguyên), rất nhạy<br>cảm với các lỗi lập|
|trình so sánh (>, <,|
|>=, <=).<br>Khai thác biên|
|tường minh &<br>ngầm định:|
|Biên tường minh|
|$\text{Min} = 1$|
|lấy trực tiếp từyêu<br>|
|cầu FR-06 ("tối|
|thiểu là 1").<br>|
|Biên ngầm định|
|$\text{Min} = 0$|
|(giỏtrống) và biên|
|Max (giới hạn hệ<br>|
|thống/sốnguyên|
|an toàn) được bổ|
|sung đểkiểm tra độ|
|<br>bền vững củaứng|
|dụng.|
|<br>Ứngdụngchuẩn 3-|







|value BVA: Mô|
|---|
|hình 3 giá trị|
|($\text{Min}-1,<br>|
|\text{Min},<br>|
|\text{Min}+1$ và<br>|
|$\text{Max}-1,<br>|
|\text{Max},<br>|
|\text{Max}+1$)<br>giúp phát hiện triệt<br>|
|đểcác lỗi Off-by-<br>|
|one kinh điển của|
|lập trình viên (ví<br>|
|dụ: viết nhầm điều<br>|
|kiện quantity > 1<br>thay vì quantity >=<br>1).<br>|
|Cô lập biến (Isolate<br>|
|variables): Các test<br>|
|case biên được<br>thiết kếđộc lập, chỉ<br>thay đổi duy nhất<br>giá trịcủa quantity<br>hoặc cart.length<br>trong khi giữ<br>nguyên các thông<br>tin sản phẩm và<br>trạng thái đăng<br>nhập hợp lệ, giúp<br>việc xác định<br>nguyên nhân lỗi<br>(nếu xảy ra) trở|
|<br>nên chính xác tuyệt<br>đối.<br>Cline read 1 file:<br>README.md · lines<br>100-150<br>Tổng kết quá trình<br>áp dụng Domain<br>Testing và<br>Boundary Value<br>Analysis (BVA) cho|
|ứng dụng EShop|
|Theo yêu cầu của|
|bạn, chúng ta đã|
|hoàn thành việc|
|xâydựngtậptest|







|cases và phân tích<br>|
|---|
|chi tiết cho các tính<br>|
|năng trọng yếu của|
|ứng dụng EShop|
|dựa trên tài liệu|
|đặc tả|
|(README.md và<br>|
|api_specification.m|
|d). Dưới đây là tóm<br>|
|tắt toàn bộcác kỹ<br>|
|thuật kiểm thửđã|
|áp dụng:|
|📊1. Tổng quan|
|<br>các tính năng đã<br>|
|phân tích<br> <br>|
|Tính năng<br>Tên<br> <br>|
|tính năng<br>Kỹ<br>thuật đã áp dụng<br>Nội dung|
|<br>chính|
|FR-01 Đăng ký tài<br>|
|khoản Domain<br>Testing & BVA<br>|
|Phân vùng<br>|
|họtên, email duy|
|<br>nhất, định dạng<br>|
|mật khẩu ($\ge 8$|
|ký tự, chữhoa, chữ<br>|
|thường sốký tự|
|,,<br>đặc biệt), xác nhận<br>mật khẩu.<br>|
|FR-02 Đăng nhập|
|& Khóa tài khoản<br>Domain<br>Testing & BVA<br>Phân vùng<br>tài khoản/mật<br>|
|khẩu, cơchếđếm<br>|
|sốlần sai liên tiếp,|
|thời ian khóa|
|g<br>(lockout).<br>FR-07 Giỏhàng<br>(Shopping Cart)<br>Domain<br>Testing & BVA<br>Phân vùng<br>|
|sốlượng sản phẩm<br>|
|(quantity),trạng|







|thái giỏ(trống, 1|
|---|
|<br>SP, nhiều SP), gộp<br>|
|sản phẩm trùng,|
|hộp thoại xác nhận|
|xóa, nhãn UI<br>|
|("Tổng cộng", "Tiếp<br>|
|tục mua sắm").<br>️|
|🛠️2. Tóm tắt<br>|
|phương pháp tiếp<br>|
|cận chi tiết<br>|
|A. Kỹthuật Domain|
|Testing (Phân vùng<br>|
|tương đương & Tổ|
|<br>hợp)<br>|
|Xác định biến đầu|
|vào & Ràng buộc<br>|
|nghiệp vụ: Phân<br>|
|tích kỹcác điều|
|kiện từđặc tả(ví<br>|
|dụ: giỏhàng phải|
|có các cột Sản<br>|
|phẩm, Đơn giá, Số|
|lượng có nút +/-;<br>|
|thêm trùng phải|
|gộp dòng; xóa phải<br>có dialog xác<br>nhận).<br>Phân vùng tương<br>đương<br>(Equivalence<br>Partitioning): Chia<br>|
|miền giá trịthành|
|các lớp Valid (hợp|
|lệ) và Invalid<br>|
|(không hợp lệ) để|
|đảm bảo độphủ|
|cao mà không bịdư|
|thừa test case.<br>|
|Ma trận kết hợp|
|(Combinatorial|
|Design): Sửdụng|
|phương pháp Base|
|Choice Coverage<br>|
|kết hợp các trường|
|hợp đặc thù, giúp|
|phát hiện các sai|
|lệch thực tếgiữa|
|source code và đặc|
|tả (ví dụ: nhãn hiển|







|thị"Tổng tạm tính"|
|---|
|thay vì "Tổng<br>|
|cộng", thiếu dialog|
|xác nhận khi xóa<br>|
|sản phẩm).|
|B. Kỹthuật|
|Boundary Value|
|Analysis (BVA -<br>|
|Chuẩn 3-Value)|
|Nhận diện thuộc|
|tính có biên: Tập<br>|
|trung vào các biến<br>|
|sốlượng rời rạc có|
|thứtự(như<br>|
|quantity tối thiểu|
|là 1, độdài mật<br>|
|khẩu $\ge 8$, giới<br>|
|hạn $\text{Max}$).|
|Xác định biên|
|tường minh &<br>|
|ngầm định:|
|<br>Tường minh: Yêu<br>cầu nghiệp vụtừ|
|spec (ví dụ: min = 1|
|<br>cho sốlượng).<br>|
|Ngầm định: Hạtầng|
|kỹthuật (ví dụ: giỏ|
|<br>trống min = 0, giới|
|<br>hạn kiểu sốnguyên|
|<br>an toàn max =<br>|
|9999).|
|<br>Mô hình 3-value<br>BVA ($\text{Min}-<br>1, \text{Min},<br>|
|\text{Min}+1$ và|
|<br>$\text{Max}-1,<br>|
|\text{Max},<br>|
|\text{Max}+1$):|
|<br>Bắt trọn vẹn các lỗi|
|Off-by-one kinh|
|điển của lập trình|
|<br>viên khi viết điều|
|kiện logic so sánh.|
|<br>Cô lập biến (Isolate|
|<br>variables): Xây|
|dựng dữliệu thử|
|nghiệm tại các|
|điểm biên sao cho<br>|
|các điều kiện khác|
|luôn hợplệ, giúp|





||quy kết chính xác<br>nguyên nhân lỗi<br>khi test case fail.<br>🚀Hướng dẫn tiếp<br>theo<br>Nếu bạn muốn tiếp<br>tục mởrộng bộ<br>kiểm thửsang các<br>tính năng khác<br>hoặc chuyển sang<br>tựđộng hóa<br>(Automation<br>Testing với<br>Playwright), chúng<br>ta có thểtiếp tục<br>với:<br>FR-08 & FR-09:<br>Thanh toán<br>(Checkout) và Mã<br>giảm giá (Coupon -<br>kiểm tra 5 điều<br>kiện kết hợp C1-<br>C5).<br>Viết spec tựđộng<br>hóa bằng<br>Playwright<br>(tests/cart/,<br>tests/checkout/)<br>kèm theo các test<br>case conformance<br>(test.fail()) cho các<br>lỗi đã phát hiện<br>trong mã nguồn.<br>Bạn có muốn tiếp<br>tục với tính năng<br>nào tiếp theo<br>không?|||
|---|---|---|---|
|**Tool: Gemini**<br>**Date: 18/10/2026**<br>**22:04**<br>**Prompt: “Tôi đang**<br>**làm kiểm thử cho**<br>**ứng dụng EShop.**<br>**Hãy giúp tôi áp**<br>**dụng kỹ thuật**<br>**Domain Testing**<br>**cho tính năng FR-**<br>**15 (đặc tả trong**<br>**readme.md). Hãy**|Dưới đây là áp<br>dụng kỹthuật<br>Domain Testing<br>(Phân vùng tương<br>đương & Kết hợp)<br>cho tính năng FR-<br>15: Quản lý Sản<br>phẩm (Product<br>CRUD) trong phân<br>hệWeb Admin của<br>ứng dụng EShop,|Valid|Ổn|





|**thực hiện từng**<br>**bước:Xác định các**<br>**biến đầu vào và**<br>**phân vùng tương**<br>**đương**<br>**(Equivalence**<br>**Partitioning) gồm**<br>**Valid & Invalid**<br>**Partitions.Tạo ma**<br>**trận kết hợp các**<br>**phân vùng để thiết**<br>**kế tập Test Cases**<br>**phủ toàn bộ các**<br>**miền giá trị.Xuất**<br>**danh sách Test**<br>**Case gồm: Test ID,**<br>**Input Data,**<br>**Expected Output,**<br>|thực hiện từng<br>bước theo yêu cầu<br>của bạn:<br>📦DOMAIN<br>TESTING CHO FR-<br>15: QUẢN LÝ SẢN<br>PHẨM (PRODUCT<br>CRUD)<br>📋ĐẶC TẢFR-15<br>(Tóm tắt)<br>Theo tài liệu yêu<br>cầu (README.md<br>dòng 191-199 và<br>api_specification.m<br>d dòng 87-98):|
|---|---|
|**Type**<br>**(Valid/Invalid).**<br>**Cung cấp đoạn giải**<br>**thích chi tiết từng**<br>**bước đã bạn đã áp**<br>**dụng”**|Chức năng: Admin<br>có thểThêm / Xem<br>/ Sửa / Xóa sản<br>phẩm qua các API<br>(POST/PUT/DELE<br>TE /api/products)<br>và giao diện Quản<br>lý Admin.<br>Ràng buộc đầu vào<br>(Input<br>Constraints):<br>Tên sản phẩm<br>(name): Bắt buộc,<br>không được để<br>trống, độdài tối đa<br>255 ký tự($1 \le<br>\text{length} \le<br>255$).<br>Giá (price): Bắt<br>buộc, phải là số<br>dương<br>($\text{price} ><br>0$).<br>Danh mục<br>(category_id): Bắt<br>buộc, phải chọn từ<br>danh sách danh<br>mục có sẵn trong<br>hệthống (ví dụ: 1,<br>2, 3).<br>Phân quyền (Role):<br>Yêu cầu tài khoản|



|có quyền Admin|
|---|
|<br>(role = 'admin'|
|<br>kèm JWT token|
|hợp lệ).|
|Hành vi Sửa|
|(Update): Khi sửa<br>|
|sản phẩm, chỉsản<br>|
|phẩm có id được<br>chỉđịnh bịthay<br>|
|đổi, các sản phẩm|
|khác giữnguyên.<br>|
|BƯỚC 1: XÁC ĐỊNH|
|BIẾN ĐẦU VÀO VÀ|
|PHÂN VÙNG<br>TƯƠNG ĐƯƠNG<br>(Equivalence<br>Partitioning)<br>Dựa trên đặc tảFR-|
|15, chúng ta xác<br>định 5 biến đầu vào<br>chính khi Admin<br>thực hiện<br>Thêm/Sửa sản<br>phẩm:|
|1. Tên sản phẩm|
|<br>(name)<br> <br>|
|Phân vùng<br>Mô|
|tả<br>Giá trịví dụ|
|Loại|
|EP1.1 Tên hợp lệ<br>|
|(1 đến 255 ký tự)<br>|
|"iPhone 15<br>|
|Pro Max", "Tai<br>|
|nghe" Valid<br>|
|EP1.2 Tên để<br>  <br>|
|trống (Rỗng)<br>"",|
|<br> <br>null, " " Invalid|
|EP1.3 Tên vượt|
|quá 255 ký tự(>|
|<br>255)<br>Chuỗi dài|
|<br>256 ký tự|
|<br>Invalid|
|2. Giá sản phẩm|
|<br>(price)|
|<br>Phân vùng<br>Mô|
|<br>tả<br>Giá trịví dụ|
|Loại|
|EP2.1 Giá là số<br>|
|dương (> 0)|



|150000,|
|---|
|30000000|
|Valid<br>|
|EP2.2 Giá bằng 0|
|0<br>|
|Invalid<br>|
|EP2.3 Giá là số|
|âm (< 0)<br>-<br>|
|50000 Invalid|
|EP2.4 Giá không<br>|
|phải là số<br>|
|(Chuỗi/Ký tựđặc|
|biệt)<br>"abc", ""<br>|
|Invalid<br>|
|3. Danh mục|
|(category_id)<br> <br>|
|Phân vùng<br>Mô|
|tả<br>Giá trịví dụ|
|Loại|
|EP3.1 ID danh|
|mục tồn tại trong<br>|
|CSDL 1 (Điện|
|<br>thoại), 2 (Laptop)<br>Valid<br>|
|EP3.2 ID danh|
|mục không tồn tại|
|<br>trong CSDL<br>9999|
|Invalid<br>|
|EP3.3 Đểtrống|
|<br>hoặc không chọn<br>danh mục<br>|
|null, "", 0|
|Invalid<br>|
|4. Quyền truy cập|
|<br>Admin (role)|
|<br>Phân vùng<br>Mô|
|tả<br>Giá trịví dụ|
|Loại|
|EP4.1 Tài khoản|
|có quyền Admin|
|<br>role =|
|'admin' + Token|
|hợp lệValid|
|<br>EP4.2 Tài khoản|
|khách hàng thường|
|(User) role =|
|'user' + Token hợp|
|lệ<br>Invalid|
|EP4.3 Không|



|đăng nhập (Không|
|---|
|có Token)|
|<br>Không gửi|
|Header<br>|
|Authorization<br>Invalid<br>|
|5. Thao tác Sửa sản<br>|
|phẩm (Update<br>|
|Specificity)<br> <br>|
|Phân vùng<br>Mô<br>|
|tả<br>Giá trịví dụ|
|Loại<br>|
|EP5.1 Sửa sản<br>phẩm với id tồn tại<br>PUT<br>|
|/api/products/1<br>Valid<br>|
|EP5.2 Sửa sản|
|phẩm với id không<br>tồn tại PUT<br>/api/products/999<br>99<br>Invalid<br>|
|BƯỚC 2: MA TRẬN|
|KẾT HỢP CÁC<br>PHÂN VÙNG<br>(Combinatorial<br>Partition Matrix)<br>Sửdụng phương<br>pháp Base Choice<br>|
|Coverage, ta chọn 1|
|<br>tổhợp chuẩn (Base<br>Valid Case) làm<br>gốc, sau đó lần lượt<br>thay đổi từng biến<br>sang các phân vùng<br>Invalid/Edge.<br>Test Case<br>V1:|
|name V2: price|
|<br>V3:|
|category_id<br>V4:|
|<br>role<br>V5: id (khi|
|Sửa)<br>Loại (Type)|
|<br> <br>M-01 (Base)|
|<br>EP1.1|
|(Valid) EP2.1|
|(Valid) EP3.1|
|(Valid) EP4.1|
|(Admin)|
|EP5.1(Tồn|



|tại)<br>Valid|
|---|
|M-02 EP1.2|
|(Rỗng) EP2.1|
|(Valid) EP3.1|
|(Valid) EP4.1|
|(Admin)<br>-<br>|
|Invalid|
|M-03 EP1.3|
|(>255 ký tự)|
|EP2.1|
|(Valid) EP3.1|
|(Valid) EP4.1|
|(Admin)<br>-|
|<br>Invalid|
|M-04 EP1.1|
|(Valid) EP2.2|
|(Price = 0)|
|EP3.1|
|(Valid) EP4.1|
|(Admin)<br>-<br>|
|Invalid|
|M-05 EP1.1|
|(Valid) EP2.3|
|(Price < 0)|
|EP3.1|
|(Valid) EP4.1|
|(Admin)<br>-<br>|
|Invalid|
|M-06 EP1.1|
|(Valid) EP2.4<br>|
|(Price không phải|
|<br>số)<br>EP3.1<br>|
|(Valid) EP4.1<br>|
|(Admin)<br>-|
|<br>Invalid|
|M-07 EP1.1|
|(Valid) EP2.1|
|(Valid) EP3.2<br>|
|(Danh mục không|
|<br>tồn tại) EP4.1<br>|
|(Admin)<br>-<br>|
|Invalid<br>|
|M-08 EP1.1|
|(Valid) EP2.1|
|<br>(Valid) EP3.3|
|<br>(Trống danh mục)|
|<br>EP4.1<br>|
|(Admin)<br>-<br>|
|Invalid|
|M-09 EP1.1|



|(Valid) EP2.1|
|---|
|(Valid) EP3.1|
|<br>(Valid) EP4.2|
|(User thường) -<br>|
|Invalid|
|M-10 EP1.1|
|(Valid) EP2.1|
|(Valid) EP3.1|
|(Valid) EP4.3|
|(Không đăng nhập)|
|-<br>Invalid|
|M-11 EP1.1|
|(Valid) EP2.1|
|(Valid) EP3.1|
|(Valid) EP4.1|
|(Admin)<br>|
|EP5.2 (ID<br>|
|không tồn tại)<br>Invalid<br>|
|BƯỚC 3: DANH<br>|
|SÁCH TEST CASE<br>|
|CHI TIẾT|
|Test ID Input Data|
|Expected|
|Output Type<br>|
|(Valid/Invalid)<br>|
|TC-FR15-001<br>|
|Thêm sản<br>|
|phẩm mới hợp<br>|
|lệ:<br>name:<br>"MacBook Air|
|M3"<br>price:<br>|
|30000000<br>des|
|cription: "Laptop<br>|
|mỏng<br>|
|nhẹ"<br>imageUrl:<br>|
|"https://example.c<br>|
|om/img.jpg"<br>c<br>|
|ategory_id: 2<br>|
|(Laptop)<br>Role:<br>|
|Admin Hệthống|
|<br>thêm sản phẩm|
|<br>thành công vào|
|<br>CSDL. Trảvềthông|
|<br>báo thành công|
|<br>hoặc ID sản phẩm<br>|
|mới. Sản phẩm xuất|
|<br>hiện trên trang chủ.|
|<br>Valid|



|TC-FR15-002<br>|
|---|
|Thêm sản|
|<br>phẩm với tên để<br>trống:<br>name:<br>""<br>price:<br>1500000<br>categ<br>|
|ory_id: 3<br>Role:<br>|
|Admin Hệthống từ<br>|
|chối yêu cầu, trảvề<br>|
|lỗi validation (400|
|Bad Request) do<br>|
|tên sản phẩm bắt|
|buộc.<br>Invalid|
|TC-FR15-003|
|Thêm sản<br>|
|phẩm với tên vượt<br>|
|255 ký<br>|
|tự:<br>name:<br>|
|Chuỗi ký tựcó độ|
|<br>dài = 256 ký|
|<br>tự<br>price:<br>500000<br>catego<br>ry_id: 1<br>Role:<br>Admin Hệthống<br>chặn hoặc báo lỗi|
|do vượt quá giới<br>|
|hạn tối đa 255 ký<br>|
|tựcủa trường<br>|
|name. Invalid|
|TC-FR15-004<br>Thêm sản<br>phẩm với giá bằng<br>"|
|0:<br>name: Sản|
|phẩm 0|
|đồng"<br>price:<br>|
|0<br>category_id:|
|<br>3<br>Role: Admin<br>Hệthống từ|
|<br>chối, trảvềlỗi do<br>|
|giá sản phẩm phải<br>là sốdương lớn hơn|
|<br>0 ($\text{price} >|
|<br>0$).<br>Invalid|
|<br>TC-FR15-005|
|Thêm sản|
|phẩm với giá|
|âm:<br>name:|
|"Sản phẩm|
|âm"<br>price: -|
|100000<br>catego|



|ry_id: 3<br>Role:<br>|
|---|
|Admin Hệthống từ<br>chối, trảvềlỗi do<br>giá không được<br>phép là sốâm.<br>Invalid<br>TC-FR15-006<br>Thêm sản<br>phẩm với giá không<br>phải là<br>số:<br>name: "Sản<br>|
|phẩm<br>chữ"<br>price:|
|"abc"<br>category<br>_id: 3<br>Role:<br>|
|Admin Hệthống<br>|
|báo lỗi ép kiểu /<br>|
|validation, từchối<br>lưu vào CSDL.<br>Invalid<br>TC-FR15-007<br>Thêm sản<br>|
|phẩm với danh mục<br>không tồn<br>tại:<br>name:<br>"Test|
|Product"<br>price|
|:<br>200000<br>catego<br>|
|ry_id:<br>9999<br>Role:<br>|
|Admin Hệthống từ<br>|
|chối do category_id<br>|
|không khớp với bất<br>|
|kỳ danh mục hợp lệ<br>|
|nào trong CSDL.<br>Invalid<br>TC-FR15-008<br>Thêm sản|
|phẩm đểtrống<br>danh|
|mục:<br>name:<br>"Test|
|Product"<br>price|
|:|
|200000<br>catego<br>|
|ry_id:<br>|
|null<br>Role:<br>|
|Admin Hệthống|
|<br>báo lỗi do danh|



|mục là trường bắt|
|---|
|<br>buộc phải chọn.|
|Invalid|
|TC-FR15-009|
|Thêm sản<br>|
|phẩm bằng tài|
|khoản User|
|thường:<br>name:<br>"Hacker|
|Product"<br>price|
|:<br>100000<br>catego<br>ry_id: 1<br>Role:|
|User (role = 'user')<br>|
|Hệthống từ<br>|
|chối truy cập (Trả<br>|
|vềlỗi 403|
|Forbidden /<br>Unauthorized), bảo<br>vệphân hệAdmin.<br>Invalid<br>TC-FR15-010<br>|
|Thêm sản<br>|
|phẩm khi chưa<br>đăng|
|nhập:<br>name:<br>"No Auth<br>|
|Product"<br>price|
|:<br>100000<br>catego<br>ry_id: 1<br>Không<br>gửi Token<br>Authorization Hệ<br>thống từchối yêu<br>|
|cầu (401|
|<br>Unauthorized).<br>Invalid<br>TC-FR15-011 Cập|
|<br>nhật sản phẩm hợp|
|<br>lệ(PUT|
|<br>/api/products/1):|
|<br>Đổi tên thành|
|"iPhone 15 Pro|
|Max|
|(Updated)"<br>Rol|
|e: Admin<br>Cập|
|nhật thành công.|
|<br>Chỉsản phẩm có id|
|= 1 bịthay đổi<br>|
|thôngtin,các sản|



|phẩm khác (id > 1)|
|---|
|giữnguyên trạng|
|thái cũ. Valid|
|TC-FR15-012 Cập<br>|
|nhật sản phẩm với<br>id không tồn tại|
|(PUT<br>/api/products/999<br>99):<br>Role:<br>Admin Hệthống<br>trảvềlỗi 404 Not<br>Found hoặc thông<br>|
|báo sản phẩm<br>không tồn tại.<br>Invalid<br>BƯỚC 4: GIẢI<br>|
|THÍCH CHI TIẾT<br>TỪNG BƯỚC ĐÃ<br>ÁP DỤNG<br>Bước 1 (Xác định<br>biến đầu vào &<br>Phân vùng tương<br>đương):<br>|
|Tôi đã phân tích kỹ<br>|
|đặc tảFR-15 để|
|<br>tách bạch các<br>trường dữliệu đầu<br>vào của tính năng<br>Quản lý Sản phẩm<br>(name, price,<br>category_id), cùng<br>với các điều kiện<br>môi trường/hệ<br>thống quan trọng<br>nhưPhân quyền<br>Admin (Role) và ID<br>sản phẩm khi cập|
|<br>nhật (Update|
|<br>Target).<br>Mỗi biến được chia<br>|
|rõ thành các phân<br>vùng Valid (hợp lệ<br>theo đúng đặc tả)<br>|
|và Invalid (vi phạm|
|<br>ràng buộc về|
|khoảng giá trị, kiểu|
|dữliệu, rỗng, hoặc|
|không tồn tại trong<br>CSDL).|



|Bước 2 (Ma trận<br>|
|---|
|kết hợp phân<br>vùng):|
|Áp dụng chiến lược|
|Base Choice<br>|
|Coverage: Lấy ca<br>kiểm thửM-01 làm<br>|
|gốc hoàn toàn hợp|
|lệ(Valid Base). Sau<br>đó, tiến hành xoay<br>vòng thay đổi đơn<br>lẻtừng biến sang<br>các trạng thái|
|Invalid tươngứng<br>(M-02 đến M-11).<br>|
|Cách tiếp cận này<br>giúp tốiưu số<br>lượng test case<br>nhưng vẫn đảm bảo<br>phủkín toàn bộcác<br>rủi ro nghiệp vụ<br>của tính năng<br>CRUD sản phẩm.<br>Bước 3 (Xuất danh<br>sách Test Case):<br>Danh sách 12 test<br>|
|cases được mô tả<br>cụthểvới dữliệu<br>đầu vào (Input<br>Data) và kết quả<br>|
|mong đợi<br>(Expected Output)<br>|
|rõ ràng, bao gồm cả<br>|
|các kiểm tra vềbảo|
|mật phân quyền<br>(Admin vs. User)<br>và tính nguyên vẹn<br>|
|dữliệu khi cập nhật|
|<br>(PUT).|
|<br>Bước 4 (Đảm bảo<br>|
|tính toàn vẹn hệ<br>thống):|
|Các trường hợp|
|<br>kiểm thửkhông chỉ<br>|
|kiểm tra tính hợp lệ<br>|
|của dữliệu đầu vào|
|đơn lẻmà còn kiểm|



||tra các ràng buộc<br>quan hệcơsởdữ<br>liệu (category_id<br>phải tồn tại) và bảo<br>mật API<br>(/api/products yêu<br>cầu role admin<br>theo FR-12).|||
|---|---|---|---|
|**Tool: Gemini**<br>**Date: 19/10/2026**<br>**20:48**<br>**Prompt: “"Bây giờ**<br>**hãy áp dụng kỹ**<br>**thuật Boundary**<br>**Value Analysis**<br>**(BVA) cho các biến**<br>**có giá trị biên**<br>**trong FR15:Xác**<br>**định các trường có**<br>**biên.  Xác định các**<br>**mốc biên theo**<br>**chuẩn 2-value**<br>**hoặc 3-value BVA.**<br>**Tạo danh sách**<br>**Test Cases kiểm**<br>**thử biên chi tiết**<br>**bao gồm: Field,**<br>**Boundary Point**<br>**($min-1$, $min$,**<br>**$min+1$, v.v.),**<br>**Input Data,**<br>**Expected Result.**<br>**Cung cấp đoạn giải**<br>**thích chi tiết từng**<br>**bước đã bạn đã áp**<br>**dụng”**|Dưới đây là áp<br>dụng kỹthuật<br>Boundary Value<br>Analysis (BVA) cho<br>các biến có giá trị<br>biên trong tính<br>năng FR-15: Quản<br>lý Sản phẩm<br>(Product CRUD),<br>được trình bày chi<br>tiết theo chuẩn 4<br>bước:<br>Bước 1: Nhận diện<br>các thuộc tính có<br>thểđo lường thứtự<br>trong FR-15<br>BVA chỉáp dụng<br>cho các biến có giá<br>trịliên tục, rời rạc<br>có thứtựhoặc độ<br>dài đo đếm được.<br>Trong tính năng<br>FR-15, các thuộc<br>tính có biên gồm:<br>Độdài chuỗi tên<br>sản phẩm<br>(name.length): Có<br>giới hạn từ1 đến<br>255 ký tự.<br>Giá trịsản phẩm<br>(price): Có ràng<br>buộc là sốdương<br>($\text{price} ><br>0$), biên giới hạnở<br>mức 0 hoặc số<br>nguyên dương tối<br>thiểu.<br>Mã định danh danh<br>mục (category_id):<br>Là sốnguyên|Valid|OK|







|dương bắt đầu từ1|
|---|
|(do đặc thù cơsở|
|<br>dữliệu|
|AUTOINCREMENT|
|).<br>|
|Bước 2: Xác định|
|Biên tường minh|
|(Explicit) và Biên<br>|
|ngầm định|
|(Implicit)|
|Biên tường minh|
|(Explicit<br>Boundary): Được|
|ghi rõ trong tài liệu<br>|
|yêu cầu|
|(README.md):<br>|
|Tên sản phẩm: tối|
|đa 255 ký tự|
|$\Rightarrow|
|\text{Max} = 255$,|
|$\text{Min} = 1$.<br>|
|Giá sản phẩm: phải<br>|
|là sốdương ($> 0$)|
|<br>$\Rightarrow$|
|Biên ngăn cách là<br>$\text{0}$.<br>Biên ngầm định|
|(Implicit<br>Boundary): Xuất<br>|
|phát từhạtầng kỹ<br>thuật (Database<br>schema SQLite):|
|Khóa chính id và<br>|
|category_id trong<br>|
|SQLite bắt đầu từ1|
|<br>(AUTOINCREMEN<br>T) $\Rightarrow<br>|
|\text{Min} = 1$.<br>|
|Giới hạn tối đa của|
|kiểu dữliệu số|
|nguyên (INTEGER)|
|<br>trong CSDL /|
|<br>JavaScript.<br>|
|Bước 3: Lựa chọn|
|mô hình mốc biên:|
|3-Value BVA|
|Chúng ta áp dụng|
|<br>Chuẩn 3-value BVA<br>|
|($\text{Boundary}<br>- 1$,|







|$\text{Boundary}$|
|---|
|$\text{Boundary}|
|,<br>+ 1$) cho các<br>|
|trường có biên để<br>|
|phát hiện triệt để<br>|
|các lỗi Off-by-one<br>|
|của lập trình viên:|
|Biến 1: Độdài Tên<br>|
|sản phẩm<br>(name.length)|
|Biên dưới Min = 1:|
|$\text{Min} - 1 =<br>0$ ký tự(Invalid -<br>|
|Tên rỗng).<br>|
|$\text{Min} = 1$|
|ký tự(Valid tối<br>|
|thiểu - Tên hợp lệ<br>|
|ngắn nhất).|
|<br>$\text{Min} + 1 =<br>2$ ký tự(Valid an<br>toàn).<br>Biên trên Max =<br>255:<br>|
|$\text{Max} - 1 =<br>|
|254$ ký tự(Valid<br>cận trên).<br>$\text{Max} =<br>255$ ký tự(Valid<br>tối đa cho phép).|
|<br>$\text{Max} + 1 =<br>256$ ký tự(Invalid<br>- Vượt ngưỡng).<br>Biến 2: Giá sản<br>phẩm (price > 0)<br>|
|Biên dưới (Giới hạn|
|<br>0):<br>$\text{Min} - 1 =|
|<br>0$ (Invalid - Giá|
|<br>bằng 0).<br>$\text{Min} = 1$|
|<br>(Valid tối thiểu -|
|<br>Giá 1₫).|
|$\text{Min} + 1 =|
|<br>2$ (Valid an toàn -|
|<br>Giá 2₫).|
|Điểm âm: -1<br>|
|(Invalid).|







|Biến 3: Mã danh|
|---|
|mục (category_id|
|với Min = 1)|
|$\text{Min} - 1 =|
|0$ (Invalid - ID|
|không hợp lệ).<br>$\text{Min} = 1$ (Valid tối thiểu -<br>Danh mục đầu<br>tiên).|
|$\text{Min} + 1 =|
|2$ (Valid an toàn -|
|Danh mục thứhai).|
|Bước 4: Tạo danh|
|sách Test Cases<br>|
|kiểm thửbiên chi<br>|
|tiết (BVA)<br>|
|Test ID Field / Biến<br>|
|Mốc biên<br>(Boundary Point)<br>Dữliệu đầu|
|vào (Input Data)<br>Kết quả<br>mong đợi<br>(Expected Result)<br>Loại (Type)<br>BVA-FR15-01<br>name.lengt<br>h<br>$\text{Min|
|} - 1$ ($0$ ký tự)|
|name: ""<br>(Chuỗi rỗng), price:<br>100000,<br>category_id: 1 Hệ<br>|
|thống từchối, trả<br>vềlỗi validation do<br>|
|tên sản phẩm<br>không được để<br>trống. Invalid<br>BVA-FR15-02<br>|
|name.lengt|
|h<br>$\text{Min|
|}$ ($1$ ký tự)|
|<br>name: "A",|
|price: 100000,<br>|
|categoryid: 1|
|_<br>Thêm sản|







|phẩm thành công|
|---|
|<br>với tên đúng 1 ký|
|tự.<br>Valid|
|BVA-FR15-03|
|name.lengt<br>h<br>$\text{Min<br>} + 1$ ($2$ ký tự)|
|name: "Ab",|
|price: 100000,<br>category_id: 1<br>Thêm sản<br>phẩm thành công<br>với tên 2 ký tự.|
|Valid|
|BVA-FR15-04|
|name.lengt<br>h<br>$\text{Max<br>} - 1$ ($254$ ký tự)|
|name:<br>Chuỗi ký tựgồm<br>đúng 254 chữ'A',<br>price: 100000,<br>category_id: 1<br>Thêm sản<br>|
|phẩm thành công<br>(dưới ngưỡng tối đa<br>1 ký tự).<br>Valid<br>BVA-FR15-05<br>name.lengt<br>h<br>$\text{Max<br>}$ ($255$ ký tự)|
|name:<br>|
|Chuỗi ký tựgồm<br>đúng 255 chữ'A',|
|<br>price: 100000,<br>category_id: 1<br>Thêm sản<br>|
|phẩm thành công|
|<br>với độdài tối đa|
|cho phép.<br>Valid<br>BVA-FR15-06<br>name.lengt<br>h<br>|
|$\text{Max|
|}+ 1$ ($256$ký|







|tự)<br>name:<br>|
|---|
|Chuỗi ký tựgồm|
|đúng 256 chữ'A',|
|price: 100000,<br>|
|category_id: 1 Hệ<br>|
|thống từchối hoặc<br>|
|cắt chuỗi<br>|
|(truncate) do vượt|
|quá giới hạn 255 ký<br>|
|tự.<br>Invalid<br>BVA-FR15-07<br>price<br>Giá<br>|
|trịâm ($-1$)|
|name:<br>|
|"Test", price: -1,|
|category_id: 1 Hệ<br>thống từchối do<br>giá sản phẩm<br>|
|không được là số<br>âm.<br>Invalid<br>BVA-FR15-08<br>price<br>Biên giá trị|
|<br>$0$ name:<br>""|
|Test, price: 0,<br>|
|categoryid: 1 Hệ|
|_<br>thống từchối do<br>giá phải là số|
|<br>dương lớn hơn 0<br>|
|($\text{price} ><br>0$).<br>Invalid<br>BVA-FR15-09<br>price<br>$\text{Min<br>}$ tối thiểu ($1$)|
|name:<br>"Test", price: 1,<br>category_id: 1<br>Thêm sản<br>phẩm thành công<br>với giá nhỏnhất<br>hợp lệ(1₫).<br>Valid<br>BVA-FR15-10<br>price<br>$\text{Min<br>} + 1$ ($2$)<br>name:|
|"Test", price: 2,|
|<br>category_id: 1|







|Thêm sản<br>|
|---|
|phẩm thành công|
|với giá 2₫.<br>Valid|
|BVA-FR15-11|
|category_id<br>$\text{Min<br>} - 1$ ($0$)<br>name:<br>"Test", price:<br>100000,|
|category_id: 0 Hệ<br>|
|thống từchối do|
|category_id phải|
|$\ge 1$ và tồn tại|
|trong CSDL.<br>Invalid<br>BVA-FR15-12|
|category_id<br>$\text{Min<br>}$ ($1$)<br>name:<br>"Test", price:<br>100000,<br>category_id: 1<br>(Điện thoại)<br>Thêm sản|
|phẩm thành công<br>|
|vào danh mục có ID|
|= 1.<br>Valid<br>|
|BVA-FR15-13|
|category_id<br>$\text{Min<br>|
|} + 1$ ($2$)|
|name:<br>"Test", price:<br>100000,<br>|
|category_id: 2|
|(Laptop)<br>Thêm sản<br>|
|phẩm thành công|
|vào danh mc có ID|
|ụ <br>= 2.<br>Valid|
|💡Giải thích chi|
|tiết các bước đã áp|
|<br>dụng cho BVA (FR-|
|<br>15):|
|<br>Nhận diện chính<br>|
|xác thuộc tính có|







|biên:<br>Trường name có|
|---|
|biên độdài ký tựrõ|
|ràng ($1 \le|
|\text{length} \le|
|255$).<br>|
|Trường price có<br>|
|biên giá trịdương<br>|
|($\text{price} > 0$,<br>|
|ngăn cách bởi mốc|
|<br>0).<br>|
|Trường category_id<br>|
|có biên dưới bắt<br>|
|đầu từ1 (dựa trên<br>|
|cấu trúc khóa|
|chính SQLite<br>AUTOINCREMENT<br>).<br>Khai thác biên<br>tường minh &<br>|
|ngầm định:<br>|
|Biên tường minh<br>|
|lấy từđặc tảFR-15|
|<br>(max 255 ký tự,<br>|
|price > 0).|
|<br>Biên ngầm định lấy<br>từkiến trúc cơsở<br>|
|dữliệu (id >= 1).|
|<br>Ứng dụng chuẩn 3-|
|<br>value BVA:<br>|
|Với độdài tên sản|
|phẩm, bộtest cases<br>|
|kiểm tra kỹlưỡng|
|<br>từ0 ký tự(Min-1),|
|<br>1 ký tự(Min), 2 ký|
|tự(Min+1), đến cận|
|<br>trên 254 (Max-1),<br>|
|255 (Max), và 256|
|<br>(Max+1). Điều này|
|<br>giúp phát hiện|
|<br>chính xác nếu lập|
|<br>trình viên viết|
|nhầm length < 255|
|<br>thay vì length <=|
|<br>255.|
|Với giá sản phẩm,|
|kiểm tra mốc nguy|
|<br>hiểm nhất là 0 và -1<br>|
|đểđảm bảo hệ|
|thốngchặn đứng|





||các sản phẩm giá 0<br>đồng hoặc âm.<br>Cô lập biến: Mỗi<br>test case chỉthay<br>đổi một biến sốduy<br>nhất tại giá trịbiên<br>tươngứng, giữcác<br>trường thông tin<br>khácởtrạng thái<br>hợp lệ, giúp kết quả<br>kiểm thửmang tính<br>khách quan và|||
|---|---|---|---|
||chính xác tuyệt đối.|||
|**Tool: Gemini**<br>**Date: 20/10/2026**<br>**18:20**<br>**Prompt: “Tôi đang**<br>**làm kiểm thử cho**<br>**ứng dụng EShop.**<br>**Hãy giúp tôi áp**<br>**dụng kỹ thuật**<br>**Domain Testing**<br>**cho tính năng FR-1**<br>**(đặc tả trong**<br>**readme.md) CHO**<br>**MOBILE APP!!!.**<br>**Hãy thực hiện từng**<br>**bước:Xác định các**<br>**biến đầu vào và**<br>**phân vùng tương**<br>**đương**<br>**(Equivalence**<br>**Partitioning) gồm**<br>**Valid & Invalid**<br>**Partitions.Tạo ma**<br>**trận kết hợp các**<br>**phân vùng để thiết**<br>**kế tập Test Cases**<br>**phủ toàn bộ các**<br>**miền giá trị.Xuất**<br>**danh sách Test**<br>**Case gồm: Test ID,**<br>**Input Data,**<br>**Expected Output,**|Dưới đây là áp<br>dụng kỹthuật<br>Domain Testing<br>cho tính năng FR-<br>01: Đăng ký tài<br>khoản dành riêng<br>cho phân hệ<br>MOBILE APP<br>(React Native /<br>Expo) củaứng<br>dụng EShop:<br>📱DOMAIN<br>TESTING CHO<br>TÍNH NĂNG FR-01:<br>ĐĂNG KÝ TÀI<br>KHOẢN (MOBILE<br>APP)<br>📋ĐẶC TẢYÊU<br>CẦU NGHIỆP VỤ<br>(FR-01 & MOBILE<br>SPEC)<br>Dựa theo<br>README.md (FR-<br>01 & FR-20) và<br>hiện trạng mã<br>nguồn frontend-<br>mobile/App.js:|Valid|Ổn|
|<br>**Type**<br>**(Valid/Invalid).**<br>**Cung cấp đoạn giải**<br>**thích chi tiết từng**<br>**bước đã bạn đã áp**<br>**dụng”**|Trường nhập liệu:<br>HọTên: Bắt buộc,<br>chuỗi văn bản<br>không rỗng.<br>Email: Bắt buộc,<br>đúng định dạng<br>email,duynhất|||





|(không trùng trong<br>|
|---|
|CSDL)|
|.<br>Mật khẩu: Bắt buộc,<br>|
|tối thiểu 8 ký tự,<br>|
|gồm ít nhất: 1 chữ<br>|
|hoa, 1 chữthường,<br>|
|1 số, 1 ký tựđặc|
|biệt (@, $, !, %, *, ?,<br>|
|&).<br>|
|Xác nhận mật khẩu:<br>|
|Bắt buộc, phải khớp|
|hoàn toàn với Mật<br>|
|khẩu.|
|Hành vi trên<br>|
|Mobile App:<br>|
|Báo lỗi qua Text<br>|
|inline<br>|
|(errorBoxText)|
|hoặc Alert.alert().<br>|
|Mật khẩu phải che|
|<br>ký tự<br>|
|(secureTextEntry).<br>|
|Đăng ký thành<br>|
|công: Hiển thị<br>|
|Alert.alert("Thành<br>" "|
|công, Đăng ký tài|
|<br>khoản thành<br>|
|công."), tựđộng<br>|
|điền email vào<br>|
|form Đăng nhập và|
|<br>chuyển màn hình|
|sang login.<br>|
|BƯỚC 1: XÁC ĐỊNH|
|CÁC BIẾN ĐẦU|
|VÀO VÀ PHÂN<br>|
|VÙNG TƯƠNG|
|ĐƯƠNG|
|(Equivalence<br>Partitioning)<br>Đối vớiứng dụng<br>|
|Mobile, các biến|
|đầu vào bao gồm cả|
|dữliệu người dùng|
|<br>nhập vào các|
|<br>trường TextInput<br>|
|và tương tác màn|
|hình:|
|1. HọTên|
|(registerName)|



|Phân vùng<br>Mô|
|---|
|tả<br>Giá trịđại|
|diện<br>Loại<br>|
|EP1.1 Họtên hợp<br>|
|lệ(chuỗi chữcó<br>|
|khoảng trắng, tiếng<br>|
|Việt có dấu)<br>|
|"Nguyễn<br>|
|Văn A" Valid<br>|
|EP1.2 Họtên để<br>|
|trống (Chuỗi rỗng /<br>chỉtoàn space) ""<br>|
|hoặc " " Invalid<br>|
|EP1.3 Họtên<br>|
|chứa ký tựđặc biệt<br>|
|/ thẻmã độc<br>|
|"<script>al<br>|
|ert(1)</script>"<br>Invalid<br>2. Email<br>(registerEmail)<br>Phân vùng<br>Mô<br><br>|
|tả<br>Giá trịđại<br>|
|diện<br>Loại<br>|
|EP2.1 Email hợp<br>|
|lệ, chưa từng đăng<br>|
|ký<br>"newuser@<br>eshop.com"<br>Valid|
|EP2.2 Email để|
|trống ""|
|<br>Invalid|
|EP2.3 Email sai<br>định dạng (thiếu @,<br>thiếu domain, chứa<br>khoảng trắng)<br>"userexam<br>ple.com",<br>"" "|
|user@.com, user|
|name@domain.co|
|m"<br>Invalid|
|EP2.4 Email đã|
|tồn tại trong hệ|
|<br>thống (Trùng lặp)<br>"test@esho|
|p.com" (User đã có|
|sẵn)<br>Invalid<br>|
|3. Mật khẩu|
|(registerPassword)|



|(Điều kiện: Độdài|
|---|
|$\ge 8$, có chữ<br>|
|hoa, thường, số, ký|
|tựđặc biệt)|
|Phân vùng<br>Mô|
|tả<br>Giá trịđại<br>|
|diện<br>Loại|
|EP3.1 Thỏa mãn<br>|
|đầy đủ5 điều kiện<br>|
|mật khẩu mạnh<br>"Admin123|
|!" (8 kt, Hoa,<br>|
|thường, số, ký tự|
|đặc biệt)<br>Valid<br>|
|EP3.2 Thiếu độ|
|dài ($< 8$ ký tự)|
|nhưng đủcác loại|
|ký tự<br>"Aa1@xyz"<br>|
|(7 ký tự)|
|<br>Invalid|
|EP3.3 Đủđộdài<br>|
|nhưng thiếu chữ<br>viết HOA<br>"admin123<br> <br>|
|!"<br>Invalid<br>EP3.4 Đủđộdài|
|nhưng thiếu chữ<br>viết THƯỜNG<br>"ADMIN12|
|3!"<br>Invalid<br>|
|EP3.5 Đủđộdài<br>|
|nhưng thiếu CHỮ|
|<br>SỐ<br>"Adminxyz!|
|"<br>Invalid|
|EP3.6 Đủđộdài|
|nhưng thiếu KÝ TỰ|
|<br>ĐẶC BIỆT<br>"Admin123|
|4"<br>Invalid|
|EP3.7 Mật khẩu|
|đểtrống<br>""<br>Invalid|
|4. Xác nhận mật|
|khẩu|
|(confirmPassword|
|)|
|<br>Phân vùng<br>Mô|



|tả<br>Giá trịđại|
|---|
|diện<br>Loại|
|EP4.1 Khớp<br>|
|100% với mật khẩu<br>|
|đã nhập<br>Trùng<br>chuỗi với|
|registerPassword<br>Valid<br>|
|EP4.2 Không|
|khớp (khác biệt ký|
|tựhoa/thường<br>|
|hoặc thiếu ký tự)<br>Khác chuỗi|
|registerPassword<br>Invalid<br>|
|EP4.3 Đểtrống|
|trường xác nhận<br>|
|""<br>Invalid<br>|
|5. Yếu tốgiao diện|
|& Trải nghiệm|
|Mobile (Mobile UX<br>Partitions)<br>Phân vùng<br>Mô<br>|
|tả<br>Giá trịđại<br>|
|diện<br>Loại<br>|
|EP5.1 Chếđộbàn|
|<br>phím bảo mật<br>|
|(secureTextEntry)<br>Ô mật khẩu<br>|
|che dấu chấm đen|
|••••<br>Valid|
|EP5.2 Bàn phím|
|<br>email không tự<br>|
|động viết hoa|
|(autoCapitalize="n<br>|
|one") Nhập ký tự<br>|
|đầu tiên không bị|
|<br>viết hoa|
|<br>Valid|
|BƯỚC 2: MA TRẬN|
|KẾT HỢP CÁC<br>PHÂN VÙNG|
|(Combinatorial|
|<br>Partition Matrix)<br>|
|Áp dụng phương<br>|
|pháp Base Choice<br>|
|Coverage: Chọn ca|
|<br>kiểm thửM-01|



|(Base Valid Case)|
|---|
|thỏa mãn toàn bộ<br>các phân vùng<br>Valid, sau đó lần<br>lượt tráo đổi từng<br>biến sang các phân<br>vùng Invalid để<br>kiểm tra khảnăng<br>bắt lỗi của hệ<br>thống.|
|Test Case<br>V1:|
|HọTên V2: Email<br>V3: Mật<br>|
|khẩu<br>V4: Xác<br><br>|
|nhận MK<br>V5:<br>Mobile UI/UX<br>Loại (Type)<br>|
|M-01 (Base)<br>EP1.1|
|(Valid) EP2.1<br>(Valid mới)<br>EP3.1|
|(Mạnh) EP4.1<br>|
|(Khớp) EP5.1 &|
|EP5.2 Valid|
|M-02 EP1.2<br>|
|(Rỗng) EP2.1<br>EP3.1<br>EP4.1<br>Bình|
|thường Invalid|
|M-03 EP1.3|
|(Script/HTML)<br>EP2.1<br>EP3.1<br>EP4.1<br>|
|Bình<br>|
|thường Invalid<br>|
|M-04 EP1.1<br>|
|EP2.2|
|(Rỗng) EP3.1<br>EP4.1<br>Bình<br>|
|thường Invalid|
|<br>M-05 EP1.1<br>|
|EP2.3 (Sai|
|<br>định dạng)<br>|
|EP3.1<br>|
|EP4.1|



||Bình|
|---|---|
|thường|Invalid|
|M-06|EP1.1|
||EP2.4|
|(Trùng|lặp)<br>|
||EP3.1<br>|
||EP4.1<br>|
||Bình<br>|
|thường|Invalid|
|M-07|EP1.1|
||EP2.1|
||EP3.2<br>|
|(Ngắn <|8 kt)|
||EP4.1<br>|
||Bình<br>|
|thường|Invalid|
|M-08|EP1.1|
||EP2.1|
||EP3.3<br>|
|(Thiếu|chữhoa)|
||EP41|
||.<br>Bình|
|thường|Invalid|
|M-09|EP1.1|
||EP2.1<br>|
||EP3.4<br>|
|(Thiếu|chữthường)|
|thường|EP4.1<br>Bình<br>Invalid|
|M-10|EP1.1|
||EP2.1<br>|
||EP3.5<br>|
|(Thiếu|chữsố)<br>|
||EP4.1<br>|
||Bình<br>|
|thường|Invalid|
|M-11|EP1.1<br>|
||EP2.1<br>|
||EP3.6<br>|
|(Thiếu|ký tựĐB)|
||<br>EP4.1|
||Bình<br>|
|thường|Invalid|
|<br>M-12|<br>EP1.1|
||EP2.1|
||EP3.1|
||EP4.2<br>|
|(Không|khớp)|
||<br>Bình|



|thường Invalid|
|---|
|M-13 EP1.1|
|<br>EP2.1|
|EP3.1|
|EP4.3<br>|
|(Rỗng) Bình<br>|
|thường Invalid|
|M-14 EP1.1|
|EP2.1|
|EP3.1|
|EP4.1<br>|
|EP5.1|
|(secureTextEntry)|
|Valid<br>|
|BƯỚC 3: XUẤT<br>|
|DANH SÁCH TEST|
|CASE CHI TIẾT<br>(MOBILE APP)|
|Test ID Input Data<br>Expected|
|<br>Output (Mobile<br> <br>|
|App)<br>Type|
|TC-MOB-REG-01<br>name:<br>"Nguyễn Văn<br>A"<br>email:<br>"|
|valid_user_01@es|
|hop.com"<br>pass<br>|
|word:<br>"Admin123!"<br>c<br>|
|onfirmPassword:<br>"Admin123!"<br>Ứng dụng<br>|
|bật popup thông<br>"|
|báo: Đăng ký tài|
|<br>khoản thành<br>"|
|công., nhấn OK thì|
|<br>tựđộng chuyển|
|<br>sang màn hình<br>|
|Đăng nhập, ô Email<br>|
|trên màn hình|
|Đăng nhập được<br>điền sẵn|
|"valid_user_01@es|
|hop.com".<br>Valid|
|TC-MOB-REG-02|
|name: ""|
|(Bỏ|
|trống)<br>email:|



|"user02@eshop.co|
|---|
|m"<br>password:<br>"Admin123!"<br>c<br>onfirmPassword:<br>"Admin123!" Hệ<br>thống chặn submit,<br>hiển thịthông báo<br>lỗi yêu cầu nhập Họ<br>Tên, không gửi<br>request đăng ký<br>không hợp lệlên<br>backend.<br>Invalid<br>TC-MOB-REG-03<br>name:<br>"<script>alert(1)<<br>/script>"<br>emai<br>|
|l:<br>"user03@eshop.co<br>m"<br>password:<br>"Admin123!"<br>c<br>|
|onfirmPassword:<br>"Admin123!" Hệ<br>|
|thống tựđộng<br>escape / sanitize<br>chuỗi Họtên khi<br>render lên giao<br>diện Mobile Profile,|
|<br>không làm vỡgiao<br>diện.<br>Invalid<br>TC-MOB-REG-04<br>name:<br>"Trần<br>|
|B"<br>email: ""<br>|
|(Bỏ<br>|
|trống)<br>passwo<br>|
|rd:<br>|
|"Admin123!"<br>c<br>|
|onfirmPassword:<br>"Admin123!"<br>Hiển thịlỗi<br>yêu cầu nhập địa<br>chỉEmail, không<br>cho phép gửi<br>request.<br>Invalid<br>TC-MOB-REG-05<br>name:<br>"|
|Trần<br>|
|B"<br>email:|



|"invalid-email-|
|---|
|format"<br>passw|
|ord:|
|"Admin123!"<br>c|
|onfirmPassword:<br>"Admin123!"<br>Hiển thịlỗi:<br>Email không đúng<br>định dạng.<br>Invalid<br>TC-MOB-REG-06<br>name:<br>"Trần<br>B"<br>email:<br>"test@eshop.com"<br>|
|(Email đã tồn<br>|
|tại)<br>password:<br>"Admin123!"<br>c<br>|
|onfirmPassword:<br>"Admin123!" Hệ<br>|
|thống báo lỗi:<br>Email đã được sử<br>dụng / Đăng ký<br>thất bại. Giữ<br>|
|nguyên màn hình<br>đăng ký và dữliệu<br>đã nhập.<br>Invalid<br>|
|TC-MOB-REG-07<br>name: "Lê<br>C"<br>email:<br>"user07@eshop.co<br>m"<br>password:<br>"Aa1@xyz" (7 ký<br>|
|tự)<br>confirmPas<br>sword: "Aa1@xyz"<br>Báo lỗi|
|ngay tại khung đỏ:<br>"Mật khẩu quá yếu!<br>Phải dài tối thiểu 8|
|ký tự...". Không gửi|
|<br>API.<br>Invalid|
|TC-MOB-REG-08|
|name: "Lê|
|C"<br>email:|
|"user08@eshop.co<br>"|
|m<br>password:|
|"admin123!" (Toàn<br>|
|chữ<br>|
|thường)<br>confir|



|mPassword:|
|---|
|"admin123!"<br>Báo<br>lỗi mật khẩu thiếu<br>chữin HOA.<br>Invalid<br>TC-MOB-REG-09<br>name: "Lê<br>C"<br>email:<br>"user09@eshop.co<br>m"<br>password:<br>"ADMIN123!"<br>(Toàn chữ<br>hoa)<br>confirmP<br>|
|assword:<br>|
|"ADMIN123!" Báo<br>lỗi mật khẩu thiếu<br>chữin THƯỜNG.<br>Invalid<br>TC-MOB-REG-10<br>name: "Lê<br>C"<br>email:<br>"user10@eshop.co<br>m"<br>password:<br>"Adminpass!"<br>(Không có<br>số)<br>confirmPas<br>sword:<br>"Adminpass!" Báo<br>lỗi mật khẩu thiếu<br>CHỮSỐ.<br>Invalid<br>TC-MOB-REG-11<br>name: "Lê<br>C"<br>email:<br>"user11@eshop.co<br>m"<br>password:<br>"Admin1234"|
|(Không có ký tự|
|đặc|
|biệt)<br>confirmP<br>assword:<br>"Admin1234" Báo<br>lỗi mật khẩu thiếu<br>KÝ TỰĐẶC BIỆT|
|trong nhóm @, $, !,|
|<br>%, *, ?, &.<br>Invalid<br>TC-MOB-REG-12<br>name:<br>"Phạm|



|D"<br>email:|
|---|
|"user12@eshop.co|
|m"<br>password:<br>"Admin123!"<br>c<br>onfirmPassword:<br>"Admin123?" (Gõ<br>  <br>|
|lệch 1 ký tự)<br>Báo<br>lỗi: Mật khẩu xác<br>nhận không khớp.<br>Không cho phép<br>gửi request.<br>Invalid|
|TC-MOB-REG-13<br>name:<br>"Phạm<br>|
|D"<br>email:<br>"user13@eshop.co<br>|
|m"<br>password:<br>"Admin123!"<br>c<br>onfirmPassword:<br>"" (Bỏtrống)<br>Báo<br>lỗi: Vui lòng xác<br>nhận lại mật khẩu.<br>Invalid<br>TC-MOB-REG-14<br>Nhập mật|
|<br>khẩu "Admin123!"<br>|
|vào ô TextInput<br>|
|Mật khẩu trên điện<br> <br>|
|thoại<br>Ký tựmật<br>khẩu gõ vào được<br>tựđộngẩn thành<br>dấu chấm<br>|
|(••••••••) thông<br>|
|qua thuộc tính<br>|
|secureTextEntry.<br>Valid|
|TC-MOB-REG-15<br>Nhấn chọn<br>|
|ô Email trên điện<br> <br>|
|thoại<br>Bàn phím<br>|
|ảo xuất hiện không|
|<br>tựđộng viết hoa|
|<br>chữcái đầu tiên<br>|
|(autoCapitalize="n|
|one"), loại bàn|
|<br>phím hiển thịphím<br>@ thuận tiện.<br>|
|Valid|
|BƯỚC 4: GIẢI|



|THÍCH CHI TIẾT|
|---|
|TỪNG BƯỚC ĐÃ<br>ÁP DỤNG & CÁC|
|LỖI THỰC TẾ|
|TRÊN MOBILE APP<br>1. Phân tích miền<br>giá trịriêng cho|
|Mobile:<br>Khác biệt nền tảng:|
|Trên Mobile App,<br>các biến không chỉ<br>là kiểu dữliệu<br>chuỗi mà còn bịchi<br>phối bởi các|
|component Native<br>nhưTextInput, bàn<br>phímảo (Virtual<br>Keyboard), thuộc<br>tính<br>secureTextEntry,<br>|
|và cơchếxửlý<br>|
|phản hồi qua<br>Alert.alert thay vì<br>redirect URL như<br>trên web.|
|Tập trung vào tính<br>|
|toàn vẹn dữliệu:<br>Phân tách mật<br>|
|khẩu thành 5 điều<br>|
|kiện con độc lập để<br>|
|phát hiện lập trình<br>viên thiếu sót điều|
|kiện Regex nào.|
|2. Phát hiện các sai|
|lệch nghiêm trọng|
|giữa Mobile App|
|Code và Đặc tảFR-|
|01:<br>|
|Qua kiểm tra trực<br>|
|tiếmã nuồn|
|p  g <br>frontend-<br>mobile/App.js|
|(dòng 800 - 836 và|
|210 - 240), đã phát<br>|
|hiện 3 lỗi vi phạm<br>|
|đặc tảrất lớn trên|
|<br>Mobile:|
|🐛THIẾU HOÀN|



|TOÀN TRƯỜNG|
|---|
|"XÁC NHẬN MẬT|
|KHẨU":|
|Đặc tảFR-01 quy|
|định rõ: "Phải có|
|trường Xác nhận<br>|
|mật khẩu — hệ<br>|
|thống từchối nếu|
|hai trường không|
|khớp."<br>Tuy nhiên, trong<br>hàm|
|renderRegister()<br>của Mobile App chỉ|
|có 3 ô HọTên,<br>|
|Email, Mật khẩu. Ô|
|Xác nhận mật khẩu|
|hoàn toàn không<br>tồn tại trong giao|
|<br>diện Mobile<br>$\rightarrow$ Các|
|<br>test case TC-MOB-<br>REG-12 và TC-<br>MOB-REG-13 sẽ<br>|
|phát hiện ngay Bug|
|<br>này.<br>🐛KHÔNG<br>VALIDATE HỌTÊN<br>|
|VÀ EMAILỞPHÍA|
|<br>CLIENT:|
|Trong|
|handleRegister(),<br>|
|Mobile app chỉ<br>|
|kiểm tra|
|strongPasswordRe<br>|
|gex mà không kiểm|
|tra registerName<br>hoặc registerEmail<br>có rỗng hay không,<br>gửi thẳng chuỗi<br>|
|rỗng lên backend.<br>|
|🐛SAI TẬP KÝ TỰ<br>|
|ĐẶC BIỆT CỦA<br>|
|MẬT KHẨU:|
|Đặc tảFR-01 giới|
|hạn: @, $, !, %, *, ?,|
|&.<br>|
|Nhưng mã nguồn|
|Mobile sửdụng|



||Regex [^A-Za-z\d]<br>(chấp nhận mọi ký<br>tựngoài chữvà số,<br>kểcảdấu cách,<br>emoji, dấu gạch<br>nối).<br>3. Đánh giá tính<br>hữu ích của kỹ<br>thuật Domain<br>Testing:<br>Việc lập ma trận<br>kết hợp Base<br>Choice kết hợp với<br>các phân vùng<br>Valid/Invalid giúp<br>đội ngũ QA kiểm<br>thửtoàn diện mọi<br>khía cạnh của<br>Mobile App từlogic<br>kiểm tra dữliệu,<br>bảo mật hiển thị<br>mật khẩu đến luồng<br>điều hướng màn<br>hình (navigation &<br>auto-fill state).|||
|---|---|---|---|
|**Tool: Gemini**<br>|Dưới đây là áp dụng|Valid|Ổn|
|**Date: 20/10/2026**|kỹ thuật**Boundary**|||
|**19:50**<br>|<br>**Value Analysis**|||
|**Prompt: “"Bây giờ**<br>|<br>**(BVA)**cho các biến|||
|**hãy áp dụng kỹ**<br>**thuật Boundary**|có giá trị biên trong<br>íh ă**FR01**|||
|**Value Analysis**<br>|tn nng**-:**<br>|||
|**(BVA) cho các biến**|**Đăng ký tài khoản**<br>|||
|**có giá trị biên**|**trên Mobile App**,|||
|**trong FR1-Mobile**<br>|được trình bày chi<br>|||
|**App:Xác định các**<br>**trường có biên.**<br>**Xác định các mốc**<br>|tiết theo chuẩn 4<br>bước:|||
|**biên theo chuẩn 2-**|**Bước 1: Nhận diện**|||
|**value hoặc 3-value**|<br>**các thuộc tính có**|||
|**BVA. Tạo danh**|<br>**thể đo lường thứ tự**|||
|**sách Test Cases**<br>|<br>**tron FR-01 (Mobile**|||
|**kiểm thử biên chi**|**g**<br>|||
|<br>**tiết bao gồm: Field,**<br>|**App)**<br>K thật BVA chỉ á|||
|**Boundary Point**<br>|ỹ u   p<br>dn h á thộ|||
|**($min-1$, $min$,**|ụg co cc uc<br>|||
|<br>**$min+1$, v.v.),**<br>**I D**|tính có thứ tự liên<br>tc rời rc hoặc độ|||
|**nput ata,**|ụ,  ạ|||
|**Expected Result.**<br>|dài/số lượng đo|||
|**Cung cấp đoạn giải**<br>**thích chi tiết từng**|đếm được. Trong<br>tính năng **FR-01**|||







<!-- Start of picture text -->
bước đã bạn đã áp  trên Mobile App ,<br>dụng” các thuộc tính có<br>giá trị biên bao<br>gồm:<br>1. Độ dài chuỗi<br>mật khẩu<br>( registerPass<br>word.length ) :<br>Có quy định độ<br>dài tối thiểu từ 8<br>ký tự trở lên.<br>2. Số lượng ký tự<br>tối thiểu của<br>từng nhóm<br>trong mật khẩu :<br><br>Số lượng chữ<br>hoa: $\text{Min}<br>= 1$<br><br>Số lượng chữ<br>thường:<br>$\text{Min} = 1$<br><br>Số lượng chữ số:<br>$\text{Min} = 1$<br><br>Số lượng ký tự<br>đặc biệt ( @, $,<br>!, %, *, ?,<br>& ): $\text{Min} =<br>1$<br>3. Độ dài chuỗi Họ<br>Tên<br>( registerName<br>.length ) : Đo<br>đếm từ 0 ký tự<br>(rỗng) đến<br>ngưỡng tối đa<br>của cơ sở dữ liệu.<br>4. Độ dài chuỗi<br>Email<br>( registerEmai<br>l.length ) : Đo<br>đếm độ dài chuỗi<br>email hợp lệ theo<br>chuẩn kỹ thuật<br>RFC.<br>Bước 2: Xác định<br>Biên tường minh<br>(Explicit) và Biên<br><!-- End of picture text -->



<!-- Start of picture text -->
ngầm định<br>(Implicit)<br> Biên tường<br>minh (Explicit<br>Boundary):  Được<br>nêu rõ trong đặc<br>tả  README.md  (F<br>R-01):<br> Mật khẩu: Tối<br>thiểu 8 ký tự<br>$\Rightarrow<br>\text{Min} = 8$.<br><br>Mật khẩu phải<br>có ít nhất 1 chữ<br>hoa, 1 chữ<br>thường, 1 số, 1<br>ký tự đặc biệt<br>$\Rightarrow<br>\text{Min} = 1$<br>cho mỗi nhóm<br>ký tự.<br> Họ Tên, Email:<br>Bắt buộc<br>$\Rightarrow<br>\text{Min} = 1$<br>ký tự (không<br>được để rỗng).<br><br>Biên ngầm định<br>(Implicit<br>Boundary):  Xuất<br>phát từ hạ tầng<br>kỹ thuật<br>(Database<br>schema SQLite,<br>RFC Email, React<br>Native  TextInpu<br>t  buffer):<br> Giới hạn lưu trữ<br>cột  users<br>(name,<br>email,<br>password)  tro<br>ng CSDL<br>$\Rightarrow<br>\text{Max} =<br>255$ ký tự.<br> Chuẩn RFC<br>5321: Độ dài<br><!-- End of picture text -->



<!-- Start of picture text -->
Email tối đa là<br>254 ký tự<br>($\text{Max} =<br>254$).<br>Bước 3: Lựa chọn<br>mô hình mốc biên:<br>Chuẩn 3-Value BVA<br>Vì chức năng Đăng<br>ký tài khoản trên<br>Mobile App là cổng<br>xác thực đầu vào<br>quan trọng (ảnh<br>hưởng trực tiếp đến<br>an ninh tài khoản và<br>bảo mật mật khẩu),<br>chúng ta áp<br>dụng  Chuẩn 3-<br>value<br>BVA  ($\text{Bounda<br>ry} - 1$,<br>$\text{Boundary}$,<br>$\text{Boundary} +<br>1$) nhằm kiểm tra<br>trọn vẹn cả điểm lỗi,<br>điểm hợp lệ tối<br>thiểu và điểm hợp lệ<br>an toàn:<br>1. Biến độ dài mật<br>khẩu<br>( registerPass<br>word.length )<br>với Min = 8:<br> $\text{Min} - 1 =<br>7$: Điểm Invalid<br>cận dưới (phải bị<br>chặn).<br> $\text{Min} = 8$:<br>Điểm Valid tối<br>thiểu (phải được<br>chấp nhận).<br> $\text{Min} + 1<br>= 9$: Điểm Valid<br>an toàn (phải<br>được chấp<br>nhận).<br> Biên trên Max =<br>255 (Ngưỡng<br><!-- End of picture text -->



<!-- Start of picture text -->
DB):  $\text{Max}<br>-1 = 254$<br>(Valid),<br>$\text{Max} =<br>255$ (Valid),<br>$\text{Max}+1 =<br>256$ (Invalid).<br>2. Biến số lượng<br>loại ký tự trong<br>mật khẩu với<br>Min = 1:<br> $\text{Min} - 1 =<br>0$: Thiếu loại ký<br>tự đó (Invalid -<br>phải bị chặn).<br> $\text{Min} = 1$:<br>Đạt đúng 1 ký tự<br>yêu cầu (Valid<br>tối thiểu).<br> $\text{Min} + 1<br>= 2$: Có 2 ký tự<br>thuộc nhóm đó<br>(Valid an toàn).<br>3. Biến độ dài Họ<br>Tên<br>( registerName<br>.length ) với<br>Min = 1:<br> $\text{Min} - 1 =<br>0$ ký tự (Invalid<br>- Bỏ trống).<br> $\text{Min} = 1$<br>ký tự (Valid tối<br>thiểu).<br> $\text{Min} + 1<br>= 2$ ký tự (Valid<br>an toàn).<br>Bước 4: Danh sách<br>Test Cases kiểm thử<br>biên chi tiết (BVA)<br>trên Mobile App<br>Nguyên tắc cô lập<br>biến:  Khi kiểm tra<br>biên của một<br>trường, tất cả các<br>trường và điều kiện<br>còn lại được giữ ở<br><!-- End of picture text -->



<!-- Start of picture text -->
giá trị hợp lệ chuẩn<br>để tránh che khuất<br>lỗi.<br>Mốc biên<br>Test ID  Field / Biến  (Boundary  Dữ liệu đầu vào (Input Data)<br>Point)<br>BVA- name : "Nguyen A"<br> email :<br>$\text{Min} - 1$<br>MOB- password.length "bva01@eshop.com"<br> password :  "<br>($7$ ký tự)<br>01 thường, 1 số, 1 đặc biệt)<br>BVA-<br>$\text{Min}$ ($8$<br>MOB- password.length password :  "Aa1@xyzz"  (8 kt: đủ 4 nh<br>ký tự)<br>02<br>BVA-<br>$\text{Min} + 1$<br>MOB- password.length password :  "Aa1@xyzzz"  (9 kt: đủ 4 n<br>($9$ ký tự)<br>03<br>BVA-<br>$\text{Max} - 1$<br>MOB- password.length password : Chuỗi 254 ký tự (bắt đầu bằ<br>($254$ ký tự)<br>04<br>BVA-<br>$\text{Max}$<br>MOB- password.length password : Chuỗi 255 ký tự (bắt đầu bằ<br>($255$ ký tự)<br>05<br>BVA-<br>$\text{Max} + 1$<br>MOB- password.length password : Chuỗi 256 ký tự (bắt đầu bằ<br>($256$ ký tự)<br>06<br>BVA-<br>Số chữ hoa  $\text{Min} - 1$<br>MOB- password :  "admin123!"  ($0$ chữ ho<br>(Uppercase)  ($0$ chữ hoa)<br>07<br>BVA-<br>Số chữ hoa  $\text{Min}$ ($1$<br>MOB- password :  "Admin123!"  ($1$ chữ ho<br>(Uppercase)  chữ hoa)<br>08<br><!-- End of picture text -->





<!-- Start of picture text -->
BVA-<br>Số chữ hoa  $\text{Min} + 1$<br>MOB- password :  "ADmin123!"  ($2$ chữ ho<br>(Uppercase)  ($2$ chữ hoa)<br>09<br>BVA-<br>$\text{Min} - 1$<br>MOB- Số ký tự đặc biệt  password :  "Admin1234"  ($0$ ký tự đ<br>($0$ ký tự ĐB)<br>10<br>BVA-<br>$\text{Min}$ ($1$<br>MOB- Số ký tự đặc biệt  password :  "Admin123@"  ($1$ ký tự đ<br>ký tự ĐB)<br>11<br>BVA-<br>$\text{Min} + 1$<br>MOB- Số ký tự đặc biệt  password :  "Admin123@!"  ($2$ ký tự<br>($2$ ký tự ĐB)<br>12<br>BVA-<br>$\text{Min} - 1$<br>MOB- name.length name :  ""  (Rỗng, focus vào ô rồi bấm Đ<br>($0$ ký tự)<br>13<br>BVA-<br>$\text{Min}$ ($1$<br>MOB- name.length name :  "A"<br>ký tự)<br>14<br>BVA-<br>$\text{Min} + 1$<br>MOB- name.length name :  "An"<br>($2$ ký tự)<br>15<br>BVA-<br>$\text{Max} + 1$<br>MOB- email.length email : Chuỗi email dài 255 ký tự (vượt<br>($255$ ký tự)<br>16<br>💡  Giải thích chi tiết<br>các bước đã áp<br>dụng cho BVA (FR-<br>01 Mobile App):<br>1. Bước 1: Nhận<br>diện biến đo<br>lường được trên<br><!-- End of picture text -->



<!-- Start of picture text -->
Mobile:<br> Tập trung vào<br>các thuộc tính<br>chuỗi nhập<br>qua  TextInput<br> có thể đếm ký<br>tự ( length )<br>hoặc đếm số lần<br>xuất hiện của<br>các thành phần<br>con (ký tự hoa,<br>thường, số, đặc<br>biệt).<br>2. Bước 2: Phân<br>tách rõ ràng<br>giữa Biên tường<br>minh và Biên<br>ngầm định:<br> Biên tường minh<br>lấy trực tiếp từ<br>bản đặc tả FR-<br>01:  length >=<br>8 , số lượng mỗi<br>loại ký tự  >= 1 .<br><br>Biên ngầm định<br>lấy từ cấu trúc<br>CSDL SQLite<br>( VARCHAR/TEXT<br>255 ) và chuẩn<br>giao thức<br>Internet RFC<br>5321 cho email.<br>3. Bước 3: Lựa<br>chọn mô hình 3-<br>Value BVA:<br> Trong  fronten<br>d-<br>mobile/App.j<br>s , lập trình viên<br>sử dụng biểu<br>thức chính quy<br>Regex:<br> const<br>strongPasswor<br>dRegex =<br>/^(?=.*[a-<br>z])(?=.*[A-<br>Z])(?=.*\d)(?<br><!-- End of picture text -->



<!-- Start of picture text -->
=.*[^A-Za-<br>z\d]).{8,}$/;<br> Nhờ kỹ thuật 3-<br>value BVA với 3<br>mốc liên tiếp<br>$\text{Min}-<br>1=7$,<br>$\text{Min}=8$,<br>và<br>$\text{Min}+1=9<br>$, chúng ta kiểm<br>tra chính xác<br>toán tử độ<br>dài  .{8,}  của<br>Regex có chạy<br>đúng hay bị<br>lỗi  Off-by-<br>one ( .{9,}  ho<br>ặc  .{7,} ).<br>4. Bước 4: Cô lập<br>điều kiện kiểm<br>thử:<br> Khi kiểm tra<br>mốc 7 ký tự<br>( BVA-MOB-01 ),<br>chuỗi nhập<br>vào  "Aa1@xyz"<br> vẫn phải có đủ<br>1 hoa ( A ), 1<br>thường ( a ), 1 số<br>( 1 ), và 1 ký tự<br>đặc biệt ( @ ).<br>Nhờ vậy, khi hệ<br>thống Mobile<br>báo lỗi, chúng ta<br>khẳng định chắc<br>chắn 100% lỗi<br>xuất phát từ<br>điều kiện độ dài<br>chứ không bị<br>nhiễu bởi các<br>điều kiện ký tự<br>khác.<br><!-- End of picture text -->

**4. Tổng kết Độ chính xác AI** Tổng hợp verdict từ Mục 3 và điền vào bảng dưới. 

|**Chỉ số**|**Số lượng**|**Tỉ lệ**|
|---|---|---|
|**Tổng artifact AI sinh đã audit**|8||
|**VALID(đúng, dùng nguyên)**|7|%88|
|**INVALID(sai; loại bỏ)**|0|%|
|**INCOMPLETE(chấp nhận sau khi sửa)**|1|%12|



## **5. Kết luận — Khi nào nên / không nên dùng AI?** 

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này? 

Ai rất manh trong việc đọc code và sinh test case dựa trên đó. Nhưng chưa chắc chắn đối với test UI. Khuyến nghị sử dụng AI để sinh test case từ đặc tả, sau đó kiểm tra số test case này và bổ sung các test case liên quan tới AI 

## **6. Mandatory Disclosure (dán nguyên văn)** 

_“8 bảng test case trong MainReport được sinh phiên bản đầu bởi Gemini, bổ sung các explanation; bug report do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."_ 

## **Chữ ký** 

|**Họ tên sinh viên (in hoa):**|**NGUYỄN THIỆN NHÂN**|
|---|---|
|**MSSV:**|23120064|
|**Lớp / Khoá:**|23CTT1|
|**Môn học:**|CS423 / CSC13003 – Kiểm chứngPhần mềm|
|**Giảng viên:**||
|**Ngày:**|21/10/2026|
|**Chữ ký:**|NHÂN|



## **Tham khảo** 

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0. 

- ISTQB Foundation Level Syllabus (latest version). 

- Hardman, P. (2025). A Post-AI Learning Taxonomy. 

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338. 

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale. 

- Anthropic (2025). Building reliable AI test agents — engineering blog. 

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems. 

