const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_contents = document.querySelector("#comment-text").value.trim();
  const blog_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  if (comment_contents) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment_contents, blog_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);


