<template>
  <div class="asset">
    <div class="icon"></div>

    <span class="coin">{{ coin }}</span>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    coin: String,
    name: String,
  },
});
</script>

<style>
.asset {
  display: grid;
  grid-template-columns: 30px auto;
  gap: 1px 12px;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #878eb0;

  align-self: center;
  grid-row: 1 / span 2;
}

.coin {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #2f3158;
}

.name {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #878eb0;
}
</style>
