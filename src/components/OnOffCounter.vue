<template>
  <div id="onOffCounter">
    <h1>On-Off Switch</h1>
    <!-- On envoie un évenement au statechart-->
    <button @click="send('TOGGLE')">Interrupteur</button>
    <!-- L'image dépend de l'état du statechart-->
    <img  alt="Light Bulb"
      :src="state.matches('inactive') ? 
        'light_bulb.gif' : 
        'light_bulb_glow.gif'"
    />
     <code>
      Allumée 
      <!-- On accède aux variables internes du statechart-->
      <strong>{{ state.context.count }}</strong> fois
    </code>
  </div>
</template>

<script>
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/vue";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
});

export default {
  name: "OnOffCounter",
  setup() {
    const { state, send } = useMachine(toggleMachine, { devTools: true });
    return { state, send };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
