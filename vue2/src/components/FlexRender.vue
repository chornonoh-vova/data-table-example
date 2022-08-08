<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["render", "props"],
  render(createElement) {
    // render static strings (headers, for example)
    if (typeof this.render === 'string') {
      return (this as any)._v(this.render);
    }

    // render simple cells, that just return strings
    if (typeof this.props.renderValue() === 'string') {
      return (this as any)._v(this.props.renderValue());
    }

    // render custom components for cells/headers
    return createElement(this.render(this.props));
  },
});
</script>
