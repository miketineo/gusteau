import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

function ResultList({
  results
}) {
  
  return (
    <div>

  <ImageList
    sx={{ width: 800, height: 300
 }}
    variant="quilted"
    cols={2}
    rowHeight={121}
  >
      <ImageListItem key="Subheader" cols={8}>
        <ListSubheader component="div">Recipes</ListSubheader>
      </ImageListItem>
      { Array.isArray(results) && results.map((item) => (

        <ImageListItem key={item.id}>
          { console.log(`Printing: ${item.title}`) }
          <img
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.image}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

export default ResultList;
