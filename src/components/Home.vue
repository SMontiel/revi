<template>
  <div class="min-h-screen w-full font-sans">
    <div class="h-16 flex border-b">
      <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-full flex justify-center items-center">
        <img class="w-16 h-16" src="./../assets/owl.svg" alt="Revi logo">
        <p class="text-3xl ml-2 tracking-wide font-medium text-gray-900">revi</p>
      </div>
      <div class="w-1/2 sm:w-2/3 md:w-3/4 lg:w-5/6 h-full flex items-center px-2">
        <input v-on:keyup.enter="onEnter" :value="host" type="url" class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 outline-none bg-gray-100 border-gray-300 font-medium text-gray-800 rounded py-1 px-2 tracking-wider shadow border focus:border-gray-500 focus:shadow-md">
      </div>
    </div>
    <div class="absolute left-0 right-0 bottom-0 overflow-auto" style="top: 4rem;">
      <div class="flex">
        <div class="bg-gray-900 overflow-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-4 h-auto">
          <p class="text-gray-600 uppercase text-sm font-bold tracking-wide">Add new frame</p>
          <div class="">
            <p class="text-sm text-gray-400 tracking-wide font-medium">Title</p>
            <input v-model="title" class="w-full rounded px-2 py-1" type="text">
          </div>
          <div class="w-full flex">
            <div class="w-1/2 mr-1">
              <p class="text-sm text-gray-400 tracking-wide font-medium">Width</p>
              <input v-model="width" class="w-full rounded px-2 py-1" type="number">
            </div>
            <div class="w-1/2 ml-1">
              <p class="text-sm text-gray-400 tracking-wide font-medium">Height</p>
              <input v-model="height" class="w-full rounded px-2 py-1" type="number">
            </div>
          </div>
          <button @click="addFrame" class="bg-gray-200 mt-3 uppercase font-bold text-gray-800 tracking-wide rounded px-2 py-1 w-full">Add frame</button>
          <p class="text-gray-600 uppercase text-sm font-bold tracking-wide mt-4">Frames</p>
          <div v-for="(item, index) in devicesData" :key="index" class="group flex justify-between items-center rounded border-0 hover:border-gray-100 hover:border hover:px-2">
            <p class="text-gray-100 py-1">{{ item.title }}</p>
            <p class="text-gray-500 py-1 text-sm">{{ `${item.width} x ${item.height}` }}</p>
            <font-awesome-icon icon="times" @click="deleteFrame(index)" class="text-white py-0 hidden group-hover:block cursor-pointer" />
          </div>
        </div>
        <Devices class="px-0 pb-8 bg-gray-100 w-1/2 sm:w-2/3 md:w-3/4 lg:w-5/6" :host="host"/>
      </div>
    </div>
  </div>
</template>

<script>
import Devices from "./Devices";

export default {
  name: 'home',
  components: {
    Devices
  },
  data() {
    return {
      title: 'Screen',
      width: 250,
      height: 400
    };
  },
  computed: {
    devicesData() {
      return this.$store.state.devicesData;
    },
    host() {
      return this.$store.state.host;
    }
  },
  methods: {
    addFrame() {
      this.$store.commit('addFrame', {
        title: this.title,
        width: this.width,
        height: this.height
      });
    },
    deleteFrame(index) {
      this.$store.commit('deleteFrame', {
        index: index
      });
    },
    onEnter: function(e) {
      this.$store.commit('setHost', {
        newHost: e.target.value
      });
    }
  }
}
</script>
