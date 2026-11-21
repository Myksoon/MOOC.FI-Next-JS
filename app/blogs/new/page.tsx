import { createBlog } from "../../actions/blogs";

export default function NewBlog() {
  return (
    <div>
      <h2>Create new</h2>
      <form action={createBlog}>
        <div>
          <label>
            title <input name="title" required />
          </label>
        </div>
        <div>
          <label>
            author <input name="author" />
          </label>
        </div>
        <div>
          <label>
            url <input name="url" type="url" required />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
