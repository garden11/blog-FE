import { Viewer } from "@toast-ui/react-editor";

type Props = {
  value: string;
};

const PostContent = (props: Props) => {
  return <Viewer initialValue={props.value} />;
};

export default PostContent;
