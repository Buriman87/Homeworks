import React, { JSX } from "react";
import { IMovieInterface } from "../interfaces/IMovieInterfaces";
import styles from "../styles/MovieComponent.module.css";

interface IMovieProps {
  Movies: IMovieInterface;
}
const ButtonClick = (Movies: IMovieInterface) => {
  console.log(Movies);
};
const MovieComonent: React.FC<IMovieProps> = (props): JSX.Element => {
  const { Movies } = props;
  return (
    <>
      <div>
        <h3>Titlu:{Movies.name}</h3>
        <div className={styles.div}>
          Date of Apperance: {Movies.dateOfAppearance}
        </div>
        <div>Description: {Movies.description}</div>
        <div>
          <button
            onClick={() => {
              ButtonClick(Movies);
            }}
          >
            buna
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieComonent;
