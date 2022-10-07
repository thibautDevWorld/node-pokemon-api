const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            const pokemonDeleted = pokemon;
            Pokemon.destroy({
                where: { id: pokemon.id }
            })
            .then(_=> {
                const message = `Le pokemon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                res.json({ message, data: pokemonDeleted })
            })
        })
    })
}