import { CheckCircle2, RockingChairIcon } from 'lucide-react';
import React from 'react';

function FacilityCard({ children }: any) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-white w-fit p-2 md:p-4 rounded-md shadow-2xl">
      {/* <{children} className="w-6 h-6 md:w-12 md:h-12" /> */}
      {children}
      {/* <{yesnoIcon} className="text-green-700 w-4 md:w-6 " /> */}
      {/* {children} */}
    </div>
  );
}

export default FacilityCard;
