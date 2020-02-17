import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import DIRECTORY_DATA from "./directory.data";
import './Directory.scss';

const Directory = () => {
  return (
      <div className='directory-menu'>
        {
          DIRECTORY_DATA.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
          ))
        }
      </div>
  );
};

export default Directory;