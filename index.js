let axios = require ('axios');
let app = require ('express')();

let port = process.env.PORT || 5000;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get ('/pokemons', (req,res)=>{

let pokeIds= [150,151,243,244,245,249,250,251,380,381,382,383,384];

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