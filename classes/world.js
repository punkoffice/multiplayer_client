/* global Avatar */
/* global BABYLON */

class World {
    static init() {
        World.canvas = document.getElementById("canvas");
        var engine = new BABYLON.Engine(World.canvas, true);
        
        World.scene = new BABYLON.Scene(engine);
        World.setupCamera();        
        World.setupLights();
        World.setupGround();
        
        engine.runRenderLoop(() => {
            World.scene.render();
            Avatar.update();
            World.updateCamera();
        });        
        
        //Resize event
        window.addEventListener("resize", () => {
            engine.resize();
        });
    }
    
    static setupCamera() {
        World.camera = new BABYLON.FreeCamera("thirdPersonCam", BABYLON.Vector3.Zero(), World.scene);
        World.camera.position.x -= Math.sin(-Math.PI/2) * -1 * World.cameraDistance;
        World.camera.position.y = Avatar.height + Avatar.height/2;
        World.camera.position.z -= Math.cos(-Math.PI/2) * -1 * World.cameraDistance;
        var lookAt = BABYLON.Vector3.Zero();
        lookAt.y = Avatar.height + Avatar.height/2;
        World.camera.setTarget(lookAt);
        World.scene.activeCameras.push(World.camera);
    }
    
    static setupGround() {
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 3, width: 3, subdivisions: 4}, World.scene);
        ground.position = BABYLON.Vector3.Zero();
        ground.material = new BABYLON.StandardMaterial("matGround", World.scene);
        ground.material.diffuseTexture = new BABYLON.Texture("ground.jpg", World.scene);        
    }
    
    static setupLights() {
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0.5), World.scene);
        light.intensity = 0.5;        
    }
    
    static updateCamera() {
        if (Avatar.mesh !== null) {
            World.camera.position.x = Avatar.mesh.position.x;
            World.camera.position.y = Avatar.mesh.position.y + Avatar.height;
            World.camera.position.z = Avatar.mesh.position.z;
            World.camera.position.z -= Math.sin(Avatar.viewingRotation - Math.PI) * -1 * World.cameraDistance;
            World.camera.position.x -= Math.cos(Avatar.viewingRotation - Math.PI) * -1 * World.cameraDistance;
            var lookAt = new BABYLON.Vector3(Avatar.mesh.position.x, Avatar.mesh.position.y + Avatar.height, Avatar.mesh.position.z);
            World.camera.setTarget(lookAt);
        }
    }
}

World.cameraDistance = 1.5;