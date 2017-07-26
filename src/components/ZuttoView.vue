<script>
import {Forbidden, NotFound} from './errors'

export default {
  functional: true,
  props: {
    is404: { type: Boolean, default: false },
    is403: { type: Boolean, default: false },
    is500: { type: Boolean, default: false }
  },
  render (h, ctx) {
    if (ctx.props.is404) {
      return h(NotFound)
    }

    if (ctx.props.is403) {
      return h(Forbidden)
    }

    return h('router-view')
  }
}
</script>
