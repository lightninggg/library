var flag = JSON.parse(localStorage.getItem('flag'));
var users = JSON.parse(localStorage.getItem('users'));
 		if(flag[0].user_flag){
			$("<h1 class = \"text-success text-capitalize\" style=\"font-size:60px;text-align:center!important;\"><b>"+users[flag[0].user_cnt].name+"</b></h1>").prependTo('.one-column');
		 }
		