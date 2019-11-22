function Cart(){
	if(getCookie("cartData")){
		this.cartData = JSON.parse(getCookie("cartData"));
	}else{
		this.cartData = {};
	}
	
}
Cart.prototype.addData = function(id,num,ter){
	//id 商品id  num 购买的数量  ter是最终值还是累加值
	
	if(ter || !this.cartData[id]){
		this.cartData[id] = num;
	}else{
		this.cartData[id] += num;
	}
	
	setCookie("cartData",JSON.stringify(this.cartData),7);
}
Cart.prototype.showList = function(){
	this.cartList = document.getElementById("cartList");
	let prodDatas = JSON.parse(unescape(getCookie("prodDatas")));
	let str = "";
	for(let id in this.cartData){
		console.log(id);
		str += `
			<li>
				<input type="checkbox" class="ch">
				<img src="img/${prodDatas[id].imgsrc}">
				<span class="fir">${prodDatas[id].title}</span>
				<span class="price">${prodDatas[id].price}</span>
				<span class="minus">-</span>
				<input type="text" class="txt" value="${this.cartData[id]}">
				<span class="plus">+</span>
				<span class="perPrice">${prodDatas[id].price*this.cartData[id]}</span>
				<span class="delBtn" data-id="${id}"><button>删除</button></span>
			</li>
			<br>
		`;
	}
	this.cartList.innerHTML = str;
	
	

}

Cart.prototype.optMethod = function(){
	this.aMinus = document.getElementsByClassName("minus");
	this.aTxt = document.getElementsByClassName("txt");
	this.aPlus = document.getElementsByClassName("plus");
	this.aDelBtn = document.getElementsByClassName("delBtn");
	this.aPerPrice = document.getElementsByClassName("perPrice");
	this.aPrice = document.getElementsByClassName("price");
	this.checkAll = document.getElementById("checkAll");
	this.checkList = document.getElementsByClassName("ch");
	let _this = this;
	
	for(let i = 0; i < this.aMinus.length; i++){
		
		this.aMinus[i].onclick  = ()=>{
			this.aTxt[i].value--;
			if(this.aTxt[i].value<1){
				this.aTxt[i].value=1
			}
			this.update(i);
			this.getTotalPrice();
			
		}
		this.aPlus[i].onclick  = ()=>{
		
			this.aTxt[i].value++;
			this.update(i);
			this.getTotalPrice();
			
		}
		this.aTxt[i].onchange  = ()=>{
			this.update(i);
			this.getTotalPrice();
		}
		
		this.checkList[i].onclick = ()=>{
				let count = 0;
				for(let j = 0; j < this.checkList.length; j++){
					if(this.checkList[j].checked){
						count++;
					}
				}
				if(count===this.checkList.length){
					this.checkAll.checked = true;
				}else{
					this.checkAll.checked = false;
				}
				
				this.getTotalPrice();
			}
		
		
		
	}
	
	//全选
		
	this.checkAll.onclick = ()=>{
		for(let i = 0; i < this.checkList.length; i++){
			this.checkList[i].checked = this.checkAll.checked;
		}
		this.getTotalPrice();
	}
}


Cart.prototype.update = function(i){
	//数据的变化
	let id = this.aDelBtn[i].getAttribute("data-id");
	let num = Number(this.aTxt[i].value);
	this.addData(id,num,true);
	
	//单个总价的变化
	this.aPerPrice[i].innerText = this.aPrice[i].innerText * num;
}

Cart.prototype.getTotalPrice = function(){

		//总价的计算
		this.oTp = document.getElementById("totalPrice")
	
		let totalPrice = 0;
		
		for(let i = 0; i < this.checkList.length; i++){
			if(this.checkList[i].checked){
				console.log(this.aPerPrice[i].innerText);
				totalPrice += Number(this.aPerPrice[i].innerText);
			}
		}
		
		this.oTp.innerText = totalPrice;
			
	
		
}


Cart.prototype.removeData = function(){
	
	let aDelBtns = this.cartList.getElementsByClassName("delBtn");
	
	let _this = this;//用_this取保存实例对象
	
	for(let i = 0; i < aDelBtns.length; i++){
		aDelBtns[i].onclick = function(){
			
			console.log(_this.checkList.length);
			//this指向点击的删除按钮
			
			//移除DOM对象
			_this.cartList.removeChild(this.parentNode);
			//删除数据，存cookie
			let id = this.getAttribute("data-id");
			
			delete _this.cartData[id];
			
			setCookie("cartData",JSON.stringify(_this.cartData),7);
			
			_this.getTotalPrice();
			
			//location.reload();
			_this.optMethod();
			
		}
	}
}
