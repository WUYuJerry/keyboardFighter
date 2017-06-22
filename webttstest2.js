document.write('<div id="ttswrapper"><select id="ttsspeaker"><option value=0>---語者---</option><option value="Bruce">Bruce</option><option value="Theresa">Theresa</option><option value="Angela">Angela</option></select><select id="ttsvol"><option value=0>---音量---</option><option value="100">大</option><option value="50">中</option><option value="0">小</option></select><select id="ttsspeed"><option value=0>---速度---</option><option value="10">快</option><option value="0">普通</option><option value="-10">慢</option></select><select id="ttseffect" onchange="optionSelect(this);"><option value=0>---效果---</option><option value="0&0&5">正常韻律</option><option value="0&2&5">外國人</option><option value="0&1&5">機器人</option><option value="other">韻律調整</option></select>音高準位(-10~10)<input type="text" id="pitchLevel" name="pitchLevel" disabled value=0>音高方向(&emsp;0~ 2)<input type="text"  id="pitchSign" name="pitchSign" disabled value=0>音高振幅(&ensp; 0~20)<input type="text"  id="pitchScale" name="pitchScale" disabled value=5><textarea id="ttstext">請輸入文字內容</textarea><span id="ttsmedia"></span><button id="ttssubmit" type="button">送出</button></div>');
document.write('<style>#ttswrapper *{margin:0;padding:0;}#ttswrapper{position:relative;width:200px;height:255px;border:1px solid black;padding:5px;margin:0;}#ttswrapper textarea{width:190px;height:60px;}#ttswrapper button{float:left;width:40px;}#ttsmedia{width:160px;height:30px;overflow:hidden;float:left;}#ttsmedia audio{width:160px;clear:both;}#ttswrapper input{width:58px;margin:0 0 0 10px;} #ttswrapper select{width:195px;}</style>');

	document.getElementById("ttssubmit").onclick=t2s;
	function t2s(){
        document.getElementById("ttsmedia").innerHTML="";
	    document.getElementById("ttssubmit").disabled=true;
		var speaker=document.getElementById("ttsspeaker").value;
		var vol=document.getElementById("ttsvol").value;
		var speed=document.getElementById("ttsspeed").value;
		var effect=document.getElementById("ttseffect").value;
		var text=document.getElementById("ttstext").value;
		var pitchLevel=document.getElementById("pitchLevel").value;
		var pitchSign=document.getElementById("pitchSign").value;
		var pitchScale=document.getElementById("pitchScale").value;
        if(text.length>250){
            alert("字數請少於250字(含標點符號)!\n目前字數:"+text.length);
            return;
        }
		if(speaker==0){
			//alert("請選擇語者");
            document.getElementById("ttsspeaker").options[1].selected = true;
		}
		if(vol==0){
			document.getElementById("ttsvol").options[1].selected = true;
		}
		if(speed == 0){
			document.getElementById("ttsspeed").options[2].selected = true;
		}
        if(effect == 0){
            document.getElementById("ttseffect").options[1].selected = true;
        }
        if(pitchLevel<-10){
            document.getElementById("pitchLevel").value=-10;
            pitchLevel=-10;
        }
        if(pitchLevel>10){
            document.getElementById("pitchLevel").value=10;
            pitchLevel=10
        }
        if(pitchSign<0){
            document.getElementById("pitchSign").value=0;
            pitchSign=0;
        }
        if(pitchSign>2){
            document.getElementById("pitchSign").value=2;
            pitchSign=2
        }
        if(pitchScale<0){
            document.getElementById("pitchScale").value=0;
            pitchScale=0;
        }
        if(pitchScale>20){
            document.getElementById("pitchScale").value=20;
            pitchScale=20
        }
        //document.getElementById("ttsmedia").innerHTML="請稍等..";
        var itritts= new TTS();
        itritts.PlayerSet.hidden=false;
		if(!pitchLevel && !pitchSign && !pitchScale){
			itritts.ConvertCustom('id:ttstext','ttsmedia',speaker,vol,speed,0,0,5);
		}else{
			itritts.ConvertCustom('id:ttstext','ttsmedia',speaker,vol,speed,pitchLevel,pitchSign,pitchScale);
		}
        //document.getElementById("ttssubmit").disabled=false;
        interval = setTimeout(
            function(){
                if(document.getElementById("ttsmedia").childNodes.length>0){
                    document.getElementById("ttssubmit").disabled=false;
										getSrc();
                }

            }
            ,5000
        );

	}
	function optionSelect(obj){
		if(obj.value=="other"){
			document.getElementById("pitchLevel").disabled=false;
			document.getElementById("pitchSign").disabled=false;
			document.getElementById("pitchScale").disabled=false;
		}else if(obj.value==0) {
            document.getElementById("pitchLevel").disabled=true;
			document.getElementById("pitchSign").disabled=true;
			document.getElementById("pitchScale").disabled=true;
		}else{
			document.getElementById("pitchLevel").disabled=true;
			document.getElementById("pitchSign").disabled=true;
			document.getElementById("pitchScale").disabled=true;
			var effectValueAry = obj.value.split("&");
			var pitchLevel = effectValueAry[0];
			var pitchSign = effectValueAry[1];
			var pitchScale = effectValueAry[2];
			document.getElementById("pitchLevel").value = pitchLevel;
			document.getElementById("pitchSign").value = pitchSign;
			document.getElementById("pitchScale").value = pitchScale;
		}
	}
