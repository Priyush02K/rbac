import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // For routing
import Dashboard from "../Dashboard";  // Adjust the path based on where the component is located
import { users, roles, permissions } from "../Api/MockDatas";  // Mock data import

// Mocking the external data
jest.mock("../Api/MockDatas", () => ({
  users: [
    { id: 1, status: "Active" },
    { id: 2, status: "Inactive" },
    { id: 3, status: "Active" },
  ],
  roles: [
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
  ],
  permissions: [
    { id: 1, name: "Read" },
    { id: 2, name: "Write" },
  ],
}));

describe("Dashboard", () => {
  // Test case 1: Check if the component renders without crashing
  test("renders Dashboard component", () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Check if the dashboard title is rendered
    expect(screen.getByText(/Overall Data/i)).toBeInTheDocument();
  });

  // Test case 2: Check if the total users count is correctly displayed
  test("displays the correct total users count", async () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Wait for the component to update and show the totals
    await waitFor(() => expect(screen.getByText("Total Users")).toBeInTheDocument());

    // Assert that the total number of users (3) is displayed
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // Test case 3: Check if the total roles count is correctly displayed
  test("displays the correct total roles count", async () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Wait for the component to render the roles count
    await waitFor(() => expect(screen.getByText("Roles")).toBeInTheDocument());

    // Assert that the roles count (2) is displayed
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  // Test case 4: Check if the total permissions count is correctly displayed
  test("displays the correct total permissions count", async () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Wait for the component to render the permissions count
    await waitFor(() => expect(screen.getByText("Permissions")).toBeInTheDocument());

    // Assert that the permissions count (2) is displayed
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  // Test case 5: Check if the active users count is correctly displayed
  test("displays the correct active users count", async () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Wait for the component to render the active users count
    await waitFor(() => expect(screen.getByText("Active Users")).toBeInTheDocument());

    // Assert that the active users count (2) is displayed
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  // Test case 6: Check if the links are rendered and clickable
  test("renders links and navigates correctly", () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Check if the links are in the document
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Roles")).toBeInTheDocument();
    expect(screen.getByText("Permissions")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();

    // Optionally, you can also check if clicking on a link redirects correctly
    fireEvent.click(screen.getByText("Total Users"));
    expect(window.location.pathname).toBe("/users");
  });
});
