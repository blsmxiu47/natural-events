<template>
  <div class="tooltip-box">
    <slot />
    <div
      class="tooltip">
      <h2>Event Details</h2>
      <ul>
        <li><strong>Event ID:</strong><br> {{ context[0] }}</li>
        <li><strong>Event Title:</strong><br> {{ context[2] }}</li>
        <li><strong>Event Registered Date:</strong><br> {{ context[3] }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    context: []
  }
}
</script>

<style lang="scss" scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
  z-index: 601;
}

.tooltip-box:hover .tooltip{
  opacity: 1;
}

.tooltip {
  color: rgb(100, 40, 40);
  text-align: left;
  padding: 5px 25px;
  border-radius: 2px;
  width: 240px;
  top: 120%;
  left: 50%;
  margin-left: -60px;
  opacity: 1;
  position: absolute;
  background: rgba(255,255,255,1);
}

.tooltip ul {
  padding: 5px 0;
}

.tooltip li {
  padding: 2px 0;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(255,255,255,.7) transparent transparent transparent;
}
</style>
