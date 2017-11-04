var f = {
	    			user_flag:0,
	    			user_cnt:-1
	    		};
	    	if(localStorage.getItem('flag') === null)
	    	{	
	    		var flag = [];
	    		flag.push(f);
	    		localStorage.setItem('flag',JSON.stringify(flag));
			}
			
		{	
			$('#submit').click(function(){
				if(!localStorage.getItem('users')){
					alert("Please sign up first !!");
					return false;
				}
			var flag = JSON.parse(localStorage.getItem('flag'));
			var users = JSON.parse(localStorage.getItem('users'));
				for(var i=0;i<users.length;i++)
				{	
		    		//check
		    	
					if(document.getElementById('flag').value == users[i].name && document.getElementById('pasw').value == users[i].pass){
										flag[0].user_flag = 1;
										flag[0].user_cnt = i;
										break;
									}
				}
				if(flag[0].user_flag == 0 ){
										alert("Please sign in correctly !!");
						}
				localStorage.setItem('flag',JSON.stringify(flag));
				})

		}