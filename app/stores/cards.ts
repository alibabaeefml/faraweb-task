import { defineStore } from 'pinia';

interface Card {
  id: number;
  img: string;
  alt: string;
  title: string;
  text: string;
}

interface State {
  mode: 'direct' | 'indirect';
  cards: Card[];
}

export const useCardsStore = defineStore('cards', {
  state: (): State => ({
    mode: 'direct',
    cards: [
      {
        id: 1,
        img: '/eyes.png',
        alt: 'غافلگیری مخاطب',
        title: 'غافلگیری مخاطب',
        text: 'برند خلاقانه و بامزه وارد داستان می‌شود و لبخند مخاطب را جلب می‌کند.'
      },
      {
        id: 2,
        img: '/brain.png',
        alt: 'ماندگاری',
        title: 'ماندگاری',
        text: 'برند در داستان طنز، مثل یک جوک خوب در ذهن می‌ماند.'
      },
      {
        id: 3,
        img: '/armchair.png',
        alt: 'تعامل بیشتر',
        title: 'تعامل بیشتر',
        text: 'اشاره مستقیم، بحث‌برانگیز است و تعامل مخاطبان را افزایش می‌دهد.'
      },
      {
        id: 4,
        img: '/heart.png',
        alt: 'ارتباط احساسی',
        title: 'ارتباط احساسی',
        text: 'حضور در موقعیت طنز، حس مثبت و صمیمیت برند را تقویت می‌کند.'
      }
    ]
  }),
  actions: {
    setMode(val: 'direct' | 'indirect') {
      this.mode = val;
    },
    swapCards(fromIdx: number, toIdx: number) {
      if (fromIdx === toIdx) return;
      const temp = this.cards[fromIdx];
      if (!temp) return;
      this.cards.splice(fromIdx, 1);
      this.cards.splice(toIdx, 0, temp);
    }
  }
});
