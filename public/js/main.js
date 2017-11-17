$(function() {
  $('.invitation').click(function(){
    $(this).addClass('active');
  });

  $('.login').click(function(){
    VK.Auth.login(function(response){
      const user = {
        firstName: response.session.user.first_name,
        lastName: response.session.user.last_name,
        id: response.session.user.id,
        fullName: response.session.user.first_name + ' ' + response.session.user.last_name
      }
      $('.TextHolder').text('Мы ждем тебя, '+user.firstName+ '!')
      VK.Api.call('users.get', {
        user_ids: user.id,
        fields: ['photo_max']
      }, function(r) {
        if(r.response) {
          user.photo = r.response[0].photo_max
        }
        $.post(
          '/db',
          {
            id: user.id,
            name: user.fullName,
            photo: user.photo
          },
          function(r) {
            console.log(r);
          }
        );
      });
    });
  })
});
