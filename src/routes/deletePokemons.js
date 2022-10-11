const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if(pokemon === null) {
                const message = 'Le pokemon n\'existe pas. Réessayez avec un autre identifiant.'
                return res.status(404).json({ message })
            }
            
            const pokemonDeleted = pokemon;
            Pokemon.destroy({ //methode destroy from sequelize
                where: { id: pokemon.id }
            })
            .then(_ => {
                const message = `Le pokemon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                res.json({ message, data: pokemonDeleted })
            })
            .catch(error => {
                const message = `La liste des pokemons n'a pas pu être récupéreé. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
        })
    })
}