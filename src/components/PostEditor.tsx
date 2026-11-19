"use client";

import { useActionState } from "react";
import {
  deletePost,
  publishPost,
  saveDraft,
  type ActionState,
} from "@/app/admin/actions";
import styles from "@/app/admin/admin.module.css";
import { POST_SPORT_OPTIONS, type Post } from "@/lib/post-shared";

type Props = {
  post?: Post | null;
};

const initialState: ActionState = {};

export default function PostEditor({ post }: Props) {
  const [draftState, draftAction, draftPending] = useActionState(
    saveDraft,
    initialState,
  );
  const [publishState, publishAction, publishPending] = useActionState(
    publishPost,
    initialState,
  );
  const [deleteState, deleteAction, deletePending] = useActionState(
    deletePost,
    initialState,
  );

  const pending = draftPending || publishPending || deletePending;
  const error =
    draftState.error || publishState.error || deleteState.error || null;

  return (
    <div className={styles.form}>
      {error && (
        <p className={`${styles.message} ${styles.error}`} role="alert">
          {error}
        </p>
      )}
      {pending && (
        <p className={styles.message}>Working… please wait.</p>
      )}

      <form id="post-editor-form" className={styles.form}>
        {post && <input type="hidden" name="id" value={post.id} />}

        <label className={styles.label}>
          Headline (optional)
          <input
            className={styles.input}
            type="text"
            name="headline"
            defaultValue={post?.headline ?? ""}
            maxLength={200}
            disabled={pending}
          />
        </label>

        <label className={styles.label}>
          Body
          <textarea
            className={styles.textarea}
            name="body"
            required
            defaultValue={post?.body ?? ""}
            placeholder="5–10 sentences. Plain text; line breaks are kept."
            disabled={pending}
          />
        </label>

        <label className={styles.label}>
          Sport (optional)
          <select
            className={styles.select}
            name="sport"
            defaultValue={post?.sport ?? ""}
            disabled={pending}
          >
            <option value="">None</option>
            {POST_SPORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Image (optional, JPEG/PNG/WebP, max 5 MB)
          <input
            className={styles.input}
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            disabled={pending}
          />
        </label>

        {post?.image_url && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image_url} alt="" className={styles.previewImg} />
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="remove_image"
                disabled={pending}
              />
              Remove current image
            </label>
          </div>
        )}
      </form>

      <div className={styles.row}>
        <button
          type="submit"
          form="post-editor-form"
          formAction={draftAction}
          className="btn btn-secondary"
          disabled={pending}
        >
          {draftPending ? "Saving…" : "Save Draft"}
        </button>
        <button
          type="submit"
          form="post-editor-form"
          formAction={publishAction}
          className="btn btn-primary"
          disabled={pending}
        >
          {publishPending ? "Publishing…" : "Publish"}
        </button>
      </div>

      {post && (
        <div className={styles.row}>
          <button
            type="submit"
            form="post-editor-form"
            formAction={deleteAction}
            className={`btn ${styles.danger}`}
            formNoValidate
            disabled={pending}
          >
            {deletePending ? "Deleting…" : "Delete post"}
          </button>
        </div>
      )}
    </div>
  );
}
