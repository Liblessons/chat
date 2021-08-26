


class Users{
	_windowEl = null;
	_requestURL = "https://liblessons.ru/ajax/chat/";

	constructor(){
		
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


			let user = this.authorization();
			

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

			localStorage.setItem('tooken', data.tooken);
			console.log(localStorage.getItem('tooken'));
			
			if("tooken" in data){
				
				// отрисовываем чат
				new Chat();

			}
		}
	}

	render(){
		let start_structure = `<div class="wrap_window">
									<div class="window">
										<div class="authorization">
											<h2>Liblessons <span>Chat</span></h2>
											<img src="images/default.svg">
											<h3>Вход</h3>
											<form id="authorization_form">
												<input type="email" name="email" placeholder="e-mail" value="ipoletuev@mail.ru">
												<input type="pass" name="pass" placeholder="pass" value="123">
												<button class="authorization_btn" type="button">Войти</button>
											</form>
											<p>Нет учётной записи? нажмите 
											<span class="btn">Зарегистрироваться</span></p>
										</div>
										<div class="registration">
											<h2>Liblessons <span>Chat</span></h2>
											<h3>Регистрация</h3>

											<p>Уже есть учётная запись? нажмите 
											<span class="btn" type="button">Войти</span></p>
										</div>
									</div>
								</div>`;

		document.querySelector(".wrap").innerHTML = start_structure;
	}

	validation(){

	}

}