document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Blackberry Bramble', img: 'BlackberryBramble.jpg', price: 5000 },
      { id: 2, name: 'Blue Lagoon Mocktail', img: 'BlueLagoonMocktail.jpg', price: 5000 },
      { id: 3, name: 'Boba Milk Tea', img: 'BobaMilkTea.jpg', price: 10000 },
      { id: 4, name: 'Frozen Orange', img: 'FrozenOrange.jpg', price: 5000 },
      { id: 5, name: 'Mango Pineapple', img: 'MangoPineapple.jpg', price: 5000 },
      { id: 6, name: 'Gyoza', img: 'Gyoza.jpg', price: 10000 },
      { id: 7, name: 'Katsu Curry', img: 'KatsuCurry.jpg', price: 15000 },
      { id: 8, name: 'Ramen Ayam', img: 'RamenAyam.jpg', price: 15000 },
      { id: 9, name: 'Ramen Chicken Chashu', img: 'RamenChickenChashu.jpg', price: 15000 },
      { id: 10, name: 'Sukiyaki', img: 'Sukiyaki.jpg', price: 15000 },
      { id: 11, name: 'Takoyaki', img: 'Takoyaki.jpg', price: 10000 },
      { id: 12, name: 'Yakiniku Tofu', img: 'YakinikuTofu.jpg', price: 15000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id == id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
