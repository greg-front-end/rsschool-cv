window.addEventListener('DOMContentLoaded', () => {

  // ====================== ANIMATION SECTION ====================== //
  document.querySelector('.intro__right').classList.add('anim-section-x');
  document.querySelector('.intro__left').classList.add('anim-section-x');

  // OBSERVE SECTION AND ADD SOME ANIMATION
  const observSections = (selectorSection, selectorTitle, selectorItemLeft = false, selectorItemRight = false) => {
    const getSection = document.querySelector(selectorSection);
    let sectionObserv = new IntersectionObserver(sectionCallBack, {threshold: 0.4});
    // FUNCTION FOR OBSERVE WHICH WILL DO ONLY ONCE
    function sectionCallBack(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return
        }
        if (selectorTitle) {
          document.querySelector(selectorTitle).classList.add('anim-section-y');
        }
        if (selectorItemLeft) {
          document.querySelectorAll(selectorItemLeft).forEach(item => item.classList.add('anim-section-x'));
        }
        if (selectorItemRight) {
          document.querySelectorAll(selectorItemRight).forEach(item => item.classList.add('anim-section-x'));
        }
        observer.unobserve(entry.target);
      })
    }
    sectionObserv.observe(getSection);
  }
  // Observ About section
  observSections('.skills', '.title__skills');
  // Observ Hire me section
  observSections('.hire', '.hire__title', '.hire__left', '.hire__right');

});