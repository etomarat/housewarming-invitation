$(function() {
  $('.invitation').click(function(){
    $(this).addClass('active');
  });

  $('.login').click(function(){
    VK.Auth.login(function(response){
      console.log(response);
    });
  })
});
