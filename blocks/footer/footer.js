import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Add classes to sections for styling (2 ribbons)
  const sections = footer.querySelectorAll(':scope > div');

  // Ribbon 1: Social Media
  if (sections.length >= 1) {
    sections[0].classList.add('footer-social');

    // Add icon support for social media links
    const socialList = sections[0].querySelector('ul');
    if (socialList) {
      socialList.querySelectorAll('a').forEach((link) => {
        const text = link.textContent.toLowerCase().trim();
        link.classList.add('social-link', `social-${text}`);
        // Create icon wrapper
        const icon = document.createElement('span');
        icon.classList.add('social-icon');
        icon.setAttribute('aria-label', link.textContent);
        link.textContent = '';
        link.appendChild(icon);
      });
    }
  }

  // Ribbon 2: Footer Links + Copyright
  if (sections.length >= 2) {
    sections[1].classList.add('footer-links-copyright');
  }

  block.append(footer);
}
