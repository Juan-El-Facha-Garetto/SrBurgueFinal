    <template>
  <div>
    <h2>Menú Gaseosas</h2>
    <select v-model="selectedType">
        <option value="todas">Todas</option>
        <option value="Con Gas">Con Gas</option>
        <option value="Sin Gas">Sin Gas</option>
        <option value="Con Alcohol">Con Alcohol</option>
    </select>
</div>

<div>
    <ul>
      <li v-for="(gaseosa, index) in filtroGaseosas" :key="gaseosa.ID">
        <h3>{{ gaseosa.Nombre }}</h3>
        <img
          v-if="gaseosa.Foto"
          :src="`http://localhost:3000/uploads/${gaseosa.Foto}`"
          :alt="gaseosa.Nombre"
          width="150"
        />
        <p>{{ gaseosa.Descripcion }}</p>
        <p>Precio: ${{ gaseosa.Precio }}</p>
        <div>
          <button @click="decrease(index)">-</button>
          <span>{{ quantities[index] }}</span>
          <button @click="increase(index)">+</button>
        </div>
        <button @click="addToCart(gaseosa, index)">Agregar al carrito</button>
      </li>
    </ul>
</div>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue'
import axios from 'axios'

const gaseosas = ref([])
const quantities = ref([])
const selectedType = ref('todas')

const emit = defineEmits(['add-to-cart'])

const increase = (index) => {
  quantities.value[index]++
}
const decrease = (index) => {
  if (quantities.value[index] > 1) {
    quantities.value[index]--
  }
}

const addToCart = (gaseosa, index) => {
  const quantity = quantities.value[index]
  if (quantity < 1) return
  emit('add-to-cart', { ...gaseosa, quantity })
}

// Filtrar gaseosas por tipo
const filtroGaseosas = computed(() => {
  if (selectedType.value === 'todas') {
    return gaseosas.value
  }
  return gaseosas.value.filter(
    gaseosa => gaseosa.CategoriaDetalle === selectedType.value
  )
})

// Cargar productos desde el backend al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos')
    // Solo gaseosas: filtra por CategoriaSeccion
    gaseosas.value = response.data.filter(
      p => p.CategoriaSeccion && p.CategoriaSeccion === 'Bebida'
    )
    quantities.value = gaseosas.value.map(() => 1)
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
})
</script>

<style scoped>
select {
  padding: 10px 16px;
  border: 2px solid #FFD600;
  border-radius: 8px;
  background-color: #fffbe6;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  outline: none;
  margin-bottom: 20px;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  max-width: 98vw;
}

select:focus {
  border-color: #FFEA70;
  box-shadow: 0 0 0 2px #FFD60044;
}

option {
  font-size: 16px;
  color: #333;
  background: #fffbe6;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

li {
  background: #fffbe6;
  border: 2px solid #FFD600;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.07);
  padding: 24px 18px 18px 18px;
  width: 270px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.15s, box-shadow 0.15s;
}

li:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border-color: #FFEA70;
}

h3 {
  margin: 10px 0 8px 0;
  font-size: 1.3em;
  color: #B8860B;
  text-align: center;
}

img {
  border-radius: 10px;
  margin-bottom: 10px;
  display: block;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 180px;
  height: auto;
}

p {
  margin: 4px 0;
  color: #444;
  font-size: 1em;
  text-align: center;
}

div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  gap: 10px;
}

button {
  margin: 0 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #FFD600;
  border: 2px solid #B8860B;
  border-radius: 6px;
  font-weight: bold;
  color: #333;
  transition: background 0.2s, border 0.2s;
}

button:hover {
  background-color: #FFEA70;
  border-color: #FFD600;
}

/* Responsive para móviles */
@media (max-width: 600px) {
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 0 10px;
    width: 100vw;
    box-sizing: border-box;
  }
  li {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    padding: 16px 0;
    box-sizing: border-box;
  }
  img {
    width: 80vw;
    max-width: 200px;
    height: auto;
    display: block;
    margin: 0 auto 10px auto;
  }
  select {
    width: 90vw;
    max-width: 320px;
  }
}
</style>

 