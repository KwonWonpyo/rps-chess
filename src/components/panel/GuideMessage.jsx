function GuideMessage(props) {
  const { message } = props;
  return (
    <div className="mb-3 h-auto w-auto rounded bg-white bg-opacity-10 px-3 py-1 font-mono text-xl font-semibold">
      {message}
    </div>
  );
}

export default GuideMessage;
