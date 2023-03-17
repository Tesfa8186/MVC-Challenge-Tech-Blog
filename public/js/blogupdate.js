const updateFormHandler = async (event) => {
  event.preventDefault();

  const blog_title = document.querySelector("#blog-title").value.trim();
  const blog_description = document.querySelector("#blog-contents").value.trim();

  if (blog_title && blog_description) {
    const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ blog_title, blog_description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Error updating blog ");
      console.log(response);
    }
  } else {
    alert("Error updating blog ");
    console.log(response);
  }
};

document.querySelector(".update-blog-form").addEventListener("submit", updateFormHandler);
