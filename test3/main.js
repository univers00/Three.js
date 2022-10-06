import * as THREE from './java/three.js';
import { OrbitControls } from './java/OrbitControls.js';


console.log(THREE);
const scene = new THREE.Scene();
/// const camera   = new THREE.PerspectiveCamera( 75, 1 , 0.1, 1000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight , 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();


//hello add content
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


			renderer.setSize(window.innerWidth, window.innerHeight );

			document.body.appendChild( renderer.domElement );

			// Simple Geometry
			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshStandardMaterial( { 
				//color: 0x00ff00,
				map:new THREE.TextureLoader().load('textures/cubeMaps/px.png')
				 } );
			const cube = new THREE.Mesh( geometry, material );
			cube.position.set(-2,.5,2);

			//box with <> materiels
			const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
			const mutiMateriel = [
			new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('textures/cubeMaps/px.png')}),
			new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('textures/cubeMaps/nx.png')}),
			new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('textures/cubeMaps/px.png')}),
			new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('textures/cubeMaps/nx.png')}),
			new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('textures/cubeMaps/px.png')}),
			new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('textures/cubeMaps/nx.png')}),
			];
			const cube2 = new THREE.Mesh( geometry2, mutiMateriel );
			cube2.position.set(2,.5,2);


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


			const  spotlight = new THREE.SpotLight();
			spotlight.angle = 0.1


				spotlight.position.set(-50,50,0);
				const sLightHelper = new THREE.SpotLightHelper(spotlight);
				spotlight.castShadow = true;


			//shadow

			plane.receiveShadow = true;
			spher.castShadow = true;
			spher.receiveShadow = true;

			//fog effect of the scene


			
			
            scene.add( cube );
			scene.add(cube2);
			scene.add(axesHelper);
			scene.add(plane);
			scene.add(gridHelper);
			scene.add(spher);

			scene.add(spotlight)
			scene.add(sLightHelper);

			camera.position.z = 7;

			// backgound
			renderer.setClearColor(0xFF00CC);
			//const texterLoader = new THREE.TextureLoader.load(fox);
			//const texture = new THREE.TextureLoader().load( "./index.jpeg" );
			//scene.background = texture;

			//cube textre
			const cubeTextureLoad = new THREE.CubeTextureLoader().setPath('textures/cubeMaps/' ).load([
				'px.png',
				'px.png',
				'px.png',
				'px.png',
				'px.png',
				'px.png'

			]);
			scene.background = cubeTextureLoad;

			// scene.background = new THREE.CubeTextureLoader()
			// .setPath( 'textures/cubeMaps/' )
			// .load( [
			// 	'px.png',
			// 	'px.png',
			// 	'px.png',
			// 	'px.png',
			// 	'px.png',
			// 	'px.png'
			// ] );


			const spherId = spher.id;

			const mousePosition =new THREE.Vector2();
			const rayCaster = new THREE.Raycaster();

			window.addEventListener("mousemove",(e)=>{
				mousePosition.x = (e.clientX/window.innerWidth)*2 - 1;
				mousePosition.y = -(e.clientY/window.innerHeight)*2 + 1;

				rayCaster.setFromCamera(mousePosition,camera);
				const intersects = rayCaster.intersectObjects(scene.children);

				for(let i = 0;i<intersects.length;i++){
			
					if(intersects[i].object.id === spherId){
		
						intersects[i].object.material.color.set(0xFFBBBB);

					}

				}

			});

			

			


			function animate() {
				requestAnimationFrame( animate );
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};


    var controls = new OrbitControls( camera,renderer.domElement);
 
    controls.update();

			animate();



