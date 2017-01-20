/*
*创建XHR对象
*/
function createXHR(){
	if(typeof XMLHttpRequest != 'undefined'){
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject !="undefined"){
		if(typeof arguments.callee.activeXString != "string"){
			var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
				i,len;
				for(i=0,len=versions.length;i<len;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					}catch(ex){
						//跳过
					}
				}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	}else{
		throw new Error("No XHR object available.");
	}
}


var xhr = createXHR();
xhr.open('post','Citys.json',false);
xhr.send(null);
var cityJson ;
if((xhr.status >= 200 &&　xhr.status < 300) || xhr.status == 304){
	cityJson= JSON.parse(xhr.responseText);
}


/*
*获取索引值
*/
function index(current,obj){
	for(var i =0;i<obj.length;i++){
		if(obj[i]==current){
			return i;
		}
	}
	
}


function extend(o1, o2){
	for(var i in o2){
		if(!o1[i]){
			o1[i] = o2[i];
		}
	}
	return o1;
}


var menuBox = document.querySelector('.city-select-tab');
var menuBoxA = menuBox.querySelectorAll('a');
var oEvent = document.querySelector('.city-select-infor');
var oArea =  oEvent.querySelectorAll('div'); 
var province = document.querySelector('.province');
var city = document.querySelector('.city');
var county = document.querySelector('.county');
var txt=document.querySelector('.u-city-show');
var provinceA;
var cityA;
var cityANumber;
var countyANumber;
var provinceIndex;
var cityIndex;
var cityShow;
var countyShow;
function remove(obj,length){
	if( length >0){
		for(var j = length - 1; j >= 0;j-- ){
			var citys=obj.childNodes;
			obj.removeChild(citys[j]);
		}
	}
}

function clearClass(){
	for(var j=0;j<menuBoxA.length;j++){
			menuBoxA[j].classList.remove('after-click');
			oArea[j].style.display ='none';
		}
}


function handler(i){
	return function(){
		var index1 = i;
		provinceIndex = i;
		txt.innerHTML = provinceA[index1].innerHTML;
		cityShow = txt.innerHTML;
		remove(city,cityANumber);
		for(var j = 0; j<cityJson[index1].cell.length; j++){
			city.appendChild(oANode(oA));
			cityA = city.querySelectorAll('a');
			cityANumber = cityA.length;
		}
		for(var k = 0; k<cityA.length; k++){
			cityA[k].innerHTML = cityJson[index1].cell[k].name;
		}
		for(var l = 0;l<cityANumber; l++){
			cityA[l].addEventListener('click',handlerCity(l));
		}
		clearClass();
		menuBoxA[1].classList.add('after-click');
		oArea[1].style.display = 'block';
	}
}

function handlerCity(i){
	return function(){
		var index1 = i;
		cityIndex = i;
		txt.innerHTML =cityShow +'/'+cityA[index1].innerHTML;
		countyShow= txt.innerHTML;
		remove(county,countyANumber);
		for(var j = 0; j<cityJson[provinceIndex].cell[index1].cell.length; j++){
			county.appendChild(oANode(oA));
			countyA = county.querySelectorAll('a');
			countyANumber = countyA.length;
		}
		for(var k = 0; k<countyA.length; k++){
			countyA[k].innerHTML = cityJson[provinceIndex].cell[index1].cell[k].name;
		}
		for(var l = 0;l<countyANumber; l++){
			countyA[l].addEventListener('click',handlerCounty(l));
		}
		clearClass();
		menuBoxA[2].classList.add('after-click');
		oArea[2].style.display = 'block';
	}
}

function handlerCounty(i){
	return function(){
		var index1 = i;
		cityIndex = i;
		txt.innerHTML =countyShow +'/'+countyA[index1].innerHTML;
	}
}

function Linkage(){

}

var oA="<a class='ss' href='javascript:;'></a>"

function oANode(oA){
	var container = document.createElement('div');
	container.innerHTML = oA;
	return container.children[0];
}


extend(Linkage.prototype,{

	clickMenu:function(){
		for(var i=0;i<menuBoxA.length;i++){
			menuBoxA[i].onclick = function(){
				clearClass();
				this.classList.add('after-click');
				oArea[index(this,menuBoxA)].style.display = 'block';
			}
		}	
	},
	importData:function(){
		for(var i = 0; i<cityJson.length; i++){
			province.appendChild(oANode(oA));
			provinceA=province.querySelectorAll('a');
		}
		for(var i = 0; i<provinceA.length; i++){
			provinceA[i].innerHTML = cityJson[i].name;
			// provinceA[i].addEventListener('click', handler(i));
		}
	
		oEvent.onclick = function(ev){
			var ev = ev || window.event;
			var target = ev.target || ev.srcElement;
			if (target.nodeName.toLocaleLowerCase() == 'a') {
				var that=target;
            	var index;
            	for(var i=0;i<provinceA.length;i++){
            		if(provinceA[i]===target){
            			index=i;
            			handler(i)();
            		}
            	}
					
			} 
		}
	}
})