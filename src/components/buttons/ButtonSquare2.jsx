function ButtonSquare2({ text, onClick }) {
  return (
    <button
      type="button"
      className="m-3 h-20 w-40 flex-col items-center justify-end rounded-lg bg-cyan-500 p-3 px-2 py-1 font-sans text-xl font-bold shadow-lg hover:bg-cyan-400 active:bg-cyan-600 md:w-56 md:grid-cols-3"
      onClick={onClick}
    >
      <span className="">{text}</span>
    </button>
  );
}

export default ButtonSquare2;
