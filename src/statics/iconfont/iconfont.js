import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "iconfont"; /* Project id 2523397 */
  src: url('//at.alicdn.com/t/font_2523397_3v7k3nv989h.woff2?t=1620409197388') format('woff2'),
       url('//at.alicdn.com/t/font_2523397_3v7k3nv989h.woff?t=1620409197388') format('woff'),
       url('//at.alicdn.com/t/font_2523397_3v7k3nv989h.ttf?t=1620409197388') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`
//