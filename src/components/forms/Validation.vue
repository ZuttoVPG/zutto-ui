<template>
  <div class="form-group has-feedback" :class="[problems ? 'has-danger' : '', cssClass]">
    <slot name="form-field" :iconClass="'form-control-danger'"></slot>
    <div class="form-control-feedback" v-show="problems">
      <p v-for="problem in problems">
        {{ problem }}
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields'
})

export default {
  name: 'field-validation',
  computed: {
    problems () {
      var result = []

      if (this.status.has(this.field)) {
        result.push(this.status.first(this.field))
      }

      if (this.customErrors && this.customErrors[this.field]) {
        this.customErrors[this.field].forEach(item => {
          result.push(item)
        })
      }

      return result.length > 0 ? result : false
    }
  },
  props: {
    status: Object,
    field: String,
    label: String,
    cssClass: String,
    customErrors: Object
  },
  locale (lang, label) {
    Validator.addLocale(lang)
    Validator.setLocale(label)
  }
}
</script>
