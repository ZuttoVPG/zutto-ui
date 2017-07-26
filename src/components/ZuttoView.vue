<script>
import { Forbidden } from './errors'

export default {
  functional: true,
  props: {
    is403: { type: Boolean, default: false }
  },
  render (h, ctx) {
    if (ctx.props.is403) {
      return h(Forbidden)
    }

    return h('router-view')
  }
}
</script>
