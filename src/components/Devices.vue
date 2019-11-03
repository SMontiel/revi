<template>
  <div class="overflow-auto whitespace-no-wrap" style="">
    <div v-for="(item, index) in devicesData" :key="index" class="inline-block align-top">
      <div class="flex flex-col m-2">
        <p class="font-semibold text-gray-800 tracking-wider">{{ `${item.width} x ${item.height}` }} <span class="text-sm font-medium tracking-wide">{{ `${item.title}` }}</span></p>
        <webview :preload="preloadScript" :src="host" class="wv bg-white shadow" :style="getStyle(item)"></webview>
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
      devicesData() {
        return this.$store.state.devicesData;
      },
      isScrollEnabled() {
        return this.$store.state.isScrollEnabled;
      }
    },
    data() {
      return {
        preloadScript: `file://${__static}/injector.js`,
        webviews: document.getElementsByClassName('wv')
      };
    },
    methods: {
      getStyle: function(item) {
        return `width: ${item.width}px; height: ${item.height}px;`;
      },
      updateScroll: function (data) {
        for (let i = 0; i < this.webviews.length; i++) {
          this.webviews[i].send("scroll-to", data);
        }
      },
      updateWebviewListener: function () {
        this.webviews = document.getElementsByClassName('wv');
        for (let i = 0; i < this.webviews.length; i++) {
          this.webviews[i].addEventListener('ipc-message', (event) => {
            if (this.isScrollEnabled) {
              const data = JSON.parse(event.channel);
              this.updateScroll(data);
            }
          });
          this.webviews[i].addEventListener('will-navigate', (e) => {
            this.$store.commit('setHost', {
              newHost: e.url
            });
          });
          this.webviews[i].addEventListener('did-navigate-in-page', (e) => {
            const hash = e.url.substr(e.url.lastIndexOf('#'));
            for (let i = 0; i < this.webviews.length; i++) {
              this.webviews[i].send("enable-scroll", { enable: false });
            }
            for (let i = 0; i < this.webviews.length; i++) {
              this.webviews[i].send("set-hash", { hash: hash });
            }
            setTimeout(() => {
              for (let i = 0; i < this.webviews.length; i++) {
                this.webviews[i].send("enable-scroll", { enable: true });
              }
            }, 500);
          });
        }
      }
    },
    updated() {
      this.updateWebviewListener();
    },
    mounted() {
      this.updateWebviewListener();
    }
  }
</script>

<style scoped>
</style>
