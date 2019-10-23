const { ipcRenderer } = require('electron');

window.onscroll = function () {
  ipcRenderer.sendToHost(JSON.stringify({
    x: window.scrollX,
    y: window.scrollY
  }));
};

ipcRenderer.on("scroll-to", function (event, data) {
  window.scrollTo(data.x, data.y);
});
