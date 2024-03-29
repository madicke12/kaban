import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import CheckTask from "./checktask";
import { TaskStatusSelect } from "./taskStatusSelect";

const TaskModal = ({ madicke }:any) => {
  //console.log(madicke.Subtasks)
  return (
    <Dialog>
      <DialogTrigger>
        <Card className=" w-[270px] h-fit">
          <CardHeader className="text-left p-2 ">
            <span className="text-xl ">{madicke.titre}</span>
          </CardHeader>
          <CardContent className="text-left  w-[270px] p-2">
            <span className="mb-2 text-slate-400 w-full">
              {madicke.description.slice(0,40)+'...'}
            </span>
            <p>0 of 3 task</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{madicke.titre}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <span>Subtask {madicke.Subtasks.length} </span>

          {madicke.Subtasks.map((cisse:any) => (
            <CheckTask key={cisse.id} cisse={cisse} />
          ))}
          <div className=" px-1 mt-2  items-center">
            <span>Current status</span>
           <TaskStatusSelect cisse={madicke}/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
