			if(localStorage.getItem('users') === null){
					var users = [];

					users.push({"name":"admin","pass":"admin","identity":"manager"});
				
					localStorage.setItem('users',JSON.stringify(users));

				}
$('#signup').click(function(){
				saveInfo();
			})
	
			function saveInfo(){
				var username = document.getElementById('user').value;
				var password = document.getElementById('pasw').value;
				if(username == "" || password == ""){
					alert("Please fill in this form correctly !!");
					$('#sign_form').removeAttr('action');
					return false;
				}

				var user = {
					name: username,
					pass: password,
					borrow_cnt: 3,
	    			borrow_books: new Array()
				};

				{
					var users = JSON.parse(localStorage.getItem('users'));

					users.push(user);

					localStorage.setItem('users',JSON.stringify(users));

					alert("Sign up successfully!!");
								
				}	
				// e.preventDefault();

			}