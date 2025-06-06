import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(producto, cantidad = 1) {
      const index = this.items.findIndex(item => item.id === producto.ID)
      if (index !== -1) {
        this.items[index].quantity += cantidad
      } else {
        this.items.push({
          id: producto.ID,
          name: producto.Nombre,
          price: producto.Precio,
          quantity: cantidad,
          image: producto.Foto
        })
      }
    }
  }
})