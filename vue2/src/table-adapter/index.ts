import {
  RowData,
  TableOptions,
  TableOptionsResolved,
  createTable,
} from "@tanstack/table-core";
import { ref, watchEffect } from "@vue/composition-api";
import { mergeProxy } from "./merge-proxy";

export function useVueTable<TData extends RowData>(
  options: TableOptions<TData>
) {
  const resolvedOptions: TableOptionsResolved<TData> = Object.assign(
    {
      state: {
        columnFilters: [],
        columnOrder: [],
        columnPinning: { left: [], right: [] },
        columnSizing: {},
        columnSizingInfo: {
          columnSizingStart: [],
          deltaOffset: null,
          deltaPercentage: null,
          isResizingColumn: false,
          startOffset: null,
          startSize: null,
        },
        columnVisibility: {},
        expanded: {},
        globalFilter: undefined,
        grouping: [],
        pagination: { pageIndex: 0, pageSize: 10 },
        rowSelection: {},
        sorting: [],
      }, // Dummy state
      onStateChange: () => {}, // noop
      renderFallbackValue: null,
      mergeOptions(
        defaultOptions: TableOptions<TData>,
        options: TableOptions<TData>
      ) {
        return Object.assign(defaultOptions, options);
      },
    },
    options
  );

  const table = createTable<TData>(resolvedOptions);

  // can't use `reactive` because update needs to be immutable
  const state = ref(table.initialState);

  watchEffect(() => {
    table.setOptions((prev) => {
      const stateProxy = new Proxy({} as typeof state.value, {
        get: (_, prop) => state.value[prop as keyof typeof state.value],
      });

      return mergeProxy(prev, options, {
        state: mergeProxy(stateProxy, options.state ?? {}),

        onStateChange: (updater: any) => {
          if (updater instanceof Function) {
            state.value = updater(state.value);
          } else {
            state.value = updater;
          }

          options.onStateChange?.(updater);
        },
      });
    });
  });

  return table;
}
