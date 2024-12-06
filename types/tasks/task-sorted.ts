import { Task } from "@/types/tasks"

export type TaskSorted = {
	upcoming: Task[],
	past: Task[],
}
