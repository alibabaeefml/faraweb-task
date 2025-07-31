<template>
  <div class="container">
    <div class="page-title">آفرهای اسپانسرینگ</div>
    <div class="toggle-container">
      <button 
        class="toggle-btn" 
        :class="{ active: mode === 'direct' }" 
        @click="setMode('direct')"
      >مستقیم</button>
      <button 
        class="toggle-btn" 
        :class="{ active: mode === 'indirect' }" 
        @click="setMode('indirect')"
      >غیر مستقیم</button>
    </div>
    <div class="cards" >
      <div
        v-for="(card, idx) in cards"
        :key="card.id"
        class="card"
        draggable="true"
        @dragstart="onDragStart(idx)"
        @dragover.prevent
        @drop="onDrop(idx)"
        :style="{ opacity: draggingIdx === idx ? 0.5 : 1, cursor: mode === 'direct' ? 'grab' : 'not-allowed' }"
      >
        <div class="card-header">
          <img :src="card.img" :alt="card.alt">
          <span class="card-title">{{ card.title }}</span>
        </div>
        <p class="card-text">{{ card.text }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useCardsStore } from '~/stores/cards';

const store = useCardsStore();
const mode = computed(() => store.mode);
const cards = computed(() => store.cards);
const draggingIdx = ref(null);

function setMode(val) {
  store.setMode(val);
}

function onDragStart(idx) {
  if (mode.value !== 'direct') return;
  draggingIdx.value = idx;
}

function onDrop(idx) {
  if (mode.value !== 'direct' || draggingIdx.value === null) return;
  store.swapCards(draggingIdx.value, idx);
  draggingIdx.value = null;
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');
.container {
  font-family: 'Vazirmatn', 'Amiri', serif;
  background-color: #f5f5eb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px 20px;
  direction: rtl;
}
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 60px;
  margin-bottom: 32px;
  text-align: center;
  letter-spacing: -1px;
}
.toggle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  padding: 6px 8px;
  margin-bottom: 40px;
  gap: 0;
  width: fit-content;
}
.toggle-btn {
  padding: 10px 32px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
  transition: background 0.2s, color 0.2s;
}
.toggle-btn.active {
  background-color: #00C4A7;
  color: #fff;
}
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
  width: 100%;
  max-width: 1100px;
  direction: rtl;
}
.card {
  background-color: #fff;
  padding: 32px 28px 24px 28px;
  border-radius: 16px;
  text-align: right;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  transition: opacity 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 170px;
  direction: rtl;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.card img {
  width: 38px;
  height: 38px;
  margin-bottom: 0;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #222;
}
.card-text {
  font-size: 1.05rem;
  color: #444;
  margin: 0;
  margin-top: 6px;
  line-height: 1.8;
}
</style>