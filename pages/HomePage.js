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
      <div class="q-pa-xl text-center bg-green-1">
        <div class="text-h2 text-weight-bold text-green-9 q-mb-md">
          Growing Tomorrow's Harvest Today
        </div>
        <div class="text-h5 text-green-7 q-mb-xl">
          Sustainable Agriculture Solutions for Modern Farming
        </div>
        <q-btn size="lg" color="green-7" label="Get Started" class="q-mr-md" @click="goContact" />
        <q-btn size="lg" outline color="green-7" label="Learn More" @click="goAbout" />
      </div>

      <div class="q-pa-xl">
        <div class="row items-center q-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="text-h4 text-weight-bold q-mb-lg">Welcome to GreenHarvest</div>
            <div class="text-body1 text-grey-7 q-mb-md">
              Your trusted partner in sustainable agriculture. We provide innovative solutions
              that help farmers increase productivity while preserving our environment for future generations.
            </div>
            <div class="text-body1 text-grey-7 q-mb-lg">
              From advanced crop management to precision irrigation, our comprehensive services
              are designed to meet the evolving needs of modern agriculture.
            </div>
            <div class="q-gutter-md">
              <q-btn color="green-7" label="Our Services" @click="goServices" />
              <q-btn outline color="green-7" label="View Products" @click="goProducts" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <q-img src="https://via.placeholder.com/600x400/2E7D32/FFFFFF?text=Modern+Agriculture" />
          </div>
        </div>
      </div>

      <div class="q-pa-xl bg-green-7 text-white text-center">
        <div class="text-h4 text-weight-bold q-mb-lg">Why Choose GreenHarvest</div>
        <div class="row q-gutter-lg justify-center">
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="eco" size="3rem" class="q-mb-md" />
            <div class="text-h6">Sustainable Practices</div>
            <div class="text-body2">Environmentally friendly farming solutions</div>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="trending_up" size="3rem" class="q-mb-md" />
            <div class="text-h6">Increased Yield</div>
            <div class="text-body2">Maximize your harvest potential</div>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="support_agent" size="3rem" class="q-mb-md" />
            <div class="text-h6">Expert Support</div>
            <div class="text-body2">24/7 agricultural consultation</div>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-icon name="local_shipping" size="3rem" class="q-mb-md" />
            <div class="text-h6">Fast Delivery</div>
            <div class="text-body2">Quick supply chain solutions</div>
          </div>
        </div>
      </div>

      <div class="q-pa-xl text-center bg-grey-1">
        <div class="text-h4 text-weight-bold q-mb-lg">Ready to Transform Your Farm?</div>
        <div class="text-h6 text-grey-7 q-mb-xl">
          Join hundreds of satisfied farmers who have already made the switch
        </div>
        <q-btn size="lg" color="green-7" label="Contact Us Today" @click="goContact" />
      </div>
    </q-page>
  `
}
