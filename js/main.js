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

  // ====================== SHOW MENU ====================== //
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (burger) {
    burger.addEventListener('click', () => {
      if (nav) {
        nav.classList.toggle('active')
        burger.classList.toggle('open')
      }
    })
  }

  // ====================== REMOVE MENU WHEN CLICK LINKS ====================== //
  const links = document.querySelectorAll('.nav__link')
  const linkAction = () => {
    nav.classList.remove('active')
    burger.classList.remove('open')
  }
  links.forEach(link => {
    link.addEventListener('click', linkAction)
  })

  // ====================== ANIMATION FOR INTRO SECTION DECORS ====================== //
  const introSection = document.querySelector('.intro');
  introSection.addEventListener('mousemove', paralaxIntroDecors);
  
  function paralaxIntroDecors(e) {
      this.querySelectorAll('.animateItemIntro').forEach(item => {
        const speed = item.getAttribute('data-speed');

        const x = (window.innerWidth - e.pageX * speed) / 100; 
        const y = (window.innerHeight  - e.pageY  * speed) / 100; 

        item.style.transform = `translateX(${x}px) translateY(${y}px)`
      })
  }

  // ====================== ANIMATION FOR SKILLS ====================== //
  const html = document.querySelector('.skills__html');
  const css = document.querySelector('.skills__css');
  const js = document.querySelector('.skills__js');
  const skillsValue = document.querySelectorAll('.skills__value');
  // GET VALUES FROM SKILLS 
  let widthVal = [];
  skillsValue.forEach(function (i, width) {
    widthVal.push(i.innerHTML);
  });
  // SECTION SKILLS 
  const skillsSection = document.querySelector('#skills')
  // NEW METHOD FOR OBSERVE SECTION AND ADD SOME ANIMATION
  let skillsObserv = new IntersectionObserver(skillsCallBack, {threshold: 0.7});
  // FUNCTION FOR OBSERVE WHICH WILL DO ONLY ONCE
  function skillsCallBack(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return
      }
      html.style.cssText = `opacity: 1; width: ${widthVal[0]};`
      css.style.cssText = `opacity: 1; width: ${widthVal[1]};`
      js.style.cssText = `opacity: 1; width: ${widthVal[2]};`

      observer.unobserve(entry.target);
    })
  }
  // START OBSERVING OF SKILLS SECTION
  skillsObserv.observe(skillsSection);

});