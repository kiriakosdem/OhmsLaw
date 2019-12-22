class BouncingBall {

	
constructor(x, y, maxspeed, d) {
	this.diameter = d;
	this.radius = d/2;
	this.x = x;
	this.y = y;
	this.maxspeed = maxspeed;
	this.speedx = random(-this.maxspeed/Math.sqrt(2), this.maxspeed/Math.sqrt(2));
	this.speedy = random(-this.maxspeed/Math.sqrt(2), this.maxspeed/Math.sqrt(2));
	this.temp = 0;
}

	
move() {
	this.x += this.speedx;
	this.y += this.speedy;
}

	
show() {
	let velocitymag = Math.sqrt(pow(this.speedx,2)+pow(this.speedy,2));
	if (velocitymag>0){
		fill(map(velocitymag,0,2*speedlimit,0,255), 0, map(velocitymag,0,2*speedlimit,255,0));
	} else{
		fill(this.temp,0,0);
	}
	
	strokeWeight(1);
	stroke(0,0,0,0);
	ellipse(this.x, this.y, this.diameter, this.diameter);
	
	//image(poolballimag, this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
}


wallcolission() {
	//bottom wall
	if (this.y > height - this.diameter / 2) {
  		this.y = height - this.diameter / 2
  		this.speedy *= -1;
	}
	//top wall
	if (this.y < 0 + this.diameter / 2) {
  		this.y = this.diameter / 2
  		this.speedy *= -1;
	}
	
	//for left and right wall wrap the particle around
	//right wall
	if (this.x > width - this.radius) {
  		//this.x = width - this.diameter / 2
  		//this.speedx *= -1;
		this.x = this.radius;
		current += 0.0017;
	}
	//left wall
	if (this.x < 0 + this.radius) {
		//this.x = this.diameter / 2
  		//this.speedx *= -1;
		this.x = width - this.radius
		current -= 0.0017;
	}
}
	
	
ballcolission(otherball) {
    // calculate distance vector
	let d = dist(this.x, this.y, otherball.x, otherball.y);
    let dx = this.x - otherball.x;
    let dy = this.y - otherball.y;
	
    if (d <= (this.radius + otherball.radius)){
		// speed on the line of colission 
		let vx1 = (dx*this.speedx+dy*this.speedy)/pow(d,2)*dx;
		let vy1 = (dx*this.speedx+dy*this.speedy)/pow(d,2)*dy;
		let vx2 = (dx*otherball.speedx+dy*otherball.speedy)/pow(d,2)*dx;
		let vy2 = (dx*otherball.speedx+dy*otherball.speedy)/pow(d,2)*dy;

		// space them out, so they don't overlap
		let exsp = (this.radius+otherball.radius)/2-d/2;
		this.x += exsp*dx/d;
		this.y += exsp*dy/d;    
		otherball.x -= exsp*dx/d;
		otherball.y -= exsp*dy/d;

		// swap speeds
		this.speedx += - vx1 + vx2;
		this.speedy += - vy1 + vy2;
		otherball.speedx += - vx2 + vx1;
		otherball.speedy += - vy2 + vy1;
  	}
	// return (d < (this.radius + otherball.radius));
}
	
	
staticcolission(otherball) {
    // calculate distance vector
	let d = dist(this.x, this.y, otherball.x, otherball.y);
    let dx = this.x - otherball.x;
    let dy = this.y - otherball.y;
	
    if (d <= (this.radius + otherball.radius)){
		// speed on the line of colission 
		let vx1 = (dx*this.speedx+dy*this.speedy)/pow(d,2)*dx;
		let vy1 = (dx*this.speedx+dy*this.speedy)/pow(d,2)*dy;
		
		// space them out, so they don't overlap
		let exsp = (this.radius+otherball.radius)-d;
		this.x += exsp*dx/d;
		this.y += exsp*dy/d;    

		// invert speed of moving object on line of colission
		this.speedx += -2*vx1;
		this.speedy += -2*vy1;
		
		let velocitymag = Math.sqrt(pow(this.speedx,2)+pow(this.speedy,2));
		//energy transfer
		if (sliderVolt.value()!=0){
			otherball.temp += velocitymag/this.maxspeed;
			this.speedx *= 0.8;
			this.speedy *= 0.8;
		}
		
  	}
}
	
	
gravity() {
	this.speedy += 0.10;
}

efield() {
	this.speedx += sliderVolt.value()/100;
}

friction() {
	this.speedx *= 0.995;
	this.speedy *= 0.995;
	if ((this.speedx * this.speedx + this.speedy * this.speedy) < 1) {
  		this.speedx *= 0.99;
  		this.speedy *= 0.99;
	}
}


selected(mx, my) {
	let distance = dist(mx, my, this.x, this.y);
	return (distance < this.diameter / 2);
}

	
}