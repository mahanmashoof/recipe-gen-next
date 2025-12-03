"use client";

import { portionQtyButton } from "@/styles/classNames";

interface IProps {
  portions: number;
  setPortions: React.Dispatch<React.SetStateAction<number>>;
}

function PortionsSelector(props: IProps) {
  const min = 1;
  const step = 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= min) {
      props.setPortions(val);
    }
  };

  const updateValue = (delta: number) => {
    props.setPortions((prev) => Math.max(min, prev + delta));
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <button
        type="button"
        onClick={() => updateValue(-step)}
        disabled={props.portions <= min}
        className={portionQtyButton}
        aria-label="Decrease portions"
      >
        –
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={props.portions}
        min={min}
        step={step}
        onChange={handleChange}
        className="w-14 md:w-16 h-9 md:h-10 text-center border-2 border-yellow-200 rounded-lg font-semibold text-sm md:text-base text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        required
        aria-label="Portion count"
      />
      <button
        type="button"
        onClick={() => updateValue(step)}
        className={portionQtyButton}
        aria-label="Increase portions"
      >
        +
      </button>
    </div>
  );
}

export default PortionsSelector;
