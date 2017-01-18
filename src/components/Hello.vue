<template>
  <div class="hello">
    <button v-on:click='startLisning'>Start</button>
    <ul>
      <li v-for="item in items">{{item.message}}</li>
    </ul>
  </div>
</template>

<script>
let speech = new webkitSpeechRecognition();
speech.lang = 'ja';
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
      var data = { message: message };
      fetch('/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      this.items.push({message: message});
    },
    startLisning(){
      console.dir(speech);
      speech.addEventListener('result', (e) => {
        this.listening(e.results[0][0].transcript);
      });
      speech.addEventListener('end', function(){
        speech.start();
      });
      speech.start();
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
