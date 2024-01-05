import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeTaskStatus } from "../actions/submit";
import { Button } from "@/components/ui/button";

const value = ["To Do", "Doing", "Done"];
export const TaskStatusSelect = ({cisse}) => {
  const SelectElements = value.map((item) => (
    <SelectItem key={item} value={item}>
      {item}
    </SelectItem>
  ));
  return (
    <form action={changeTaskStatus}>
      <Select name="status">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="chose the status" />
        </SelectTrigger>
        <SelectContent>{SelectElements}</SelectContent>
      </Select>
      <input type="text" value={cisse.id} readOnly name="taskId" className="hidden"/>
      <div className="flex justify-end"><Button className='dark:bg-white dark:text-white mt-2 px-3'  type='submit'>save</Button></div>
      
    </form>
  );
};
