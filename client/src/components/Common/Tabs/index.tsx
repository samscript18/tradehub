'use client';
import { useSearchParams } from '@/lib/hooks/useSearchParams';
import { TabsDto } from '@/lib/@types';
import { cn } from '@/lib/utils/cn';
import React, { FC, useEffect, useState } from 'react';

interface Props {
  tabs: TabsDto[];
  onChangeTab?(tabIndex: number): void;
}

const Tabs: FC<Props> = ({ tabs, onChangeTab }) => {
  const [tab, setTab] = useState<number>(0);
  const { searchParams, setParam } = useSearchParams();

  useEffect(() => {
    if (searchParams.get('tab')) {
      const header = searchParams.get('tab');

      const tab = tabs.findIndex((t) => t.header === header);
      if (tab != -1) {
        setTab(tab);
      }
    }
  }, []);

  useEffect(() => {
    onChangeTab?.(tab);
    setParam('tab', tabs[tab].header);
  }, [tab]);

  return (
    <div className="mt-6">
      <header className="flex items-center overflow-x-scroll max-w-fit rounded-t-lg !m-0 !p-0">
        {tabs?.map((tabInfo, index) => {
          return (
            <p
              className={cn(
                'px-5 py-3 text-[.9rem] font-semibold cursor-pointer transition-all duration-300 bg-gray-100',
                index === tab
                  ? 'bg-secondary text-white'
                  : 'text-gray-700 hover:bg-secondary/5'
              )}
              key={index}
              onClick={() => setTab(index)}
            >
              {tabInfo?.header}
            </p>
          );
        })}
      </header>

      <div>{tabs[tab].widget}</div>
    </div>
  );
};

export default Tabs;
