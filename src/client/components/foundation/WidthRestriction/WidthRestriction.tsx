import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const WidthRestriction: FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '1024px',
        padding: '0 16px',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};
