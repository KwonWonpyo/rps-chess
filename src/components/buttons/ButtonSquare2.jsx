function ButtonSquare2({ text, onClick }) {
  return (
    <button
      type="button"
      className="m-2 h-20 w-40 items-center rounded-lg bg-cyan-500 px-2 py-1 font-sans text-xl font-bold shadow-lg hover:bg-cyan-400 active:bg-cyan-600 md:w-56"
      onClick={onClick}
    >
      <span className="">{text}</span>
    </button>
  );
}

export default ButtonSquare2;
