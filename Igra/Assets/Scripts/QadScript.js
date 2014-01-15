#pragma strict

// air resistence
var ar_Linear : float;
var ar_Square : float;
var ar_LinearBoundary : float;
var ar_SquareBoundary : float;

var maxRotXZ : float;
var maxForce : float;

var toReach : GameObject;

private var t : float = 0;

var fps_camera : Camera;
var quad_camera : Camera;

function Update () 
{
	directPointReach();
	quad_camera.transform.LookAt(toReach.transform.position);
	
	if(Input.GetKeyUp("c"))
	{
		if(quad_camera.enabled)
		{
			quad_camera.enabled = false;
			fps_camera.enabled = true;
		}
		else
		{
			fps_camera.enabled = false;
			quad_camera.enabled = true;			
		}
	}
	
}

/*** REALISTIC QUADROCOPETR MANUVERING ***/

private var speed_quad : Vector3 = Vector3.zero;
private var force_to_apply : Vector3 = Vector3.zero;
var quad_agility : float;

function ApplyForces(force_quad : Vector3) 
{	
	force_to_apply = (1-quad_agility)*force_to_apply + quad_agility*force_quad;

	var rot_obj = gameObject.transform.rotation.eulerAngles;
	gameObject.transform.rotation = Quaternion.Euler(0,rot_obj.y,0);
	
	if( force_to_apply.magnitude > maxForce )
	{
		force_to_apply *= maxForce/force_to_apply.magnitude;
	}
	
	rot_obj.x =  force_to_apply.z / maxForce * maxRotXZ;
	rot_obj.z = -force_to_apply.x / maxForce * maxRotXZ;
	
	//calculate air resistence	
	var ar_Force : Vector3 = speed_quad;
	var sm : float = speed_quad.magnitude;
	
	if(sm < ar_LinearBoundary) {
		ar_Force *= ar_Linear;
	} else if(sm > ar_SquareBoundary) {
		ar_Force *= ar_Square;
	} else {
		var arl = (sm-ar_LinearBoundary)/(ar_SquareBoundary-ar_LinearBoundary);
		ar_Force *= ( arl*ar_Linear + (1-arl)*ar_Square );
	}
	
	//calculate speed
	speed_quad += force_to_apply * Time.deltaTime - ar_Force;
	gameObject.transform.Translate(speed_quad * Time.deltaTime);	
	
	//rotate back
	gameObject.transform.rotation = Quaternion.Euler (rot_obj);
}

var P : float;
var I : float;
var D : float;
var height : float;

private var PreviousDirection : Vector3 = Vector3.zero;
private var Integral : Vector3 = Vector3.zero;

function directPointReach()
{
	var myPosition : Vector3 = gameObject.transform.position;
	var toReachPosition : Vector3 = toReach.transform.position;
	toReachPosition.y += height;
	
	var direction : Vector3 = toReachPosition-myPosition;
	
	Integral += direction;
	
	var p_factor : Vector3 = P/100 * direction;
	var d_factor : Vector3 = D * ( (direction-PreviousDirection) );
	var i_factor : Vector3 = I * Integral;
	
	PreviousDirection = direction;
	
	var force_quad : Vector3 = p_factor+i_factor+d_factor;
	ApplyForces(force_quad);
}








