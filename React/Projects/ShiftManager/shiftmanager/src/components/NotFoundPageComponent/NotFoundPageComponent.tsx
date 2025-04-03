import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPageComponent.module.css";

const NotFoundPageComponent: React.FC = () => {
  return (
    <div>
      <section className={styles.page_404}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.innerCol}>
                <div className={styles.four_zero_four_bg}>
                  <h1 className={styles.title}>404</h1>
                </div>

                <div className={styles.contant_box_404}>
                  <h3 className={styles.heading}>Look like you're lost</h3>
                  <p>The page you are looking for is not available!</p>

                  <Link to="/" className={styles.link_404}>
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPageComponent;
