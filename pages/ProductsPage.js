export const ProductsPage = {
  setup () {
    const { ref, computed } = window.Vue

    const selectedCategory = ref('all')

    const categories = ref([
      { value: 'all', label: 'All Products' },
      { value: 'seeds', label: 'Seeds & Planting' },
      { value: 'fertilizers', label: 'Fertilizers' },
      { value: 'equipment', label: 'Equipment' },
      { value: 'irrigation', label: 'Irrigation' }
    ])

    const products = ref([
      {
        name: 'Premium Wheat Seeds',
        price: '$45/kg',
        category: 'seeds',
        description: 'High-yield wheat varieties resistant to common diseases',
        image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Wheat+Seeds',
        features: ['Disease resistant', 'High yield', 'Climate adaptive', 'Certified organic']
      },
      {
        name: 'Organic Corn Seeds',
        price: '$55/kg',
        category: 'seeds',
        description: 'Non-GMO corn seeds for sustainable farming',
        image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Corn+Seeds',
        features: ['Non-GMO', 'High protein', 'Drought tolerant', 'Organic certified']
      },
      {
        name: 'NPK Fertilizer 20-20-20',
        price: '$35/bag',
        category: 'fertilizers',
        description: 'Balanced NPK fertilizer for all crops',
        image: 'https://via.placeholder.com/300x200/8D6E63/FFFFFF?text=NPK+Fertilizer',
        features: ['Balanced formula', 'Slow release', 'Water soluble', 'pH neutral']
      },
      {
        name: 'Organic Compost',
        price: '$25/bag',
        category: 'fertilizers',
        description: 'Premium organic compost for soil enrichment',
        image: 'https://via.placeholder.com/300x200/8D6E63/FFFFFF?text=Organic+Compost',
        features: ['100% organic', 'Nutrient rich', 'Improves soil structure', 'Microbe enhanced']
      },
      {
        name: 'Mini Tractor Package',
        price: '$12,999',
        category: 'equipment',
        description: 'Compact tractor perfect for small to medium farms',
        image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Mini+Tractor',
        features: ['25 HP engine', '4WD option', 'Hydraulic lift', '2-year warranty']
      },
      {
        name: 'Precision Seeder',
        price: '$3,499',
        category: 'equipment',
        description: 'Computerized seed drill for precise planting',
        image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Precision+Seeder',
        features: ['GPS enabled', 'Variable rate', 'Row monitoring', 'Data logging']
      },
      {
        name: 'Drip Irrigation Kit',
        price: '$299/set',
        category: 'irrigation',
        description: 'Complete drip irrigation system for water conservation',
        image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Drip+Irrigation',
        features: ['Water efficient', 'Easy installation', 'UV resistant', '5-year warranty']
      },
      {
        name: 'Smart Sprinkler System',
        price: '$899/set',
        category: 'irrigation',
        description: 'Automated sprinkler system with weather integration',
        image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Smart+Sprinkler',
        features: ['Weather adaptive', 'Mobile control', 'Zone management', 'Rain sensor']
      }
    ])

    const filteredProducts = computed(() => {
      if (selectedCategory.value === 'all') return products.value
      return products.value.filter(p => p.category === selectedCategory.value)
    })

    const router = window.VueRouter.useRouter()

    return {
      selectedCategory,
      categories,
      filteredProducts,
      goContact: () => router.push('/contact')
    }
  },
  template: `
    <q-page>
      <div class="q-pa-xl text-center bg-green-1">
        <div class="text-h2 text-weight-bold text-green-9 q-mb-md">
          Our Agricultural Products
        </div>
        <div class="text-h5 text-green-7 q-mb-xl">
          Quality products for successful farming
        </div>
      </div>

      <div class="q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <q-select
              filled
              v-model="selectedCategory"
              :options="categories"
              label="Filter by Category"
              emit-value
              map-options
              class="q-mb-lg"
            />
          </div>
        </div>
      </div>

      <div class="q-pa-xl">
        <div class="row q-gutter-lg justify-center">
          <div v-for="product in filteredProducts" :key="product.name" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card flat bordered>
              <q-img :src="product.image" height="200px">
                <div class="absolute-bottom text-subtitle2 text-center bg-black bg-opacity-50">
                  {{ product.name }}
                </div>
              </q-img>
              <q-card-section>
                <div class="text-h6 text-green-7 q-mb-sm">{{ product.price }}</div>
                <div class="text-body2 text-grey-7 q-mb-md">{{ product.description }}</div>
                <div class="text-caption text-grey-6">
                  <q-icon name="star" color="amber" />
                  4.8 (124 reviews)
                </div>
              </q-card-section>
              <q-expansion-item icon="list" label="Features" dense>
                <q-card>
                  <q-card-section>
                    <q-list dense>
                      <q-item v-for="feature in product.features" :key="feature" class="q-pa-none">
                        <q-item-section avatar>
                          <q-icon name="check" color="green-7" size="1rem" />
                        </q-item-section>
                        <q-item-section>
                          <div class="text-body2">{{ feature }}</div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="Details" />
                <q-btn color="green-7" label="Add to Cart" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-pa-xl bg-orange-1">
        <div class="text-h4 text-weight-bold text-center q-mb-lg">Special Offers</div>
        <div class="row q-gutter-lg justify-center">
          <div class="col-12 col-md-6">
            <q-card flat bordered class="bg-orange-2">
              <q-card-section>
                <div class="text-h6 text-orange-8 q-mb-sm">
                  <q-icon name="local_offer" /> Bundle Deal
                </div>
                <div class="text-body1 q-mb-md">
                  Get 20% off when you purchase any 3 products from the same category
                </div>
                <q-btn color="orange-8" label="Shop Bundles" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card flat bordered class="bg-orange-2">
              <q-card-section>
                <div class="text-h6 text-orange-8 q-mb-sm">
                  <q-icon name="card_membership" /> Loyalty Program
                </div>
                <div class="text-body1 q-mb-md">
                  Join our loyalty program and earn points with every purchase
                </div>
                <q-btn color="orange-8" label="Join Now" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-pa-xl text-center bg-green-7 text-white">
        <div class="text-h4 text-weight-bold q-mb-lg">Need Help Choosing?</div>
        <div class="text-h6 q-mb-xl">Our agricultural experts are here to help you select the right products</div>
        <q-btn size="lg" color="white" text-color="green-7" label="Get Expert Advice" @click="goContact" />
      </div>
    </q-page>
  `
}
