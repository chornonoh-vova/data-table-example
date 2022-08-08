<template>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :class="[
            header.column.getCanSort() ? 'cursor-pointer select-none' : '',
            header.column.getIsSorted() ? 'sorted' : '',
          ]"
          @click="(event) => header.column.getToggleSortingHandler()?.(event)"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />

          <template v-if="header.column.getIsSorted()">
            <template v-if="header.column.getIsSorted() === 'asc'">
              🔼
            </template>
            <template v-if="header.column.getIsSorted() === 'desc'">
              🔽
            </template>
          </template>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <pre>{{ JSON.stringify(table.getState().sorting, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import {
  createColumnHelper,
  getCoreRowModel,
  useVueTable,
  FlexRender,
  getSortedRowModel,
} from "@tanstack/vue-table";
import AssetCell from "./AssetCell.vue";
import {
  formatUsdWithSymbol,
  formatNumber,
  formatPercent,
  formatAbbreviateNumber,
} from "../format";

type CoinInfo = {
  coin: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
};

const columnHelper = createColumnHelper<CoinInfo>();

const columns = [
  // Asset column
  columnHelper.accessor(
    (row) => {
      return {
        coin: row.coin,
        name: row.name,
      };
    },
    {
      id: "asset",
      header: "Asset",
      cell: (props) => h(AssetCell, props.getValue()),
      sortDescFirst: false,
      sortingFn: (rowA, rowB) =>
        rowA.original.coin.localeCompare(rowB.original.coin),
    }
  ),

  // Price column
  columnHelper.accessor((row) => formatUsdWithSymbol(row.price), {
    id: "price",
    header: "Price",
    sortDescFirst: false,
    sortingFn: (rowA, rowB) => rowA.original.price - rowB.original.price,
  }),

  // Change 24h column
  columnHelper.accessor(
    (row) => {
      return {
        absolute: formatNumber(row.change24h),
        relative: formatPercent(row.change24h / row.price),
      };
    },
    {
      id: "change24h",
      header: "Change 24h",
      cell: (props) =>
        `${props.getValue().absolute} (${props.getValue().relative})`,
      sortDescFirst: false,
      sortingFn: (rowA, rowB) =>
        rowA.original.change24h - rowB.original.change24h,
    }
  ),

  // Market Cap column
  columnHelper.accessor((row) => formatAbbreviateNumber(row.marketCap), {
    id: "marketCap",
    header: "Market Cap",
    sortDescFirst: false,
    sortingFn: (rowA, rowB) =>
      rowA.original.marketCap - rowB.original.marketCap,
  }),

  // 24h Vol column
  columnHelper.accessor((row) => formatAbbreviateNumber(row.volume24h), {
    id: "volume24h",
    header: "24h Vol",
    sortDescFirst: false,
    sortingFn: (rowA, rowB) =>
      rowA.original.volume24h - rowB.original.volume24h,
  }),
];

const defaultData = [
  {
    coin: "BTC",
    name: "Bitcoin",
    price: 50517.13,
    change24h: 1339,
    marketCap: 3200000000,
    volume24h: 471700000,
  },
  {
    coin: "ETH",
    name: "Ethereum",
    price: 5671.58,
    change24h: 133,
    marketCap: 270000000,
    volume24h: 384200000,
  },
  {
    coin: "SOL",
    name: "Solana",
    price: 57.94,
    change24h: 39,
    marketCap: 180000000,
    volume24h: 104500000,
  },
];

const data = ref(defaultData);

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,

  enableSorting: true,

  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),

  debugAll: true,
});
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #2f3158;
}

tr {
  display: flex;
  padding-inline: 20px;
  align-items: center;
}

th,
td {
  flex: 1;
}

th {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #878eb0;
  text-align: left;
}

tbody tr {
  background-color: #fff;
  padding-block: 14px;
  border-radius: 24px;
}

tbody tr:hover {
  position: relative;
  z-index: 1;
  box-shadow: 0px 2px 9px rgba(47, 49, 88, 0.08),
    0px 12px 24px rgba(47, 49, 88, 0.08);
}

.sorted {
  font-weight: 600;
  color: #2f3158;
}

.cursor-pointer {
  cursor: pointer;
}

.select-none {
  user-select: none;
}
</style>
