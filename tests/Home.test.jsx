import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "../pages/Home";
import '@testing-library/jest-dom';

jest.mock("axios");

const mockCountries = [
  {
    name: { common: "Canada" },
    cca3: "CAN",
    capital: ["Ottawa"],
    region: "Americas",
    population: 37742154,
    languages: { eng: "English", fra: "French" },
    flags: { png: "https://flagcdn.com/w320/ca.png" },
  },
];

describe("Home Page", () => {
  beforeEach(() => {
    localStorage.setItem("email", "test@example.com");
  });

  it("renders loading state initially and fetches countries", async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    render(<Home />);
    
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });
  });

  it("filters countries by region", async () => {
    axios.get.mockResolvedValue({ data: mockCountries });

    render(<Home />);
    await waitFor(() => screen.getByText("Canada"));

    fireEvent.change(screen.getByLabelText(/Filter Type/i), {
      target: { value: "region" },
    });

    fireEvent.change(screen.getByLabelText(/Select Region/i), {
      target: { value: "Americas" },
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/region/Americas");
    });
  });

  it("filters countries by language", async () => {
    axios.get.mockResolvedValue({ data: mockCountries });

    render(<Home />);
    await waitFor(() => screen.getByText("Canada"));

    fireEvent.change(screen.getByLabelText(/Filter Type/i), {
      target: { value: "language" },
    });

    fireEvent.change(screen.getByLabelText(/Select Language/i), {
      target: { value: "English" },
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/lang/English");
    });
  });

  it("searches for countries by name", async () => {
    axios.get.mockResolvedValue({ data: mockCountries });

    render(<Home />);
    await waitFor(() => screen.getByText("Canada"));

    fireEvent.change(screen.getByLabelText(/Search by name/i), {
      target: { value: "Canada" },
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/Canada");
    });
  });

  it("shows error message if API fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load country data/i)).toBeInTheDocument();
    });
  });
});
