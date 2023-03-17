const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_contents: req.body.comment_contents,
      blog_id: req.body.blog_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!deleteComment) {
      res.status(404).json({ message: "Comment not found!" });
      return;
    }
    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
