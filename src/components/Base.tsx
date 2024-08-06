interface Props {
  title: string;
  component: React.ReactNode;
}

const Base = ({ title, component }: Props) => {
  return (
    <div className="border rounded">
      <h1 className="p-4 font-bold text-xl text-center">{title}</h1>
      <hr />
      <div className="p-4 whitespace-pre-wrap">{component}</div>
    </div>
  );
};

export default Base;
