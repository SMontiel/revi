<template>
  <div class="overflow-auto whitespace-no-wrap" style="">
    <div v-for="(item, index) in devicesData" :key="index" class="inline-block align-top">
      <div class="flex flex-col m-2">
        <p class="font-semibold text-gray-800 tracking-wider">{{ `${item.width} x ${item.height}` }} <span class="text-sm font-medium tracking-wide">{{ `${item.title}` }}</span></p>
        <webview id="_i1" :src="host" class="bg-white shadow"  :style="getStyle(item)"></webview>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Devices",
    props: {
      host: String
    },
    computed: {
      devicesData () {
        return this.$store.state.devicesData
      }
    },
    data() {
      return {};
    },
    methods: {
      getStyle: function(item) {
        return `width: ${item.width}px; height: ${item.height}px;`;
      }
    }
  }
</script>

<style scoped>
</style>
