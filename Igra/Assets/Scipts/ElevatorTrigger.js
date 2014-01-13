var boxWidth = 300;
var boxHeight = 50;
var myFont : Font;

private var inTrigger : boolean = false;
private var isMoving : boolean = false;

function Update () 
{
	if( inTrigger )
		if( Input.GetKey("f") && !isMoving )
		{
			GameObject.Find('Elevator').SendMessage('startMoving', null);	
			isMoving = true;
		}
	
	if( isMoving )
	{
		if( !GameObject.Find('Elevator').animation.isPlaying )
			isMoving = false;
	}
}

function OnTriggerEnter()
{
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