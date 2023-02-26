type Props = {
  children?: React.ReactNode;
  className?: string;
};

const MessageBox = (props: Props) => {
  let children: React.ReactNode | undefined, className: string | undefined;

  ({ children, className } = props);

  return <div className={`message-box ${className ?? ""}`}>{children}</div>;
};

export default MessageBox;
