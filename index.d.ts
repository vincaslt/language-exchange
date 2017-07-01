declare module "*.jpg" {
  const value: any
  export = value
}

// TODO: temporary declarations until PR is merged
declare module "react-fontawesome" {
  import * as React from 'react';
  export = FontAwesome;
  declare namespace FontAwesome {
    type FontAwesomeSize = 'lg' | '2x' | '3x' | '4x' | '5x';
    type FontAwesomeStack = "1x" | "2x";
    type FontAwesomeFlip = "horizontal" | "vertical";

    interface FontAwesomeProps {
      ariaLabel?: string;
      border?: boolean;
      className?: string;
      cssModule?: any;
      fixedWidth?: boolean;
      flip?: FontAwesomeFlip;
      inverse?: boolean;
      name: string;
      pulse?: boolean;
      rotate?: number;
      size?: FontAwesomeSize;
      spin?: boolean;
      stack?: FontAwesomeStack;
      tag?: string;
    }
  }
  declare class FontAwesome extends React.Component<FontAwesome.FontAwesomeProps> {}
}
