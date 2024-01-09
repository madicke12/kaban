

import { Menubar } from '@/components/ui/menubar'
import { ModeToggle } from "./mode-toggle"
import AddNewTask from "./addNewTask"
import Profile from '@/components/ui/profile'



export default async function Navbar({boardName ,id}:any) {

  return (
    <Menubar
      className="flex px-3 py-4 w-full rounded-lg h-20 "
     
    >
      <div className="flex-1">s
        <span className="text-xl">{boardName}</span>
      </div>
      <div className="flex items-center gap-2">
        <AddNewTask id={id}/>
        <ModeToggle />
        <Profile/>
      </div>
    </Menubar>
  );
}
