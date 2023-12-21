const Post = require('../model/blog-model');
const validationSession = require('../util/validation-session');
const validation = require('../util/validation')


function gethome(req, res) {
    res.render('welcome');
  };

  async function getAdmin (req, res) {
    if (!res.locals.isAuth) {
      return res.status(401).render('401');
    }
  
    const posts = await Post.fetchAll();
  
  const sessionInputData = validationSession.getSessionErrorData(req,{
    title:'',
    content:''
  });

    res.render('admin', {
      posts: posts,
      inputData: sessionInputData
    });
  }

  async function createPost(req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;
  
    if (
      !validation.postIsValid(enteredTitle,enteredContent)
    ) {
      validationSession.flashErrorToSession(req, {
        message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent,
      },
      res.redirect('/admin')
      );
  
      return; // or return res.redirect('/admin'); => Has the same effect
    }
  
    const post =  new Post(enteredTitle,enteredContent);
    post.save();
   
    res.redirect('/admin');
  }
  async function getSinglePost(req, res) {
    const singlePost = new Post(null,null,req.params.id);
    const post = await singlePost.fetchSinglePost();
  
  
    if (!post.title || !post.content) {
      return res.render('404'); // 404.ejs is missing at this point - it will be added later!
    }
  
    const sessionInputData = validationSession.getSessionErrorData(req,{
      title: post.title,
      content: post.content,
    });
  
  
  
    res.render('single-post', {
      post: post,
      inputData: sessionInputData
    });
  }
  async function editPost (req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;
  
    if (
      !validation.postIsValid(enteredTitle,enteredContent)
    ) {
      validationSession.flashErrorToSession(req,
        {
        message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent,
      },
      res.redirect(`/posts/${req.params.id}/edit`)
      )
  
      return; 
    }
  
    const post = await new Post(enteredTitle,enteredContent,req.params.id);
    post.save();
    res.redirect('/admin');
  }

  async function deletePost (req, res) {
    const post = new Post(null,null, req.params.id);
    post.delete();
  
    res.redirect('/admin')
  }
  function get401(req,res){
    res.render('401');
  }
  module.exports ={
    gethome:gethome,
    getAdmin:getAdmin,
    createPost: createPost,
    getSinglePost:getSinglePost,
    editPost:editPost,
    deletePost:deletePost,
    get401:get401
};