let axios = require ('axios');
let app = require ('express')();

let port = process.env.PORT || 5000;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get ('/pokemons', (req,res)=>{

let pokeIds= [4,5,6,23,24,25.26,39,40,50,51,142];

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
app.listen(port, ()=>{
    console.log(`Todo bien, eres el mejor`, `me levante en el puerto ${port}`);
});