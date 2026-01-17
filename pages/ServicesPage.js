export const ServicesPage = {
  setup () {
    const { ref } = window.Vue

    const services = ref([
      {
        title: 'Crop Management',
        description: 'Advanced crop monitoring and management solutions for optimal yield',
        icon: 'eco',
        color: 'green',
        features: ['Real-time monitoring', 'Yield optimization', 'Pest detection', 'Growth tracking']
      },
      {
        title: 'Irrigation Systems',
        description: 'Smart irrigation technology to conserve water and maximize efficiency',
        icon: 'water_drop',
        color: 'blue',
        features: ['Automated scheduling', 'Water conservation', 'Soil moisture sensing', 'Weather integration']
      },
      {
        title: 'Soil Analysis',
        description: 'Comprehensive soil testing and nutrient management programs',
        icon: 'science',
        color: 'brown',
        features: ['pH testing', 'Nutrient analysis', 'Organic matter assessment', 'Fertilizer recommendations']
      },
      {
        title: 'Equipment Sales',
        description: 'Quality agricultural machinery and equipment for modern farming',
        icon: 'agriculture',
        color: 'orange',
        features: ['Tractors & implements', 'Harvesting equipment', 'Planting machinery', 'Maintenance services']
      },
      {
        title: 'Consulting Services',
        description: 'Expert agricultural consulting for farm optimization',
        icon: 'psychology',
        color: 'purple',
        features: ['Farm planning', 'Crop selection', 'Business strategy', 'Sustainability consulting']
      },
      {
        title: 'Training Programs',
        description: 'Educational programs for modern farming techniques',
        icon: 'school',
        color: 'indigo',
        features: ['Workshops', 'Online courses', 'Field training', 'Certification programs']
      }
    ])

    const router = window.VueRouter.useRouter()

    return {
      services,
      goContact: () => router.push('/contact')
    }
  },
  template: `
    <q-page>
      <div class="q-pa-xl text-center bg-green-1">
        <div class="text-h2 text-weight-bold text-green-9 q-mb-md">
          Our Agricultural Services
        </div>
        <div class="text-h5 text-green-7 q-mb-xl">
          Comprehensive solutions for modern farming challenges
        </div>
      </div>

      <div class="q-pa-xl">
        <div class="row q-gutter-lg justify-center">
          <div v-for="service in services" :key="service.title" class="col-12 col-md-6 col-lg-4">
            <q-card class="q-pa-lg" flat bordered>
              <q-card-section class="text-center">
                <q-avatar size="4rem" :color="service.color" text-color="white" class="q-mb-md">
                  <q-icon :name="service.icon" size="2.5rem" />
                </q-avatar>
                <div class="text-h5 q-mb-md">{{ service.title }}</div>
                <div class="text-body1 text-grey-7 q-mb-lg">{{ service.description }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <div class="text-subtitle2 q-mb-sm">Key Features:</div>
                <q-list dense>
                  <q-item v-for="feature in service.features" :key="feature" class="q-pa-none">
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="green-7" size="1rem" />
                    </q-item-section>
                    <q-item-section>
                      <div class="text-body2">{{ feature }}</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn color="green-7" label="Learn More" />
                <q-btn outline color="green-7" label="Get Quote" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-pa-xl bg-grey-1">
        <div class="text-h4 text-weight-bold text-center q-mb-lg">How We Work</div>
        <div class="row q-gutter-lg justify-center">
          <div class="col-12 col-md-3 text-center">
            <q-avatar size="3rem" color="green-7" text-color="white" class="q-mb-md">
              <q-icon name="search" />
            </q-avatar>
            <div class="text-h6 q-mb-sm">1. Assessment</div>
            <div class="text-body2 text-grey-7">We analyze your farm's current situation and identify opportunities</div>
          </div>
          <div class="col-12 col-md-3 text-center">
            <q-avatar size="3rem" color="green-7" text-color="white" class="q-mb-md">
              <q-icon name="design_services" />
            </q-avatar>
            <div class="text-h6 q-mb-sm">2. Planning</div>
            <div class="text-body2 text-grey-7">Custom solutions are designed to meet your specific needs</div>
          </div>
          <div class="col-12 col-md-3 text-center">
            <q-avatar size="3rem" color="green-7" text-color="white" class="q-mb-md">
              <q-icon name="construction" />
            </q-avatar>
            <div class="text-h6 q-mb-sm">3. Implementation</div>
            <div class="text-body2 text-grey-7">Our team implements the solutions with minimal disruption</div>
          </div>
          <div class="col-12 col-md-3 text-center">
            <q-avatar size="3rem" color="green-7" text-color="white" class="q-mb-md">
              <q-icon name="trending_up" />
            </q-avatar>
            <div class="text-h6 q-mb-sm">4. Support</div>
            <div class="text-body2 text-grey-7">Ongoing support ensures continued success and improvement</div>
          </div>
        </div>
      </div>

      <div class="q-pa-xl text-center bg-green-7 text-white">
        <div class="text-h4 text-weight-bold q-mb-lg">Ready to Get Started?</div>
        <div class="text-h6 q-mb-xl">Contact us today for a free consultation and farm assessment</div>
        <q-btn size="lg" color="white" text-color="green-7" label="Free Consultation" @click="goContact" />
      </div>
    </q-page>
  `
}
