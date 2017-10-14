var flag = JSON.parse(localStorage.getItem('flag'));
 		if(flag[0].user_flag){
			$("<h1 class = \"text-success text-capitalize\" style=\"font-size:70px;text-align:center;\">"+users[flag[0].user_cnt].name+"</h1>").appendTo('#head');
		 }
		