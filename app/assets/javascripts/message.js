$(function(){
  var buildHTML = function(message){
    if (message.content && message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="chat">
            <div class="chat__info">
              <div class="chat__info--name">
                ${message.user_name}
              </div>
              <div class="chat__info--time">
                ${message.created_at}
              </div>
            </div>
            <div class="chat__message">
              <p class="chat-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image}, class="chat-message__image">
          </div>
        </div>`
    } else if(message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="chat">  
            <div class="chat__info">
                <div class="chat__info--name">
                  ${message.user_name}
                </div>
                <div class="chat__info--time">
                  ${message.created_at}
                </div>
              </div>
              <div class="chat__message">
                <img src=${message.image}, class="chat-message__image" >
            </div>
          </div>
        </div>`
    } else if (message.content) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="chat">
            <div class="chat__info">
              <div class="chat__info--name">
                ${message.user_name}
              </div>
              <div class="chat__info--time">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-message">
              <p class="chat-message__content">
                ${message.content}
              </p>
            </div>
          </div>
        </div>`
      };
      return html;
    };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.main_chat-body').animate({ scrollTop: $('.main_chat-body')[0].scrollHeight});
      $(".send_btn").prop('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  var reloadMessages = function(){
    last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        console.log("E");
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.main_chat-body').animate({ scrollTop: $('.main_chat-body')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".send-btn").prop("disabled", false);
      }
    })
    .fail(function(){
      console.log('failed');
    });
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});