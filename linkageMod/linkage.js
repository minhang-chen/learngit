(function(util){

	var oA="<a class='ss' href='javascript:;'></a>"

	function Linkage(url){
		this.url = url;
		this.menuBox = document.querySelector('.city-select-tab');
		this.menuBoxA = this.menuBox.querySelectorAll('a');
		this.oEvent = document.querySelector('.city-select-infor');
		this.oArea =  this.oEvent.querySelectorAll('div'); 
		this.province = document.querySelector('.province');
		this.city = document.querySelector('.city');
		this.county = document.querySelector('.county');
		this.txt=document.querySelector('.u-city-show');
		this.cityJson = {};
		this.provinceA;
		this.cityA;
		this.countyA;
		// var countyANumber;
		// var provinceIndex;
		// var cityIndex;
		// var cityShow;
		this.provinceShow;
	}

	util.extend(Linkage.prototype,{

		readData:function(){
			var xhr = util.createXHR();
			xhr.open('post',this.url,false);
			xhr.send(null);
			var cityJson ;
			if((xhr.status >= 200 &&　xhr.status < 300) || xhr.status == 304){
				this.cityJson= JSON.parse(xhr.responseText);
			}
		}, 

		_createNode:function(allCityJson,obj){
			var oDiv = document.createElement('div');
			for(var i = 0; i<allCityJson.length; i++){
				var oANode = util.html2Node(oA);
				oDiv.appendChild(oANode);
				oDiv.children[i].innerHTML=allCityJson[i].name
			}
			var oNode = oDiv.innerHTML;
			obj.innerHTML=oNode;
			// this.clickA = obj.querySelectorAll('a');
		},

		importData:function(){
			var _this = this;
			this._createNode(this.cityJson,this.province);
			this.provinceA = this.province.querySelectorAll('a');
			this.menuBox.onclick = function(ev){
				var ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if (target.nodeName.toLocaleLowerCase() == 'a') {
	            	var index;
	            	for(var i=0;i<_this.menuBoxA.length;i++){
	            		if(_this.menuBoxA[i]===target){
	            			index=i;

	            		}
	            	}
					_this._clickMenu(index);
	            }
			}
			this.province.onclick =function(ev){
				var ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if (target.nodeName.toLocaleLowerCase() == 'a') {
	            	var index;
	            	for(var i=0;i<_this.provinceA.length;i++){
	            		if(_this.provinceA[i]===target){
	            			index=i;
	            		}
	            	}
					_this._clickMenu(1);
					_this._handlerProvince(index)();

				}
				
			}
		},

		// _handlerProvince:function(i){
		// 	var _this = this;
		// 	return function(){

		// 		_this.txt.innerHTML = _this.provinceA[i].innerHTML;
		// 		_this.provinceShow = _this.txt.innerHTML;
		// 		_this._createNode(_this.cityJson[i].cell,_this.city);
		// 		_this.cityA = _this.city.querySelectorAll('a');
		// 		_this.city.onclick =function(ev){
		// 			var ev = ev || window.event;
		// 			var target = ev.target || ev.srcElement;
		// 			if (target.nodeName.toLocaleLowerCase() == 'a') {
		//             	var index;
		//             	for(var i=0;i<_this.cityA.length;i++){
		//             		if(_this.cityA[i]===target){
		//             			index=i;
		//             		}
		//             	}
		// 				_this._clickMenu(2);
		//             	_this._handlerCity(index)();
		// 			} 
					
		            	
		// 		}
		// 	}
		// },
		_handlerProvince:function(i){
			var _this = this;
			return function(obj,content,allCityJson){
				_this.txt.innerHTML = ''+_this.provinceA[i].innerHTML;
				_this.provinceShow = _this.txt.innerHTML;
				_this._createNode(_this.cityJson[i].cell,_this.city);
				_this.cityA = _this.city.querySelectorAll('a');
				_this.city.onclick =function(ev){
					var ev = ev || window.event;
					var target = ev.target || ev.srcElement;
					if (target.nodeName.toLocaleLowerCase() == 'a') {
		            	var index;
		            	for(var i=0;i<_this.cityA.length;i++){
		            		if(_this.cityA[i]===target){
		            			index=i;
		            		}
		            	}
						_this._clickMenu(2);
		            	_this._handlerCity(index)();
					} 	
				}
			}
		},

		_handlerCity:function(i){
			var _this = this;
			return function(){
				_this.txt.innerHTML =_this.provinceShow +"/" + _this.cityA[i].innerHTML;
				_this.cityShow = _this.txt.innerHTML;
				_this._createNode(_this.cityJson[i].cell[i].cell,_this.county);
				_this.countyA = _this.county.querySelectorAll('a');
				_this.county.onclick =function(ev){
					var ev = ev || window.event;
					var target = ev.target || ev.srcElement;
					if (target.nodeName.toLocaleLowerCase() == 'a') {
		            	var index;
		            	for(var i=0;i<_this.countyA.length;i++){
		            		if(_this.countyA[i]===target){
		            			index=i;
		            		}
		            	}
		            	_this._handlerCounty(index)();
					} 
					
				}
			}
		},

		_handlerCounty:function(i){
			var _this = this;
			return function(){
				_this.txt.innerHTML =_this.cityShow +"/" + _this.countyA[i].innerHTML;
			}
		},

		_clickMenu:function(index){
			for(var i = 0;i<this.menuBoxA.length;i++){
            	this.menuBoxA[i].classList.remove('after-click');
            	this.oArea[i].style.display = 'none';
            }
            this.menuBoxA[index].classList.add('after-click');
			this.oArea[index].style.display = 'block';
		}

	})
	window.Linkage = Linkage;
})(util);