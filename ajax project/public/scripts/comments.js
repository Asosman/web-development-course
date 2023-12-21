const commentsBtn = document.getElementById("comment-id");
const commentsSection = document.getElementById('comments');

const commentFormField = document.querySelector('#comments-form form');
const commentTitle = document.getElementById('title');
const commentText = document.getElementById('text');

function createCommentList(comments) {
    const commentList = document.createElement("ol");

  for (comment of comments) {
    // console.log(comment.title);
    // console.log(comment.text);
    const liEl = document.createElement("li");
    liEl.innerHTML = `
    <article class="comment-item">
        <h2> ${comment.title}</h2>
        <p>${comment.text}</p>
  </article>
       `;
      //  console.log(liEl);
       commentList.appendChild(liEl);
      //  console.log(commentList);
    }
  return commentList;    
}

async function fetchComment() {
  const postId = commentsBtn.dataset.commentid;
  try{
    const response = await fetch(`/posts/${postId}/comments`);
    const responseData = await response.json();
    if(!response.ok){
      alert('Did not get response');
      return;
    }
   if(responseData && responseData.length > 0){
     const commentlistElement =  createCommentList(responseData); 
        commentsSection.innerHTML=' ';
       commentsSection.append(commentlistElement);
       // console.log(commentlistElement);
   }else{
    commentsSection.firstElementChild.innerText ='No comments you can add comment below'
   }
  }catch(error){
    alert('error somewhere!!!!');
  }
}
async function savecomment(e){
  e.preventDefault();
  const enteredTitle = commentTitle.value;
  const enteredText =commentText.value;

  comments ={
    title:enteredTitle,
    text:enteredText
  }
 const postId = commentFormField.dataset.commentid;
 try{
   const response = await fetch(`/posts/${postId}/comments`,{
    method:'POST',
    body:JSON.stringify(comments),
    headers:{
      'content-type':'application/json'
    }
  });
  if(!response.ok){
    alert('could not send data');
    return;
  }
  
   fetchComment();
   updateUi();
 }catch(error){
  alert('something went wrong!!!!');
 }
  // console.log(enteredText, enteredTitle);
}
// console.log(commentFormField);
function updateUi(){
  commentTitle.value=' ';
  commentText.value =' ';
}

commentsBtn.addEventListener("click", fetchComment);
commentFormField.addEventListener('submit', savecomment );