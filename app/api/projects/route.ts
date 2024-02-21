import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const { project } = await request.json();

    const newProject = await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        totalBudget: project.totalBudget,
        startDate: project.startDate,
        endDate: project.endDate,
        isCompleted: project.isCompleted,
        isImportant: project.isImportant,
        userId: userId,
        tasks: {
          createMany: {
            data: project.tasks,
          },
        },
      },
    });
    return NextResponse.json(newProject);
  } catch (error) {
    console.log("Error creating the Project");
    console.log(error);

    return NextResponse.json({
      error: "Error Creating the Project",
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        tasks: true,
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.log("Error getting the Projects");
    return NextResponse.json({
      error: "Error getting the Projects",
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.project.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
