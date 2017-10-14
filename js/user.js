$('body').prepend('<div id="left_login"> <p style="font-size: 20px;">&nbsp;&nbsp;Hello,&nbsp;&nbsp;please&nbsp;&nbsp;<a href="./login.html">Login</a></p></div><div id="left_logout" style="display: none;"><p style="font-size: 20px;"><span id="hello">&nbsp;&nbsp;Hello,&nbsp;&nbsp;</span>&nbsp;&nbsp;<a href="" id="logout">Logout</a></p></div>');	
  var flag = JSON.parse(localStorage.getItem('flag'));
          $('#logout').click(function(){
              flag[0].user_flag = 0;
              flag[0].user_cnt = -1;
              localStorage.setItem('flag',JSON.stringify(flag));
            })
    
      if(flag[0].user_flag)
      {  
          var users = JSON.parse(localStorage.getItem('users'));
          $('#left_login').hide();
          $('#left_logout').css('display','inline');
          $('<b>' + '<a href="./user.html" style="font-style:italic;color:black;">'+users[flag[0].user_cnt].name+'</a>'+'</b>').insertAfter('#hello');
        }