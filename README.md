### Bus Event Emitter
We have a BusService that stores listeners to be called when we want to listen to events.<br>
We can define a listener on a Component and then emit events to that listener from Parent or Child Components.
This BusService uses rxjs Subject() to define listeners and subjects.
```typescript
// subscribe / listen to an event
this.$bus.listen('event-to-listen', this.fun);
function fun(data1: any, data2: any, data3: any) {
  console.log(data1);
  console.log(data2);
  console.log(data3);
}

// emit events
this.$bus.emit('event-to-listen', 'data1', 'data2', 'data3');

// when we unmount a component we want to clean the events array
// unsubscribe / remove an event
this.$bus.forget('event-to-listen');
```

### Toasts
The toasts component is an array that stores up to 5 toasts.<br>
When a toast is displayed a new one will be added below that if the user has any action that needs to show another toast.
```html
<template>
  <Toasts />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toasts from './Toasts.vue';
export default defineComponent({
  components: { Toasts },
  methods: {
    actionToAddToast() {
      this.$bus.emit('add-toast', 'Toast text...', Date.now());
    },
  },
});
</script>
```

### Interfaces
On the Interfaces folder we will keep all interfaces related to any object
is used in the frontend.
In order to keep a well-organised codebase we need to try and use Types wherever possible
and we see fit!!