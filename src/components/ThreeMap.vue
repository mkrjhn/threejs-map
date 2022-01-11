<template>
  <div ref="container" class="three-map" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ThreeMap from '@/libs/ThreeMap'
import geo from '@/assets/featureCollection.json'

const container = ref<HTMLElement>()

onMounted(() => {
  const threeMap = new ThreeMap(container.value!, {
    center: [37.33, 55.52],
    zoom: 9,
    minZoom: 9,
    maxZoom: 16,
    pitch: 34
  })

  threeMap.init(geo)
})
</script>

<style lang="pcss">
  .three-map {
    position: relative;
    height: 100vh;
    width: 100vw;
  }
</style>
