export const ScriptInfoTag = 'ScriptInfo'
export const ScriptInfoProperties = {
	name: {
        required: true,
		type: "string",
        errorMessage: `${ ScriptInfoTag }.name must be a "string"`
	},
	description: {
        default: "",
		type: "string",
        errorMessage: `${ ScriptInfoTag }.description must be a "string"`
	},
	version: {
        default: "1.0.0",
		type: ["string", "number"],
        errorMessage: `${ ScriptInfoTag }.version must be a "string" or "number"`
	},
	author: {
        default: "Unknown",
		type: "string",
        errorMessage: `${ ScriptInfoTag }.author must be a "string"`
	},
	website: {
		type: "string",
        errorMessage: `${ ScriptInfoTag }.website must be a "string"`
	},
	icon: {
		type: "string",
        errorMessage: `${ ScriptInfoTag }.icon must be a "string"`
	},
	runs: {
        required: true,
		type: "object",
        errorMessage: `${ ScriptInfoTag }.runs must be an "object"`,
		properties: {
			matches: {
                required: true,
                type: "object",
                check: function(property) {
                    return Array.isArray(property)
                },
                errorMessage: `${ ScriptInfoTag }.runs.matches must be an "array"`,
                foreach: {
                    type: ["string", "object"],
                    errorMessage: `${ ScriptInfoTag }.runs.matches must contain "string's" or "object's"`,
                }
			},
			runsAt: {
                required: true,
                type: "string",
                errorMessage: `${ ScriptInfoTag }.runs.runsAt must be a "string"`
			}
		}
	},
	dependencies: {
        default: [],
		type: "object",
        check: function(property) {
            return Array.isArray(property)
        },
        errorMessage: `${ ScriptInfoTag }.dependencies must be an "array"`,
        foreach: {
            type: "string",
            errorMessage: `${ ScriptInfoTag }.dependencies must contain "string's"`,
        }
	}
}
export const ExtensionUrl = chrome.runtime.getURL('')
export const SandboxUrl = chrome.runtime.getURL('/Sandbox.js')

let _scripts = [
    /*`let ScriptInfo = {
name: 'Script0',
description: 'This is a test script',
version: '1.0.0',
author: 'L3G5ND',
website: 'https://www.roblox.com/users/721686115/profile',
icon: 'https://www.google.com/s2/favicons?domain=krunker.io',
runs: {
matches: [
    '*://krunker.io/*'
],
runsAt: 'start'
},
dependencies: [
'https://unpkg.com/three@latest/build/three.min.js'
]
}

console.log('===] hello [===')

let scene;

const x = {
window: window,
document: document,
querySelector: document.querySelector,
consoleLog: console.log,
ReflectApply: Reflect.apply,
ArrayPrototype: Array.prototype,
ArrayPush: Array.prototype.push,
ObjectPrototype: Object.prototype,
clearInterval: window.clearInterval,
setTimeout: window.setTimeout
};

x.consoleLog( 'Waiting to inject...' );

const proxied = function ( object ) {

// [native code]

try {

if ( typeof object === 'object' &&
typeof object.parent === 'object' &&
object.parent.type === 'Scene' &&
object.parent.name === 'Main' ) {

//x.consoleLog( 'Found Scene!' )

scene = object.parent;

}

} catch ( error ) {}

return x.ArrayPush.apply( this, arguments );

}

const _test = RegExp.prototype.test;

RegExp.prototype.test = function ( str ) {

if ( typeof str === 'string' ) {

const re = this.toString();

if ( re.indexOf( 'native' ) > - 1 ) {

x.consoleLog( 'test:', this, str );

x.setTimeout.call( x.window, function () {

    x.consoleLog( 'Injecting!' );
    x.ArrayPrototype.push = proxied;

}, 0 );

}

}

return _test.apply( this, arguments );

}

let espEnabled = true;
let aimbotEnabled = true;
let aimbotOnRightMouse = false;
let espLinesEnabled = true;

const tempVector = new THREE.Vector3();

const tempObject = new THREE.Object3D();
tempObject.rotation.order = 'YXZ';

const geometry = new THREE.EdgesGeometry( new THREE.BoxGeometry( 5, 15, 5 ).translate( 0, 7.5, 0 ) );

const material = new THREE.RawShaderMaterial( {
vertexShader: \`

attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main() {

gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
gl_Position.z = 1.0;

}

\`,
fragmentShader: \`

void main() {

gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );

}

\`
} );

const line = new THREE.LineSegments( new THREE.BufferGeometry(), material );

line.frustumCulled = false;

const linePositions = new THREE.BufferAttribute( new Float32Array( 100 * 2 * 3 ), 3 );
line.geometry.setAttribute( 'position', linePositions );

function animate() {

window.requestAnimationFrame( animate );

if ( typeof shouldShowAd === 'undefined' || shouldShowAd === true || scene === undefined || ! scene.children ) {

return;

}

const players = [];

let myPlayer;

for ( let i = 0; i < scene.children.length; i ++ ) {

const child = scene.children[ i ];

if ( child.type === 'Object3D' ) {

try {

    if ( child.children[ 0 ].children[ 0 ].type === 'PerspectiveCamera' ) {

        myPlayer = child;

    } else {

        players.push( child );

    }

} catch ( err ) {}

}

}

if ( ! myPlayer ) {

x.ArrayPrototype.push = proxied;
return;

}

let counter = 0;

let targetPlayer;
let minDistance = Infinity;

tempObject.matrix.copy( myPlayer.matrix ).invert()

for ( let i = 0; i < players.length; i ++ ) {

const player = players[ i ];

if ( ! player.box ) {

const box = new THREE.LineSegments( geometry, material );
box.frustumCulled = false;

player.add( box );

player.box = box;

}

if ( player.position.x === myPlayer.position.x && player.position.z === myPlayer.position.z ) {

player.box.visible = false;

if ( line.parent !== player ) {

    player.add( line );

}

continue;

}

linePositions.setXYZ( counter ++, 0, 10, - 5 );

tempVector.copy( player.position );

tempVector.y += 9;

tempVector.applyMatrix4( tempObject.matrix );

linePositions.setXYZ(
counter ++,
tempVector.x,
tempVector.y,
tempVector.z
);

player.visible = espEnabled || player.visible;

player.box.visible = espEnabled;

const distance = player.position.distanceTo( myPlayer.position );

if ( distance < minDistance ) {

targetPlayer = player;

minDistance = distance;

}

}

linePositions.needsUpdate = true;
line.geometry.setDrawRange( 0, counter );

line.visible = espLinesEnabled;

if ( aimbotEnabled === false || ( aimbotOnRightMouse && ! rightMouseDown ) || targetPlayer === undefined ) {

return;

}

tempVector.setScalar( 0 );

targetPlayer.children[ 0 ].children[ 0 ].localToWorld( tempVector );

tempObject.position.copy( myPlayer.position );

tempObject.lookAt( tempVector );

myPlayer.children[ 0 ].rotation.x = - tempObject.rotation.x;
myPlayer.rotation.y = tempObject.rotation.y + Math.PI;

}

const shouldShowAd = false

const el = document.createElement( 'div' );

el.innerHTML = \`<style>

.dialog {
position: absolute;
left: 50%;
top: 50%;
padding: 20px;
background: rgba(0, 0, 0, 0.8);
border: 6px solid rgba(0, 0, 0, 0.2);
color: #fff;
transform: translate(-50%, -50%);
text-align: center;
z-index: 999999;
}

.dialog * {
color: #fff;
}

.close {
position: absolute;
right: 5px;
top: 5px;
width: 20px;
height: 20px;
opacity: 0.5;
cursor: pointer;
}

.close:before, .close:after {
content: ' ';
position: absolute;
left: 50%;
top: 50%;
width: 100%;
height: 20%;
transform: translate(-50%, -50%) rotate(-45deg);
background: #fff;
}

.close:after {
transform: translate(-50%, -50%) rotate(45deg);
}

.close:hover {
opacity: 1;
}

.btn {
cursor: pointer;
padding: 0.5em;
background: red;
border: 3px solid rgba(0, 0, 0, 0.2);
}

.btn:active {
transform: scale(0.8);
}

.msg {
position: absolute;
left: 10px;
bottom: 10px;
color: #fff;
background: rgba(0, 0, 0, 0.6);
font-weight: bolder;
padding: 15px;
animation: msg 0.5s forwards, msg 0.5s reverse forwards 3s;
z-index: 999999;
pointer-events: none;
}

@keyframes msg {
from {
transform: translate(-120%, 0);
}

to {
transform: none;
}
}

</style>
<div class="msg" style="display: none;"></div>
<div class=\"dialog\">\${shouldShowAd ? \`<big>Loading ad...</big>\` : \`<div class="close" onclick="this.parentNode.style.display='none';"></div>
<big>== Aimbot & ESP ==</big>
<br>
<br>
[B] to toggle aimbot
<br>
[V] to toggle ESP
<br>
[N] to toggle ESP Lines
<br>
[L] to toggle aimbot on <br>right mouse hold
<br>
[H] to show/hide help
<br>
<br>
By Zertalious
<br>
<br>
\` }
</div>\`;

const msgEl = el.querySelector( '.msg' );
const dialogEl = el.querySelector( '.dialog' );

window.addEventListener( 'DOMContentLoaded', function () {

while ( el.children.length > 0 ) {

document.body.appendChild( el.children[ 0 ] );

}

} );

let rightMouseDown = false;

function handleMouse( event ) {

if ( event.button === 2 ) {

rightMouseDown = event.type === 'pointerdown' ? true : false;

}

}

window.addEventListener( 'pointerdown', handleMouse );
window.addEventListener( 'pointerup', handleMouse );

window.addEventListener( 'keyup', function ( event ) {

switch ( event.code ) {

case 'KeyV' :

espEnabled = ! espEnabled;

showMsg( 'ESP', espEnabled );

break;

case 'KeyB' :

aimbotEnabled = ! aimbotEnabled;

showMsg( 'Aimbot', aimbotEnabled );

break;

case 'KeyH' :

dialogEl.style.display = dialogEl.style.display === '' ? 'none' : '';

break;

case 'KeyL' :

aimbotOnRightMouse = ! aimbotOnRightMouse;

showMsg( 'Aimbot On Right Mouse Hold', aimbotOnRightMouse );

break;

case 'KeyN' :

espLinesEnabled = ! espLinesEnabled;

showMsg( 'ESP Lines', espLinesEnabled );

break;

}

} );

function showMsg( name, bool ) {

msgEl.innerText = name + ': ' + ( bool ? 'ON' : 'OFF' );

msgEl.style.display = 'none';

void msgEl.offsetWidth;

msgEl.style.display = '';

}

animate();
    `,*/
    
        `let ScriptInfo = {
name: 'Script1',
description: 'This is a test script',
version: '1.0.0',
author: 'L3G5ND',
website: 'https://www.roblox.com/users/721686115/profile',
icon: 'https://www.google.com/s2/favicons?domain=krunker.io',
runs: {
matches: [
    '*://*/*'
],
runsAt: 'start'
},
dependencies: [
//'https://unpkg.com/three@latest/build/three.min.js'
]
}

console.log(abc)
var abc = 123
console.log(abc)`,
    
        `let ScriptInfo = {
name: 'Script2',
description: 'This is a test script',
version: '1.0.0',
author: 'L3G5ND',
website: 'https://www.roblox.com/users/721686115/profile',
icon: 'https://www.google.com/s2/favicons?domain=krunker.io',
runs: {
matches: [
    '*://*/*'
],
runsAt: 'start'
},
dependencies: [

]
}

console.log(abc)
var abc = 321
console.log(abc)`
]