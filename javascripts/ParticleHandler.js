function pythag(d1, d2){
  return parseInt(Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2)));
}

function random(max){
  return Math.floor(Math.random()*max+1);
}

function Particle(p){
  this.dx = null;
  this.dy = null;
  this.x = p.x;
  this.y = p.y;
  this.travel = null;
  this.max_dist = p.dist*random(50); // in frames
  this.speed = p.speed;
  this.direction = p.direction;
  this.friction = p.friction;

  this.color = {r: p.r, g: p.g, b: p.b};
  this.ctx = p.ctx;

  this.update = function(){
    this.dx = this.dx || Math.cos(this.direction * (Math.PI/180)) * this.speed;
    this.dy = this.dy || Math.sin(this.direction * (Math.PI/180)) * this.speed;

    this.x += (this.dx *= this.friction);
    this.y += (this.dy *= this.friction);

    // this.travel += pythag(this.dx, this.dy);

    if(Math.abs(this.dx+this.dy) < 1){
      return false;
    }
    return true;

  }

  this.draw = function(){
    this.ctx.save();
    this.ctx.fillStyle = "rgb("+this.color.r+","+this.color.b+","+this.color.b+")";
    this.ctx.fillRect(this.x-1, this.y-1, 2, 2);
    this.ctx.restore();
  }
}


// For now this is only a fountain
function ParticleHandler(p){
  this.direction = p.direction;
  this.x = p.x;
  this.y = p.y;
  this.count = p.count;
  this.speed = p.speed;
  this.friction = p.friction;
  this.r = p.r;
  this.g = p.g;
  this.b = p.b;
  this.particles = [];
  this.ctx = p.ctx;

  // init the base set of particles
  for(var i = 0; i < this.count; i++){
    var color = random(150);
    this.particles.push(new Particle({
      x: this.x,
      y: this.y,
      ctx: this.ctx,
      r: (this.r + color),
      g: (this.g + color),
      b: (this.b + color),
      direction: ((this.direction-10)+random(20)),
      speed: (this.speed+random(3)),
      friction: this.friction
    }));
  }

  this.update = function(p){

    this.x = p.x || this.x;
    this.y = p.y || this.y;
    this.speed = p.speed || this.speed;
    this.direction = p.direction || this.direction;
    this.friction = p.friction || this.friction;

    for(var i = 0; i < this.count; i++){
      if(!(this.particles[i].update())){
        var color = random(150);
        this.particles.splice(i, 1);
        this.particles.push(new Particle({
          x: this.x,
          y: this.y,
          ctx: this.ctx,
          r: (this.r + color),
          g: (this.g + color),
          b: (this.b + color),
          direction: ((this.direction-10)+random(20)),
          speed: (this.speed+(random(100)/50)),
          friction: 0.97
        }));
      }
    }
  }

  this.draw = function(){
    for(var i in this.particles){
      this.particles[i].draw();
    }
  }
}
