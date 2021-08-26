


class Users{
	_windowEl = null;
	_requestURL = "https://liblessons.ru/ajax/chat/";

	constructor(){
		this.init();
	}

	init(){
		this._windowEl = document.querySelector(".window");

		let btn = this._windowEl.querySelectorAll("span.btn");

		btn.forEach((el)=>{
			
			el.addEventListener("click", ()=>{
				this._windowEl.classList.toggle("active");
			});
			
		});

		
		let authorization_btn = this._windowEl.querySelector(".authorization_btn");
		authorization_btn.addEventListener("click", (evt)=>{
			evt.preventDefault();
			this.authorization();
		})
	}

	authorization(){
		let authorization_form = this._windowEl.querySelector(".authorization form");
		

		let fields = authorization_form.querySelectorAll("input");


		let userData = {}


		fields.forEach((value, index)=>{
			if(value.value != ""){
				userData[value.getAttribute("type")] = value.value;
				userData.__proto__.lenght = ++index;
			}
		})

		// выполнить валидацию данных
		
		let url = 'https://liblessons.ru/ajax/chat/authorization.php';

		if(userData.__proto__.lenght == 2){

			this.postRequest(url, userData);
		}
		else{
			// заполнены не все поля
		}

		

		//this.postRequest(FD);

		// https://developer.mozilla.org/ru/docs/Learn/Forms/Sending_forms_through_JavaScript
	}
	registration(){

	}


	async postRequest(url, data){

		let response = await fetch(url, {
										  method: 'POST',
										  headers: {
										    'Content-Type': 'application/json;charset=utf-8'
										  },
										  body: JSON.stringify(data)
										});

		if (response.ok){

			let data = await response.json(); // читаем ответ в формате JSON

			console.log(data);
		}
	}

	validation(){

	}

}