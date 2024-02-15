import { css } from '@emotion/css';

export const container = () => css`
  height: 56px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
`;

export const logo = () => css`
  display: flex;
`;

export const orderLink = () => css`
  display: flex;
  padding: 4px;
`;

export const signInButton = () => css`
  display: flex;
  height: 28px;
  background-color: gray;
`;
