<script setup>
import ModalDialog from '@/components/ModalDialog.vue';

const token = sessionStorage.getItem('authtoken')
    
</script>

<template>
    <div class="flex">
    <div v-if="token" >
        <ModalDialog />
    </div>
    <div :class="[token ? 'max-w-[900px] ' : 'max-w-[1000px] ml-48']">
        <h1 class="text-4xl mb-6 font-semibold">Hướng dẫn sử dụng</h1>
        <p class="my-1 font-bold">1. Giới thiệu</p>
        <p class="px-5">
            - Chào mừng bạn đến với hệ thống thư viện số của chúng tôi! Phần mềm này cho phép bạn truy cập hàng ngàn
            cuốn
            sách điện tử, tài liệu học tập và các tài nguyên khác một cách dễ dàng. Hướng dẫn này sẽ giúp bạn nắm bắt
            các tính năng cơ bản và nâng cao của hệ thống, từ cách đăng ký tài khoản đến quản lý thư viện cá nhân của
            bạn.
        </p>
        <p class="my-1 font-bold">2. Đăng ký tài khoản</p>
        <ul>
            <li class="px-5">
                <p class="font-bold">B1: Truy cập trang đăng ký</p>
                ● Mở trình duyệt web và truy cập vào địa chỉ của hệ thống thư viện số. Chọn button Đăng ký ở bên góc
                phải màn hình.
            </li>
            <li class="p-5">
                <img src="../assets/Register.png" width="800" />
            </li>
            <li class="px-5">
                <p class="font-bold">Bước 2: Chọn đăng nhập ( nếu đã có tài khoản) hoặc chọn Đăng ký để tiếp . Điền
                    thông tin cá nhân vào
                    phần Đăng ký tài khoản mới.</p>
                ● Nhập các thông tin cần thiết và các thông tin khác theo yêu cầu.
                Bước 3: Xác nhận đăng ký<br />
                ● Kiểm tra email để nhận mã xác thực và hoàn tất quá trình đăng ký
            </li>
            <li class="px-5">
                <p class="font-bold">Bước 4: Đăng nhập</p>
                ● Sử dụng email và mật khẩu đã đăng ký để đăng nhập vào hệ thống.
            </li>
            <li class="p-5">
                <img src="../assets/Login.png" width="800" />
            </li>
            <p class="my-1 font-bold">3. Tìm kiếm sách</p>
            <li class="px-5">
                <p class="my-1 font-bold">Tìm kiếm sách</p>
                ● Sử dụng thanh tìm kiếm trên giao diện chính. Nhập tên sách, tên tác giả, hoặc từ khóa liên quan để tìm
                sách bạn muốn.<br />
                ● Nhấp vào tiêu đề của sách trong danh sách kết quả tìm kiếm hoặc danh mục để mở trang chi tiết sách. Từ
                đó, chọn "Đọc trực tiếp'' để bắt đầu đọc sách trực tuyến.
            </li>
            <li class="p-5">
                <img src="../assets/SearchBook.png" width="800" />
            </li>
        </ul>
        <p class="my-1 font-bold">4. Thông tin người dùng</p>
        <ul>
            <li class="px-5">
                <p class="my-1 font-bold">Xem và sửa thông tin</p>
                ● Truy cập vào mục "Thông tin cá nhân''/ " Thông tin tài khoản" để xem và cập nhật thông tin .
            </li>
            <li class="p-5">
                <img src="../assets/Infomation.png" width="800" />
            </li>
            <li class="px-5">
                <p class="my-1 font-bold">Quản lý lịch sử đọc</p>
                ● Xem lại lịch sử các cuốn sách bạn đã đọc hoặc đánh dấu các sách yêu thích trong phần "Dịch vụ ''.
            </li>
            <li class="px-5">
                <p class="my-1 font-bold">Vô hiệu hóa tài khoản</p>
                ● Nếu bạn muốn tạm dừng sử dụng tài khoản, bạn có thể vô hiệu hóa tài khoản trong phần "Thông tin tài
                khoản". Tài khoản của bạn sẽ được tạm dừng, và các thông tin sẽ được lưu trữ an toàn.
            </li>
        </ul>
        <p class="my-1 font-bold">5. Thanh toán và nâng cấp tài khoản</p>
        <ul>
            <li class="px-5">
                <p class="my-1 font-bold">Quản lý thông tin thanh toán và thanh toán </p>
                ● Bước 1 : Chọn gói thành viên Chọn gói thẻ hạng thành viên mong muốn và click vào để hiện ra pop up
                thanh toán.
            </li>
            <li class="p-5">
                <img src="../assets/Payment.png" width="800" />
            </li>
            <li class="px-5">
                ● Bước 2 : Quét mã hoặc thanh toán trực tiếp hoặc liên kết với tài khoản VN PAY để hoàn thành giao dịch
                nhanh
                hơn.
            </li>
            <li class="p-5">
                <img src="../assets/Pay.png" width="800" />
            </li>
            <li class="px-5">
                ● Xem lại lịch sử thanh toán, quản lý lịch sử thanh toán bằng cách chọn phần " Hỗ trợ " và chọn " Thông
                tin thanh toán " trong dashboard bên trái màn hình.
            </li>
            <li class="px-5">
                <img src="../assets/InforPay.png" />
            </li>
        </ul>
        <p class="my-1 font-bold">6. Gửi yêu cầu - hỗ trợ trực tuyến </p>
        <ul>
            <li class="px-5">
                <p class="my-1 font-bold">Liên hệ hỗ trợ</p>
                ● Nếu bạn gặp vấn đề trong quá trình sử dụng, bạn có thể liên hệ với đội ngũ hỗ trợ của chúng tôi qua
                email, điện thoại, hoặc trò chuyện trực tuyến.
            </li>
            <li class="px-5">
                <p class="my-1 font-bold">Câu hỏi thường gặp (FAQ)</p>
                ● Truy cập phần "Trợ giúp" để xem các câu hỏi thường gặp và giải pháp cho các vấn đề phổ biến.
            </li>
            <li class="pt-5">
                <img src="../assets/Support.png" width="800" />
            </li>
        </ul>
    </div>
    </div>
    
</template>
