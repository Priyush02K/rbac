import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Permissions from "./Permissions";  // Adjust the import according to your structure
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"; // For better assertions
import { permissions as mockPermissions } from "../Api/MockDatas";  // Mock permissions data if necessary

// Mock modules for modal and toast
jest.mock("../Modal/AddModal/AddPermissionModal", () => ({
  __esModule: true,
  default: () => <div>Mocked AddPermissionModal</div>,
}));

jest.mock("../Modal/EditModal/EditPermissionModal", () => ({
  __esModule: true,
  default: () => <div>Mocked EditPermissionModal</div>,
}));

describe("Permissions Component", () => {
  test("renders Permissions table correctly", () => {
    render(<Permissions />);

    // Check if the table headers are present
    expect(screen.getByText("Permission Table")).toBeInTheDocument();
    expect(screen.getByText("Permission")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("searches permissions correctly", async () => {
    render(<Permissions />);

    // Simulate user typing in the search box
    const searchInput = screen.getByPlaceholderText("Search permissions...");
    userEvent.type(searchInput, "admin");

    // Wait for the component to update and check the filtered result
    await waitFor(() => {
      expect(screen.getByText("admin")).toBeInTheDocument();
    });
  });

  test("filters permissions based on the dropdown", async () => {
    render(<Permissions />);

    // Simulate selecting a permission from the filter dropdown
    const filterSelect = screen.getByRole("combobox");
    userEvent.selectOptions(filterSelect, "Admin");

    // Wait for the component to update and check that the permissions are filtered
    await waitFor(() => {
      const filteredPermissions = screen.queryAllByText("Admin");
      expect(filteredPermissions.length).toBeGreaterThan(0);
    });
  });

  test("handles pagination correctly", async () => {
    render(<Permissions />);

    // Check pagination controls
    const nextPageButton = screen.getByText("2");
    userEvent.click(nextPageButton);

    // After clicking, verify the page number has changed
    await waitFor(() => {
      expect(screen.getByText("Page 2 of")).toBeInTheDocument();
    });
  });

  test("opens and closes the add permission modal", () => {
    render(<Permissions />);

    // Click on the Add Permission button (mocked modal here)
    const addPermissionButton = screen.getByText("Mocked AddPermissionModal");
    userEvent.click(addPermissionButton);

    // Check if modal is opened
    expect(screen.getByText("Mocked AddPermissionModal")).toBeInTheDocument();

    // Close the modal
    userEvent.click(screen.getByText("Mocked AddPermissionModal"));
    expect(screen.queryByText("Mocked AddPermissionModal")).not.toBeInTheDocument();
  });

  test("deletes a permission", async () => {
    render(<Permissions />);

    // Mock the Swal confirmation to auto-confirm the delete
    jest.spyOn(window, "Swal.fire").mockResolvedValue({ isConfirmed: true });

    // Find and click on the delete button for a permission
    const deleteButton = screen.getByText("Delete Selected");
    userEvent.click(deleteButton);

    // Wait for the deletion action
    await waitFor(() => {
      expect(screen.queryByText("admin")).not.toBeInTheDocument();
    });
  });

  test("shows a toast notification on successful add", async () => {
    render(
      <>
        <Permissions />
        <ToastContainer />
      </>
    );

    // Simulate adding a new permission
    const addPermissionButton = screen.getByText("Mocked AddPermissionModal");
    userEvent.click(addPermissionButton);

    // Check that a success toast message is displayed
    await waitFor(() => {
      expect(screen.getByText("Permission added successfully!")).toBeInTheDocument();
    });
  });
});
