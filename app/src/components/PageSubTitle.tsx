interface Props {
  title: string;
}

export const PageSubTitle = (props: Props) => {
  const { title } = props;
  return <h2>{title}</h2>;
};
