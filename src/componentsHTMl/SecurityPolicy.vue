<script setup lang="ts">
import ModalDialog from '@/components/ModalDialog.vue';

const token = sessionStorage.getItem('authtoken')

</script>

<template>
    <div class="flex">
        <div v-if="token">
            <ModalDialog />
        </div>
        <div :class="[ token ? 'max-w-[900px]': 'max-w-[1000px] ml-48']">
            <h1 class="text-4xl mb-6 font-semibold">Chính sách bảo mật</h1>
            <p>Chúng tôi tại EzLibrary cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật
                này
                giải thích cách chúng tôi thu thập, sử dụng, và bảo vệ dữ liệu của bạn khi bạn sử dụng dịch vụ của chúng
                tôi.</p>
            <p class="my-1 font-bold">1. Thông tin chúng tôi thu thập</p>
            <ul>
                <li class="my-1">- Thông tin cá nhân: Khi bạn đăng ký tài khoản, chúng tôi có thể yêu cầu bạn cung cấp
                    các
                    thông tin cá
                    nhân như tên, địa chỉ email, số điện thoại, và địa chỉ.</li>
                <li>
                    - Thông tin đăng nhập: Khi bạn sử dụng hệ thống, chúng tôi sẽ ghi lại địa chỉ IP, thời gian truy
                    cập, và
                    hoạt động của bạn trên trang web.
                </li>
                <li class="my-1">
                    - Thông tin thanh toán: Nếu bạn mua gói thành viên, chúng tôi sẽ thu thập thông tin thanh toán cần
                    thiết,
                    bao gồm số thẻ tín dụng, tên chủ thẻ, và thông tin thanh toán khác.
                </li>
                <li class="my-1">
                    - Cookie và các công nghệ theo dõi: Chúng tôi sử dụng cookie và các công nghệ tương tự để theo dõi
                    hoạt
                    động của bạn trên trang web và cải thiện trải nghiệm người dùng.
                </li>
            </ul>
            <p class="my-1 font-bold">2. Cách chúng tôi sử dụng thông tin</p>
            <ul>
                <li>
                    - Cung cấp và cải thiện dịch vụ: Chúng tôi sử dụng thông tin cá nhân của bạn để cung cấp các dịch vụ
                    mà
                    bạn yêu cầu, bao gồm quản lý tài khoản, hỗ trợ kỹ thuật, và cải thiện trải nghiệm người dùng.
                </li>
                <li class="my-1">
                    - Gửi thông báo và cập nhật: Chúng tôi có thể sử dụng địa chỉ email của bạn để gửi các thông báo
                    quan
                    trọng, cập nhật về dịch vụ, hoặc các thông tin khuyến mãi.
                </li>
                <li>
                    - Phân tích và nghiên cứu: Thông tin thu thập được sẽ được sử dụng để phân tích xu hướng người dùng,
                    giúp
                    chúng tôi nâng cao chất lượng dịch vụ.
                </li>
                <li class="my-1">
                    - Tuân thủ pháp luật: Chúng tôi có thể tiết lộ thông tin cá nhân của bạn nếu cần thiết để tuân thủ
                    các
                    yêu
                    cầu pháp lý hoặc bảo vệ quyền lợi hợp pháp của chúng tôi.
                </li>
                <p class="my-1 font-bold">3. Chia sẻ thông tin của bạn</p>
                <li>
                    - Nhà cung cấp dịch vụ: Chúng tôi có thể chia sẻ thông tin cá nhân của bạn với các bên thứ ba cung
                    cấp
                    dịch vụ cho chúng tôi, như dịch vụ thanh toán, lưu trữ dữ liệu, hoặc phân tích dữ liệu.
                </li>
                <li class="my-1">
                    - Những bên này được yêu cầu bảo vệ thông tin của bạn và chỉ sử dụng nó cho mục đích cung cấp dịch
                    vụ
                    cho
                    chúng tôi.
                </li>
                <li>
                    - Yêu cầu pháp lý: Chúng tôi có thể chia sẻ thông tin của bạn nếu được yêu cầu bởi luật pháp hoặc
                    trong
                    trường hợp chúng tôi cần bảo vệ quyền lợi hợp pháp của mình.
                </li>
            </ul>
            <p class="my-1 font-bold">4. Bảo mật thông tin</p>
            <p>- Chúng tôi sử dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân của bạn khỏi
                truy
                cập
                trái phép, mất mát, hoặc lạm dụng. Tuy nhiên, không có phương thức truyền tải dữ liệu nào trên Internet
                hoặc
                phương thức lưu trữ điện tử nào là hoàn toàn an toàn, do đó chúng tôi không thể đảm bảo an ninh tuyệt
                đối.
            </p>
            <p class="my-1 font-bold">5. Quyền của bạn</p>
            <ul>
                <li>
                    - Quyền truy cập và chỉnh sửa: Bạn có quyền truy cập và chỉnh sửa thông tin cá nhân của mình bất kỳ
                    lúc
                    nào
                    thông qua cài đặt tài khoản của bạn.
                </li>
                <li class="my-1">
                    - Quyền xóa bỏ: Bạn có quyền yêu cầu xóa bỏ thông tin cá nhân của mình khỏi hệ thống của chúng tôi,
                    trừ
                    khi
                    chúng tôi cần giữ lại thông tin đó để tuân thủ các nghĩa vụ pháp lý hoặc bảo vệ quyền lợi hợp pháp.
                </li>
                <li>
                    - Quyền phản đối: Bạn có quyền phản đối việc chúng tôi sử dụng thông tin cá nhân của bạn cho các mục
                    đích
                    tiếp thị hoặc phân tích.
                </li>
            </ul>
            <p class="my-1 font-bold">6. Liên hệ với chúng tôi</p>
            <p>
                - Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc về cách chúng tôi xử lý thông tin cá nhân
                của
                bạn, vui lòng liên hệ với chúng tôi qua .
            </p>
            <p class="my-1 font-bold">7. Thay đổi chính sách bảo mật</p>
            <p>
                - Chúng tôi có thể cập nhật chính sách bảo mật này để phản ánh những thay đổi trong thực tiễn của chúng
                tôi
                hoặc để tuân thủ các quy định pháp luật mới. Mọi thay đổi sẽ được thông báo trên trang web của chúng tôi
                và
                sẽ có hiệu lực ngay sau khi được đăng tải.
            </p>
        </div>
    </div>
</template>