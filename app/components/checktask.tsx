'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from 'react';
import { checkSubtask } from "../../lib/actions/actions";

interface CheckTaskProps {
  cisse: {
    id: string;
    name: string;
  };
}

const CheckTask = ({ cisse  }:CheckTaskProps) => {
  const [isChecked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!isChecked);
    const form = document.getElementById('samaForm') as HTMLFormElement  ;
    form.requestSubmit();
  };

  return (
    <form action={checkSubtask} id="samaForm">
      <div
        className="hover:bg-slate-800 bg-zinc-600 rounded-sm px-1 mt-2 flex items-center"
        onClick={handleClick}
      >
        <Input
          className="w-[17px] mr-2"
          type="checkbox"
          id="task"
          checked={isChecked}
          value={cisse.id}
          name='subtaskId'
          readOnly
        />
        <Label htmlFor="task">{cisse.name}</Label>
      </div>
    </form>
  );
};

export default CheckTask;
