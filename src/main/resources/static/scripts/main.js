(function () {
  var Message, url;
  Message = function (arg) {
    (this.text = arg.text), (this.message_side = arg.message_side);
    this.draw = (function (_this) {
      return function () {
        var $message;
        $message = $($(".message_template").clone().html());
        $message.addClass(_this.message_side).find(".text").html(_this.text);
        if (_this.message_side === "left") {
          url = "/images/bot.png";
        } else {
          url = "/images/user.png";
        }
        $message.find(".avatar").css("background-image", "url(" + url + ")");
        $(".messages").append($message);
        return setTimeout(function () {
          return $message.addClass("appeared");
        }, 0);
      };
    })(this);
    return this;
  };
  $(function () {
    var getMessageText, sendMessage;
    getMessageText = function () {
      var $message_input;
      $message_input = $(".message_input");
      return $message_input.val();
    };
    sendMessage = function (text) {
      var $messages, message, responseMessage;
      if (text.trim() === "") {
        return;
      }
      $(".message_input").val("");
      $messages = $(".messages");
      message = new Message({
        text: text,
        message_side: "right",
      });
      message.draw();

      $.ajax({
        type: "POST",
        url: "/api/sendMessage",
        data: JSON.stringify({ message: text }),
        contentType: "application/json",
        success: function (response) {
          if (response.status === "Success") {
            responseMessage = response.message;
          } else {
            responseMessage = "Hata: Mesaj alınamadı.";
          }
          message = new Message({
            text: responseMessage,
            message_side: "left",
          });
          message.draw();
        },
        error: function () {
          responseMessage = "Hata: Mesaj alınamadı.";
          message = new Message({
            text: responseMessage,
            message_side: "left",
          });
          message.draw();
        },
      });
      return $messages.stop().animate({ scrollTop: $messages.prop("scrollHeight") }, 700);
    };
    $(".send_message").click(function () {
      return sendMessage(getMessageText());
    });
    $(".message_input").keyup(function (e) {
      if (e.which === 13) {
        return sendMessage(getMessageText());
      }
    });
    var message_greetings = new Message({
      text: "Merhaba! Ben TK Assistan, nasıl yardımcı olabilirim?",
      message_side: "left",
    });
    message_greetings.draw();
  });
}).call(this);
