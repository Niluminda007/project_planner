import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await prisma.task.deleteMany({
      where: {
        projectId: id,
      },
    });
    await prisma.project.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Project Deleted Successfully" });
  } catch (error) {
    console.log("ERROR Deleteting the Project: ", error);
    return NextResponse.json({
      error: "Error Deleteing the project",
      status: 500,
    });
  }
}
