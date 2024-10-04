<script setup>
import { onMounted } from 'vue';
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import store from '@/store';

const books = ref([]);
const page = ref(0)
const size = ref(20)

const currentIndex = ref(1); // Start with the second book
const allBooks = computed(() => store.getters.getBook)
// Function to go to the next book
watch(allBooks, (newBooks) => {
  books.value = newBooks.data
})

let autoSlideInterval;
const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextBook();
  }, 3000); // 3 giây chuyển ảnh
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
};

const nextBook = () => {
  if (books.value.length > 1) {
    currentIndex.value = (currentIndex.value + 1) % books.value.length;
  }
};

const prevBook = () => {
  if (books.value.length > 1) {
    currentIndex.value = (currentIndex.value - 1 + books.value.length) % books.value.length;
  }
};
const getBookStyle = (index) => {
  const offset = index - currentIndex.value;
  const absOffset = Math.abs(offset);

  const scale = 1 - 0.3 * absOffset; // Phóng to sách ở giữa
  const zIndex = books.value.length - absOffset; // Đảm bảo sách ở giữa nằm trên cùng
  const translateX = offset * 150; // Khoảng cách giữa các sách

  return {
    transform: `translateX(${translateX}px) scale(${scale})`,
    zIndex: zIndex,
    opacity: index === currentIndex.value ? 2 : 0.5, // Tăng độ rõ của sách ở giữa
  };
};


onMounted( async () => {
  await store.dispatch('fetchBook', page.value, size.value)
  startAutoSlide();
})

onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<template>

  <div class="about">
    <div class="mx-6 px-6 grid xl:grid-cols-2 ">
      <div class="flex justify-center items-center">
        <div>
          <h1 class="text-5xl font-semibold text-emerald-600 mb-2">ezLibrary</h1>
          <p class="text-2xl">Là hệ thống thư viện số tiên tiến, nơi bạn có thể thỏa sức khám phá kho tri thức vô tận
            một
            cách dễ dàng. Với
            ezLibrary, bạn có thể đọc sách miễn phí từ kho tàng tri thức phong phú.Hệ thống còn cung cấp nhiều loại tài
            liệu
            đa dạng, phục vụ cho nhu cầu học tập, nghiên cứu và giải trí của mọi đối tượng người dùng. Tham gia
            ezLibrary
            ngay hôm nay để tận hưởng trải nghiệm đọc sách hiện đại và không giới hạn!</p>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="book-slider" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
          <button @click="prevBook" class="slider-btn left">❮</button>
          <div v-for="(book, index) in books" :key="index" :class="['book-card', { active: index === currentIndex }]"
            :style="getBookStyle(index)">
            <img :src="`http://localhost:8080/book/cover?bookId=${book.id}`" :alt="book.title" />
          </div>
          <button @click="nextBook" class="slider-btn right">❯</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.book-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 460px;
  height: 300px;
  perspective: 1000px;
  overflow: hidden;
}

.book-card {
  position: absolute;
  width: 200px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.5s ease, z-index 0.5s ease, opacity 0.5s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.book-card img {
  width: 300px;
  height: 100%;
  object-fit: cover;
}

.book-card.active {
  opacity: 1;
  transform: scale(1.2);
}

.book-card:not(.active) {
  opacity: 0.6;
  transform: scale(0.9);
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 100%;
}

.slider-btn.left {
  left: 10px;
}

.slider-btn.right {
  right: 10px;
}

.slider-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.book-card {
  opacity: 0;
  pointer-events: none;
}

.book-card:nth-child(-n+3) {
  opacity: 1;
  pointer-events: auto;
}
.book-slider:hover .slider-btn {
  opacity: 1;
}

.slider-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
