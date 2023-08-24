export default function MyQuill() {
  const [value, setValue] = useState("");

  useEffect(() => {
    // console.log(value);
  }, [value]);

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <p>{value}</p>
    </>
  );
}
