import React, { FC, ReactNode } from 'react';

interface Props {
  boxKey: string;
  value?: string | number;
  icon: ReactNode;
  iconColor: string;
  boxBg: string;
}

const SmallContentBox: FC<Props> = ({
  boxKey,
  value,
  icon,
  iconColor,
  boxBg,
}) => {
  return (
    <article
      className="p-3 rounded-md flex items-center justify-between gap-4 min-w-[220px] cursor-pointer border-l-4"
      style={{ background: boxBg, borderLeftColor: iconColor }}
    >
      <div>
        <p className="mb-4 text-[1.4rem] font-bold">{value ?? '---'}</p>
        <p className="text-[.8rem]">{boxKey}</p>
      </div>

      <span
        style={{ color: iconColor }}
        className="text-[1.2rem] bg-white p-2 rounded-md w-[40px] h-[40px] grid place-content-center font-bold"
      >
        {icon}
      </span>
    </article>
  );
};

export default SmallContentBox;
