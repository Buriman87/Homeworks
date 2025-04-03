import React, { JSX } from "react";
import { IMovieInterface } from "../interfaces/IMovieInterfaces";
import { movies } from "../utils/movies-data";
import MovieComonent from "./MovieComponent";
const moviesData: IMovieInterface[] = movies;

const ListComponets: React.FC = (): JSX.Element => {
  return (
    <>
      {moviesData.map((el) => (
        <MovieComonent key={el.id} Movies={el} />
      ))}
    </>
  );
};

export default ListComponets;
