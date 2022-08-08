# data-table-example

Exploring potential data table library independently of Vuetify

There are 2 example implementations: for [`Vue 2`](./vue2) and for [`Vue 3`](./vue3)

Both of them contain the same layout and design, both have TS, but there is one main difference:
- Vue 3 example uses official [`@tanstack/vue-table`](https://tanstack.com/table/v8/docs/adapters/vue-table) adapter
- Vue 2 example uses [`@tanstack/table-core`](https://tanstack.com/table/v8/docs/adapters/vanilla) directly with self-written adapter

## Migration

To migrate from Vue 2 implementation to Vue 3:
- replace custom `FlexRender` component with `import { FlexRender } from '@tanstack/vue-table';`
- replace custom `useVueTable` composable with `import { useVueTable } from '@tanstack/vue-table';`
- remove custom component and composable
- replace custom cell string rendering:
  ```ts
  cell: (props) =>
    Vue.extend({
      render() {
        return (this as any)._v(
          `${props.getValue().absolute} (${props.getValue().relative})`
        );
      },
    }),
  ```
  with:
  ```ts
  cell: (props) =>
    `${props.getValue().absolute} (${props.getValue().relative})`,
  ```
- replace custom cell component rendering:
  ```ts
  cell: (props) => {
    return {
      render(createElement: any) {
        return createElement(AssetCell, { props: props.getValue() });
      },
    };
  },
  ```
  with:
  ```ts
  import { h } from "vue";
  ...
  cell: (props) => h(AssetCell, props.getValue()),
  ```
