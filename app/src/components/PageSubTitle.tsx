interface Props {
  title: string;
  className?: string;
}

export const PageSubTitle = (props: Props) => {
  const { title, className } = props;
  return <h2 className={`pb-3 pt-3 ${className}`}>{title}</h2>;
};
