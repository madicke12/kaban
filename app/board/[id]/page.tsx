import { PrismaClient } from "@prisma/client";
import Navbar from "@/app/components/navbar";
import TaskModal from "@/app/components/taskmodal";


const boardPage = async ({ params: params  }:any) => {
  const prisma = new PrismaClient();
  const id = params.id;
 
  const Board =  await prisma.board.findUnique({
    where: { id },
    include: {
      columns: { include: { Task: { include: { Subtasks: true } } } },
    },
  });

  return (
    <>
      <Navbar boardName={Board?.name} id={id} />
      <main className="flex w-full h-full overflow-y-scroll overflow-x-auto mt-3  p-3">
        {Board?.columns.map((column, index) => (
          <div
            key={column.id}
            className="ml-3 flex flex-col flex-shrink-0 w-[280px] rounded-md  p-2"
          >
            <span
              className={`mb-4 rounded-xl w-fit px-1 font-bold ${
                column.name === "Done" ? "bg-green-800" : null
              } ${column.name === "To Do" ? "bg-sky-800" : null} ${
                column.name === "Doing" ? "bg-yellow-800" : null
              }`}
            >{`${column.name} (${column.Task.length})`}</span>

            {column.Task.map((item) => (
            <TaskModal key={item.id} madicke={item}/>
            ))}
          </div>
        ))}
      </main>
      
    </>
  );
};

export default boardPage;
