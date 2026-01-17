export const ContactPage = {
  setup () {
    const { ref } = window.Vue

    const contactForm = ref({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    })

    const services = ref([
      'Crop Management',
      'Irrigation Systems',
      'Soil Analysis',
      'Equipment Sales',
      'Consulting Services',
      'Training Programs',
      'General Inquiry'
    ])

    const submitContact = () => {
      console.log('Contact form submitted:', contactForm.value)
      alert('Thank you for contacting us! We will get back to you within 24 hours.')
      contactForm.value = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      }
    }

    return {
      contactForm,
      services,
      submitContact
    }
  },
  template: `
    <q-page>
      <div class="q-pa-xl text-center bg-green-1">
        <div class="text-h2 text-weight-bold text-green-9 q-mb-md">Get In Touch</div>
        <div class="text-h5 text-green-7 q-mb-xl">We're here to help you grow your agricultural success</div>
      </div>

      <div class="q-pa-xl">
        <div class="row q-gutter-xl justify-center">
          <div class="col-12 col-md-6">
            <q-card flat bordered class="q-pa-lg">
              <div class="text-h5 text-weight-bold q-mb-lg">Send Us a Message</div>
              <q-form @submit="submitContact" class="q-gutter-md">
                <q-input
                  filled
                  v-model="contactForm.name"
                  label="Your Name *"
                  hint="Enter your full name"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Please enter your name']"
                />
                <q-input
                  filled
                  v-model="contactForm.email"
                  label="Email *"
                  type="email"
                  hint="Enter your email address"
                  lazy-rules
                  :rules="[
                    val => val && val.length > 0 || 'Please enter your email',
                    val => val && val.includes('@') || 'Please enter a valid email'
                  ]"
                />
                <q-input
                  filled
                  v-model="contactForm.phone"
                  label="Phone Number"
                  hint="Enter your phone number"
                />
                <q-select
                  filled
                  v-model="contactForm.service"
                  :options="services"
                  label="Service Interest"
                  hint="Select the service you're interested in"
                />
                <q-input
                  filled
                  v-model="contactForm.message"
                  type="textarea"
                  label="Message *"
                  hint="Tell us how we can help you"
                  rows="4"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Please enter your message']"
                />
                <div class="text-center">
                  <q-btn type="submit" color="green-7" size="lg" label="Send Message" />
                </div>
              </q-form>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <div class="q-pa-lg">
              <div class="text-h5 text-weight-bold q-mb-lg">Contact Information</div>

              <q-card flat bordered class="q-pa-md q-mb-md">
                <div class="q-gutter-md">
                  <div class="flex items-center q-gutter-sm">
                    <q-icon name="location_on" color="green-7" size="1.5rem" />
                    <div>
                      <div class="text-weight-medium">Main Office</div>
                      <div class="text-grey-7">123 Farm Road, Agricultural District, AG 12345</div>
                    </div>
                  </div>
                  <div class="flex items-center q-gutter-sm">
                    <q-icon name="phone" color="green-7" size="1.5rem" />
                    <div>
                      <div class="text-weight-medium">Phone</div>
                      <div class="text-grey-7">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div class="flex items-center q-gutter-sm">
                    <q-icon name="email" color="green-7" size="1.5rem" />
                    <div>
                      <div class="text-weight-medium">Email</div>
                      <div class="text-grey-7">info@greenharvest.agriculture</div>
                    </div>
                  </div>
                  <div class="flex items-center q-gutter-sm">
                    <q-icon name="schedule" color="green-7" size="1.5rem" />
                    <div>
                      <div class="text-weight-medium">Business Hours</div>
                      <div class="text-grey-7">Mon-Fri: 8:00 AM - 6:00 PM</div>
                      <div class="text-grey-7">Saturday: 9:00 AM - 2:00 PM</div>
                      <div class="text-grey-7">Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </q-card>

              <div class="text-h6 q-mb-md">Follow Us</div>
              <div class="q-gutter-sm">
                <q-btn round color="green-7" icon="share" />
                <q-btn round color="green-7" icon="chat" />
                <q-btn round color="green-7" icon="photo_camera" />
                <q-btn round color="green-7" icon="business_center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="q-pa-xl bg-grey-1">
        <div class="text-h4 text-weight-bold text-center q-mb-lg">Visit Our Location</div>
        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <q-card flat bordered>
              <q-img
                src="https://via.placeholder.com/1200x400/2E7D32/FFFFFF?text=Interactive+Map+Location"
                height="400px"
              >
                <div class="absolute-bottom text-subtitle2 text-center bg-black bg-opacity-50">
                  <q-icon name="location_on" /> 123 Farm Road, Agricultural District, AG 12345
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      </div>
    </q-page>
  `
}
