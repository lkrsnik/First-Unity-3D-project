var boxWidth = 300;
var boxHeight = 50;
var myFont : Font;

private var inTrigger : boolean = false;
private var isMoving : boolean = false;
private var elevHeight : float;
private var humElevDifX : float;
private var humElevDifY : float;
private var humElevDifZ : float;

var human : GameObject;
var elevator : GameObject;

function Update () 
{
	if( inTrigger )
		if( Input.GetKey("f") && !isMoving )
		{
			elevator.SendMessage('startMoving', null);	
			isMoving = true;
		}
	
	if( isMoving )
	{
		human.transform.position.x=elevator.transform.position.x+humElevDifX;
		human.transform.position.y=elevator.transform.position.y+humElevDifY;
		human.transform.position.z=elevator.transform.position.z+humElevDifZ;
		if( !GameObject.Find('Elevator').animation.isPlaying )
			isMoving = false;
	}
}

function OnTriggerEnter()
{
	humElevDifX=human.transform.position.x-elevator.transform.position.x;
	humElevDifY=human.transform.position.y-elevator.transform.position.y;
	humElevDifZ=human.transform.position.z-elevator.transform.position.z;
	inTrigger = true;
}

function OnTriggerExit()
{
	inTrigger = false;
}

function OnGUI () {
		
	
	if (inTrigger && !isMoving)	
	{
		var myStyle = GUIStyle();
		myStyle.fontSize = 50;
		myStyle.font = myFont;	
		GUI.Label(Rect(	Screen.width/2
					   ,Screen.height/2
					   ,boxWidth
					   ,boxHeight),
				 "(F) to use elevator", myStyle);
	}
}