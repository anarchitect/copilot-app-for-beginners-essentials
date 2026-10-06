import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getReadingStats, ReadingStats } from "../components/ReadingStats";
import { books } from "../data/books";

describe("ReadingStats", () => {
  it("counts read, unread, and favorite books from the provided list", () => {
    const stats = getReadingStats(books);

    expect(stats.totalCount).toBe(12);
    expect(stats.readCount).toBe(7);
    expect(stats.unreadCount).toBe(5);
    expect(stats.favoriteCount).toBe(7);
  });

  it("renders the favorite count so the stats regression scenario is easy to spot", () => {
    render(<ReadingStats books={books} />);

    const stats = screen.getByRole("region", { name: /reading stats/i });
    expect(within(stats).getByText("Favorites")).toBeTruthy();
    expect(within(stats).getByLabelText("Favorites: 7")).toBeTruthy();
  });

  it("counts unread favorites and averages only the supplied subset", () => {
    const unread = books.filter((book) => !book.isRead);
    expect(getReadingStats(unread)).toEqual({
      totalCount: 5,
      readCount: 0,
      unreadCount: 5,
      favoriteCount: 2,
      averageRating: 4.2
    });
  });

  it("returns zero counts and a finite average for an empty list", () => {
    expect(getReadingStats([])).toEqual({
      totalCount: 0,
      readCount: 0,
      unreadCount: 0,
      favoriteCount: 0,
      averageRating: 0
    });
  });
});
