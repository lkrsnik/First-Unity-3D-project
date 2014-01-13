#pragma strict

private var isElevatorUp : boolean = false;

function startMoving()
{
	if(isElevatorUp == false)
	{
		animation.Play("Up");
		isElevatorUp = true;
	}
	else
	{
		animation.Play("Down");
		isElevatorUp = false;
	}
}