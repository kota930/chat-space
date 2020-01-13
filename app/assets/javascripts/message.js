$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="chat" data-message-id=${message.id}>
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
          <img src=${message.image} >
        </div>`
      return html
    } else {
      var html =
        `<div class="chat" data-message-id=${message.id}>
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
        </div>`
  return html;
    };
  }
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
      $('.main_chat-body').append(html);      
      $('form')[0].reset();
      $('.main_chat-body').animate({ scrollTop: $('.main_chat-body')[0].scrollHeight});
      $(".send_btn").prop('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});