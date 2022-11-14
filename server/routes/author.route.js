const AuthorController = require("../controllers/author.controller")

module.exports = app => {
    // create
    app.post("/api/authors", AuthorController.createAuthor)

    // read all
    app.get("/api/authors", AuthorController.allAuthors)

    // read one
    app.get("/api/authors/:author_id", AuthorController.oneAuthor)

    // update
    app.put("/api/authors/update/:author_id", AuthorController.updateAuthor)

    // delete
    app.delete("/api/authors/delete/:author_id", AuthorController.deleteAuthor)
}