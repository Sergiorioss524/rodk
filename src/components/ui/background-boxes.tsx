"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rowCount = 80;
  const colCount = 60;
  const rows = new Array(rowCount).fill(1);
  const cols = new Array(colCount).fill(1);
  const colors = React.useMemo(
    () => [
      "#dc2626", // red-600
      "#ef4444", // red-500
      "#f87171", // red-400
      "#fca5a5", // red-300
      "#fecaca", // red-200
      "#b91c1c", // red-700
      "#991b1b", // red-800
      "#7f1d1d", // red-900
      "#fee2e2", // red-100
    ],
    [],
  );
  const getHoverColor = React.useCallback(
    (rowIndex: number, colIndex: number) => {
      const seed = (rowIndex * colCount + colIndex) * 13;
      return colors[seed % colors.length];
    },
    [colors, colCount],
  );

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-slate-700"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getHoverColor(i, j),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-slate-700"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
