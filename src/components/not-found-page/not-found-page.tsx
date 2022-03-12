import React from 'react';
import { Link } from 'react-router-dom';
import baseStyles from '../app/app.module.css';
import customStyles from './not-found-page.module.css'

const styles = {...baseStyles, ...customStyles}

export const NotFoundPage = () => (
    <div className={styles.pageWrapper}>
        <h1 className={styles.loadingTitle}>Page not found.</h1>
        <Link to="/" className={styles.link} data-testid="home-link">
                <h2 className={styles.linkTitle}>
                  Back to home
                </h2>
              </Link>
    </div>
)