import * as THREE from './java/three.js';
import { OrbitControls } from './java/OrbitControls.js';

console.log(THREE);
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, 1 , 0.1, 1000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight , 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


			renderer.setSize(window.innerWidth, window.innerHeight );

			document.body.appendChild( renderer.domElement );

			// Simple Geometry
			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
			const cube = new THREE.Mesh( geometry, material );

			// Axes Helper
			const axesHelper = new THREE.AxesHelper(5);
			
			// Plane Geometry 
			const planeGemo = new THREE.PlaneGeometry(5,5);
			const planeMater = new THREE.MeshStandardMaterial({color:0xFFFFFF,side:THREE.DoubleSide});
			const plane = new THREE.Mesh(planeGemo,planeMater);
			plane.rotation.x = -0.5 * Math.PI ;

			// Gride Helper
			const gridHelper = new THREE.GridHelper();

			//spher Gemetry
			const spherGeo = new THREE.SphereGeometry(0.5,50,50);
			//const sphermater =new THREE.MeshBasicMaterial({color:0x0000FF,wireframe:true});
			const sphermater =new THREE.MeshStandardMaterial({color:0x0000FF,wireframe:false});
			const spher = new THREE.Mesh(spherGeo,sphermater);
			//we can change position of spher
				//spher.position.x = -2 ;
				spher.position.set(0,.5,0) //x,y,z

			//Ambient Light
			const ambientLight = new THREE.AmbientLight(0x333333);
			
			const directionLight = new THREE.DirectionalLight(0xFFFFFF , 1)
			//direction light helper

			const directionLightHelp = new THREE.DirectionalLightHelper(directionLight,1);
			directionLight.position.set(0,2,5);

			//shadow
			renderer.shadowMap.enabled = true;
			plane.receiveShadow = true;
			spher.castShadow = true;
			spher.receiveShadow = true;
			directionLight.castShadow = true;
			//hilper of shadows
			const dLightHelper = new THREE.CameraHelper(directionLight.shadow.camera);
			scene.add(dLightHelper);
			//shadow camera
			directionLight.shadow.camera.top = -25;




			
			
            //scene.add( cube );
			scene.add(axesHelper);
			scene.add(plane);
			scene.add(gridHelper);
			scene.add(spher);
			scene.add(ambientLight);
			scene.add(directionLight);
			scene.add(directionLightHelp);
            
			camera.position.z = 7;


			function animate() {
				requestAnimationFrame( animate );
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				renderer.render( scene, camera );
			};


    var controls = new OrbitControls( camera,renderer.domElement);
 
    controls.update();

			animate();



