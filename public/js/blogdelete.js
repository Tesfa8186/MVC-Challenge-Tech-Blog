const delBlogBtnHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Error deleting blog: " + response);
    }
  }
};

document.querySelectorAll(".delete-blog").forEach((delBlog) => {
  delBlog.addEventListener("click", delBlogBtnHandler);
});
