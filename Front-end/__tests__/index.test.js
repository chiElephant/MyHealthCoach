import { render, screen } from "@testing-library/react";
import Exercise from "../pages/exercise";
import React from "react";
// import Home from '../pages/index';

import "@testing-library/jest-dom";

// describe('Home', () => {
//   it('renders a heading', () => {
//     render(<Home />);

//     const heading = screen.getByRole('heading', {
//       name: /welcome to next\.js!/i,
//     });

//     expect(heading).toBeInTheDocument();
//   });
// });

// describe("Exercise", () => {
//   it("renders an exercise heading", () => {
//     render(<Exercise />);

//     const heading = screen.getByRole("heading", {
//       name: /exercise/i,
//     });

//     expect(heading).toBeInTheDocument();
//   });
// });

it("adding 1 + 1 returns 2", () => {
  const a = 1 + 1;
  expect(a).toBe(2);
});
