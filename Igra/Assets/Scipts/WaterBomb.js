var Kr : float;
var inWater : int;
var splash : GameObject;

function Start()
{
	inWater = 0;
	splash.particleSystem.Stop(true);
}

function Update () 
{
	if(inWater == 1)
	{
		var resistance : float = -rigidbody.velocity.y * Kr;
		//rigidbody.AddForce(-*resistance);
		Debug.Log(resistance + "," + Kr);
		rigidbody.AddForce(-rigidbody.velocity*Kr);
	}
}

function OnTriggerEnter(myTrigger : Collider)
{	
	if(myTrigger.gameObject.name == "Water") {
		Debug.Log("inWater");
		inWater = 1;
		
		splash.transform.position = gameObject.transform.position;
		splash.particleSystem.Play(true);
		
	}
}
