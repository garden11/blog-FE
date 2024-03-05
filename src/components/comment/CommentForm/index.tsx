import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// hooks
import useAuth from "src/hooks/useAuth";

// forms
import {
  commentFormSchema as formSchema,
  CommentFormValues as FormValues,
} from "src/forms/commentForm";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
};

const CommentForm = (props: Props) => {
  const { onSubmit, onErrorSubmit } = props;

  const { register, handleSubmit } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });
  const { isSignedIn } = useAuth();

  return (
    <div className="sidebar-item submit-comment">
      <div className="sidebar-heading">
        <h2>YOUR COMMENT</h2>
      </div>
      <div className="content">
        <form id="comment" onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
          <div className="row">
            <div className="col-lg-12">
              <fieldset>
                <textarea
                  rows={6}
                  placeholder={
                    isSignedIn()
                      ? "TYPE YOUR COMMENT"
                      : "로그인 후 댓글을 작성할 수 있습니다"
                  }
                  readOnly={!isSignedIn()}
                  {...register("content")}
                />
              </fieldset>
            </div>
            <div className="col-lg-12">
              <fieldset>
                <button type="submit" id="form-submit" className="main-button">
                  SUBMIT
                </button>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
