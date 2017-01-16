<template>
  <div class="hello">
    <button v-on:click='startLisning'>Start</button>
    <ul>
      <li v-for="item in items">{{item.message}}</li>
    </ul>
  </div>
</template>

<script>
let speach = new webkitSpeechRecognition();
speach.lang = 'ja';
export default {
  name: 'hello',
  data: () => {
    return  {
      poepoe: "",
      items: []
    }
  },
  methods:{
    listening(message){
      this.items.push({message: message});
    },
    startLisning(){
      console.dir(speach);
      speach.addEventListener('result', (e) => {
        this.listening(e.results[0][0].transcript);
      });
      speach.addEventListener('end', function(){
        speach.start();
      });
      speach.start();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
