// submit form
const submitForm = () => {
  const chatInput = $(".chat-input").val();

  $("main").append(`
  <div class="chat-msg-box clint">
    <p>${chatInput}</p>
  </div>
  `);

  $.ajax({
    url: `./api/question/?q=${encodeURIComponent(chatInput)}`,
    method: "GET",
    cache: false,
    beforeSend: () => {
      $(".chat-input").val("");
      $(".typing").show();
      $("main").append(`
        <div class="chat-msg-box bot">
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
        `);
      if ($(".chat-msg-box").length >= 10) {
        $([document.documentElement, document.body]).animate({
          scrollTop: $(".chat-msg-box.bot:last-child").offset().top,
        }, { duration: 500 });
      }
    },
    success: (data) => {
      const response = (data.responseText).replace(/\n/gm, "</br>");
      $(".chat-msg-box.bot:last-child").html(`<p>${response}</p>`);
    },
    error: () => {
      $(".chat-msg-box.bot:last-child").remove();
    },
    complete: () => {
      $(".typing").hide();
    },
  });
};

window.onload = () => {
  setTimeout(() => {
    if (document.querySelectorAll(".chat-msg-box").length == 0) {
      $.ajax({
        url: "./api/welcome",
        beforeSend: () => {
          $(".typing").show();
          $("main").append(`
            <div class="chat-msg-box bot">
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div>
            `);
        },
        success: (data) => {
          const response = (data.responseText).replace(/\n/gm, "</br>");
          $(".chat-msg-box.bot:last-child").html(`<p>${response}</p>`);
        },
        error: () => {
          $(".chat-msg-box.bot:last-child").remove();
        },
        complete: () => {
          $(".typing").hide();
        },
      });
    }
  }, 3000);

  $.ajax({
    url: "./api/allquestions",
    success: (data) => {
      data.forEach((qus) => {
        $(".questions.container").append(`
        <div class="question">
          <p>${qus}</p>
        </div>
        `);
      });
    },
  });
};

const toogleShowSuggestions = () => {
  if ($("main").css("display") == "none") {
    $(".all-questions").hide();
    $("header img").attr("src", "./src/images/chat_icon.png");
    $("main").show();
    $("footer").show();
  } else {
    $(".all-questions").show();
    $("header img").attr("src", "./src/images/close.png");
    $("main").hide();
    $("footer").hide();
  }
};

$("#toogle-chat").on("click", () => {
  toogleShowSuggestions();
});

window.onresize = () => {
  if (window.innerHeight < 580) {
    $("header").css("top", "-4em");
  } else {
    $("header").css("top", "0vh");
  }
};

$("#chat-form").submit((e) => {
  e.preventDefault();
  submitForm();
});

const typed = new Typed(".chat-input", {
  strings: [
    "trang fanpage của các bạn ở đâu ",
    "bạn có rảnh không",
    "tôi muốn ủng hộ cho nhóm",
    "địa chỉ cửa hàng này ở đâu ",
    "bạn là ai"
  ],
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 1500,
  showCursor: true,
  cursorChar: "|",
  attr: "placeholder",
  loop: true,
  bindInputFocusEvents: false,
  shuffle: true,
});
