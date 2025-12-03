"use client";

interface Props {
  pHeight: number;
}

const Navbar = (props: Props) => {
  return (
    <header className="w-full shadow-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b border-amber-600/30">
      <nav
        className={`flex items-center justify-between px-4 md:px-8 py-${props.pHeight} text-lg md:text-2xl text-amber-50 font-serif tracking-wide`}
        style={{ height: `${props.pHeight * 16}px` }}
      >
        <span className="flex items-center gap-2 md:gap-3">
          <span
            role="img"
            aria-label="chef"
            className="text-2xl md:text-3xl filter drop-shadow-md"
          >
            👨‍🍳
          </span>
          <span className="truncate font-light">Culinary AI</span>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
