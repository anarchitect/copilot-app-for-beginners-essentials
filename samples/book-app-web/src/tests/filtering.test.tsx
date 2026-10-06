import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App, { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

afterEach(cleanup);

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "hobbit"
    });

    expect(results.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });

  it("trims and matches author searches without depending on letter case", () => {
    expect(filterBooks(books, { ...defaultFilters, searchTerm: "  TOLKIEN  " })
      .map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("returns every book for a whitespace-only search", () => {
    expect(filterBooks(books, { ...defaultFilters, searchTerm: "   " })).toEqual(books);
  });
});

describe("Book Collection filters", () => {
  it("updates cards and all stats from the visible unread fantasy books", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole("combobox", { name: "Status" }), "unread");
    await user.selectOptions(screen.getByRole("combobox", { name: "Genre" }), "Fantasy");

    expect(screen.getByRole("heading", { name: "1 books shown" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "The Night Circus" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "The Hobbit" })).toBeNull();
    const stats = within(screen.getByRole("region", { name: "Reading stats" }));
    for (const label of ["Total: 1", "Read: 0", "Unread: 1", "Favorites: 0", "Average rating: 4.0"]) {
      expect(stats.getByLabelText(label)).toBeTruthy();
    }
  });

  it("shows an empty state and restores results when search is cleared", async () => {
    const user = userEvent.setup();
    render(<App />);
    const search = screen.getByRole("searchbox", { name: "Search" });

    await user.type(search, "no-book-matches-this");
    const empty = within(screen.getByRole("status"));
    expect(empty.getByRole("heading", { name: /^No / })).toBeTruthy();
    expect(screen.getByLabelText("Total: 0")).toBeTruthy();
    expect(screen.getByLabelText("Average rating: 0.0")).toBeTruthy();

    await user.clear(search);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByRole("heading", { name: "12 books shown" })).toBeTruthy();
    expect(screen.getByLabelText("Total: 12")).toBeTruthy();
  });
});
