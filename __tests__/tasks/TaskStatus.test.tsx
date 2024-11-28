import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import TaskStatus from "@/components/tasks/TaskStatus";
import { Task } from "@/types/tasks";

describe("TaskStatus", () => {
  const mockTask: Task = {
    id: "1",
    task_type: "Sample Task",
    date: new Date(),
    assignee: "John Doe",
    status: "TODO",
    cycle_id: "123",
  };

  const mockOnStatusChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the task status badge correctly", () => {
    render(<TaskStatus task={mockTask} onStatusChange={mockOnStatusChange} />);

    const statusBadge = screen.getByTestId("status-badge-1");
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveTextContent("TODO");
  });

  it("should toggle the dropdown open and closed when the status badge is clicked", async () => {
    render(<TaskStatus task={mockTask} onStatusChange={mockOnStatusChange} />);

    const statusBadge = screen.getByTestId("status-badge-1");

    fireEvent.click(statusBadge);
    await waitFor(() => {
      expect(screen.getByTestId("dropdown-done-1")).toBeInTheDocument();
    });

    fireEvent.click(statusBadge);
    await waitFor(() => {
      expect(screen.queryByTestId("dropdown-done-1")).not.toBeInTheDocument();
    });
  });

  it("should call onStatusChange and close the dropdown when a status is selected", async () => {
    render(<TaskStatus task={mockTask} onStatusChange={mockOnStatusChange} />);

    const statusBadge = screen.getByTestId("status-badge-1");
    fireEvent.click(statusBadge);

    await waitFor(() => {
      const dropdownOption = screen.getByTestId("dropdown-done-1");
      fireEvent.click(dropdownOption);
    });

    expect(mockOnStatusChange).toHaveBeenCalledWith("1", "DONE");
    await waitFor(() => {
      expect(screen.queryByTestId("dropdown-done-1")).not.toBeInTheDocument();
    });
  });

  it("should scope queries to specific TaskStatus instances", async () => {
    render(
      <div>
        <TaskStatus task={mockTask} onStatusChange={mockOnStatusChange} />
        <TaskStatus task={{ ...mockTask, id: "2", status: "DONE" }} onStatusChange={mockOnStatusChange} />
      </div>
    );

    const firstTask = within(screen.getByTestId("task-status-1"));
    fireEvent.click(firstTask.getByTestId("status-badge-1"));
    await waitFor(() => {
      expect(firstTask.getByTestId("dropdown-done-1")).toBeInTheDocument();
    });

    const secondTask = within(screen.getByTestId("task-status-2"));
    fireEvent.click(secondTask.getByTestId("status-badge-2"));
    await waitFor(() => {
      expect(secondTask.getByTestId("dropdown-todo-2")).toBeInTheDocument();
    });
  });

  it("should call onStatusChange with 'TODO' when the current status is 'DONE'", async () => {
    const taskWithDoneStatus = { ...mockTask, status: "DONE" };
    render(<TaskStatus task={taskWithDoneStatus} onStatusChange={mockOnStatusChange} />);
  
    const statusBadge = screen.getByTestId("status-badge-1");
    fireEvent.click(statusBadge);
  
    await waitFor(() => {
      const dropdownOption = screen.getByTestId("dropdown-todo-1");
      fireEvent.click(dropdownOption);
    });
  
    expect(mockOnStatusChange).toHaveBeenCalledWith("1", "TODO");
  });  
});