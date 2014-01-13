#pragma strict

private var clicked : boolean = false;
private var turned : boolean = false;

function Start () 
{
	animation.Stop("animF");
	
	var instr: GameObject = GameObject.Find("InstrLong");
	instr.GetComponent(TextMesh).text = "Find all the bombs\nand throw them\nin the water!";
	
	instr.renderer.enabled = false;
	GameObject.Find("Back").renderer.enabled = false;
}

function instructionClicked () 
{
	if( !turned )
	{
		GameObject.Find("InstrLong").renderer.enabled = true;
		GameObject.Find("Back").renderer.enabled = true;
		animation.Play("animF");
	}
	else
	{
		GameObject.Find("Instr").renderer.enabled = true;
		GameObject.Find("Play").renderer.enabled = true;
		GameObject.Find("Quit").renderer.enabled = true;
		animation.Play("animB");
	}	
	
	clicked = true;
	turned =! turned;
}

function Update()
{
	if( clicked && !animation.isPlaying)
	{
		if( turned )
		{
			GameObject.Find("Instr").renderer.enabled = false;
			GameObject.Find("Play").renderer.enabled = false;
			GameObject.Find("Quit").renderer.enabled = false;	
			animation.Stop("animF");
		}
		else
		{
			GameObject.Find("InstrLong").renderer.enabled = false;
			GameObject.Find("Back").renderer.enabled = false;
			animation.Play("animB");
		}
		
		clicked = false;
	}
}