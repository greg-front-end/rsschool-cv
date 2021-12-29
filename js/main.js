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

  // ====================== FILTER FOR PORTFOLIO GALLERY ====================== //
  function filter() {
    const filter = document.querySelector('.portf__filter-list'),
          filterBtns = document.querySelectorAll('.portf__filter-btn'),
          cards = document.querySelectorAll('.portf__card');

    function hideCards(category, items) {
        items.forEach(item => {
            const isItemFiltered = !item.classList.contains(category),
                  isShowAll = category.toLowerCase() === 'all';
            if (isItemFiltered && !isShowAll) {
                item.classList.add('anim');
            } else {
                item.classList.remove('anim');
                item.classList.remove('hide');
            }
        });
    }
    // remove all active btn in filter 
    function remActiveBtn () {
      filterBtns.forEach(btn => btn.classList.remove('portf__filter-btn--active'))
    }
    // add active style for btn which clicked
    function showActiveBtn(btn) {
      btn.classList.add('portf__filter-btn--active');
    }

    filterBtns.forEach(btn => {
        const isFiltered = btn.dataset.filter;
        btn.addEventListener('click', (e) => {
          const clickBtn = e.target;
            if (isFiltered) {
                remActiveBtn()
                showActiveBtn(clickBtn)
                hideCards(isFiltered, cards);
            }
        });
    });
    
    cards.forEach(card => {
        card.ontransitionend = function() {
            if (card.classList.contains('anim')) {
                card.classList.add('hide');
            }
        };
    });
  }
  filter();

   /*==================== DARK LIGHT THEME ====================*/ 
   const themeButton = document.getElementById('theme-btn');
   const darkTheme = 'dark-theme';
   const iconTheme = 'ri-sun-line';
 
   // Previously selected topic (if user selected)
   const selectedTheme = localStorage.getItem('selected-theme');
   const selectedIcon = localStorage.getItem('selected-icon');
 
   // We obtain the current theme that the interface has by validating the dark-theme class
   const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
   const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-contrast-2-fill' : 'ri-sun-line';
 
   // We validate if the user previously chose a topic
   if (selectedTheme) {
     // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
     document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
     themeButton.classList[selectedIcon === 'ri-contrast-2-fill' ? 'add' : 'remove'](iconTheme);
   }
 
   // Activate / deactivate the theme manually with the button
   themeButton.addEventListener('click', () => {
       // Add or remove the dark / icon theme
       document.body.classList.toggle(darkTheme);
       themeButton.classList.toggle(iconTheme);
       // We save the theme and the current icon that the user chose
       localStorage.setItem('selected-theme', getCurrentTheme());
       localStorage.setItem('selected-icon', getCurrentIcon());
   });

});