#pragma strict
var splash : GameObject;
var fps_camera : Camera;
var water : GameObject;
var fpc : GameObject;
var Kr : float;
var throw_force : float;

function Start () 
{	
	splash.particleSystem.Stop(true);
	
	var bc : BombCollider;
	for(var go : GameObject in GameObject.FindGameObjectsWithTag("Bombs"))
	{		
		go.AddComponent(BombCollider);
		
		bc = go.GetComponent(BombCollider);
		
		bc.Kr = Kr;
		bc.splash = splash;
		bc.fps_camera = fps_camera;
		bc.water = water;
		bc.fpc = fpc;
		bc.throwForce = throw_force;
	}
}
