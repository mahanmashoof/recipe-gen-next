"use client";

interface Props {
  pHeight: number;
}

const Navbar = (props: Props) => {
  return (
    <header className="w-full shadow-lg bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600">
      <nav
        className={`flex items-center justify-between px-4 md:px-8 py-${props.pHeight} text-lg md:text-2xl text-yellow-900 font-bold`}
        style={{ height: `${props.pHeight * 16}px` }}
      >
        <span className="flex items-center gap-2 md:gap-3">
          <span role="img" aria-label="chef" className="text-2xl md:text-3xl">
            👨‍🍳
          </span>
          <span className="truncate">Recipe Generator</span>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
