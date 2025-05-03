'use client';

interface Props {
  type?: 'full' | 'small';
  size?: number;
}

const SpinLoader = ({ type = 'full', size = 80 }: Props) => {
  return type === 'full' ? (
    <div className="fixed flex items-center justify-center w-full h-full z-[1000]">
      <div
        className="animate-spin border-8 border-primary/5 border-t-primary rounded-full"
        style={{ width: size, height: size }}
      ></div>
    </div>
  ) : (
    <div>
      <div
        className="animate-spin border-8 border-primary/5 border-t-primary rounded-full"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default SpinLoader;
