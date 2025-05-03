"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { format } from "date-fns";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegCalendar } from "react-icons/fa6";
import { DateRange as ReactDateRange } from "react-day-picker";
import useDropDown from "@/lib/hooks/useDropdown";
import { fadeToBottomVariant } from "@/lib/data/variants";
import { DateRange } from "@/lib/@types";
import SelectField from "../Inputs/select-field";
import { Calendar } from "../Shadcn/calender";

export type RangeProps = {
  selectOptions: { label: string; value: DateRange }[];
  select: DateRange;
  setSelect: React.Dispatch<React.SetStateAction<DateRange>>;
  customDate?: ReactDateRange;
  setCustomDate: React.Dispatch<
    React.SetStateAction<ReactDateRange | undefined>
  >;
};

type Props = RangeProps & React.HTMLAttributes<HTMLDivElement>;

const TableRange = ({
  selectOptions,
  className,
  setSelect,
  select,
  setCustomDate,
  customDate,
}: Props) => {
  const { dropdownRef, isOpen, toggleDropdown } = useDropDown();

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      <SelectField
        label=""
        options={selectOptions}
        data={selectOptions.find((option) => option.value === select)}
        placeholder="Today"
        onValueChange={(value: DateRange) => setSelect(value)}
        containerProps={{
          className: "min-w-28",
        }}
      />

      <AnimatePresence mode="wait">
        {select === "custom" && (
          <>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ width: 0 }}
              className="overflow-x-hidden"
              ref={dropdownRef}
            >
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "max-w-[300px] px-2",
                  !customDate && "text-muted-foreground"
                )}
                onClick={toggleDropdown}
              >
                <div className="flex items-center gap-1">
                  <FaRegCalendar className="mr-2 size-4" />
                  {customDate?.from ? (
                    customDate.to ? (
                      <p className="text-xs flex items-center gap-1">
                        <span>{format(customDate.from, "LLL dd, y")}</span>{" "}
                        <span>-</span>{" "}
                        <span>{format(customDate.to, "LLL dd, y")}</span>
                      </p>
                    ) : (
                      format(customDate.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </div>
              </Button>
            </motion.div>

            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  {...fadeToBottomVariant}
                  className="absolute top-full right-0 bg-white shadow-xl z-10"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={customDate?.from}
                    selected={customDate}
                    onSelect={setCustomDate}
                    numberOfMonths={2}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableRange;
