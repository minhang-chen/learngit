var util = (function(){
	return {
		html2Node(template){
			var container = document.createElement('div');
			container.innerHTML = template;
			return container.children[0];
		},
		extend(o1,o2){
			for(var i in o2){
				if(o1[i] === undefined){
					o1[i] = o2[i];
				}
			}
		},
		removeNode(obj,length){
			if( length >0){
				for(var i = length - 1; i >= 0;i-- ){
					var citys=obj.childNodes;
					obj.removeChild(citys[i]);
				}
			}
		},
		createXHR(){
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
		},
		index(obj,obj2,index){
        	for(var i = 0; i<obj.length; i++){
        		if(obj[i] === obj2){
        			index=i;

        		}
        	}
        	console.log(index);
		}
	}
})()