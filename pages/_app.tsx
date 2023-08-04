import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MouseEventHandler, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [contextMenuState, setContextMenuState] = useState({
    show: false,
    x: 0,
    y: 0,
    text: '',
  });

  // Create a function to handle the mouse up event
  const handleBookContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    // Get the selected text
    const highlightedText = window.getSelection()?.toString();

    // Trigger the action only if there are any selected text
    if (!!highlightedText) {
      /*
       *  You can take the position of where the event is fired
       *  to calculate the position of the context menu
       */
      const { pageX, pageY } = e;

      // do something with the selected text
      setContextMenuState({
        show: true,
        x: pageX,
        y: pageY,
        text: highlightedText,
      });
    } else {
      setContextMenuState({
        show: false,
        x: 0,
        y: 0,
        text: '',
      });
    }
  };

  return (
    /*
     * Put the function in the higher order element.
     * This allows the function to be called anywhere
     * after a text is highlighted
     */
    <div onMouseUp={handleBookContextMenu}>
      <Component {...pageProps} />
      {contextMenuState.show && (
        <ContextMenu
          x={contextMenuState.x}
          y={contextMenuState.y}
          text={contextMenuState.text}
        />
      )}
    </div>
  );
}

const ContextMenu = ({
  y,
  x,
  text,
}: {
  y: number;
  x: number;
  text: string;
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      {text}
    </div>
  );
};
