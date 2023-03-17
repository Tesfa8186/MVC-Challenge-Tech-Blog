const router = require("express").Router();
const { Blog } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.blog_title,
      contents: req.body.blog_description,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteBlog = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!deleteBlog) {
      res.status(404).json({ message: "Blog not found!" });
      return;
    }
    res.status(200).json(deleteBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateBlog = await Blog.update(
      {
        title: req.body.blog_title,
        contents: req.body.blog_description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateBlog) {
      res.status(404).json({ message: "Blog not updated!" });
      return;
    }
    res.status(200).json(updateBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
