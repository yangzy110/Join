$(function() {
    $('#doc-prompt-toggle').on('click', function() {
      $('#my-prompt').modal({
        relatedElement: this,
        onConfirm: function(data) {
        },
        onCancel: function() {
        }
      });
    });
    $('#doc-prompt-toggle-nickname').on('click', function() {
        $('#my-prompt-nickname').modal({
          relatedElement: this,
          onConfirm: function(data) {
          },
          onCancel: function() {
          }
        });
      });
      $("#newpw1").focus(function(){
        $("#newpw1").removeClass("errors");
        $("#newpw2").removeClass("right");
        $(".error1").css("display","none");
        $(".floatTip1").css("display","block");
      });
      var judge1 = true;
      var judge2=true;
      var pw1;
      $("#newpw1").blur(function(){
        $(".floatTip1").css("display","none");
        reg1=/^.*[\d]+.*$/;
        reg2=/^.*[A-Za-z]+.*$/;
            reg3=/^.*[_@#%&^+-/*\/\\]+.*$/;//验证密码
            var pw=$("#newpw1").val();
            pw1=pw;
            if(pw==""){
              $("#newpw1").addClass("errors");
              $(".error1").html("密码不能为空");
              $(".error1").css("display","block");
              judge1=false;
            }else if(pw.length>16||pw.length<8){
              $("#newpw1").addClass("errors");
              $(".error1").html("密码应为8-16个字符，区分大小写");
              $(".error1").css("display","block");
              judge1=false;
            }else if(!((reg1.test(pw))&&(reg2.test(pw))&&(reg3.test(pw)))){
              $("#newpw1").addClass("errors");
              $(".error1").html("需要包含数字、字母、符号三种类型");
              $(".error1").css("display","block");
              judge1=false;
            }else{
              judge1=true;
            }
      });
      $("#newpw2").focus(function(){
        $(this).removeClass("errors");
        $(this).removeClass("right");
        $(".error2").css("display","none");
      });
      $("#newpw2").blur(function(){
        var pw=$(this).val();
        if(pw!=pw1||pw==""){
          $(this).addClass("errors");
          $(".error2").html("密码不一致");
          $(".error2").css("display","block");
          judge2=false;
        }else{
          judge2=true;
        }
      });
  });