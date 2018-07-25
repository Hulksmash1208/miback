let axios = require ('axios');
let app = require ('express')();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get ('/', (req,res)=>{

let pokeIds= [3,6,9,130];

let promesasIncompletas = pokeIds.map((id)=>{

   return axios.get (`http://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response)=>{
        let data = response.data;
        let name = data.name;
        let img = data.sprites.front_default;
        let pokemon = {name, img};
       return pokemon;

    }).catch((error)=> res.send(error));

});

Promise.all (promesasIncompletas).then((pokemones)=>{
    res.send(pokemones);
});

});
app.listen(5001, ()=>{
    console.log('Todo bien, eres el mejor');
});