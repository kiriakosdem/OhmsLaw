let balls = [];
let atoms = [];
let Nparticles = 150;
let Natoms;
let speedlimit = 5;
let fullscreenwidth = document.getElementById('jscode').clientWidth;//myscreen:1366;
let fullscreenheight = document.getElementById('jscode').clientHeight;//myscreen:657;
let animationwidth = fullscreenwidth;
let animationheight = fullscreenwidth*0.32;
let sliderVolt;
let sliderAtoms;
let mycanvas;
let current = 0;


function setup() {
	
	//set up page elements
	header = createElement('h2',"Νόμος του Ohm");
	header.style('text-align','center');
	header.style('padding','10px');
	header.style('padding-bottom','0px');
	header.parent('jscode');
	
	par = createP('Άλλαξε, μέσω των δρομέων, την διαφορά δυναμικού που εφαρμόζεται στα άκρα του αντιστάτη καθώς και την τιμή της αντίστασής του και δες πώς επηρεάζεται το ρεύμα που τον διαρρέει! ');
	par.style('padding-left','10px');
	par.parent('jscode');
	
	mycanvas = createCanvas(animationwidth, animationheight);
	mycanvas.parent("jscode");
	
	sliderVolt = createSlider(-10, 10, 0);
	sliderVolt.parent('jscode');
	sliderVolt.style('width', '200px');
	sliderVolt.style('margin','20px');
	sliderVolt.class('slider sliderVolt');
	
	lblVolt = createElement('label','Διαφορά Δυναμικού: ');
	lblVolt.parent('jscode');
	lblVolt.position(sliderVolt.position().x,sliderVolt.position().y+sliderVolt.height);
	
	sliderAtoms = createSlider(0,100,70);
	sliderAtoms.parent('jscode');
	sliderAtoms.style('width', '200px');
	sliderAtoms.style('margin','20px');
	sliderAtoms.class('slider sliderAtoms');
	
	lblAtoms= createElement('label','Τιμή Αντίστασης: ');
	lblAtoms.parent('jscode');
	lblAtoms.position(sliderAtoms.position().x,sliderAtoms.position().y+sliderAtoms.height);
	
	lblCurrent= createElement('label','Ηλεκτρικό Ρεύμα: ');
	lblCurrent.parent('jscode');	lblCurrent.position(sliderAtoms.position().x*2,sliderAtoms.position().y+sliderAtoms.height);
	
	//create objects
	for (ip=0; ip<Nparticles; ip++){
		balls.push(new BouncingBall(random(0,animationwidth),random(0,animationheight),5,animationwidth/150));
	}
	Natoms=sliderAtoms.value();
	for (ip=0; ip<Natoms; ip++){
		atoms.push(new BouncingBall(random(0,animationwidth),random(0,animationheight),0,animationwidth/50));
	}
}

let time=1;
function draw() {
	background(40, 40, 40);
	lblVolt.html("Διαφορά Δυναμικού: " + sliderVolt.value() + 'V');
	lblAtoms.html("Τιμή Αντίστασης: " + sliderAtoms.value() + 'Ω');
	//current = sliderVolt.value()/sliderAtoms.value();
	if (time % 300 == 0){
		lblCurrent.html("Ηλεκτρικό Ρεύμα: " + current.toFixed(2) + 'A');
		current = 0;
	}
	
	
	Natoms=sliderAtoms.value();
	if (Natoms>atoms.length){
		for (ip=atoms.length; ip<Natoms; ip++){
		atoms.push(new BouncingBall(random(0,animationwidth),random(0,animationheight),0,animationwidth/50));
		}	
	}
	
	// draw shapes
	for (var ind = 0; ind < Natoms; ind++) {
		atoms[ind].show();	
	}
	
	for (var ind = 0; ind < balls.length; ind++) {
		balls[ind].show();
		
		// motion
		balls[ind].move();

		//colissions with wall
		balls[ind].wallcolission();
		//colissions with moving particles
		for (let indother = 0; indother < ind; indother++) {
			balls[ind].ballcolission(balls[indother]);
		}
		//colissions with static particles
		for (let indother = 0; indother < Natoms; indother++){
			balls[ind].staticcolission(atoms[indother]);
		}

		// other forces
		//balls[ind].gravity();
		//balls[ind].friction();
		balls[ind].efield();

		// interactivity
		//balls[ind].rollover(mouseX,mouseY);
	}
	time += 1;
}


//function mousePressed() {
//	let selection = false;
//	let selectionindex = 0;
//
//	if (mouseX>=0 && mouseX<=fullscreenwidth && mouseY>=0 && mouseY<=fullscreenheight){
//		//check where the click was
//		for (ind = 0; ind < balls.length; ind++) {
//			if (balls[ind].selected(mouseX, mouseY)) {
//				selection = true;
//				selectionindex = ind;
//			}
//		}
//
//		//if you click on ball remove it, otherwise create new
//		if (selection == true) {
//			balls.splice(selectionindex, 1);
//		}else {
//			balls.push(new BouncingBall(mouseX, mouseY,5,15));
//		}
//	}
//}


//function mouseDragged() {
//    balls.push(new BilliardBall(mouseX, mouseY));
//}
