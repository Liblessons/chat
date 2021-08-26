//import {Users} from 'Users.js';


class Chat{


	_msgForm = null;
	_btnForm = null;
	_requestURL = "https://liblessons.ru/ajax/chat/";

	constructor() {
		//this.postRequest({"data":123});
		
		
		this.init();
	}

	init(){

		let start_structure = `<div class="settings_wrap">
									<img src="" alt="" class="avatar">
									<i class="fas fa-comment-dots"></i>
									<i class="fas fa-address-book"></i>
									<i class="fas fa-cog"></i>

									<button class="exit">x</button>
								</div>
								<div class="contacts_wrap">
									
								</div>
								<div class="content_wrap">
									<div class="chat_wrap">
										<img src="" alt="" class="avatar">
										<i class="fas fa-paperclip"></i>
										<div class="chat">

										</div>

										<form action="/" class="msg_form">
											<textarea name="" id="" cols="30" rows="3"></textarea>
											<button type="button"><i class="fab fa-telegram-plane"></i></button>
										</form>
										
									</div>
									<div class="info_wrap">
										
									</div>
								</div>`;

		document.querySelector(".wrap").innerHTML = start_structure;


		//this.getRequest();
		this._msgForm = document.querySelector(".msg_form");
		this._btnForm = this._msgForm.querySelector("button");
		this._btnForm.addEventListener("click", ()=>{
			let msg = this._msgForm.querySelector("textarea");


			if(msg.value != ""){
				this.postRequest({"action": "set", "data" : {"id":1, "author": "Илья", "content": msg.value}});
			}
		})

		let exit = document.querySelector(".settings_wrap .exit");

		
		exit.addEventListener("click", function(){
			localStorage.removeItem('tooken');
			
			let user = new Users();
			user.render();
		})
	}



	getRequest(){
		let r = new XMLHttpRequest();
		r.addEventListener("load", ()=>{
			let posts = JSON.parse(r.response);
			//wrap_posts.append()
			this.render(posts);
		});

		r.open("GET", this._requestURL+"msg.php");
		r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		r.send();
	}



	postRequest(data){

		data = JSON.stringify(data);

		let r = new XMLHttpRequest();
		r.addEventListener("load", ()=>{
			let posts = JSON.parse(r.response);
			console.log(posts);
			//console.log(r.response);
			//wrap_posts.append()
		});

		r.open("POST", this._requestURL+"msg.php");
		r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		console.log(data);
		r.send(data);
	}



	render(data, template_id = "null"){
		let chat = document.querySelector(".chat");
		let content = "";
		data.forEach((value, key)=>{


			content += "<div class='msg user_id_"+value.id+"'><h2>"+value.author+"</h2>"+"<p>"+value.content+"</p></div>";
		});
		chat.innerHTML = content;
	}	

	render1(data, template_id = "null"){

	}
}
