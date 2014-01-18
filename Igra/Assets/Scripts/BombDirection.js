#pragma strict

var boxWidth : int;
var boxHeight : int;
var myFont : Font;
var bomb_image : Texture2D;	

private var bombs : GameObject[];
private var inWater : Array;
var fps_cam : Camera;
var arrow_image : Texture2D;

private var inHand : boolean;
private var inTrigger : boolean;
private var tajm : float;
private var rotAngle : float;

var deltaTimeCalc : float;


function Start () 
{
	bombs = GameObject.FindGameObjectsWithTag("Bombs");
	
	inWater = new Array(bombs.length);
	for(var i=0; i<bombs.length; i++)
		inWater[i] = false;
	
	tajm = 0;
}

function Update () 
{
	if(!inHand && Time.time > tajm+deltaTimeCalc)
	{
		var closest : Vector3 = Vector3(1000,1000,1000);
		var tmp : Vector3;
		var i = 0;
		for(var bomb in bombs)
		{
			if(inWater[i++])
				continue;
			
			tmp = bomb.transform.position-fps_cam.transform.position;
			if( Vector3.Magnitude(tmp) < Vector3.Magnitude(closest) )
				closest = tmp;
		}
		
		tajm = Time.time;
		
		var first : Vector2 = Vector2(fps_cam.transform.forward.x, fps_cam.transform.forward.z);
		var second : Vector2 = Vector2(closest.x, closest.z);
		
		rotAngle = Vector2.Angle(first, second);
		
		var chk : Vector2;
		var rotAngleRad = rotAngle*Mathf.PI/180;
		
		chk.x = Mathf.Cos(rotAngleRad) * second.x - Mathf.Sin(rotAngleRad) * second.y;
		chk.y = Mathf.Sin(rotAngleRad) * second.x + Mathf.Cos(rotAngleRad) * second.y;
		
		if( Vector2.Angle(chk, first) > 0.1 )
			rotAngle *= -1;
	}
}

function SetInHand(bool: boolean)
{
	inHand = bool;
}
function SetInTrigger(bool: boolean)
{
	inTrigger = bool;
}


function SetInWater(bomb: GameObject)
{
	for(var i=0; i<bombs.length; i++)
	{
		if( bomb == bombs[i] )
		{
			inWater[i] = true;
			break;
		}
	}
}

function OnGUI () 
{
	
	var myStyle = GUIStyle();
	myStyle.fontSize = 45;
	myStyle.font = myFont;
	
	if( !inHand && inTrigger )	
		GUI.Label(Rect(	Screen.width/2 - boxWidth/2
					   ,Screen.height/2 - boxHeight/2
					   ,boxWidth
					   ,boxHeight),
				 "(F) to pick up the bomb", myStyle);
	
	if( inHand )
		GUI.DrawTexture(Rect(16,16,64,64), bomb_image);	


	var pivotPoint : Vector2;
	pivotPoint = Vector2(Screen.width/2,48);
	GUIUtility.RotateAroundPivot (rotAngle, pivotPoint); 
	GUI.DrawTexture(Rect(Screen.width/2-32,16,64,64), arrow_image);

	

}