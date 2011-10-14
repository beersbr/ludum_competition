function SpriteHandler(p){
  this.out = p.buffer;
  this.img = new Image();
  this.img.src = p.src || "";
  this.frame_width = p.fw || 0;
  this.frame_height = p.fh || 0;

  this.image_height = this.img.height;
  this.image_width = this.img.width;

  this.fps = p.fps || 16;

  this.last_tag = "";
  this.current_count = 0;
  this.total_frames = 0;

  this.frame_sets = {};

  this.init = function(tag, p){

    // set the data in the format:

    var o = [];
    for(var i = 0; i < p.frames; i++){
      o.push({
        x: this.frame_width*i,
        y: 0,
        w: this.frame_width,
        h: this.frame_height
      });
    }

    this.frame_sets[tag] = o;

  }

  this.draw = function(tag){
    if(this.current_tag != tag){
      this.current_frame = 0;
      this.total_frames = 8; //this.frame_sets[this.current_tag].frames;
      this.current_tag = tag;
    }
    var o = this.frame_sets[this.current_tag];


    this.out.drawImage(this.img, o[this.current_frame].x, o[this.current_frame].y, o[this.current_frame].w, o[this.current_frame].h, 0, 0, 148, 148);
    this.current_frame = (this.current_frame + 1)%this.total_frames;
  }
}