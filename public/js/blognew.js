const blogFormHandler = async (event) => {
  event.preventDefault();

  const blog_title = document.querySelector("#blog-title").value.trim();
  const blog_description = document.querySelector("#blog-contents").value.trim();

  if (blog_title && blog_description) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ blog_title, blog_description }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Error creating blog: " + response);
    }
  }
};

document.querySelector(".new-blog-form").addEventListener("submit", blogFormHandler);
