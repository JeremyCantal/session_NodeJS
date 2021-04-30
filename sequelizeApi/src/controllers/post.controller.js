const user = require("../models").user;
const post = require("../models").post;

module.exports = {

    async getAllPostsOfUser(req, res) {
        try {
            // ES6
            const {userId} = req.params; // ou const userId = req.params.userId; en ES5

            const userCollection = await user.findOne({
                id: req.params.userId
            });
            if (userCollection) {

                const postCollection = await post.findAll({
                    where: { id: userId }
                })

                res.status(201).send(postCollection);
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async getOnePostOfUser(req, res) {
        try {
            // ES6
            const {postId} = req.params; // ou const userId = req.params.userId; en ES5

            const userCollection = await user.findOne({
                id: req.params.userId
            });
            if (userCollection) {

                const postSelect = await post.findOne({
                    where: { id: postId }
                })

                res.status(201).send(postSelect);
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async createPostByUser(req, res) {

        try {
            const userCollection = await user.findOne({
                id: req.params.userId
            });
            if (userCollection) {
                const postCreated = await post.create({
                    titre: req.body.titre,
                    userId: req.params.userId
                });
                res.status(201).send(postCreated)
            }
            else {
                res.status(404).send("User Not Found")
            }

        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },

    async updatePostByUser(req, res) {
        try {
            const userCollection = await user.findOne({
                id: req.params.userId
            });

            if (userCollection) {

                const postCollection = await post.findOne({
                    userId: req.params.userId
                })

                if (postCollection) {
                    const updatedPost = await postCollection.update({
                        titre: req.body.titre,
                        id: req.params.postId,
                        userId: req.params.userId
                    })

                    res.status(201).send(updatedPost);
                }
                else {
                    res.status(404).send("Post Not Found");
                }
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    },

    async deletePostByUser(req, res) {
        try {
            const userCollection = await user.findOne({
                id: req.params.userId
            });

            if (userCollection) {

                const deletedPost = await post.findOne({
                    id: req.params.postId
                })

                if (deletedPost) {
                    deletedPost.destroy();
                    res.status(201).send("Deleted");
                }
                else {
                    res.status(404).send("Post Not Found");
                }
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    }
}
























