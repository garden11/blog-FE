import { useEffect } from "react";

type Props = {
  image: {
    id?: string;
    uri: string;
    name?: string;
  };
};

const TiptapImage = (props: Props) => {
  const { image } = props;

  return (
    <>
      <img src={image.uri} />
    </>
  );
};

export default TiptapImage;
