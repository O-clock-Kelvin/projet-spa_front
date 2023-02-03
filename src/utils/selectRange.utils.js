import * as React from 'react';

export interface ITrackBackground {
    min: number;
    max: number;
    values: number[];
    colors: string[];
    direction?: Direction;
    rtl?: boolean;
  }


export function getTrackBackground({
    values,
    colors,
    min,
    max,
    direction = Direction.Right,
    rtl = false
  }: ITrackBackground) {
    if (rtl && direction === Direction.Right) {
      direction = Direction.Left;
    } else if (rtl && Direction.Left) {
      direction = Direction.Right;
    }
    // sort values ascending
    const progress = values.slice(0).sort((a, b) => a - b).map(value => ((value - min) / (max - min)) * 100);
    const middle = progress.reduce(
      (acc, point, index) =>
        `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
      ''
    );
    return `linear-gradient(${direction}, ${colors[0]} 0%${middle}, ${colors[colors.length - 1]
      } 100%)`;
  }