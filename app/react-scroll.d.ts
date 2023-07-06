declare module 'react-scroll' {
    export interface ScrollOptions {
      smooth?: boolean;
      duration?: number;
    }
    export const Link: React.FC<any>;
    export const animateScroll: any;
    export function animateScroll(scrollOptions: ScrollOptions): void;
  
    export interface LinkProps {
      to: string;
      smooth?: boolean;
      duration?: number;
      offset?: number;
      spy?: boolean;
      activeClass?: string;
      className?: string;
      style?: React.CSSProperties;
      onSetActive?: (to: string) => void;
    }
  
    export class Link extends React.Component<LinkProps> {}
  }
  