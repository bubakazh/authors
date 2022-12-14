const Author = require("../models/author.model")


// ! CREATE
module.exports.createAuthor = (req, res) => {
    console.log("CONTROLLER CREATE")
    Author.create(req.body) // ? this req.body is the form object, the data the end-user enters 
    .then(newAuthor => {
        console.log(newAuthor)
        res.json(newAuthor)
    })
    .catch(errors => res.status(400).json(errors))
}

// ! READ ALL
module.exports.allAuthors = (req, res) => {
    Author.find()
        .then(allAuthors => res.json(allAuthors))
        .catch(errors => res.json(errors))
}

// ! READ ONE
module.exports.oneAuthor = (req, res) => {
    Author.findOne({_id: req.params.author_id})
    .then(oneAuthor => res.json(oneAuthor))
    .catch(errors => res.json(errors))
}

// ! UPDATE
module.exports.updateAuthor = (req, res) => {
    Author.findByIdAndUpdate({_id:req.params.author_id}, req.body,  {new:true, runValidators:true})
        .then(updatedAuthor => res.json(updatedAuthor))
        .catch(errors => res.status(400).json(errors))
}
// ! DELETE
module.exports.deleteAuthor = (req, res) => {
    Author.deleteOne({_id:req.params.author_id})
        .then(confirmation => res.json(confirmation))
        .catch(errors => res.json(errors))
}