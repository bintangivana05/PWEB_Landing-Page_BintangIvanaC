$(document).ready(function () {

  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();
    let viewportBottom = scrollTop + $(window).height();

    $("#mainNav").toggleClass("scrolled", scrollTop > 50);

    let scrollPos = scrollTop + 100;
    $(".nav-link").each(function () {
      let ref = $($(this).attr("href"));
      if (
        ref.length &&
        ref.position().top <= scrollPos &&
        ref.position().top + ref.height() > scrollPos
      ) {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
      }
    });

    $(".skill-bar").each(function (i) {
      let el = $(this),
        elTop = el.offset().top,
        elBottom = elTop + el.outerHeight();
      if (elBottom > scrollTop && elTop < viewportBottom) {
        setTimeout(() => {
          el.addClass("animated");
          el.find(".progress-bar").css("width", el.find(".progress-bar").data("width") + "%");
        }, i * 200);
      }
    });

    $(".education-card").each(function (i) {
      let el = $(this),
        elTop = el.offset().top,
        elBottom = elTop + el.outerHeight();
      if (elBottom > scrollTop && elTop < viewportBottom) {
        setTimeout(() => el.addClass("show"), i * 150);
      }
    });

    $(".card").each(function () {
      if ($(this).offset().top < viewportBottom - 100) {
        $(this).css({ opacity: "1", transform: "translateY(0)" });
      }
    });

    $("#scrollTopBtn").fadeToggle(scrollTop > 300);
 
    $(".hero-content").css("transform", "translateY(" + scrollTop * 0.3 + "px)");
  });

  $(".nav-link, .smooth-scroll").on("click", function (e) {
    e.preventDefault();
    let target = $(this).attr("href");
    if ($(target).length) {
      $("html, body").animate({ scrollTop: $(target).offset().top - 70 }, 800);
      $(".navbar-collapse").collapse("hide");
    }
  });

  $("#scrollTopBtn").click(() => $("html, body").animate({ scrollTop: 0 }, 800));

  $(".project-card").hover(
    function () {
      $(this).find(".project-icon i").addClass("animate__animated animate__pulse");
    },
    function () {
      $(this).find(".project-icon i").removeClass("animate__animated animate__pulse");
    }
  );

  $("#contactForm").submit(function (e) {
    e.preventDefault();
    let form = $(this),
      name = form.find('[name="name"]').val(),
      submitBtn = form.find('button[type="submit"]'),
      originalText = submitBtn.html();

    submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...').prop("disabled", true);

    setTimeout(() => {
      form.before(`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Terima kasih, ${name}!</strong> Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      `);
      form[0].reset();
      submitBtn.html(originalText).prop("disabled", false);
      setTimeout(() => $(".alert").fadeOut("slow", function () { $(this).remove(); }), 5000);
    }, 1500);
  });

  $(".card").css({ opacity: "0", transform: "translateY(30px)", transition: "all 0.6s ease" });

  $("footer p").html(`© ${new Date().getFullYear()} Dibuat oleh Bintang Ivana Cholida 💙`);

  $(window).on("load", () => $("body").css("opacity", "0").animate({ opacity: 1 }, 500));

  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(el => new bootstrap.Tooltip(el));

  let imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        obs.unobserve(img);
      }
    });
  });
  document.querySelectorAll("img[data-src]").forEach(img => imgObserver.observe(img));

  function typeWriter(el, text, speed = 100) {
    let i = 0;
    el.html("");
    (function type() {
      if (i < text.length) {
        el.append(text.charAt(i++));
        setTimeout(type, speed);
      }
    })();
  }

  console.log("%c Portfolio Website Loaded Successfully! ", "background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 10px; font-size: 14px; font-weight: bold;");
  console.log("Created by Bintang Ivana Cholida\nUsing: HTML, CSS, JavaScript, jQuery, Bootstrap 5");
});
