<template>
  <div id="trafficLights">
    <h1>French Traffic Lights</h1>
    <img  alt="Traffic Light" :src="
      state.matches('red') ? 
        'traffic-red.gif' : 
      state.matches('green') ? 
        'traffic-green.gif' : 
      state.matches('yellow') ? 
          'traffic-yellow.gif' :
      'traffic-off.gif'
    " />
    <hr>
    <button @click="send('TURN_ON')">Turn On</button>
    <button @click="send('TURN_OFF')">Turn Off</button>
    <button @click="send('START_REPAIR')">Start Repair</button>
    <button @click="send('END_REPAIR')">End Repair</button>
</template>

<script>
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/vue';

const normalSubstates = {
  initial: 'orange',
  states: {
    orange: {
      after: {
        3000: { target: 'red' },
      },
    },
    red: {
      after: {
        3000: { target: 'green' },
      },
    },
    green: {
      after: {
        3000: { target: 'orange' },
      },
    },
  },
};

const repairingSubstates = {
  initial: 'orange',
  states: {
    orange: {
      after: {
        1000: { target: 'off' },
      },
    },
    off: {
      after: {
        1000: { target: 'orange' },
      },
    },
  },
  // String delays configured here
  delays: {
    BLINK_DELAY: 500, // static value
  },
};

const lightMachine = createMachine({
  id: 'french_traffic_lights',
  initial: 'off',
  context: {
    retries: 0,
  },
  states: {
    off: {
      on: {
        TURN_ON: 'repairing',
      },
    },
    repairing: {
      on: {
        FINISH_REPAIR: 'normalOperation',
        TURN_OFF: 'off',
      },
      ...repairingSubstates,
    },
    normalOperation: {
      on: {
        START_REPAIR: 'repairing',
        TURN_OFF: 'off',
      },
      ...normalSubstates,
    },
  },
});

export default {
  name: 'TrafficLight',
  setup() {
    const { state, send } = useMachine(lightMachine, { devTools: true });
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
