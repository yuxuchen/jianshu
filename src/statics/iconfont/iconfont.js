import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "iconfont"; /* Project id 2523397 */
  src: url('//at.alicdn.com/t/font_2523397_ardy9jpfk5p.woff2?t=1619982643701') format('woff2'),
       url('//at.alicdn.com/t/font_2523397_ardy9jpfk5p.woff?t=161998264370') format('woff'),
       url('//at.alicdn.com/t/font_2523397_ardy9jpfk5p.ttf?t=1619982643701') format('truetype');
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