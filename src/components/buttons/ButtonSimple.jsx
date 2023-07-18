function ButtonSimple({ text, onClick }) {
  return (
    <button
      type="button"
      className="m-3 flex h-12 w-32 flex-col items-center justify-center rounded-lg bg-cyan-500 p-3 px-2 py-1 font-sans text-xl font-bold shadow-lg hover:bg-cyan-400 active:bg-cyan-600 md:h-14 md:w-40"
      onClick={onClick}
    >
      <span className="md:col-span-2">{text}</span>
    </button>
  );
}

export default ButtonSimple;
