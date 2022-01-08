<template>
  <div id="app">
    <traffic-light></traffic-light>
    <hr />
  </div>
</template>

<script>
import TrafficLight from "@/components/TrafficLight";

export default {
  name: "App",
  components: {
    TrafficLight,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
