    <template>

    <div>
        <h2>Menú Gaseosas</h2>
        <ul>
            <li v-for="(gaseosa, index) in gaseosas" :key="gaseosa.id">
                <h3>{{ gaseosa.name }}</h3>
                <img :src="`/img/${gaseosa.image}`" :alt="gaseosa.name" width="150" />
                <p>{{ gaseosa.description }}</p>
                <p>Precio: ${{ gaseosa.price }}</p>

                    <div>
                        <button @click="decrease(index)">-</button>
                        <span>{{ quantities[index] }}</span>
                        <button @click="increase(index)">+</button>
                    </div>

                    <button @click="addToCart(gaseosa, quantities[index])">Agregar al carrito</button>
            </li>
        </ul>
    </div>


    </template>

    <script setup>
    import {ref,defineEmits} from 'vue'

    const gaseosas = ref([
        { id: 4, name: 'Coca-Cola', description: 'Gaseosa de cola', price: 200, image: 'gaseosa1.jpg' },
        { id: 5, name: 'Sprite', description: 'Gaseosa de limón', price: 200, image: 'gaseosa1.jpg' },
        { id: 6, name: 'Fanta', description: 'Gaseosa de naranja', price: 200, image: 'gaseosa1.jpg' },
    ])

    // Para controlar la cantidad por índice
    const quantities = ref(gaseosas.value.map(() => 1))

    const increase = (index) =>{
        quantities.value[index]++
    }
    const decrease = (index) => {
        if (quantities.value[index] > 1) {
            quantities.value[index]--
        }
    }

    const emit = defineEmits(['add-to-cart'])

    // Emitir al carrito con el producto y su cantidad
    const addToCart = (gaseosa, quantity) => {
    if (quantity < 1) return  // No permitir agregar cantidades no válidas
    emit('add-to-cart', { ...gaseosa, quantity }) // Enviar el producto con la cantidad
    }
    </script>

    <style scoped></style>