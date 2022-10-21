interface Props {
  title: string;
}

export const PageTitle = (props: Props) => {
  const { title } = props;
  return <h1 className="text-center">{title}</h1>;
};
