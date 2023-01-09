/* global BABYLON */
/* global Input */
/* global Socket */
/* global World */

class Avatar {
    
    static init() {
        Avatar.mesh = BABYLON.MeshBuilder.CreateBox("avatar", {height: Avatar.height, width: 0.1, depth: 0.1}, World.scene);
        Avatar.mesh.position = BABYLON.Vector3.Zero();
        Avatar.mesh.position.y = Avatar.height/2;
        Avatar.mesh.material = new BABYLON.StandardMaterial("matAvatar", World.scene);
        Avatar.mesh.material.diffuseColor = new BABYLON.Color3.Green();

		Avatar.plane = BABYLON.MeshBuilder.CreatePlane("plane", {width: 0.1, height: 0.3}, World.scene);
		Avatar.plane.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
		Avatar.plane.parent = this.mesh;
		Avatar.plane.position.x = 0.1;
		const matPlane = new BABYLON.StandardMaterial("matPlane",World.scene);
		matPlane.backFaceCulling = false;
		matPlane.diffuseColor = BABYLON.Color3.Yellow();
		Avatar.plane.material = matPlane;

        new Billboard(Avatar.mesh, Avatar.username);
    }   
    
    static rotate(isLeft) {
        //Turning left
		let direction = (Avatar.isFacingBack?-1:1);
        if (isLeft) {
            Avatar.viewingRotation -= Avatar.rotationSpeed * direction;
            Avatar.absoluteRotation -= Avatar.rotationSpeed * direction;
            Avatar.mesh.rotate(BABYLON.Axis.Y, Avatar.rotationSpeed * direction, BABYLON.Space.WORLD);
        //Turning right
        } else {
            Avatar.viewingRotation += Avatar.rotationSpeed * direction;            
            Avatar.absoluteRotation += Avatar.rotationSpeed * direction;
            Avatar.mesh.rotate(BABYLON.Axis.Y, -Avatar.rotationSpeed * direction, BABYLON.Space.WORLD);
        }
    }    
    
	static update() {
        if (Avatar.mesh !== null) {
            //Moving forward
            if (Input.key.up) {
                if (Avatar.isFacingBack) {
                    //Spin avatar around if facing back
					Avatar.absoluteRotation += Math.PI;
                    Avatar.mesh.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);
                    Avatar.isFacingBack = false;
                }				
				var forward = new BABYLON.Vector3(Avatar.walkSpeed * Math.cos(Avatar.absoluteRotation), 0, Avatar.walkSpeed * Math.sin(Avatar.absoluteRotation));
				Avatar.mesh.moveWithCollisions(forward);
            }
            //Turning left
            if (Input.key.left) {
                Avatar.rotate(false);
            //Turning right
            } else if (Input.key.right) {
                Avatar.rotate(true);
            }
			//Moving backwards
			if (Input.key.down) {
				if (!Avatar.isFacingBack) {
                    //Spin avatar around if facing front
					Avatar.absoluteRotation -= Math.PI;
					Avatar.isFacingBack = true;
					Avatar.mesh.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);
				}
				var forward = new BABYLON.Vector3(Avatar.walkSpeed * Math.cos(Avatar.absoluteRotation), 0, Avatar.walkSpeed * Math.sin(Avatar.absoluteRotation));
				Avatar.mesh.moveWithCollisions(forward);
			}
        }
    }
}

Avatar.absoluteRotation = 0;
Avatar.viewingRotation = 0;
Avatar.height = 0.3;
Avatar.mesh = null;
Avatar.rotationSpeed = 0.01;
Avatar.walkSpeed = 0.007;
Avatar.isFacingBack = false;
Avatar.plane = null;
