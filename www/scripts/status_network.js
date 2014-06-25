<!-- Network Status -->

function onInit()
{
	document.getElementById('page_title').innerHTML = '네트워크 상태 정보';
	document.getElementById('section1_title').innerHTML = '무선 접속 정보';
	document.getElementById('section2_title').innerHTML = '내부 포트 정보';
	document.getElementById('section3_title').innerHTML = '3G 정보';
	document.getElementById('usim_label').innerHTML = 'USIM 상태';
	document.getElementById('usage').innerHTML = '데이터 사용량 정보';
	document.getElementById('rx').innerHTML = '다운로드 사용량';
	document.getElementById('tx').innerHTML = '업로드 사용량';
	document.getElementById('link').innerHTML = 'KT Link';
	document.getElementById('usage_label').innerHTML = '(실제 데이터양과 다를 수 있음.)';
	document.getElementById('name1').innerHTML = '포트';
	document.getElementById('ipaddr1').innerHTML = 'IP 주소';
	document.getElementById('netmask1').innerHTML = '서브넷마스크';
	//document.getElementById('ptpaddr1').innerHTML = 'P-to-P 서버';
	document.getElementById('name2').innerHTML = '포트';
	document.getElementById('ipaddr2').innerHTML = 'IP 주소';
	document.getElementById('netmask2').innerHTML = '서브넷마스크';
	document.getElementById('macaddr2').innerHTML = 'MAC 주소';
	document.getElementById('body').hidden = false;
}

function onLoad()
{
	onInit();

	enablePageTimeout();
	
	if(typeof window.ActiveXObject != 'undefined')
	{
		xmlhttp = (new ActiveXObject("Microsoft.XMLHTTP"));
	}
	else
	{
		xmlhttp = (new XMLHttpRequest());
	}
	
	var data = "/cgi-bin/network?cmd=status";
	
	xmlhttp.open( "POST", data, true );
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=euc-kr");
	xmlhttp.onreadystatechange = function()
	{
		if( (xmlhttp.readyState == 4) && (xmlhttp.status == 200) )
		{
			try
			{
				interfaces = xmlhttp.responseXML.documentElement.getElementsByTagName("ETH");
				for(i = 0 ; i < interfaces.length ; i++)
				{
						ifname 	= interfaces[i].getElementsByTagName("IFNAME")[0].firstChild.nodeValue;
						ipaddr  = interfaces[i].getElementsByTagName("IPADDR")[0].firstChild.nodeValue;
						netmask = interfaces[i].getElementsByTagName("NETMASK")[0].firstChild.nodeValue;
						macaddr = interfaces[i].getElementsByTagName("MACADDR")[0].firstChild.nodeValue;
			
						var table = document.getElementById("lan");
						var rowlen = table.rows.length;
						var row = table.insertRow(-1);
						
						row.insertCell(0).innerHTML = "<td class='center'><p>" + ifname + "</p></td>";
						row.insertCell(1).innerHTML = "<td class='center'><p>" + ipaddr + "</p></td>";
						row.insertCell(2).innerHTML = "<td class='center'><p>" + netmask + "</p></td>"
						row.insertCell(3).innerHTML = "<td class='center'><p>" + macaddr + "</p></td>";
						
						for(j = 0 ; j < row.cells.length ; j++)
						{
							row.cells[j].setAttribute('class', 'center');
						}
				}
				
				interfaces = xmlhttp.responseXML.documentElement.getElementsByTagName("PTP");
				for(i = 0 ; i < interfaces.length ; i++)
				{
						ifname 	= interfaces[i].getElementsByTagName("IFNAME")[0].firstChild.nodeValue;
						ipaddr  = interfaces[i].getElementsByTagName("IPADDR")[0].firstChild.nodeValue;
						netmask = interfaces[i].getElementsByTagName("NETMASK")[0].firstChild.nodeValue;
						//peer 		= interfaces[i].getElementsByTagName("PEER")[0].firstChild.nodeValue;
				
						var table = document.getElementById("wwan");
						var rowlen = table.rows.length;
						var row = table.insertRow(-1);
						
						row.insertCell(0).innerHTML = "<td class='center'><p>" + ifname + "</p></td>";
						row.insertCell(1).innerHTML = "<td class='center'><p>" + ipaddr + "</p></td>";
						row.insertCell(2).innerHTML = "<td class='center'><p>" + netmask + "</p></td>"
						//row.insertCell(3).innerHTML = "<td class='center'><p>" + peer + "</p></td>";;

						for(j = 0 ; j < row.cells.length ; j++)
						{
							row.cells[j].setAttribute('class', 'center');
						}
				}
				
				loadpppData();
				//loadUsimInfo();
				//loadNetworkState();
			}
			catch(e)
			{
			}
		}
	}
	xmlhttp.send();
	
}

function loadNetworkState()
{
	if(typeof window.ActiveXObject != 'undefined')
	{
		xmlhttp = (new ActiveXObject("Microsoft.XMLHTTP"));
	}
	else
	{
		xmlhttp = (new XMLHttpRequest());
	}
	
	var data = "/cgi-bin/network_state?cmd=state";

	xmlhttp.open( "POST", data, true );
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=euc-kr");
	xmlhttp.onreadystatechange = function()
	{
		if( (xmlhttp.readyState == 4) && (xmlhttp.status == 200) )
		{
			try
            {
            	result = xmlhttp.responseXML.documentElement.getElementsByTagName("res")[0];
            	if (result.firstChild.nodeValue == 'OK') {

            		// 파싱
            		var result2 = xmlhttp.responseXML.documentElement.getElementsByTagName("text")[0];
					
            		var text = result2.firstChild.nodeValue;
					var trimText = trim(text);
					var textArr = trimText.split("||");
					var ATCOMMAND = textArr[0].split(":")[0];
					var ATCOMMAND_RES = textArr[0].split(":")[1];

					var infoArr = [];
					var plmn = ATCOMMAND_RES.split(",")[0];
					var uarfcn = ATCOMMAND_RES.split(",")[1];
					var psc = ATCOMMAND_RES.split(",")[2];
					var ec_io = ATCOMMAND_RES.split(",")[3];
					var rscp = ATCOMMAND_RES.split(",")[4];
					var rssi = ATCOMMAND_RES.split(",")[5];
					var lac = ATCOMMAND_RES.split(",")[6];
					var rac = ATCOMMAND_RES.split(",")[7];
					var txpwr = ATCOMMAND_RES.split(",")[8];
					var drx = ATCOMMAND_RES.split(",")[9];
					var mm = ATCOMMAND_RES.split(",")[10];
					var rrc = ATCOMMAND_RES.split(",")[11];
					var nom = ATCOMMAND_RES.split(",")[12];
					var bler = ATCOMMAND_RES.split(",")[13];
					var cid = ATCOMMAND_RES.split(",")[14];
					var imsi = ATCOMMAND_RES.split(",")[15];
					//var netnameasc = ATCOMMAND_RES.split(",")[16];
					var sd = ATCOMMAND_RES.split(",")[17];
					var nast = ATCOMMAND_RES.split(",")[18];

					// 전화번호
					/*
					var num = xmlhttp.responseXML.documentElement.getElementsByTagName("num")[0];
					var trimNumText = trim(num.firstChild.nodeValue);
					var textNumArr = trimNumText.split("||");
					var NUM_ATCOMMAND = textNumArr[0].split(":")[0];
					var NUM_ATCOMMAND_RES = textNumArr[0].split(":")[1];
					var phoneNum = NUM_ATCOMMAND_RES.split(",")[1];
					*/

					infoArr = [plmn, uarfcn, psc, ec_io, rscp, rssi, lac, rac, txpwr, drx, mm, rrc, nom, bler, cid, imsi, sd, nast]; //, phoneNum];

					var table = document.getElementById("3g");
					var rowlen = table.rows.length;
					var row = table.insertRow(-1);
					for (i=0; i<infoArr.length; i++)
					{
						row.insertCell(i).innerHTML = "<td class='center'><p>" + infoArr[i] + "</p></td>";
						row.cells[i].setAttribute('class', 'center');
					}

					loadCnum();
            	} else {
            		// error
            		alert(result.firstChild.nodeValue);
					loadCnum();
            	}
            }
            catch(e)
            {

            }
		}
	}
	xmlhttp.send();
}

function loadCnum()
{
	if(typeof window.ActiveXObject != 'undefined')
	{
		xmlhttp = (new ActiveXObject("Microsoft.XMLHTTP"));
	}
	else
	{
		xmlhttp = (new XMLHttpRequest());
	}
	
	var data = "/cgi-bin/cnum?cmd=state";

	xmlhttp.open( "POST", data, true );
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=euc-kr");
	xmlhttp.onreadystatechange = function()
	{
		if( (xmlhttp.readyState == 4) && (xmlhttp.status == 200) )
		{
			try
            {
            	result = xmlhttp.responseXML.documentElement.getElementsByTagName("res")[0];
            	if (result.firstChild.nodeValue == 'OK') {

            		// 파싱
            		var result2 = xmlhttp.responseXML.documentElement.getElementsByTagName("num")[0];
					var table = document.getElementById("3g");
					var rowlen = table.rows.length;
					var row = table.rows[1];

					switch (result2.firstChild.nodeValue)
					{
						case "+CME ERROR: 10":
							row.insertCell(18).innerHTML = "<td class='center'><p>" + "SIM not inserted.." + "</p></td>";
						break;
						case "+CME ERROR: 11":
							row.insertCell(18).innerHTML = "<td class='center'><p>" + "SIM PIN required.." + "</p></td>";
						break;
						case "+CME ERROR: 13":
							row.insertCell(18).innerHTML = "<td class='center'><p>" + "SIM failure.." + "</p></td>";
						break;
						case "+CME ERROR: 14":
							row.insertCell(18).innerHTML = "<td class='center'><p>" + "SIM busy.." + "</p></td>";
						break;
						case "+CME ERROR: 15":
							row.insertCell(18).innerHTML = "<td class='center'><p>" + "SIM wrong.." + "</p></td>";
						break;
						default:
							var trimNumText = trim(result2.firstChild.nodeValue);					
							var phoneNum;
							if (trimNumText == "done")
							{
								phoneNum = "refresh.."
							} else {
								var textNumArr = trimNumText.split("||");
								var NUM_ATCOMMAND = textNumArr[0].split(":")[0];
								var NUM_ATCOMMAND_RES = textNumArr[0].split(":")[1];
								phoneNum = NUM_ATCOMMAND_RES.split(",")[1];
							}
							document.getElementById('message').innerHTML='';
							row.insertCell(18).innerHTML = "<td class='center'><p>" + phoneNum + "</p></td>";
						break;
					}
					row.cells[18].setAttribute('class', 'center');

            	} else {
            		// error
            		//alert("Please Refresh..");
					document.getElementById('message').innerHTML='다시 시도해 주십시오..';
					//alert(result.firstChild.nodeValue);
            	}
            }
            catch(e)
            {

            }
		}
	}
	xmlhttp.send();
}

function loadUsimInfo()
{
	document.getElementById('message').innerHTML='잠시만 기다려 주십시오..';
	if(typeof window.ActiveXObject != 'undefined')
	{
		xmlhttp = (new ActiveXObject("Microsoft.XMLHTTP"));
	}
	else
	{
		xmlhttp = (new XMLHttpRequest());
	}
	
	var data = "/cgi-bin/usim?cmd=state";

	xmlhttp.open( "POST", data, true );
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=euc-kr");
	xmlhttp.onreadystatechange = function()
	{
		if( (xmlhttp.readyState == 4) && (xmlhttp.status == 200) )
		{
			try
            {
            	result = xmlhttp.responseXML.documentElement.getElementsByTagName("res")[0];
            	if (result.firstChild.nodeValue == 'OK') {

            		// 파싱
            		var resultNode = xmlhttp.responseXML.documentElement.getElementsByTagName("text")[0];
					var result = resultNode.firstChild.nodeValue;
					var label = document.getElementById("usim_status");
					switch (result)
					{
						case "+CPIN: READY":
							label.innerHTML = "SIM is Ready..";
							//loadNetworkState();
						break;
						case "+CME ERROR: 10":
							label.innerHTML = "SIM not inserted..";
							//loadNetworkState();
						break;
						case "+CME ERROR: 11":
							label.innerHTML = "SIM PIN required..";
						break;
						case "+CME ERROR: 13":
							label.innerHTML = "SIM failure..";
							//loadNetworkState();
						break;
						case "+CME ERROR: 14":
							label.innerHTML = "SIM busy..";
							//loadNetworkState();
						break;
						case "+CME ERROR: 15":
							label.innerHTML = "SIM wrong..";
							//loadNetworkState();
						break;
						case "false":
							alert("Please Refresh..");
						break;
					}
					loadNetworkState();

            	} else {
            		// error
            		alert("Please Refresh..");
            	}
            }
            catch(e)
            {

            }
		}
	}
	xmlhttp.send();
}

function loadpppData()
{
	if(typeof window.ActiveXObject != 'undefined')
	{
		xmlhttp = (new ActiveXObject("Microsoft.XMLHTTP"));
	}
	else
	{
		xmlhttp = (new XMLHttpRequest());
	}
	
	var data = "/cgi-bin/getdata?cmd=state";

	xmlhttp.open( "POST", data, true );
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=euc-kr");
	xmlhttp.onreadystatechange = function()
	{
		
		if( (xmlhttp.readyState == 4) && (xmlhttp.status == 200) )
		{
			try
            {
            	result = xmlhttp.responseXML.documentElement.getElementsByTagName("res")[0];
            	if (result.firstChild.nodeValue == 'OK') {

            		// 파싱
            		var resultNode = xmlhttp.responseXML.documentElement.getElementsByTagName("text")[0];
					var result = resultNode.firstChild.nodeValue;

					var resultArr = result.split(" ");
					var rx_data = resultArr[0];
					var tx_data = resultArr[1];
					var rx = document.getElementById("rx_data");
					var tx = document.getElementById("tx_data");
					rx.innerHTML = bytesToSize(rx_data);
					tx.innerHTML = bytesToSize(tx_data);
					
					loadUsimInfo();
            	} else {
            		// error
					loadUsimInfo();
            	}
            }
            catch(e)
            {

            }
		}
	}
	xmlhttp.send();
}

function bytesToSize(bytes) {
   var k = 1000;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Bytes';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)),10);
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}