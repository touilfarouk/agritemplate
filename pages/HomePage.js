export const HomePage = {
  setup () {
    const router = window.VueRouter.useRouter()

    return {
      goContact: () => router.push('/contact'),
      goAbout: () => router.push('/about'),
      goServices: () => router.push('/services'),
      goProducts: () => router.push('/products')
    }
  },
  template: `
    <q-page>
      <div class="q-pa-lg q-pa-md-xl text-center bg-green-1">
        <div class="text-h4 text-h2-sm text-h1-md text-weight-bold text-green-9 q-mb-sm q-mb-md-md">
          Growing Tomorrow's Harvest Today
        </div>
        <div class="text-subtitle1 text-h5-sm text-h4-md text-green-7 q-mb-lg q-mb-xl-md">
          Sustainable Agriculture Solutions for Modern Farming
        </div>
        <div class="q-gutter-md q-gutter-y-sm">
          <q-btn size="lg" color="green-7" label="Get Started" class="full-width-sm" @click="goContact" />
          <q-btn size="lg" outline color="green-7" label="Learn More" class="full-width-sm" @click="goAbout" />
        </div>
      </div>

      <div class="q-pa-md q-pa-xl-lg">
        <div class="row items-center q-col-gutter-y-lg q-col-gutter-x-xl">
          <div class="col-12 col-md-6 order-1 order-md-0">
            <div class="text-h4 text-h3-md text-h2-lg text-weight-bold q-mb-lg">Welcome to GreenHarvest</div>
            <div class="text-body1 text-grey-7 q-mb-md">
              Your trusted partner in sustainable agriculture. We provide innovative solutions
              that help farmers increase productivity while preserving our environment for future generations.
            </div>
            <div class="text-body1 text-grey-7 q-mb-lg">
              From advanced crop management to precision irrigation, our comprehensive services
              are designed to meet the evolving needs of modern agriculture.
            </div>
            <div class="q-gutter-md q-gutter-y-sm">
              <q-btn color="green-7" label="Our Services" size="md" class="full-width-sm" @click="goServices" />
              <q-btn outline color="green-7" label="View Products" size="md" class="full-width-sm" @click="goProducts" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <q-img 
              src="https://via.placeholder.com/600x400/2E7D32/FFFFFF?text=Modern+Agriculture"
              class="rounded-borders shadow-4"
              :ratio="16/9"
            />
          </div>
        </div>
      </div>

      <div class="q-pa-md q-pa-xl-lg bg-green-7 text-white text-center">
        <div class="text-h4 text-h3-md text-weight-bold q-mb-lg">Why Choose GreenHarvest</div>
        <div class="row q-col-gutter-y-xl q-col-gutter-x-lg justify-center">
          <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <q-icon name="eco" size="2.5rem" size-md="3rem" class="q-mb-sm q-mb-md-md" />
            <div class="text-h6">Sustainable Practices</div>
            <div class="text-body2 q-px-md q-px-sm-none">Environmentally friendly farming solutions</div>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <q-icon name="trending_up" size="2.5rem" size-md="3rem" class="q-mb-sm q-mb-md-md" />
            <div class="text-h6">Increased Yield</div>
            <div class="text-body2 q-px-md q-px-sm-none">Maximize your harvest potential</div>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <q-icon name="support_agent" size="2.5rem" size-md="3rem" class="q-mb-sm q-mb-md-md" />
            <div class="text-h6">Expert Support</div>
            <div class="text-body2 q-px-md q-px-sm-none">24/7 agricultural consultation</div>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <q-icon name="local_shipping" size="2.5rem" size-md="3rem" class="q-mb-sm q-mb-md-md" />
            <div class="text-h6">Fast Delivery</div>
            <div class="text-body2 q-px-md q-px-sm-none">Quick supply chain solutions</div>
          </div>
        </div>
      </div>

      <div class="q-pa-lg q-pa-xl-xl text-center bg-grey-1">
        <div class="text-h4 text-h3-md text-weight-bold q-mb-md q-mb-lg-lg">Ready to Transform Your Farm?</div>
        <div class="text-h6 text-grey-7 q-mb-lg q-mb-xl-lg">
          Join hundreds of satisfied farmers who have already made the switch
        </div>
        <q-btn 
          size="lg" 
          color="green-7" 
          label="Contact Us Today" 
          class="full-width-sm"
          @click="goContact" 
        />
      </div>
    </q-page>
  `
}
