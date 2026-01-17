export const AboutPage = {
  setup () {
    const { ref } = window.Vue

    const teamMembers = ref([
      {
        name: 'John Anderson',
        position: 'CEO & Founder',
        bio: '25+ years in agricultural innovation and sustainable farming practices',
        image: 'https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=JA'
      },
      {
        name: 'Dr. Sarah Chen',
        position: 'Chief Agronomist',
        bio: 'PhD in Crop Science, specializing in sustainable agriculture',
        image: 'https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=SC'
      },
      {
        name: 'Michael Rodriguez',
        position: 'Operations Director',
        bio: 'Expert in farm management and agricultural technology',
        image: 'https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=MR'
      },
      {
        name: 'Emily Watson',
        position: 'Customer Relations Manager',
        bio: 'Dedicated to ensuring farmer success and satisfaction',
        image: 'https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=EW'
      }
    ])

    const milestones = ref([
      {
        year: '1999',
        title: 'Company Founded',
        description: 'Started as a small consulting firm helping local farmers'
      },
      {
        year: '2005',
        title: 'First Product Launch',
        description: 'Introduced our signature organic fertilizer line'
      },
      {
        year: '2012',
        title: 'Expansion',
        description: 'Opened distribution centers in 3 major agricultural regions'
      },
      {
        year: '2018',
        title: 'Technology Integration',
        description: 'Launched smart farming solutions and precision agriculture tools'
      },
      {
        year: '2024',
        title: 'Sustainability Leader',
        description: 'Recognized as industry leader in sustainable agriculture'
      }
    ])

    const router = window.VueRouter.useRouter()

    return {
      teamMembers,
      milestones,
      goContact: () => router.push('/contact'),
      goServices: () => router.push('/services')
    }
  },
  template: `
    <q-page>
      <div class="q-pa-xl text-center bg-green-1">
        <div class="text-h2 text-weight-bold text-green-9 q-mb-md">About GreenHarvest Agriculture</div>
        <div class="text-h5 text-green-7 q-mb-xl">Growing sustainable agriculture for over 25 years</div>
      </div>

      <div class="q-pa-xl">
        <div class="row items-center q-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="text-h4 text-weight-bold q-mb-lg">Our Story</div>
            <div class="text-body1 text-grey-7 q-mb-md">
              Founded in 1999, GreenHarvest Agriculture began as a small consulting firm
              dedicated to helping local farmers adopt sustainable practices.
            </div>
            <div class="text-body1 text-grey-7 q-mb-lg">
              Our mission has always been clear: to bridge the gap between traditional
              farming wisdom and modern agricultural technology.
            </div>
            <div class="text-body1 text-grey-7 q-mb-lg">
              Today, we're proud to offer comprehensive services and products that help
              thousands of farmers achieve their goals while contributing to a more
              sustainable future for agriculture.
            </div>
          </div>
          <div class="col-12 col-md-6">
            <q-img src="https://via.placeholder.com/600x400/2E7D32/FFFFFF?text=Our+Farm+History" />
          </div>
        </div>
      </div>

      <div class="q-pa-xl bg-grey-1">
        <div class="text-h4 text-weight-bold text-center q-mb-lg">Our Mission & Values</div>
        <div class="row q-gutter-lg justify-center">
          <div class="col-12 col-md-4">
            <q-card flat bordered class="q-pa-lg text-center">
              <q-avatar size="3rem" color="green-7" text-color="white" class="q-mb-md">
                <q-icon name="eco" size="2rem" />
              </q-avatar>
              <div class="text-h6 q-mb-sm">Sustainability</div>
              <div class="text-body2 text-grey-7">Promoting environmentally friendly farming practices that preserve our planet</div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card flat bordered class="q-pa-lg text-center">
              <q-avatar size="3rem" color="green-7" text-color="white" class="q-mb-md">
                <q-icon name="trending_up" size="2rem" />
              </q-avatar>
              <div class="text-h6 q-mb-sm">Innovation</div>
              <div class="text-body2 text-grey-7">Continuously developing new solutions to meet evolving agricultural challenges</div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card flat bordered class="q-pa-lg text-center">
              <q-avatar size="3rem" color="green-7" text-color="white" class="q-mb-md">
                <q-icon name="people" size="2rem" />
              </q-avatar>
              <div class="text-h6 q-mb-sm">Community</div>
              <div class="text-body2 text-grey-7">Building strong relationships with farmers and agricultural communities</div>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-pa-xl">
        <div class="text-h4 text-weight-bold text-center q-mb-lg">Our Journey</div>
        <div class="row q-gutter-md">
          <div v-for="milestone in milestones" :key="milestone.year" class="col-12 col-md-4">
            <q-card flat bordered class="q-pa-md">
              <div class="text-h5 text-green-7 q-mb-sm">{{ milestone.year }}</div>
              <div class="text-h6 q-mb-sm">{{ milestone.title }}</div>
              <div class="text-body2 text-grey-7">{{ milestone.description }}</div>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-pa-xl bg-green-1">
        <div class="text-h4 text-weight-bold text-center q-mb-lg">Meet Our Team</div>
        <div class="row q-gutter-lg justify-center">
          <div v-for="member in teamMembers" :key="member.name" class="col-12 col-sm-6 col-md-3">
            <q-card flat bordered class="text-center">
              <q-card-section>
                <q-avatar size="5rem" class="q-mb-md">
                  <img :src="member.image" />
                </q-avatar>
                <div class="text-h6 q-mb-sm">{{ member.name }}</div>
                <div class="text-subtitle2 text-green-7 q-mb-md">{{ member.position }}</div>
                <div class="text-body2 text-grey-7">{{ member.bio }}</div>
              </q-card-section>
              <q-card-actions justify="center">
                <q-btn flat round color="primary" icon="email" />
                <q-btn flat round color="primary" icon="phone" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-pa-xl bg-green-7 text-white text-center">
        <div class="text-h4 text-weight-bold q-mb-lg">By the Numbers</div>
        <div class="row q-gutter-lg justify-center">
          <div class="col-12 col-sm-6 col-md-3">
            <div class="text-h4 text-weight-bold">500+</div>
            <div class="text-h6">Happy Farmers</div>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="text-h4 text-weight-bold">10,000+</div>
            <div class="text-h6">Acres Served</div>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="text-h4 text-weight-bold">25+</div>
            <div class="text-h6">Years Experience</div>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="text-h4 text-weight-bold">98%</div>
            <div class="text-h6">Customer Satisfaction</div>
          </div>
        </div>
      </div>

      <div class="q-pa-xl text-center">
        <div class="text-h4 text-weight-bold q-mb-lg">Join Our Growing Family</div>
        <div class="text-h6 text-grey-7 q-mb-xl">Discover how GreenHarvest can help transform your farming operation</div>
        <div class="q-gutter-md justify-center">
          <q-btn size="lg" color="green-7" label="Contact Us" @click="goContact" />
          <q-btn size="lg" outline color="green-7" label="Our Services" @click="goServices" />
        </div>
      </div>
    </q-page>
  `
}
