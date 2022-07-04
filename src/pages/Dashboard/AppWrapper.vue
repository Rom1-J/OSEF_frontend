<template>
  <router-view></router-view>
</template>

<script>
import EventBus from './AppEventBus.vue';

export default {
  themeChangeListener: null,
  mounted() {
    this.themeChangeListener = () => {
      const elementId = 'theme-link';
      const linkElement = document.getElementById(elementId);
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('id', `${elementId}-clone`);
      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
      });
      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
    };

    EventBus.on('theme-change', this.themeChangeListener);
  },
  beforeUnmount() {
    EventBus.off('theme-change', this.themeChangeListener);
  },
};
</script>
