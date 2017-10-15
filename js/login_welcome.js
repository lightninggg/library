window.onload=function(){
 	
	 var users = JSON.parse(localStorage.getItem('users'));
	 var flag = JSON.parse(localStorage.getItem('flag'));	           
	      if(flag[0].user_flag)
	      {         
	          $('.main').hide();
	          $('#content').show();
	          $hello_text = $('<h1 id=\"hello_head\" style=\"text-align:center;\"></h1>');
	          $('#content').prepend($hello_text);
	          $('#hello_head').text("Hello , ");
	          $('#hello_head').append("<b><a href=\"user.html\">"+users[flag[0].user_cnt].name+"</a>"+"</b>");
	        }
 }