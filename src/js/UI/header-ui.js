import { getElement } from "../utilities";
import toggleIcon from '../../assets/align-justify.svg';


export default function headerToggleMenuIcon() {
  const leftSidebar = getElement('leftSidebar');
  const mobilePopupBg = getElement('mobilePopupBg');

  const toggleMenu = getElement('ToggleMenu');
  toggleMenu.innerHTML = `<img src="${toggleIcon}" width="16px" alt="Toggle left menu icon">`;
  toggleMenu.onclick = () => {
    leftSidebar.classList.toggle('show-left-menu');
    mobilePopupBg.classList.toggle('dark-bg')
  }

  mobilePopupBg.onclick = () => {
    leftSidebar.classList.toggle('show-left-menu');
    mobilePopupBg.classList.toggle('dark-bg')
  }

  if (window.innerWidth >= 780) {
    leftSidebar.classList.add('show-left-menu')
  }
}
