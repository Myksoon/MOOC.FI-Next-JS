"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, type BlogFormState } from "../../actions/blogs";
import Field from "../../components/Field";
import { useNotification } from "../../components/NotificationContext";

export default function NewBlogForm() {
  const router = useRouter();
  const { notify } = useNotification();
  const [state, formAction, pending] = useActionState(async (prev: BlogFormState, formData: FormData) => {
    const result = await createBlog(prev, formData);
    if (result.success) {
      notify(`blog "${formData.get("title")}" created`);
      router.push("/blogs");
    }
    return result;
  }, {});

  return (
    <form action={formAction} noValidate>
      <Field label="Title" name="title" defaultValue={state.values?.title} error={state.errors?.title} />
      <Field label="Author" name="author" defaultValue={state.values?.author} error={state.errors?.author} />
      <Field label="URL" name="url" type="url" defaultValue={state.values?.url} error={state.errors?.url} />
      <button type="submit" data-testid="create-blog-button" disabled={pending} className="btn">
        Create
      </button>
    </form>
  );
}
