/*function ajax(type,url,data,fn){
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//封装的这个函数的使用者可能传get也可能传GET，所以统一转成小写或者大写
	//数据的形式是key1=val1&key2=val2
	//实际在开发时数据通常的表示形式是{key1:val1,key2:val2}
	//数据格式的转换
	//{username:"john",age:20}=>'username=john&age=20';
	
	var str = '';
	
	for(var i in data){
		str += i+"="+data[i]+"&";
	}
	
	str = str.replace(/&$/,"");
	
	if(type.toLowerCase()=="get"){
		xhr.open("GET",url+"?"+str,true);
		xhr.send();
	}
	
	if(type.toLowerCase()=="post"){
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
				var data = xhr.responseText;
				fn(data);
			}
		}
	}
	
}
*/

function ajax(obj){
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var str = '';
	
	for(var i in obj.data){
		str += i+"="+obj.data[i]+"&";
	}
	
	str = str.replace(/&$/,"");
	
	if(obj.type.toLowerCase()=="get"){
		if(str==""){
			xhr.open("GET",obj.url,true);
		}else{
			xhr.open("GET",obj.url+"?"+str,true);
		}
		
		xhr.send();
	}
	
	if(obj.type.toLowerCase()=="post"){
		xhr.open("POST",obj.url,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
				var data = xhr.responseText;
				obj.fn(data);
			}
		}
	}
}
