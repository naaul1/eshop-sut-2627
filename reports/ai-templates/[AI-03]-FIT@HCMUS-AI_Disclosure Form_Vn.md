**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC15003 – Kiểm chứng Phần mềm (AI-augmented · 2026\)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# **Biểu mẫu Khai báo Sử dụng AI**

*Đính kèm cho mọi bài tập có dùng AI ở bất kỳ mức nào.*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## **1\. Thông tin Môn học & Sinh viên**

| Mục | Giá trị |
| :---- | :---- |
| **Môn học:** | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Mã bài tập:** | HW#04 |
| **Tên bài tập:** |  GUI & Usability |
| **Cấp độ AI (1–5):** | Cấp 4 |
| **Ngày:** | 16/11/2026 |
| **Họ tên sinh viên:** | Võ Thiện Nhân |
| **MSSV:** | 23120066 |

## **2\. Câu hỏi Khai báo**

### **1\. Công cụ AI đã dùng:**

Github Copilot - GPT Luna 5.6

### **2\. Giai đoạn nào của bài tập có dùng AI:**

*Tick tất cả: [x] brainstorm  [x] outline  [x] viết nháp  [] phản hồi  [x] sửa chữa  [x] code  [x] phân tích dữ liệu  [] thiết kế đồ hoạ  [] khác (ghi rõ).*

### **3\. Prompt / nhiệm vụ chính cho AI:**

*Dán nguyên văn 2–3 prompt quan trọng nhất. Để xem đầy đủ, đính kèm Phụ lục A (prompt\_log.md).*

Viết test script cho các test case: TC-FR03-01 đến TC-FR03-04, TC-FR03-11, TC-FR03-12, TC-FR03-17 đến TC-FR03-20, TC-FR03-22 đến TC-FR03-27
Đảm bảo các test được thực hiện theo dạng data-driven bằng cách import data từ file .json (nếu có thể), thực hiện test trên 3 trình duyệt là Chrome, Firefox và WebKit và sử dụng ít nhất 3 assertion pattern khác nhau.

Tổng hợp các tác vụ đã thực hiện trong session này thành skill playwright-web-testing
Đầu vào là mã tính năng và mã test case (nếu không có mã test case thì mặc định thực hiện tất cả các test case liên quan đến tính năng đó), file spec và file test cases.
Đầu ra là mã nguồn POM, file test script và file test data.

/playwright-web-testing tính năng: FR-09
test cases: TC-FR09-01 đến TC-FR09-06, TC-FR09-09, TC-FR09-11, TC-FR09-31, TC-FR09-32, TC-FR09-34, TC-FR09-35
Nút "Áp dụng" không bấm được xem như rejected

### **4\. Phần cụ thể AI đóng góp:**

AI đã sinh các test script, test data và POM của cho trang liên quan đến các tính năng được test:
- Test script:
    + [fr03-script](../../tests/FR-03/forgot-password.spec.ts)
    + [fr09-script](../../tests/FR-09/coupon.spec.ts)
    + [fr17-script](../../tests/FR-17/fr17.spec.ts)
- Test data:
    + [fr03-data](../../tests/FR-03/forgot-password-cases.json)
    + [fr09-data](../../tests/FR-09/coupon-cases.json)
    + [fr17-data](../../tests/FR-17/fr17-cases.json)
- POM:
    + [fr03-pom](../../tests/pages/ForgotPasswordPage.ts)
    + [fr09-pom](../../tests/pages/CouponPage.ts)
    + [fr17-pom](../../tests/pages/AdminCouponPage.ts)
(Các file trong folder [text](../ai-artifacts) đã được tạo từ HW#02)

### **5\. Cách tôi rà soát / chỉnh sửa / xác minh đầu ra AI:**

Tôi đã rà soát và xác minh đầu ra của AI bằng cách chạy thử và đối chiếu kết quả với kết quả do tôi thực hiện test thủ công ở HW#02.

### **6\. Trích dẫn (nếu môn yêu cầu):**

## **3\. Cam đoan Trung thực**

*Bằng việc ký tên dưới đây, tôi cam đoan thông tin khai báo ở trên là chính xác và đầy đủ. Tôi hiểu rằng việc không khai báo hoặc khai báo sai lệch về việc dùng AI sẽ bị coi là vi phạm liêm chính học thuật và có thể dẫn đến điểm 0 cho bài tập cùng việc bị chuyển lên hội đồng kỷ luật.*

## **Chữ ký**

| Họ tên sinh viên (in hoa): | VÕ THIỆN NHÂN |
| :---- | :---- |
| **MSSV:** | 23120066 |
| **Lớp / Khoá:** | 23_3 |
| **Môn học:** | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Giảng viên:** | Lâm Quang Vũ |
| **Ngày:** | 17/11/2026 |
| **Chữ ký:** | vothiennhan |

## **Tham khảo**

* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.  
* ISTQB Foundation Level Syllabus (latest version).  
* Hardman, P. (2025). A Post-AI Learning Taxonomy.  
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338\.  
* Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.  
* Anthropic (2025). Building reliable AI test agents — engineering blog.  
* DeepEval & Promptfoo documentation — testing frameworks for LLM systems.