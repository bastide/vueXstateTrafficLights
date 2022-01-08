<template>
  <div id="trafficLights">
    <h1>French Traffic Lights 🚦</h1>
    <img alt="Traffic Light" :src="imageSource" />
    <hr />
    <button @click="send('TURNON')"  :disabled="!state.matches('off')">Turn On</button>
    <button @click="send('TURNOFF')" :disabled="state.matches('off')">Turn Off</button>
    <button @click="send('RESET')"   :disabled="!state.matches('normalOperation')">Reset</button>
    <button @click="send('GO')"      :disabled="!state.matches('blinking')">Go</button>
  </div>
</template>

<script>
import { createMachine } from "xstate";
import { useMachine } from "@xstate/vue";

const normalSubstates = {
  initial: "orange",
  states: {
    orange: {
      after: {
        3000: { target: "red" },
      },
    },
    red: {
      after: {
        3000: { target: "green" },
      },
    },
    green: {
      after: {
        3000: { target: "orange" },
      },
    },
  },
};

const blinkingSubstates = {
  initial: "orange",
  states: {
    orange: {
      after: {
        1000: { target: "off" },
      },
    },
    off: {
      after: {
        1000: { target: "orange" },
      },
    },
  }
};

const lightMachine = createMachine({
  id: "french_traffic_lights",
  initial: "off",
  context: {
    retries: 0,
  },
  states: {
    off: {
      on: {
        TURNON: "blinking",
      },
    },
    blinking: {
      on: {
        GO: "normalOperation",
        TURNOFF: "off",
      },
      ...blinkingSubstates,
    },
    normalOperation: {
      on: {
        RESET: "blinking",
        TURNOFF: "off",
      },
      ...normalSubstates,
    },
  },
});

export default {
  name: "TrafficLight",
  setup() {
    const { state, send } = useMachine(lightMachine, { devTools: true });
    return { state, send };
  },
  computed: {
    imageSource() {
      const stateMatches = this.state.matches;
      if ([ "blinking.orange", "normalOperation.orange" ].some(stateMatches))
        return "traffic-orange.png";
      if (stateMatches("normalOperation.green"))
        return "traffic-green.png";
      if (stateMatches("normalOperation.red"))
        return "traffic-red.png";
      return "traffic-off.png";
    },
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
