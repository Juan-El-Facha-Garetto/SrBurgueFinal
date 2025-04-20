    <template>
    <div>
        <h2>Menú Gaseosas</h2>

        <select v-model="selectedType">
            <option value="todas">Todas</option>
            <option value="Con-Gas">Con Gas</option>
            <option value="Sin-Gas">Sin Gaseosa</option>
        </select>

        <ul>
            <li v-for="(gaseosa, index) in filtroGaseosas" :key="gaseosa.id">
                <h3>{{ gaseosa.name }}</h3>
                <img :src="`/img/${gaseosa.image}`" :alt="gaseosa.name" width="150" />
                <p>{{ gaseosa.description }}</p>
                <p>Precio: ${{ gaseosa.price }}</p>

                    <div>
                        <button @click="decrease(index)">-</button>
                        <span>{{ quantities[index] }}</span>
                        <button @click="increase(index)">+</button>
                    </div>

                    <button @click="addToCart(gaseosa,index)">Agregar al carrito</button>
            </li>
        </ul>
    </div>


    </template>

    <script setup>
    import {ref,defineEmits, computed} from 'vue'

    const gaseosas = ref([
        { id: 3, name: 'Coca-Cola', description: 'Gaseosa de cola', price: 200, image: 'gaseosa1.jpg', type:'Con-Gas' },
        { id: 1, name: 'Agua', description: 'Agua mineral', price: 150, image: 'gaseosa1.jpg', type:'Sin-Gas' },
        { id: 2, name: 'Pepsi', description: 'Gaseosa de cola', price: 200, image: 'gaseosa1.jpg', type:'Con-Gas' },
        { id: 4, name: 'Sprite', description: 'Gaseosa de limón', price: 200, image: 'gaseosa1.jpg', type:'Con-Gas' },
        { id: 5, name: 'Fanta', description: 'Gaseosa de naranja', price: 200, image: 'gaseosa1.jpg', type:'Con-Gas' },
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
    const addToCart = (gaseosa,index) => {
    const quantity = quantities.value[index] // Obtener la cantidad del índice
    if (quantity < 1) return  // No permitir agregar cantidades no válidas
    emit('add-to-cart', { ...gaseosa, quantity }) // Enviar el producto con la cantidad
    }


    const selectedType = ref('todas')
    const filtroGaseosas = computed(() => {
        if (selectedType.value === 'todas') {
            return gaseosas.value
        } else {
            return gaseosas.value.filter(gaseosa => gaseosa.type === selectedType.value)
        }
    })


    </script>

    <style scoped></style>