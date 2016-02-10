/**
 * Created by praba on 2/10/2016.
 */
(function() {
  Polymer({
    is: "webcomponent-service",
    ready:function()
    {
    },
    urlService:function(){
      this.$.webcomponentreadajax.generateRequest();
    },
    webcomponentreadResponse:function(e)
    {
      var arr=e.detail.response;
      //Binding labels to login-card
      document.querySelector('login-card').user_name=arr[0].username;
      document.querySelector('login-card').pass_word=arr[0].password;
    },
    errorreadResponse:function(e){
      var arr=e.detail.response;
      //Binding error messages to login-card
      document.querySelector('login-card').username_error=arr[0].username;
      document.querySelector('login-card').password_error=arr[0].password;
    }
  });
})();
