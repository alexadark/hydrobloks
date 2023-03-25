export const PrintJson = ({data}) => {
  return (
    <details className="p-4 my-2 outline outline-2 outline-blue-300">
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
};
