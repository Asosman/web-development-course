const db = require("../data/database");

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const [posts] = await db.query(
    "SELECT posts.*, authors.name AS authors_name FROM posts JOIN authors ON (posts.author_id = authors.id)"
  );
  res.render("posts-list", { posts: posts });
});

router.get("/new-posts", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  data = [req.body.title, req.body.summary, req.body.content, req.body.author];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );
  res.redirect("/posts");
});

router.get("/post/:id", async function (req, res) {
  const query = `
        SELECT posts.*, authors.name AS authors_name, authors.email AS authors_email FROM posts
        INNER JOIN authors ON posts.author_id = authors.id
        WHERE  posts.id = ?
        `;

  const [posts] = await db.query(query, req.params.id);
  if (!posts || posts.length === 0) {
    return res.statusCode("404").res.render("404");
  }
  const getData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadable: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  //   console.log(getData);
  res.render("post-detail", { posts: getData });
});

router.get("/post/:id/edit", async function (req, res) {
  const query = `
        SELECT posts.*, authors.name AS authors_name, authors.email AS authors_email FROM posts
        INNER JOIN authors ON posts.author_id = authors.id
        WHERE  posts.id = ?
        `;
  const [posts] = await db.query(query, [req.params.id]);
  if (!posts || posts.length === 0) {
    return res.statusCode("404").res.render("404");
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/post/:id/edit", async function (req, res) {
  const query = `
        UPDATE posts SET title = ?, summary = ?, body = ?
        WHERE id = ?
    `;
  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);
  res.redirect('/posts');
});

router.post('/post/:id/delete', async function(req, res){
    await db.query('DELETE FROM posts WHERE id = ?',[req.params.id])
    res.redirect('/posts');
})

module.exports = router;
