"use strict";

function _slicedToArray(e, t) {
  return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest();
}
function _nonIterableRest() {
  throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _arrayLikeToArray(e, t);
  }
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _iterableToArrayLimit(e, t) {
  var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (null != r) {
    var n,
      o,
      a,
      i,
      s = [],
      c = !0,
      l = !1;
    try {
      if (a = (r = r.call(e)).next, 0 === t) {
        if (Object(r) !== r) return;
        c = !1;
      } else for (; !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t); c = !0);
    } catch (d) {
      l = !0, o = d;
    } finally {
      try {
        if (!c && null != r["return"] && (i = r["return"](), Object(i) !== i)) return;
      } finally {
        if (l) throw o;
      }
    }
    return s;
  }
}
function _arrayWithHoles(e) {
  if (Array.isArray(e)) return e;
}
var modal = document.querySelector(".modal"),
  overlay = document.querySelector(".overlay"),
  btnCloseModal = document.querySelector(".btn--close-modal"),
  btnsOpenModal = document.querySelectorAll(".btn--show-modal"),
  openModal = function e(t) {
    t.preventDefault(), modal.classList.remove("hidden"), overlay.classList.remove("hidden");
  },
  closeModal = function e() {
    modal.classList.add("hidden"), overlay.classList.add("hidden");
  };
btnsOpenModal.forEach(function (e) {
  return e.addEventListener("click", openModal);
}), btnCloseModal.addEventListener("click", closeModal), overlay.addEventListener("click", closeModal), document.addEventListener("keydown", function (e) {
  "Escape" !== e.key || modal.classList.contains("hidden") || closeModal();
});
var btnScrollTo = document.querySelector(".btn--scroll-to"),
  section1 = document.querySelector("#section--1"),
  section2 = document.querySelector("#section--2"),
  section3 = document.querySelector("#section--3"),
  sectionSignUp = document.querySelector(".section--sign-up");
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({
    behavior: "smooth"
  });
});
var tabs = document.querySelectorAll(".operations__tab"),
  tabsContainer = document.querySelector(".operations__tab-container"),
  tabsContent = document.querySelectorAll(".operations__content");
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  var t = e.target.closest(".operations__tab");
  t && (tabs.forEach(function (e) {
    return e.classList.remove("operations__tab--active");
  }), t.classList.add("operations__tab--active"), tabsContent.forEach(function (e) {
    return e.classList.remove("operations__content--active");
  }), document.querySelector(".operations__content--".concat(t.getAttribute("data-tab"))).classList.add("operations__content--active"));
});
var fadeFunc = function e(t, r) {
    if (t.target.classList.contains("nav__link")) {
      var n = t.target,
        o = n.closest(".nav__links").querySelectorAll(".nav__link"),
        a = n.closest(".nav").querySelector("img");
      o.forEach(function (e) {
        e !== n && (e.style.opacity = r);
      }), a.style.opacity = r;
    }
  },
  nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  return fadeFunc(e, .5);
}), nav.addEventListener("mouseout", function (e) {
  return fadeFunc(e, 1);
});
var header = document.querySelector(".header"),
  stickyNav = function e(t) {
    !1 === _slicedToArray(t, 1)[0].isIntersecting ? nav.classList.add("sticky") : nav.classList.remove("sticky");
  },
  headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: "-".concat(nav.offsetHeight, "px")
  });
headerObserver.observe(header);
var allSections = document.querySelectorAll(".section"),
  revealSection = function e(t, r) {
    var n = _slicedToArray(t, 1)[0];
    n.isIntersecting && (n.target.classList.remove("section--hidden"), r.unobserve(n.target));
  },
  sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: .15
  });
allSections.forEach(function (e) {
  sectionObserver.observe(e), e.classList.add("section--hidden");
});
var lazyImgs = document.querySelectorAll(".lazy-img"),
  revealImg = function e(t, r) {
    var n = _slicedToArray(t, 1)[0];
    n.isIntersecting && (n.target.src = n.target.getAttribute("data-src"), n.target.addEventListener("load", function () {
      return n.target.classList.remove("lazy-img");
    }), r.unobserve(n.target));
  },
  imgObserver = new IntersectionObserver(revealImg, {
    root: null,
    threshold: .8
  });
lazyImgs.forEach(function (e) {
  imgObserver.observe(e);
});
var sliderFunc = function e() {
  var t = document.querySelectorAll(".slide"),
    r = document.querySelector(".slider__btn--left"),
    n = document.querySelector(".slider__btn--right"),
    o = document.querySelector(".dots");
  t.forEach(function (e, t) {
    o.insertAdjacentHTML("beforeend", '<button class="dot" data-slide="'.concat(t, '"></button>'));
  });
  var a = function e(t) {
      document.querySelectorAll(".dot").forEach(function (e) {
        e.classList.remove("dot--active");
      }), document.querySelector('.dot[data-slide="'.concat(t, '"]')).classList.add("dot--active");
    },
    i = function e(r) {
      t.forEach(function (e, t) {
        e.style.transform = "translateX(".concat((t - r) * 100, "%)"), a(r);
      });
    };
  i(0);
  var s = 0,
    c = function e() {
      ++s > t.length - 1 && (s = 0), i(s);
    },
    l = function e() {
      --s < 0 && (s = t.length - 1), i(s);
    };
  n.addEventListener("click", c), r.addEventListener("click", l), document.addEventListener("keydown", function (e) {
    "ArrowLeft" === e.key ? l() : "ArrowRight" === e.key && c();
  }), o.addEventListener("click", function (e) {
    e.target.classList.contains("dot") && i(Number(e.target.getAttribute("data-slide")));
  });
};
sliderFunc();