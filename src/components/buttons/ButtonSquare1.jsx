function ButtonSquare1({ text, svg, alt, onClick }) {
  return (
    <button
      type="button"
      className="m-2 grid h-20 w-40 grid-flow-row grid-cols-2 items-center rounded-lg bg-cyan-500 px-2 py-1 font-sans text-xl font-bold shadow-lg hover:bg-cyan-400 active:bg-cyan-600 md:w-56 md:grid-cols-3"
      onClick={onClick}
    >
      <img className="m-auto" src={svg} alt={alt} />
      <span className="md:col-span-2">{text}</span>
    </button>
  );
}

export default ButtonSquare1;
