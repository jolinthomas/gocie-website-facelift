console.log(window.innerWidth);
console.log(window.innerHeight);
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const goToTop = document.getElementById('go-to-top');
  if (scrollY > viewportHeight * 0.89) {
    goToTop.style.visibility = 'visible';
  } else {
    goToTop.style.visibility = 'hidden';
  }
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const hero = document.getElementById('hero');
  const fixedNav = hero.querySelector('.nav-bottom-fixed');
  if (scrollY > viewportHeight * 0.85) {
    fixedNav.style.display = 'flex';
  } else {
    fixedNav.style.display = 'none';
  }
});

const smoothScrollElements = document.querySelectorAll('.smooth-scroll');
smoothScrollElements.forEach((element) => {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    const target = document.querySelector(
      event.target.closest('a').getAttribute('href'),
    );
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const company = document.getElementById('company');
setInterval(() => {
  company.style.textShadow = '0 0 10px var(--secondary-theme-lighter)';
}, 700);
setInterval(() => {
  company.style.textShadow = 'none';
}, 1400);

const details = document.querySelectorAll('#faqs details');
details.forEach((det) => {
  det.addEventListener('toggle', () => {
    if (det.open) {
      const detContent = det.querySelector('.details-content');
      detContent.classList.add('animate');
      det.style.border = '2px solid var(--primary-theme)';
      const divider = document.createElement('hr');
      divider.classList.add('custom-hr');
      det.insertBefore(divider, det.firstChild);
      const caret = det.querySelector('.details-status');
      caret.style.transform = 'rotate(-180deg)';
    } else {
      const detContent = det.querySelector('.details-content');
      detContent.classList.remove('animate');
      det.style.border = '1px solid var(--primary-theme)';
      const divider = det.querySelector('hr');
      det.removeChild(divider);
      const caret = det.querySelector('.details-status');
      caret.style.transform = 'rotate(0)';
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const details = document.querySelectorAll('#faqs details');
  let incrementPointer = 5.9;
  let numberInversion = 1;
  details.forEach((det) => {
    if (scrollY > viewportHeight * incrementPointer) {
      if (numberInversion === 1) {
        det.style.visibility = 'visible';
        det.classList.add('sweeper-left');
        numberInversion -= 1;
      } else {
        det.style.visibility = 'visible';
        det.classList.add('sweeper-right');
        numberInversion += 1;
      }
    }
    incrementPointer += 0.1;
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const features = document.querySelectorAll('#features .feature');
  let incrementPointer = 0.4;
  // let numberInversion = true;
  features.forEach((feat) => {
    const fLeft = feat.querySelector('.f-left');
    const fRight = feat.querySelector('.f-right');
    if (scrollY > viewportHeight * incrementPointer) {
      // console.log(numberInversion);
      fLeft.style.visibility = 'visible';
      fLeft.classList.add('sweeper-left-feat');
      fRight.style.visibility = 'visible';
      fRight.classList.add('sweeper-right-feat');
    }
    incrementPointer += 0.6;
  });
});

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-control');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }
  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });
    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  setCurrentState(direction) {
    if (direction.className === 'gallery-control-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        document.createElement('button'),
      ).className = `gallery-control-${control}`;
      // document.querySelector(`.gallery-control-${control}`).innerHTML = control;
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

const activeCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls,
);

activeCarousel.setControls();
activeCarousel.useControls();
