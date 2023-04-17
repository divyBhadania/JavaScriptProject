if (
  localStorage.getItem("userEmail") == "" ||
  localStorage.getItem("userEmail") == undefined
) {
  loginComponent();
} else {
  dashboardComponent();
}

let ind = -1;

function loginComponent() {
  document.title = "login";
  let loginModel = `<div class="body"><div class="container">
                        <div class="forms">
                        <div class="form login">
                            <span class="title">Login</span>
                            <form action="#">
                            <div class="input-field">
                                <input class="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,5}$" type="email" placeholder="Enter your email" required />
                                <i class="uil uil-envelope icon"></i>
                            </div>
                            <div class="email-message" style="display: none;">
                                Wrong Email
                            </div>
                            <div class="input-field">
                                <input
                                type="password"
                                class="password"
                                placeholder="Enter your password"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{1,20}$"
                                required
                                />
                                <i class="uil uil-lock icon"></i>
                                <i class="uil uil-eye-slash showHidePw"></i>
                            </div>
                            <div class="input-field button">
                                <input class="login-button" type="button" value="Login"/>
                            </div>
                            <input class="clear-button" type="button" value="Clear"/>
                            </form>
                        </div>
                        </div>
                    </div></div>`;
  document.body.innerHTML = loginModel;

  //define variable
  const pwShowHide = document.querySelector(".showHidePw"),
    pwField = document.querySelector(".password"),
    emailMessage = document.querySelector(".email-message"),
    loginButton = document.querySelector(".login-button");

  let passwordMatch =
    document.querySelector(".password:is(:invalid)") == undefined
      ? true
      : false;
  let emailMatch =
    document.querySelector(".email:is(:invalid)") == undefined ? true : false;

  // Show and hide password.
  pwShowHide.addEventListener("click", () => {
    if (pwField.type === "password") {
      pwField.type = "text";
      pwShowHide.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      pwField.type = "password";
      pwShowHide.classList.replace("uil-eye", "uil-eye-slash");
    }
  });

  // email validations
  document.querySelector(".email").addEventListener("focusout", () => {
    const emailField = document.querySelector(".email:is(:invalid)");
    if (emailField != undefined) {
      emailMessage.style.display = "block";
      emailMatch = false;
      buttonActive();
    } else {
      emailMessage.style.display = "none";
      emailMatch = true;
      buttonActive();
    }
  });

  // password validations
  document.querySelector(".password").addEventListener("focusout", () => {
    const passwordField = document.querySelector(".password:is(:invalid)");
    if (passwordField != undefined) {
      passwordMatch = false;
      buttonActive();
    } else {
      passwordMatch = true;
      buttonActive();
    }
  });

  // Login Button redirations
  loginButton.addEventListener("click", (e) => {
    if(emailMatch && passwordMatch){
      localStorage.setItem("userEmail", document.querySelector(".email").value);
      localStorage.setItem(
        "userPassword",
        document.querySelector(".password").value
      );
      dashboardComponent();
    }
  });

  document.querySelector(".clear-button").addEventListener("click" , () =>{
    document.querySelector(".email").value = "";
    document.querySelector(".password").value = "";
    emailMessage.style.display = "none";
  })

  function buttonActive() {
    if (emailMatch && passwordMatch) loginButton.classList.add("active");
    else loginButton.classList.remove("active");
  }
}

function dashboardComponent() {
  displayNavbar();
  document.title = "Dashboard";

  const email = document.querySelector(".profile .email");
  const logoText = document.querySelector(".profile .text");

  //Display user email and logo in nav bar
  email.innerHTML = localStorage.getItem("userEmail");
  let emailSplit = email.innerHTML.split(".");
  if (emailSplit.length > 2) {
    logoText.innerHTML = (
      emailSplit[0].charAt(0) + emailSplit[1].charAt(0)
    ).toUpperCase();
  } else {
    logoText.innerHTML = (
      emailSplit[0].charAt(0) + emailSplit[0].charAt(1)
    ).toUpperCase();
  }

  //Make comment local storage
  initializeComment();
  //load all cards
  displayCards();

  //Logout user
  document.querySelector(".logout-profile").addEventListener("click", () => {
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userPassword", "");
    loginComponent();
  });

  function initializeComment() {
    if (localStorage.getItem("userComment") == undefined) {
      const model = {
        view: 0,
        comment: [],
      };
      const commentArray = [];
      blogs.forEach((element) => {
        commentArray.push(model);
      });
      localStorage.setItem("userComment", JSON.stringify(commentArray));
    }
  }

  function displayNavbar() {
    let navbar = `<div class="container">
                      <nav class="navbar">
                        <i class="uil uil-blogger icon"></i>
                        <ul>
                          <li class="active">Home</li>
                          <li>Feature</li>
                          <li>Categories</li>
                          <li>Resource</li>
                        </ul>
                        <div class="profile">
                          <div class="logo">
                            <div class="circle">
                              <div class="text"></div>
                            </div>
                          </div>
                          <div class="email"></div>
                          <a class="logout-profile">
                            <i class="material-symbols-outlined icon"> logout </i>
                            <div class="logout">Logout</div>
                          </a>
                        </div>
                      </nav>
                      <div class="main"></div>
                    </div>`;
    document.body.innerHTML = navbar;
  }
}

function displayCards() {
  const main = document.querySelector(".main");
  let comment = JSON.parse(localStorage.getItem("userComment"));
  let cardComponent = `<section class="blog-slogan">
                        <div>
                            <h1>Train Your Thought</h1>
                            <h3>Unlock the Power of Thoughtfulness</h3>
                          </div>
                      </section>
                      <section class="main-card">`;
  blogs.forEach((element, ind) => {
    cardComponent += `<div id="${ind}" class="card">
                        <div class="view">
                          <i class="uil uil-eye icon"></i>
                          <div class="count">${comment[ind].view}</div>
                        </div>
                        <div class="comment">
                          <i class="uil uil-comment-message icon"></i>
                          <div class="count">${comment[ind].comment.length}</div>
                        </div>
                        <div class="card-content">
                          <div class="image">
                              <img
                              src="${element.image}"
                              alt=""
                              srcset=""
                              />
                          </div>
                          <div class="title">${element.heading}</div>
                          <div class="click-here" onclick="displayBlog(${ind} , true)">Read more --></div>
                        </div>
                      </div>`;
  });
  cardComponent += "</section>";
  main.innerHTML = cardComponent;
}

function displayBlog(id , flag = false) {
  let content = blogs[id];
  if(flag){
    const commentArray = JSON.parse(localStorage.getItem("userComment"));
    commentArray[id].view++;
    localStorage.setItem("userComment", JSON.stringify(commentArray));
  }
  let blogComponent = `<div class="blog-main">
                            <button class="back-button" onClick="displayCards()"><-- click to back</button>
                            <h1>${content.heading}</h1>
                            <img src="${content.image}" alt="" />
                            <h2 class="title1"><b>${content.title1}</b></h2>
                            <h4 class="subtext1">${content.subtext1}</h4>
                            <h2 class="title2"><b>${content.title2}</b></h2>
                            <h4 class="subtext2">${content.subtext2}</h4>
                            <form class="comment-box" action="#">
                              <div>
                                  <p class="heading">Name</p>
                                  <input class="name" type="text">
                              </div>
                              <div>
                                  <p class="heading">Comment</p>
                                  <textarea class="comment" name="comment" id="" ></textarea>
                              </div>
                              <button type="button" class="add-comment" onClick="submitComment(${id})">Add Comment</button>
                            </form>
                            <div class="comment-list"></div>
                        </div>`;

  blogComponent += "</div></div>";
  document.querySelector(".main").innerHTML = blogComponent;
  displayComment(id);
}

function displayComment(id) {
  let blogComment = "";
  const commentArray = JSON.parse(localStorage.getItem("userComment"));
  const userEmail = localStorage.getItem("userEmail");
  commentArray[id].comment.forEach((element , ind) => {
    let shortName = element.email.split(".");
    if (shortName.length > 2) {
      shortName = (
        shortName[0].charAt(0) + shortName[1].charAt(0)
      ).toUpperCase();
    } else {
      shortName = (
        shortName[0].charAt(0) + shortName[0].charAt(1)
      ).toUpperCase();
    }
    blogComment += `<div class="comment-card">
                      <div class="logo">
                        <p class="short-name">${shortName}</p>
                      </div>
                      <div class="comment">
                        <p class="userName">${element.name}</p>
                        <p class="userComment">${element.comment}</p>
                      </div>`;
    if ((element.email == userEmail)) {
      blogComment += `<button class="edit-comment" type="button" onClick="editComment(${id},${ind})">
                        <span class="material-symbols-outlined">edit</span>
                      </button>
                      <button class="delete-comment" type="button" onclick="deleteComment(${id} , ${ind})">
                      <span class="material-symbols-outlined">delete</span>
                      </button>`;
    }
    blogComment += `</div>`;
  });
  document.querySelector(".blog-main .comment-list").innerHTML = blogComment;
}

function submitComment(id) {
  const commentArray = JSON.parse(localStorage.getItem("userComment"));
  let userName = document.querySelector(".comment-box .name").value;
  let userComment = document.querySelector(".comment-box .comment").value;
  if(userComment != "" && userName != ""){
    if(ind == -1){
      const data = {
        name: userName,
        email: localStorage.getItem("userEmail"),
        comment: userComment,
      };
      commentArray[id].comment.push(data);
    }
    else{
      commentArray[id].comment[ind].name = userName;
      commentArray[id].comment[ind].comment = userComment;
      // localStorage.setItem("userComment", JSON.stringify(commentArray));
      document.querySelector(".comment-box .add-comment").innerHTML = "Add Comment"
      ind = -1;
    }
    localStorage.setItem("userComment", JSON.stringify(commentArray));
    displayBlog(id);
  }
}

function editComment(id , index){
  const commentArray = JSON.parse(localStorage.getItem("userComment"));
  //load comment in input box
  document.querySelector(".comment-box .name").value = commentArray[id].comment[index].name;
  document.querySelector(".comment-box .comment").value = commentArray[id].comment[index].comment;
  document.querySelector(".comment-box .add-comment").innerHTML = "Edit Comment"
  ind = index;
}

function deleteComment(id , index){
  const commentArray = JSON.parse(localStorage.getItem("userComment"));
  const blogComment = commentArray[id].comment.slice(0,index).concat( commentArray[id].comment.slice(index+1 , commentArray[id].comment.length));
  commentArray[id].comment = blogComment;
  localStorage.setItem("userComment", JSON.stringify(commentArray));
  displayComment(id);
}