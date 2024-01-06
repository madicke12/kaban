"use server";
import { PrismaClient } from "@prisma/client";
import { promise, z } from "zod";
import { revalidatePath } from 'next/cache'

const BoardSchema = z.object({
    name: z.string(),
    userId: z.string(),
    columns: z.array(z.unknown()),
});

const TaskSchema = z.object({
    description: z.string(),
    titre: z.string(),
    columnId: z.string(),
    Subtasks: z.array(z.unknown()),
});


export const submit = async (formdata: FormData): Promise<void> => {
    const prisma = new PrismaClient();

    const columnsString = formdata.get("columns");
    const name = formdata.get("boardName");
    const userId = formdata.get("userId");

    if (!columnsString || !name || !userId) {
        console.error('Missing required form data.');
        return;
    }

    const columns = JSON.parse(columnsString.toString());

    const data = {
        name: name,
        userId: userId,
        columns,
    };

    console.log(columns);

    try {
        const parsedData = BoardSchema.parse(data);

        if (parsedData) {
            await prisma.board.create({
                data: {
                    ...parsedData,
                    columns: {
                        create: data.columns.map((item: { name: string }) => ({ name: item.name })),
                    },
                },
                include: {
                    columns: true,
                },
            });
        }
    } catch (err) {
        console.log(err);
    } finally {
        await prisma.$disconnect();
    }
};


export const createTask = async (formdata:FormData):Promise<void> => {
    let columnId;
    const prisma = new PrismaClient();
    const subtaskStrings = formdata.get("subtasks")
    const titre = formdata.get("taskName");
    const currentStatus = formdata.get("status");
    const description = formdata.get("description");
    const boardColumnStrings = formdata.get("columns");

    if(!subtaskStrings || !boardColumnStrings || !currentStatus){
        return
    }
    const Subtasks = JSON.parse(subtaskStrings.toString()).map(
        (item:any) => item.value
      );
    const boardColumns = JSON.parse(boardColumnStrings.toString())
    boardColumns.forEach((element:any) => {
        if (element.name === currentStatus) columnId = element.id;
    });

    const data = {
        description,
        titre,
        currentStatus,
        Subtasks,
        columnId,
    };
    console.log(data);
    try {
        const parsedData = TaskSchema.parse(data);
        parsedData &&
            (await prisma.task.create({
                data: {
                    ...parsedData,
                    currentStatus,
                    Subtasks: {
                        create: parsedData.Subtasks.map((item) => ({
                            name: item,
                            isDone: false,
                        })),
                    },
                },
            }));
    } catch (err) {
        console.log(err);
    }
};

export const checkSubtask = async (formdata:FormData):Promise<void> => {
    const prisma = new PrismaClient();
    const subtaskId = formdata.get("subtaskId");
    console.log(subtaskId);
    if(!subtaskId)return
    try {
        await prisma.subtask.update({
            where: { id: subtaskId },
            data: { isDone: true },
        });
    } catch (err) {
        console.log(err);
    }
};
export const deleteBoard = async (formdata:FormData):Promise<void> => {
    const boardId = formdata.get("id");
    const prisma = new PrismaClient();

    try {
        const boardToDelete = await prisma.board.findUnique({
            where: { id: boardId },
            include: {
                columns: {
                    include: {
                        Tasks: {
                            include: {
                                Subtasks: true,
                            },
                        },
                    },
                },
            },
        });

        if (!boardToDelete) {
            console.error(`Board with ID ${boardId} not found.`);
            return;
        }

        await Promise.all(
            boardToDelete.columns.map(async (column) =>
                column.Tasks.map(async (task) => {
                    await Promise.all(
                        task.Subtasks.map(async (subtask) => {
                            await prisma.subtask.delete({
                                where: { id: subtask.id },
                            });
                        })
                    );
                    await prisma.task.delete({
                        where: { id: task.id },
                    });
                })
            )
        );
        await Promise.all(
            boardToDelete.columns.map(async (column) => {
                await prisma.column.delete({ where: { id: column.id } });
            })
        );
        await prisma.board.delete({
            where: { id: boardId },
        });
        // revalidatePath('/board', 'layout');
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
};

export const changeTaskStatus = async (FormData) => {
    const prisma = new PrismaClient();
    const taskid = FormData.get("taskId");
    const statusName = FormData.get("status");

    try {
        await prisma.task.update({
            where: { id: taskid },
            data: {
                currentStatus: statusName,
            },
        });
        revalidatePath('/board', 'layout')
    } catch (err) {
        console.log(err);
    }
    console.log(taskid, statusName);
};
